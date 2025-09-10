"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Definiere die Hello World Route
router.get('/hello', (req, res) => {
    res.send('Hello World!');
});
exports.default = router;
