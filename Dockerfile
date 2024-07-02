# Use a base image, such as Ubuntu or Alpine
FROM alpine:latest


# Install necessary tools and dependencies
RUN apk add --no-cache \
    openssh-server \
    vim

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