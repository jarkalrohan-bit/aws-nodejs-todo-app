# 🚀 Node.js Todo App — Docker & AWS ECS Fargate

A full-stack Todo application built with Node.js, Express, HTML, CSS, and JavaScript, containerized with Docker, and deployed to Amazon ECS using AWS Fargate.

This project demonstrates practical DevOps and AWS skills, including Docker containerization, Amazon ECR, ECS, Fargate, IAM, VPC networking, Security Groups, and CloudWatch.

It was built as a hands-on project to understand the workflow of building, containerizing, deploying, and monitoring a web application on AWS.


---
## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js

- **Frontend:** HTML, CSS, JavaScript

- **Containerization:** Docker

- **AWS:** ECR, ECS, Fargate, IAM, VPC, Security Groups, CloudWatch

- **API:** RESTful CRUD API
---

## 🚀 Features
- Add, update, delete todos
- Mark todos as complete/undo
- Simple frontend with HTML, CSS, and JavaScript
- RESTful backend API with Express
- Dockerized for portability
- Deployed on AWS ECS with monitoring via CloudWatch

---
## 🏗️ Architecture
```
                 Browser
                    │
                    ▼
             Node.js / Express
                    │
                    ▼
              Docker Container
                    │
                    ▼
              Amazon ECS
               Fargate
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
       Amazon ECR        CloudWatch
     Docker Images          Logs

```

---

## 📂 Project Structure

```
node-todo/
│── server.js        # Backend API
│── package.json     # Dependencies
│── Dockerfile       # Docker build instructions
│── .gitignore       # GitHub ignore file
│── .dockerignore    # Docker ignore file
│── public/          # Frontend UI
│   ├── index.html
│   ├── style.css
│   └── script.js
```
---
## 🔌 REST API

| **Method** | **Endpoint**   | **Description**        |
|------------|----------------|------------------------|
| GET        | `/todos`       | Get all Todos          |
| POST       | `/todos`       | Create a Todo          |
| PUT        | `/todos/:id`   | Update a Todo          |
| DELETE     | `/todos/:id`   | Delete a Todo          |


Example:
```
curl http://localhost:3000/todos
```

---

## ⚙️ Setup (Local Development)
### Prerequisites
- Node.js

- npm

- Docker

- Git

1. Clone the repository:
```bash
 git clone https://github.com/jarkalrohan-bit/aws-nodejs-todo-app.git
 cd dockerized-node-todo
```
2. Install dependencies:
```bash
 npm install
```
3. Run the app:
```bash
 node server.js
```
4. The application runs on:
```  
 Open http://localhost:3000 (localhost in Bing) in your browser.
```
Open the URL in your browser.

## 🐳 Docker Setup
1. Build the image:

```bash
docker build -t node-todo .
```

2.    Run the container:

```bash
docker run -p 3000:3000 node-todo
```
The application will be available at:
```
http://localhost:3000
```
## ☁️ AWS Deployment

 The application was containerized and deployed to AWS using Amazon ECR and Amazon ECS with AWS Fargate.

 ## Deployment Workflow

```
Application Source Code
        │
        ▼
      Docker
        │
        ▼
   Docker Image
        │
        ▼
    Amazon ECR
        │
        ▼
   Amazon ECS
        │
        ▼
   AWS Fargate
        │
        ▼
   Running Container
        │
        ▼
  Node.js Application
```

---

 ## 1\. Build the Docker Image

```
docker build -t node-todo-app .
```

---

 ## 2\. Authenticate with Amazon ECR

 Example:

```
aws ecr get-login-password --region YOUR_REGION | \
docker login \
--username AWS \
--password-stdin YOUR_AWS_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com
```

 Replace:

 - `YOUR_REGION`
- `YOUR_AWS_ACCOUNT_ID`

 with your AWS configuration.

---

 ## 3\. Tag the Docker Image

```
docker tag node-todo-app:latest \
YOUR_AWS_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com/node-todo-app:latest
```

---

 ## 4\. Push the Image to Amazon ECR

```
docker push \
YOUR_AWS_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com/node-todo-app:latest
```

 The Docker image is now available in the Amazon ECR repository.

---

 ## 5\. Create the ECS Task Definition

 The ECS task definition specifies:

 - Container image
- CPU and memory
- Container port
- Network mode
- IAM task/execution roles
- CloudWatch logging configuration

 The application runs on:

```
Port: 3000
```

 The container uses:

```
Container Port: 3000
Host Port: 3000
Protocol: TCP
```

---

 ## 6\. Deploy with AWS Fargate

 The container image from Amazon ECR is deployed as an ECS Fargate task.

 The deployment uses:

 - Amazon ECS
- AWS Fargate
- `awsvpc` networking
- VPC networking
- Security Groups
- IAM roles
- CloudWatch logging

---

## 🔐 Networking

 The ECS Fargate task uses AWS VPC networking.

 The Node.js application listens on port `3000`.

 For containerized deployment, the server should listen on:

```
0.0.0.0:3000
```

 The Security Group controls which network traffic is allowed to reach the application.

 For production use, network access should be restricted appropriately rather than exposing application ports unnecessarily.

---

## 📊 Monitoring

 Application and container logs can be viewed through **Amazon CloudWatch**.

 CloudWatch logs are useful for troubleshooting:

- Application startup
- Node.js errors
- Container errors
- Deployment problems
- Runtime issues

 One important lesson from this deployment was that:

 > An ECS task showing `RUNNING` does not necessarily mean that the application is reachable from the Internet.

 Troubleshooting required checking the application, container port, ECS configuration, networking, and Security Group rules.


## AWS skills demonstrated
- Created and pushed Docker images to Amazon ECR

- Created and configured ECS task definitions

- Deployed containers using AWS Fargate

- Configured IAM roles

- Configured VPC networking and Security Groups

- Configured CloudWatch logging

- Troubleshot ECS container and networking issues


## ⚠️ Current Limitation
Todo data is currently stored in memory using a JavaScript array.

Therefore, Todo data is lost when the application or ECS task restarts.

## 🔮 Future Improvements

- [ ] Add persistent database storage with PostgreSQL or DynamoDB
- [ ] Add user authentication and authorization
- [ ] Add automated tests
- [ ] Add CI/CD pipeline with GitHub Actions
- [ ] Deploy behind an Application Load Balancer with HTTPS
- [ ] Add CloudWatch alarms and improved monitoring
- [ ] Add Docker image versioning and automated deployments

## 👨‍💻 Author

**Rohan**

Aspiring DevOps & Cloud Engineer focused on **AWS, Docker, Linux, CI/CD, and cloud infrastructure**.

