const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

// SSR Setup
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  extensions: [".jsx", ".js"],
  ignore: [/node_modules/],
});

const React = require("react");
const ReactDOMServer = require("react-dom/server");
// ❌ Prevent node from trying to load CSS
require.extensions['.css'] = () => {};
require.extensions['.scss'] = () => {};
require.extensions['.sass'] = () => {};
require.extensions['.png'] = () => {};
require.extensions['.webp'] = () => {}; 
require.extensions['.jpeg'] = () => {}; 
require.extensions['.jpg'] = () => {};
require.extensions['.svg'] = () => {};
const SSRApp = require("../tadoba-react/src/ssrApp").default; 

const app = express();

//  Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
const routes = require("./routes/index");
app.use("/api", routes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Static Frontend Build
app.use(express.static(path.resolve(__dirname, "../tadoba-react/dist")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// SR Handler (only for non-admin)
app.get("*", (req, res) => {
  const isAdmin = req.url.startsWith("/admin");
  const indexPath = path.resolve(__dirname, "../tadoba-react/dist/index.html");

  fs.readFile(indexPath, "utf-8", (err, html) => {
    if (err) {
      console.error("Failed to load HTML:", err);
      return res.status(500).send("Server Error");
    }

    if (isAdmin) {
      return res.send(html); // Admin panel stays SPA
    }

    const appHtml = ReactDOMServer.renderToString(
      React.createElement(SSRApp, { url: req.url })
    );    

    const finalHtml = html.replace(
      `<div id="root"><!--app-html--></div>`,
      `<div id="root">${appHtml}</div>`
    );

    res.status(200).send(finalHtml);
  });
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`SSR Server running at http://localhost:${PORT}`)
);
