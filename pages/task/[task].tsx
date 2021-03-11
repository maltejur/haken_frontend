import {
  Button,
  Card,
  Display,
  Select,
  Spinner,
  Text,
  User,
} from "@geist-ui/react";
import Layout from "components/layout";
import { withAuth } from "hooks/auth";
import { Subtask, Task } from "lib/models";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Play } from "@geist-ui/react-icons";
import useSWR from "swr";
import { useTasks } from "hooks/tasks";
import Cookies from "js-cookie";
import TwoColView from "components/twoColView";
import useTask from "hooks/task";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

export default function TaskPage({ id }: { id: number }) {
  const [language, setLanguage] = useState("typescript");
  const { task, subtasks } = useTask(id);
  const [editorWidth, setEditorWidth] = useState(
    window ? window.innerWidth * 0.45 - 15 : 0
  );

  useEffect(() => {
    window.addEventListener("resize", (event) => {
      setEditorWidth(window.innerWidth * 0.45 - 30);
    });
  });

  return (
    <Layout>
      {task ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text h2 style={{ marginBottom: 10 }}>
              {task.name}
            </Text>
            <User name={task.author} />
          </div>
          <Text>{task.description}</Text>
          <TwoColView
            height={700}
            left={
              <Card shadow>
                <Card.Content style={{ padding: 0, height: 700 }}>
                  <iframe
                    style={{ width: "100%", height: 700 }}
                    src={`https://poodlenoodle42.spdns.org:8080/auth/tasks/${id}/pdf?token=${Cookies.get(
                      "token"
                    )}`}
                    frameBorder={0}
                  />
                </Card.Content>
              </Card>
            }
            right={
              <Card shadow>
                <Card.Content style={{ padding: 0, paddingTop: 20 }}>
                  <MonacoEditor
                    height={680}
                    width={editorWidth}
                    theme="vs-light"
                    value="console.log('Hello, world!');"
                    language={language}
                    editorDidMount={() => {
                      (window as any).MonacoEnvironment.getWorkerUrl = (
                        moduleId,
                        label
                      ) => {
                        if (label === "json")
                          return "/_next/static/json.worker.js";
                        if (label === "css")
                          return "/_next/static/css.worker.js";
                        if (label === "html")
                          return "/_next/static/html.worker.js";
                        if (label === "typescript" || label === "javascript")
                          return "/_next/static/ts.worker.js";
                        return "/_next/static/editor.worker.js";
                      };
                    }}
                  />
                </Card.Content>
              </Card>
            }
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 40,
            }}
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
        </>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}

export const getServerSideProps = withAuth(async (context) => {
  return {
    props: {
      id: Number(context.query.task),
    },
  };
});
