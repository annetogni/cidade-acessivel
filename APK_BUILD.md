# Gerando o APK do Cidade Acessível

Este guia explica como transformar o app web em um arquivo `.apk` instalável em um celular Android físico usando o **Capacitor**.

## Requisitos

- Node.js ou Bun instalado
- Android Studio instalado
- JDK 17 ou 21
- Um celular Android com **Modo Desenvolvedor** e **USB Debugging** ativados

## 1. Instalar dependências

```bash
bun install
```

## 2. Build do app para o Capacitor

O TanStack Start é SSR-first. Para o Capacitor usamos uma configuração Vite separada (`vite.capacitor.config.ts`) que gera uma SPA estática em `dist/capacitor/`:

```bash
bun run cap:build
```

Esse comando:

1. Builda a aplicação como SPA com hash router (compatível com `file://` no WebView).
2. Gera `dist/capacitor/index.html` e os assets com caminhos relativos.

## 3. Adicionar a plataforma Android

Execute apenas uma vez (já foi feito neste projeto; só repita se deletar a pasta `android/`):

```bash
npx cap add android
```

Isso cria a pasta `android/` com o projeto nativo.

## 4. Sincronizar e abrir no Android Studio

```bash
bun run cap:sync
bun run cap:android
```

O Android Studio será aberto.

## 5. Gerar o APK de debug

No Android Studio:

1. Conecte o celular via USB.
2. Espere o Gradle sincronizar.
3. Vá em **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
4. O APK será salvo em:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

Você pode arrastar esse arquivo para o celular e instalar, ou usar:

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## Scripts úteis

| Comando               | Descrição                                                             |
| --------------------- | --------------------------------------------------------------------- |
| `bun run cap:build`   | Gera a SPA estática em `dist/capacitor/`                              |
| `bun run cap:sync`    | Sincroniza o webDir com o projeto Android                             |
| `bun run cap:android` | Abre o projeto no Android Studio                                      |
| `bun run cap:apk`     | Build + sync + gera APK de debug (requer JDK + Android Studio/Gradle) |

## Observações importantes

- **Backend**: o app continua usando o Lovable Cloud. O APK precisa de internet para autenticação, banco e fotos.
- **Google OAuth**: dentro do APK o `window.location.origin` muda para `file://` (ou similar). O login social pode exigir configuração de deeplink no Capacitor. Para testes iniciais, use login por e-mail/senha.
- **Câmera/GPS**: as permissões `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION` e `CAMERA` já foram adicionadas em `android/app/src/main/AndroidManifest.xml`. O app usa as APIs web (`<input type="file">` e `navigator.geolocation`) dentro do WebView do Capacitor.
- **Publicação na Play Store**: para release, gere um **AAB** em vez de APK e assine com um keystore próprio.
