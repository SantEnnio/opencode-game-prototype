# Instructions for coding agents

- Commit or push only when asked. Use the human maintainer as author; omit AI co-authors and
  generated-by trailers from commits and PRs.
- Read docs/STATUS.md before work; update it when verified behavior or known limits change.
- Before marking a change done, run bun test, bun run typecheck and bun run test:node at the root.
  bun test starts installed Edge or Chrome headlessly. Keep checks in throwaway projects.
- src/index.ts default-exports only { id, server, setup }. Put host-independent logic in src/core.ts;
  adapt opencode 1 in src/host-v1.ts and opencode 2 in src/host-v2.ts.
- Use node: APIs under src/ so the bundle runs on Node and Bun. Load @opencode-ai/plugin inside
  server only; describe tool arguments in src/args.ts. Avoid top-level package imports.
- Spawn processes with argument arrays and build paths with node:path across all platforms.
- When editing model-facing tools, reports, hints or rules, read docs/small-model-tool-design.md.
  Keep text short, imperative and ending with the exact next step.
- The generic helpers and key-script parser live here; this project has no source imports from
  opencode-unity. CONTRIBUTING.md describes builds and releases.
- Use a dedicated connector, MCP or API for external services. Use browser automation only when
  the user explicitly requests it.
