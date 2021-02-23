import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  if (body.mail && body.password) {
    const user = await prisma.user.findUnique({ where: { mail: body.mail } });
    if (user) {
      if (user.password == body.password) {
        res.status(200).end();
      } else {
        res.status(401).end();
      }
    } else {
      res.status(401).end();
    }
  } else {
    res.status(400).send("ERR");
  }
};
