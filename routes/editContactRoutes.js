const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.put("/", contactController.editContact);

module.exports = router;
