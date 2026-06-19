import { useState } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import axios from "axios";


interface Props { dark: boolean; }





export function LogicClassification({ dark }: Props) {


  const [code, setCode] = useState("");

  const [lang, setLang] = useState("c");

  const [result, setResult] = useState<any>(null);

  const [loading, setLoading] =
    useState(false);


  const card = dark ? "rgba(255,255,255,0.05)" : "white";
  const border = dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E5E7EB";
  const text = dark ? "white" : "#1E293B";
  const sub = dark ? "rgba(255,255,255,0.5)" : "#64748B";


  const classifyCode = async () => {

  try {

    setLoading(true);

    const response =
      await axios.post(
        "https://ai-codeflow-backend.onrender.com/code/classify",
        {
          language: lang.toLowerCase(),
          code: code
        }
      );

    console.log(
      "CLASSIFICATION:",
      response.data
    );

    setResult(
      response.data
    );

  } catch (error) {

    console.error(
      "CLASSIFICATION ERROR:",
      error
    );

    alert(
      "Classification failed"
    );

  } finally {

    setLoading(false);

  }

};



  return (
  <div
    className="p-6 space-y-4"
    style={{ fontFamily: "Poppins, sans-serif" }}
  >
    <div>
      <h1 style={{ color: text }}>
        Logic Classification
      </h1>

      <p
        className="text-sm"
        style={{ color: sub }}
      >
        ML-powered code logic analysis
      </p>
    </div>




    <div className="flex gap-2 mb-4">
  {["c", "python", "java"].map((language) => (
    <button
      key={language}
      onClick={() => setLang(language)}
      className="px-4 py-2 rounded-lg font-medium"
      style={{
        background:
          lang === language
            ? "#6C4DFF"
            : "transparent",
        color:
          lang === language
            ? "white"
            : "#64748B",
        border: "1px solid #E5E7EB",
      }}
    >
      {language.toUpperCase()}
    </button>
  ))}
</div>





    {/* Code Input */}

    <div
      className="rounded-2xl p-5"
      style={{
        background: card,
        border
      }}
    >
      <textarea
        value={code}
        onChange={(e) =>
          setCode(e.target.value)
        }
        placeholder="Paste your code here..."
        className="w-full h-56 p-4 rounded-xl outline-none"
        style={{
          background: dark
            ? "#0d1117"
            : "#F6F7FB",
          color: text
        }}
      />

      <button
        onClick={classifyCode}
        disabled={loading}
        className="mt-4 px-5 py-2 rounded-xl text-white font-medium"
        style={{
          background: "#6C4DFF"
        }}
      >
        {loading
          ? "Classifying..."
          : "Classify Logic"}
      </button>
    </div>

    {result && (
      <>
        {/* Summary Cards */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Logic Type",
              value:
                result.logic_type,
              color: "#6C4DFF"
            },

            {
              label: "Confidence",
              value: `${result.confidence}%`,
              color: "#22C55E"
            },

            {
              label: "Conditional",
              value:
                result.probabilities
                  ?.Conditional || 0,
              color: "#F59E0B"
            },

            {
              label: "Looping",
              value:
                result.probabilities
                  ?.Looping || 0,
              color: "#3B82F6"
            }
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-2xl p-5 text-center"
              style={{
                background: card,
                border
              }}
            >
              <div
                className="text-2xl font-bold mb-1"
                style={{
                  color: c.color
                }}
              >
                {c.value}
              </div>

              <div
                className="text-xs"
                style={{
                  color: sub
                }}
              >
                {c.label}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}

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
            Classification Probability
          </h3>

          <ResponsiveContainer
            width="100%"
            height={280}
          >
            <BarChart
              data={[
                {
                  name:
                    "Conditional",
                  value:
                    result
                      .probabilities
                      ?.Conditional || 0
                },

                {
                  name:
                    "Function",
                  value:
                    result
                      .probabilities?.[
                      "Function-Based"
                    ] || 0
                },

                {
                  name:
                    "Looping",
                  value:
                    result
                      .probabilities
                      ?.Looping || 0
                },

                {
                  name:
                    "Nested",
                  value:
                    result
                      .probabilities
                      ?.Nested || 0
                },

                {
                  name:
                    "Sequential",
                  value:
                    result
                      .probabilities
                      ?.Sequential || 0
                }
              ]}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#6C4DFF"
                radius={[
                  6,
                  6,
                  0,
                  0
                ]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Prediction */}

        <div
          className="rounded-2xl p-6"
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
            ML Prediction
          </h3>

          <div
            className="text-3xl font-bold mb-2"
            style={{
              color: "#6C4DFF"
            }}
          >
            {result.logic_type}
          </div>

          <p
            style={{
              color: sub
            }}
          >
            The model predicts this
            code belongs to the
            <strong>
              {" "}
              {
                result.logic_type
              }{" "}
            </strong>
            category with
            <strong>
              {" "}
              {
                result.confidence
              }
              %
            </strong>
            confidence.
          </p>
        </div>
      </>
    )}
  </div>
);
}