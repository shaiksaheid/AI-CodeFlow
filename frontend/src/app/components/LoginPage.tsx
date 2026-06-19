import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Code2, GitBranch, Cpu, Zap } from "lucide-react";


interface Props {
  onLogin: () => void;
  onGoRegister: () => void;
  dark: boolean;
}

export function LoginPage({ onLogin, onGoRegister, dark }: Props) {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);


  const [message, setMessage] =useState("");
  const [messageColor, setMessageColor] =useState("");
  const [isRegister, setIsRegister] =useState(false);



  const [registerName, setRegisterName] =
  useState("");

const [registerUsername, setRegisterUsername] =
  useState("");

const [registerEmail, setRegisterEmail] =
  useState("");

const [registerPassword, setRegisterPassword] =
  useState("");

const [registerConfirmPassword,
  setRegisterConfirmPassword] =
  useState("");



  const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  try {

    const response =
      await axios.post(
        "https://ai-codeflow-backend.onrender.com/auth/login",
        {
          email,
          password
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

    setMessage(
  "Login Successful"
);

setMessageColor(
  "#22C55E"
);

setTimeout(() => {

  onLogin();

}, 1000);

  } catch (error: any) {

    setMessage(
  error?.response?.data?.detail ||
  "Login Failed"
);

setMessageColor(
  "#EF4444"
);

  }
};




const handleRegister = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  if (
    registerPassword !==
    registerConfirmPassword
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
          registerUsername,
        email:
          registerEmail,
        password:
          registerPassword
      }
    );

    setMessage(
      "Registration Successful"
    );

    setMessageColor(
      "#22C55E"
    );

    setTimeout(() => {

      setIsRegister(false);

      setRegisterName("");
      setRegisterUsername("");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");

    }, 1000);

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



  return (
    <div className="min-h-screen flex items-stretch" style={{ fontFamily: "Poppins, sans-serif", background: dark ? "#0a0f2e" : "#F6F7FB" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 relative overflow-hidden self-stretch"
        style={{ background: "linear-gradient(135deg, #070B2D 0%, #1a1560 50%, #2d1b8e 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute rounded-full"
              style={{
                width: `${60 + (i * 20) % 100}px`, height: `${60 + (i * 20) % 100}px`,
                left: `${(i * 137) % 100}%`, top: `${(i * 91) % 100}%`,
                background: "rgba(108,77,255,0.4)", transform: "translate(-50%,-50%)"
              }} />
          ))}
        </div>
        <div className="relative z-10 max-w-md px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#6C4DFF" }}>
              <Cpu size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">AI CodeFlow</span>
          </div>
          {/* Flowchart illustration */}
          <div className="mb-8">
            <svg viewBox="0 0 320 260" className="w-full max-w-xs mx-auto">
              {/* Code editor mock */}
              <rect x="10" y="10" width="140" height="100" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(108,77,255,0.5)" strokeWidth="1.5" />
              <rect x="18" y="22" width="80" height="6" rx="3" fill="#6C4DFF" opacity="0.7" />
              <rect x="18" y="34" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
              <rect x="18" y="44" width="100" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
              <rect x="18" y="54" width="70" height="5" rx="2.5" fill="#8B5CF6" opacity="0.6" />
              <rect x="18" y="64" width="90" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
              <rect x="18" y="74" width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
              <rect x="18" y="84" width="80" height="5" rx="2.5" fill="#22C55E" opacity="0.5" />
              {/* Arrow */}
              <path d="M155 60 L165 60" stroke="#6C4DFF" strokeWidth="2" markerEnd="url(#arr)" />
              <defs>
                <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#6C4DFF" />
                </marker>
              </defs>
              {/* Flowchart */}
              <rect x="170" y="20" width="60" height="28" rx="14" fill="#6C4DFF" opacity="0.9" />
              <text x="200" y="38" textAnchor="middle" fill="white" fontSize="10" fontFamily="Poppins">Start</text>
              <line x1="200" y1="48" x2="200" y2="62" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
              <rect x="170" y="62" width="60" height="24" rx="4" fill="rgba(108,77,255,0.4)" stroke="rgba(108,77,255,0.8)" strokeWidth="1" />
              <text x="200" y="78" textAnchor="middle" fill="white" fontSize="9" fontFamily="Poppins">Input</text>
              <line x1="200" y1="86" x2="200" y2="100" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
              <polygon points="200,100 230,118 200,136 170,118" fill="rgba(139,92,246,0.4)" stroke="#8B5CF6" strokeWidth="1" />
              <text x="200" y="122" textAnchor="middle" fill="white" fontSize="8" fontFamily="Poppins">Decision</text>
              <line x1="200" y1="136" x2="200" y2="150" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
              <rect x="170" y="150" width="60" height="24" rx="4" fill="rgba(34,197,94,0.3)" stroke="rgba(34,197,94,0.7)" strokeWidth="1" />
              <text x="200" y="166" textAnchor="middle" fill="white" fontSize="9" fontFamily="Poppins">Output</text>
              <line x1="200" y1="174" x2="200" y2="188" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
              <rect x="170" y="188" width="60" height="28" rx="14" fill="rgba(255,80,80,0.5)" />
              <text x="200" y="206" textAnchor="middle" fill="white" fontSize="10" fontFamily="Poppins">End</text>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
            Learn Programming Through AI Visualization
          </h1>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.65)" }}>
            Convert code into flowcharts and flowcharts into code using AI.
          </p>
          <div className="flex justify-center gap-6 mt-8">
            {[{ icon: Code2, label: "Code Editor" }, { icon: GitBranch, label: "Flowcharts" }, { icon: Zap, label: "AI Powered" }].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(108,77,255,0.2)", border: "1px solid rgba(108,77,255,0.4)" }}>
                  <Icon size={18} className="text-purple-300" />
                </div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="rounded-2xl p-6 shadow-2xl"
            style={{ background: dark ? "rgba(255,255,255,0.05)" : "white", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E5E7EB", backdropFilter: "blur(20px)" }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#6C4DFF" }}>
                <Cpu size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg" style={{ color: dark ? "white" : "#1E293B" }}>AI CodeFlow</span>
            </div>
            <h2
  className="font-bold mb-1"
  style={{
    color: dark
      ? "white"
      : "#1E293B",
    fontSize: "1.5rem"
  }}
>
  {
    isRegister
      ? "Create Account"
      : "Welcome Back"
  }
</h2>

<p
  className="text-sm mb-6"
  style={{
    color: dark
      ? "rgba(255,255,255,0.5)"
      : "#64748B"
  }}
>
  {
    isRegister
      ? "Create your account to start learning with AI"
      : "Sign in to continue your learning journey"
  }
</p>
            {!isRegister ? (
<form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: dark ? "rgba(255,255,255,0.8)" : "#374151" }}>Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="john@university.edu" required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: dark ? "rgba(255,255,255,0.08)" : "#F6F7FB", border: `1.5px solid ${dark ? "rgba(255,255,255,0.1)" : "#E5E7EB"}`, color: dark ? "white" : "#1E293B" }}
                  onFocus={e => e.target.style.borderColor = "#6C4DFF"}
                  onBlur={e => e.target.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "#E5E7EB"} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: dark ? "rgba(255,255,255,0.8)" : "#374151" }}>Password</label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" required
                    className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all"
                    style={{ background: dark ? "rgba(255,255,255,0.08)" : "#F6F7FB", border: `1.5px solid ${dark ? "rgba(255,255,255,0.1)" : "#E5E7EB"}`, color: dark ? "white" : "#1E293B" }}
                    onFocus={e => e.target.style.borderColor = "#6C4DFF"}
                    onBlur={e => e.target.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "#E5E7EB"} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: dark ? "rgba(255,255,255,0.4)" : "#9CA3AF" }}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded accent-purple-600" />
                  <span className="text-sm" style={{ color: dark ? "rgba(255,255,255,0.6)" : "#64748B" }}>Remember me</span>
                </label>
                <button type="button" className="text-sm font-medium" style={{ color: "#6C4DFF" }}>Forgot Password?</button>
              </div>
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
                Sign In
              </button>
              <div className="mt-4 flex justify-center">
  <GoogleLogin
  onSuccess={async (
    credentialResponse
  ) => {

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

    setMessage(
  "Google Login Successful"
);

setMessageColor(
  "#22C55E"
);

setTimeout(() => {

  onLogin();

}, 1000);
  }}
