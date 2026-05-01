import { Pentagon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Alert } from "../../components/ui/Alert";
import type { LoginCredentials } from "../../types/auth";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const Login = () => {
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await login(data);
      // Navigation is handled by auth protection logic or by calling navigate('/') here.
      // Since useAuthStore updates state, the app will likely re-render and navigate based on isAuthenticated.
      // If we need explicit navigation:
      // window.location.href = '/';
      navigate("/");
    } catch (err) {
      // Error is stored in authStore
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-6 md:p-12 font-body">
      {/* Narrative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-surface-container blur-[120px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-primary-container/20 blur-[100px]"></div>
      </div>

      {/* Login Shell */}
      <main className="relative w-full max-w-5xl grid md:grid-cols-12 bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(47,52,48,0.06)]">
        {/* Left Side: Editorial Art */}
        <div className="hidden md:flex md:col-span-6 relative items-center justify-center bg-surface-container overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Artisan ceramic vase"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuANKVSqI7guvaMpOJAMriRsYzjw5nsmr4gnb4Zijoj-cQhAFJ2v3QYK6Phe_aOUxFjO7OBuw8cx6wb4oVP9YHtpRzJLJ99eIijSUPKgWzXgWx7bgGdetGFwAeVSWMwOYkZx_ecYkSF_Y5wrOUORKGFzEz6XciDzRk9m8kTZeQum3nZz6TdMiuWzGu_WYYoXsAuzkpRpWS40nvvKyocBIPkzTIgDRWC1n1D7K7ggecHLO625fLJWmu306WgLheI0J_ZWNnbMpvHsJdk"
            />
            <div className="absolute inset-0 bg-primary-dim/10 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 p-12 text-center">
            <h2 className="font-display text-4xl italic text-on-surface mb-4 leading-tight">
              Terra Form Studio
            </h2>
            <div className="w-12 h-px bg-primary/40 mx-auto mb-4"></div>
            <p className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">
              The Curator's Entry
            </p>
          </div>
        </div>

        {/* Right Side: Interaction Canvas */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative">
          <div className="mb-12">
            <h1 className="font-display text-3xl text-on-background font-bold tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-on-surface-variant text-sm">
              Access the administrative gallery console.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Top Banner Error Display */}
            {error && (
              <Alert variant="error" className="mb-6">
                {error}
              </Alert>
            )}

            {/* Input Group: Email */}
            <Input
              label="Email Address"
              placeholder="curator@terraform.com"
              type="email"
              error={errors.email?.message}
              {...register("email")}
              onChange={(e) => {
                if (error) clearError();
                register("email").onChange(e);
              }}
            />

            {/* Input Group: Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="block font-label text-[11px] tracking-wider uppercase text-on-surface-variant">
                  Password
                </label>
                <a
                  className="text-[11px] font-label uppercase tracking-widest text-primary hover:text-primary-dim transition-colors"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot?
                </a>
              </div>
              <Input
                placeholder="••••••••"
                type="password"
                error={errors.password?.message}
                {...register("password")}
                onChange={(e) => {
                  if (error) clearError();
                  register("password").onChange(e);
                }}
              />
            </div>

            {/* Action Group */}
            <div className="pt-4 flex flex-col space-y-6">
              <Button type="submit" isLoading={isLoading} className="w-full">
                Sign In
              </Button>

              <div className="flex items-center justify-center space-x-4">
                <span className="h-px grow bg-outline-variant/10"></span>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/40">
                  Studio Verification
                </span>
                <span className="h-px grow bg-outline-variant/10"></span>
              </div>

              <p className="text-center text-[12px] text-on-surface-variant/60 leading-relaxed">
                Access to this console is restricted to authorized studio
                personnel. All interactions are logged.
              </p>
            </div>
          </form>

          {/* Decorative Studio Mark */}
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 opacity-10">
            <Pentagon className="w-16 h-16" />
          </div>
        </div>
      </main>

      {/* Global Footer Branding */}
      <footer className="fixed bottom-8 left-0 w-full text-center pointer-events-none">
        <p className="font-label text-[10px] tracking-[0.3em] uppercase text-on-surface-variant/30">
          Terra Form Studio © 2026
        </p>
      </footer>
    </div>
  );
};
