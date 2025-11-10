import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { getEnvVariable } from "./utils/helpers";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { setupSwagger } from "./config/swagger";



const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Middlewares
app.use(cors({
  origin: [getEnvVariable('FRONT_END_URL')],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


setupSwagger(app);

// Root route
app.get("/", (_req, res) => {
  res.send("Hai there, API is running...");
});

app.use("/api", routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
