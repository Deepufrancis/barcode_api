import { Router, RequestHandler } from "express";
import bwipjs from "bwip-js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Barcode
 *   description: Barcode generation API
 */

/**
 * @swagger
 * /api/barcode:
 *   post:
 *     summary: Generate a barcode from given text
 *     tags: [Barcode]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: "1234567890"
 *                 description: Text to encode into barcode
 *     responses:
 *       200:
 *         description: Successfully generated barcode
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 text:
 *                   type: string
 *                   example: "1234567890"
 *                 barcode:
 *                   type: string
 *                   example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
 *       400:
 *         description: Missing text input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Text is required"
 *       500:
 *         description: Server error during barcode generation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error generating barcode"
 */

const generateBarcode: RequestHandler = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ message: "Text is required" });
      return;
    }

    const png = await bwipjs.toBuffer({
      bcid: "code128",
      text,
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: "center",
    });

    const base64 = `data:image/png;base64,${png.toString("base64")}`;
    res.status(200).json({ success: true, text, barcode: base64 });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating barcode" });
    return;
  }
};

router.post("/", generateBarcode);

export default router;
