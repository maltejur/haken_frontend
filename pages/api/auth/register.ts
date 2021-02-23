import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  if (body.mail && body.password) {
    await prisma.user.create({
      data: {
        mail: body.mail,
        password: body.password,
        name: body.mail.split("@")[0],
      },
    });
    res.send("OK");
  } else {
    res.status(400).send("ERR");
  }
};
