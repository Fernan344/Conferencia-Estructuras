import controller from '../controller/api.controller'
import express from 'express'
const router = express.Router();

router.get("/ping", controller.ping);
router.get("/getTree", controller.buildTree);
router.get("/search/:value", controller.getMatchs);
router.get("/getValue/:value", controller.getValue);

export default router;