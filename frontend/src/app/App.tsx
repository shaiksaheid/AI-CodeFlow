import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { Dashboard } from "./components/Dashboard";
import { CodeToFlowchart } from "./components/CodeToFlowchart";
import { FlowchartToCode } from "./components/FlowchartToCode";
import { LogicClassification } from "./components/LogicClassification";
import { AlgorithmExplanations } from "./components/AlgorithmExplanations";
import { History } from "./components/History";
import { Profile } from "./components/Profile";
import { Settings } from "./components/Settings";
import {
  LayoutDashboard, GitBranch, Code2, FileCode2, Network,
  BrainCircuit, BookOpen, FolderOpen, Clock, History as HistoryIcon,
  User, Settings as SettingsIcon, LogOut, Bell, Search, Sun, Moon, Cpu, ChevronRight
} from "lucide-react";

type AuthView = "login" | "register" | "app";
type Page = "dashboard" | "code-to-flowchart" | "flowchart-to-code" | "code-editor" | "flowchart-editor" | "logic-classification" | "algorithm-explanations" | "my-sessions" | "saved-flowcharts" | "history" | "profile" | "settings";







const navItems: { icon: any; label: string; page: Page }[] = [
  { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
  { icon: GitBranch, label: "Code to Flowchart", page: "code-to-flowchart" },
  { icon: Code2, label: "Flowchart to Code", page: "flowchart-to-code" },
  // { icon: FileCode2, label: "Code Editor", page: "code-editor" },
  { icon: BrainCircuit, label: "Logic Classification", page: "logic-classification" },
  { icon: BookOpen, label: "Algorithm Explanations", page: "algorithm-explanations" },
  { icon: HistoryIcon, label: "History", page: "history" },
  { icon: User, label: "Profile", page: "profile" },
  { icon: SettingsIcon, label: "Settings", page: "settings" },
];

const pageTitles: Record<Page, string> = {
  dashboard: "Dashboard", "code-to-flowchart": "Code to Flowchart",
  "flowchart-to-code": "Flowchart to Code", "code-editor": "Code Editor",
  "flowchart-editor": "Flowchart Editor", "logic-classification": "Logic Classification",
  "algorithm-explanations": "Algorithm Explanations", "my-sessions": "My Sessions",
  "saved-flowcharts": "Saved Flowcharts", history: "History", profile: "Profile", settings: "Settings",
};

export default function App() {
  const savedUser =localStorage.getItem("user");
  const [auth, setAuth] =useState<AuthView>(savedUser ? "app" : "login");
  const [page, setPage] = useState<Page>("dashboard");
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] =
  useState(false);

  const user = JSON.parse(localStorage.getItem("user") ||"null");

  const [authMode, setAuthMode] =useState<"login" | "register">("login");

  const navigate = (p: string) => setPage(p as Page);

  const bg = dark ? "#070B2D" : "#F6F7FB";
  const navBg = "linear-gradient(180deg, #070B2D 0%, #0d1340 60%, #140e45 100%)";
  const text = dark ? "white" : "#1E293B";
  const sub = dark ? "rgba(255,255,255,0.5)" : "#64748B";
  const contentBg = dark ? "#0a0f2e" : "#F6F7FB";


  if (auth !== "app") {
  return (
    <div className="flip-container">

      <div
        className={`flip-card ${
          auth === "register"
            ? "flipped"
            : ""
        }`}
      >

        <div className="flip-front">

          <LoginPage
            dark={dark}
            onLogin={() =>
              setAuth("app")
            }
            onGoRegister={() =>
              setAuth("register")
            }
          />

        </div>

        <div className="flip-back">

          <RegisterPage
            dark={dark}
            onRegister={() =>
              setAuth("app")
            }
            onGoLogin={() =>
              setAuth("login")
            }
          />

        </div>

      </div>

    </div>
  );
}

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard dark={dark} onNavigate={navigate} />;
      case "code-to-flowchart": return <CodeToFlowchart dark={dark} />;
      case "flowchart-to-code": return <FlowchartToCode dark={dark} />;
      case "logic-classification": return <LogicClassification dark={dark} />;
      case "algorithm-explanations": return <AlgorithmExplanations dark={dark} />;
      case "history": return <History dark={dark} />;
      case "profile": return <Profile dark={dark} />;
      case "settings":return <Settings dark={dark} />;
      default: return <Dashboard dark={dark} onNavigate={navigate} />;
    }
  };


  const pages = [
  { name: "Dashboard", page: "dashboard" },
  { name: "Code to Flowchart", page: "code-to-flowchart" },
  { name: "Flowchart to Code", page: "flowchart-to-code" },
  { name: "Logic Classification", page: "logic-classification" },
  { name: "Algorithm Explanations", page: "algorithm-explanations" },
  { name: "History", page: "history" },
  { name: "Profile", page: "profile" },
  { name: "Settings", page: "settings" }
];

