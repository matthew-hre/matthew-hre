import { expect, test } from "bun:test";
import { GET } from "./route.ts";

test("serves llms.txt as UTF-8 plain text", async () => {
  const response = GET();
  expect(response.status).toBe(200);
  expect(response.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
  expect(await response.text()).toStartWith("# Matthew Hrehirchuk\n");
});
