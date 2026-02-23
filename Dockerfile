# syntax=docker/dockerfile:1.7

FROM alpine:3.21

CMD ["sh", "-c", "echo 'Use docker compose to run all apps: docker compose up --build'"]
