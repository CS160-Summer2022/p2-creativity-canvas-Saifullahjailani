const path = require("path");
const express = require("express");
const app = express();

// Use the environment port or default to 8000 for local development
const port = process.env.PORT || 8000;

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
