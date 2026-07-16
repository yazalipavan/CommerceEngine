import { Request, Response } from "express";
import { getHealthStatus } from "./health.service.js";

const healthCheck = (req: Request, res: Response) => {
  const healthStatus = getHealthStatus();
  res.status(200).json(healthStatus);
};

export default healthCheck;
