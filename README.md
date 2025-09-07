# Handy Local Finds - Backend

This is the backend for Handy Local Finds, a platform designed to connect users (seekers) with local service providers. It provides a RESTful API for user management, service browsing, booking, payments, and reviews.

## Features

-   **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
-   **Role-based Access Control**: Differentiated access for `seeker`, `provider`, and `admin` roles.
-   **Service Management**: Admins can create, update, and delete services. Users can browse available services.
-   **Booking System**: Seekers can book services from providers. Providers can manage their bookings.
-   **Payment Processing**: Integration for handling payments for bookings.
-   **Reviews and Ratings**: Seekers can leave reviews and ratings for services they have used.
-   **Admin Dashboard**: Endpoints for administrative tasks like user management and viewing application analytics.
-   **Profile Management**: Users can view and update their profiles, including uploading a profile image.

## Technologies Used

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Authentication**: JSON Web Tokens (jsonwebtoken)
-   **Validation**: express-validator
-   **File Uploads**: Multer

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v14.x or later recommended)
-   MongoDB
-   `npm` or `yarn` package manager

### Installation

1.  **Clone the repository**
    ```sh
    git clone <your-repository-url>
    cd handy-local-findsBackend
    ```

2.  **Install dependencies**
    ```sh
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root of the project and add the following variables. Replace the placeholder values with your actual configuration.

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/handy-local-finds
    JWT_SECRET=your_super_secret_jwt_key
    ```

4.  **Start the server**
    ```sh
    npm start
    ```
    The server should now be running on `http://localhost:3000`.

## API Endpoints

Here is a summary of the available API endpoints. The base path (e.g., `/api/auth`) depends on how the routers are mounted in your main application file.

#### Authentication (`/auth`)

-   `POST /register`: Register a new user.
-   `POST /login`: Log in a user and get a JWT.
-   `GET /profile`: Get the profile of the currently authenticated user.
-   `PUT /profile`: Update the profile of the currently authenticated user (supports profile image upload).

#### Services (`/services`)

-   `GET /`: Browse all available services (Public).

#### Bookings (`/bookings`)

-   `POST /`: Create a new booking (Seeker).
-   `GET /`: Get bookings (for Seekers and Providers).
-   `PUT /:id/status`: Update the status of a booking (Provider).

#### Reviews (`/reviews`)

-   `POST /`: Add a review for a service (Seeker).
-   `GET /:serviceId`: Get all reviews for a specific service (Public).

#### Payments (`/payments`)

-   `POST /`: Make a payment for a booking (Seeker).
-   `GET /:bookingId`: Get payment details for a booking (Public).

#### Admin (`/admin`)

-   `POST /services`: Create a new service (Admin).
-   `PUT /services/:id`: Update an existing service (Admin).
-   `DELETE /services/:id`: Delete a service (Admin).
-   `GET /services`: List all services (Admin).
-   `GET /users`: List all users (Admin).
-   `DELETE /users/:id`: Delete a user (Admin).
-   `GET /analytics/summary`: Get a summary of application analytics (Admin).
-   `GET /analytics/user-signups`: Get user signup statistics (Admin).
-   `GET /analytics/provider-rankings`: Get provider rankings (Admin).
-   `GET /analytics/booking-stats`: Get booking statistics (Admin).

## Project Structure

```
handy-local-findsBackend/
├── controllers/      # Logic for handling requests
├── middleware/       # Express middleware (auth, validation)
├── models/           # Mongoose models and schemas
├── routes/           # API route definitions
├── uploads/          # Directory for uploaded files (e.g., profile images)
├── .env.example      # Example environment variables
├── app.js            # Main application file
├── package.json
└── README.md
```