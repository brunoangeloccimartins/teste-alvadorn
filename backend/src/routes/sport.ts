import { Router } from "express";
import { createSport, getAllSports, findSportByName, updateSport, deleteSport } from "../controllers/SportController";

const router = Router();

router.post("/sports", (req, res) => {
  createSport(req, res);
});
router.get("/sports", getAllSports);
router.get("/sports/findsport/:name", findSportByName);
router.delete("/sports/:name", deleteSport);
router.put("/sports/:id", updateSport);

export default router;
