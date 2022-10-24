const express = require('express');
const mediaRef = require('./mediaRef');
const router = express.Router();
const message = require("./messageModel");
const axios = require("axios")
var fs = require('fs');
var path = require('path')

router.post('/createMsg', async (req, res) => {
    try {
        const asBody = req.body.entry[0].changes[0].value;
        if (asBody.messages[0].type === 'image') {
            axios.get(
                `https://graph.facebook.com/v14.0/${asBody.messages[0].image.id}`,
                {
                    headers: {
                        Authorization: 'Bearer EAALy5OfzdYwBADDEHwWP7aftx32HpgCZAQZCCAlXw8Le9a6oZAJHgMruqAJJix10xDyCuVI7ixqMFZCQS50KuzNiR7XqaWWYduD9DCQL57QGeveY3YChxrHZAIvPixRqxRj6BWrNfo42Bi99aAQOrtchv8ObluCJ1HZA2kVtUioOPo7qRp6TOXDirU5VJv8gHAYUxkZASUZC5QZDZD',
                    }
                })
                .then(resp => {
                    axios.get(
                        resp?.data?.url,
                        {
                            headers: {
                                Authorization: 'Bearer EAALy5OfzdYwBADDEHwWP7aftx32HpgCZAQZCCAlXw8Le9a6oZAJHgMruqAJJix10xDyCuVI7ixqMFZCQS50KuzNiR7XqaWWYduD9DCQL57QGeveY3YChxrHZAIvPixRqxRj6BWrNfo42Bi99aAQOrtchv8ObluCJ1HZA2kVtUioOPo7qRp6TOXDirU5VJv8gHAYUxkZASUZC5QZDZD',
                            }
                        })
                        .then( response => {
                            console.log(response.data);
                            let r = new mediaRef({
                                mediaRefData:{
                                id: asBody.messages[0].image.id,
                                media: response.data
                            }}).save();
                            
                            return res.status(200).json({
                                success: true,
                                r,
                                message: 'Successfully Created',
                            });
                        });

                }).
                catch(err => {
                    console.log(err)
                })

        }
        else {
            const result = await new message({ message: asBody }).save();
            // Returning successfull response
            return res.status(200).json({
                success: true,
                result,
                message: 'Successfully Created',
            });
        }
    } catch (err) {
        console.log("error")
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


router.get('/test', (req, res) => {
    axios.get(
        `https://graph.facebook.com/v14.0/${asBody.messages[0].image.id}`,
        {
            headers: {
                Authorization: 'Bearer EAALy5OfzdYwBADDEHwWP7aftx32HpgCZAQZCCAlXw8Le9a6oZAJHgMruqAJJix10xDyCuVI7ixqMFZCQS50KuzNiR7XqaWWYduD9DCQL57QGeveY3YChxrHZAIvPixRqxRj6BWrNfo42Bi99aAQOrtchv8ObluCJ1HZA2kVtUioOPo7qRp6TOXDirU5VJv8gHAYUxkZASUZC5QZDZD',
            }
        })
        .then(resp => {


            let r = new mediaRef({
                id: asBody.messages[0].image.id ? null : 'Sorry Found An error',
                URL: resp.data.url
            }).save();
            return res.status(200).json({
                success: true,
                r,
                message: 'Successfully Created',
            });
        }).
        catch(res => {

        })

    return res.status(200).send({ Hello: 'Hello World!' });
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


