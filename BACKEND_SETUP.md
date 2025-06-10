# Weather App Backend Integration Guide

This guide will help you set up and run the backend server for CRUD operations on weather and location data.

## 1. Install Backend Dependencies

```
npm install --prefix . -f --package-lock-only --package=package.backend.json && npm install --prefix .
```
Or, if you want to install only backend dependencies:
```
npm install --prefix . --package=package.backend.json
```

## 2. Start the Backend Server

```
node server.js
```
The backend will run at `http://localhost:4000`.

## 3. API Endpoints

- `POST   /api/weather`      — Create a weather record
- `GET    /api/weather`      — Get all weather records
- `GET    /api/weather/:id`  — Get a single weather record
- `PUT    /api/weather/:id`  — Update a weather record
- `DELETE /api/weather/:id`  — Delete a weather record

## 4. Frontend Integration

- Update your frontend API calls to use `http://localhost:4000/api/weather` for CRUD operations.
- Example (using fetch):

```js
fetch('http://localhost:4000/api/weather')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 5. Database

- The backend uses SQLite (`weather.db` file will be created automatically).

## 6. Customization

- You can extend the API or database schema as needed for the project.

---

