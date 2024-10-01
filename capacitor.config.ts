import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'E-farmmer',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
