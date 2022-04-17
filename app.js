const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});