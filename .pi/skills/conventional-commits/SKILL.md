---
name: conventional-commits
description: Conventional Commits specification for consistent, machine-readable git commit messages. Use when crafting commit messages, enforcing commitlint rules, or generating changelogs/releases.
metadata:
  author: Conventional Commits community
  version: "2026.03.01"
  source: https://github.com/conventional-commits/conventionalcommits.org
---

# Conventional Commits

> A lightweight convention for commit messages that enables automated tooling (changelogs, releases) and improves human readability.

## Format

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

- **type**: category of change (see Types below).
- **scope**: optional area of codebase, e.g. `auth`, `ui`, `deps`.
- **!**: indicates a breaking change (can also be in footer).
- **description**: short, imperative summary in present tense.
- **body**: detailed explanation, wrapped at ~72 chars when possible.
- **footer**: metadata such as `BREAKING CHANGE:` or issue references.

## Types

Common types used by popular tooling (commitlint, semantic-release):

- **feat**: new feature
- **fix**: bug fix
- **docs**: documentation only changes
- **style**: formatting, missing semi-colons, no code change
- **refactor**: code change that neither fixes a bug nor adds a feature
- **perf**: performance improvement
- **test**: adding or correcting tests
- **build**: build system or external dependencies
- **ci**: CI configuration and scripts
- **chore**: maintenance tasks
- **revert**: revert a previous commit

## Breaking Changes

Indicate breaking changes with `!` or a footer:

```
feat(api)!: remove deprecated endpoints

BREAKING CHANGE: `/v1/users` no longer accepts `status`.
```

## Examples

```
feat(chat): add streaming response support
fix(ui): handle empty history state
refactor(store): simplify session persistence
chore(deps): bump vue to 3.5.6
```

## Recommendations

- Keep the subject line under 72 characters.
- Use imperative mood: "add", "fix", "remove".
- Reference issues in footers: `Refs: #123` or `Closes #123`.
