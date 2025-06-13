// @ts-nocheck
import express from 'express';
import PerpustakaanController from '../controller/perpustakaan_controller';
import upload from '../middleware/upload';

const router = express.Router();

router.get("/perpustakaans", PerpustakaanController.index);
router.get("/perpustakaan/:id", PerpustakaanController.show);
router.post("/perpustakaan", upload.single("imageUrl"), PerpustakaanController.store);
router.put("/perpustakaan/:id", upload.single("imageUrl"), PerpustakaanController.update);
router.delete("/perpustakaan/:id", PerpustakaanController.destroy);

export default router;
