const express = require('express');
const mediaRef = require('./mediaRef');
const router = express.Router();
const message = require("./messageModel");
router.post('/createMsg', async (req, res) => {
    
    try {
        const asBody = req.body.entry[0].changes[0].value;
        if(asBody.messages[0].type === 'image'){
            axios.get(
                `https://graph.facebook.com/v14.0/${asBody.messages[0].image.id}`, 
                {
                headers: {
                  Authorization: 'Bearer EAALy5OfzdYwBAMZARHd9K2IZBXOxW7ZCoBJsmiCMgeaSHI1VO039IJ34CKWgaNIZBT4ryXEs0vLJvOpfjdXNpGuQd8DNjFgZCladDoKmd407LmHg5e4WtdfbUInQmmk8aSkakOBus969yfg1KL7HEQpnUSXnS4ZBdtiuz4jyGIiMiSqOf7iFtixrog39tscSqkumxz8AAYawZDZD',
                }
              })
            .then(async res => {
                // axios.get(
                //     res.data.url,
                //     {
                //     headers: {
                //       Authorization: 'Bearer EAALy5OfzdYwBAMZARHd9K2IZBXOxW7ZCoBJsmiCMgeaSHI1VO039IJ34CKWgaNIZBT4ryXEs0vLJvOpfjdXNpGuQd8DNjFgZCladDoKmd407LmHg5e4WtdfbUInQmmk8aSkakOBus969yfg1KL7HEQpnUSXnS4ZBdtiuz4jyGIiMiSqOf7iFtixrog39tscSqkumxz8AAYawZDZD',
                //     }
                //   })
                // .then(async res => {
                //     let r = await new mediaRef({
                //         id: asBody.messages[0].image.id,
                //         media: JSON.stringify(response.data)
                //     }).save();
                //     return res.status(200).json({
                //         success: true,
                //         r,
                //         message: 'Successfully Created',
                //     });
                // })
                let r = await new mediaRef({
                            id: asBody.messages[0].image.id,
                            media: res
                        }).save();
                        return res.status(200).json({
                            success: true,
                            r,
                            message: 'Successfully Created',
                        });

            })
          
        }
        else{
            const result = await new message({ message: asBody }).save();
            // Returning successfull response
            return res.status(200).json({
                success: true,
                result,
                message: 'Successfully Created',
            });
        }
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