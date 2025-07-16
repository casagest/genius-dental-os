import React, { useState } from 'react';
import { Camera, Smartphone, Vibrate, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNativeFeatures } from '@/hooks/useNativeFeatures';
import { useToast } from '@/hooks/use-toast';
import { Photo } from '@capacitor/camera';

export const NativeFeaturesDemo = () => {
  const { 
    isNative, 
    deviceInfo, 
    takePicture, 
    selectFromGallery, 
    vibrate, 
    scheduleLocalNotification,
    impactStyles 
  } = useNativeFeatures();
  
  const { toast } = useToast();
  const [capturedImage, setCapturedImage] = useState<Photo | null>(null);

  const handleTakePicture = async () => {
    const photo = await takePicture();
    if (photo) {
      setCapturedImage(photo);
      await vibrate(impactStyles.Light);
      toast({
        title: "Fotografie capturată!",
        description: "Fotografia a fost capturată cu succes din cameră.",
      });
    }
  };

  const handleSelectFromGallery = async () => {
    const photo = await selectFromGallery();
    if (photo) {
      setCapturedImage(photo);
      await vibrate(impactStyles.Light);
      toast({
        title: "Imagine selectată!",
        description: "Imaginea a fost selectată din galerie.",
      });
    }
  };

  const handleVibrate = async (intensity: 'light' | 'medium' | 'heavy') => {
    const style = intensity === 'light' ? impactStyles.Light : 
                  intensity === 'medium' ? impactStyles.Medium : 
                  impactStyles.Heavy;
    
    await vibrate(style);
    toast({
      title: "Vibrație activată!",
      description: `Vibrație ${intensity} activată.`,
    });
  };

  const handleScheduleNotification = async () => {
    await scheduleLocalNotification(
      "Genius Dental OS", 
      "Notificare test din aplicația mobilă!"
    );
    await vibrate(impactStyles.Light);
    toast({
      title: "Notificare programată!",
      description: "Notificarea locală a fost programată.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-text">
          Funcții Mobile Native
        </h1>
        <p className="text-muted-foreground">
          Demonstrație a capacităților native ale aplicației mobile
        </p>
        <div className="flex justify-center">
          <Badge variant={isNative ? "default" : "secondary"}>
            {isNative ? "🟢 Aplicație Nativă" : "🟡 Browser Web"}
          </Badge>
        </div>
      </div>

      {deviceInfo && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Informații Dispozitiv
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Platformă:</span> {deviceInfo.platform}
              </div>
              <div>
                <span className="font-medium">Model:</span> {deviceInfo.model}
              </div>
              <div>
                <span className="font-medium">OS:</span> {deviceInfo.operatingSystem} {deviceInfo.osVersion}
              </div>
              <div>
                <span className="font-medium">Manufacturer:</span> {deviceInfo.manufacturer}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Camera Section */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Cameră & Galerie
            </CardTitle>
            <CardDescription>
              Captură fotografii sau selectează din galerie
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={handleTakePicture}
                className="premium-button w-full"
                disabled={!isNative}
              >
                <Camera className="w-4 h-4 mr-2" />
                Cameră
              </Button>
              <Button 
                onClick={handleSelectFromGallery}
                variant="outline"
                className="w-full"
                disabled={!isNative}
              >
                Galerie
              </Button>
            </div>
            
            {capturedImage && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Imagine capturată:</p>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={capturedImage.webPath} 
                    alt="Captured" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Haptics Section */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vibrate className="w-5 h-5" />
              Feedback Haptic
            </CardTitle>
            <CardDescription>
              Vibrații tactile pentru feedback utilizator
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => handleVibrate('light')}
              variant="outline"
              className="w-full"
              disabled={!isNative}
            >
              Vibrație Ușoară
            </Button>
            <Button 
              onClick={() => handleVibrate('medium')}
              variant="outline"
              className="w-full"
              disabled={!isNative}
            >
              Vibrație Medie
            </Button>
            <Button 
              onClick={() => handleVibrate('heavy')}
              variant="outline"
              className="w-full"
              disabled={!isNative}
            >
              Vibrație Puternică
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificări Push
          </CardTitle>
          <CardDescription>
            Sistemul de notificări pentru aplicația mobilă
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleScheduleNotification}
            className="premium-button"
            disabled={!isNative}
          >
            <Bell className="w-4 h-4 mr-2" />
            Trimite Notificare Test
          </Button>
        </CardContent>
      </Card>

      {!isNative && (
        <Card className="border-warning bg-warning/10">
          <CardHeader>
            <CardTitle className="text-warning">⚠️ Mod Browser</CardTitle>
            <CardDescription>
              Pentru a testa funcțiile native complete, aplicația trebuie rulată pe un dispozitiv mobil real 
              sau emulator după build-ul nativ cu Capacitor.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};