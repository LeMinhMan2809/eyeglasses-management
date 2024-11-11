const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const http = require("http");
const socketIO = require("socket.io");

//Routes//
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const userRoute = require("./routes/user");

const cityRoute = require("./routes/city");
const districtRoute = require("./routes/district");
const wardRoute = require("./routes/ward");

const addressRoute = require("./routes/address");
// const cartRoute = require("./routes/cart");

const connectDB = require("./config/db");
const orderRouter = require("./routes/order");
// const statusRouter = require("./routes/status");

const reviewRouter = require("./routes/review");
const brandRoute = require("./routes/brand");
// const vnpayRouter = require("./routes/orderOnline");

const orderDetailRouter = require("./routes/orderDetail");
const wishRouter = require("./routes/wish");
const supplierRouter = require("./routes/supplier");
const inventoryRouter = require("./routes/inventory");
const inventoryDetailRouter = require("./routes/inventoryDetail");
const blogRouter = require("./routes/blog");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5172", "http://localhost:5173"], // React app port
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Optional: Allow cookies to be sent across origins
  },
});

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Listen for messages from the client
  socket.on("send_message", (data) => {
    console.log("Received message:", data);

    // Broadcast message to all connected clients (admin)
    io.emit("receive_message", data);
  });

  // User disconnected
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/product", productRoute);
app.use("/api/brand", brandRoute);
app.use("/images", express.static("uploads"));
app.use("/images", express.static("uploads/user"));
app.use("/api/category", categoryRoute);
app.use("/api/user", userRoute);
// app.use("/api/cart", cartRoute);
app.use("/api/address", addressRoute);

app.use("/api/city", cityRoute);
app.use("/api/district", districtRoute);
app.use("/api/ward", wardRoute);

app.use("/api/orders", orderRouter);
app.use("/api/orderDetail", orderDetailRouter);
// app.use("/api/status", statusRouter);

app.use("/api/review", reviewRouter);
app.use("/api/wishlist", wishRouter);

app.use("/api/supplier", supplierRouter);

app.use("/api/blog", blogRouter);

app.use("/api/inventory", inventoryRouter);
app.use("/api/inventoryDetail", inventoryDetailRouter);

//DB Connection
connectDB();

server.listen(process.env.PORT, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}`);
});
