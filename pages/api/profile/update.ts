import { validateAuth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const client = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    !(await validateAuth(
      req.query.mail.toString(),
      req.query.password.toString()
    ))
  ) {
    res.status(403).end();
    return;
  }
  await client.user.update({
    where: { mail: req.query.mail.toString() },
    data: req.body,
  });
  res.send("OK");
};
