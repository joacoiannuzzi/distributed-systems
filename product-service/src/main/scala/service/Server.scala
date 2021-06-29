package service

import io.grpc.ServerBuilder
import service.productService.ProductServiceGrpc

import scala.concurrent.ExecutionContext

object Server extends App {
  private val port = sys.env.getOrElse("port", "50004").toInt
  private val builder = ServerBuilder
    .forPort(port)
  builder.addService(
    ProductServiceGrpc.bindService(ProductCatalogService(), ExecutionContext.global)
  )
  private val server = builder.build()

  server.start()
  println(s"Listening on port $port")
  server.awaitTermination()
}
