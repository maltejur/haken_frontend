import { Page } from "@geist-ui/react";
import Head from "next/head";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <Page style={{ position: "unset" }}>
      <Navbar />
      <div
        style={{ marginTop: "50px", display: "flex", flexDirection: "column" }}
      >
        {children}
      </div>
    </Page>
  );
}
