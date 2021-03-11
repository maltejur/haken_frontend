import axios from "axios";
import Cookies from "js-cookie";
import { Group, Subtask, Task } from "lib/models";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

const initialState: Group[] = [];

const TaskContext = createContext(initialState);

export function useTasks() {
  useEffect(() => {
    fetchTasks(Cookies.get("token"));
  }, []);

  return useContext(TaskContext);
}

export let fetchTasks: (token: string) => Promise<boolean>;

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState<Group[]>([]);

  fetchTasks = async (token) => {
    const response = await fetch(
      "https://poodlenoodle42.spdns.org:8080/auth/tasks",
      { headers: { token } }
    );
    if (response.ok) {
      setTasks(await response.json());
      return true;
    } else {
      return false;
    }
  };

  return <TaskContext.Provider value={tasks}>{children}</TaskContext.Provider>;
}
