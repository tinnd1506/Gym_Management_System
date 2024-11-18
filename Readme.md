# Gym Membership Application

A gym membership application built with Node.js, allowing users to manage memberships, classes, and trainers.

## Features

- **Domain-Driven Design**: Core entities like Memberships, Classes, and Trainers are defined to reflect the application's business logic.
- **Membership Management**: Create, update, and track memberships with attributes like member ID, start date, end date, and membership type.
- **Class Management**: Create, update, and track classes with attributes like name, schedule, and trainer ID.
- **Trainer Management**: Create, update, and track trainers with attributes like name and expertise.
- **Express API**: Exposes a REST API for managing memberships, classes, and trainers.

## Technologies Used

- **Node.js**: JavaScript runtime for building backend services.
- **Express**: Web framework for creating a RESTful API.
- **dotenv**: For managing environment variables.
- **Nodemon**: Development tool for auto-restarting the server.
- **json-server**: A Node.js package that uses a JSON file as a database and automatically provides CRUD endpoints for each data type in the file.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tinnd1506/Gym_Management_Application.git
   cd gym-membership-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a .env file in the root directory and define the port (or use the default port)**:

   ```
   PORT=3000
   ```

4. **Start the application**:

   ```bash
   npm run start
   ```

### Using json-server as a Mock Database

This project uses **json-server** to simulate a REST API for development.

- Start **json-server** to serve data from `db.json`:

   ```bash
   npm run json-server
   ```

## Directory Structure

```
gym-membership/
│   ├── domain/
│   │   ├── Membership/
│   │   │   ├── Membership.js
│   │   │   ├── MembershipService.js
│   │   ├── Class/
│   │   │   ├── Class.js
│   │   │   ├── ClassService.js
│   │   ├── Trainer/
│   │   │   ├── Trainer.js
│   │   │   ├── TrainerService.js
│   ├── infrastructure/
│   │   ├── Database.js
│   ├── app.js
│   ├── index.js
```

## API Endpoints

**Memberships**

- Create a Membership: POST /memberships
- Update a Membership: PATCH /memberships/:id

**Classes**

- Create a Class: POST /classes
- Update a Class: PATCH /classes/:id

**Trainers**

- Create a Trainer: POST /trainers
- Update a Trainer: PATCH /trainers/:id

### Example Usage

To create a membership, send a POST request to /memberships with a JSON payload:

```json
{
	"id": "1",
	"memberID": "M001",
	"startDate": "2024-10-01",
	"endDate": "2025-10-31",
	"membershipType": "Standard"
}
```

### License

This project is licensed under the MIT License.
