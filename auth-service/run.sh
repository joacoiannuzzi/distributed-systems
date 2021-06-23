#! /bin/bash
eval $(minikube docker-env)
docker build -t auth-service:1.0.0 .
kubectl apply -f config-map.yaml
kubectl apply -f deployment.yaml
kubectl apply -f cluster-ip.yaml
