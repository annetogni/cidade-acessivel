import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.cidadeacessivel.app",
  appName: "Cidade Acessível",
  webDir: "dist/capacitor",
  server: {
    // Usa https no file:// para evitar mixed-content em APIs do Capacitor
    androidScheme: "https",
  },
  android: {
    buildOptions: {
      // Deixe vazio para build de debug. Para release, configure o keystore localmente.
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0F172A",
    },
  },
};

export default config;
