# Publishing a Release

This guide describes how to publish a new version of the Semantic Components workspace libraries to npm.

## Libraries

All libraries are versioned together:

- `@semantic-components/ui`
- `@semantic-components/ui-lab`
- `@semantic-components/editor`
- `@semantic-components/carousel`
- `@semantic-components/code`

## Automated Release (CI)

The GitHub Actions workflow at `.github/workflows/publish.yml` handles the full release process.

1. Go to **Actions** > **Publish to npm** > **Run workflow**
2. The workflow will:
   - Install dependencies
   - Build all libraries
   - Bump all libraries to the next **minor** version
   - Publish all libraries to npm
   - Commit and push the version bump with a git tag

## Manual Release (Local)

### First Release

```bash
npx nx release 0.60.0 --first-release
```

### Subsequent Releases

```bash
# Minor bump (e.g., 0.60.0 → 0.61.0)
npx nx release minor

# Patch bump (e.g., 0.60.0 → 0.60.1)
npx nx release patch

# Specific version
npx nx release 1.0.0
```

Add `--yes` to skip confirmation prompts.

Add `--dry-run` to preview changes without publishing.

### After a Manual Release

Push the version commit and tag:

```bash
git push --follow-tags
```

## Workspace Protocol

Libraries that depend on `@semantic-components/ui` use the `workspace:*` protocol in their `peerDependencies`:

```json
{
  "peerDependencies": {
    "@semantic-components/ui": "workspace:*"
  }
}
```

During `nx release`, this is automatically replaced with the actual version (e.g., `"0.61.0"`) in the published `dist/` package.json. The source files always keep `workspace:*`.

## Prerequisites

- `NPM_TOKEN` secret configured in GitHub repository settings (for CI)
- npm account with publish access to the `@semantic-components` scope
