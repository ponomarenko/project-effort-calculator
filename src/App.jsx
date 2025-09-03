import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calculator, Download, RotateCcw, Settings } from "lucide-react";

const App = () => {
  const [inputs, setInputs] = useState({
    dev: 20,
    qa: 0,
    arch: 4,
    pm: 3,
  });

  const [coefficients, setCoefficients] = useState({
    focusFactor: 1.2,
    riskFactor: 0.25,
    commBuffer: 0.15,
  });

  const [useAutoQA, setUseAutoQA] = useState(true);
  const [qaPercentage, setQaPercentage] = useState(30);
  const [chartType, setChartType] = useState("pie"); // 'pie' or 'bar'

  // Автоматичний перерахунок QA
  useEffect(() => {
    if (useAutoQA) {
      setInputs((prev) => ({
        ...prev,
        qa: Math.round((prev.dev * qaPercentage) / 100),
      }));
    }
  }, [useAutoQA, qaPercentage, inputs.dev]);

  // Розрахунки
  const baseMD = inputs.dev + inputs.qa + inputs.arch + inputs.pm;
  const coreEffort = baseMD * coefficients.focusFactor;
  const riskBuffer = coreEffort * coefficients.riskFactor;
  const commBufferMD = baseMD * coefficients.commBuffer;
  const totalMD = coreEffort + riskBuffer + commBufferMD;

  // Дані для графіка
  const pieData = [
    {
      name: "Development",
      value: inputs.dev * coefficients.focusFactor,
      color: "#3b82f6",
    },
    {
      name: "QA",
      value: inputs.qa * coefficients.focusFactor,
      color: "#10b981",
    },
    {
      name: "Arch/Research",
      value: inputs.arch * coefficients.focusFactor,
      color: "#f59e0b",
    },
    {
      name: "PM/BA/Management",
      value: inputs.pm * coefficients.focusFactor,
      color: "#8b5cf6",
    },
    { name: "Risk Buffer", value: riskBuffer, color: "#ef4444" },
    { name: "Communication Buffer", value: commBufferMD, color: "#f97316" },
  ].filter((item) => item.value > 0);

  const barData = pieData.map((item) => ({
    name: item.name,
    value: parseFloat(item.value.toFixed(1)),
  }));

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: Math.max(0, parseFloat(value) || 0),
    }));
  };

  const handleCoefficientChange = (field, value) => {
    setCoefficients((prev) => ({
      ...prev,
      [field]: Math.max(0, parseFloat(value) || 0),
    }));
  };

  const resetForm = () => {
    setInputs({ dev: 0, qa: 0, arch: 0, pm: 0 });
    setCoefficients({ focusFactor: 1.0, riskFactor: 0, commBuffer: 0 });
    setQaPercentage(30);
    setUseAutoQA(true);
  };

  const exportToCSV = () => {
    const csvData = [
      ["Parameter", "Value"],
      ["Development (MD)", inputs.dev],
      ["QA (MD)", inputs.qa],
      ["Architecture/Research (MD)", inputs.arch],
      ["PM/BA/Management (MD)", inputs.pm],
      ["Focus Factor", coefficients.focusFactor],
      ["Risk Factor", coefficients.riskFactor],
      ["Communication Buffer", coefficients.commBuffer],
      [""],
      ["Results", ""],
      ["Base MD", baseMD.toFixed(1)],
      ["Core Effort (after Focus)", coreEffort.toFixed(1)],
      ["Risk Buffer", riskBuffer.toFixed(1)],
      ["Communication Buffer", commBufferMD.toFixed(1)],
      ["Total MD", totalMD.toFixed(1)],
    ];

    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "md-estimation.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#f97316",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-800">MD Estimator</h1>
          </div>
          <p className="text-slate-600 text-lg">
            Calculator for estimating IT initiatives in man-days
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Project Parameters
              </h2>

              {/* Main Inputs */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Development (MD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={inputs.dev}
                    onChange={(e) => handleInputChange("dev", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-700">
                      QA (MD)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="autoQA"
                        checked={useAutoQA}
                        onChange={(e) => setUseAutoQA(e.target.checked)}
                        className="rounded"
                      />
                      <label
                        htmlFor="autoQA"
                        className="text-xs text-slate-600"
                      >
                        Auto
                      </label>
                    </div>
                  </div>
                  {useAutoQA ? (
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={qaPercentage}
                        onChange={(e) =>
                          setQaPercentage(parseInt(e.target.value))
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>0%</span>
                        <span>{qaPercentage}% від Dev</span>
                        <span>100%</span>
                      </div>
                      <div className="px-4 py-2 bg-slate-50 rounded-lg text-center">
                        {inputs.qa} MD
                      </div>
                    </div>
                  ) : (
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={inputs.qa}
                      onChange={(e) => handleInputChange("qa", e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Architecture/Research (MD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={inputs.arch}
                    onChange={(e) => handleInputChange("arch", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    PM/BA/Management (MD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={inputs.pm}
                    onChange={(e) => handleInputChange("pm", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Coefficients */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Coefficients
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Focus Factor: {coefficients.focusFactor}
                  </label>
                  <input
                    type="range"
                    min="1.0"
                    max="1.5"
                    step="0.05"
                    value={coefficients.focusFactor}
                    onChange={(e) =>
                      handleCoefficientChange("focusFactor", e.target.value)
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>1.0</span>
                    <span>1.5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Risk Factor: {coefficients.riskFactor}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.05"
                    value={coefficients.riskFactor}
                    onChange={(e) =>
                      handleCoefficientChange("riskFactor", e.target.value)
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>0</span>
                    <span>0.5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Communication Buffer: {coefficients.commBuffer}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.3"
                    step="0.05"
                    value={coefficients.commBuffer}
                    onChange={(e) =>
                      handleCoefficientChange("commBuffer", e.target.value)
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>0</span>
                    <span>0.3</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={resetForm}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={exportToCSV}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                Estimation Results
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {baseMD.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-600">Base MD</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {coreEffort.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-600">Core Effort</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {(riskBuffer + commBufferMD).toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-600">Total Buffers</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg border-2 border-slate-300">
                  <div className="text-3xl font-bold text-slate-800">
                    {totalMD.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-600">Total MD</div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-800">
                    Role Breakdown:
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Development:</span>
                      <span className="font-mono">
                        {(inputs.dev * coefficients.focusFactor).toFixed(1)} MD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>QA:</span>
                      <span className="font-mono">
                        {(inputs.qa * coefficients.focusFactor).toFixed(1)} MD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Arch/Research:</span>
                      <span className="font-mono">
                        {(inputs.arch * coefficients.focusFactor).toFixed(1)} MD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>PM/BA/Management:</span>
                      <span className="font-mono">
                        {(inputs.pm * coefficients.focusFactor).toFixed(1)} MD
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-800">Buffers:</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Risk Buffer:</span>
                      <span className="font-mono">
                        {riskBuffer.toFixed(1)} MD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Communication Buffer:</span>
                      <span className="font-mono">
                        {commBufferMD.toFixed(1)} MD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-slate-800">
                  Effort Distribution
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setChartType("pie")}
                    className={`px-3 py-1 rounded ${
                      chartType === "pie"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    Pie
                  </button>
                  <button
                    onClick={() => setChartType("bar")}
                    className={`px-3 py-1 rounded ${
                      chartType === "bar"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    Bar
                  </button>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "pie" ? (
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) =>
                          `${name}: ${value.toFixed(1)}`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `${value.toFixed(1)} MD`,
                          "Effort",
                        ]}
                      />
                    </PieChart>
                  ) : (
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                        fontSize={12}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} MD`, "Effort"]}
                      />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
