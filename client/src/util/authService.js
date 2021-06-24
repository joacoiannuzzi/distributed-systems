import path from "path";
import { promisifyAll } from "./promisifyAll";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(
  process.cwd(),
  "src",
  "proto",
  "authService.proto"
);

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
});

const authProto = grpc.loadPackageDefinition(packageDefinition);

const host = process.env.AUTH_SERVICE_HOST ?? "localhost";
const port = process.env.AUTH_SERVICE_PORT ?? 50051;

export const authClient = promisifyAll(
  new authProto.service.AuthService(
    `${host}:${port}`,
    grpc.credentials.createInsecure()
  )
);
