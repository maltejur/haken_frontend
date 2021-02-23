import { GetServerSideProps } from "next";

export default function Home() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
    redirect: {
      statusCode: 303,
      destination: req.cookies["token"] ? "/dashboard" : "/login",
    },
  };
};
