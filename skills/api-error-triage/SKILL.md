---
name: api-error-triage
description: Diagnose backend API errors, inspect logs, code paths, and configuration, then propose the smallest safe fix. Use when Codex needs to排查接口报错、500/502/504 状态码、请求失败、配置错误、依赖调用异常、调用链故障或后端响应异常。
---

# API Error Triage

## Workflow

1. Read the user report and identify the exact symptom.
2. Confirm whether the failure is in input, business logic, dependency, or environment.
3. Inspect the relevant code path, config, and recent changes before editing code.
4. Reproduce the issue if possible, or narrow it down with the smallest safe check.
5. Propose the smallest safe fix first.
6. Validate with a targeted test, request replay, or log-based verification.

## Read references when needed

- Read [references/common-errors.md](references/common-errors.md) for common backend error patterns.

## Notes

- Prefer read-only investigation first.
- Do not jump into large refactors before confirming the likely root cause.
- Separate symptom, root cause, and fix in the final explanation.
