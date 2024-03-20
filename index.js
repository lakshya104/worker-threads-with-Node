import express from "express";
import { error } from "node:console";
import { Worker } from "node:worker_threads";

const app = express();
const PORT = process.env.PORT || 3002;

app.get("/fibonacci/:n", (req, res) => {
  const n = parseInt(req.params.n);
  if (isNaN(n) || n < 0) {
    res.status(400).json({ error: "Invalid Input" });
    return;
  }

  const worker = new Worker('./worker.js', {workerData:n})
  worker.on('message', (result)=>{
    res.json({fibonacci:result})
  })
 
  worker.on('error', (error)=>{
    console.error('Worker error:', error);
    res.status(500).json({error:"Internal Server Error"})
  })
});

app.get("/non-blocking", (req, res) => {
  res.send("This is a non-blocking endpoint");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
