FROM hseeberger/scala-sbt:11.0.10_1.4.7_2.12.13 AS build
COPY . /geo-service
WORKDIR /geo-service
RUN sbt clean assembly

FROM openjdk:11-jre-slim
EXPOSE 50004

COPY --from=build /geo-service/target/scala-**/*.jar /app.jar
COPY ./resources/world-cities_csv.csv ./resources/world-cities_csv.csv

ENTRYPOINT ["java","-jar","/app.jar"]