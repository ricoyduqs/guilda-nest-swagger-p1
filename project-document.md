# 📘 Api Swagger Documentation
**Versão:** 0.0.1

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
  "timestamp": "2025-04-11T14:24:45.091Z",
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
  "timestamp": "2025-04-11T14:24:45.093Z",
  "error": "Resource not found"
}
```

---