const handleSearch = () => {

  const match = pages.find(
    p =>
      p.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  if (match) {

    navigate(match.page);

    setSearch("");

  }

};

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "Poppins, sans-serif", background: contentBg }}>
      {/* Sidebar */}
      <aside className="flex flex-col flex-shrink-0 overflow-hidden"
        style={{ width: 230, background: navBg, boxShadow: "4px 0 24px rgba(0,0,0,0.3)" }}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#6C4DFF" }}>
            <Cpu size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm text-white leading-tight">AI CodeFlow</div>
            <div className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.65rem" }}>Learn. Visualize. Understand.</div>
          </div>
        </div>

        {/* Nav items — no scroll */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5 overflow-hidden">
          {navItems.map(({ icon: Icon, label, page: p }) => {
            const active = page === p;
            return (
              <button key={p} onClick={() => setPage(p)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl w-full text-left transition-all group"
                style={{
                  background: active ? "rgba(108,77,255,0.25)" : "transparent",
                  color: active ? "white" : "rgba(255,255,255,0.55)",
                  borderLeft: active ? "2px solid #6C4DFF" : "2px solid transparent",
                }}>
                <Icon size={15} style={{ color: active ? "#a78bfa" : "rgba(255,255,255,0.45)", flexShrink: 0 }} />
                <span className="text-xs font-medium truncate">{label}</span>
                {active && <ChevronRight size={12} className="ml-auto" style={{ color: "#a78bfa" }} />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div
  className="px-3 pb-4 flex-shrink-0"
  style={{
    borderTop:
      "1px solid rgba(255,255,255,0.06)"
  }}
>
  <button
  disabled={loggingOut}
  onClick={async () => {

    setLoggingOut(true);

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          2000
        )
    );

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setAuth("login");

  }}
  className="flex items-center gap-2.5 px-3 py-2 rounded-xl w-full mt-2 transition-all hover:bg-red-500/15 disabled:opacity-60"
  style={{
    color:
      "rgba(255,100,100,0.8)"
  }}
>
  <LogOut size={15} />

  <span className="text-xs font-medium">
    {loggingOut
      ? "Logging out..."
      : "Logout"}
  </span>
</button>
</div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top navbar */}
        <header className="flex items-center gap-4 px-6 py-3.5 flex-shrink-0 z-10"
          style={{ background: dark ? "#0f1535" : "white", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "#E5E7EB"}`, boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm" style={{ color: sub }}>
            <span style={{ color: text, fontWeight: 500 }}>{pageTitles[page]}</span>
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative hidden md:block">

  <Search
    size={14}
    className="absolute left-3 top-1/2 -translate-y-1/2"
    style={{ color: sub }}
  />

  <input
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    onKeyDown={(e) => {

      if (e.key === "Enter") {

        handleSearch();

      }

    }}
    placeholder="Search pages..."
    className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none w-52"
    style={{
      background:
        dark
          ? "rgba(255,255,255,0.06)"
          : "#F6F7FB",

      border:
        `1.5px solid ${
          dark
            ? "rgba(255,255,255,0.08)"
            : "#E5E7EB"
        }`,

      color: text
    }}
    onFocus={(e) =>
      e.target.style.borderColor =
        "#6C4DFF"
    }
    onBlur={(e) =>
      e.target.style.borderColor =
        dark
          ? "rgba(255,255,255,0.08)"
          : "#E5E7EB"
    }
  />

</div>

          

          {/* Dark mode */}
          <button onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
            style={{ background: dark ? "rgba(255,255,255,0.06)" : "#F6F7FB" }}>
            {dark ? <Sun size={16} style={{ color: "#F59E0B" }} /> : <Moon size={16} style={{ color: text }} />}
          </button>

          {/* User avatar */}
          <div className="relative">
            <button
  onClick={() => {

    setProfileOpen(
      !profileOpen
    );

    setNotifOpen(false);

  }}
  className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl transition-all hover:opacity-80"
  style={{
    background: dark
      ? "rgba(255,255,255,0.06)"
      : "#F6F7FB"
  }}
>
  <div
    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
    style={{
      background:
        "linear-gradient(135deg,#6C4DFF,#8B5CF6)",
      color: "white"
    }}
  >
    {
      user?.name
        ?.substring(0, 2)
        .toUpperCase() || "JD"
    }
  </div>

  <div className="hidden sm:block text-left">

    <div
      className="text-xs font-medium"
      style={{
        color: text
      }}
    >
      {
        user?.name ||
        "User"
      }
    </div>

    <div
      className="text-xs"
      style={{
        color: sub
      }}
    >
      {
        user?.email ||
        "Guest"
      }
    </div>

  </div>
</button>
            {profileOpen && (
              <div className="absolute top-12 right-0 w-48 rounded-2xl shadow-2xl z-50 overflow-hidden"
                style={{ background: dark ? "#1e2445" : "white", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "#E5E7EB"}` }}>
                {[{ label: "Profile", page: "profile" }, { label: "Settings", page: "settings" }].map(item => (
                  <button key={item.label} onClick={() => { setPage(item.page as Page); setProfileOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-purple-500/10 transition-colors"
                    style={{ color: text }}>{item.label}</button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(108,77,255,0.3) transparent" }}
          onClick={() => { setNotifOpen(false); setProfileOpen(false); }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
