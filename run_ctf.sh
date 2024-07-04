#!/bin/bash

# Docker image details

IMAGE_NAME="ghcr.io/yash09042004/yashz_ctf/2:latest"

# Ensure the script is executable
# chmod +x run_ctf.sh

# Pull the Docker image
echo "Pulling Docker image $IMAGE_NAME from GitHub Packages..."
docker pull $IMAGE_NAME

# Check if pull was successful
if [ $? -eq 0 ]; then
    echo "Image successfully pulled!"
else
    echo "Failed to pull image. Please check the image name and try again."
    exit 1
fi

# Run the Docker container with interactive terminal support
echo "Starting the CTF environment..."
docker run -it  --entrypoint /bin/bash $IMAGE_NAME 

# Additional echo to indicate end of script
echo "Script execution complete."
