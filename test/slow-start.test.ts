// Exercise the real server and headless-process deadline with a delayed browser report.
// The executable fixture uses a POSIX shebang; Windows is covered by the live Edge tests.
import { expect, test } from "bun:test"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { createPrototypes } from "../src/core.ts"

// A cold software-rendering browser on the Linux runner missed the old 17.1 s total deadline.
test.skipIf(process.platform === "win32")("a slow browser startup still returns its test-play report", async () => {
  const dir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "opencode-game-prototype-slow-")))
  const browser = path.join(dir, "delayed-browser")
  const recording = JSON.parse(fs.readFileSync(new URL("./fixtures/play-coin.json", import.meta.url), "utf8")).run
  fs.writeFileSync(browser, `#!/usr/bin/env node
const page = new URL(process.argv.at(-1));
await new Promise((resolve) => setTimeout(resolve, 18_000));
const response = await fetch(new URL("/__proto/report/" + page.searchParams.get("__run"), page), {
  method: "POST", body: ${JSON.stringify(JSON.stringify(recording))}
});
if (!response.ok) process.exitCode = 1;
`, { mode: 0o700 })
  const proto = createPrototypes(dir, { browserPath: browser, port: 0 }, () => {})!
  const context = { directory: dir, sessionID: "slow", abort: new AbortController().signal, consent: async () => null }
  try {
    await proto.tools.proto_new!.execute({ name: "cold-start" }, context)
    const report = await proto.tools.proto_play!.execute({ keys: "D 1s" }, context)
    expect(report).toContain('keys "D 1s". No errors.')
    expect(report).toContain("Player moved")
  } finally {
    await proto.dispose()
    fs.rmSync(dir, { recursive: true, force: true })
  }
}, 60_000)
