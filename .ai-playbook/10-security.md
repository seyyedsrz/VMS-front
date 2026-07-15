# Security Standards

## Goal

Security is a mandatory requirement.

Every feature must be designed with the assumption that it will be targeted by malicious users.

Security always has higher priority than convenience.

---

# Core Principles

Always:

- Validate every input
- Sanitize untrusted data
- Escape output when required
- Follow the Principle of Least Privilege
- Assume every request can be forged
- Never trust the client
- Protect sensitive information
- Keep dependencies up to date

Never:

- Trust frontend validation
- Expose secrets
- Store sensitive data in client-side code
- Disable security mechanisms for convenience

---

# Authentication

Authentication must always be handled by the backend.

Frontend responsibilities:

- Store authentication securely
- Refresh sessions safely
- Handle expired sessions gracefully
- Redirect unauthorized users
- Never perform permission decisions locally

---

# Authorization

Authentication ≠ Authorization.

Every protected API must verify:

- User identity
- User role
- Required permissions
- Resource ownership (when applicable)

Never rely on hidden UI elements as a security mechanism.

---

# Session Management

Requirements:

- Secure cookies
- HttpOnly cookies
- SameSite policy
- Secure flag in production
- Short-lived access tokens
- Refresh tokens managed securely

On logout:

- Clear cookies
- Clear cached user data
- Reset application state
- Redirect appropriately

---

# Secrets

Never expose:

- API keys
- Private tokens
- Database credentials
- Service account keys
- JWT secrets
- Encryption keys

Secrets belong only in:

- Environment variables
- Secret management systems
- Backend infrastructure

Never commit secrets to Git.

---

# Environment Variables

Rules:

Public variables:

NEXT_PUBLIC_*

Private variables:

Everything else

Never access private environment variables from client components.

---

# Input Validation

Every input must be validated.

Examples:

- Forms
- Query parameters
- Route parameters
- Request body
- Uploaded files
- Search values

Validation must exist on the backend even if frontend validation is present.

---

# Sanitization

Always sanitize:

- HTML
- Rich text
- Markdown
- User-generated content

Prevent:

- XSS
- HTML injection
- Script injection

---

# Output Encoding

Escape user content before rendering when necessary.

Never use:

dangerouslySetInnerHTML

Unless content has been fully sanitized and reviewed.

---

# XSS Prevention

Prevent:

- Reflected XSS
- Stored XSS
- DOM-based XSS

Rules:

- Never execute user input
- Never inject raw HTML
- Prefer React rendering
- Sanitize rich content

---

# CSRF Protection

State-changing requests must be protected.

Use:

- SameSite cookies
- CSRF tokens (when required)
- Backend verification

Never assume POST requests are safe by default.

---

# SQL Injection

Always use:

- Parameterized queries
- ORM protections
- Prepared statements

Never concatenate user input into queries.

---

# File Uploads

Validate:

- File type
- MIME type
- Extension
- File size
- Image dimensions (if applicable)

Reject executable files.

Store uploads outside the application root when possible.

Generate randomized filenames.

---

# Passwords

Passwords must:

- Never be logged
- Never be stored in plaintext
- Never be cached on the client
- Never be displayed after submission

Password hashing is always backend responsibility.

---

# Logging

Never log:

- Passwords
- Tokens
- Cookies
- Personal data
- Secrets
- Payment information

Logs should contain only useful debugging information.

---

# Error Messages

Never expose:

- Stack traces
- Database errors
- Internal server paths
- Framework internals

Show generic user-friendly messages.

Detailed errors belong only in logs.

---

# API Security

Every API should:

- Validate input
- Validate authentication
- Validate authorization
- Handle rate limits
- Return appropriate HTTP status codes
- Avoid leaking implementation details

---

# Rate Limiting

Sensitive endpoints should support:

- Rate limiting
- Brute-force protection
- Login throttling
- Abuse detection

---

# HTTPS

Production must always use HTTPS.

Never send:

- Tokens
- Cookies
- Credentials

Over HTTP.

---

# Content Security Policy

Use CSP whenever possible.

Goals:

- Prevent XSS
- Restrict external resources
- Limit script execution

Policy should be reviewed before production release.

---

# CORS

Allow only trusted origins.

Never use:

Access-Control-Allow-Origin: *

For authenticated APIs.

---

# Dependency Security

Regularly:

- Update dependencies
- Remove unused packages
- Audit vulnerabilities

Avoid adding packages for trivial functionality.

---

# Browser Storage

Never store:

- Access tokens
- Refresh tokens
- Secrets

In:

- localStorage
- sessionStorage

Sensitive data should be stored using secure cookies.

---

# Client Security

Do not rely on client-side restrictions.

Anything executed in the browser can be modified by users.

Frontend improves UX—not security.

---

# Third-Party Libraries

Before adding a dependency:

- Verify maintenance status
- Review popularity
- Check security history
- Evaluate bundle impact
- Confirm license compatibility

Avoid unnecessary dependencies.

---

# Security Headers

Production should include appropriate headers such as:

- Content-Security-Policy
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security
- X-Frame-Options (or CSP frame-ancestors)

---

# Privacy

Collect only necessary user data.

Never expose personal information unnecessarily.

Follow applicable privacy regulations and company policies.

---

# Incident Response

If a security issue is discovered:

1. Stop further exposure.
2. Assess impact.
3. Notify responsible team members.
4. Patch the vulnerability.
5. Verify the fix.
6. Document the incident.
7. Prevent recurrence.

Never ignore or hide security vulnerabilities.

---

# Production Checklist

Before merge verify:

□ No secrets committed

□ Authentication validated

□ Authorization enforced

□ Inputs validated

□ Outputs sanitized

□ No sensitive logging

□ Secure cookies configured

□ Environment variables correctly separated

□ Dependencies audited

□ HTTPS required

□ Security headers configured

□ Error messages sanitized

□ No known critical vulnerabilities

Security is never optional.
```