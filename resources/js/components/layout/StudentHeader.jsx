import React from "react";
import { cn } from "@/lib/utils";

export function StudentHeader({
  userName = "Nama Siswa",
  userId = "NISN",
  avatarUrl,
  logoSrc = "/img/logo-siswa.svg",
  className,
}) {
  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "S";

  return (
    // Desktop floating header (md+)
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 hidden md:block",
        className
      )}
    >
      <div className="mx-auto flex max-w-6xl items-start justify-between px-6 pt-6">
        <div className="pointer-events-auto flex items-center py-2">
          <img src={logoSrc} alt="Logo SarprasKu Siswa" className="h-12 w-auto" />
        </div>

        <div className="pointer-events-auto flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">{userName}</div>
            <div className="text-xs text-slate-600">{userId}</div>
          </div>

          <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-blue-600/20">
            {avatarUrl ? (
              <img src={avatarUrl} alt={userName} className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs font-semibold text-slate-700">{initials}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
