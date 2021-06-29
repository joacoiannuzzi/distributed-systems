package service

import service.productService._
import ProductCatalog._

import scala.collection.mutable
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.io.Source

case class ProductCatalogService() extends ProductServiceGrpc.ProductService {

  private val products: List[ProductEntry] = readProducts()

  override def getProduct( request: GetProductsRequest): Future[GetProductReply] = Future {
    val prod = products
                .filter(_.id == request.productId).head
    GetProductReply(prod.id, prod.name, prod.price)
  }

  override def getAllProducts( request: GetAllProductsRequest): Future[GetAllProductsReply] = Future {
    val allProducts = products.map(x => x.id)
    GetAllProductsReply(allProducts)
  }
}
