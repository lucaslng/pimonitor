import express = require("express");
let app = express();
const port = 3000;

app.get('/', (_, res: express.Response) => {
 res.send('Hello, World! 🌍');
});

app.listen(port, () => {
 console.log(`App listening at http://localhost:${port}`);
});