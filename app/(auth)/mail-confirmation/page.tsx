import { MailConfirmation } from '@/features/auth/mail-confirmation/mail-confirmation';

export default function Page() {
  return (
    <div className="bg-background flex h-full flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <MailConfirmation />
      </div>
    </div>
  );
}
