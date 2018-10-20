/*will be a full api in the future*/

const express = require('express'), rp = require('request-promise'), cheerio = require('cheerio'), app = express(), port = process.env.PORT || 5000;

app.get('/api/getRandomWaifu', (req, res) => {
    rp('https://mywaifulist.moe/random').then(response =>{
        const $ = cheerio.load(response), token = $('meta[name=csrf-token]').attr("content"), waifuId = $('Waifu-Core').attr(':waifu-id');
        rp({
            headers:{
                'x-requested-with':'XMLHttpRequest',
                'x-csrf-token':token
            },
            uri:`https://mywaifulist.moe/api/waifu/${waifuId}`
        }).then(info => {
            res.setHeader('Content-Type', 'application/json');
            res.send(info);
        }).catch(err =>{
            return err;
        });
    }).catch(err => {
        return err;
    });
});

app.listen(port);