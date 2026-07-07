import { signOut } from "@/app/actions";
import { getCurrentProfile } from "@/lib/auth";
import { roleLabels } from "@/lib/types";
import { initials } from "@/lib/utils";
import { PageHeader, Panel, buttonClass } from "@/components/ui";

export default async function ProfilePage() {
  const { user, profile } = await getCurrentProfile();

  return (
    <div className="grid gap-6">
      <PageHeader title="Profil" description="Hesap ve rol bilgilerinizi goruntuleyin." />
      <Panel className="max-w-2xl">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded bg-brand-600 text-xl font-bold text-white">
            {initials(profile?.full_name)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ink">{profile?.full_name ?? "SahaPanel kullanicisi"}</h2>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-field p-3">
            <dt className="text-xs font-semibold uppercase text-slate-500">Rol</dt>
            <dd className="mt-1 text-sm text-ink">{profile?.role ? roleLabels[profile.role] : "-"}</dd>
          </div>
          <div className="rounded-md bg-field p-3">
            <dt className="text-xs font-semibold uppercase text-slate-500">Departman</dt>
            <dd className="mt-1 text-sm text-ink">{profile?.departments?.name ?? "-"}</dd>
          </div>
        </dl>
        <form action={signOut} className="mt-6">
          <button className={buttonClass}>Cikis yap</button>
        </form>
      </Panel>
    </div>
  );
}
