import { validateAuth } from "@/lib/auth";
import Server from "@/lib/file-upload/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import fsAsync from "fs/promises";

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
  await fsAsync.writeFile(
    `/public/upload/${req.query.filename}`,
    Buffer.from(req.body, "base64")
  );
  await client.user.update({
    where: { mail: req.query.mail.toString() },
    data: { profilePictureUrl: `/uploads/${req.query.filename}` },
  });
};
//   outpPath: "./public/uploads",
//   auth: async (query) =>
//     await validateAuth(query.mail.toString(), query.password.toString()),
//   afterUpload: async (query, filename) => {
//     await client.user.update({
//       where: { mail: query.mail.toString() },
//       data: { profilePictureUrl: `/uploads/${filename}` },
//     });
//   },
// });
