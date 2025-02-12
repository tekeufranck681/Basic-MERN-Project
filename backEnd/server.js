import express from "express";
import { connectDB } from "./config/db.js";
import path from "path";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";
const app = express();

dotenv.config();
//middleware
app.use(express.json()); //allows us to accepts json() data in req.body
const __dirname = path.resolve();
//simple route
app.use("/api/products", productRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontEnd/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontEnd", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log("Server running at http://localhost:" + PORT);
});
