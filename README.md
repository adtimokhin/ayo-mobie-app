# AYO The One: React Native Expo Dating App

PartyDate is a mobile app built using React Native and Expo that aims to connect people looking to meet others at parties and bars. This app provides a platform for users to find potential matches in social settings, facilitating connections and conversations in real-time.

![PartyDate Screenshot](screenshot.png)

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
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

   \`\`\`bash
   git clone https://github.com/adtimokhin/ayo-mobie-app.git
   \`\`\`

2. Navigate to the project directory:

   \`\`\`bash
   cd ayo-mobie-app
   \`\`\`

3. Install the required npm packages:

   \`\`\`bash
   npm install
   \`\`\`

## Usage

To launch the AYO The One app on your machine, follow these steps:

1. Ensure you are in the project directory (\`ayo-mobie-app\`).

2. Run the following command to start the Expo development server:

   \`\`\`bash
   npx expo start
   \`\`\`

3. A web page will open in your browser displaying a QR code. You can use this QR code to open the app on your physical device using the Expo Go app or launch the app in an Android or iOS simulator.

4. If you're using a physical device, make sure it's connected to the same network as your development machine.

5. Follow the on-screen instructions to open the app on your device or emulator.

## Features

- Create a profile with personal information and preferences.
- View profiles of other users who are attending the same event.
- Like a profiles.
- Get information about the matches
- Receive notifications for new matches.
- Team of 'AYO The One' is against messaging in the app, so the app does not support chatting in app with the matches.

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
