
# Pomodoro Timer Application (Microservices & Cloud-Native)

This project is a **cloud-native**, **microservices-based** web application that utilizes **Kubernetes (K8s)** for orchestration. The application consists of a backend API and frontend UI, designed to be scalable and modular using microservices architecture. Each service (frontend and backend) is containerized using Docker, and the application is deployed on a Kubernetes cluster.

## Project Structure

```
/backend            # Node.js Express API (microservice)
/frontend           # React frontend for the Pomodoro Timer (microservice)
/kubernetes         # Kubernetes YAML files for deployment, services, and Ingress
```

## Features

- Start, track, and clear Pomodoro timers.
- Live countdown for each active timer.
- Microservices architecture for better scalability and modularity.
- Deployed using Docker containers with Kubernetes orchestration.
- Cloud-native design leveraging K8s for service management and scaling.

## Prerequisites

Make sure you have the following installed on your machine:
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [Kubernetes](https://kubernetes.io/) (local k3s or minikube cluster)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Running Locally with Docker

#### **Backend**

To build and run the **backend** microservice:
```bash
cd backend
docker build -t pomodoro-backend .
docker run -p 4000:4000 pomodoro-backend
```
The backend server will be running on `http://localhost:4000`.

#### **Frontend**

To build and run the **frontend** microservice:
```bash
cd frontend
docker build -t pomodoro-frontend .
docker run -p 3000:80 pomodoro-frontend
```
The frontend UI will be available at `http://localhost:3000`.

### 3. Deploying with Kubernetes (K8s)

The project includes Kubernetes YAML files for deploying the frontend and backend services in a cloud-native environment.

- **Backend Deployment**: `kubernetes/backend-deployment.yaml`
- **Frontend Deployment**: `kubernetes/frontend-deployment.yaml`
- **Service Configurations**: `kubernetes/backend-service.yaml` and `kubernetes/frontend-service.yaml`
- **Ingress Setup**: `kubernetes/app-ingress.yaml`

#### Steps to Deploy

1. Make sure your local Kubernetes cluster is running (e.g., k3s, minikube).
2. Apply the YAML files in the `kubernetes/` directory:

```bash
kubectl apply -f kubernetes/
```

This will create the necessary deployments, services, and Ingress to run the microservices-based Pomodoro Timer application.

## Microservices & Cloud-Native Design

This project emphasizes a **microservices architecture** where the frontend and backend are independent services. By utilizing **Kubernetes**, the application benefits from cloud-native features such as:

- **Scalability**: Easily scale services based on demand.
- **Resilience**: Automatic restarts and self-healing for containers.
- **Portability**: Runs consistently across different cloud providers and environments.
- **Service Discovery**: Kubernetes services provide internal DNS for service communication.
