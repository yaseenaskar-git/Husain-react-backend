# Husain-react-backend

## Authentication

The backend provides an authentication endpoint that verifies user credentials using bcrypt and generates a JSON Web Token (JWT) upon successful authentication.

### Login Endpoint

- **Method:** POST
- **Endpoint:** `/api/auth/login`
- **Full URL (local):** `http://localhost:5000/api/auth/login`
- **Content-Type:** `application/json`

**Request Body:**

```json
{
    "email": "test@example.com",
    "password": "Testpass123!"
}
```

**Expected Responses:**

| Status Code | Description |
|---|---|
| 200 | Login successful. Returns a JWT and user information. |
| 400 | Missing email or password. |
| 401 | Invalid email or password. |
| 500 | Internal server error. |

### Authentication Testing

The login endpoint was tested with valid and invalid credentials.

- Valid credentials successfully authenticated the test user and returned HTTP 200.
- Invalid credentials were rejected with HTTP 401.