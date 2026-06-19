import { useState } from "react";
import { Play, ChevronDown } from "lucide-react";
import dagre from "dagre";
import axios from "axios";
import { useRef } from "react";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Handle,
  Position
} from "reactflow";

import "reactflow/dist/style.css";


interface Props { dark: boolean; }

const defaultCode = "";


const StartNode = ({ data }: any) => (
  <>
    <Handle
      type="target"
      position={Position.Top}
    />

    <div
      style={{
        padding: "12px 24px",
        border: "2px solid #22C55E",
        borderRadius: "999px",
        background: "#ECFDF5",
        minWidth: 120,
        textAlign: "center",
        fontWeight: 600,
      }}
    >
      {data.label}
    </div>

    <Handle
      type="source"
      position={Position.Bottom}
    />
  </>
);

const ProcessNode = ({ data }: any) => (
  <>
    <Handle
      type="target"
      position={Position.Top}
    />

    <div
      style={{
        padding: 12,
        border: "2px solid #6366F1",
        borderRadius: 8,
        background: "#EEF2FF",
        minWidth: 150,
        textAlign: "center",
      }}
    >
      {data.label}
    </div>

    <Handle
      type="source"
      position={Position.Bottom}
    />
  </>
);

const DecisionNode = ({ data }: any) => (
  <>
    <Handle
      type="target"
      position={Position.Top}
    />

    <div
      style={{
        width: 100,
        height: 100,
        transform: "rotate(45deg)",
        border: "2px solid #F59E0B",
        background: "#FFFBEB",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          transform: "rotate(-45deg)",
          width: 90,
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        {data.label}
      </div>
    </div>

    <Handle
      type="source"
      position={Position.Left}
      id="yes"
    />

    <Handle
      type="source"
      position={Position.Right}
      id="no"
    />

    <Handle
      type="source"
      position={Position.Bottom}
      id="continue"
    />
  </>
);

const IONode = ({ data }: any) => (
  <>
    <Handle
      type="target"
      position={Position.Top}
    />

    <div
      style={{
        padding: 12,
        minWidth: 160,
        transform: "skew(-20deg)",
        border: "2px solid #06B6D4",
        background: "#ECFEFF",
      }}
    >
      <div
        style={{
          transform: "skew(20deg)",
          textAlign: "center",
        }}
      >
        {data.label}
      </div>
    </div>

    <Handle
      type="source"
      position={Position.Bottom}
    />
  </>
);

const nodeTypes = {
  start: StartNode,
  process: ProcessNode,
  decision: DecisionNode,
  io: IONode,
};

const getLayoutedElements = (
  nodes: any[],
  edges: any[]
) => {

  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(
    () => ({})
  );

  dagreGraph.setGraph({
    rankdir: "TB",
    ranksep: 90,
    nodesep: 100,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: 140,
      height: 60,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(
      edge.source,
      edge.target
    );
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {

    const nodeWithPosition =
      dagreGraph.node(node.id);

    node.position = {
      x: nodeWithPosition.x,
      y: nodeWithPosition.y,
    };

  });

  return {
    nodes,
    edges,
  };
};

export function CodeToFlowchart({ dark }: Props) {
  const [lang, setLang] = useState("C");
  const [code, setCode] = useState(defaultCode);
  const [generated, setGenerated] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [logicData, setLogicData] = useState<any>(null);
  const [flowchartData, setFlowchartData] = useState<any>(null);
  const [aiExplanation, setAiExplanation] = useState<any>(null);
  const flowchartRef = useRef<HTMLDivElement>(null);
  const [generatedFlowchart, setGeneratedFlowchart] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  const logicTypes = logicData
  ? [
      {
        label: "Sequential Logic",
        confidence:
          logicData.probabilities?.Sequential || 0,
        color: "#6C4DFF",
      },
      {
        label: "Conditional Logic",
        confidence:
          logicData.probabilities?.Conditional || 0,
        color: "#8B5CF6",
      },
      {
        label: "Looping Logic",
        confidence:
          logicData.probabilities?.Looping || 0,
        color: "#22C55E",
      },
      {
        label: "Nested Logic",
        confidence:
          logicData.probabilities?.Nested || 0,
        color: "#F59E0B",
      },
      {
        label: "Function-Based Logic",
        confidence:
          logicData.probabilities?.["Function-Based"] || 0,
        color: "#EC4899",
      },
    ]
  : [];

  const card = dark ? "rgba(255,255,255,0.05)" : "white";
  const border = dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E5E7EB";
  const text = dark ? "white" : "#1E293B";
  const sub = dark ? "rgba(255,255,255,0.5)" : "#64748B";

  const generateFlowchart = async () => {
  try {
    setLoading(true);

    const [flowchartResponse, explainResponse, classifyResponse] = await Promise.all([
      axios.post("https://ai-codeflow-backend.onrender.com/flowchart/generate", {
        language: lang.toLowerCase(),
        code,
      }),

      axios.post("https://ai-codeflow-backend.onrender.com/ai/explain-code", {
        language: lang.toLowerCase(),
        code,
      }),
      axios.post("https://ai-codeflow-backend.onrender.com/code/classify", {
        language: lang.toLowerCase(),
        code,
      }),
    ]);

    console.log("FLOWCHART DATA", flowchartResponse.data);

    const layoutedFlowchart =
  getLayoutedElements(
    flowchartResponse.data.nodes,
    flowchartResponse.data.edges
  );
  setGeneratedFlowchart(flowchartResponse.data);


setFlowchartData(layoutedFlowchart);

    setAiExplanation(
      explainResponse.data.explanation ||
      explainResponse.data
    );

    setLogicData(classifyResponse.data);

    setGenerated(true);

  } catch (error) {
    console.error("FLOWCHART ERROR:", error);
    alert("Failed to generate flowchart");
  } finally {
    setLoading(false);
  }
};


const flowEdges =
  flowchartData?.edges?.map((edge: any) => ({
    ...edge,
    animated: false,

    style: {
      stroke: "#000000",
      strokeWidth: 4,
    },

    labelStyle: {
      fill: "#000000",
      fontWeight: 700,
    },
  })) || [];


  const downloadFlowchart = async () => {

  if (
    !reactFlowInstance ||
    !flowchartData?.nodes?.length
  ) return;

  const viewport =
    document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement;

  const wrapper =
    document.querySelector(
      ".react-flow"
    ) as HTMLElement;

  if (!viewport || !wrapper) return;

  const controls =
    document.querySelector(
      ".react-flow__controls"
    ) as HTMLElement;

  const minimap =
    document.querySelector(
      ".react-flow__minimap"
    ) as HTMLElement;

  const attribution =
    document.querySelector(
      ".react-flow__attribution"
    ) as HTMLElement;

  const originalHeight =
    wrapper.style.height;

  try {

    reactFlowInstance.fitView({
      padding: 0.5,
      includeHiddenNodes: true,
      duration: 0,
    });

    await new Promise(resolve =>
      setTimeout(resolve, 800)
    );

    if (controls)
      controls.style.display = "none";

    if (minimap)
      minimap.style.display = "none";

    if (attribution)
      attribution.style.display = "none";

    // Calculate required export height
    const maxY = Math.max(
      ...flowchartData.nodes.map(
        (n: any) => n.position.y
      )
    );

    wrapper.style.height =
      `${maxY + 150}px`;

    await new Promise(resolve =>
      setTimeout(resolve, 300)
    );

    const dataUrl =
      await toPng(
        wrapper,
        {
          backgroundColor:
            "#ffffff",
          pixelRatio: 3,
          cacheBust: true,
        }
      );

    const link =
      document.createElement("a");

    link.download =
      "flowchart.png";

    link.href =
      dataUrl;

    link.click();

  } catch (err) {

    console.error(
      "Download Error:",
      err
    );

  } finally {

    wrapper.style.height =
      originalHeight;

    if (controls)
      controls.style.display =
        "block";

    if (minimap)
      minimap.style.display =
        "block";

    if (attribution)
      attribution.style.display =
        "block";
  }
};






const saveFlowchart = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    await axios.post(
      "https://ai-codeflow-backend.onrender.com/flowchart/save",
      {
        user_id: user.id,
        title: "My Flowchart",
        code: code,
        flowchart_json: JSON.stringify(
          generatedFlowchart
        )
      }
    );

    setSaveMessage(
      "Flowchart Saved Successfully"
    );

  } catch (error) {

    setSaveMessage(
      "Failed to Save Flowchart"
    );

    console.error(error);
  }
};







  return (
    <div className="p-6 space-y-4" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ color: text }}>Code to Flowchart</h1>
          <p className="text-sm" style={{ color: sub }}>Convert your code into a visual flowchart using AI</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Language dropdown */}
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ background: card, border, color: text }}>
              {lang} <ChevronDown size={14} />
            </button>
            {langOpen && (
              <div className="absolute top-full mt-1 left-0 rounded-xl overflow-hidden shadow-xl z-10 w-28"
                style={{ background: dark ? "#1e2445" : "white", border }}>
                {["C", "Python", "Java"].map(l => (
                  <button key={l} onClick={() => { setLang(l); setLangOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-purple-500/10 transition-colors"
                    style={{ color: l === lang ? "#6C4DFF" : text }}>{l}</button>
                ))}
              </div>
            )}
          </div>
          <button
  onClick={generateFlowchart}
  disabled={loading}
  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
  style={{ background: "linear-gradient(135deg,#6C4DFF,#8B5CF6)" }}
>
  <Play size={14} />

  {loading ? "Generating..." : "Generate Flowchart"}
</button>

{generated && (
  <button
    onClick={saveFlowchart}
    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
  >
    Save Flowchart
  </button>
)}

{saveMessage && (
  <p
    className="mt-2 text-sm font-medium"
    style={{
      color:
        saveMessage ===
        "Flowchart Saved Successfully"
          ? "#22C55E"
          : "#EF4444"
    }}
  >
    {saveMessage}
  </p>
)}


<button
  onClick={downloadFlowchart}
  disabled={!generated}
  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
  style={{
    background:
      generated
        ? "#22C55E"
        : "#94A3B8",
  }}
>
  Download PNG
</button>
        </div>
      </div>

      {/* Main panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code editor */}
        <div
  className="rounded-2xl overflow-hidden"
  style={{
    border,
    height: 500
  }}
>

  {/* Header */}
  <div
    className="flex items-center justify-between px-4 py-3"
    style={{ background: "#0d1117" }}
  >
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />

      <span
        className="ml-2 text-xs"
        style={{
          color: "rgba(255,255,255,0.4)",
          fontFamily: "JetBrains Mono, monospace"
        }}
      >
        main.
        {lang === "Python"
          ? "py"
          : lang === "Java"
          ? "java"
          : "c"}
      </span>
    </div>

    {/* Language Dropdown */}
    <div className="relative">
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="px-3 py-1 rounded-lg text-xs outline-none cursor-pointer"
        style={{
          background: "#161b22",
          color: "#e6edf3",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <option value="C">C</option>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
      </select>
    </div>
  </div>

  {/* Code Editor */}
  <textarea
    value={code}
    onChange={(e) => setCode(e.target.value)}
    className="w-full h-full p-4 text-sm resize-none outline-none"
    style={{
      background: "#0d1117",
      color: "#e6edf3",
      fontFamily: "JetBrains Mono, monospace",
      lineHeight: 1.6
    }}
    placeholder={`Paste your ${lang} code here...`}
  />
</div>

        {/* Flowchart viewer */}
        {/* Flowchart viewer */}
<div
  ref={flowchartRef}
  className="rounded-2xl overflow-hidden"
  style={{
    background: card,
    border,
    height: 500
  }}
>
  {flowchartData ? (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
  nodes={flowchartData?.nodes || []}
  edges={flowEdges}
  nodeTypes={nodeTypes}
  fitView
  fitViewOptions={{
    padding: 0.2
  }}
  onInit={setReactFlowInstance}
>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  ) : (
    <div
      className="h-full flex items-center justify-center"
      style={{
        color: sub
      }}
    >
      Generate a flowchart to view visualization
    </div>
  )}
</div>
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Logic classification */}
<div
  className="rounded-2xl p-5"
  style={{ background: card, border }}
>
  <h3
    className="font-semibold mb-2"
    style={{ color: text }}
  >
    Logic Classification
  </h3>

  {logicData && (
    <div
      className="text-sm font-medium mb-4"
      style={{ color: "#6C4DFF" }}
    >
      Predicted Logic: {logicData.logic_type} ({logicData.confidence}%)
    </div>
  )}

  <div className="space-y-3">
    {logicTypes.map((l) => (
      <div key={l.label}>
        <div className="flex justify-between text-sm mb-1">
          <span style={{ color: text }}>{l.label}</span>
          <span style={{ color: sub }}>
            {generated ? `${l.confidence}%` : "--"}
          </span>
        </div>

        <div
          className="h-2 rounded-full"
          style={{
            background: dark
              ? "rgba(255,255,255,0.08)"
              : "#F1F5F9",
          }}
        >
          <div
            className="h-2 rounded-full transition-all duration-700"
            style={{
              width: generated
                ? `${l.confidence}%`
                : "0%",
              background: l.color,
            }}
          />
        </div>
      </div>
    ))}
  </div>
</div>

        {/* AI Explanation */}
        <div className="rounded-2xl p-5" style={{ background: card, border }}>
          <h3 className="font-semibold mb-4" style={{ color: text }}>AI Explanation</h3>
          {generated && aiExplanation ? (
  <div className="space-y-3">

    <div
      className="rounded-xl p-3"
      style={{ background: "rgba(108,77,255,0.08)" }}
    >
      <div
        className="text-xs font-medium mb-1"
        style={{ color: "#6C4DFF" }}
      >
        Algorithm Summary
      </div>

      <p
        className="text-sm"
        style={{ color: text }}
      >
        {aiExplanation.summary}
      </p>
    </div>

    <div
      className="rounded-xl p-3"
      style={{
        background: dark
          ? "rgba(255,255,255,0.04)"
          : "#F6F7FB"
      }}
    >
      <div
        className="text-xs font-medium mb-2"
        style={{ color: sub }}
      >
        Step-by-Step
      </div>

      {aiExplanation.steps?.map(
        (step: string, index: number) => (
          <p
            key={index}
            className="text-xs mb-1"
            style={{ color: text }}
          >
            {index + 1}. {step}
          </p>
        )
      )}
    </div>

    <div className="flex gap-2">

      <div
        className="flex-1 rounded-xl p-3 text-center"
        style={{
          background: "rgba(34,197,94,0.1)"
        }}
      >
        <div
          className="text-xs"
          style={{ color: sub }}
        >
          Time Complexity
        </div>

        <div
          className="font-semibold text-sm"
          style={{ color: "#22C55E" }}
        >
          {aiExplanation.time_complexity}
        </div>
      </div>

      <div
        className="flex-1 rounded-xl p-3 text-center"
        style={{
          background: "rgba(245,158,11,0.1)"
        }}
      >
        <div
          className="text-xs"
          style={{ color: sub }}
        >
          Space Complexity
        </div>

        <div
          className="font-semibold text-sm"
          style={{ color: "#F59E0B" }}
        >
          {aiExplanation.space_complexity}
        </div>
      </div>

    </div>

    <div
      className="rounded-xl p-3"
      style={{
        background: "rgba(59,130,246,0.08)"
      }}
    >
      <div
        className="text-xs font-medium mb-1"
        style={{ color: "#3B82F6" }}
      >
        Logic Type
      </div>

      <p
        className="text-sm"
        style={{ color: text }}
      >
        {aiExplanation.logic_type}
      </p>
    </div>

  </div>
) : (
  <p
    className="text-sm"
    style={{ color: sub }}
  >
    Generate a flowchart to see AI analysis.
  </p>
)}
        </div>
      </div>
    </div>
  );
}
