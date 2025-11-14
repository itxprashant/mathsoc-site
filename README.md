# MathSoc IITD - React Version

This is a React.js conversion of the original HTML/CSS/JS Mathematics Society IIT Delhi website.

## Features

- **Identical Design**: Pixel-perfect conversion of the original site
- **React Router**: Client-side routing for seamless navigation
- **Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **Responsive Design**: Mobile-friendly layout using Bootstrap
- **TypeScript**: Type-safe development
- **RSS Feed Integration**: Fetches latest blog posts from the official blog
- **Contact Form**: Working contact form with Formspree integration

## Pages

- **Home**: Main landing page with featured content, blog posts, and professor talks
- **About**: Information about the Mathematics Society
- **Events**: Timeline of upcoming and past events
- **Team**: Team members with their roles and social links
- **Contact**: Contact information and contact form

## Technology Stack

- React 18 with TypeScript
- React Router DOM for routing
- Bootstrap 4 for styling
- Font Awesome for icons
- CSS3 with custom styling
- Formspree for form handling

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Build for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Assets

All images, logos, and other assets are stored in the `public` folder and are identical to the original site.

## Dark Mode

The site supports dark mode which can be toggled using:
- Footer toggle link
- Switch component on the home page

The theme preference is saved to localStorage and persists across sessions.

## Original vs React

This React version maintains identical functionality to the original HTML/CSS/JS version while providing:
- Better code organization with component-based architecture
- Type safety with TypeScript
- Modern development tooling
- Improved maintainability
- State management with React hooks

## Copyright

Copyright © 2025 Mathematics Society, IIT Delhi

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
