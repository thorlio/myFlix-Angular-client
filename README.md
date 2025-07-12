# MyFlix Angular Client

This is the frontend for the **myFlix** movie app built with **Angular 20.0.3**. It allows users to browse movies, manage their profiles, and interact with the myFlix API.

## Features

- User registration and login
- Browse a list of movies
- View details about each movie, director, and genre
- Add/remove movies from a list of favorites
- Update or delete user profile

## Technologies Used

- Angular 20.0.3
- Angular Material
- TypeScript
- RxJS & Observables
- Angular Router
- TypeDoc for documentation

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- Angular CLI (Install globally using `npm install -g @angular/cli`)

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/thorlio/myFlix-Angular-client.git
   cd myFlix-Angular-client

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   ng serve
   ```

4. Open your browser to:
   ```
   http://localhost:4200/
   ```

## Documentation

To generate TypeDoc documentation:

```bash
npx typedoc src/app
```

Documentation will be located in the `/docs` folder (or `/out`, depending on config).

## Build

To build the app for production:

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

## Testing

### Unit Tests

```bash
ng test
```

### End-to-End Tests

```bash
ng e2e
```

## Deployment

You can deploy the app using services like:

- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [GitHub Pages](https://angular.io/guide/deployment#deploy-to-github-pages)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
