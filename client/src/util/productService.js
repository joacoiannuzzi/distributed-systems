import path from "path";
import { promisifyAll } from "./promisifyAll";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(
  process.cwd(),
  "src",
  "proto",
  "productService.proto"
);

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
});

const productProto = grpc.loadPackageDefinition(packageDefinition);

const host = process.env.PRODUCT_SERVICE_HOST ?? "localhost";
const port = process.env.PRODUCT_SERVICE_PORT ?? 50005;

export const productClient = promisifyAll(
  new productProto.service.ProductService(
    `${host}:${port}`,
    grpc.credentials.createInsecure()
  )
);
