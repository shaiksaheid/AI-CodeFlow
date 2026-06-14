import { Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";


interface Props { dark: boolean; }


export function History({ dark }: Props) {
  const [search, setSearch] = useState("");
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchHistory();
}, []);

const fetchHistory = async () => {

  try {

    const user =
      JSON.parse(
        localStorage.getItem("user") || "{}"
      );

    if (!user?.id) {
      setLoading(false);
      return;
    }

    const response =
      await axios.get(
        `http://127.0.0.1:8000/flowchart/user/${user.id}`
      );

    const historyData =
      response.data.map(
        (item: any) => ({
          id: item.id,
          title:
            item.title ||
            "Saved Flowchart",
          type:
            "Code → Flowchart",
          language:
            item.language ||
            "N/A",
          created_at:
            item.created_at ||
            new Date()
              .toLocaleDateString()
        })
      );

    setSessions(
      historyData
    );

  } catch (error) {

    console.error(
      error
    );

  } finally {

    setLoading(false);

  }

};



const remove = async (
  id: number
) => {

  try {

    await axios.delete(
      `http://127.0.0.1:8000/flowchart/${id}`
    );

    setSessions(
      sessions.filter(
        (item) =>
          item.id !== id
      )
    );

    setMessage(
      "Flowchart deleted successfully"
    );

    setMessageType(
      "success"
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);

  } catch (error) {

    console.error(error);

    setMessage(
      "Failed to delete flowchart"
    );

    setMessageType(
      "error"
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);

  }

};


  const card = dark ? "rgba(255,255,255,0.05)" : "white";
  const border = dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E5E7EB";
  const text = dark ? "white" : "#1E293B";
  const sub = dark ? "rgba(255,255,255,0.5)" : "#64748B";


  const [message, setMessage] =
  useState("");

  const [messageType, setMessageType] =
  useState<
    "success" | "error" | ""
  >("");

  

  const filtered = sessions.filter(
  (s) =>
    (s.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
);



  return (
    <div className="p-6 space-y-4" style={{ fontFamily: "Poppins, sans-serif" }}>
        <div>
          <h1 style={{ color: text }}>
            Session History
          </h1>

          <p
            className="text-sm"
            style={{ color: sub }}
          >
            All your past coding and flowchart sessions
          </p>
        </div>

        {message && (

          <div
            className="rounded-xl px-4 py-3"
            style={{
              background:
                messageType === "success"
                  ? "rgba(34,197,94,0.12)"
                  : "rgba(239,68,68,0.12)",

              color:
                messageType === "success"
                  ? "#22C55E"
                  : "#EF4444",

              border:
                messageType === "success"
                  ? "1px solid rgba(34,197,94,0.25)"
                  : "1px solid rgba(239,68,68,0.25)"
            }}
          >
            {message}
          </div>

        )}

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: sub }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sessions..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: card, border, color: text }} />
        </div>
        <div className="text-sm" style={{ color: sub }}>{sessions.length} records</div>
      </div>

          <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: card,
            border
          }}
          >
          {loading ? (

            <div
              className="p-10 text-center"
              style={{ color: sub }}
            >
              Loading history...
            </div>

          ) : sessions.length > 0 ? (

            <div className="divide-y">

              {filtered.map((item: any, index: number) => (

                <div
                  key={index}
                  className="p-5 flex items-center justify-between"
                >

                  <div>

                    <h3
                      className="font-semibold"
                      style={{ color: text }}
                    >
                      {item.title || "Untitled Activity"}
                    </h3>

                    <div className="flex gap-2 mt-2 flex-wrap">

                      <span
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          background:
                            "rgba(108,77,255,0.12)",
                          color:
                            "#6C4DFF"
                        }}
                      >
                        {item.type || item.feature || "Activity"}
                      </span>

                      <span
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          background:
                            "rgba(34,197,94,0.12)",
                          color:
                            "#22C55E"
                        }}
                      >
                        {item.language || "N/A"}
                      </span>

                    </div>

                    <p
                      className="text-xs mt-2"
                      style={{ color: sub }}
                    >
                      {item.created_at || item.date || "-"}
                    </p>

                  </div>

                  <button
                    onClick={() => remove(item.id)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "rgba(239,68,68,0.12)"
                    }}
                  >
                    <Trash2
                      size={16}
                      style={{
                        color:
                          "#EF4444"
                      }}
                    />
                  </button>

                </div>

              ))}

            </div>

          ) : (

            <div
              className="p-10 text-center"
              style={{ color: sub }}
            >
              No history found.
            </div>

          )}
        </div>
    </div>
  );
}
