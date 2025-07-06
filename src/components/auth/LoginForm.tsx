import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from './AuthProvider';
import { Eye, EyeOff, Mail, Lock, UserPlus, LogIn } from 'lucide-react';

interface LoginFormProps {
  mode?: 'login' | 'register';
  onModeChange?: (mode: 'login' | 'register') => void;
}

export const LoginForm = ({ mode = 'login', onModeChange }: LoginFormProps) => {
  const { signIn, signUp, resetPassword, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isResetting) {
      await resetPassword(email);
      setIsResetting(false);
      return;
    }

    if (mode === 'register') {
      if (password !== confirmPassword) {
        alert('Parolele nu se potrivesc');
        return;
      }
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
  };

  if (isResetting) {
    return (
      <Card className="w-full max-w-md mx-auto medical-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Resetare Parolă
          </CardTitle>
          <CardDescription>
            Introduceți email-ul pentru resetarea parolei
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="medic@clinica.ro"
                required
                className="medical-focus"
              />
            </div>
            
            <div className="space-y-3">
              <Button
                type="submit"
                disabled={loading}
                className="w-full medical-button"
              >
                {loading ? "Se trimite..." : "Trimite Email"}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsResetting(false)}
                className="w-full"
              >
                Înapoi la Autentificare
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto medical-card">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          {mode === 'login' ? (
            <>
              <LogIn className="w-5 h-5 text-primary" />
              Autentificare
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5 text-primary" />
              Înregistrare
            </>
          )}
        </CardTitle>
        <CardDescription>
          {mode === 'login' 
            ? 'Conectați-vă la contul dvs.' 
            : 'Creați un cont nou pentru clinica dvs.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="medic@clinica.ro"
              required
              className="medical-focus"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Parolă</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduceți parola"
                required
                className="medical-focus pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmă Parola</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmați parola"
                required
                className="medical-focus"
              />
            </div>
          )}
          
          <div className="space-y-3">
            <Button
              type="submit"
              disabled={loading}
              className="w-full medical-button"
            >
              {loading ? "Se procesează..." : (mode === 'login' ? "Autentificare" : "Înregistrare")}
            </Button>

            {mode === 'login' && (
              <Button
                type="button"
                variant="link"
                onClick={() => setIsResetting(true)}
                className="w-full text-sm"
              >
                Ați uitat parola?
              </Button>
            )}
          </div>
        </form>

        <Separator className="my-4" />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {mode === 'login' 
              ? "Nu aveți cont încă?" 
              : "Aveți deja un cont?"}
          </p>
          <Button
            type="button"
            variant="link"
            onClick={() => onModeChange?.(mode === 'login' ? 'register' : 'login')}
            className="text-primary"
          >
            {mode === 'login' ? "Înregistrați-vă aici" : "Autentificați-vă aici"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};