const express = require("express");
const userService = require("../services/user");
const router = express.Router();
router.post("/user/register", async (req, res, next) => {
    try {
        const registerData = await userService.addUser(req.body);
        res.send({ "id": registerData._id })
    } catch (error) {
        next(error);
    }
});

router.post("/user/selfAssessment", async (req, res, next) => {
    try {
        const riskPercentage = await userService.selfAssessment(req.body);
        res.send({ "riskPercentage": riskPercentage })
    } catch (error) {
        next(error);
    }
});

router.post("/user/updateTestResult", async (req, res, next) => {
    try {
        console.log(req.body);
        const updatedData = await userService.updateTestResult(req.body);
        res.send({ "updated": true });
    } catch (error) {
        next(error);
    }
});

router.post("/user/zoneStatus", async (req, res, next) => {
    try {
        const { numCases, zoneType } = await userService.zoneStatus(req.body.pinCode);
        res.send({ numCases, zoneType });
    } catch (error) {
        next(error);
    }
});

module.exports = router;