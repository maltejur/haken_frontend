import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/dist/client/router";
import { ParsedUrlQuery } from "querystring";

export function useAuth() {
  if (process.browser) {
    if (!localStorage.getItem("token")) {
      const router = useRouter();
      router.push("/login");
    }
  }
}

export function withAuth(handler?: GetServerSideProps): GetServerSideProps {
  return async function (context: GetServerSidePropsContext<ParsedUrlQuery>) {
    if (context.req.cookies.token) {
      return {
        ...(handler ? await handler(context) : {}),
        props: {},
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
