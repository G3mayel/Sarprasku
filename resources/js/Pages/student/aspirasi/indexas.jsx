import React, { useMemo, useRef } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, UploadCloud } from "lucide-react";

// shadcn (sesuaikan path)
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
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

// logo program (pojok kiri atas)
const logoProgram = "/img/logo-siswa.svg";

// WhatsApp SVG (buat card hijau)
function WhatsAppIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.11 17.44c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.2-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2.01s.86 2.34.98 2.5c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.11.16 1.53.1.47-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28z" />
      <path d="M26.67 5.33A13.24 13.24 0 0 0 16 1.33C8.82 1.33 3 7.15 3 14.33c0 2.29.6 4.52 1.74 6.48L3 30l9.42-1.7a13.2 13.2 0 0 0 3.58.5c7.18 0 13-5.82 13-13a13.1 13.1 0 0 0-3.33-10.47zM16 26.6c-1.18 0-2.33-.18-3.43-.53l-.41-.13-5.59 1.01 1.02-5.45-.17-.44a11.1 11.1 0 0 1-1.28-5.18C6.14 9 10.7 4.44 16.33 4.44c2.96 0 5.74 1.15 7.84 3.25a11 11 0 0 1 3.25 7.84c0 6.13-4.99 11.07-11.42 11.07z" />
    </svg>
  );
}

