# WeightTracker

A lightweight, mobile-friendly weight tracking app built with Angular. Log your weight, visualize your progress over time, and keep your records locally on your own device.

Note: This app is designed to be used only on mobile devices, and does not scale well for larger size screens.

## About This Project

I built Weight Tracker as a personal project to practice modern Angular development while creating a simple tool to monitor weight changes over time.

The project focuses on building a responsive, mobile-friendly interface, managing application state with Angular Signals, and visualizing data using Chart.js.

## Features

Weight logging: Record weight measurements for today or a selected date, in pounds (lb) or kilograms (kg).

Interactive chart: Visualize weight changes over time and select data points to view individual entries.

Entry management: View and delete previously recorded measurements.

Current weight: See your most recent measurement and when it was recorded.

Persistent storage: Save measurements and your preferred weight unit locally in your browser.

Progressive Web App (PWA): Install the app on supported devices for an app-like experience.

### Currently unavailable features:

- Editing entries. This can be circumvented by entering a new entry on the same date which replaces the old one.
- Converting between lb and kg.
- Importing/Exporting your entry data.

## How to Install on your phone (PWA)

WeightTracker is a **progressive web app (PWA)**, which means you can add it to your phone's Home Screen and open it like an app—no App Store or Play Store download required.

First, open the [WeightTracker website](https://jaeseol96.github.io/WeightTracker/) on your phone. The site must be published and accessible before you can install it.

### iPhone / iPad (iOS)

**Safari (recommended)**

1. Open the WeightTracker website in **Safari**.
2. Tap the **Share** button (square with an upward arrow).
3. Scroll down and tap **Add to Home Screen**.
4. If shown, leave **Open as Web App** enabled, then tap **Add**.
5. Launch **WeightTracker** from your Home Screen.

**Chrome or Firefox**

1. Open the website in **Chrome** or **Firefox**.
2. Tap the browser's **Share** button.
3. Choose **Add to Home Screen**, then **Add**.

Other iOS browsers may provide a similar option. If you cannot find it, open the site in Safari instead. Depending on the browser, the resulting icon may work as a shortcut rather than a standalone app.

### Android

**Google Chrome (recommended)**

1. Open the WeightTracker website in **Chrome**.
2. Tap the **three-dot menu (⋮)**.
3. Choose **Install** / **Install app**. On some versions, look under **Install and create shortcut**, or select **Add to Home screen**.
4. Confirm the installation and open WeightTracker from your Home Screen.

**Samsung Internet**

1. Open the website in **Samsung Internet**.
2. Tap the **+** icon in the address bar, if available, and choose **Home screen**.
3. Alternatively, open the browser menu and look for **Add page to → Home screen** (or **Add to Home screen**).
4. Confirm the prompt.

**Firefox**

1. Open the website in **Firefox for Android**.
2. Tap the **three-dot menu (⋮)** and select **Install**.
3. Follow the **Add to Home Screen** prompt.

**Other Android browsers (Edge, Brave, etc.)**

Open the browser menu and look for **Install app**, **Install**, or **Add to Home screen**. The exact wording and app-like behavior vary by browser.

> **Important:** Weight entries are currently saved **locally on your device**, not synced to an account or other devices. Clearing website data or removing the installed app may delete your entries. You must visit the site online initially; offline access depends on the PWA's cached files.

## Deployment

The application is deployed to GitHub Pages through GitHub Actions. Pushing changes to the main branch automatically triggers a production build and deployment.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```
