const User = require("../model/user");
const user = {}
user.addUser = async (userObject) => {
    const insertedData = await User.create(userObject);
    return insertedData;
}
user.selfAssessment = async (userData) => {
    const { userId, symptoms, travelHistory, contactWithCovidPatient } = userData;
    const hasUser = await User.find({ _id: userId });
    if (hasUser.length === 0) {
        const error = new Error("User does not exits");
        error.status = 401;
        throw error
    }
    let riskPercentage;
    if (symptoms.length > 2 && (travelHistory || contactWithCovidPatient)) {
        // 95%
        riskPercentage = 95;
    } else if (symptoms.length === 2 && (travelHistory || contactWithCovidPatient)) {
        //75%
        riskPercentage = 75;
    }
    else if (symptoms.length === 1 && (travelHistory || contactWithCovidPatient)) {
        //50%
        riskPercentage = 50;
    }
    else if (symptoms.length === 0 && (!travelHistory || !contactWithCovidPatient)) {
        //5%
        riskPercentage = 5;
    }
    return riskPercentage;
}

user.updateTestResult = async (reqObject) => {
    const updatedData = await User.updateOne({ _id: reqObject.userId }, { $set: { testResult: reqObject.result, covidWorker: reqObject.adminId } });
    return updatedData;
}

user.zoneStatus = async (pinCode) => {
    const zoneData = await User.find({ pinCode, privilage: "NORMAL", testResult: "POSITIVE" });
    const numCases = zoneData.length;
    // RED GREEN ORANGE
    let zoneType;
    if (numCases > 5) {
        zoneType = "RED";
    }
    else if (numCases <= 5 && numCases >= 1) {
        zoneType = "ORANGE";
    }
    else {
        zoneType = "GREEN";
    }
    return {
        numCases, zoneType
    };
}
module.exports = user;