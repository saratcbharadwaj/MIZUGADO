# Use a base image with Java 17
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file into the container
COPY target/*.jar app.jar

# Expose the port the backend runs on
EXPOSE 8080

# The command to run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]