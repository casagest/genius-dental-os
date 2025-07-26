export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      financial_transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          invoice_number: string | null
          patient_id: string
          payment_method: string | null
          status: string | null
          transaction_type: string
          treatment_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          invoice_number?: string | null
          patient_id: string
          payment_method?: string | null
          status?: string | null
          transaction_type: string
          treatment_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          invoice_number?: string | null
          patient_id?: string
          payment_method?: string | null
          status?: string | null
          transaction_type?: string
          treatment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_transactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_transactions_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_orders: {
        Row: {
          created_at: string | null
          digital_files: Json | null
          due_date: string | null
          id: string
          lab_notes: string | null
          order_type: string
          patient_id: string
          specifications: Json | null
          status: string | null
          treatment_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          digital_files?: Json | null
          due_date?: string | null
          id?: string
          lab_notes?: string | null
          order_type: string
          patient_id: string
          specifications?: Json | null
          status?: string | null
          treatment_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          digital_files?: Json | null
          due_date?: string | null
          id?: string
          lab_notes?: string | null
          order_type?: string
          patient_id?: string
          specifications?: Json | null
          status?: string | null
          treatment_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_orders_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_orders_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_imaging: {
        Row: {
          ai_annotations: Json | null
          analysis_results: Json | null
          created_at: string | null
          id: string
          image_type: string
          image_url: string
          patient_id: string
          treatment_id: string | null
        }
        Insert: {
          ai_annotations?: Json | null
          analysis_results?: Json | null
          created_at?: string | null
          id?: string
          image_type: string
          image_url: string
          patient_id: string
          treatment_id?: string | null
        }
        Update: {
          ai_annotations?: Json | null
          analysis_results?: Json | null
          created_at?: string | null
          id?: string
          image_type?: string
          image_url?: string
          patient_id?: string
          treatment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_imaging_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_imaging_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_appointments: {
        Row: {
          appointment_date: string
          appointment_type: string
          cost: number | null
          created_at: string
          duration_minutes: number | null
          id: string
          notes: string | null
          patient_id: string
          status: string | null
          treatment_plan: string | null
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_type: string
          cost?: number | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          patient_id: string
          status?: string | null
          treatment_plan?: string | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_type?: string
          cost?: number | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          patient_id?: string
          status?: string | null
          treatment_plan?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_documents: {
        Row: {
          category: string
          created_at: string
          document_name: string
          document_type: string
          file_size: number | null
          file_url: string
          id: string
          is_public: boolean
          patient_id: string
          uploaded_by: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          document_name: string
          document_type: string
          file_size?: number | null
          file_url: string
          id?: string
          is_public?: boolean
          patient_id: string
          uploaded_by?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          document_name?: string
          document_type?: string
          file_size?: number | null
          file_url?: string
          id?: string
          is_public?: boolean
          patient_id?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      patient_messages: {
        Row: {
          attachment_url: string | null
          created_at: string
          id: string
          message: string
          patient_id: string
          priority: string
          responded_at: string | null
          responded_by: string | null
          response: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          attachment_url?: string | null
          created_at?: string
          id?: string
          message: string
          patient_id: string
          priority?: string
          responded_at?: string | null
          responded_by?: string | null
          response?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          attachment_url?: string | null
          created_at?: string
          id?: string
          message?: string
          patient_id?: string
          priority?: string
          responded_at?: string | null
          responded_by?: string | null
          response?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      patient_notifications: {
        Row: {
          action_url: string | null
          created_at: string
          expires_at: string | null
          id: string
          is_read: boolean
          message: string
          patient_id: string
          title: string
          type: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean
          message: string
          patient_id: string
          title: string
          type?: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean
          message?: string
          patient_id?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      patient_reviews: {
        Row: {
          appointment_id: string | null
          created_at: string
          facility_rating: number | null
          id: string
          is_public: boolean
          patient_id: string
          rating: number
          review_text: string | null
          staff_rating: number | null
          treatment_satisfaction: number | null
          would_recommend: boolean | null
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string
          facility_rating?: number | null
          id?: string
          is_public?: boolean
          patient_id: string
          rating: number
          review_text?: string | null
          staff_rating?: number | null
          treatment_satisfaction?: number | null
          would_recommend?: boolean | null
        }
        Update: {
          appointment_id?: string | null
          created_at?: string
          facility_rating?: number | null
          id?: string
          is_public?: boolean
          patient_id?: string
          rating?: number
          review_text?: string | null
          staff_rating?: number | null
          treatment_satisfaction?: number | null
          would_recommend?: boolean | null
        }
        Relationships: []
      }
      patients: {
        Row: {
          allergies: string[] | null
          created_at: string
          current_medications: string[] | null
          date_of_birth: string | null
          dental_history: Json | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string
          id: string
          insurance_id: string | null
          insurance_provider: string | null
          last_name: string
          medical_conditions: string[] | null
          medical_record_number: string | null
          medical_record_photo: string | null
          phone: string | null
          updated_at: string
          user_id: string | null
          voice_profile_id: string | null
        }
        Insert: {
          allergies?: string[] | null
          created_at?: string
          current_medications?: string[] | null
          date_of_birth?: string | null
          dental_history?: Json | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name: string
          id?: string
          insurance_id?: string | null
          insurance_provider?: string | null
          last_name: string
          medical_conditions?: string[] | null
          medical_record_number?: string | null
          medical_record_photo?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string | null
          voice_profile_id?: string | null
        }
        Update: {
          allergies?: string[] | null
          created_at?: string
          current_medications?: string[] | null
          date_of_birth?: string | null
          dental_history?: Json | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string
          id?: string
          insurance_id?: string | null
          insurance_provider?: string | null
          last_name?: string
          medical_conditions?: string[] | null
          medical_record_number?: string | null
          medical_record_photo?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string | null
          voice_profile_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          resource: string | null
          success: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource?: string | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource?: string | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      treatments: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          estimated_cost: number | null
          estimated_duration: number | null
          id: string
          notes: Json | null
          patient_id: string
          priority: number | null
          specialization: Database["public"]["Enums"]["medical_specialization"]
          status: Database["public"]["Enums"]["treatment_status"] | null
          treatment_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          estimated_duration?: number | null
          id?: string
          notes?: Json | null
          patient_id: string
          priority?: number | null
          specialization: Database["public"]["Enums"]["medical_specialization"]
          status?: Database["public"]["Enums"]["treatment_status"] | null
          treatment_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          estimated_duration?: number | null
          id?: string
          notes?: Json | null
          patient_id?: string
          priority?: number | null
          specialization?: Database["public"]["Enums"]["medical_specialization"]
          status?: Database["public"]["Enums"]["treatment_status"] | null
          treatment_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treatments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      voice_commands: {
        Row: {
          command_text: string
          command_type: string
          confidence_score: number | null
          created_at: string | null
          execution_result: Json | null
          id: string
          processing_time_ms: number | null
          user_id: string
        }
        Insert: {
          command_text: string
          command_type: string
          confidence_score?: number | null
          created_at?: string | null
          execution_result?: Json | null
          id?: string
          processing_time_ms?: number | null
          user_id: string
        }
        Update: {
          command_text?: string
          command_type?: string
          confidence_score?: number | null
          created_at?: string | null
          execution_result?: Json | null
          id?: string
          processing_time_ms?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      log_security_event: {
        Args: { _action: string; _resource?: string; _details?: Json }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "doctor" | "nurse" | "receptionist"
      medical_specialization:
        | "oral_surgery"
        | "orthodontics"
        | "periodontics"
        | "endodontics"
        | "prosthodontics"
        | "pedodontics"
        | "oral_pathology"
        | "general_dentistry"
      treatment_status:
        | "planned"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "follow_up_required"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "doctor", "nurse", "receptionist"],
      medical_specialization: [
        "oral_surgery",
        "orthodontics",
        "periodontics",
        "endodontics",
        "prosthodontics",
        "pedodontics",
        "oral_pathology",
        "general_dentistry",
      ],
      treatment_status: [
        "planned",
        "in_progress",
        "completed",
        "cancelled",
        "follow_up_required",
      ],
    },
  },
} as const
