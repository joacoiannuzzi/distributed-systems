import path from "path";
import { promisifyAll } from "./promisifyAll";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(process.cwd(), "src", "proto", "geoService.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
});

const geoProto = grpc.loadPackageDefinition(packageDefinition);

const host = process.env.GEO_SERVICE_HOST ?? "localhost";
const port = process.env.GEO_SERVICE_PORT ?? 50004;

export const geoClient = promisifyAll(
  new geoProto.service.GeoService(
    `${host}:${port}`,
    grpc.credentials.createInsecure()
  )
);
