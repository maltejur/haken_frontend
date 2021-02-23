import { Card } from "@geist-ui/react";
import React from "react";
import Layout from "./layout";

export default function CardLayout({ children }) {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          pointerEvents: "none",
        }}
      >
        <Card
          shadow
          style={{ width: "auto !important", pointerEvents: "initial" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {children}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
