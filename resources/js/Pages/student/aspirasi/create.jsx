import React, { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import {
    ArrowLeft,
    AlertCircle,
    Lightbulb,
    UploadCloud,
    MessageCircle,
} from "lucide-react";
import { StudentHeader } from "@/Components/layout/StudentHeader";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { cn } from "@/lib/utils";

export default function Create() {
    const guide = [
        "Gunakan bahasa yang sopan, jelas, dan mudah dipahami.",
        "Pastikan kategori masalah yang dipilih sesuai dengan aspirasi.",
        "Lokasi harus spesifik agar mudah ditindaklanjuti oleh petugas.",
        "Lampirkan bukti foto jika ada kerusakan fisik untuk mempercepat proses.",
    ];

    return (
        <div className="relative min-h-screen bg-[radial-gradient(1200px_700px_at_0%_0%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(900px_700px_at_100%_15%,rgba(147,51,234,0.18),transparent_55%),linear-gradient(to_bottom_right,#f8fafc,#eef2ff,#f1f5f9)]">
            <StudentHeader
                userName="Gemayel Abdad Rakadiansyah"
                userId="0087776285"
                avatarUrl="/img/avatar-siswa.png"
                logoSrc="/img/logo-siswa.svg"
            />

            <main className="mx-auto max-w-6xl px-6 pb-10 pt-6 md:pt-28">
                <div className="grid items-start gap-6 lg:grid-cols-[1.35fr_0.85fr]">
                    <div className="space-y-5">
                        <Button
                            asChild
                            className="h-9 rounded-lg bg-blue-700 px-4 text-sm font-semibold hover:bg-blue-800"
                        >
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4 hover:animate-arrow-back" />
                                Kembali ke home page
                            </Link>
                        </Button>

                        <Card className="rounded-[26px] border-white/60 bg-white/80 shadow-[0_18px_45px_rgba(0,0,0,0.10)] backdrop-blur">
                            <div className="py-2 px-6 sm:py-4 px-8">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                                        <AlertCircle className="h-6 w-6 text-slate-900" />
                                    </div>
                                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                                        Form Aspirasi
                                    </h1>
                                </div>

                                <form className="space-y-5">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold tracking-wide text-slate-900">
                                            JUDUL ASPIRASI{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input className="h-10 rounded-xl border-slate-200 bg-white" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold tracking-wide text-slate-900">
                                            KATEGORI MASALAH{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Select className="w-full">
                                            <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-white">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="kelas">
                                                    Kelas
                                                </SelectItem>
                                                <SelectItem value="toilet">
                                                    Toilet
                                                </SelectItem>
                                                <SelectItem value="lab">
                                                    Lab
                                                </SelectItem>
                                                <SelectItem value="lainnya">
                                                    Lainnya
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold tracking-wide text-slate-900">
                                            LOKASI SPESIFIK{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input className="h-10 rounded-xl border-slate-200 bg-white" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold tracking-wide text-slate-900">
                                            DESKRIPSI{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Textarea className="min-h-[140px] rounded-xl border-slate-200 bg-white" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold tracking-wide text-slate-900">
                                            BUKTI FOTO
                                        </Label>

                                        <label
                                            className={cn(
                                                "flex min-h-[110px] cursor-pointer items-center justify-center rounded-xl border border-dashed",
                                                "border-blue-500/70 bg-white/40 text-slate-600",
                                                "transition hover:bg-white/60",
                                            )}
                                        >
                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                <UploadCloud className="h-5 w-5 text-blue-600" />
                                                <span>
                                                    Pilih / Tarik & drop foto di
                                                    sini
                                                </span>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-11 rounded-xl border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
                                        >
                                            Clear Form
                                        </Button>

                                        <Button
                                            type="submit"
                                            className="h-11 flex-1 rounded-xl bg-blue-700 font-semibold hover:bg-blue-800"
                                        >
                                            Kirim Aspirasi
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="rounded-[26px] border-white/60 bg-white/80 shadow-[0_18px_45px_rgba(0,0,0,0.10)] backdrop-blur">
                            <div className="py-2 px-6 sm:py-4 px-8">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-100">
                                        <Lightbulb className="h-5 w-5 text-yellow-700" />
                                    </div>
                                    <div className="text-sm font-extrabold text-slate-900">
                                        Panduan Pengisian
                                    </div>
                                </div>

                                <ol className="space-y-3 text-sm text-slate-700">
                                    {guide.map((t, i) => (
                                        <li key={i} className="flex gap-3">
                                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                                                {i + 1}
                                            </div>
                                            <p className="leading-relaxed">
                                                {t}
                                            </p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </Card>

                        <div className="relative overflow-hidden rounded-[26px] bg-emerald-500 shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
                            <div className="relative z-10 p-6">
                                <div className="text-lg font-extrabold text-white">
                                    Butuh bantuan lebih lanjut?
                                </div>
                                <p className="mt-1 text-sm text-emerald-50/90">
                                    Jika bingung atau keadaan darurat, hubungi
                                    Admin Sarpras langsung.
                                </p>

                                <Button
                                    asChild
                                    className="mt-4 h-10 rounded-full bg-white text-emerald-600 font-semibold hover:bg-emerald-50"
                                >
                                    <a
                                        href="https://wa.me/62"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Chat Admin
                                    </a>
                                </Button>
                            </div>

                            <MessageCircle className="pointer-events-none absolute -bottom-6 right-5 h-24 w-24 text-white/25" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
