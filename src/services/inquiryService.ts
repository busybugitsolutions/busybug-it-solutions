import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export type InquiryStatus = 'new' | 'reviewed' | 'resolved';
export type InquirySource = 'contact-form' | 'scope-estimator' | 'careers';

export const INQUIRY_CONSTRAINTS = {
  NAME_MIN: 2,
  NAME_MAX: 120,
  EMAIL_MIN: 5,
  EMAIL_MAX: 254,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  PHONE_MIN: 7,
  PHONE_MAX: 24,
  PHONE_PATTERN: /^[0-9+\-().\s]{7,24}$/,
  MESSAGE_MIN: 12,
  MESSAGE_MAX: 4000,
  REFERENCE_PATTERN: /^BB-[A-Z0-9]{4,12}$/,
} as const;

export interface CreateInquiryInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  source?: InquirySource;
}

export interface StoredInquiry {
  id: string;
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: InquiryStatus;
  source: InquirySource;
  createdAtMs: number | null;
}

function generateReferenceId(): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `BB-${randomDigits}`;
}

function generateDocumentId(): string {
  const randomSuffix = Math.random().toString(36).replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
  return `inq_${Date.now()}_${randomSuffix || 'lead'}`;
}

export async function createInquiry(
  input: CreateInquiryInput
): Promise<{ id: string; referenceId: string }> {
  const inquiryId = generateDocumentId();
  const referenceId = generateReferenceId();

  const sanitizedName = input.name.trim().slice(0, INQUIRY_CONSTRAINTS.NAME_MAX);
  const sanitizedEmail = input.email.trim().slice(0, INQUIRY_CONSTRAINTS.EMAIL_MAX);
  const sanitizedPhone = input.phone.trim().slice(0, INQUIRY_CONSTRAINTS.PHONE_MAX);
  const sanitizedMessage = input.message.trim().slice(0, INQUIRY_CONSTRAINTS.MESSAGE_MAX);
  const source: InquirySource = input.source ?? 'contact-form';

  const docPath = `inquiries/${inquiryId}`;

  try {
    await setDoc(doc(db, 'inquiries', inquiryId), {
      referenceId,
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      message: sanitizedMessage,
      status: 'new',
      source,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { id: inquiryId, referenceId };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, docPath);
  }
}

export function subscribeToInquiries(
  onData: (inquiries: StoredInquiry[]) => void,
  onError: (err: Error) => void
): Unsubscribe {
  const inquiriesRef = collection(db, 'inquiries');
  const inquiriesQuery = query(inquiriesRef, orderBy('createdAt', 'desc'));

  return onSnapshot(
    inquiriesQuery,
    (snapshot) => {
      const items: StoredInquiry[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const createdAtField = data.createdAt;
        const createdAtMs =
          createdAtField && typeof createdAtField.toMillis === 'function'
            ? createdAtField.toMillis()
            : null;

        return {
          id: docSnap.id,
          referenceId: String(data.referenceId ?? ''),
          name: String(data.name ?? ''),
          email: String(data.email ?? ''),
          phone: String(data.phone ?? ''),
          message: String(data.message ?? ''),
          status: (data.status as InquiryStatus) || 'new',
          source: (data.source as InquirySource) || 'contact-form',
          createdAtMs,
        };
      });
      onData(items);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, 'inquiries');
      } catch (wrapped) {
        onError(wrapped instanceof Error ? wrapped : new Error(String(wrapped)));
      }
    }
  );
}

export async function updateInquiryStatus(
  inquiryId: string,
  status: InquiryStatus
): Promise<void> {
  const docPath = `inquiries/${inquiryId}`;
  try {
    await updateDoc(doc(db, 'inquiries', inquiryId), {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

export async function deleteInquiry(inquiryId: string): Promise<void> {
  const docPath = `inquiries/${inquiryId}`;
  try {
    await deleteDoc(doc(db, 'inquiries', inquiryId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}
