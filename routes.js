const express = require("express");
const router = express.Router();
const message = require("./messageModel");
const axios = require("axios");
var fs = require("fs");
var path = require("path");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Assets/send");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileUpload = multer({ storage: storage });

router.post("/createMsg", async (req, res) => {
  try {
    const asBody = req.body.entry[0].changes[0].value;
    console.log("once", asBody.messages[0]);
    if (asBody.messages[0].type === "image") {
      axios
        .get(
          `https://graph.facebook.com/v15.0/${asBody.messages[0].image.id}`,
          {
            headers: {
              Authorization:
                "Bearer EAALy5OfzdYwBAMsC7Mu80hZCwDAo1vOd0m4nFzqBBggTizysElfIsRD6Bg9f5fxYZBDqEpaU0Rb4oJd2rH9jcLEQ5KurgBJZA1GsMOWAnPD6HmCBtrp5Kj1eH5XYOpruc02PIgTuoR2VgZA7nvnyxpQ75r2KnlUpZA4iwD1lD5Gn71FOrHwWUkE2doDCjAwSsAhl5WmyUEAZDZD",
            },
          }
        )
        .then((resp) => {
          axios
            .get(resp?.data?.url, {
              responseType: "stream",
              headers: {
                Authorization:
                  "Bearer EAALy5OfzdYwBAMsC7Mu80hZCwDAo1vOd0m4nFzqBBggTizysElfIsRD6Bg9f5fxYZBDqEpaU0Rb4oJd2rH9jcLEQ5KurgBJZA1GsMOWAnPD6HmCBtrp5Kj1eH5XYOpruc02PIgTuoR2VgZA7nvnyxpQ75r2KnlUpZA4iwD1lD5Gn71FOrHwWUkE2doDCjAwSsAhl5WmyUEAZDZD",
              },
            })
            .then(async (response) => {
              try {
                const writer = fs.createWriteStream(
                  `./Assets/${asBody.messages[0].image.id}.jpeg`
                );
                response.data.pipe(writer);
                const result = await new message({
                  message: { body: asBody, way: "receive" },
                }).save();
                writer.on("error", (err) => {
                  console.log(err);
                });
                writer.on("error", (err) => {
                  console.log(err);
                });

                return res.status(200).json({
                  success: true,
                  result,
                  message: "Successfully Created",
                });
              } catch {
                return res.status(500).json({
                  success: false,
                  message: "File Writing Failed",
                });
              }
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (asBody.messages[0].type === "audio") {
      axios
        .get(
          `https://graph.facebook.com/v15.0/${asBody.messages[0].audio.id}`,
          {
            headers: {
              Authorization:
                "Bearer EAALy5OfzdYwBAMsC7Mu80hZCwDAo1vOd0m4nFzqBBggTizysElfIsRD6Bg9f5fxYZBDqEpaU0Rb4oJd2rH9jcLEQ5KurgBJZA1GsMOWAnPD6HmCBtrp5Kj1eH5XYOpruc02PIgTuoR2VgZA7nvnyxpQ75r2KnlUpZA4iwD1lD5Gn71FOrHwWUkE2doDCjAwSsAhl5WmyUEAZDZD",
            },
          }
        )
        .then((resp) => {
          console.log(resp?.data);
          axios
            .get(resp?.data?.url, {
              responseType: "stream",
              headers: {
                Authorization:
                  "Bearer EAALy5OfzdYwBAMsC7Mu80hZCwDAo1vOd0m4nFzqBBggTizysElfIsRD6Bg9f5fxYZBDqEpaU0Rb4oJd2rH9jcLEQ5KurgBJZA1GsMOWAnPD6HmCBtrp5Kj1eH5XYOpruc02PIgTuoR2VgZA7nvnyxpQ75r2KnlUpZA4iwD1lD5Gn71FOrHwWUkE2doDCjAwSsAhl5WmyUEAZDZD",
              },
            })
            .then(async (response) => {
              try {
                const writer = fs.createWriteStream(
                  `./Assets/${asBody.messages[0].id}.ogg`
                );
                response.data.pipe(writer);
                const result = await new message({
                  message: { body: asBody, way: "receive" },
                }).save();
                writer.on("error", (err) => {
                  console.log(err);
                });
                writer.on("error", (err) => {
                  console.log(err);
                });
                return res.status(200).json({
                  success: true,
                  result,
                  message: "Successfully Created",
                });
              } catch {
                return res.status(500).json({
                  success: false,
                  message: "File Writing Failed",
                });
              }
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (asBody.messages[0].type === "video") {
      axios
        .get(
          `https://graph.facebook.com/v15.0/${asBody.messages[0].video.id}`,
          {
            headers: {
              Authorization:
                "Bearer EAALy5OfzdYwBAMsC7Mu80hZCwDAo1vOd0m4nFzqBBggTizysElfIsRD6Bg9f5fxYZBDqEpaU0Rb4oJd2rH9jcLEQ5KurgBJZA1GsMOWAnPD6HmCBtrp5Kj1eH5XYOpruc02PIgTuoR2VgZA7nvnyxpQ75r2KnlUpZA4iwD1lD5Gn71FOrHwWUkE2doDCjAwSsAhl5WmyUEAZDZD",
            },
          }
        )
        .then((resp) => {
          console.log(resp?.data);
          axios
            .get(resp?.data?.url, {
              responseType: "stream",
              headers: {
                Authorization:
                  "Bearer EAALy5OfzdYwBAMsC7Mu80hZCwDAo1vOd0m4nFzqBBggTizysElfIsRD6Bg9f5fxYZBDqEpaU0Rb4oJd2rH9jcLEQ5KurgBJZA1GsMOWAnPD6HmCBtrp5Kj1eH5XYOpruc02PIgTuoR2VgZA7nvnyxpQ75r2KnlUpZA4iwD1lD5Gn71FOrHwWUkE2doDCjAwSsAhl5WmyUEAZDZD",
              },
            })
            .then(async (response) => {
              try {
                const writer = fs.createWriteStream(
                  `./Assets/${asBody.messages[0].id}.mp4`
                );
                response.data.pipe(writer);
                const result = await new message({
                  message: { body: asBody, way: "receive" },
                }).save();
                writer.on("error", (err) => {
                  console.log(err);
                });
                writer.on("error", (err) => {
                  console.log(err);
                });
                return res.status(200).json({
                  success: true,
                  result,
                  message: "Successfully Created",
                });
              } catch {
                return res.status(500).json({
                  success: false,
                  message: "File Writing Failed",
                });
              }
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const result = await new message({
        message: { body: asBody, way: "receive" },
      }).save();
      console.log(asBody);
      return res.status(200).json({
        success: true,
        result,
        message: "Successfully Created",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Error",
      error: err,
    });
  }
});

router.get("/createMsg", (req, res) => {
  var challenge = req.query["hub.challenge"];
  if (!challenge) return res.status(302).send({});
  else {
    return res.status(200).send(challenge);
  }
});
//?messageId={messageId}&fileType={type of Your File {audio, video, text}}
router.get("/loadfile", (request, response) => {
  const messageFileId = request.query.messageId;
  const mediaType = request.query.fileType;

  var filePath = path.join(
    __dirname,
    mediaType === "audio"
      ? `./Assets/${messageFileId}.ogg`
      : mediaType === "video"
      ? `./Assets/${messageFileId}.mp4`
      : mediaType === "image"
      ? `./Assets/${messageFileId}.jpeg`
      : `./Assets/${messageFileId}.bin`
  );
  var stat = fs.statSync(filePath);
  console.log(stat);
  response.writeHead(200, {
    "Content-Type":
      mediaType === "audio"
        ? `audio/ogg`
        : mediaType === "video"
        ? `video/mp4`
        : mediaType === "image"
        ? `image/jpeg`
        : `binary/bin`,
    "Content-Length": stat.size,
  });

  var readStream = fs.createReadStream(filePath);
  readStream.on("data", function (data) {
    response.write(data);
  });

  readStream.on("end", function () {
    response.end();
  });
});

router.get("/loadAllMesssages", async (request, response) => {
  const messages = await message
    .find({
      "message.messages.type": request.query.messageType,
      "message.contacts.wa_id": request.query.number,
    })
    .sort({ createdAt: "descending" })
    .exec();

  response.status(200).send(messages);
});

router.get("/message", async (req, res) => {
  try {
    const resultsPromise = await message.find().sort({ _id: -1 }).limit(1);
    return res.status(200).json({
      success: true,
      result: resultsPromise,
      message: "Successfully Created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Error",
      error: err,
    });
  }
});

router.post("/sendmessage", fileUpload.single("filedata"), async (req, res) => {
  console.log(req.file);
  //const result = await new message({message:{ body: asBody, way: 'send' }}).save();
  res.status(200).send(req.file);
});

module.exports = router;
