import { Card } from "@geist-ui/react";
import React from "react";
import Layout from "./layout";

export default function CardLayout({ children }) {
  return (
    <Layout>
      <div className="cardLayout">
        <Card shadow>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {children}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
