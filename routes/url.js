const express = require('express'),
    router = express.Router(),
    validUrl = require('valid-url'),
    shortid = require('shortid'),
    config = require('config'),
    Url = require('../models/url');
    mongoose = require('mongoose')

// @route   Post /api/url/shorten
// @desc    create short url
console.log('reached');
router.get("/shorten",(req, res)=>{
    console.log('tolo');
    
})
router.post('/shorten',async (req,res)=>{
    console.log("reached");
    
    const{longUrl} = req.body;
    const baseUrl = config.get('baseUrl');
    // check base url 
    console.log(baseUrl);
    
    
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base Url')
    }
    // create url code
    const urlCode = shortid.generate();
    // checl long url
    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({ longUrl });
            if(url){
                res.json(url);
            }else{
                const shortUrl = baseUrl + '/'+ urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json('server error')
            
        }
    }else {
        res.status(401).json('Invalid long url')
    }
})

module.exports = router