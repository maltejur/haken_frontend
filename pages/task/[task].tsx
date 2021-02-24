import { Button, Text, User } from "@geist-ui/react";
import Layout from "components/layout";
import { withAuth } from "hooks/auth";
import { Task } from "lib/models";
import React from "react";
import dynamic from "next/dynamic";
import { Play } from "@geist-ui/react-icons";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

export default function TaskPage() {
  const task: Task = {
    id: 2,
    name: "Olympiade",
    author: "Michał Boron",
    documentUrl: "https://shorsh.de/upload/lq1zbv/Olympiadezad.pdf",
  };
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text h2>{task.name}</Text>
        <User name={task.author} />
      </div>
      <iframe
        style={{ width: "100%", height: 400 }}
        src={task.documentUrl}
        frameBorder={0}
      ></iframe>
      <div style={{ width: "100%", height: 400, marginTop: 50 }}>
        <MonacoEditor
          theme="vs-dark"
          value="console.log('Hello, world!');"
          editorDidMount={() => {
            (window as any).MonacoEnvironment.getWorkerUrl = (
              moduleId,
              label
            ) => {
              if (label === "json") return "/_next/static/json.worker.js";
              if (label === "css") return "/_next/static/css.worker.js";
              if (label === "html") return "/_next/static/html.worker.js";
              if (label === "typescript" || label === "javascript")
                return "/_next/static/ts.worker.js";
              return "/_next/static/editor.worker.js";
            };
          }}
        />
      </div>
      <Button
        icon={<Play />}
        type="success"
        auto
        style={{ alignSelf: "flex-end", marginTop: 20 }}
      >
        Programm ausführen
      </Button>
    </Layout>
  );
}

export const getServerSideProps = withAuth();
