import express from "express";

const app = express();
const PORT = process.env.PORT || 3002;

const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

app.get("/fibonacci/:n", (req, res) => {
  const n = parseInt(req.params.n);
  if (isNaN(n) || n < 0) {
    res.status(400).json({ error: "Invalid Input" });
    return;
  }
  const startTime = process.hrtime();
  const result = fibonacci(n);
  const endTime = process.hrtime(startTime);
  const executionTimeMs = (endTime[0] * 1000 + endTime[1] / 1e6).toFixed(3);
  res.json({ fibonacci: result, executionTimeMs: executionTimeMs });
});

app.get("/non-blocking", (req, res) => {
  res.send("This is a non-blocking endpoint");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
