# Gym Membership Application Server

This server application is part of the Gym Membership Application, built using Node.js and Express. It provides a RESTful API to manage gym memberships, classes, trainers, and workouts.

## Features

- **Domain-Driven Design**: Core entities like Memberships, Classes, Trainers, and Workouts are defined to reflect the application's business logic.
- **CRUD Operations**: Supports creating, reading, updating, and deleting data for memberships, classes, trainers, and workouts.
- **Authentication and Authorization**: Implements JWT-based authentication and authorization to secure API endpoints.
- **Error Handling**: Robust error handling to provide clear error messages and HTTP status codes.
- **Environment Configuration**: Uses dotenv for environment configuration to manage sensitive and environment-specific settings.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **JWT (jsonwebtoken)**: A compact, URL-safe means of representing claims to be transferred between two parties.
- **bcryptjs**: A library to help you hash passwords.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher recommended)
- npm (Node package manager)
- PostgreSQL database

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tinnd1506/Gym_Management_Application.git
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the PostgreSQL database**:
   - Ensure PostgreSQL is installed and running on your machine.
   - Create a database named `gym_app`.

4. **Configure environment variables**:
   - Create a `.env` file in the root directory, take the `.env.example` file as a template.

5. **Start the server**:
   ```bash
   npm run start
   ```

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in a user and receive a JWT token.
- **POST** `/api/auth/logout`: Log out a user and invalidate the JWT token.

### User
- **GET** `/api/user/profile`: Retrieve the profile of the authenticated user.
- **PUT** `/api/user/profile`: Update the profile of the authenticated user.

### Workouts
- **GET** `/api/workouts`: Retrieve all workouts (requires authentication).
- **GET** `/api/workouts/search`: Search and filter workouts based on query parameters (requires authentication).
- **POST** `/api/workouts`: Create a new workout (requires authentication and JSON content type).
- **PUT** `/api/workouts/:id`: Update an existing workout by ID (requires authentication and JSON content type).
- **DELETE** `/api/workouts/:id`: Delete a workout by ID (requires authentication).
- **PATCH** `/api/workouts/:id/status`: Change the status of a workout by ID (requires authentication and JSON content type).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
