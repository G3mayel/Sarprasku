import React from "react";
import { Link } from "@inertiajs/react";
import {
  ArrowLeft,
  History,
  Search,
  SlidersHorizontal,
  ClipboardList,
  Tag,
  MapPin,
  Image as ImageIcon,
  Hourglass,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import { StudentHeader } from "@/Components/layout/StudentHeader";

import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

const DATA = [
  {
    id: "ID-#SPK-2026-0102",
    title: "Kursi Rusak",
    category: "Furnitur Sekolah",
    location: "Lab A RPL",
    date: "30 Januari 2026",
    time: "08:56 WIB",
    status: "diterima",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nunc suscipit magna interdum eu.",
    note: "Laporan anda telah diterima oleh sistem dan sedang menunggu respon dari pihak sekolah",
    hasPhoto: true,
    photoUrl: "/img/sample-bukti-1.jpg",
  },
  {
    id: "ID-#SPK-2026-0103",
    title: "Monitor Rusak",
    category: "Furnitur Sekolah",
    location: "Lab A",
    date: "30 Januari 2026",
    time: "09:12 WIB",
    status: "selesai",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    note: "Laporan telah selesai ditangani.",
    hasPhoto: true,
    photoUrl: "/img/sample-bukti-2.jpg",
  },
  {
    id: "ID-#SPK-2026-0104",
    title: "AC Tidak Dingin",
    category: "Furnitur Sekolah",
    location: "Lab A",
    date: "30 Januari 2026",
    time: "10:01 WIB",
    status: "ditolak",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    note: "Laporan ditolak. Silakan lengkapi detail lokasi dan bukti tambahan.",
    hasPhoto: false,
    photoUrl: null,
  },
  {
    id: "ID-#SPK-2026-0105",
    title: "Lapangan Berlumpur",
    category: "Furnitur Sekolah",
    location: "Lapangan Utama",
    date: "30 Januari 2026",
    time: "10:30 WIB",
    status: "proses",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    note: "Laporan sedang dikerjakan oleh petugas.",
    hasPhoto: true,
    photoUrl: "/img/sample-bukti-3.jpg",
  },
];

function statusConfig(status) {
  switch (status) {
    case "selesai":
      return {
        label: "Selesai",
        className: "bg-emerald-100 text-emerald-700",
        icon: CheckCircle2,
      };
    case "ditolak":
      return {
        label: "Ditolak",
        className: "bg-red-100 text-red-700",
        icon: XCircle,
      };
    case "proses":
      return {
        label: "Dikerjakan",
        className: "bg-blue-100 text-blue-700",
        icon: Clock3,
      };
    default:
      return {
        label: "Terkirim",
        className: "bg-amber-100 text-amber-700",
        icon: Clock3,
      };
  }
}

function getTimelineState(status) {
  if (status === "selesai") return 2;
  if (status === "proses") return 1;
  return 0;
}


export default function Index() {
  const [selectedId, setSelectedId] = React.useState(DATA[0]?.id ?? null);
  const [query, setQuery] = React.useState("");
  const [filterStatuses, setFilterStatuses] = React.useState([]);
  const [sortBy, setSortBy] = React.useState("latest");

  const toggleStatusFilter = (value) => {
    setFilterStatuses((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const items = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = DATA.filter((item) => {
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q);

      const matchesStatus =
        filterStatuses.length === 0 ? true : filterStatuses.includes(item.status);

      return matchesQuery && matchesStatus;
    });

    if (sortBy === "oldest") {
      result = [...result].reverse();
    } else if (sortBy === "title-asc") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "title-desc") {
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [query, filterStatuses, sortBy]);

  React.useEffect(() => {
    if (!items.length) return;
    if (!items.some((i) => i.id === selectedId)) {
      setSelectedId(items[0].id);
    }
  }, [items, selectedId]);

  const selected = items.find((i) => i.id === selectedId) || items[0] || null;
  const timelineStep = selected ? getTimelineState(selected.status) : 0;

  return (
    <div className="relative min-h-screen bg-[radial-gradient(1200px_700px_at_0%_0%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(900px_700px_at_100%_15%,rgba(147,51,234,0.18),transparent_55%),linear-gradient(to_bottom_right,#f8fafc,#eef2ff,#f1f5f9)]">
      <StudentHeader
        userName="Gemayel Abdad Rakadiansyah"
        userId="0087776285"
        avatarUrl="/img/avatar-siswa.png"
        logoSrc="/img/logo-siswa.svg"
      />

      <main className="mx-auto max-w-6xl px-4 pb-10 pt-4 sm:px-6 sm:pt-6 md:pt-28">
        <div className="grid items-start gap-6 lg:grid-cols-[1.35fr_0.85fr]">
          <div className="space-y-5">
            <Button
              asChild
              className="h-9 rounded-full bg-blue-700 px-4 text-sm font-semibold hover:bg-blue-800"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke home page
              </Link>
            </Button>

            <Card className="rounded-[26px] border-white/60 bg-white/80 shadow-[0_18px_45px_rgba(0,0,0,0.10)] backdrop-blur">
              <div className="p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
                    <History className="h-5 w-5 text-slate-900" />
                  </div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    Riwayat Aspirasi
                  </h1>
                </div>

                <div className="mb-4 flex gap-2">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Cari aspirasi..."
                      className="h-10 rounded-xl border-slate-200 bg-white pl-9"
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        className="h-10 rounded-xl bg-blue-700 px-3 text-white hover:bg-blue-800"
                      >
                        <SlidersHorizontal className="mr-1.5 h-4 w-4" />
                        Filter
                        {filterStatuses.length > 0 && (
                          <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">
                            {filterStatuses.length}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
  align="end"
  sideOffset={8}
  className="w-[420px] rounded-xl p-2"
>
  <div className="grid grid-cols-2 divide-x divide-slate-200">
    <div className="pr-2">
      <DropdownMenuLabel className="text-xs text-slate-500">
        Status
      </DropdownMenuLabel>

      <DropdownMenuCheckboxItem
        checked={filterStatuses.includes("diterima")}
        onSelect={(e) => e.preventDefault()}
        onCheckedChange={() => toggleStatusFilter("diterima")}
      >
        Terkirim / Diterima
      </DropdownMenuCheckboxItem>

      <DropdownMenuCheckboxItem
        checked={filterStatuses.includes("proses")}
        onSelect={(e) => e.preventDefault()}
        onCheckedChange={() => toggleStatusFilter("proses")}
      >
        Sedang Dikerjakan
      </DropdownMenuCheckboxItem>

      <DropdownMenuCheckboxItem
        checked={filterStatuses.includes("selesai")}
        onSelect={(e) => e.preventDefault()}
        onCheckedChange={() => toggleStatusFilter("selesai")}
      >
        Selesai
      </DropdownMenuCheckboxItem>

      <DropdownMenuCheckboxItem
        checked={filterStatuses.includes("ditolak")}
        onSelect={(e) => e.preventDefault()}
        onCheckedChange={() => toggleStatusFilter("ditolak")}
      >
        Ditolak
      </DropdownMenuCheckboxItem>
    </div>

    <div className="pl-2">
      <DropdownMenuLabel className="text-xs text-slate-500">
        Urutkan
      </DropdownMenuLabel>

      <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
        <DropdownMenuRadioItem value="latest">Terbaru</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="oldest">Terlama</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="title-asc">Judul A-Z</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="title-desc">Judul Z-A</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </div>
  </div>

  <DropdownMenuSeparator />

  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setFilterStatuses([]);
      setSortBy("latest");
    }}
    className="w-full rounded-md px-2 py-1.5 text-left text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
  >
    Reset filter
  </button>
</DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  {items.map((item) => {
                    const cfg = statusConfig(item.status);
                    const StatusIcon = cfg.icon;
                    const isActive = item.id === selected?.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={cn(
                          "w-full rounded-2xl border bg-white/70 p-4 text-left transition",
                          "hover:border-blue-300 hover:bg-white",
                          isActive
                            ? "border-blue-600 shadow-[0_0_0_1px_rgba(37,99,235,0.25)]"
                            : "border-slate-200"
                        )}
                      >
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate text-lg font-bold text-slate-900">
                              {item.title}
                            </div>

                            <div className="mt-1 space-y-1 text-xs text-slate-600">
                              <div className="flex items-center gap-1.5">
                                <Tag className="h-3.5 w-3.5" />
                                <span>{item.category}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{item.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[10px] text-slate-600">
                            {item.date}
                          </div>
                        </div>

                        <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
                          {item.description}
                        </p>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="truncate text-[10px] text-slate-500">{item.id}</div>

                          <div
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold",
                              cfg.className
                            )}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {cfg.label}
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {items.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-8 text-center text-sm text-slate-500">
                      Tidak ada data yang cocok.
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-[26px] border-white/60 bg-white/80 shadow-[0_18px_45px_rgba(0,0,0,0.10)] backdrop-blur">
              <div className="p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2.5">
                  <ClipboardList className="h-5 w-5 text-slate-900" />
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Informasi Aspirasi
                  </h2>
                </div>

                {selected ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-1 text-xs text-slate-500">Judul Aspirasi</div>
                        <div className="text-lg font-bold leading-tight text-slate-900">
                          {selected.title}
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 text-xs text-slate-500">Kategori Masalah</div>
                        <div className="text-lg font-bold leading-tight text-slate-900">
                          {selected.category}
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 text-xs text-slate-500">Lokasi</div>
                        <div className="text-lg font-bold leading-tight text-slate-900">
                          {selected.location}
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 text-xs text-slate-500">Deskripsi</div>
                        <p className="text-sm leading-relaxed text-slate-700">
                          {selected.description}
                        </p>
                      </div>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          type="button"
                          className="mt-5 h-10 w-full rounded-xl bg-blue-700 font-semibold hover:bg-blue-800"
                          disabled={!selected.hasPhoto}
                        >
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Bukti Foto
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="max-w-2xl rounded-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Bukti Foto</AlertDialogTitle>
                          <AlertDialogDescription>
                            {selected.title} • {selected.location}
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                          {selected.photoUrl ? (
                            <img
                              src={selected.photoUrl}
                              alt={`Bukti foto ${selected.title}`}
                              className="max-h-[60vh] w-full object-contain"
                            />
                          ) : (
                            <div className="grid h-64 place-items-center text-sm text-slate-500">
                              Foto tidak tersedia.
                            </div>
                          )}
                        </div>

                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">
                            Tutup
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-white/50 p-6 text-sm text-slate-500">
                    Pilih data aspirasi untuk melihat detail.
                  </div>
                )}
              </div>
            </Card>

            <Card className="rounded-[26px] border-white/60 bg-white/80 shadow-[0_18px_45px_rgba(0,0,0,0.10)] backdrop-blur">
              <div className="p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-2.5">
                  <Hourglass className="h-5 w-5 text-slate-900" />
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Timeline Laporan
                  </h2>
                </div>

                {selected ? (
                  <div className="relative pl-8">
                    <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-blue-200" />

                    {[
                      {
                        title: "Laporan Diterima",
                        desc: selected.note,
                        time: `${selected.date}, ${selected.time}`,
                      },
                      { title: "Sedang Dikerjakan" },
                      { title: "Selesai" },
                    ].map((step, i) => {
                      const isDone = i < timelineStep;
                      const isCurrent = i === timelineStep;
                      const isFuture = i > timelineStep;

                      return (
                        <div key={step.title} className={cn(i !== 2 && "mb-8")}>
                          <div className="relative">
                            <div
                              className={cn(
                                "absolute -left-8 top-1 h-6 w-6 rounded-full border-[3px]",
                                isCurrent && "border-blue-600 bg-white",
                                isDone && "border-blue-600 bg-blue-600",
                                isFuture && "border-blue-300 bg-white"
                              )}
                            >
                              {isDone && (
                                <CheckCircle2 className="h-full w-full text-white" />
                              )}
                            </div>

                            <div
                              className={cn(
                                "text-lg font-bold",
                                isCurrent && "text-blue-700",
                                isDone && "text-blue-700",
                                isFuture && "text-slate-400"
                              )}
                            >
                              {step.title}
                            </div>

                            {isCurrent && step.time && (
                              <div className="mt-1 text-xs text-slate-500">
                                {step.time}
                              </div>
                            )}

                            {isCurrent && step.desc && (
                              <div className="mt-2 max-w-[260px] rounded-md bg-slate-100 px-2 py-1 text-[10px] leading-snug text-slate-600">
                                {step.desc}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-white/50 p-6 text-sm text-slate-500">
                    Tidak ada timeline untuk ditampilkan.
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
