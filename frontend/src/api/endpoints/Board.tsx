import { API_URL } from "../index";

export function BOARD_RELATED_DETAILS_GET(boardId: number) {
  return {
    endpoint: API_URL + `/Board/${boardId}/related`,
    options: {
      method: "GET",
    },
  };
}
