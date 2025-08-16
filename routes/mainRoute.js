import express from "express";
const router = express.Router();

router.get("/", async (req,res) => res.send("<h2>API Working Fine !!</h2><h3>Endpoints:</h3><h4>/api/auth</h4<br><h4>/api/tasks</h4>"))
export default router;