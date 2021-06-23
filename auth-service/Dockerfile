FROM ekidd/rust-musl-builder:stable as builder

RUN USER=root cargo new --bin auth_service_server
WORKDIR ./auth_service_server
COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml
RUN cargo build --release
RUN rm src/*.rs

ADD . ./

RUN rm ./target/x86_64-unknown-linux-musl/release/deps/auth_service_server*
RUN cargo build --release


FROM alpine:latest

ARG APP=/usr/src/app

EXPOSE 50051

ENV TZ=Etc/UTC \
    APP_USER=appuser

RUN addgroup -S $APP_USER \
    && adduser -S -g $APP_USER $APP_USER

RUN apk update \
    && apk add --no-cache ca-certificates tzdata \
    && rm -rf /var/cache/apk/*

COPY --from=builder /home/rust/src/auth_service_server/target/x86_64-unknown-linux-musl/release/auth_service_server ${APP}/auth_service_server

RUN chown -R $APP_USER:$APP_USER ${APP}

USER $APP_USER
WORKDIR ${APP}

CMD ["./auth_service_server"]