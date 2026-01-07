# Security Check

Scan the codebase for exposed API keys, secrets, credentials, and common security issues.

## Instructions
1. Search for hardcoded secrets and API keys using patterns like:
   - API keys: `api[_-]?key`, `apikey`, `api_secret`
   - AWS credentials: `AKIA`, `aws_access_key`, `aws_secret`
   - Private keys: `-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----`
   - Tokens: `token`, `bearer`, `auth_token`, `access_token`
   - Passwords: `password\s*=`, `passwd`, `pwd`
   - Connection strings: `mongodb://`, `postgres://`, `mysql://`, `redis://`
   - Generic secrets: `secret`, `credential`

2. Check for sensitive files that shouldn't be committed:
   - `.env` files (except `.env.example`)
   - `*.pem`, `*.key`, `*.p12`, `*.pfx` files
   - `credentials.json`, `secrets.json`, `config.local.*`
   - `.htpasswd`, `.netrc`, `.npmrc` with credentials

3. Review `.gitignore` to ensure sensitive patterns are excluded

4. Check for common security issues:
   - Hardcoded localhost/development URLs in production code
   - Disabled SSL verification
   - Eval or exec with user input
   - SQL queries with string concatenation (SQL injection risk)
   - Unescaped user input in HTML (XSS risk)

5. Report findings with:
   - File path and line number
   - Type of issue (secret, credential, vulnerability)
   - Severity (high, medium, low)
   - Recommendation for fixing

## Notes
- False positives are common; verify each finding
- Check if secrets are actually test/example values
- Environment variables referencing secrets (like `process.env.API_KEY`) are safe
- Focus on actual exposed values, not variable names
