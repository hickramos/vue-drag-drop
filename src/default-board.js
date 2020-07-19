import { uuid } from "./utils";

export default {
  name: "workshop",
  columns: [
    {
      name: "todo",
      tasks: [
        {
          id: uuid(),
          name: "first task",
        },
        {
          id: uuid(),
          name: "second task",
        },
        {
          id: uuid(),
          name: "and third",
        },
      ],
    },
    {
      name: "in-progress",
      tasks: [],
    },
    {
      name: "done",
      tasks: [],
    },
  ],
};
