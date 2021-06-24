#! /bin/bash
eval $(minikube docker-env)
docker build -t client:1.0.0 .
kubectl apply -f deployment.yaml
kubectl apply -f node-port.yaml
