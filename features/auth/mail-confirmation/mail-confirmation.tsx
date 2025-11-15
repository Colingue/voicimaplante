import { Mail } from 'lucide-react';

export function MailConfirmation() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex flex-col items-center gap-2 text-center">
        <a href="#" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex size-8 items-center justify-center rounded-md">
            <Mail className="size-6" />
          </div>
        </a>
      </div>
      <h1 className="text-2xl font-bold">
        Un email de confirmation vous a été envoyé{' '}
      </h1>
      <p className="text-muted-foreground">
        Veuillez vérifier votre boîte de réception et cliquer sur le lien de
        confirmation pour continuer.
      </p>
    </div>
  );
}
