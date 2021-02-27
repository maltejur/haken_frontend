import { Text } from "@geist-ui/react";
import Layout from "components/layout";
import { withAuth } from "hooks/auth";

export default function Upload() {
  return (
    <Layout>
      <Text h3>Upload</Text>
      <form action=""></form>
    </Layout>
  );
}

export const getServerSideProps = withAuth();
