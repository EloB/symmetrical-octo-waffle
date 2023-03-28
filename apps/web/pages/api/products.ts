import type { NextApiRequest, NextApiResponse } from "next";
import type { Car } from "../../types";
import cars from "../../data/cars.json";

const data: Car[] = cars;

export default function handler(req: NextApiRequest, res: NextApiResponse<Car[]>) {
  res.json(cars);
}
