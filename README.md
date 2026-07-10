Expense Tracker 

A simple Expense Tracker application containerized using Docker for easy setup and deployment on any machine.

Features

* Add and manage expenses
* Track expense details
* Dockerized application setup

Tech Stack

* React + Vite
* Node.js *(if applicable)*
* Docker

Run with Docker

Build Image
docker build -t expense-tracker .

 Run Container
docker run -p 5173:5173 expense-tracker


Open:
http://localhost:5173

Docker Includes
* Lightweight base image
* `.dockerignore` optimization
* Environment variable support

Environment Variables
Create a `.env` file:
env
VITE_API_URL=your_api_url
