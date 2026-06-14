import {
  GitBranch,
  Code2,
  TrendingUp,
  Layers,
  History,
  User,
  Settings,
  ArrowRight,
  Activity
} from "lucide-react";

interface Props {
  dark: boolean;
  onNavigate: (page: string) => void;
}

export function Dashboard({
  dark,
  onNavigate
}: Props) {

  const card =
    dark
      ? "rgba(255,255,255,0.05)"
      : "white";

  const border =
    dark
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid #E5E7EB";

  const text =
    dark
      ? "white"
      : "#1E293B";

  const sub =
    dark
      ? "rgba(255,255,255,0.6)"
      : "#64748B";

  const user =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    );

  const modules = [
    {
      title: "Code to Flowchart",
      icon: GitBranch,
      page: "code-to-flowchart",
      color: "#6C4DFF"
    },
    {
      title: "Flowchart to Code",
      icon: Code2,
      page: "flowchart-to-code",
      color: "#8B5CF6"
    },
    {
      title: "Logic Classification",
      icon: TrendingUp,
      page: "logic-classification",
      color: "#22C55E"
    },
    {
      title: "Algorithm Explanations",
      icon: Layers,
      page: "algorithm-explanations",
      color: "#F59E0B"
    },
    {
      title: "History",
      icon: History,
      page: "history",
      color: "#EC4899"
    },
    {
      title: "Profile",
      icon: User,
      page: "profile",
      color: "#06B6D4"
    }
  ];

  const stats = [
    {
      label: "Code Generated",
      value: "120+",
      color: "#6C4DFF"
    },
    {
      label: "Flowcharts",
      value: "80+",
      color: "#8B5CF6"
    },
    {
      label: "Logic Analysis",
      value: "50+",
      color: "#22C55E"
    },
    {
      label: "Algorithms Explained",
      value: "70+",
      color: "#F59E0B"
    }
  ];

  const activities = [
    "Convert source code into flowcharts",
    "Generate code from editable flowcharts",
    "Classify program logic using ML",
    "Get AI-powered algorithm explanations",
    "Save and manage project history"
  ];

  return (
    <div
      className="p-6 space-y-6"
      style={{
        fontFamily:
          "Poppins, sans-serif"
      }}
    >

      {/* Welcome */}

      <div
        className="rounded-2xl p-6"
        style={{
          background: card,
          border
        }}
      >
        <h1
          className="text-3xl font-bold"
          style={{
            color: text
          }}
        >
          Welcome,
          {" "}
          {user?.name || "User"} 👋
        </h1>

        <p
          className="mt-2"
          style={{
            color: sub
          }}
        >
          AI CodeFlow helps you convert code,
          generate flowcharts, classify logic,
          and understand algorithms faster.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {stats.map((s) => (

          <div
            key={s.label}
            className="rounded-2xl p-5"
            style={{
              background: card,
              border
            }}
          >
            <div
              className="text-3xl font-bold"
              style={{
                color: s.color
              }}
            >
              {s.value}
            </div>

            <div
              className="text-sm mt-2"
              style={{
                color: sub
              }}
            >
              {s.label}
            </div>

          </div>

        ))}

      </div>

      {/* Quick Access */}

      <div
        className="rounded-2xl p-6"
        style={{
          background: card,
          border
        }}
      >

        <h2
          className="font-semibold mb-5"
          style={{
            color: text
          }}
        >
          Quick Access
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {modules.map((item) => {

            const Icon =
              item.icon;

            return (

              <button
                key={item.title}
                onClick={() =>
                  onNavigate(
                    item.page
                  )
                }
                className="rounded-xl p-5 text-left transition-all hover:scale-[1.02]"
                style={{
                  background:
                    dark
                      ? "rgba(255,255,255,0.04)"
                      : "#F6F7FB",
                  border:
                    `1px solid ${item.color}25`
                }}
              >

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background:
                      `${item.color}20`
                  }}
                >
                  <Icon
                    size={22}
                    color={
                      item.color
                    }
                  />
                </div>

                <h3
                  className="font-semibold"
                  style={{
                    color: text
                  }}
                >
                  {item.title}
                </h3>

                <div
                  className="flex items-center gap-2 mt-3 text-sm"
                  style={{
                    color:
                      item.color
                  }}
                >
                  Open
                  <ArrowRight
                    size={14}
                  />
                </div>

              </button>

            );

          })}

        </div>

      </div>

      {/* Platform Features */}

      <div
        className="rounded-2xl p-6"
        style={{
          background: card,
          border
        }}
      >

        <h2
          className="font-semibold mb-5"
          style={{
            color: text
          }}
        >
          Platform Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {activities.map(
            (
              activity,
              index
            ) => (

              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{
                  background:
                    dark
                      ? "rgba(255,255,255,0.04)"
                      : "#F6F7FB"
                }}
              >

                <Activity
                  size={18}
                  color="#6C4DFF"
                />

                <span
                  style={{
                    color: text
                  }}
                >
                  {activity}
                </span>

              </div>

            )
          )}

        </div>

      </div>

      {/* Settings Shortcut */}

      <div
        className="rounded-2xl p-6 flex items-center justify-between"
        style={{
          background: card,
          border
        }}
      >

        <div>

          <h3
            className="font-semibold"
            style={{
              color: text
            }}
          >
            Account Settings
          </h3>

          <p
            className="text-sm mt-1"
            style={{
              color: sub
            }}
          >
            Manage your profile and preferences.
          </p>

        </div>

        <button
          onClick={() =>
            onNavigate(
              "settings"
            )
          }
          className="px-4 py-2 rounded-xl text-white flex items-center gap-2"
          style={{
            background:
              "linear-gradient(135deg,#6C4DFF,#8B5CF6)"
          }}
        >
          <Settings size={16} />
          Settings
        </button>

      </div>

    </div>
  );
}