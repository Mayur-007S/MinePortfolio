# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability or potential exposure within this repository, please report it privately:

1. **Email**: Contact Mayur Myana directly at `mayurmyana111@gmail.com`.
2. **Subject**: `[SECURITY VULNERABILITY] - MinePortfolio`
3. Include detailed steps to reproduce the issue, attack vectors, and potential impact.

Please do **NOT** open public GitHub issues for security vulnerabilities.

---

## Security Architecture & Defenses

- **Strict Transport Security (HSTS)**: 1-year max-age preload enforcement.
- **Content-Security-Policy (CSP)**: Whitelisted script, style, image, and connect origins.
- **Clickjacking Protection**: `X-Frame-Options: SAMEORIGIN`.
- **MIME-sniffing Prevention**: `X-Content-Type-Options: nosniff`.
- **Contact Form Hardening**:
  - Hidden honeypot trap field.
  - Client-side bot timing validation (rejects rapid automated POST requests).
  - Strict input sanitization & length constraints.
- **Automated Scanning**: Weekly Dependabot package scanning and GitHub CodeQL SAST code analysis.
