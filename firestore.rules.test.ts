/**
 * Red Team Security Test Suite for BusyBug IT Solutions Firestore Rules
 * Verifies all 12 Dirty Dozen attack payloads are denied and legitimate flows succeed.
 * Designed for @firebase/rules-unit-testing against the Firestore Emulator.
 */

export interface SecurityTestCase {
  id: number;
  name: string;
  operation: 'create' | 'get' | 'list' | 'update' | 'delete' | 'write';
  path: string;
  auth: { uid?: string; email?: string; email_verified?: boolean } | null;
  expected: 'PERMISSION_DENIED' | 'ALLOWED';
  payload?: Record<string, unknown>;
}

const VALID_BASE_INQUIRY = {
  referenceId: 'BB-4821',
  name: 'Jordan Taylor',
  email: 'jordan@enterprise.com',
  phone: '+1 (555) 234-5678',
  message: 'We need a managed cloud and SOC 2 security audit for 120 endpoints.',
  status: 'new',
  source: 'contact-form',
  createdAt: 'SERVER_TIMESTAMP',
  updatedAt: 'SERVER_TIMESTAMP',
};

export const DIRTY_DOZEN_TEST_CASES: SecurityTestCase[] = [
  {
    id: 1,
    name: 'Shadow Field Injection on Create',
    operation: 'create',
    path: 'inquiries/inq_01',
    auth: null,
    expected: 'PERMISSION_DENIED',
    payload: { ...VALID_BASE_INQUIRY, isAdmin: true },
  },
  {
    id: 2,
    name: 'State Shortcutting on Create (status=resolved)',
    operation: 'create',
    path: 'inquiries/inq_02',
    auth: null,
    expected: 'PERMISSION_DENIED',
    payload: { ...VALID_BASE_INQUIRY, status: 'resolved' },
  },
  {
    id: 3,
    name: 'Timestamp Forgery on Create',
    operation: 'create',
    path: 'inquiries/inq_03',
    auth: null,
    expected: 'PERMISSION_DENIED',
    payload: { ...VALID_BASE_INQUIRY, createdAt: '2020-01-01T00:00:00Z' },
  },
  {
    id: 4,
    name: 'Document ID Poisoning (>128 chars)',
    operation: 'create',
    path: `inquiries/${'a'.repeat(200)}`,
    auth: null,
    expected: 'PERMISSION_DENIED',
    payload: VALID_BASE_INQUIRY,
  },
  {
    id: 5,
    name: 'Message Payload Flooding (>4000 chars)',
    operation: 'create',
    path: 'inquiries/inq_05',
    auth: null,
    expected: 'PERMISSION_DENIED',
    payload: { ...VALID_BASE_INQUIRY, message: 'x'.repeat(5000) },
  },
  {
    id: 6,
    name: 'Malformed Email Pattern Rejection',
    operation: 'create',
    path: 'inquiries/inq_06',
    auth: null,
    expected: 'PERMISSION_DENIED',
    payload: { ...VALID_BASE_INQUIRY, email: 'invalid-email' },
  },
  {
    id: 7,
    name: 'Public Unauthenticated PII Read',
    operation: 'get',
    path: 'inquiries/inq_valid',
    auth: null,
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Authenticated Non-Admin Inquiry Scraping',
    operation: 'list',
    path: 'inquiries',
    auth: { uid: 'user_123', email: 'competitor@example.com', email_verified: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Unverified Admin Email Spoofing',
    operation: 'list',
    path: 'inquiries',
    auth: { uid: 'spoof_123', email: 'busybugitsolutions@gmail.com', email_verified: false },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Self-Promotion to /admins Collection',
    operation: 'write',
    path: 'admins/attacker_uid',
    auth: { uid: 'attacker_uid', email: 'attacker@example.com', email_verified: true },
    expected: 'PERMISSION_DENIED',
    payload: { email: 'attacker@example.com', role: 'admin' },
  },
  {
    id: 11,
    name: 'Immortal Field Tampering on Update',
    operation: 'update',
    path: 'inquiries/inq_valid',
    auth: { uid: 'admin_uid', email: 'busybugitsolutions@gmail.com', email_verified: true },
    expected: 'PERMISSION_DENIED',
    payload: { message: 'Tampered body', status: 'reviewed', updatedAt: 'SERVER_TIMESTAMP' },
  },
  {
    id: 12,
    name: 'Post-Terminal State Mutation (resolved -> new)',
    operation: 'update',
    path: 'inquiries/inq_resolved',
    auth: { uid: 'admin_uid', email: 'busybugitsolutions@gmail.com', email_verified: true },
    expected: 'PERMISSION_DENIED',
    payload: { status: 'new', updatedAt: 'SERVER_TIMESTAMP' },
  },
];
