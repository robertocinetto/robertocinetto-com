# robertocinetto.com (web). The same verbs in every project; each calls the stack's own tool.
set shell := ["bash", "-euo", "pipefail", "-c"]

default:
    @just --list

setup:
    pnpm install --frozen-lockfile

dev:
    pnpm dev

test:
    @echo "test: the repo has no test suite (lint, typecheck and build are the gate: just check)" >&2; exit 1

# The one gate before a merge: the repo's own hand-back checks (AGENTS.md): lint, build, typecheck.
# tsc runs after the build because a fresh clone has no next-env.d.ts or .next/types until next generates them.
check:
    pnpm run lint
    pnpm run build
    pnpm exec tsc --noEmit

e2e:
    @echo "e2e: not defined for this project" >&2; exit 1

build:
    pnpm build

preview:
    pnpm build
    pnpm start

# Human only: refuses without a terminal and asks first. Pushing main deploys to production through Vercel.
deploy:
    @test -t 0 || { echo "deploy is human-only: run it yourself from a terminal" >&2; exit 1; }
    @read -r -p "Deploy robertocinetto.com? Type yes: " a; [ "$a" = yes ] || { echo "not deployed" >&2; exit 1; }
    git push origin main
