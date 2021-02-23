import { validateAuth } from "@/lib/auth";
import Server from "@/lib/file-upload/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default Server({
  outpPath: process.env.UPLOAD_PATH,
  auth: async (query) =>
    await validateAuth(query.mail.toString(), query.password.toString()),
  afterUpload: async (query, filename) => {
    const image = await client.image.create({
      data: {
        title: query.title.toString(),
        authorMail: query.mail.toString(),
        url: `/uploads/${filename}`,
        tags: query.tags.toString(),
      },
    });
    return image.id.toString();
  },
});
