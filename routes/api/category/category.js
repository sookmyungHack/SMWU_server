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
        JOIN(SELECT user_idx, timestampdiff(day, now(),finance_limit) AS date, finance_idx AS idx,finance_person AS LimitPerson,finance_count AS CurrentPerson FROM SMWU.finance) AS finance
        ON user.user_idx = finance.user_idx
        GROUP BY finance.idx`;
        console.log(selectQuery);
        
        selectResult = await db.queryParamNone(selectQuery);
        
        break;
        case "1" :
        console.log(111);
        selectQuery = `SELECT *
        FROM (SELECT user_nickname, user_idx FROM user) AS user
        JOIN(SELECT user_idx, timestampdiff(day, now(),party_limit) AS date, party_idx as idx ,party_person as LimitPerson,party_count AS CurrentPerson FROM SMWU.party) AS party
        ON user.user_idx = party.user_idx
        GROUP BY party.idx`
        
        console.log(selectQuery);
        selectResult = await db.queryParamNone(selectQuery);
        break;
        case "2" :
        
        selectQuery = `SELECT *
        FROM (SELECT user_nickname, user_idx FROM user) AS user
        JOIN(SELECT user_idx, timestampdiff(day, now(),sign_limit) AS date, sign_idx AS idx , sign_person AS LimitPerson, sign_count AS CurrentPerson FROM SMWU.sign) AS sign
        ON user.user_idx = sign.user_idx
        GROUP BY sign.idx`
        console.log(selectQuery);
        selectResult = await db.queryParamNone(selectQuery);
        break;

        case "3" :
        selectQuery = `SELECT *
        FROM (SELECT user_nickname, user_idx FROM user) AS user
        JOIN(SELECT user_idx, timestampdiff(day, now(),boycott_limit) AS date, boycott_idx  AS idx, boycott_person AS LimitPerson,boycott_count AS CurrentPerson FROM SMWU.boycott) AS boycott
        ON user.user_idx = boycott.user_idx
        GROUP BY boycott.idx`
        console.log(selectQuery);
        selectResult = await db.queryParamNone(selectQuery);
        break;

        case "4" :
        selectQuery = `SELECT *
        FROM (SELECT user_nickname, user_idx FROM user) AS user
        JOIN(SELECT user_idx, timestampdiff(day, now(),donate_limit) AS date, donate_idx AS idx, donate_person AS LimitPerson, donate_count AS CurrentPerson FROM SMWU.donate) AS donate
        ON user.user_idx = donate.user_idx
        GROUP BY donate.idx`
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