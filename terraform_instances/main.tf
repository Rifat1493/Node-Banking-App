provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "app_server" {
  ami           = "ami-08b5b3a93ed654d19" # Replace with a valid Amazon Linux 2 AMI if needed
  instance_type = "t2.micro"
  key_name      = "new" # Replace with your actual keypair name
  security_groups = ["default"]

  tags = {
    Name = "express-app-server"
  }

  user_data = <<-EOF
    #!/bin/bash
    set -ex

    # Log user-data output
    exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

    # Install updates and Docker
    yum update -y
    yum install -y docker git python3-pip

    # Start and enable Docker
    systemctl start docker
    systemctl enable docker
    usermod -aG docker ec2-user

    # Install AWS SDK for Python
    pip3 install boto3

    # Install Docker Compose
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

    # Verify installations
    docker --version
    docker-compose --version
  EOF
}

output "server_public_ip" {
  value = aws_instance.app_server.public_ip
}

output "server_public_dns" {
  value = aws_instance.app_server.public_dns
}