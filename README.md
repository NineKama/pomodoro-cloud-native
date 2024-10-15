# Pomodoro Timer Application (Microservices & Cloud-Native)

This project is a **cloud-native**, **microservices-based** web application that utilizes **Kubernetes (K8s)** for orchestration. The application consists of a backend API and frontend UI, designed to be scalable and modular using microservices architecture. Each service (frontend and backend) is containerized using Docker, and the application is deployed on a Kubernetes cluster.

# Build and Test Status

| Service   | Build Status                                                                                                                                 | Coverage Status | Trivy Status|                                                                                                                                   |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Backend   | [![Backend - CI](https://github.com/NineKama/pomodoro-cloud-native/actions/workflows/ci-test.yaml/badge.svg)](https://github.com/NineKama/pomodoro-cloud-native/actions/workflows/ci-test.yaml) | [![codecov](https://codecov.io/gh/NineKama/pomodoro-cloud-native/graph/badge.svg?token=HRHADVP83X)](https://codecov.io/gh/NineKama/pomodoro-cloud-native) |  [![Docker Image CI/CD with Trivy](https://github.com/NineKama/pomodoro-cloud-native/actions/workflows/Docker-build-push.yaml/badge.svg)](https://github.com/NineKama/pomodoro-cloud-native/actions/workflows/Docker-build-push.yaml) |
| Frontend  | WIP            | WIP | [![Docker Image CI/CD with Trivy](https://github.com/NineKama/pomodoro-cloud-native/actions/workflows/Docker-build-push.yaml/badge.svg)](https://github.com/NineKama/pomodoro-cloud-native/actions/workflows/Docker-build-push.yaml)  |


## Project Structure

```
/backend            # Node.js Express API (microservice)
/frontend           # React frontend for the Pomodoro Timer (microservice)
/kubernetes         # Kubernetes YAML files for deployment, services, and Ingress
/argo               # Argo CD application manifests for app-of-apps deployment
```

## Features

- Start, track, and clear Pomodoro timers.
- Live countdown for each active timer.
- Microservices architecture for better scalability and modularity.
- Deployed using Docker containers with Kubernetes orchestration.
- Cloud-native design leveraging K8s for service management and scaling.
- GitOps with Argo CD for automated deployment and synchronization.

## Prerequisites

Make sure you have the following installed on your machine:
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [Kubernetes](https://kubernetes.io/) (local k3s or minikube cluster)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Argo CD](https://argo-cd.readthedocs.io/en/stable/getting_started/) (optional for GitOps deployment)
- [Istio](https://istio.io/latest/docs/setup/getting-started/) (required for Ingress setup)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:NineKama/pomodoro-cloud-native.git
cd pomodoro-cloud-native
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

- **Backend Deployment**: `kubernetes/backend/deployment.yaml`
- **Frontend Deployment**: `kubernetes/frontend/deployment.yaml`
- **Service Configurations**: `kubernetes/backend/service.yaml` and `kubernetes/frontend/service.yaml`
- **Ingress Setup**: `kubernetes/istio/ingress.yaml`

#### Steps to Deploy

1. Make sure your local Kubernetes cluster is running (e.g., k3s, minikube).
2. Install Istio by following the [Istio getting started guide](https://istio.io/latest/docs/setup/getting-started/).
3. Apply the YAML files in the `kubernetes/` directory:

```bash
kubectl apply -f kubernetes/
```

This will create the necessary deployments, services, and Ingress to run the microservices-based Pomodoro Timer application.

### 4. GitOps Deployment with Argo CD (Optional)

To deploy using Argo CD and the app-of-apps pattern:

1. Make sure Argo CD is installed and running in your cluster.
2. Apply the parent application manifest:

```bash
kubectl apply -f argo/parent-application/parent-application.yaml
```

This will allow Argo CD to manage and deploy the backend, frontend, and other components as defined in the `argo` directory.

## Microservices & Cloud-Native Design

This project emphasizes a **microservices architecture** where the frontend and backend are independent services. By utilizing **Kubernetes**, the application benefits from cloud-native features such as:

- **Scalability**: Easily scale services based on demand.
- **Resilience**: Automatic restarts and self-healing for containers.
- **Portability**: Runs consistently across different cloud providers and environments.
- **Service Discovery**: Kubernetes services provide internal DNS for service communication.

## Contributing

Feel free to open issues and create pull requests to improve the project.

## License

This project is licensed under the MIT License.