/>
</div>
            </form>
            ) : (

<form
  onSubmit={handleRegister}
  className="space-y-2"
>

  <div>
    <label
      className="block text-sm font-medium mb-1.5"
      style={{
        color: dark
          ? "rgba(255,255,255,0.8)"
          : "#374151"
      }}
    >
      Username
    </label>

    <input
      type="text"
      value={registerUsername}
      onChange={(e) =>
        setRegisterUsername(
          e.target.value
        )
      }
      placeholder="johndoe123"
      required
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
      style={{
        background: dark
          ? "rgba(255,255,255,0.08)"
          : "#F6F7FB",
        border: `1.5px solid ${
          dark
            ? "rgba(255,255,255,0.1)"
            : "#E5E7EB"
        }`,
        color: dark
          ? "white"
          : "#1E293B"
      }}
    />
  </div>

  <div>
    <label
      className="block text-sm font-medium mb-1.5"
      style={{
        color: dark
          ? "rgba(255,255,255,0.8)"
          : "#374151"
      }}
    >
      Email Address
    </label>

    <input
      type="email"
      value={registerEmail}
      onChange={(e) =>
        setRegisterEmail(
          e.target.value
        )
      }
      placeholder="john@gmail.com"
      required
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
      style={{
        background: dark
          ? "rgba(255,255,255,0.08)"
          : "#F6F7FB",
        border: `1.5px solid ${
          dark
            ? "rgba(255,255,255,0.1)"
            : "#E5E7EB"
        }`,
        color: dark
          ? "white"
          : "#1E293B"
      }}
    />
  </div>

  <div>
    <label
      className="block text-sm font-medium mb-1.5"
      style={{
        color: dark
          ? "rgba(255,255,255,0.8)"
          : "#374151"
      }}
    >
      Password
    </label>

    <input
      type="password"
      value={registerPassword}
      onChange={(e) =>
        setRegisterPassword(
          e.target.value
        )
      }
      placeholder="••••••••"
      required
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
      style={{
        background: dark
          ? "rgba(255,255,255,0.08)"
          : "#F6F7FB",
        border: `1.5px solid ${
          dark
            ? "rgba(255,255,255,0.1)"
            : "#E5E7EB"
        }`,
        color: dark
          ? "white"
          : "#1E293B"
      }}
    />
  </div>

  <div>
    <label
      className="block text-sm font-medium mb-1.5"
      style={{
        color: dark
          ? "rgba(255,255,255,0.8)"
          : "#374151"
      }}
    >
      Confirm Password
    </label>

    <input
      type="password"
      value={
        registerConfirmPassword
      }
      onChange={(e) =>
        setRegisterConfirmPassword(
          e.target.value
        )
      }
      placeholder="••••••••"
      required
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
      style={{
        background: dark
          ? "rgba(255,255,255,0.08)"
          : "#F6F7FB",
        border: `1.5px solid ${
          dark
            ? "rgba(255,255,255,0.1)"
            : "#E5E7EB"
        }`,
        color: dark
          ? "white"
          : "#1E293B"
      }}
    />
  </div>

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

  <button
    type="submit"
    className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
    style={{
      background:
        "linear-gradient(135deg,#6C4DFF,#8B5CF6)"
    }}
  >
    Create Account
  </button>

  <div className="mt-4 flex justify-center">





  <GoogleLogin
    onSuccess={async (
      credentialResponse
    ) => {

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

      setMessage(
        "Google Login Successful"
      );

      setMessageColor(
        "#22C55E"
      );

      setTimeout(() => {
        onLogin();
      }, 1000);
    }}
    onError={() => {
      setMessage(
        "Google Login Failed"
      );

      setMessageColor(
        "#EF4444"
      );
    }}
  />
</div>

</form>

)}
            <p
  className="text-center text-sm mt-6"
  style={{
    color: dark
      ? "rgba(255,255,255,0.5)"
      : "#64748B"
  }}
>
  {
    !isRegister
      ? (
        <>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() =>
              setIsRegister(true)
            }
            className="font-semibold"
            style={{
              color: "#6C4DFF"
            }}
          >
            Register
          </button>
        </>
      )
      : (
        <>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() =>
              setIsRegister(false)
            }
            className="font-semibold"
            style={{
              color: "#6C4DFF"
            }}
          >
            Login
          </button>
        </>
      )
  }
</p>
          </div>
        </div>
      </div>
    </div>
  );
}
