const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const Url = require('../models/Url');

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({urlCode: req.params.code});
    console.log(url);
    if (url) {
      return res.redirect(url.longUrl);
    }

    // return res.status(404).json('No url found');
    return res.status(404).redirect(process.env.DOMAIN);

  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;