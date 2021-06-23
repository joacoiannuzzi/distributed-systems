import { authClient } from "../../utils/authService";

export default async function handler(req, res) {
  const { mail, password } = JSON.parse(req.body);
  const response = await authClient.Authenticate({ mail, password });
  res.status(200).json(response);
}
