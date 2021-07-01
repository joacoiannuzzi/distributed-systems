import { productClient } from "../../util/productService";

export default async function handler(req, res) {
  const { productId } = JSON.parse(req.body);
  const product = await productClient.GetProduct({ productId });
  res.status(200).json(product);
}
