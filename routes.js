const express = require('express');
const router = express.Router();
const message = require("./messageModel");
router.post('/createMsg', async (req, res) => {
    const asBody = req.body;
    try {


        const result = await new message({ message: asBody }).save();
        // Returning successfull response
        return res.status(200).json({
            success: true,
            result,
            message: 'Successfully Created',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            result: null,
            message: 'Error',
            error: err,
        });
    }
})
router.get('/createMsg', (req, res) => {
    var challenge = req.query['hub.challenge'];
    if (!challenge) return res.status(302).send({});
    else {
        return res.status(200).send(challenge)
    };
})

router.get('/', (req, res) => {
    return res.status(200).send({Hello: 'Hello World!'});
})

router.get('/message', async (req, res) => {
    try {
        const resultsPromise = await message.find().sort({ _id: -1 }).limit(1);
        return res.status(200).json({
            success: true,
            result: resultsPromise,
            message: 'Successfully Created',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            result: null,
            message: 'Error',
            error: err,
        });
    }
})

module.exports = router;