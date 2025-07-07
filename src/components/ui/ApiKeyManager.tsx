import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ApiKeysManager, supabase } from '@/lib/supabase';
import { Key, Check, X, Shield, Eye, EyeOff } from 'lucide-react';

interface ApiKey {
  key_name: string;
  created_at: string;
  is_valid?: boolean;
}

export const ApiKeyManager = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [showValues, setShowValues] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    checkUser();
    loadApiKeys();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const loadApiKeys = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('key_name, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setApiKeys(data);
      }
    } catch (error) {
      console.error('Error loading API keys:', error);
    }
  };

  const handleSaveApiKey = async () => {
    if (!user) {
      toast({
        title: "Eroare",
        description: "Trebuie să fiți autentificat pentru a salva chei API",
        variant: "destructive",
      });
      return;
    }

    if (!newKeyName.trim() || !newKeyValue.trim()) {
      toast({
        title: "Eroare",
        description: "Vă rog completați numele și valoarea cheii API",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const success = await ApiKeysManager.saveApiKey(newKeyName, newKeyValue, user.id);
    
    if (success) {
      setNewKeyName('');
      setNewKeyValue('');
      loadApiKeys();
      toast({
        title: "Succes",
        description: "Cheia API a fost salvată securizat",
      });
    } else {
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva cheia API",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleDeleteApiKey = async (keyName: string) => {
    if (!user) return;

    const success = await ApiKeysManager.deleteApiKey(keyName, user.id);
    if (success) {
      loadApiKeys();
      toast({
        title: "Succes",
        description: "Cheia API a fost ștearsă",
      });
    } else {
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge cheia API",
        variant: "destructive",
      });
    }
  };

  const toggleShowValue = (keyName: string) => {
    setShowValues(prev => ({
      ...prev,
      [keyName]: !prev[keyName]
    }));
  };

  if (!user) {
    return (
      <Card className="medical-card">
        <CardContent className="p-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Trebuie să fiți autentificat pentru a gestiona cheile API</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add New API Key */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Adaugă Cheie API Nouă
          </CardTitle>
          <CardDescription>
            Adăugați și gestionați securizat cheile API pentru serviciile externe
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="keyName">Nume Serviciu</Label>
              <Input
                id="keyName"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="ex: firecrawl, openai, zapier"
                className="medical-focus"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keyValue">Cheie API</Label>
              <Input
                id="keyValue"
                type="password"
                value={newKeyValue}
                onChange={(e) => setNewKeyValue(e.target.value)}
                placeholder="Introduceti cheia API..."
                className="medical-focus"
              />
            </div>
          </div>
          <Button 
            onClick={handleSaveApiKey}
            disabled={isLoading}
            className="w-full medical-button"
          >
            {isLoading ? "Salvez..." : "Salvează Cheia API"}
          </Button>
        </CardContent>
      </Card>

      {/* Existing API Keys */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Chei API Salvate ({apiKeys.length})
          </CardTitle>
          <CardDescription>
            Vizualizați și gestionați cheile API stocate securizat în Supabase
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Key className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Nu aveți chei API salvate încă</p>
            </div>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.key_name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">{apiKey.key_name}</p>
                      <p className="text-xs text-muted-foreground">
                        Salvată: {new Date(apiKey.created_at).toLocaleDateString('ro-RO')}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <Check className="w-3 h-3 mr-1" />
                      Activă
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleShowValue(apiKey.key_name)}
                    >
                      {showValues[apiKey.key_name] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteApiKey(apiKey.key_name)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 mb-1">Securitate</p>
              <p className="text-yellow-700">
                Cheile API sunt criptate și stocate securizat în Supabase. Nu sunt niciodată expuse în frontend sau în loguri.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
