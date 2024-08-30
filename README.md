# Assetec - Stock Portfolio Manager

Assetec is a full-stack web application that allows users to manage their stock portfolio efficiently. Built using Django for the backend and React with Vite for the frontend, the app provides full CRUD (Create, Read, Update, Delete) functionalities for managing stock holdings. The application supports user authentication, portfolio management, and dynamic data updates for stock values.

## Table of Contents

- [Live Demo](%22%E2%80%8C%22 "‌")
- [Features](%22%E2%80%8C%22 "‌")
- [Technology Stack](%22%E2%80%8C%22 "‌")
- [Setup and Installation](%22%E2%80%8C%22 "‌")
- [Environment Variables](%22%E2%80%8C%22 "‌")
- [Folder Structure](%22%E2%80%8C%22 "‌")
- [Key Components](%22%E2%80%8C%22 "‌")
- [API Endpoints](%22%E2%80%8C%22 "‌")
- [Potential Future Developments](%22%E2%80%8C%22 "‌")
- [Project Management](%22%E2%80%8C%22 "‌")
- [Contributing](%22%E2%80%8C%22 "‌")
- [License](%22%E2%80%8C%22 "‌")

## Live Demo

- Backend: [https://assetec-15d8b96cc456.herokuapp.com/](https://assetec-15d8b96cc456.herokuapp.com/ "‌")
- Frontend: [https://assetec.netlify.app/](https://assetec.netlify.app/ "smartCard-inline")

## Features

- **User Authentication**: Secure login and sign-up functionality using JWT.
- **Portfolio Management**: Users can create, read, update, and delete their stock holdings.
- **Dynamic Portfolio Overview**: Real-time calculations of portfolio value and performance based on stock updates.
- **Top Performers**: Display the top 10 performing stocks in the user’s portfolio.
- **Responsive Design**: The application is responsive and works seamlessly across different devices.
- **Image Upload**: Users can upload a profile picture that is displayed in the app header.
- **Error Handling**: Comprehensive error handling throughout the app, including form validation and API response management.

## Technology Stack

### Backend

- **Django**: Used as the web framework for building the backend API.
- **Django REST Framework**: Facilitates the creation of RESTful APIs.
- **PostgreSQL**: Database management system for storing user and stock data.
- **SimpleJWT**: Used for managing authentication tokens.

### Frontend

- **React**: JavaScript library for building the user interface.
- **Vite**: Next-generation frontend tooling for a fast development environment.
- **CSS**: Custom styling for the application.
- **Fetch API**: Used for making HTTP requests to the backend API.

### Deployment

- **Heroku**: Used for deploying the backend (Django) application.
- **Netlify**: Used for deploying the frontend (React) application.

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- Python and pip installed
- PostgreSQL database

### Backend Setup

1. **Clone the repository**:
    ```
     `git clone https://github.com/yourusername/assetec.git cd assetec/backend`
    ```

2. **Create a virtual environment**:
    ```
    `python3 -m venv env source env/bin/activate`
    ```

3. **Install dependencies**:
   ```
   `pip install -r requirements.txt`
   ```
4. **Set up environment variables**: Create a `.env` file in the backend directory with the following:
   ```
   `SECRET_KEY=your_secret_key DATABASE_URL=your_database_url DEBUG=True ALLOWED_HOSTS=localhost,127.0.0.1,.herokuapp.com`
   ``` 
5. **Run migrations**:
   ```
   `python manage.py migrate`
   ```

6. **Start the backend server**:
   ```
   `python manage.py runserver`
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```
   `cd ../frontend`
   ```
   
2. **Install dependencies**:
   ```
   `npm install`
   ```

3. **Set up environment variables**: Create a `.env` file in the frontend directory with the following:
   ```
   `VITE_BACK_END_SERVER_URL=https://assetec-15d8b96cc456.herokuapp.com/`
   ```
   
4. **Start the frontend server**:
   ```
   `npm run dev`
   ```

## Environment Variables

### Backend

- `SECRET_KEY`: Django secret key for production.
- `DATABASE_URL`: PostgreSQL database URL.
- `DEBUG`: Set to `True` during development, `False` in production.
- `ALLOWED_HOSTS`: Hosts allowed to access the Django app.

### Frontend

- `VITE_BACK_END_SERVER_URL`: URL for the backend server.

## Folder Structure

.
├── backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── assets
│   └── ...
└── frontend
    ├── src
    │   ├── App.jsx
    │   ├── components
    │   ├── assets
    │   └── ...
    ├── index.html
    ├── package.json
    └── vite.config.js

## Key Components

### Backend

- `views.py`: Contains the CRUD logic for managing stocks.
- `serializers.py`: Handles data serialization for the API.
- `models.py`: Defines the data models for the application.

### Frontend

- `AuthContext.jsx`: Manages user authentication and tokens.
- `CreateHolding.jsx`: Component for creating a new stock holding.
- `ManageHolding.jsx`: Component for managing (editing/deleting) a specific stock holding.
- `UserIndexPage.jsx`: Main dashboard displaying the user’s portfolio overview and top performers.

## API Endpoints

- `GET /stocks/`: Retrieve all stocks for the logged-in user.
- `POST /stocks/`: Create a new stock holding.
- `GET /stocks/:id/`: Retrieve a specific stock holding.
- `PUT /stocks/:id/`: Update a specific stock holding.
- `DELETE /stocks/:id/`: Delete a specific stock holding.

## Potential Future Developments

- **Advanced Analytics**: Introduce more advanced analytics features, such as stock performance predictions and risk assessments.
- **User Roles and Permissions**: Implement different user roles (e.g., admin, premium user) with varying access levels.
- **Notifications System**: Add a system to notify users of significant portfolio changes or stock market events.
- **Mobile App**: Develop a companion mobile application for easier portfolio management on the go.
- **Internationalization (i18n)**: Expand the application to support multiple languages.

## Project Management

Project management and task tracking are handled through Trello. You can view the project board here: [Trello Board](https://trello.com/invite/b/66c2dc45041dd12dcd900bd9/ATTI7ebe119c193c17ed60831f044a5b6addAC5EFF61/seb-project4-djangocrud-app "‌")

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.