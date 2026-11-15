# DontJustTrain Backend

This repository contains the backend for the DontJustTrain application. It uses Node.js, Express, and SQLite to manage user authentication and protected API endpoints.

## Authentication

The backend provides an authentication system that verifies user credentials using bcrypt and generates a JSON Web Token (JWT) upon successful authentication.

### Login Endpoint

- **Method:** POST
- **Endpoint:** `/api/auth/login`
- **Full URL (local):** `http://localhost:5000/api/auth/login`
- **Content-Type:** `application/json`

**Request Body:**

```json
{
    "email": "your-email@example.com",
    "password": "your-password"
}
```

**Expected Responses:**

| Status Code | Description |
|---|---|
| 200 | Login successful. Returns a JWT and user information. |
| 400 | Missing email or password. |
| 401 | Invalid email or password. |
| 500 | Internal server error. |

### Protected Endpoints

The backend uses JWT authentication middleware to verify tokens before allowing access to protected resources.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/protected` | Returns protected information to authenticated users. |
| GET | `/api/protected/admin` | Restricts access to users with the admin role. |

Authenticated requests must include the JWT in the Authorization header:

```text
Authorization: Bearer <your-jwt-token>
```

**Expected Authorization Responses:**

| Status Code | Description |
|---|---|
| 200 | Request successful. |
| 401 | Missing, invalid, or expired authentication token. |
| 403 | Authenticated user does not have the required permissions. |

### Role-Based Authorization

The backend implements role-based authorization to restrict access to certain resources.

- Regular users can access general protected endpoints.
- Only users with the `admin` role can access the administrator endpoint.

An authenticated regular user attempting to access the administrator endpoint receives HTTP 403.

### Authentication Testing

The authentication workflow was tested using Postman.

The following scenarios were verified:

- Valid credentials successfully authenticate the test user and return HTTP 200.
- Invalid credentials return HTTP 401.
- Requests to protected endpoints without a token return HTTP 401.
- Requests with a valid token successfully access protected information.
- Invalid tokens are rejected with HTTP 401.
- Regular users attempting to access administrator resources receive HTTP 403.

### Security Considerations

- Passwords are hashed using bcrypt before being stored in the database.
- JWTs are signed using a secret stored in environment variables.
- Authentication tokens have a limited expiration time.
- Parameterized SQL queries are used when accessing user records.
- Environment variables and database files are excluded from Git using `.gitignore`.
- Passwords, JWT secrets, and database credentials should never be committed to the public repository.