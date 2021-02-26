export interface Group {
  id: number;
  name: string;
  description: string;
  isAdmin: boolean;
  tasks: Task[];
}

export interface Task {
  id: number;
  name: string;
  author: string;
  description: string;
  groupID: number;
}

export interface Subtask {
  id: number;
  points: number;
  name: string;
}
