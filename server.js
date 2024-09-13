import express from "express";
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock SQL query endpoint
app.get("/sql-query", (req, res) => {
  const { input } = req.query;
  // Simulate SQL query handling (for demonstration purposes)
  // In a real scenario, avoid directly using user input in SQL queries
  res.send(`Executed query with input: ${input}`);
});

// Mock unsecured API endpoint
app.get("/profile", (req, res) => {
  const { userId } = req.query;
  res.send(`Profile data for user ID: ${userId}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
