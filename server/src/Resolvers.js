import { UserRoot } from "./Controller/user.js";
import { ActivityRoot } from "./Controller/activity.js";
import { SettingRoot } from "./Controller/settings.js";

export const resolvers = {
  ...UserRoot,
  ...ActivityRoot,
  ...SettingRoot,
};
