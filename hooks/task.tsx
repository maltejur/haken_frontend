import { Result, Subtask } from "lib/models";
import { fetcher } from "lib/requests";
import useSWR from "swr";
import { useTasks } from "./tasks";
import https from "https";
import KeepAliveAgent from "agentkeepalive";
import { useMemo, useState } from "react";

export default function useTask(id: number) {
  const { task, subtasks } = useTaskSWR(id);

  const [_subtasks, setSubtasks] = useState(subtasks);

  return {
    runCode: (code: string) => {
      https.get(
        {
          hostname: "poodlenoodle42.spdns.org",
          port: 8080,
          path: "/",
          agent: new KeepAliveAgent(),
        },
        (res) => {
          res.on("data", (data: Buffer) => {
            const result = JSON.parse(data.toString()) as Result;
            setSubtasks((__subtasks) => {
              const ret = [...__subtasks];
              const index = ret.findIndex(
                (subtask) => subtask.id == result.subtask.id
              );
              ret[index].status = result.status;
              return ret;
            });
          });
        }
      );
    },
    task,
    subtasks: _subtasks,
  };
}

function useTaskSWR(id: number) {
  const groups = useTasks();
  const { data } = useSWR<Subtask[]>(
    `https://poodlenoodle42.spdns.org:8080/auth/tasks/${id}`,
    fetcher
  );

  for (const group of groups) {
    for (const task of group.tasks) {
      if (task.id == id) return { task, subtasks: data };
    }
  }

  return { task: undefined, subtasks: undefined };
}
