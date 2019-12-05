const express = require('express');
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/Url');
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  // Check base url
  if (!validUrl.isUri(process.env.DOMAIN)) {
    return res.status(401).json({
      message: 'Invalid base url'
    });
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = process.env.DOMAIN + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Server error'
      });
    }
  } else {
    res.status(401).json({
      message: 'Invalid long url'
    });
  }
});

module.exports = router;