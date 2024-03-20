########################################
# Build stage
########################################
# Maven base image
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
# Working directory
WORKDIR /app
# Copy project
COPY pom.xml .
COPY src ./src
# Build jar file
RUN mvn clean package

# Ejecutar la aplicación Java después de construir
CMD ["mvn", "exec:java"]