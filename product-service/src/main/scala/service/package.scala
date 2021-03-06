import com.github.tototoshi.csv.CSVReader

package object ProductCatalog {
  case class ProductEntry(id: String, name: String, price: String)

  def readProducts(): List[ProductEntry] = {
    CSVReader
      .open(
        "./resources/products_csv.csv"
      )
      .allWithHeaders()
      .map(_.toList)
      .map { case List(id, name, price) =>
          ProductEntry(id._2, name._2, price._2)
      }
  }
}
