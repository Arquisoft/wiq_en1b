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

########################################
# Package stage
########################################
# Java base image
FROM openjdk:17-jdk-alpine
# Copy jar file built in previous stage
COPY  --from=build /app/target/wiq-0.0.1-SNAPSHOT.jar wiq-0.0.1-SNAPSHOT.jar
# Expose port
EXPOSE 8090
# Launch application
CMD ["java","-jar","/wiq-0.0.1-SNAPSHOT.jar"]