export default function CreateAspirasi() {
  const { props } = usePage();

  // data siswa (sesuaikan dengan props backend kamu)
  const user = props?.auth?.user ?? {
    name: "Gemayel Abdad Rakadiansyah",
    nisn: "00877762875",
    avatar_url: null,
  };

  const fileRef = useRef(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    judul: "",
    kategori: "",
    lokasi: "",
    deskripsi: "",
    foto: null,
  });

  const submitUrl = useMemo(() => {
    if (typeof route === "function") return route("aspirasi.store");
    return "/aspirasi";
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    post(submitUrl, {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  const onClear = () => {
    reset();
    if (fileRef.current) fileRef.current.value = "";
  };

  const fotoName = data.foto?.name ?? "";

  return (
    <>
      <Head title="Form Aspirasi" />

      <div className="relative min-h-screen overflow-hidden">
        {/* Background mirip mockup: putih + ungu lembut */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100" />
        <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-0 h-[620px] w-[620px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-32 bottom-[-260px] h-[620px] w-[620px] rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-8">
          {/* Top row: logo kiri + tombol back, user card kanan */}
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Logo program pojok kiri atas */}
              <div className="hidden sm:flex items-center gap-3">
                <img src={logoProgram} alt="Logo Program" className="h-10 w-auto" />
              </div>

              {/* Back button */}
              <Button
                asChild
                className="rounded-full bg-blue-600 px-5 py-5 text-sm font-semibold hover:bg-blue-700"
              >
                <Link href={typeof route === "function" ? route("home") : "/"}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke home page
                </Link>
              </Button>
            </div>

            {/* User badge kanan atas */}
            <div className="hidden md:flex items-center gap-3 rounded-2xl bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
              <div className="h-10 w-10 overflow-hidden rounded-xl bg-slate-200">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.name} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                <div className="text-xs text-slate-600">{user.nisn}</div>
              </div>
            </div>
          </div>

          {/* Main grid: kiri form, kanan preview + wa */}
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-start">
            {/* LEFT: Form Card */}
            <Card className="rounded-3xl border-0 bg-white shadow-[0_28px_90px_rgba(0,0,0,0.12)]">
              <CardContent className="p-8">
                <h1 className="text-3xl font-extrabold text-slate-900">Form Aspirasi</h1>

                <form onSubmit={onSubmit} className="mt-6 space-y-6">
                  {/* Judul */}
                  <div className="space-y-2">
                    <Label className="font-extrabold tracking-wide text-slate-900">
                      JUDUL ASPIRASI <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={data.judul}
                      onChange={(e) => setData("judul", e.target.value)}
                      className="h-12 rounded-xl bg-slate-200/70 border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                    {errors.judul ? <p className="text-sm text-red-600">{errors.judul}</p> : null}
                  </div>

                  {/* Kategori */}
                  <div className="space-y-2">
                    <Label className="font-extrabold tracking-wide text-slate-900">
                      KATEGORI MASALAH <span className="text-red-500">*</span>
                    </Label>

                    <Select value={data.kategori} onValueChange={(v) => setData("kategori", v)}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-200/70 border-0 px-4 text-[15px] focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>

                      <SelectContent className="w-[var(--radix-select-trigger-width)]">
                        <SelectItem value="kelas">Kelas</SelectItem>
                        <SelectItem value="toilet">Toilet</SelectItem>
                        <SelectItem value="lab">Lab</SelectItem>
                        <SelectItem value="lapangan">Lapangan</SelectItem>
                        <SelectItem value="listrik">Listrik</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>

                    {errors.kategori ? <p className="text-sm text-red-600">{errors.kategori}</p> : null}
                  </div>

                  {/* Lokasi */}
                  <div className="space-y-2">
                    <Label className="font-extrabold tracking-wide text-slate-900">
                      LOKASI SPESIFIK <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={data.lokasi}
                      onChange={(e) => setData("lokasi", e.target.value)}
                      className="h-12 rounded-xl bg-slate-200/70 border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                    {errors.lokasi ? <p className="text-sm text-red-600">{errors.lokasi}</p> : null}
                  </div>

                  {/* Deskripsi */}
                  <div className="space-y-2">
                    <Label className="font-extrabold tracking-wide text-slate-900">
                      DESKRIPSI <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      value={data.deskripsi}
                      onChange={(e) => setData("deskripsi", e.target.value)}
                      className="min-h-[150px] rounded-xl bg-slate-200/70 border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                    {errors.deskripsi ? <p className="text-sm text-red-600">{errors.deskripsi}</p> : null}
                  </div>

                  {/* Bukti Foto */}
                  <div className="space-y-2">
                    <Label className="font-extrabold tracking-wide text-slate-900">
                      BUKTI FOTO
                    </Label>

                    <div
                      className="relative flex min-h-[120px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-blue-500/70 bg-white"
                      onClick={() => fileRef.current?.click()}
                      role="button"
                      tabIndex={0}
                    >
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setData("foto", e.target.files?.[0] ?? null)}
                      />

                      <div className="text-center">
                        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10">
                          <UploadCloud className="h-5 w-5 text-blue-700" />
                        </div>
                        <p className="text-sm font-semibold text-slate-700">
                          {fotoName ? `File: ${fotoName}` : "Klik untuk upload foto"}
                        </p>
                        <p className="text-xs text-slate-500">PNG/JPG (sesuai limit server)</p>
                      </div>
                    </div>

                    {errors.foto ? <p className="text-sm text-red-600">{errors.foto}</p> : null}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-4 pt-2">
                    <Button
                      type="button"
                      onClick={onClear}
                      variant="outline"
                      className="h-12 w-[150px] rounded-xl border-2 border-red-500 text-red-600 hover:bg-red-50"
                      disabled={processing}
                    >
                      Clear Form
                    </Button>

                    <Button
                      type="submit"
                      className="h-12 flex-1 rounded-xl bg-blue-600 hover:bg-blue-700"
                      disabled={processing}
                    >
                      {processing ? "Mengirim..." : "Kirim Aspirasi"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* RIGHT: Preview + WhatsApp */}
            <div className="space-y-7">
              {/* Deskripsi card */}
              <Card className="rounded-3xl border-0 bg-white shadow-[0_28px_90px_rgba(0,0,0,0.12)]">
                <CardContent className="flex h-[300px] items-center justify-center p-10">
                  <div className="text-center">
                    <p className="text-sm font-extrabold text-slate-900">DESKRIPSI</p>
                    <p className="mt-4 max-w-[34ch] text-sm text-slate-600">
                      {data.deskripsi?.trim()
                        ? data.deskripsi
                        : "Isi deskripsi akan muncul di sini untuk membantu memastikan laporan kamu sudah jelas."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp help card */}
              <div className="relative overflow-hidden rounded-3xl bg-emerald-500 p-7 shadow-[0_28px_90px_rgba(0,0,0,0.12)]">
                {/* icon besar kiri bawah */}
                <div className="absolute -left-6 -bottom-10">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/25">
                    <WhatsAppIcon className="h-14 w-14 text-white" />
                  </div>
                </div>

                <div className="relative pl-24">
                  <p className="text-lg font-extrabold text-white">
                    BUTUH BANTUAN LEBIH LANJUT?
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/90">Hubungi:</p>

                  <Button
                    asChild
                    className="mt-4 rounded-xl bg-white text-emerald-700 hover:bg-white/90"
                  >
                    <a href="https://wa.me/628xxxxxxxxxx" target="_blank" rel="noreferrer">
                      <WhatsAppIcon className="mr-2 h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            {/* end right */}
          </div>
        </div>
      </div>
    </>
  );
}
