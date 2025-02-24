# Herbert Hotel Assistant

**Herbert** is an innovative hotel receptionist application designed to assist guests in navigating their stay at a hotel. Guests interact with Herbert using Text-to-Speech (TTS) and Speech-to-Text (STT) technology, allowing for seamless communication. The frontend provides a graphical interface displaying interactions with Herbert, which is powered by an AI-based backend.

## Table of Contents

- [Herbert Hotel Assistant](#herbert-hotel-assistant)
  - [Table of Contents](#table-of-contents)
  - [General Project Information](#general-project-information)
    - [Project Name \& Purpose](#project-name--purpose)
    - [Target Audience](#target-audience)
  - [Technical Overview](#technical-overview)
    - [Technologies Used](#technologies-used)
    - [Project Structure](#project-structure)
    - [Naming Conventions](#naming-conventions)
  - [Setup \& Installation](#setup--installation)
    - [System Requirements](#system-requirements)
    - [How to Install](#how-to-install)
  - [Build \& Deployment](#build--deployment)
    - [Deployment Process](#deployment-process)
  - [State Management \& Data Flow](#state-management--data-flow)
    - [State Management](#state-management)
    - [API Integration](#api-integration)
    - [Authentication \& Security](#authentication--security)
  - [Testing](#testing)
    - [Known Issues \& Troubleshooting](#known-issues--troubleshooting)
        - [Common Errors](#common-errors)
        - [Workarounds](#workarounds)
  - [Additional Information](#additional-information)
    - [Frontend Tools](#frontend-tools)
        - [Webpack is utilized with various plugins and loaders:](#webpack-is-utilized-with-various-plugins-and-loaders)
        - [Firebase Setup](#firebase-setup)
        - [Updating Firebase](#updating-firebase)

## General Project Information

### Project Name & Purpose
**Project Name**: Herbert  
**Purpose**: The primary objective of Herbert is to serve as a virtual receptionist, helping hotel guests find their way and answer questions seamlessly.

### Target Audience
The primary users of the frontend application are hotel guests.

## Technical Overview

### Technologies Used
- TypeScript
- Webpack
- CSS
- Firebase

### Project Structure
├── dist/ =========> Compiled files for the browser (bundle.js, index.html, main.css)
├── node_modules/ => Standard directory for dependencies installed via npm
├── Ruleset/ ======> Markdown files and documentation
├── src/ ==========> Main directory for source code
│ ├── util/ =======> TypeScript files supporting the application
│ ├── index.ts -> Core logic
│ └── models.ts -> Component logic
├── .github/ ======> Configuration for version control
└── .idea/ ========> IDE configuration files

### Naming Conventions
- **TypeScript Files**: Use CamelCase (e.g., `chatUtil.ts`, `menuManager.ts`) and schematically separate functions (e.g., `questionHandler.ts`, `settingsHandler.ts`).
- **CSS Files**: Use a standard `style.css` format without pre- or post-processors.
- **Configuration Files**: Use standard naming conventions (e.g., `tsconfig.json`, `webpack.config.js`, `package.json`).

## Setup & Installation

### System Requirements
Ensure you have Node.js version **20.12.0** or higher installed on your machine.

### How to Install
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to fetch dependencies.
4. Run `npm start` to start the local server for development.
5. Run `npm run build` to create a production build located in the `/dist` folder.

## Build & Deployment

### Deployment Process
The main branch of the frontend application is automatically deployed to Firebase upon updates. The deployment URL is: 

```
https://rezep-project-5chif.web.app/
```

[Herbert Hotel Assistant](https://rezep-project-5chif.web.app/)

## State Management & Data Flow

### State Management
In `index.ts`, there is an object called `can` of type `CanvasUtil`, which has a property `public stateOfApp: string;` for managing and querying the application's state. The rendering is dynamically updated based on the state.

### API Integration
Communication with the backend is handled by a `QuestionHandler`. Below is a snippet of the `getAnswerFromAi` method that fetches responses based on user queries:

```typescript
public async getAnswerFromAi(question: string): Promise<string | undefined> {
    // Implementation...
}
```

### Authentication & Security
Authentication is managed using JWTs. The TokenUtil class handles token retrieval and storage securely.

The two importand Methodes are ```public getToken(): string | null``` and ```public static async getInstance(): Promise<TokenUtil>```

With the "GetInstance" Methode, the application gets the right instance of the TokenUtilClass and than it call "getToken" on that insatnce to get the right JWT-Token to communicate with the Backend.

## Testing
- Linting: Utilize the clean bot on GitHub for general programming error checks.
- Integration Tests: The backend is tested extensively with integration tests covering all controller functionalities and happy paths, but there are no tests other than the Linting bot for the Frontend at the Moment.

### Known Issues & Troubleshooting
##### Common Errors
Interacting with the application too quickly after loading may result in errors due to unprepared resources.
##### Workarounds
A mandatory wait time of 1 second is implemented after loading before any interaction is allowed.

## Additional Information
### Frontend Tools
##### Webpack is utilized with various plugins and loaders:

- ts-loader: For compiling TypeScript files.
- css-loader and MiniCssExtractPlugin: For handling CSS styles.
- HtmlWebpackPlugin: For managing the HTML entry point.
##### Firebase Setup
- Log in to Firebase: npx firebase login
- Initialize hosting: npx firebase init hosting

##### Updating Firebase
After changes, build the app and deploy:
```
npm run build
npx firebase deploy --only hosting
```