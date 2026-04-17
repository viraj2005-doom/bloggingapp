# BloggingApp

A full-stack blog application with JWT authentication, image uploads, server-side rendering, and Docker support for easy deployment.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Templating:** EJS
- **Authentication:** JWT in HTTP-only cookies
- **File Uploads:** Multer
- **Containerization:** Docker

## Features

- User signup and signin with hashed passwords
- JWT-based authentication using cookies
- Create and read blog posts with cover image upload
- Comment on blog posts
- Role-based user model (`user` / `admin`)
- Server-side rendered pages with EJS
- Dockerized deployment for consistent local and production runs
- Published Docker Hub image for quick startup

## Project Structure

```text
.
|-- app.js
|-- controllers/
|-- middlewares/
|   `-- auth.js
|-- models/
|   |-- blog.js
|   |-- comment.js
|   `-- user.js
|-- public/
|   |-- images/
|   `-- uploads/
|-- routes/
|   |-- blog.js
|   `-- user.js
|-- service/
|   `-- auth.js
|-- views/
|   |-- partials/
|   |-- addblog.ejs
|   |-- blog.ejs
|   |-- home.ejs
|   |-- signin.ejs
|   `-- signup.ejs
|-- Dockerfile
|-- .dockerignore
|-- package.json
`-- package-lock.json
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/blogapp
```

## Run Locally

### Prerequisites

- Node.js 16 or later
- MongoDB

### Installation

1. Clone the repository

```bash
git clone https://github.com/viraj2005-doom/bloggingapp.git
cd blogappbackend
```

2. Install dependencies

```bash
npm install
```

3. Start the app

```bash
# Development
npm run dev

# Production
npm start
```

4. Open `http://localhost:8000`

## Docker

This project includes a production-ready [Dockerfile](/a:/blogappbackend/Dockerfile) for building a container image.

### Build Docker Image

```bash
docker build -t bloggingapp .
```

### Run Docker Container

```bash
docker run -p 8000:8000 -e PORT=8000 -e MONGODB_URI="mongodb://host.docker.internal:27017/blogify" bloggingapp
```

Open `http://localhost:8000` after the container starts.

### Pull from Docker Hub

The image is also available on Docker Hub:

```bash
docker pull viraj3007/bloggingapp:latest
docker run -p 8000:8000 -e PORT=8000 -e MONGODB_URI="mongodb://host.docker.internal:27017/blogify" viraj3007/bloggingapp:latest
```

### Docker Notes

- The app needs `MONGODB_URI` to connect to MongoDB.
- `public/uploads` is created inside the image for blog cover uploads.
- `.env` is excluded from the image by `.dockerignore`, so pass variables with `-e` or `--env-file`.
- If you open a shell inside the container, use `sh` instead of `cmd`.

## API Routes

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/` | Home page with all blogs | Yes |
| GET | `/user/signin` | Sign in page | No |
| GET | `/user/signup` | Sign up page | No |
| POST | `/user/signin` | Sign in user | No |
| POST | `/user/signup` | Register user | No |
| GET | `/user/signout` | Sign out user | No |
| GET | `/blog/add` | Add blog form | Yes |
| POST | `/blog/add` | Create blog post | Yes |
| GET | `/blog/:id` | View single blog | Optional |
| POST | `/blog/comment/:blogId` | Add comment | Yes |
