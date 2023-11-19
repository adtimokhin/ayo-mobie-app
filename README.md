# AYO The One: Dating App
![Project Preview](https://user-images.githubusercontent.com/37998602/284029890-77f9338b-1cc2-4bc2-b01e-724da536b02e.png)

PartyDate is a mobile app built using React Native and Expo that aims to connect people looking to meet others at parties and bars. This app provides a platform for users to find potential matches in social settings, facilitating connections and conversations in real-time.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running in Development Mode](#running-in-development-mode)
  - [Sending the App to Expo Build](#sending-the-app-to-expo-build)
  - [Publishing the App to the App Store](#publishing-the-app-to-the-app-store)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these instructions to set up and run the PartyDate app on your local machine.

### Prerequisites

Before you begin, make sure you have the following software installed:

- [Node.js](https://nodejs.org/) - Ensure you have Node.js installed, as it comes with npm (Node Package Manager).
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) - Install the Expo CLI globally using the command: \`npm install -g expo-cli\`

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/adtimokhin/ayo-mobie-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ayo-mobie-app
   ```

3. Install the required npm packages:

  ```bash
   npm install
   ```

### Running in Development Mode

To run the AYO The One app in development mode with optimizations, use the following command:

```bash
npx expo start --no-dev --minify
```

### Sending the App to Expo Build

Before sending the app to Expo Build, make sure to update the version of the app in your project configuration. You can do this in your \`app.json\` or \`app.config.js\` file.

To send the app to Expo Build for iOS, use the following command:

```bash
eas build -p ios
```

### Publishing the App to the App Store

To publish the app to the App Store, use the following command:

```bash
eas submit -p ios --latest
```

Make sure you have configured your app for distribution in the Apple Developer Portal and Expo credentials are set up correctly.

## Usage

To launch the AYO The One app on your machine, follow these steps:

1. Ensure you are in the project directory (\`ayo-mobie-app\`).

2. Run the following command to start the Expo development server:

   ```bash
   npx expo start
   ```

3. A web page will open in your browser displaying a QR code. You can use this QR code to open the app on your physical device using the Expo Go app or launch the app in an Android or iOS simulator.

4. If you're using a physical device, make sure it's connected to the same network as your development machine.

5. Follow the on-screen instructions to open the app on your device or emulator.

## Features

- Create a profile with personal information and preferences.
- View profiles of other users who are attending the same event.
- Like profiles.
- Get information about the matches.
- Receive notifications for new matches.
- The team behind 'AYO The One' does not support in-app messaging with matches.

## Technologies Used

- React Native
- Expo
- React Navigation
- Redux (for state management)
- Firebase (for real-time messaging)
- Git (for version control)

## Contributing

Contributions to PartyDate are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: \`git checkout -b feature-name\`
3. Make your changes and commit them: \`git commit -m "Add feature"\`
4. Push your changes to your fork: \`git push origin feature-name\`
5. Create a pull request detailing your changes.

Please ensure your code follows the project's coding conventions and has appropriate test coverage.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

