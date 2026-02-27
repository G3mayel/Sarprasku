import React from "react";
import { Link } from "@inertiajs/react";
import {
    ArrowLeft,
    User,
    IdCard,
    ShieldCheck,
    LogOut,
    MessageCircle,
} from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

import { StudentHeader } from "@/Components/layout/StudentHeader";

import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

function InfoRow({ label, value }) {
    return (
        <div className="space-y-2">
            <Label className="text-xs font-semibold tracking-wide text-slate-900">
                {label}
            </Label>
            <Input
                value={value}
                readOnly
                className="h-10 rounded-xl border-slate-200 bg-slate-50 text-slate-700"
            />
        </div>
    );
}

export default function Index() {
    const profile = {
        name: "Gemayel Abdad Rakadiansyah",
        nisn: "0087776285",
        kelas: "XII RPL",
        noHp: "08xxxxxxxxxx",
        email: "nama@email.com",
        alamat: "Tangerang, Banten",
        role: "Siswa",
    };

    const adminWa = "62812XXXXXXX"; // ganti ke nomor admin beneran (format 62...)

    return (
        <div className="relative min-h-screen bg-[radial-gradient(1200px_700px_at_0%_0%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(900px_700px_at_100%_15%,rgba(147,51,234,0.18),transparent_55%),linear-gradient(to_bottom_right,#f8fafc,#eef2ff,#f1f5f9)]">
            <StudentHeader
                userName={profile.name}
                userId={profile.nisn}
                avatarUrl="/img/avatar-siswa.png"
                logoSrc="/img/logo-siswa.svg"
            />

            <main className="mx-auto max-w-6xl px-4 pb-10 pt-4 sm:px-6 sm:pt-6 md:pt-28">
                <div className="grid items-start gap-6 lg:grid-cols-[0.55fr_1.45fr]">
                    <div className="space-y-5">
                        <Button
                            asChild
                            className="h-9 rounded-lg bg-blue-700 px-4 text-sm font-semibold hover:bg-blue-800"
                        >
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke home page
                            </Link>
                        </Button>

                        <Card className="rounded-[26px] border-white/60 bg-white/80 shadow-[0_18px_45px_rgba(0,0,0,0.10)] backdrop-blur">
                            <div className="px-5 py-4 sm:px-6">
                                <div className="flex items-start gap-4">
                                    <div className="h-14 w-14 overflow-hidden rounded-2xl bg-blue-600/15">
                                        <img
                                            src="/img/avatar-siswa.png"
                                            alt={profile.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="truncate text-base font-extrabold text-slate-900">
                                            {profile.name}
                                        </div>

                                        <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-blue-700 px-2.5 py-1 text-[11px] font-semibold text-white">
                                            <ShieldCheck className="h-3.5 w-3.5" />
                                            {profile.role}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 grid grid-cols-1 gap-3">
                                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
                                            <IdCard className="h-5 w-5 text-slate-900" />
                                        </div>
                                        <div className="leading-tight">
                                            <div className="text-xs text-slate-500">
                                                NISN
                                            </div>
                                            <div className="text-sm font-bold text-slate-900">
                                                {profile.nisn}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
                                            <User className="h-5 w-5 text-slate-900" />
                                        </div>
                                        <div className="leading-tight">
                                            <div className="text-xs text-slate-500">
                                                Kelas
                                            </div>
                                            <div className="text-sm font-bold text-slate-900">
                                                {profile.kelas}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    className="mt-5 h-11 w-full rounded-xl bg-red-600 font-semibold hover:bg-red-700"
                                    onClick={() => {
                                        window.location.href = "/logout";
                                    }}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                        </Card>
                    </div>

                    <Card className="rounded-[26px] border-white/60 bg-white/80 shadow-[0_18px_45px_rgba(0,0,0,0.10)] backdrop-blur">
                        <div className="px-5 py-4 sm:px-6">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100">
                                    <User className="h-6 w-6 text-blue-700" />
                                </div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                                    Informasi Pribadi
                                </h1>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoRow
                                    label="Nama Lengkap"
                                    value={profile.name}
                                />
                                <InfoRow label="NISN" value={profile.nisn} />
                                <InfoRow label="Kelas" value={profile.kelas} />
                                <InfoRow label="No. HP" value={profile.noHp} />
                                <InfoRow label="Email" value={profile.email} />
                                <InfoRow
                                    label="Alamat"
                                    value={profile.alamat}
                                />
                            </div>

                            <div className="mt-6 rounded-2xl border border-slate-200 bg-gray-200/10 p-4">
                                <div className="text-sm font-bold text-slate-900">
                                    Catatan
                                </div>
                                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                    Data pada halaman ini bersifat read-only.
                                    Jika ada kesalahan data atau butuh
                                    perubahan, hubungi Admin Sarpras.
                                </p>

                                <Button
                                    asChild
                                    className="mt-4 h-11 w-full rounded-xl bg-emerald-600 font-semibold hover:bg-emerald-700 sm:w-auto"
                                >
                                    <a
                                        href={`https://wa.me/${adminWa}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <SiWhatsapp
                                            size={18}
                                            color="white"
                                        />
                                        Chat Admin Sarpras
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
