# Job Posting Application Backend Documentation

Welcome to the documentation for the backend of the Job Posting Application. This document provides an overview of the available API endpoints and their functionalities.

**Base URL**: `https://match-your-role.onrender.com`

## User Endpoints

### Register a New User

Create a new user account.

- **Endpoint**: `/user/register`
- **Method**: POST
- **Request Body**:
  - `email` (string): User's email
  - `password` (string): User's password
- **Response**:
  - `message`: Registration success message

### User Login

Log in with an existing user account and get a JWT token.

- **Endpoint**: `/user/login`
- **Method**: POST
- **Request Body**:
  - `email` (string): User's email
  - `password` (string): User's password
- **Response**:
  - `token`: JWT token for authentication
  - `message`: Login success message

## Job Endpoints

### Create a New Job Listing

Create a new job listing.

- **Endpoint**: `/user/job/create`
- **Method**: POST
- **Request Body**:
  - `title` (string): Job title
  - `company` (string): Company name
  - `location` (string): Job location
  - `description` (string): Job description
  - `ctc` (string): Compensation package
  - `opening` (number): Number of job openings
- **Response**:
  - `message`: Job listing creation success message

### Get All Job Listings

Get a list of all job listings with pagination and search options.

- **Endpoint**: `/user/job`
- **Method**: GET
- **Query Parameters**:
  - `page` (number, optional): Page number for pagination (default: 1)
  - `limit` (number, optional): Number of items per page (default: 10)
  - `search` (string, optional): Search query for filtering job listings by title or company
- **Response**:
  - `data`: Array of job listings
  - `currentPage`: Current page number
  - `totalPages`: Total number of pages

### Get Details of a Job Listing

Get details of a specific job listing by its ID.

- **Endpoint**: `/user/job/:id`
- **Method**: GET
- **Response**:
  - Job details object

### Update a Job Listing

Update details of a specific job listing by its ID.

- **Endpoint**: `/user/job/:id`
- **Method**: PUT
- **Request Body**: Same fields as create endpoint
- **Response**:
  - `message`: Job listing update success message
  - Updated job details object

### Delete a Job Listing

Delete a specific job listing by its ID.

- **Endpoint**: `/user/job/:id`
- **Method**: DELETE
- **Response**:
  - `message`: Job listing delete success message

### Apply for a Job Listing

Apply for a specific job listing.

- **Endpoint**: `/user/job/:id/apply`
- **Method**: POST
- **Response**:
  - `message`: Job application submission success message

### Get List of Applications for a Job Listing

Get a list of applications for a specific job listing.

- **Endpoint**: `/user/job/:id/applications`
- **Method**: GET
- **Response**:
  - `applications`: Array of user IDs who have applied

## Chat Endpoints (Example)

These endpoints are used for chat functionality.

- **Endpoint**: `/user/chat/create`
- **Method**: POST
- Create a new chat room.

- **Endpoint**: `/user/chat/:roomId/message`
- **Method**: POST
- Send a message in a chat room.

- **Endpoint**: `/user/chat/:roomId/messages`
- **Method**: GET
- Get messages from a chat room.

## Authentication

JWT (JSON Web Token) is used for user authentication. To access protected routes, include the JWT token in the `Authorization` header of the request.

- **Header**: `Authorization: Bearer <token>`

---

**Note**: Replace `<token>` with the actual JWT token obtained after logging in.

For more details on request and response structures, error handling, and usage examples, refer to the source code and API endpoint descriptions.

For frontend documentation and other application details, refer to the [frontend repository](https://github.com/your-username/frontend-repo).

For any inquiries or issues, please contact [your-email@example.com](mailto:your-email@example.com).

