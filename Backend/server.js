import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import "dotenv/config.js";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

import adminRouter from "./routes/adminRoute.js";
import notificationRoute from "./routes/notificationRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin",adminRouter);
app.use("/api/notification", notificationRoute)
app.use("/api/notification/read", notificationRoute)

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
// mongodb+srv://Biswas:9814136254@cluster0.2vlb9.mongodb.net/?
