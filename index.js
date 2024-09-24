const app = require("./app");
const db = require('./config/db');

const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello Word");

});

app.listen(port, () => {
    console.log(`Server Is The Listen on This Port http://localhost:${port}`);
})