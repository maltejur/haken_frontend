import { Button, Input, Text } from "@geist-ui/react";
import CardLayout from "components/cardLayout";
import { useRouter } from "next/dist/client/router";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { fetchTasks } from "hooks/tasks";

export default function Login({ to }: { to: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(event?: FormEvent<HTMLFormElement>) {
    if (event) event.preventDefault();
    setLoading(true);
    fetchTasks(password).then((ok) => {
      setLoading(false);
      if (ok) {
        Cookies.set("token", password);
        router.push("/dashboard");
      }
    });
  }

  return (
    <CardLayout>
      <Text h3>Login</Text>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Input
          // type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loading}
        >
          Token
        </Input>
        <Button
          auto
          type="success"
          style={{ alignSelf: "flex-end", marginTop: 20 }}
          onClick={() => onSubmit()}
          loading={loading}
        >
          Login
        </Button>
      </form>
    </CardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query.to) {
    return {
      props: {
        to: context.query.to,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
