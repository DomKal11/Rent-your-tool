require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

require("./config")(app);

// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const toolRouter = require("./routes/tool.routes");
app.use("/api", toolRouter);

const commentRouter = require("./routes/comment.routes");
app.use("/api", commentRouter);

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;
