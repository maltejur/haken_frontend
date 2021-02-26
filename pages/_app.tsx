import "../styles/globals.css";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import { TaskProvider } from "hooks/tasks";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TaskProvider>
      <GeistProvider>
        <Head>
          <title>Haken</title>
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </TaskProvider>
  );
}
