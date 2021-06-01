FROM openjdk:11
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} content-service.jar
ENTRYPOINT ["java","-jar","/content-service.jar"]