# Security Specification & Red Team Audit — BusyBug IT Solutions

## 1. Data & Access Control Invariants
1. **Default Deny**: All Firestore paths are denied by default (`match /{document=**} { allow read, write: if false; }`).

3. **Write-Once Public Intake**: Unauthenticated or authenticated visitors may ONLY `create` documents in `/inquiries/{inquiryId}` when the document ID passes `isValidId()`, all required fields exist with zero extra shadow fields (`hasAll` + `hasOnly`), `status` is strictly `'new'`, and both `createdAt` and `updatedAt` match `request.time`.
4. **Immortal Audit Fields**: After creation, `referenceId`, `name`, `email`, `phone`, `message`, `source`, and `createdAt` cannot be modified even by admins (`affectedKeys().hasOnly(['status', 'updatedAt'])` + equality assertions against `existing()`).
5. **Terminal State Locking**: Once an inquiry reaches `status == 'resolved'`, no further updates are permitted (`existing().status != 'resolved'`).

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
