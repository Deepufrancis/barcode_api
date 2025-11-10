import { Router } from "express";
import barRoutes from "./barRoutes";


const router = Router();


router.use("/barcode", barRoutes);

export default router;
