import { promisify } from "util";

export const promisifyAll = (client) => {
  const to = {};
  for (var k in client) {
    if (typeof client[k] != "function") continue;
    to[k] = promisify(client[k].bind(client));
  }
  return to;
};
