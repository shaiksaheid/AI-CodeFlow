import { useState, useEffect } from "react";
import { Camera } from "lucide-react";

interface Props {
  dark: boolean;
}

export function Profile({ dark }: Props) {

  const [editing, setEditing] = useState(false);

  const [message, setMessage] =
    useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    university: "",
    branch: "",
    year: ""
  });

  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setForm({
      name: user.name || "",
      email: user.email || "",
      university:
        user.university || "",
      branch:
        user.branch || "",
      year:
        user.year || ""
    });

  }, []);

  const saveProfile = () => {

    localStorage.setItem(
      "user",
      JSON.stringify(form)
    );

    setMessage(
      "Profile updated successfully"
    );

    setEditing(false);

    setTimeout(() => {
      setMessage("");
    }, 3000);

  };

  const set =
    (key: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement |
        HTMLSelectElement
      >
    ) =>
      setForm((f) => ({
        ...f,
        [key]:
          e.target.value
      }));

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

  const stats = [
    {
      label: "Total Sessions",
      value: "0",
      color: "#6C4DFF"
    },
    {
      label: "Flowcharts",
      value: "0",
      color: "#8B5CF6"
    },
    {
      label: "Code Generated",
      value: "0",
      color: "#22C55E"
    },
    {
      label: "Learning Hours",
      value: "0h",
      color: "#F59E0B"
    }
  ];

  const badges = [
    {
      name: "Code Master",
      icon: "🏆",
      color: "#F59E0B"
    },
    {
      name: "Flowchart Pro",
      icon: "📊",
      color: "#6C4DFF"
    },
    {
      name: "AI Explorer",
      icon: "🤖",
      color: "#8B5CF6"
    },
    {
      name: "Logic Wizard",
      icon: "🧩",
      color: "#22C55E"
    }
  ];

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
          Profile
        </h1>

        <p
          className="text-sm"
          style={{
            color: sub
          }}
        >
          Manage your profile
          information
        </p>
      </div>

      {message && (

        <div
          className="rounded-xl px-4 py-3"
          style={{
            background:
              "rgba(34,197,94,0.12)",
            color:
              "#22C55E",
            border:
              "1px solid rgba(34,197,94,0.25)"
          }}
        >
          {message}
        </div>

      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Profile Card */}

        <div
          className="rounded-2xl p-6 flex flex-col items-center text-center"
          style={{
            background: card,
            border
          }}
        >

          <div className="relative mb-4">

            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg,#6C4DFF,#8B5CF6)",
                color:
                  "white"
              }}
            >
              {
                form.name
                  ? form.name
                      .split(" ")
                      .map(
                        (n) => n[0]
                      )
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : "U"
              }
            </div>

            <button
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background:
                  "#6C4DFF"
              }}
            >
              <Camera
                size={14}
                className="text-white"
              />
            </button>

          </div>

          <h2
            className="font-bold"
            style={{
              color: text
            }}
          >
            {form.name}
          </h2>

          <p
            className="text-sm"
            style={{
              color: sub
            }}
          >
            {form.email}
          </p>

          <span
            className="mt-2 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background:
                "rgba(108,77,255,0.12)",
              color:
                "#6C4DFF"
            }}
          >
            {form.branch}
          </span>


        </div>

        {/* Form */}

        <div
          className="lg:col-span-2 rounded-2xl p-6"
          style={{
            background: card,
            border
          }}
        >

          <div className="flex items-center justify-between mb-6">

            <h3
              className="font-semibold"
              style={{
                color: text
              }}
            >
              Student Information
            </h3>

            <button
              onClick={() => {

                if (
                  editing
                ) {
                  saveProfile();
                } else {
                  setEditing(
                    true
                  );
                }

              }}
              className="px-4 py-2 rounded-xl text-sm font-medium"
              style={{
                background:
                  editing
                    ? "rgba(34,197,94,0.12)"
                    : "rgba(108,77,255,0.12)",

                color:
                  editing
                    ? "#22C55E"
                    : "#6C4DFF"
              }}
            >
              {
                editing
                  ? "Save Changes"
                  : "Edit Profile"
              }
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {[
              {
                key: "name",
                label:
                  "Full Name",
                type: "text"
              },
              {
                key: "email",
                label:
                  "Email Address",
                type: "email"
              },
              {
                key:
                  "university",
                label:
                  "University",
                type: "text"
              },
              {
                key:
                  "branch",
                label:
                  "Branch",
                type: "text"
              }
            ].map(
              (field) => (

                <div
                  key={
                    field.key
                  }
                >

                  <label
                    className="block text-xs font-medium mb-1.5"
                    style={{
                      color:
                        sub
                    }}
                  >
                    {
                      field.label
                    }
                  </label>

                  <input
                    type={
                      field.type
                    }
                    value={
                      (
                        form as any
                      )[
                        field.key
                      ]
                    }
                    onChange={set(
                      field.key
                    )}
                    disabled={
                      !editing
                    }
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      background:
                        editing
                          ? dark
                            ? "rgba(255,255,255,0.08)"
                            : "#F6F7FB"
                          : "transparent",

                      border:
                        `1.5px solid ${
                          editing
                            ? "#6C4DFF"
                            : dark
                            ? "rgba(255,255,255,0.08)"
                            : "#E5E7EB"
                        }`,

                      color:
                        text
                    }}
                  />

                </div>

              )
            )}

            <div>

              <label
                className="block text-xs font-medium mb-1.5"
                style={{
                  color: sub
                }}
              >
                Year
              </label>

              <select
                value={
                  form.year
                }
                onChange={set(
                  "year"
                )}
                disabled={
                  !editing
                }
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background:
                    editing
                      ? dark
                        ? "rgba(255,255,255,0.08)"
                        : "#F6F7FB"
                      : "transparent",

                  border:
                    `1.5px solid ${
                      editing
                        ? "#6C4DFF"
                        : dark
                        ? "rgba(255,255,255,0.08)"
                        : "#E5E7EB"
                    }`,

                  color:
                    text
                }}
              >

                {[
                  "First Year",
                  "Second Year",
                  "Third Year",
                  "Final Year"
                ].map(
                  (y) => (
                    <option
                      key={y}
                      value={y}
                    >
                      {y}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>

        </div>

      </div>

      

    </div>
  );
}