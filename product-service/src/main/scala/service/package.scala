import com.github.tototoshi.csv.CSVReader

package object ProductCatalog {
  case class ProductEntry(id: String, name: String, price: String)

  def readProducts(): List[ProductEntry] = {
    CSVReader
      .open(
        "./products_csv.csv"
      )
      .allWithHeaders()
      .map(_.toList)
      .map {
        case List(id, name, price, _) =>
          ProductEntry(id._2, name._2, price._2)
      }
  }
}
