import { geoClient } from "../../utils/geoService";

export default async function handler(req, res) {
  const { ip } = JSON.parse(req.body);
  const response = await geoClient.GetLocationByIp({ ip });
  res.status(200).json(response);
}
