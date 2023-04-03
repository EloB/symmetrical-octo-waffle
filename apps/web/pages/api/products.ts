import type { NextApiRequest, NextApiResponse } from "next";
import type { Car } from "../../types";
import cars from "../../data/cars.json";

const data: Car[] = cars;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Car[]>
) {
  const filter = ([] as string[]).concat(req.query.filter ?? "all");
  if (filter.includes("all")) return res.json(data);
  res.json(data.filter(({ bodyType }) => filter.includes(bodyType)));
}
