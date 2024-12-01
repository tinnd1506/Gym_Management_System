# Gym Management Client

This is the client-side application for the Gym Management System, built using React and Vite. It provides a user interface for managing gym memberships, workouts, and user profiles.

## Features

- **React with Vite**: Utilizes Vite for fast development and build processes.
- **Chakra UI**: Implements Chakra UI for a responsive and accessible design.
- **Authentication**: Supports user login and registration.
- **Workout Management**: Allows users to create, update, and delete workouts.
- **Profile Management**: Users can view and edit their profiles.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **Chakra UI**: A simple, modular, and accessible component library.
- **Axios**: A promise-based HTTP client for the browser and Node.js.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher recommended)
- npm (Node package manager)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tinnd1506/Gym_Management_Application.git
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build.

## Pages

- **HomePage**: The landing page where users can log in or register. If a user is already logged in, they are redirected to the workouts page.
- **UserPage**: Allows users to view and edit their profile information, including email, username, fitness goals, and workout preferences.
- **WorkoutPage**: Displays a list of workouts and provides functionality to create, update, and delete workouts. Users can also search and filter workouts by name and status.

## Components

- **Navbar**: Provides navigation links to different parts of the application, such as Workouts and Profile, and includes login/logout functionality.
- **AuthForm**: Handles user authentication, allowing users to log in or register. It includes form validation and error handling.
- **WorkoutList**: Displays workouts in a table or card format, depending on the screen size, and allows users to edit or delete workouts.
- **WorkoutForm**: A form for creating or updating workouts, including fields for name, description, and status.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
