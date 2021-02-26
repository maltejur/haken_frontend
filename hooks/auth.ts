import { Task } from "lib/models";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/dist/client/router";
import { ParsedUrlQuery } from "querystring";
import { fetchTasks } from "./tasks";

export function useAuth() {
  if (process.browser) {
    if (!localStorage.getItem("token")) {
      const router = useRouter();
      router.push("/login");
    } else {
      fetchTasks(localStorage.getItem("token"));
    }
  }
}

export function withAuth(handler?: GetServerSideProps): GetServerSideProps {
  return async function (context: GetServerSidePropsContext<ParsedUrlQuery>) {
    if (context.req.cookies.token) {
      return {
        props: {},
        ...(handler ? await handler(context) : {}),
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: `/login?to=${encodeURIComponent(context.resolvedUrl)}`,
        },
      };
    }
  };
}
