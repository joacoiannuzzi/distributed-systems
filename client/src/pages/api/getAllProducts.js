import { productClient } from "../../util/productService";

export default async function handler(req, res) {
  const products = await productClient.GetAllProducts({});
  res.status(200).json(products);
}
