"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const system_1 = require("./backend/system");
let app = express();
const port = 3000;
app.get('/', async (_, res) => {
    //  res.send('Hello, World! 🌍');
    res.send(await (0, system_1.getSystemDetails)());
    console.log(await (0, system_1.getSystemDetails)());
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map