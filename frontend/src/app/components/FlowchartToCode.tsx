import { useState, useEffect } from "react";
import { Play, Copy, Download, Plus, Trash2 } from "lucide-react";
import axios from "axios";

interface Props { dark: boolean; }

type NodeType = "start" | "input" | "process" | "decision" | "loop" | "output" | "end";

interface FNode { id: number; type: NodeType; label: string; x: number; y: number; }

const nodeColors: Record<NodeType, string> = {
  start: "#6C4DFF", input: "#8B5CF6", process: "#3B82F6",
  decision: "#F59E0B", loop: "#22C55E", output: "#EC4899", end: "#EF4444"
};


const initNodes: FNode[] = [
  { id: 1, type: "start", label: "Start", x: 120, y: 20 },
  { id: 2, type: "input", label: "Input n", x: 100, y: 90 },
  { id: 3, type: "loop", label: "i ≤ n", x: 90, y: 160 },
  { id: 4, type: "output", label: "Print i", x: 100, y: 240 },
  { id: 5, type: "end", label: "End", x: 120, y: 320 },
];

export function FlowchartToCode({ dark }: Props) {
  const [lang, setLang] = useState("C");
  const [nodes, setNodes] = useState<FNode[]>(initNodes);
  const [selectedNode, setSelectedNode] =
  useState<number | null>(null);
  const [generated, setGenerated] = useState(false);

  const [generatedCodeOutput,
  setGeneratedCodeOutput] =
  useState("");
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] =
  useState("// Click Generate Code to produce output");

  const [generating, setGenerating] = useState(false);


  const [aiSummary, setAiSummary] =
  useState("");

  const [aiExplanation, setAiExplanation] =
    useState("");

  const [bestPractices, setBestPractices] =
    useState("");



  const card = dark ? "rgba(255,255,255,0.05)" : "white";
  const border = dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E5E7EB";
  const text = dark ? "white" : "#1E293B";
  const sub = dark ? "rgba(255,255,255,0.5)" : "#64748B";



  const addNode = (type: NodeType) => {
    const labels: Record<NodeType, string> = { start: "Start", input: "Input", process: "Process", decision: "Decision", loop: "Loop", output: "Output", end: "End" };
    setNodes(n => {
      const lastNode = n[n.length - 1];

      return [
        ...n,
        {
          id: Date.now(),
          type,
          label: labels[type],
          x: 90,
          y: lastNode ? lastNode.y + 100 : 80
        }
      ];
    });
  };

  const removeNode = (id: number) => setNodes(n => n.filter(x => x.id !== id));

  const copy = () => {

  navigator.clipboard.writeText(
    generatedCodeOutput || ""
  );

  setCopied(true);

  setTimeout(
    () => setCopied(false),
    1500
  );
};

  const download = () => {
    const ext = lang === "Python" ? "py" : lang === "Java" ? "java" : "c";
    const blob = new Blob(
  [generatedCodeOutput || ""],
  { type: "text/plain" }
);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `code.${ext}`; a.click();
  };

  const generateCode = async () => {

  try {

    setGenerating(true);

    const flowchartText =
      nodes
        .map(
          (node) =>
            `${node.type}: ${node.label}`
        )
        .join("\n");

    console.log(
      "FLOWCHART:",
      flowchartText
    );

    const response =
      await axios.post(
        "http://127.0.0.1:8000/ai/to-code",
        {
          language: lang,
          flowchart: flowchartText
        }
      );

    console.log(
      "AI RESPONSE:",
      response.data
    );

    setGeneratedCodeOutput(
      response.data.code || ""
    );

    setAiSummary(
      response.data.summary || ""
    );

    setAiExplanation(
      response.data.explanation || ""
    );

    setBestPractices(
      response.data.best_practices || ""
    );

    setGenerated(true);

  } catch (error) {

    console.error(
      "GENERATE CODE ERROR:",
      error
    );

    alert(
      "Failed to generate code"
    );

  } finally {

    setGenerating(false);

  }
};





  return (
    <div className="p-6 space-y-4" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ color: text }}>Flowchart to Code</h1>
          <p className="text-sm" style={{ color: sub }}>Build a flowchart and generate code automatically</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl overflow-hidden" style={{ border }}>
            {["C", "Python", "Java"].map(l => (
              <button key={l} onClick={() => setLang(l)} className="px-4 py-2.5 text-sm font-medium transition-all"
                style={{ background: lang === l ? "#6C4DFF" : "transparent", color: lang === l ? "white" : text }}>
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={generateCode}
            disabled={generating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              background: generating
                ? "#A78BFA"
                : "linear-gradient(135deg,#6C4DFF,#8B5CF6)",
              cursor: generating
                ? "not-allowed"
                : "pointer",
              opacity: generating
                ? 0.8
                : 1
            }}
          >
            <Play size={14} />

            {generating
              ? "Generating..."
              : "Generate Code"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Flowchart builder */}
        <div className="rounded-2xl p-4" style={{ background: card, border }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm" style={{ color: text }}>Flowchart Builder</h3>
            <div className="flex gap-1 flex-wrap">
              {(["start","input","process","decision","loop","output","end"] as NodeType[]).map(t => (
                <button key={t} onClick={() => addNode(t)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all hover:opacity-80"
                  style={{ background: `${nodeColors[t]}20`, color: nodeColors[t], border: `1px solid ${nodeColors[t]}40` }}>
                  <Plus size={10} /> {t}
                </button>
              ))}
            </div>
          </div>
          {/* Canvas */}
          <div
              className="relative rounded-xl overflow-y-auto overflow-x-hidden"
              style={{
                background: dark ? "#0d1117" : "#F8FAFF",
                height: 500,
                border: `1px solid ${
                  dark
                    ? "rgba(255,255,255,0.06)"
                    : "#E5E7EB"
                }`
              }}
            >
            <svg
                width="100%"
                height={Math.max(
                  500,
                  nodes.length * 120
                )}
                viewBox={`0 0 280 ${Math.max(
                  500,
                  nodes.length * 120
                )}`}
              >
              <defs>
                <marker id="fcarr2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#6C4DFF" />
                </marker>
              </defs>
              {nodes.slice(0, -1).map((n, i) => (
                <line key={n.id + "-line"} x1={n.x + 40} y1={n.y + 30} x2={nodes[i + 1].x + 40} y2={nodes[i + 1].y}
                  stroke="#6C4DFF" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#fcarr2)" />
              ))}
              {nodes.map(n => (
                <g
                  key={n.id}
                  onDoubleClick={() =>
                    setSelectedNode(n.id)
                  }
                  style={{
                    cursor: "pointer"
                  }}
                >
                  {n.type === "start" || n.type === "end" ? (
                    <rect x={n.x} y={n.y} width="80" height="28" rx="14"
                      fill={nodeColors[n.type]} fillOpacity="0.9" />
                  ) : n.type === "decision" || n.type === "loop" ? (
                    <polygon points={`${n.x + 40},${n.y} ${n.x + 80},${n.y + 18} ${n.x + 40},${n.y + 36} ${n.x},${n.y + 18}`}
                      fill={nodeColors[n.type]} fillOpacity="0.25" stroke={nodeColors[n.type]} strokeWidth="1.5" />
                  ) : (
                    <rect x={n.x} y={n.y} width="80" height="28" rx="5"
                      fill={nodeColors[n.type]} fillOpacity="0.2" stroke={nodeColors[n.type]} strokeWidth="1.5" />
                  )}
                  <text x={n.x + 40} y={n.y + 18} textAnchor="middle" dominantBaseline="middle"
                    fill={dark ? "white" : "#1E293B"} fontSize="9" fontFamily="Poppins">{n.label}</text>
                </g>
              ))}
            </svg>
            {/* Node list with delete */}
            <div className="absolute top-2 right-2 space-y-1 max-h-48 overflow-y-auto">
              {nodes.map(n => (
                <div key={n.id} className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs"
                  style={{ background: dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.9)" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: nodeColors[n.type] }} />
                  <input
                    value={n.label}
                    onChange={(e) =>
                      setNodes(
                        nodes.map((node) =>
                          node.id === n.id
                            ? {
                                ...node,
                                label: e.target.value
                              }
                            : node
                        )
                      )
                    }
                    className="bg-transparent outline-none text-xs w-24"
                    style={{ color: text }}
                  />
                  <button onClick={() => removeNode(n.id)} className="ml-1 opacity-60 hover:opacity-100">
                    <Trash2 size={10} style={{ color: "#EF4444" }} />
                  </button>
                </div>
              ))}
            </div>
            {selectedNode && (
              <div
                className="absolute bottom-2 left-2 right-2 p-2 rounded-lg"
                style={{
                  background: dark
                    ? "#111827"
                    : "white",
                  border: `1px solid ${
                    dark
                      ? "rgba(255,255,255,0.1)"
                      : "#E5E7EB"
                  }`
                }}
              >
                <input
                  value={
                    nodes.find(
                      n => n.id === selectedNode
                    )?.label || ""
                  }
                  onChange={(e) => {

                    setNodes(
                      nodes.map(node =>
                        node.id === selectedNode
                          ? {
                              ...node,
                              label: e.target.value
                            }
                          : node
                      )
                    );

                  }}
                  placeholder="Type node text..."
                  className="w-full px-2 py-1 text-sm rounded"
                />
              </div>
            )}
          </div>
        </div>

        {/* Generated code */}
        <div className="rounded-2xl overflow-hidden" style={{ border }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ background: "#0d1117" }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}>output.{lang.toLowerCase() === "python" ? "py" : lang.toLowerCase() === "java" ? "java" : "c"}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={copy} className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium"
                style={{ background: copied ? "rgba(34,197,94,0.2)" : "rgba(108,77,255,0.2)", color: copied ? "#22C55E" : "#6C4DFF" }}>
                <Copy size={12} /> {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={download} className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                <Download size={12} /> Download
              </button>
            </div>
          </div>
          <pre className="p-4 text-sm overflow-auto" style={{ background: "#0d1117", color: "#e6edf3", fontFamily: "JetBrains Mono, monospace", minHeight: 340, lineHeight: 1.7 }}>
            {generated ? generatedCodeOutput : "// Click Generate Code to produce output"}
          </pre>
        </div>
      </div>

      {/* AI Explanation */}
      <div className="rounded-2xl p-5" style={{ background: card, border }}>
        <h3
          className="font-semibold mb-3"
          style={{ color: text }}
        >
          AI Explanation
        </h3>

        {generated ? (
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
                style={{ color: "#6C4DFF" }}
              >
                Algorithm Summary
              </div>

              <p
                className="text-xs"
                style={{
                  color: text,
                  lineHeight: 1.6
                }}
              >
                {aiSummary || "No summary available"}
              </p>
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
                style={{ color: "#6C4DFF" }}
              >
                Code Explanation
              </div>

              <p
                className="text-xs"
                style={{
                  color: text,
                  lineHeight: 1.6
                }}
              >
                {aiExplanation || "No explanation available"}
              </p>
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
                style={{ color: "#6C4DFF" }}
              >
                Best Practices
              </div>

              <p
                className="text-xs"
                style={{
                  color: text,
                  lineHeight: 1.6
                }}
              >
                {bestPractices || "No suggestions available"}
              </p>
            </div>

          </div>
        ) : (
          <p
            className="text-sm"
            style={{ color: sub }}
          >
            Generate code to see AI explanation.
          </p>
        )}
      </div>
    </div>
  );
}
