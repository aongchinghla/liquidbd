export interface AuthForm {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface AuthModalProps {
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
  authForm: AuthForm;
  authError: string;
  handleAuthInput: (field: keyof AuthForm, value: string) => void;
  handleAuthSubmit: () => void;
  setIsAuthOpen: (open: boolean) => void;
}

export default function AuthModal({
  authMode,
  setAuthMode,
  authForm,
  authError,
  handleAuthInput,
  handleAuthSubmit,
  setIsAuthOpen,
}: AuthModalProps) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-neutral-950 p-6 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">Customer Account</p>
            <h4 className="mt-2 text-2xl font-semibold">
              {authMode === "login" ? "Login" : "Create account"}
            </h4>
          </div>
          <button
            onClick={() => setIsAuthOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 flex rounded-full border border-white/10 bg-white/[0.03] p-1">
          <button
            onClick={() => setAuthMode("login")}
            className={`flex-1 rounded-full px-4 py-2 text-sm transition ${
              authMode === "login" ? "bg-white text-black" : "text-white/70"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setAuthMode("signup")}
            className={`flex-1 rounded-full px-4 py-2 text-sm transition ${
              authMode === "signup" ? "bg-white text-black" : "text-white/70"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {authMode === "signup" && (
            <input
              value={authForm.name}
              onChange={(e) => handleAuthInput("name", e.target.value)}
              placeholder="Full name"
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/35 outline-none"
            />
          )}

          {authMode === "signup" && (
            <input
              value={authForm.phone}
              onChange={(e) => handleAuthInput("phone", e.target.value)}
              placeholder="Phone number"
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/35 outline-none"
            />
          )}

          <input
            value={authForm.email}
            onChange={(e) => handleAuthInput("email", e.target.value)}
            placeholder="Email address"
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/35 outline-none"
          />

          <input
            type="password"
            value={authForm.password}
            onChange={(e) => handleAuthInput("password", e.target.value)}
            placeholder="Password"
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/35 outline-none"
          />

          {authError && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {authError}
            </div>
          )}

          <button
            onClick={handleAuthSubmit}
            className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black"
          >
            {authMode === "login" ? "Login to account" : "Create account"}
          </button>
        </div>
      </div>
    </div>
  );
}
