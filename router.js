const express = require('express')
const router = express.Router()
const path = require('path');
const fs = require('fs');
const { Novu } = require('@novu/node')

const API_KEY = "";
const TO_EMAIL = "";
const TO_PHONE = "";
const IMG_PATH = path.join(__dirname, "img/img-large.jpg");
const SUBSCRIBER_ID = "1234";
const NOTIFICATION_EVENT_ID = "test";

const novuInstance = new Novu(API_KEY);

// For every student
router.post("/register", async (req, res) => {
  try {
    let response = await novuInstance.subscribers.identify(SUBSCRIBER_ID, {
      firstName: "John",
      lastName: "Doe",
      email: TO_EMAIL,
      phone: TO_PHONE,
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Sending Email
router.post("/send", async (req, res) => {
  try {
    let response = await novuInstance.trigger(NOTIFICATION_EVENT_ID, {
      to: {
        subscriberId: SUBSCRIBER_ID,
      },
      payload: {
        name: "John",
        attachments: [
          {
            file: fs.readFileSync(IMG_PATH),
            name: "img-large.jpg",
            mime: "image/jpg",
          },
        ],
      },
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router