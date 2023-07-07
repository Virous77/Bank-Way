import { UserRoot } from "./Controller/user.js";
import { ActivityRoot } from "./Controller/activity.js";

export const resolvers = {
  ...UserRoot,
  ...ActivityRoot,
};
