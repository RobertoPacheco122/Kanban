export const API_URL = "http://localhost:3333";

export function BOARD_POST(body) {
  return {
    endpoint: API_URL + "/boards",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function BOARDS_GET() {
  return {
    endpoint: API_URL + "/boards",
    options: {
      method: "GET",
    },
  };
}

export function TASK_AND_THEIR_SUBTASKS_GET(taskId: number) {
  return {
    endpoint: `${API_URL}/tasks/${taskId}/subtasks`,
    options: {
      method: "GET",
    },
  };
}

export function TASK_POST(body) {
  return {
    endpoint: API_URL + "/tasks",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function TASKS_PUT(body) {
  return {
    endpoint: API_URL + "/tasks",
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function LIST_POST(body) {
  return {
    endpoint: API_URL + "/lists",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function LIST_GET() {
  return {
    endpoint: API_URL + "/lists",
    options: {
      method: "GET",
    },
  };
}

export function BOARDS_LISTS_TASKS_GET(boardId: number) {
  return {
    endpoint: API_URL + `/boards/${boardId}/lists`,
    options: {
      method: "GET",
    },
  };
}

export function SUBTASKS_PUT(body) {
  return {
    endpoint: API_URL + "/subtasks",
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
