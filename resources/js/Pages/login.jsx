import React from "react";
import { Link, useForm } from "@inertiajs/react";

import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { cn } from "@/lib/utils";

const LOGO = "/img/logo-siswa.svg";

// Kalau backend kamu beda endpoint, ubah di sini aja
const LOGIN_URL = {
  siswa: "/login",
  admin: "/admin/login",
};

export default function Login() {
  const [role, setRole] = React.useState("siswa");

  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    nisn: "",
    username: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    post(LOGIN_URL[role], {
      preserveScroll: true,
      transform: () =>
        role === "siswa"
          ? { nisn: data.nisn, password: data.password }
          : { username: data.username, password: data.password },
      onFinish: () => reset("password"),
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_700px_at_0%_0%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(900px_700px_at_100%_15%,rgba(147,51,234,0.18),transparent_55%),linear-gradient(to_bottom_right,#f8fafc,#eef2ff,#f1f5f9)]">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <img src={LOGO} alt="SarprasKu" className="h-10 w-auto" />
              <div className="leading-tight">
                <div className="text-2xl font-extrabold tracking-tight text-blue-700">
                  SarprasKu
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Portal Login
                </div>
              </div>
            </div>
          </div>

          <Card className="rounded-[26px] border-white/60 bg-white/80 shadow-[0_18px_45px_rgba(0,0,0,0.10)] backdrop-blur">
            <div className="p-6 sm:p-8">
              <div className="mb-5">
                <div className="text-xl font-extrabold text-slate-900">Masuk</div>
                <div className="mt-1 text-sm text-slate-600">
                  Pilih mode login sesuai akun kamu.
                </div>
              </div>

              <Tabs
                value={role}
                onValueChange={(v) => {
                  setRole(v);
                  clearErrors();
                }}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 rounded-xl">
                  <TabsTrigger value="siswa" className="rounded-lg">
                    Siswa
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="rounded-lg">
                    Admin
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={onSubmit} className="mt-5 space-y-4">
                  <TabsContent value="siswa" className="m-0 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold tracking-wide text-slate-900">
                        NISN
                      </Label>
                      <Input
                        value={data.nisn}
                        onChange={(e) => setData("nisn", e.target.value)}
                        placeholder="Masukkan NISN"
                        className={cn(
                          "h-10 rounded-xl border-slate-200 bg-white",
                          errors.nisn && "border-red-400 focus-visible:ring-red-200"
                        )}
                        inputMode="numeric"
                      />
                      {errors.nisn && (
                        <p className="text-xs font-medium text-red-600">{errors.nisn}</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="admin" className="m-0 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold tracking-wide text-slate-900">
                        Username
                      </Label>
                      <Input
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        placeholder="Masukkan username"
                        className={cn(
                          "h-10 rounded-xl border-slate-200 bg-white",
                          errors.username && "border-red-400 focus-visible:ring-red-200"
                        )}
                        autoCapitalize="none"
                      />
                      {errors.username && (
                        <p className="text-xs font-medium text-red-600">{errors.username}</p>
                      )}
                    </div>
                  </TabsContent>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold tracking-wide text-slate-900">
                      Password
                    </Label>
                    <Input
                      type="password"
                      value={data.password}
                      onChange={(e) => setData("password", e.target.value)}
                      placeholder="Masukkan password"
                      className={cn(
                        "h-10 rounded-xl border-slate-200 bg-white",
                        errors.password && "border-red-400 focus-visible:ring-red-200"
                      )}
                    />
                    {errors.password && (
                      <p className="text-xs font-medium text-red-600">{errors.password}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="h-11 w-full rounded-xl bg-blue-700 font-semibold hover:bg-blue-800"
                    disabled={processing}
                  >
                    {processing ? "Memproses..." : role === "siswa" ? "Masuk sebagai Siswa" : "Masuk sebagai Admin"}
                  </Button>

                  <div className="pt-1 text-center text-xs text-slate-500">
                    Kembali ke{" "}
                    <Link href="/" className="font-semibold text-blue-700 hover:text-blue-800">
                      Home
                    </Link>
                  </div>
                </form>
              </Tabs>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
