import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "@/keystatic.config";

console.log("config", config);

export const { POST, GET } = makeRouteHandler({
  config,
});
