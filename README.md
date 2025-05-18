
<h1 align="center">🚀 Node.js Backend Deployment Project</h1>

This project demonstrates the deployment of a production-ready **Node.js backend application** with a modern DevOps toolchain. It incorporates automation, observability, infrastructure-as-code, and robust API documentation to ensure reliability, scalability, and maintainability.

---

## ✅ Features

- **Node.js Backend**  
  Built with a modular and scalable Node.js architecture for handling RESTful APIs.

- **API Documentation with Swagger**  
  Integrated Swagger UI for real-time API testing and interactive documentation.

- **CI/CD with GitHub Actions**  
  Fully automated continuous integration and deployment pipeline using GitHub Actions.

- **Infrastructure as Code with Terraform**  
  Dynamic provisioning of cloud infrastructure using Terraform for reproducibility and scalability.

- **Database Migrations with Prisma**  
  Schema-based database migrations and ORM handled by Prisma for type-safe data operations.

- **Monitoring with Prometheus & Grafana**  
  Real-time application metrics collection and visualization using Prometheus and Grafana dashboards.

- **DNS & Routing via NGINX**  
  NGINX configured as a reverse proxy and load balancer for secure and performant routing.

---


```bash
# install npm jest for ESmodules
$ npm install --save-dev jest @jest/globals
$ npm install --save-dev @babel/preset-env babel-jest

# run individual test using
$ npm run test:ind

# migrate database
$ npx prisma generate
$ npx prisma db push

# run terraform
$ terraform init
$ terraform apply -auto-approve
$ terraform destroy -auto-approve

$ ssh ec2-user@<server_public_ip> -i your-key.pem




```