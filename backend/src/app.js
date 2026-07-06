import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import bookRoutes from "../src/routes/books.routes.js";
import cors from "cors";
import abcd from "./middlewares/error.middleware.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser())



const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true, 
};

app.use(cors(corsOptions));

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/test", (req,res)=>{
   res.send("working");
});

app.use((req,res,next)=>{
   console.log(req.method, req.url);
   next();
});
app.use("/api/book", bookRoutes);
app.use("/api/auth", authRouter);
app.use(abcd.errorHandler)
export default app;
