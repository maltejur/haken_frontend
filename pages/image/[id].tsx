import Layout from "@/components/layout";
import { Display, Image, Text, User } from "@geist-ui/react";
import { Download } from "@geist-ui/react-icons";
import { Prisma, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { Fragment } from "react";
import classes from "@/styles/image.module.css";

export default function Imag({ image }) {
  return (
    <Layout>
      <Display
        shadow
        caption={
          <div className={classes.caption}>
            <User
              src={image.author.profilePictureUrl}
              name={image.author.name}
            />
            <Text className={classes.seperator}>-</Text>
            <Text>{image.title}</Text>
          </div>
        }
      >
        <Image src={image.url} className={classes.image} />
      </Display>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = new PrismaClient();
  const image = await client.image.findUnique({
    where: {
      id: Number(context.params.id),
    },
    include: {
      author: true,
    },
  });
  return {
    props: { image },
  };
};
