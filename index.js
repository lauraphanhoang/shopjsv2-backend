require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
