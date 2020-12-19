import chalk from "chalk";
import { diffJson } from "diff";

const getDiff = (previous: any, next: any) => {
  const diffs = diffJson(previous, next);

  let output = "";
  diffs.forEach((part) => {
    if (part.added) output += `${chalk.greenBright(part.value)}`;
    if (part.removed) output += `${chalk.redBright(part.value)}`;

    if (!part.added && !part.removed) output += `${chalk.grey(part.value)}`;
  });

  return output;
};

export type Collection = "user" | "team" | "invitation" | "appkey";
export type AlterationType = "Modifying" | "Adding";
export const log = (
  collection: Collection,
  type: AlterationType,
  object: any,
  originalObject?: any
): string => {
  if (!originalObject) {
    return `${chalk.cyanBright.bgGray.bold(
      " Mock DB "
    )} - ${type} ${collection}: ${chalk.green(
      JSON.stringify(object, null, 2)
    )}`;
  }

  const original = JSON.parse(JSON.stringify(originalObject));
  const altered = JSON.parse(JSON.stringify(object));
  const diffString = getDiff(original, altered);

  return `${chalk.cyanBright.bgGray.bold(
    " Mock DB "
  )} - ${type} ${collection}: ${diffString}`;
};
