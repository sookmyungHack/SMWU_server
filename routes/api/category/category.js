const express = require('express');
const router = express.Router();
const db = require('../../../module/db')
const jwt = require('../../../module/jwt');

router.get('/', async (req, res, next) => {
    let cateNum = req.query.num;
    console.log(cateNum);
    let selectQuery;
    let selectResult;
    let personQuery;
    let personResult;

    switch(cateNum){
        case "0" :
        console.log(0);
        selectQuery = `SELECT *
        FROM (SELECT user_nickname, user_idx FROM user) AS user
        JOIN(SELECT user_idx, timestampdiff(day, now(),finance_limit) AS date, finance_idx,finance_person,finance_count FROM SMWU.finance) AS finance
        ON user.user_idx = finance.user_idx
        GROUP BY finance.finance_idx`;
        console.log(selectQuery);
        
        selectResult = await db.queryParamNone(selectQuery);
        
        break;
        case "1" :
        console.log(111);
        selectQuery = `SELECT *
        FROM (SELECT user_nickname, user_idx FROM user) AS user
        JOIN(SELECT user_idx, timestampdiff(day, now(),party_limit) AS date, party_idx,party_person,party_count FROM SMWU.party) AS party
        ON user.user_idx = party.user_idx
        GROUP BY party.party_idx`
        
        console.log(selectQuery);
        selectResult = await db.queryParamNone(selectQuery);
        break;
        case "2" :
        
        selectQuery = `SELECT *
        FROM (SELECT user_nickname, user_idx FROM user) AS user
        JOIN(SELECT user_idx, timestampdiff(day, now(),sign_limit) AS date, sign_idx, sign_person, sign_count FROM SMWU.sign) AS sign
        ON user.user_idx = sign.user_idx
        GROUP BY sign.sign_idx`
        console.log(selectQuery);
        selectResult = await db.queryParamNone(selectQuery);
        break;

        case "3" :
        selectQuery = `SELECT *
        FROM (SELECT user_nickname, user_idx FROM user) AS user
        JOIN(SELECT user_idx, timestampdiff(day, now(),boycott_limit) AS date, boycott_idx, boycott_person,boycott_count FROM SMWU.boycott) AS boycott
        ON user.user_idx = boycott.user_idx
        GROUP BY boycott.boycott_idx`
        console.log(selectQuery);
        selectResult = await db.queryParamNone(selectQuery);
        break;

        case "4" :
        selectQuery = `SELECT *
        FROM (SELECT user_nickname, user_idx FROM user) AS user
        JOIN(SELECT user_idx, timestampdiff(day, now(),donate_limit) AS date, donate_idx, donate_person, donate_count FROM SMWU.donate) AS donate
        ON user.user_idx = donate.user_idx
        GROUP BY donate.donate_idx`
        console.log(selectQuery);
        selectResult = await db.queryParamNone(selectQuery);
        console.log(selectResult)
        break;
    }
    
    if(!selectResult){
        res.status(500).send({
            message:"Internal Server Error"
        });
    }else{
        res.status(201).send({
            message:"Success List",
            data : selectResult
        });
    }
    });


module.exports = router;