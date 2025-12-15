import { useState } from "react";

const ManualPredict = () => {
  const [form, setForm] = useState({
    city: "",
    pm25: "",
    pm10: "",
    no2: "",
    so2: "",
    co: "",
    o3: ""
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          pm25: Number(form.pm25),
          pm10: Number(form.pm10),
          no2: Number(form.no2),
          so2: Number(form.so2),
          co: Number(form.co),
          o3: Number(form.o3)
        })
      });

      if (!res.ok) throw new Error("Prediction failed");

      const data = await res.json();
      setResult(data.predicted_aqi);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">
        Manual AQI Prediction
      </h1>

      <form onSubmit={submit} className="grid grid-cols-2 gap-3">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.toUpperCase()}
            value={form[key]}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        ))}

        <button
          type="submit"
          className="col-span-2 bg-black text-white py-2 rounded"
        >
          Predict AQI
        </button>
      </form>

      {result && (
        <div className="mt-4 text-lg">
          Predicted AQI: <b>{result}</b>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default ManualPredict;
