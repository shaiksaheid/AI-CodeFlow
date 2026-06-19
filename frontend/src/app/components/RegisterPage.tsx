import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Cpu } from "lucide-react";

interface Props {
  onRegister: () => void;
  onGoLogin: () => void;
  dark: boolean;
}

export function RegisterPage({ onRegister, onGoLogin, dark }: Props) {
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "", confirm: "" });


  const [message, setMessage] =useState("");
  const [messageColor, setMessageColor] =useState("");

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  if (
    form.password !==
    form.confirm
  ) {

    setMessage(
  "Passwords do not match"
);

setMessageColor(
  "#EF4444"
);

    return;
  }

  try {

    await axios.post(
      "https://ai-codeflow-backend.onrender.com/auth/register",
      {
        username:
          form.username,
        email:
          form.email,
        password:
          form.password
      }
    );

    setMessage(
  "Registration Successful"
);

setMessageColor(
  "#22C55E"
);

    onGoLogin();

  } catch (error: any) {

    setMessage(
  error?.response?.data?.detail ||
  "Registration Failed"
);

setMessageColor(
  "#EF4444"
);

  }
};

  const fields = [
    { key: "username", label: "Username", type: "text", placeholder: "johndoe123" },
    { key: "email", label: "Email Address", type: "email", placeholder: "john@university.edu" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6"
      style={{ fontFamily: "Poppins, sans-serif", background: dark ? "#0a0f2e" : "#F6F7FB" }}>
      <div className="w-full max-w-md">
        <div className="rounded-2xl p-8 shadow-2xl"
          style={{ background: dark ? "rgba(255,255,255,0.05)" : "white", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E5E7EB" }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#6C4DFF" }}>
              <Cpu size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg" style={{ color: dark ? "white" : "#1E293B" }}>AI CodeFlow</span>
          </div>
          <h2 className="font-bold mb-1" style={{ color: dark ? "white" : "#1E293B", fontSize: "1.5rem" }}>Create account</h2>
          <p className="text-sm mb-6" style={{ color: dark ? "rgba(255,255,255,0.5)" : "#64748B" }}>Join thousands of students learning with AI</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: dark ? "rgba(255,255,255,0.8)" : "#374151" }}>{f.label}</label>
                <input type={f.type} value={(form as any)[f.key]} onChange={set(f.key)}
                  placeholder={f.placeholder} required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: dark ? "rgba(255,255,255,0.08)" : "#F6F7FB", border: `1.5px solid ${dark ? "rgba(255,255,255,0.1)" : "#E5E7EB"}`, color: dark ? "white" : "#1E293B" }}
                  onFocus={e => e.target.style.borderColor = "#6C4DFF"}
                  onBlur={e => e.target.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "#E5E7EB"} />
              </div>
            ))}
            {["password", "confirm"].map((key, i) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: dark ? "rgba(255,255,255,0.8)" : "#374151" }}>
                  {i === 0 ? "Password" : "Confirm Password"}
                </label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} value={(form as any)[key]} onChange={set(key)}
                    placeholder="••••••••" required
                    className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all"
                    style={{ background: dark ? "rgba(255,255,255,0.08)" : "#F6F7FB", border: `1.5px solid ${dark ? "rgba(255,255,255,0.1)" : "#E5E7EB"}`, color: dark ? "white" : "#1E293B" }}
                    onFocus={e => e.target.style.borderColor = "#6C4DFF"}
                    onBlur={e => e.target.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "#E5E7EB"} />
                  {i === 0 && (
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: dark ? "rgba(255,255,255,0.4)" : "#9CA3AF" }}>
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {message && (
  <div
    className="text-sm font-medium text-center"
    style={{
      color: messageColor
    }}
  >
    {message}
  </div>
)}
            <button type="submit" className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #6C4DFF, #8B5CF6)" }}>
              Create Account
            </button>
            <div className="flex justify-center mt-2">
  <GoogleLogin
    onSuccess={async (
      credentialResponse
    ) => {

      try {

        const response =
          await axios.post(
            "https://ai-codeflow-backend.onrender.com/google/login",
            {
              token:
                credentialResponse.credential
            }
          );

        localStorage.setItem(
          "token",
          response.data.access_token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

        onRegister();

      } catch (error) {

        console.error(error);

        alert(
          "Google Login Failed"
        );

      }

    }}

    onError={() => {

      alert(
        "Google Login Failed"
      );

    }}
  />
</div>
          </form>
          <p className="text-center text-sm mt-6" style={{ color: dark ? "rgba(255,255,255,0.5)" : "#64748B" }}>
            Already have an account?{" "}
            <button onClick={onGoLogin} className="font-semibold" style={{ color: "#6C4DFF" }}>Login</button>
          </p>
        </div>
      </div>
    </div>
  );
}
