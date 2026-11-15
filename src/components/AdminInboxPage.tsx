import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import {
  ArrowLeft,
  CheckCircle2,
  Inbox,
  Lock,
  LogOut,
  Mail,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { ADMIN_EMAIL, auth, googleProvider } from '../lib/firebase';
import {
  deleteInquiry,
  subscribeToInquiries,
  updateInquiryStatus,
  type InquiryStatus,
  type StoredInquiry,
} from '../services/inquiryService';
import { CircuitBackdrop } from './CircuitBackdrop';

interface AdminInboxPageProps {
  onBackHome: () => void;
}

const STATUS_FILTERS: ('all' | InquiryStatus)[] = ['all', 'new', 'reviewed', 'resolved'];

export function AdminInboxPage({ onBackHome }: AdminInboxPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const isAuthorizedAdmin =
    Boolean(user) &&
    user?.emailVerified === true &&
    user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    if (!authReady || !isAuthorizedAdmin) {
      setInquiries([]);
      setLoadingInquiries(false);
      return;
    }

    setLoadingInquiries(true);
    setDataError(null);

    const unsubscribe = subscribeToInquiries(
      (items) => {
        setInquiries(items);
        setLoadingInquiries(false);
      },
      (err) => {
        setDataError(err.message);
        setLoadingInquiries(false);
      }
    );

    return () => unsubscribe();
  }, [authReady, isAuthorizedAdmin]);

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : 'Unable to complete Google sign-in.'
      );
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleStatusChange = async (id: string, nextStatus: InquiryStatus) => {
    setPendingActionId(id);
    setDataError(null);
    try {
      await updateInquiryStatus(id, nextStatus);
    } catch (error) {
      setDataError(error instanceof Error ? error.message : 'Failed to update inquiry status.');
    } finally {
      setPendingActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setPendingActionId(id);
    setDataError(null);
    try {
      await deleteInquiry(id);
    } catch (error) {
      setDataError(error instanceof Error ? error.message : 'Failed to delete inquiry.');
    } finally {
      setPendingActionId(null);
    }
  };

  const visibleInquiries =
    statusFilter === 'all'
      ? inquiries
      : inquiries.filter((item) => item.status === statusFilter);

  return (
    <section className="relative min-h-[75vh] overflow-hidden bg-[#E8EDF4] py-14 lg:py-20">
      <CircuitBackdrop variant="subtle" />
      <div className="relative z-10 mx-auto max-w-[1240px] px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C8D2E0] pb-6">
          <div>
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex min-h-[36px] items-center gap-2 text-xs font-semibold text-[#525866] hover:text-[#111317] transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Return to Public Site</span>
            </button>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#111317]">
              Engineering Lead Inbox
            </h1>
            <p className="mt-1 text-sm text-[#525866]">
              Protected client inquiry records stored in Firestore with strict admin-only access
              controls.
            </p>
          </div>

          {user && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#525866]">{user.email}</span>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#D4D8DF] bg-white px-4 py-2 text-xs font-semibold text-[#111317] hover:border-[#111317] transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {/* Auth Loading */}
        {!authReady && (
          <div className="mt-10 rounded-xl border border-[#E2E5E9] bg-white p-8 text-sm text-[#525866]">
            Verifying authentication session...
          </div>
        )}

        {/* Unauthenticated Sign-In Gate */}
        {authReady && !user && (
          <div className="mt-10 max-w-lg rounded-xl border border-[#E2E5E9] bg-white p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#E2E5E9] bg-[#FAFAFA] text-[#111317]">
              <Lock className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold tracking-tight text-[#111317]">
              Administrator Authentication Required
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#525866]">
              Submitted contact inquiries contain client contact details and are unreadable to the
              public. Sign in with your verified{' '}
              <span className="font-mono text-xs text-[#111317]">{ADMIN_EMAIL}</span> Google
              account to view and triage messages.
            </p>

            {authError && (
              <p className="mt-4 rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] p-3 text-xs text-[#B91C1C]">
                {authError}
              </p>
            )}

            <button
              type="button"
              onClick={handleSignIn}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#111317] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#262A33] cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
              <span>Sign In With Google</span>
            </button>
          </div>
        )}

        {/* Authenticated but Unauthorized Account */}
        {authReady && user && !isAuthorizedAdmin && (
          <div className="mt-10 max-w-lg rounded-xl border border-[#FCA5A5] bg-white p-8">
            <h2 className="font-display text-xl font-semibold tracking-tight text-[#111317]">
              Access Denied
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#525866]">
              You are signed in as <span className="font-medium text-[#111317]">{user.email}</span>
              {user.emailVerified ? '' : ' (unverified email)'}. Only verified{' '}
              <span className="font-mono text-xs text-[#111317]">{ADMIN_EMAIL}</span> accounts are
              authorized to read client inquiries.
            </p>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-6 inline-flex min-h-[44px] items-center rounded-lg bg-[#111317] px-5 py-2.5 text-sm font-semibold text-white cursor-pointer"
            >
              Sign Out &amp; Switch Account
            </button>
          </div>
        )}

        {/* Verified Admin Inbox */}
        {authReady && isAuthorizedAdmin && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div
                role="tablist"
                aria-label="Filter inquiries by status"
                className="flex flex-wrap items-center gap-1 rounded-lg border border-[#E2E5E9] bg-[#F2F3F5] p-1"
              >
                {STATUS_FILTERS.map((status) => {
                  const selected = statusFilter === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setStatusFilter(status)}
                      className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selected
                          ? 'bg-white text-[#111317] shadow-xs'
                          : 'text-[#525866] hover:text-[#111317]'
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>

              <p className="font-mono text-xs text-[#525866] tabular-nums">
                {visibleInquiries.length} {visibleInquiries.length === 1 ? 'record' : 'records'}
              </p>
            </div>

            {dataError && (
              <div className="rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] p-4 text-xs text-[#B91C1C]">
                {dataError}
              </div>
            )}

            {loadingInquiries ? (
              <div className="rounded-xl border border-[#E2E5E9] bg-white p-8 text-sm text-[#525866]">
                Loading encrypted lead records...
              </div>
            ) : visibleInquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-[#E2E5E9] bg-white p-12 text-center">
                <Inbox className="h-8 w-8 text-[#9CA3AF]" aria-hidden="true" />
                <h2 className="mt-4 font-display text-lg font-semibold text-[#111317]">
                  No inquiries in this view
                </h2>
                <p className="mt-1.5 max-w-md text-sm text-[#525866]">
                  Submissions from the public Contact Us form appear here immediately in real time.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#E2E5E9] rounded-xl border border-[#E2E5E9] bg-white">
                {visibleInquiries.map((inquiry) => {
                  const isBusy = pendingActionId === inquiry.id;
                  const formattedDate = inquiry.createdAtMs
                    ? new Date(inquiry.createdAtMs).toLocaleString()
                    : 'Pending server timestamp';

                  return (
                    <article key={inquiry.id} className="p-6 sm:p-8">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#525866]">
                            <span className="font-mono font-semibold text-[#B45309] tabular-nums">
                              {inquiry.referenceId}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-medium capitalize text-[#111317]">
                              Status: {inquiry.status}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">{formattedDate}</span>
                          </div>
                          <h2 className="font-display text-xl font-semibold text-[#111317]">
                            {inquiry.name}
                          </h2>
                          <p className="text-sm text-[#525866]">
                            <a
                              href={`mailto:${inquiry.email}`}
                              className="font-medium text-[#111317] hover:text-[#B45309] underline-offset-4 hover:underline"
                            >
                              {inquiry.email}
                            </a>
                            <span aria-hidden="true" className="mx-2">
                              ·
                            </span>
                            <span className="font-mono tabular-nums">{inquiry.phone}</span>
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          {inquiry.status === 'new' && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleStatusChange(inquiry.id, 'reviewed')}
                              className="min-h-[38px] rounded-lg border border-[#D4D8DF] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#111317] hover:border-[#111317] disabled:opacity-50 cursor-pointer"
                            >
                              Mark Reviewed
                            </button>
                          )}

                          {inquiry.status !== 'resolved' ? (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleStatusChange(inquiry.id, 'resolved')}
                              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-[#111317] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#262A33] disabled:opacity-50 cursor-pointer"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                              <span>Finalize Resolved</span>
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#15803D] px-2">
                              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Locked (Resolved)</span>
                            </span>
                          )}

                          <a
                            href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
                              `Re: [${inquiry.referenceId}] BusyBug IT Solutions`
                            )}`}
                            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-[#D4D8DF] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#111317] hover:border-[#111317]"
                          >
                            <Mail className="h-3.5 w-3.5 text-[#525866]" aria-hidden="true" />
                            <span>Reply</span>
                          </a>

                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleDelete(inquiry.id)}
                            aria-label={`Delete inquiry ${inquiry.referenceId}`}
                            className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg border border-[#E2E5E9] bg-white text-[#525866] hover:border-[#DC2626] hover:text-[#DC2626] disabled:opacity-50 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <p className="mt-4 rounded-lg border border-[#F2F3F5] bg-[#FAFAFA] p-4 text-sm leading-relaxed text-[#374151] whitespace-pre-line">
                        {inquiry.message}
                      </p>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
