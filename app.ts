import express = require("express");
import { getSystemDetails } from "./backend/system";
let app = express();
const port = 3000;

app.get('/', (_, res: express.Response) => {
 res.send('Hello, World! 🌍');
 res.send(getSystemDetails());
});

app.listen(port, () => {
 console.log(`App listening at http://localhost:${port}`);
});