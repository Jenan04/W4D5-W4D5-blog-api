# 📝 Basic Blog API – Training Task

This project is a simple RESTful API built with **Node.js** and **Express.js**.  
It’s designed to help you practice core backend development concepts such as:

- Routing
- Handling HTTP requests
- Managing simple data relationships

> 💡 All data is stored in memory, so it will be reset when the server restarts. This keeps things simple and focused on learning.

---

## 🛠 Technologies Used

- **Node.js** – JavaScript runtime environment
- **Express.js** – Lightweight web framework for building APIs

---

## 📌 API Endpoints

| Method | Endpoint              | Description                                 |
|--------|-----------------------|---------------------------------------------|
| POST   | `/users`              | Create a new user                           |
| POST   | `/posts`              | Create a new blog post                      |
| GET    | `/posts`              | Get a list of all blog posts                |
| GET    | `/posts/user/:userId` | Get all posts created by a specific user ID |

---

## 👤 User Object Format

When creating a user, the request body should be in JSON format like this:

```json
{
  "id": 1,
  "firstname": "John",
  "secondname": "Doe",
  "password": "yourPassword123"
}
```

##  Post Object Format

When creating a post, the request body should include the user ID, post title, and content:

```json
{
  "userId": 1,
  "title": "My First Post",
  "content": "This is the content of my very first post. Hello world!"
}
```

##  Post Object Format 
Postman Collection Required
Please organize and test all the above endpoints using Postman.
You must submit a Postman collection that includes:

All the API requests listed above

Sample request bodies

Any required headers (e.g., Content-Type: application/json)

🧪 This shows that your API is functional and helps you build the habit of documenting and testing your endpoints.


## Goal of This Task
- Build and test simple RESTful endpoints

- Understand request handling in Express

- Practice working with data stored in memory (no database)

- Get comfortable using Postman to test APIs