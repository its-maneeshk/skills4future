import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    temperature: "",
    apparent_temp: "",
    humidity: "",
    wind_speed: "",
    pressure: "",
    visibility: ""
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResult(data.prediction);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">🌦️ Weather Predictor</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        {Object.keys(form).map((field) => (
          <input
            key={field}
            type="number"
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.replace("_", " ")}
            className="border p-2 w-full rounded"
            required
          />
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Predict
        </button>
      </form>
      {result && (
        <h2 className="mt-4 text-lg font-semibold">
          Prediction: {result}
        </h2>
      )}
    </div>
  );
}

export default App;
