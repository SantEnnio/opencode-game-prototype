# Contributing

From the repository root:

```sh
bun install --frozen-lockfile
bun run build
bun test
bun run typecheck
bun run test:node
```

The build copies three.js from node_modules to assets/three. Live tests use installed Edge or
Chrome; PROTO_SKIP_LIVE=1 skips them. Use sandbox projects for checks.

## Releasing

Set the version in package.json, then commit and push only when the maintainer requests it.
Tag the commit vX.Y.Z and push that tag when asked. Release runs CI, packs this plugin and attaches
the tarball and install-game-prototype.ps1 to a GitHub release in this repository.
The tag must match package.json. Prerelease tags produce GitHub prereleases.
Publishing to npm is not configured.

The original v0.2.0 release and its history remain at
https://github.com/SantEnnio/opencode-unity/releases/tag/game-prototype-v0.2.0.
