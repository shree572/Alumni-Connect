const express = require("express")
const router = express.Router();
const { chatWithBot } = require("../controllers/chatbot.controller");

// POST /api/chat
router.post("/chhat", chatWithBot);

module.exports = router
