FROM openjdk:11
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} hystrix.jar
ENTRYPOINT ["java","-jar","/hystrix.jar"]