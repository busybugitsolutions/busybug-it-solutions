# Security Specification & Red Team Audit — BusyBug IT Solutions

## 1. Data & Access Control Invariants
1. **Default Deny**: All Firestore paths are denied by default (`match /{document=**} { allow read, write: if false; }`).
2. **Zero Client PII Reads or Mutations**: Contact inquiries (`name`, `email`, `phone`, `message`) contain PII. No client application — authenticated or unauthenticated — may ever `get`, `list`, `update`, or `delete` `/inquiries/{inquiryId}`. Inquiries are inspected strictly server-side inside Firebase Console via IAM.
3. **Write-Only Public Intake**: Public visitors may ONLY `create` documents in `/inquiries/{inquiryId}` when the document ID passes `isValidId()`, all required fields exist with zero extra shadow fields (`hasAll` + `hasOnly`), `status` is strictly `'new'`, and both `createdAt` and `updatedAt` match `request.time`.

---

## 2. The "Dirty Dozen" Adversarial Payloads

| # | Attack Vector | Payload / Action Summary | Expected Result |
|---|---------------|--------------------------|-----------------|
| 1 | **Shadow Field Injection** | `create /inquiries/inq_01` with all valid fields plus `"extra": true` | `PERMISSION_DENIED` (`hasOnly` rejection) |
| 2 | **State Shortcutting on Create** | `create /inquiries/inq_02` with `"status": "resolved"` | `PERMISSION_DENIED` (`status == 'new'` gate) |
| 3 | **Timestamp Forgery on Create** | `create /inquiries/inq_03` with client-backdated `createdAt` | `PERMISSION_DENIED` (`createdAt == request.time`) |
| 4 | **ID Poisoning (Resource Exhaustion)** | `create /inquiries/` with 500-char or special-char ID (`../../test/x`) | `PERMISSION_DENIED` (`isValidId` regex + size <= 128) |
| 5 | **Message Payload Flooding (DoW)** | `create /inquiries/inq_05` with 50KB `message` string | `PERMISSION_DENIED` (`message.size() <= 4000`) |
| 6 | **Invalid Email / Injection Pattern** | `create /inquiries/inq_06` with malformed `email: "not-an-email"` | `PERMISSION_DENIED` (email regex & size guard) |
| 7 | **Invalid Phone Format** | `create /inquiries/inq_07` with short/script phone `"<script>"` | `PERMISSION_DENIED` (phone regex & length guard) |
| 8 | **Invalid Source Enum** | `create /inquiries/inq_08` with `"source": "arbitrary"` | `PERMISSION_DENIED` (`source in [...]` guard) |
| 9 | **PII Exfiltration (Public Get)** | Any client `get /inquiries/inq_01` | `PERMISSION_DENIED` (`allow get: if false`) |
| 10 | **PII Scraping (Client List)** | Any client `list /inquiries` (even signed in) | `PERMISSION_DENIED` (`allow list: if false`) |
| 11 | **Client Update Tampering** | Any client `update /inquiries/inq_01` | `PERMISSION_DENIED` (`allow update: if false`) |
| 12 | **Client Delete Sabotage** | Any client `delete /inquiries/inq_01` | `PERMISSION_DENIED` (`allow delete: if false`) |
