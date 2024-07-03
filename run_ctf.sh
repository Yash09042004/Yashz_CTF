#!/bin/bash

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: Docker is not installed.' >&2
  exit 1
fi

# Pull the Docker image
echo "Pulling the Docker image..."
sudo docker pull yashkiran2004/lev2:latest

# Run the Docker container
echo "Running the Docker container..."
sudo docker run -d -p 2222:22 --name ctf_challenge yashkiran2004/lev2:latest

# Display SSH access instructions
echo "The container is now running. To access the container via SSH, use the following command:"
echo "ssh root@localhost -p 2222"
echo "The default password is 'wlug'"

# Wait for user to press any key to continue
read -p "Press any key to continue..."

# SSH into the container
ssh root@localhost -p 2222
