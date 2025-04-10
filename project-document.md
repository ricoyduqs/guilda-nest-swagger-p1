# 📘 Api Swagger Documentation
**Versão:** 0.0.1

---


## 📂 app

### GET `/health`
**Resumo:** Check service status

Route used to check the status of the system and its dependencies.

// Request
GET /health

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
]
```

---


## 📂 user

### POST `/user`
**Resumo:** Create a new user

Create a new user

// Request
POST /user
Content-Type: application/json

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

// Response 201 Created
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

// Response 400 Bad Request
```json
{
  "status": "error",
  "timestamp": "2025-04-10T22:43:27.680Z",
  "error": "Invalid data provided"
}
```

---

### GET `/user`
**Resumo:** Return all users

Return all users

// Request
GET /user

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
]
```

---

### GET `/user/{id}`
**Resumo:** Return one of many users

Return one of many users

// Request
GET /user/{id}

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```
// Response 404 Not Found
```json
{
  "status": "error",
  "timestamp": "2025-04-10T22:43:27.681Z",
  "error": "Resource not found"
}
```

---
