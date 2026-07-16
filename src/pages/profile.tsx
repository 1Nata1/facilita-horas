import avatarPadrao from "@/pages/avatar.png";
import { ArrowLeft, Camera, LogOut, Settings, Mail, Phone, BookOpen, School, User as UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function Profile() {
  const [, setLocation] = useLocation();

  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("facilita-user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedImage = localStorage.getItem("profile-image");
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("facilita-user");
    localStorage.removeItem("profile-image");
    window.location.href = "/login";
  };

  if (!user) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setProfileImage(base64);
      localStorage.setItem("profile-image", base64);
    };
    reader.readAsDataURL(file);
  };

  const initials = user.username
    ? user.username
        .split(" ")
        .map((n: string) => n[0])
        .join("")
    : "U";

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/")} className="mr-1">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">
          {user.role === "teacher" ? "Perfil do Professor" : "Perfil do Aluno"}
        </h1>
      </div>

      {/* Card de perfil com foto */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-24" />
        <CardContent className="p-0 relative">
          <div className="flex flex-col items-center text-center -mt-12 px-6 pb-6">
            <div className="relative">
              <img
                src={profileImage || avatarPadrao}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />
              <label className="absolute -bottom-1 -right-1 cursor-pointer">
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                <Button size="sm" className="rounded-full w-8 h-8 p-0 bg-blue-500 hover:bg-blue-600 shadow-md" asChild>
                  <span><Camera size={14} /></span>
                </Button>
              </label>
            </div>

            <h3 className="text-xl font-bold mt-3">{user.username}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-0.5">
              <School size={14} />
              <span>UTFPR</span>
            </div>
            {user.role === "student" ? (
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <BookOpen size={14} />
                <span>{user.course}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <UserIcon size={14} />
                <span>Professor</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Informações da Conta */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Informações da Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <UserIcon size={18} className="text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Nome</p>
              <p className="text-sm font-medium">{user.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <Mail size={18} className="text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <Phone size={18} className="text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Telefone</p>
              <p className="text-sm font-medium">{user.phone || "Não informado"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Acadêmicas */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            {user.role === "student" ? "Informações Acadêmicas" : "Informações Profissionais"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <BookOpen size={18} className="text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">{user.role === "student" ? "Curso" : "Função"}</p>
              <p className="text-sm font-medium">
                {user.role === "student" ? user.course : "Professor"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <School size={18} className="text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Instituição</p>
              <p className="text-sm font-medium">UTFPR</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <Card
        className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200"
        onClick={() => setLocation("/profileSettings")}
      >
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Settings size={20} className="text-accent-foreground" />
          </div>
          <span className="font-medium">Configurações</span>
        </CardContent>
      </Card>

      <Card
        className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200"
        onClick={handleLogout}
      >
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center">
            <LogOut size={20} className="text-red-500" />
          </div>
          <span className="font-medium text-red-500">Sair da conta</span>
        </CardContent>
      </Card>
    </main>
  );
}
