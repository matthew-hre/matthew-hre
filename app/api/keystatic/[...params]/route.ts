import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "@/keystatic.config";

console.log("keystatic route configured");

export const { POST, GET } = makeRouteHandler({
  config,
});
