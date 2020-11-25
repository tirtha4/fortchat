const path = require('path');
const http = require('http');
const express = require('express');
const app = express();


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


const server = http.createServer(app);
require('./socket')(server);


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
