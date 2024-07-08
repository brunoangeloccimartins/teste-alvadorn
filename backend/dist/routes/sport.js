"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SportController_1 = require("../controllers/SportController");
const router = (0, express_1.Router)();
router.post("/sports", (req, res) => {
    (0, SportController_1.createSport)(req, res);
});
router.get("/sports", SportController_1.getAllSports);
router.get("/sports/findsport/:name", SportController_1.findSportByName);
router.delete("/sports/:name", SportController_1.deleteSport);
router.put("/sports/:name", SportController_1.updateSport);
exports.default = router;
