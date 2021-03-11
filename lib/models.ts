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
  status?: Status;
}

export interface Result {
  subtask: Subtask;
  status: Status;
}

export interface Status {
  exitCode: ExitCode;
  output: string;
}

export const exitCodes = {
  Correct: -1,
  OK: 0,
  MinorProblem: 1,
  TimeOut: 124,
  CommandNotFound: 127,
  SIGILL: 132,
  SIGTRAP: 133,
  SIGABRT: 134,
  SIGFPE: 136,
  OutOfMemory: 137,
  SIGBUS: 138,
  SegFault: 139,
};

export enum ExitCode {
  Correct = -1,
  OK = 0,
  MinorProblem = 1,
  TimeOut = 124,
  CommandNotFound = 127,
  SIGILL = 132,
  SIGTRAP = 133,
  SIGABRT = 134,
  SIGFPE = 136,
  OutOfMemory = 137,
  SIGBUS = 138,
  SegFault = 139,
}
