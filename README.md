
# Documentation for Creating and Publishing CTF Levels

This guide explains how to create levels for the Capture The Flag (CTF) platform using Docker, customize them in a container, and publish them to a container registry. Screenshots can be added to aid understanding—guidance on where to include them is provided.

---

## **1. Introduction**
CTF challenges are structured as levels where participants solve tasks to retrieve flags. Each level is containerized using Docker for consistency and ease of deployment. This document covers creating a Docker container for a level, modifying it, and publishing it to GitHub Container Registry (GHCR).

---

## **2. Understanding Levels**
A level is a self-contained environment where participants solve a specific challenge. These challenges may involve:
- Cryptography
- Linux
- Docker

### **Base Image for Levels**
We use Alpine Linux or Ubuntu as the base image for levels due to their lightweight nature and ease of customization.

---

## **3. Setting Up the Docker Environment**

### **3.1 Create a Dockerfile**
1. Create a file and name it `Dockerfile`.
   - Add a screenshot showing the file creation step.

2. Paste the following data into the `Dockerfile`:

```dockerfile
# Use a base image, such as Ubuntu or Alpine
FROM alpine:latest

# Install necessary tools and dependencies
RUN apk add --no-cache     openssh-server     vim

# Add challenge files
COPY . /ctf_challenge/level1/

# Configure SSH server
RUN mkdir /var/run/sshd
RUN echo 'root:wlug' | chpasswd
RUN sed -i 's/^#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN ssh-keygen -A

# Expose SSH port
EXPOSE 22

# Start SSH server
CMD ["/usr/sbin/sshd", "-D"]
```
   - Add a screenshot of the `Dockerfile` content.

### **3.2 Build the Docker Image**
1. Open a terminal in the same directory as the `Dockerfile`.
2. Run the following command:
   ```bash
   docker build -t levelTemplate .
   ```

3. Run the Docker container:
   ```bash
   docker run -it levelTemplate:latest
   ```

---

## **4. Customizing the Level**
1. Make necessary changes to the container for the specific level:
   - Add files, challenges, or scripts.
   - Ensure to save the flag inside the container for later use.
   - Add screenshots showing the modification steps.

2. Once changes are complete, open a new terminal and run the following command to list running containers:
   ```bash
   docker ps
   ```
   - Add a screenshot showing the output.

3. Copy the container ID of the running wargames container.

### **4.1 Commit Changes to a New Image**
1. Before committing the container, clear the history of your commands from the container.
2. Open another terminal while the container is running and use the following commands to commit the changes:

   ```bash
   docker commit ${CONTAINER_ID} ghcr.io/${ORG_NAME}/wargames4.0/${LEVEL_NO}
   ```
   Example for the first level:
   ```bash
   docker commit 1234h1341k32 ghcr.io/infinity-castle/wargames4.0/1
   ```

3. Exit the `levelTemplate` container.

---

## **5. Publishing to GitHub Container Registry (GHCR)**

### **5.1 Generate a Personal Access Token**
1. Go to **GitHub Profile > Settings > Developer Settings > Personal Access Tokens > Tokens (classic)**.
2. Generate a new token with all permissions enabled.
3. Save the token in a safe place.
   - Add a screenshot of the token generation process.

### **5.2 Log in to the Container Registry**
1. Use the following command to log in to GHCR:
   ```bash
   echo ${GITHUB_TOKEN} | docker login ghcr.io -u USERNAME --password-stdin
   ```
   - Replace `USERNAME` with your GitHub username.
   - Add a screenshot showing successful login.

### **5.3 Push the Image to GHCR**
1. Use the following command to push the image to GHCR:
   ```bash
   docker push ghcr.io/${ORG_NAME}/wargames4.0/${LEVEL_NO}:latest
   ```
   Example for the first level:
   ```bash
   docker push ghcr.io/infinity-castle/wargames4.0/1:latest
   ```
   - Add a screenshot showing the push process.

---

## **6. Conclusion**
You have successfully created, customized, and published a CTF level to the container registry. Repeat the steps for additional levels, ensuring each one is unique and thoroughly tested.

---

### **Additional Notes**
- Ensure proper naming conventions for levels and flags.
- Test each level before publishing to ensure it functions as expected.
- Keep your personal access token secure and regenerate it if compromised.

Feel free to reach out for support or feedback through the project repository!
