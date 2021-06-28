package service

import ProductCatalog.{ProductEntry, readProducts}

case class ProductCatalogService() extends ProductServiceGrpc.ProductService{

  private val products: List[ProductEntry] = readProducts()

  override def getProduct( request: GetProductsRequest): Unit ={
    val prod = products
                .filter(_.id == request.productId).head
    GetProductReply(prod.id, prod.name, prod.price)
  }

  override def getAllProduct( request: GetAllProductsRequest): Unit ={
    val allProducts = products.map(x => x.id)
    GetAllProductsReply(allProducts)
  }
}
