To connect to EKS Cluster:
`aws eks --region us-east-1 update-kubeconfig --name hw3-eks`
may need to remove HOME/.kube/config

Useful Related Guide: https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html



## Minikube Initialization

- Insure that minikube and kubectl are installed locally
- start up the minikube server with `minikube start`
- once the minikube cluster is up, use `kubectl apply -f ./<>.yml` in the following order
- - `kubectl apply -f ./minikube-hostpath.yml` -- allows dynamic creation of volumes
- - `kubectl apply -f ./mongodb-statefulset.yml`
- - `kubectl apply -f ./mongodb-service.yml`
- wait for the stateful set to complete, once all nodes are up
- we need to initialize the replicaset, which we will use by applying the `init_repl_set.js` file
  that has been copied to all DB containers.
- run the following command `kubectl exec -it mongo-0 -- mongosh --eval "load('init_repl_set.js')"
- now init the webapp
- `kubectl apply -f ./webapp-deployment.yml`
- `kubectl apply -f ./webapp-service.yml`
- once those are done, if running on windows open up a new window and execute `minikube tunnel`
- the server should now be accessible at 127.0.0.1:8080




## AWS Installation

- if the cloudformation stack is not up, the following commands will build and create it
    - `sam build`
    - `sam validate`
    - `sam deploy`
- once deployed and the EKS cluster is created, associate it with your local kube config
- delete HOME/.kube/config
- update config with `aws eks --region us-east-1 update-kubeconfig --name hw3-eks`
- run `kubectl get svc` to insure you can connect
- run following commands to enable EBS Driver Role (ref: https://stackoverflow.com/questions/75758115/persistentvolumeclaim-is-stuck-waiting-for-a-volume-to-be-created-either-by-ex)
- eksctl utils associate-iam-oidc-provider --region=us-east-1 --cluster=hw3-eks --approve
- eksctl create iamserviceaccount --name ebs-csi-controller-sa --namespace kube-system --cluster hw3-eks --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy --approve --role-only --role-name AmazonEKS_EBS_CSI_DriverRole
- eksctl create addon --name aws-ebs-csi-driver --cluster hw3-eks --service-account-role-arn arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/AmazonEKS_EBS_CSI_DriverRole --force
- provision StorageClass, DB Statefulset and Service