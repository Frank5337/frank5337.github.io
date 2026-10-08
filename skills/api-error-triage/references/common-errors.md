# Common Error Patterns

## 1. Input and Validation Errors

Typical signals:

- `400 Bad Request`
- field validation failures
- JSON parse errors
- enum / type mismatch

Checklist:

- Confirm request body and query params
- Confirm server-side validation rules
- Compare with API contract

## 2. Business Logic Errors

Typical signals:

- request format is valid but business processing fails
- state transition rejected
- resource status not allowed

Checklist:

- Confirm domain state and preconditions
- Inspect recent business rule changes
- Verify whether the failure is expected but poorly surfaced

## 3. Dependency Failures

Typical signals:

- timeout
- connection refused
- DNS failure
- downstream 5xx

Checklist:

- Confirm endpoint, credentials, and timeout config
- Check retry / circuit breaker behavior
- Separate local code bug from dependency instability

## 4. Configuration Problems

Typical signals:

- only one environment is broken
- startup is normal but runtime behavior is wrong
- wrong feature flags, base URLs, or credentials

Checklist:

- Compare config across environments
- Check environment variables and injected secrets
- Verify recent deployment and config changes

## 5. Quick Triage Output Format

When answering, prefer this structure:

1. Symptom
2. Most likely cause
3. What to verify next
4. Smallest safe fix
