import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

interface Props { dark: boolean; }



export function AlgorithmExplanations({ dark }: Props) {
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");


  const [code, setCode] = useState("");

  const [lang, setLang] = useState("c");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const card = dark ? "rgba(255,255,255,0.05)" : "white";
  const border = dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E5E7EB";
  const text = dark ? "white" : "#1E293B";
  const sub = dark ? "rgba(255,255,255,0.5)" : "#64748B";


  const explainAlgorithm = async () => {

  try {

    setLoading(true);

    const response =
      await axios.post(
        "https://ai-codeflow-backend.onrender.com/ai/explain-code",
        {
          language: lang,
          code: code
        }
      );

    console.log(
      "EXPLANATION:",
      response.data
    );

    setResult(
      response.data.explanation
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to explain code"
    );

  } finally {

    setLoading(false);

  }

};



  

  const complexityColor: Record<string, string> = { "O(n²)": "#EF4444", "O(log n)": "#22C55E", "O(2ⁿ)": "#F59E0B", "O(V²)": "#8B5CF6", "O(n log n)": "#3B82F6" };

  return (
  <div
    className="p-6 space-y-4"
    style={{
      fontFamily: "Poppins, sans-serif"
    }}
  >
    <div>
      <h1 style={{ color: text }}>
        Algorithm Explanations
      </h1>

      <p
        className="text-sm"
        style={{ color: sub }}
      >
        AI-powered code analysis and explanation
      </p>
    </div>

    {/* Input Section */}

    <div
      className="rounded-2xl p-5"
      style={{
        background: card,
        border
      }}
    >
      <div className="flex gap-2 mb-4">
        {["c", "python", "java"].map(
          (language) => (
            <button
              key={language}
              onClick={() =>
                setLang(language)
              }
              className="px-4 py-2 rounded-lg font-medium"
              style={{
                background:
                  lang === language
                    ? "#6C4DFF"
                    : "transparent",
                color:
                  lang === language
                    ? "white"
                    : text,
                border:
                  lang === language
                    ? "none"
                    : border
              }}
            >
              {language.toUpperCase()}
            </button>
          )
        )}
      </div>

      <textarea
        value={code}
        onChange={(e) =>
          setCode(
            e.target.value
          )
        }
        placeholder="Paste your code here..."
        className="w-full h-64 p-4 rounded-xl outline-none"
        style={{
          background: dark
            ? "#0d1117"
            : "#F6F7FB",
          color: text
        }}
      />

      <button
        onClick={explainAlgorithm}
        disabled={loading}
        className="mt-4 px-5 py-2 rounded-xl text-white font-medium"
        style={{
          background: "#6C4DFF"
        }}
      >
        {loading
          ? "Explaining..."
          : "Explain Algorithm"}
      </button>
    </div>

    {/* Result Section */}

    {result && (
      <div
        className="rounded-2xl p-5"
        style={{
          background: card,
          border
        }}
      >
        <h3
          className="font-semibold mb-4"
          style={{
            color: text
          }}
        >
          AI Explanation
        </h3>

        <div className="space-y-5">

          <div>
            <div
              className="font-semibold mb-2"
              style={{
                color: "#6C4DFF"
              }}
            >
              Summary
            </div>

            <p style={{ color: sub }}>
              {result.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div
              className="rounded-xl p-4"
              style={{
                background: dark
                  ? "rgba(255,255,255,0.04)"
                  : "#F6F7FB"
              }}
            >
              <div
                className="text-xs font-medium mb-2"
                style={{
                  color: "#6C4DFF"
                }}
              >
                Logic Type
              </div>

              <div
                className="font-semibold"
                style={{
                  color: text
                }}
              >
                {result.logic_type}
              </div>
            </div>

            <div
              className="rounded-xl p-4"
              style={{
                background: dark
                  ? "rgba(255,255,255,0.04)"
                  : "#F6F7FB"
              }}
            >
              <div
                className="text-xs font-medium mb-2"
                style={{
                  color: "#6C4DFF"
                }}
              >
                Time Complexity
              </div>

              <div
                className="font-semibold"
                style={{
                  color: text
                }}
              >
                {result.time_complexity}
              </div>
            </div>

            <div
              className="rounded-xl p-4"
              style={{
                background: dark
                  ? "rgba(255,255,255,0.04)"
                  : "#F6F7FB"
              }}
            >
              <div
                className="text-xs font-medium mb-2"
                style={{
                  color: "#6C4DFF"
                }}
              >
                Space Complexity
              </div>

              <div
                className="font-semibold"
                style={{
                  color: text
                }}
              >
                {result.space_complexity}
              </div>
            </div>

          </div>

          <div>
            <div
              className="font-semibold mb-2"
              style={{
                color: "#6C4DFF"
              }}
            >
              Step-by-Step Breakdown
            </div>

            <ol
              className="list-decimal pl-6 space-y-2"
              style={{
                color: sub
              }}
            >
              {result.steps?.map(
                (
                  step: string,
                  index: number
                ) => (
                  <li key={index}>
                    {step}
                  </li>
                )
              )}
            </ol>
          </div>

        </div>
      </div>
    )}
  </div>
);
}
