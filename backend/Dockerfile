# Use an official OpenJDK runtime as the base image
FROM eclipse-temurin:21-jdk

# Set a non-root user for better security
RUN useradd -m appuser
USER appuser

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file into the container
COPY --chown=appuser:appuser target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
