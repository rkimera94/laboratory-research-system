const express = require("express");
const router = express.Router();

const ReagentController = require("../controllers/Reagent.Controller");

router.get("/", ReagentController.findAllReagents);

router.post("/", ReagentController.createReagent);

router.get("/:id", ReagentController.findReagentByID);

router.patch("/:id", ReagentController.updateReagent);

router.delete("/:id", ReagentController.deleteReagent);
module.exports = router;
