import { Button, Card, Display, Select, Text, User } from "@geist-ui/react";
import Layout from "components/layout";
import { withAuth } from "hooks/auth";
import { Task } from "lib/models";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Play } from "@geist-ui/react-icons";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

export default function TaskPage() {
  const [language, setLanguage] = useState("typescript");
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
      <Card shadow>
        <Card.Content style={{ padding: 0, height: 400 }}>
          <iframe
            style={{ width: "100%", height: 400 }}
            src={task.documentUrl}
            frameBorder={0}
          />
        </Card.Content>
      </Card>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 40 }}
      >
        <Select
          value={language}
          onChange={(val: string) => setLanguage(val)}
          style={{ marginRight: 20, height: 40 }}
          size="large"
        >
          <Select.Option value="typescript">Typescript</Select.Option>
          <Select.Option value="cpp">C++</Select.Option>
          <Select.Option value="python">Python</Select.Option>
        </Select>
        <Button icon={<Play />} type="success" auto>
          Programm ausführen
        </Button>
      </div>
      <Card shadow style={{ marginTop: 20 }}>
        <Card.Content style={{ padding: 0, paddingTop: 20 }}>
          <MonacoEditor
            height={400}
            theme="vs-light"
            value="console.log('Hello, world!');"
            language={language}
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
        </Card.Content>
      </Card>
    </Layout>
  );
}

export const getServerSideProps = withAuth();
