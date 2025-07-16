import { useState, useEffect } from 'react';
import { 
  Camera, 
  CameraResultType, 
  CameraSource,
  Photo 
} from '@capacitor/camera';
import { 
  PushNotifications,
  PushNotificationSchema,
  ActionPerformed 
} from '@capacitor/push-notifications';
import { 
  StatusBar, 
  Style 
} from '@capacitor/status-bar';
import { 
  SplashScreen 
} from '@capacitor/splash-screen';
import { 
  Device,
  DeviceInfo 
} from '@capacitor/device';
import { 
  Haptics, 
  ImpactStyle 
} from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

export const useNativeFeatures = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const initializeNativeFeatures = async () => {
      if (Capacitor.isNativePlatform()) {
        setIsNative(true);
        
        // Get device info
        const info = await Device.getInfo();
        setDeviceInfo(info);

        // Initialize status bar
        await StatusBar.setStyle({ style: Style.Dark });
        
        // Hide splash screen
        await SplashScreen.hide();

        // Initialize push notifications
        await initializePushNotifications();
      }
    };

    initializeNativeFeatures();
  }, []);

  const initializePushNotifications = async () => {
    if (!Capacitor.isNativePlatform()) return;

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    const permStatus = await PushNotifications.requestPermissions();

    if (permStatus.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      await PushNotifications.register();
    }

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token) => {
      console.info('Registration token: ', token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error) => {
      console.error('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Push notification received: ', notification);
    });

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  };

  const takePicture = async (): Promise<Photo | null> => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      return image;
    } catch (error) {
      console.error('Error taking picture:', error);
      return null;
    }
  };

  const selectFromGallery = async (): Promise<Photo | null> => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });

      return image;
    } catch (error) {
      console.error('Error selecting from gallery:', error);
      return null;
    }
  };

  const vibrate = async (style: ImpactStyle = ImpactStyle.Medium) => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style });
    }
  };

  const scheduleLocalNotification = async (title: string, body: string) => {
    // Note: For local notifications, you would typically use 
    // @capacitor/local-notifications plugin (can be added later)
    console.log('Local notification scheduled:', { title, body });
  };

  return {
    isNative,
    deviceInfo,
    takePicture,
    selectFromGallery,
    vibrate,
    scheduleLocalNotification,
    impactStyles: ImpactStyle,
  };
};