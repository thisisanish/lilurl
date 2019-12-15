const express = require('express'),
    router = express.Router(),
    Url = require('../models/url')

router.get("/:code", async (req,res)=>{
    try{
        const url = await Url.findOne({urlCode: req.params.code})
        if(url){
            console.log(url.id);
            
            if(mongoose.Types.ObjectId.isValid(url.id)) {
                Url.findByIdAndUpdate(url.id,{$set:{redirectCount:url.redirectCount+1, lastRedirect: Date()}},{new:true})       .then((docs)=>{
                   if(docs) {
                     resolve({success:true,data:docs});
                   } else {
                     reject({success:false,data:"no such user exist"});
                   }
                }).catch((err)=>{
                    reject(err);
                })
                } else {
                  reject({success:"false",data:"provide correct key"});
                }
            console.log(url.userCount);
            
            return res.redirect(url.longUrl);
        }else{
            return res.status(404).json('no Url found')
        }
    }catch(err){
        console.log(err);
        res.status(500).json('server error');
        
    }
})


module.exports = router