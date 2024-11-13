FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/backend-0.0.1-SNAPSHOT.jar /app/app.jar

# COPY src/main/resources/config.json /app/resources/config.json
COPY src/main/resources/config.json /app/classes/config.json

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
