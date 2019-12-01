const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

//Middleware
app.use(cors());
app.use(express.json({extended: false}));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));