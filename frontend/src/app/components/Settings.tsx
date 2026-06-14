import { useState, useEffect } from "react";
import {
  User,
  Shield,
  Palette,
  Save,
  CheckCircle
} from "lucide-react";

interface Props {
  dark: boolean;
}

export function Settings({ dark }: Props) {

  const [message, setMessage] =
    useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    university: "",
    branch: "",
    year: ""
  });

  useEffect(() => {

    const storedUser =
      JSON.parse(
        localStorage.getItem("user") || "{}"
      );

    setUser({
      name: storedUser.name || "",
      email: storedUser.email || "",
      university:
        storedUser.university || "",
      branch:
        storedUser.branch || "",
      year:
        storedUser.year || ""
    });

  }, []);

  const saveSettings = () => {

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setMessage(
      "Settings saved successfully"
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);

  };

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
      ? "rgba(255,255,255,0.5)"
      : "#64748B";

  return (
    <div
      className="p-6 space-y-4"
      style={{
        fontFamily:
          "Poppins, sans-serif"
      }}
    >

      <div>
        <h1
          style={{
            color: text
          }}
        >
          Settings
        </h1>

        <p
          className="text-sm"
          style={{
            color: sub
          }}
        >
          Manage your account
          settings and preferences
        </p>
      </div>

      {message && (

        <div
          className="rounded-xl px-4 py-3 flex items-center gap-2"
          style={{
            background:
              "rgba(34,197,94,0.12)",
            color:
              "#22C55E",
            border:
              "1px solid rgba(34,197,94,0.25)"
          }}
        >
          <CheckCircle size={16} />
          {message}
        </div>

      )}

      {/* Account Settings */}

      <div
        className="rounded-2xl p-6"
        style={{
          background: card,
          border
        }}
      >

        <div className="flex items-center gap-2 mb-4">

          <User
            size={18}
            style={{
              color:
                "#6C4DFF"
            }}
          />

          <h3
            className="font-semibold"
            style={{
              color: text
            }}
          >
            Account Settings
          </h3>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>

            <label
              className="block text-xs mb-2"
              style={{
                color: sub
              }}
            >
              Full Name
            </label>

            <input
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name:
                    e.target.value
                })
              }
              className="w-full px-4 py-2.5 rounded-xl outline-none"
              style={{
                background:
                  dark
                    ? "rgba(255,255,255,0.05)"
                    : "#F6F7FB",
                color: text,
                border
              }}
            />

          </div>

          <div>

            <label
              className="block text-xs mb-2"
              style={{
                color: sub
              }}
            >
              Email
            </label>

            <input
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email:
                    e.target.value
                })
              }
              className="w-full px-4 py-2.5 rounded-xl outline-none"
              style={{
                background:
                  dark
                    ? "rgba(255,255,255,0.05)"
                    : "#F6F7FB",
                color: text,
                border
              }}
            />

          </div>

          <div>

            <label
              className="block text-xs mb-2"
              style={{
                color: sub
              }}
            >
              University
            </label>

            <input
              value={user.university}
              onChange={(e) =>
                setUser({
                  ...user,
                  university:
                    e.target.value
                })
              }
              className="w-full px-4 py-2.5 rounded-xl outline-none"
              style={{
                background:
                  dark
                    ? "rgba(255,255,255,0.05)"
                    : "#F6F7FB",
                color: text,
                border
              }}
            />

          </div>

          <div>

            <label
              className="block text-xs mb-2"
              style={{
                color: sub
              }}
            >
              Branch
            </label>

            <input
              value={user.branch}
              onChange={(e) =>
                setUser({
                  ...user,
                  branch:
                    e.target.value
                })
              }
              className="w-full px-4 py-2.5 rounded-xl outline-none"
              style={{
                background:
                  dark
                    ? "rgba(255,255,255,0.05)"
                    : "#F6F7FB",
                color: text,
                border
              }}
            />

          </div>

        </div>

      </div>

      {/* Appearance */}

      <div
        className="rounded-2xl p-6"
        style={{
          background: card,
          border
        }}
      >

        <div className="flex items-center gap-2 mb-4">

          <Palette
            size={18}
            style={{
              color:
                "#8B5CF6"
            }}
          />

          <h3
            className="font-semibold"
            style={{
              color: text
            }}
          >
            Appearance
          </h3>

        </div>

        <div
          className="flex items-center justify-between"
        >

          <div>
            <p
              className="font-medium"
              style={{
                color: text
              }}
            >
              Theme
            </p>

            <p
              className="text-sm"
              style={{
                color: sub
              }}
            >
              Current theme:
              {dark
                ? " Dark"
                : " Light"}
            </p>

          </div>

        </div>

      </div>

      {/* Security */}

      <div
        className="rounded-2xl p-6"
        style={{
          background: card,
          border
        }}
      >

        <div className="flex items-center gap-2 mb-4">

          <Shield
            size={18}
            style={{
              color:
                "#22C55E"
            }}
          />

          <h3
            className="font-semibold"
            style={{
              color: text
            }}
          >
            Security
          </h3>

        </div>

        <p
          className="text-sm"
          style={{
            color: sub
          }}
        >
          Your account is secured
          using Google Authentication.
        </p>

      </div>

      {/* Connected Account */}

      <div
        className="rounded-2xl p-6"
        style={{
          background: card,
          border
        }}
      >

        <h3
          className="font-semibold mb-3"
          style={{
            color: text
          }}
        >
          Connected Account
        </h3>

        <div
          className="flex items-center justify-between"
        >

          <div>

            <p
              className="font-medium"
              style={{
                color: text
              }}
            >
              Google Account
            </p>

            <p
              className="text-sm"
              style={{
                color: sub
              }}
            >
              {user.email}
            </p>

          </div>

        </div>

      </div>

      <button
        onClick={saveSettings}
        className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium"
        style={{
          background:
            "linear-gradient(135deg,#6C4DFF,#8B5CF6)"
        }}
      >
        <Save size={16} />
        Save Settings
      </button>

    </div>
  );
}