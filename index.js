const express = require('express');
const novuRoute = require('./router');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(novuRoute);

app.listen(PORT, () => {
    console.log(`App started on ${PORT}`)
});