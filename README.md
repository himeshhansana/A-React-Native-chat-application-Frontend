# ChatApp

A React Native chat application built with Expo and Tailwind (NativeWind). This repo contains the mobile app source code, socket helpers, screens, and utilities for a simple chat experience.

## Features

- Expo-managed React Native app
- Authentication screens (Sign In, Sign Up, Sign Out)
- Chat screens and single chat view
# ChatApp

A React Native chat application built with Expo and Tailwind (NativeWind). This repository contains the mobile app source code, socket helpers, screens, providers, and utilities for a simple real-time chat experience.

This README is intended to help new contributors and maintainers get the app running locally, build release artifacts, and understand the project layout.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Running in development](#running-in-development)
- [Building for production](#building-for-production)
- [Project structure](#project-structure)
- [Sockets / Backend notes](#sockets--backend-notes)
- [Testing and linting](#testing-and-linting)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- Expo-managed React Native app
- Authentication screens (Sign In, Sign Up, Sign Out)
- Chats list, single chat view, and new chat flow
- User profile and contacts management
- Socket-based real-time messaging helpers
- Tailwind styling via NativeWind

## Tech stack

- React Native (Expo)
- Expo SDK (~54)
- React Navigation
- NativeWind (Tailwind for React Native)
- Socket helpers (custom hooks under `src/socket/`)

## Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Expo CLI (optional but convenient):

```powershell
npm install -g expo-cli
# or use npx / yarn to run expo commands without global install
```

- Android emulator (Android Studio) or a physical device with Expo Go
- For iOS builds you need a macOS machine and Xcode

Note: The project is configured as an Expo-managed workflow. If you prefer React Native CLI, you will need to adapt native build steps and possibly remove Expo-managed dependencies.

## Quick start

1. Clone the repo and change into the project directory:

```powershell
git clone <your-repo-url>
cd ChatApp
```

2. Install dependencies:

```powershell
npm install
# or
yarn
```

3. Start the dev server and open the app (Expo):

```powershell
npm run start
# then press 'a' to open Android, 'i' for iOS (macOS), or scan the QR code to load on a device
```

Or use the script aliases defined in `package.json`:

- `npm run android` — start the Metro server and attempt to open Android emulator/device
- `npm run ios` — start and attempt to open iOS simulator (macOS only)
- `npm run web` — run the web build via Expo for web

## Environment variables

This project may rely on environment variables for backend/socket URLs or API keys. There is no `.env` file tracked in the repository. Create a `.env` in the project root (ignored by git) with values your environment requires.

Example `.env` (create this file at project root):

```
# Backend socket URL (example)
SOCKET_URL=https://example.com

# API base URL
API_URL=https://api.example.com

# Any other secrets or feature flags
```

How to load env values into your React Native app depends on the approach you prefer (e.g., `react-native-config`, `expo-constants`, or a simple JS file). This repo doesn't include one by default — tell me if you'd like me to add `.env` support.

## Running in development

Start the Expo development server and use Expo Go on your device or emulator.

```powershell
npm run start
# or
npm run android
```

Tips:

- If Metro complains about a cache issue, run `expo start -c` to clear cache.
- When testing sockets, ensure the mobile device can reach your backend (use a LAN IP or a tunnel like ngrok / Expo tunnel).

## Building for production

Expo provides multiple ways to create production builds. Two common approaches:

1. Classic Expo build (older): `expo build:android` / `expo build:ios` (may require an Expo account)
2. EAS Build (recommended for modern Expo projects): https://docs.expo.dev/eas

This repository does not include EAS config by default. If you want, I can add `eas.json` and example build steps.

## Project structure

High-level layout (important files/folders):

- `App.tsx` — app entry point
- `app.json`, `babel.config.js`, `metro.config.js` — Expo / bundler configs
- `src/`
  - `api/` — service and API helper functions (`UserService.ts` etc.)
  - `components/` — reusable components and providers
  - `screens/` — all app screens (SignIn, Chats, Profile, etc.)
  - `socket/` — socket helpers and hooks (connect, send, receive)
  - `theme/` — theme provider (NativeWind / ThemeProvider)
  - `util/` — utility modules (date formatting, validation)
- `assets/` — images, icons, avatars

This repo follows a mostly flat structure inside `src`, keeping components, screens, and domain code separate.

## Sockets / Backend notes

- The app contains socket helpers in `src/socket/` and a `WebSocketProvider.tsx`. The frontend expects a socket server to exchange messages in a particular format. If you have an existing backend, confirm the event names and message payloads match what the client expects.
- When testing locally, run the backend on a host reachable by your device. Use your machine's LAN IP (e.g., `http://192.168.x.y:PORT`) or expose with ngrok and set `SOCKET_URL` accordingly.

## Testing and linting

- This repo does not currently include automated tests or a linter configuration. Recommended next steps:
  - Add Jest for unit testing and a small test suite for utilities/components
  - Add ESLint + Prettier for consistent code style

If you'd like, I can scaffold tests and linting in a follow-up change.

## Troubleshooting

- Metro / cache issues: `expo start -c`
- Native builds failing (gradle/xcode): ensure correct native toolchains are installed and that you're using a compatible Expo SDK for your native tooling
- Socket connection refused: verify `SOCKET_URL` and that the backend accepts connections from your client origin

## Contributing

Thank you for considering contributing! A small workflow suggestion:

1. Fork the repo and create a feature branch: `git checkout -b feat/my-feature`
2. Run the app and add your changes
3. Open a PR with a clear description and screenshots (if UI)

Code style: keep commits focused and atomic. If you want, I can add pre-commit hooks (husky) and CI later.

## License

This repository does not include a license file. If you plan to publish or accept contributions, add a license (for example, MIT). I can add a `LICENSE` file for you — tell me which license you prefer.

---

If you'd like, I can also:

- Add screenshots and a gallery to the README
- Add `.env` support and an example `.env.example`
- Add basic Jest tests for `util/` modules
- Add EAS build configuration and small CI workflow

Tell me which additions you want and I'll make them.
