# Microservices Demo Project

A demonstration of a modern microservices architecture implementing user authentication, product catalog, and geolocation features using Scala, Rust, and React.

## Project Overview

This project showcases a microservices architecture with three backend services and a Next.js frontend:

### Backend Services

#### 1. Geo Service (Scala)

- Provides geographical data operations through gRPC
- Features:
  - Country/state/city hierarchy lookups
  - IP-based location detection with caching
  - Uses CSV data source for city information
- Implemented using:
  - Scala
  - gRPC for service communication
  - Concurrent programming with Scala Futures
  - CSV parsing for data management

#### 2. Product Service (Scala)

- Manages product catalog data through gRPC
- Features:
  - Individual product lookup
  - Full product listing
  - CSV-based product database
- Implemented using:
  - Scala
  - gRPC
  - CSV data management

#### 3. Auth Service (Rust)

- Handles user authentication
- Features:
  - Email/password authentication
  - Simple in-memory user storage
- Implemented using:
  - Rust
  - Tonic for gRPC implementation
  - Async/await for concurrent operations

### Frontend

#### Next.js Client

- Modern web interface built with React and Next.js
- Features:
  - User authentication form
  - IP-based location lookup
  - Product catalog display
- Implemented using:
  - React with hooks for state management
  - Next.js API routes for backend communication
  - gRPC-Web for service communication
  - Server-side rendering

## Technical Implementation

### Service Communication

- All services communicate via gRPC
- Protocol Buffers for service definitions
- Type-safe communication between services
- Next.js API routes act as proxies to gRPC services

### Data Storage

- CSV files for both geo and product data
- In-memory storage for user authentication
- IP geolocation caching in Geo Service

### Infrastructure

- Kubernetes deployments for all services
- Docker containerization
- Load balancing and service discovery
- ConfigMap for configuration management

## Architecture Highlights

1. **Polyglot Architecture**

   - Scala for data-intensive services
   - Rust for high-performance authentication
   - JavaScript/React for frontend

2. **Modern Frontend Practices**

   - React hooks for state management
   - Server-side rendering with Next.js
   - API route proxying for backend communication

3. **Scalable Backend Design**

   - Microservices architecture
   - gRPC for efficient communication
   - Containerized deployment
   - Independent scaling of services

4. **Production-Ready Features**
   - Kubernetes deployment configurations
   - Service discovery
   - Load balancing
   - Environment-based configuration

This project demonstrates proficiency in:

- Scala ecosystem and functional programming
- Modern React development
- Microservices architecture
- gRPC and Protocol Buffers
- Docker and Kubernetes
- Full-stack development
