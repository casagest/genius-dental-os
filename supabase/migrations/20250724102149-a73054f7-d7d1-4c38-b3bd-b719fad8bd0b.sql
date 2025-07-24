-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'doctor', 'nurse', 'receptionist');

-- Create user_roles table for proper role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Create function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = auth.uid()
  LIMIT 1;
$$;

-- Fix existing RLS policies to use proper Supabase auth functions

-- Fix financial_transactions policies
DROP POLICY IF EXISTS "Staff can create transactions" ON public.financial_transactions;
DROP POLICY IF EXISTS "Staff can view all transactions" ON public.financial_transactions;

CREATE POLICY "Authenticated users can create transactions" 
ON public.financial_transactions 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view all transactions" 
ON public.financial_transactions 
FOR SELECT 
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Fix lab_orders policies
DROP POLICY IF EXISTS "Staff can create lab orders" ON public.lab_orders;
DROP POLICY IF EXISTS "Staff can update lab orders" ON public.lab_orders;
DROP POLICY IF EXISTS "Staff can view all lab orders" ON public.lab_orders;

CREATE POLICY "Authenticated users can create lab orders" 
ON public.lab_orders 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update lab orders" 
ON public.lab_orders 
FOR UPDATE 
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view all lab orders" 
ON public.lab_orders 
FOR SELECT 
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Fix medical_imaging policies
DROP POLICY IF EXISTS "Staff can upload medical imaging" ON public.medical_imaging;
DROP POLICY IF EXISTS "Staff can view all medical imaging" ON public.medical_imaging;

CREATE POLICY "Authenticated users can upload medical imaging" 
ON public.medical_imaging 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view all medical imaging" 
ON public.medical_imaging 
FOR SELECT 
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Fix treatments policies
DROP POLICY IF EXISTS "Staff can create treatments" ON public.treatments;
DROP POLICY IF EXISTS "Staff can update treatments" ON public.treatments;
DROP POLICY IF EXISTS "Staff can view all treatments" ON public.treatments;

CREATE POLICY "Authenticated users can create treatments" 
ON public.treatments 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = created_by);

CREATE POLICY "Authenticated users can update treatments" 
ON public.treatments 
FOR UPDATE 
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view all treatments" 
ON public.treatments 
FOR SELECT 
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Add policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles" 
ON public.user_roles 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update existing handle_new_user function to be more secure
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name');
  
  -- Assign default role (receptionist) to new users
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'receptionist');
  
  RETURN NEW;
END;
$$;