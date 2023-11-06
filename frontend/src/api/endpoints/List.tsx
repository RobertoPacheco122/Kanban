import { API_URL } from "../index";

interface IListPut {
  id: number;
  name: string;
  is_deleted: boolean;
  boardId: number;
}

export function LIST_PUT(body: IListPut) {
  return {
    endpoint: API_URL + "/List",
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
