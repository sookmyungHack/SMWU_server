const express = require('express');
const router = express.Router();
const db = require('../../../module/db')
const crypto = require('crypto-promise');
const jwt = require('../../../module/jwt');



router.get('/recommand', async (req, res, next) => {
    let fundQuery = `SELECT *
    FROM (SELECT finance_img, finance_idx, finance_title,finance.user_idx, finance.finance_like
    FROM SMWU.finance) AS finance 
    LEFT JOIN (SELECT user.user_idx, user.user_nickname, user.user_img FROM SMWU.user) AS user
    ON user.user_idx =  finance.user_idx
    ORDER BY finance_like desc limit 1`;

    let boycottQuery = `SELECT *
FROM (SELECT boycott_img, boycott_idx, boycott_title,boycott.user_idx, boycott.boycott_like
FROM SMWU.boycott) AS boycott 
LEFT JOIN (SELECT user.user_idx, user.user_nickname, user.user_img FROM SMWU.user) AS user
ON user.user_idx =  boycott.user_idx
ORDER BY boycott_like desc limit 1;`;

    let partyQuery = `SELECT *
    FROM (SELECT party_img, party_idx, party_title,party.user_idx, party.party_like
    FROM SMWU.party) AS party 
    LEFT JOIN (SELECT user.user_idx, user.user_nickname, user.user_img FROM SMWU.user) AS user
    ON user.user_idx =  party.user_idx
    ORDER BY party_like desc limit 1;`;

    let signQuery = `SELECT *
FROM (SELECT sign_img, sign_idx, sign_title,sign.user_idx, sign.sign_like
FROM SMWU.sign) AS sign
LEFT JOIN (SELECT user.user_idx, user.user_nickname, user.user_img FROM SMWU.user) AS user
ON user.user_idx =  sign.user_idx
ORDER BY sign_like desc limit 1;`;

    let donateQuery = `SELECT *
    FROM (SELECT donate_img, donate_idx, donate_title,donate.user_idx, donate.donate_like
    FROM SMWU.donate) AS donate
    LEFT JOIN (SELECT user.user_idx, user.user_nickname, user.user_img FROM SMWU.user) AS user
    ON user.user_idx =  donate.user_idx
    ORDER BY donate_like desc limit 1;`;
    let Result1 = await db.queryParamNone(fundQuery);
    let Result2 = await db.queryParamNone(boycottQuery);
    let Result3 = await db.queryParamNone(partyQuery);
    let Result4 = await db.queryParamNone(signQuery);
    let Result5 = await db.queryParamNone(donateQuery);

    if(!Result1 || !Result2 || !Result3 || !Result4 || !Result5){
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
    res.status(200).send({
        recommandFund : Result1[0],
        recommandBoycott : Result2[0],
        recommandParty : Result3[0],
        recommandSign : Result4[0],
        recommandDonate : Result5[0]
    });
    
});

module.exports = router;