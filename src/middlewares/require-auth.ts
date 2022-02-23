import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { ClientAttrs } from "../models/attributes/client";
import { Client } from "../models/client";
import hat from "hat";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Add Duplo Auth credentials if Client table is empty;

  const clients = await Client.find();

  const key = hat();

  if (clients.length == 0) {
    const client = Client.build({
      name: `${process.env.SUPER_ADMIN_NAME}`,
      api_key: `${process.env.SUPER_ADMIN_KEY}`,
    });

    await client
      .save()
      .then(() => console.log("Super Admin Credentials Added"));
  }
  const apiKey: any = req.headers["api_key"];

  if (!apiKey) {
    throw new BadRequestError("API_KEY is missing in header");
  }

  const isKeyValid = await Client.findOne({ api_key: apiKey });

  if (!isKeyValid) throw new NotAuthorizedError();

  next();
};
