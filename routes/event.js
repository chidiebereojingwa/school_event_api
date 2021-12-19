const Event = require("../models/Event");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndCounselor,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE EVENT

router.post("/", verifyTokenAndCounselor, async (req, res) => {
  const newEvent = new Event(req.body);

  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE EVENT
router.put("/:id", verifyTokenAndCounselor, async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE EVENT
router.delete("/:id", verifyTokenAndCounselor, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Event
router.get("/find/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL EVENTS ALSO BY ORGANIZATION
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qOrganization = req.query.organization;
  try {
    let events;

    if (qNew) {
        events = await Event.find().sort({ createdAt: -1 }).limit(1);
    } else if (qOrganization) {
        events = await Event.find({
            organizations: {
          $in: [qOrganization],
        },
      });
    } else {
        events = await Event.find();
    }

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
