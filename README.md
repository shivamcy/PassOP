# PassOP - Password Manager

PassOP is a secure and user-friendly password manager that allows users to store, view, and delete their passwords conveniently. The project is built using **React.js** for the frontend and **Node.js with Express and MongoDB** for the backend.

## Features
- Save passwords with associated websites and usernames.
- View stored passwords securely with visibility toggle.
- Edit or delete saved passwords.
- Animated UI using Framer Motion for a smooth experience.

## Tech Stack
- **Frontend:** React.js, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Steps
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/PassOP.git
   cd PassOP
   ```
2. **Backend Setup**
   ```sh
   cd backend
   npm install
   node server.js
   ```
   The backend will start on `http://localhost:3000/`.

3. **Frontend Setup**
   ```sh
   cd ../frontend
   npm install
   npm start
   ```
   The frontend will start on `http://localhost:5173/`.

## API Endpoints

### Save a Password
**POST** `/`
```json
{
  "site": "example.com",
  "username": "user123",
  "password": "securepass"
}
```

### Get All Passwords
**GET** `/`
Returns an array of stored passwords.

### Delete a Password
**DELETE** `/`
```json
{
  "site": "example.com",
  "username": "user123",
  "password": "securepass"
}
```

## Usage
- Open the web app and enter website, username, and password.
- Click **Add Password** to save.
- Click **Edit** to update an entry.
- Click **Delete** to remove an entry.
- Toggle password visibility by clicking the **Show/Hide** button.

## Contributing
Feel free to contribute to this project by submitting pull requests or reporting issues!



