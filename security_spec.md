# Security Specification & Red Team Audit — BusyBug IT Solutions

## 1. Data & Access Control Invariants
1. **Default Deny**: All Firestore paths are denied by default (`match /{document=**} { allow read, write: if false; }`).
2. **PII Isolation**: Contact inquiries (`name`, `email`, `phone`, `message`) contain PII. Public visitors and standard signed-in non-admin users MUST NEVER have `get`, `list`, `update`, or `delete` access to `/inquiries/{inquiryId}`. Only verified BusyBug admins (`request.auth.token.email_verified == true` and either `request.auth.token.email == 'busybugitsolutions@gmail.com'` or an explicit `/admins/{uid}` document) may read, list, update, or delete inquiries.
3. **Write-Once Public Intake**: Unauthenticated or authenticated visitors may ONLY `create` documents in `/inquiries/{inquiryId}` when the document ID passes `isValidId()`, all required fields exist with zero extra shadow fields (`hasAll` + `hasOnly`), `status` is strictly `'new'`, and both `createdAt` and `updatedAt` match `request.time`.
4. **Immortal Audit Fields**: After creation, `referenceId`, `name`, `email`, `phone`, `message`, `source`, and `createdAt` cannot be modified even by admins (`affectedKeys().hasOnly(['status', 'updatedAt'])` + equality assertions against `existing()`).
5. **Terminal State Locking**: Once an inquiry reaches `status == 'resolved'`, no further updates are permitted (`existing().status != 'resolved'`).
6. **Admin Escalation Lock**: `/admins/{adminId}` is locked against all client writes (`allow write: if false;`) and `list` queries (`allow list: if false;`).

---

## 2. The "Dirty Dozen" Adversarial Payloads

| # | Attack Vector | Payload / Action Summary | Expected Result |
|---|---------------|--------------------------|-----------------|
| 1 | **Shadow Field Injection** | `create /inquiries/inq_01` with all valid fields plus `"isAdmin": true` | `PERMISSION_DENIED` (`hasOnly` rejection) |
| 2 | **State Shortcutting on Create** | `create /inquiries/inq_02` with `"status": "resolved"` | `PERMISSION_DENIED` (`status == 'new'` gate) |
| 3 | **Timestamp Forgery on Create** | `create /inquiries/inq_03` with client-backdated `createdAt` | `PERMISSION_DENIED` (`createdAt == request.time`) |
| 4 | **ID Poisoning (Resource Exhaustion)** | `create /inquiries/` with 500-char or special-char ID (`../../admins/x`) | `PERMISSION_DENIED` (`isValidId` regex + size <= 128) |
| 5 | **Message Payload Flooding (DoW)** | `create /inquiries/inq_05` with 50KB `message` string | `PERMISSION_DENIED` (`message.size() <= 4000`) |
| 6 | **Invalid Email / Injection Pattern** | `create /inquiries/inq_06` with malformed `email: "not-an-email"` | `PERMISSION_DENIED` (email regex & size guard) |
| 7 | **PII Exfiltration (Public Get)** | Unauthenticated `get /inquiries/inq_01` | `PERMISSION_DENIED` (`isAdmin()` required) |
| 8 | **PII Scraping (Authenticated Non-Admin List)** | Non-admin user (`attacker@gmail.com`) executes `list /inquiries` | `PERMISSION_DENIED` (`isAdmin()` required) |
| 9 | **Email Spoofing Attack** | User with `email: "busybugitsolutions@gmail.com"` and `email_verified: false` reads `/inquiries` | `PERMISSION_DENIED` (`email_verified == true` enforced) |
| 10 | **Self-Promotion to Admin** | Attacker writes `/admins/{attackerUid}` `{ email: "attacker@evil.com", role: "admin" }` | `PERMISSION_DENIED` (`allow write: if false`) |
| 11 | **Immortal Field Tampering** | Admin attempts to alter `message` or `createdAt` during `update` | `PERMISSION_DENIED` (`affectedKeys().hasOnly(['status', 'updatedAt'])`) |
| 12 | **Post-Terminal Mutation** | Admin attempts to revert a `'resolved'` inquiry back to `'new'` | `PERMISSION_DENIED` (`existing().status != 'resolved'`) |
