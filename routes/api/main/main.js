const express = require('express');
const router = express.Router();
const db = require('../../../module/db')
const crypto = require('crypto-promise');
const jwt = require('../../../module/jwt');
const schedule = require('node-schedule');



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

router.get('/new',async(req,res,next)=>{

        let populQuery0 = `
        DROP TABLE new_list
        `;

        let populQuery1 = `
        CREATE TABLE new_list AS
        SELECT finance_title AS title, 
            finance_idx AS index1,
            finance_img AS img ,
            date_format(finance_date,"%Y-%c-%d") AS date ,
            0 AS 'category' 
        FROM SMWU.finance;
        `;
        let populQuery2 = `
        INSERT INTO new_list
        (title, index1, img, date, category)
        SELECT party_title, party_idx, party_img, date_format(party_date,"%Y-%c-%d"), 1 AS 'category'
        FROM SMWU.party
        `;
        let populQuery3 = `INSERT INTO new_list
        (title, index1, img, date, category)
        SELECT sign_title, sign_idx, sign_img, date_format(sign_date,"%Y-%c-%d"), 2 AS 'category'
        FROM SMWU.sign;`;
        let populQuery4 = `INSERT INTO new_list
        (title, index1, img, date, category)
        SELECT boycott_title, boycott_idx, boycott_img, date_format(boycott_date,"%Y-%c-%d"), 3 AS 'category'
        FROM SMWU.boycott`;
        let populQuery5 = `INSERT INTO new_list
        (title, index1, img, date, category)
        SELECT donate_title, donate_idx, donate_img, date_format(donate_like,"%Y-%c-%d"), 4 AS 'category'
        FROM SMWU.donate;`;
    
    Result1 = await db.queryParamNone(populQuery0);
    Result2 = await db.queryParamNone(populQuery1);
    Result3 = await db.queryParamNone(populQuery2);
    Result4 = await db.queryParamNone(populQuery3);
    Result5 = await db.queryParamNone(populQuery4);
    Result6 = await db.queryParamNone(populQuery5);
    let selectQuery = `SELECT * FROM new_list ORDER BY date desc limit 6 `;
    Result7 = await db.queryParamNone(selectQuery);
    if(!Result7){
        res.status(500).send({
            message:"Internal Server Error"
        });
    }else{
        res.status(200).send({
            message:"Success",
            data:Result7
        })
    }



});


router.get('/popular',async(req,res,next)=>{
    let Result1;
    let Result2;
    let Result3;
    let Result4;
    let Result5;
    let Result6;
    let Result7;

        let populQuery0 = `
        DROP TABLE popular_list
        `;
        

    
        
        let populQuery1 = `
        CREATE TABLE popular_list AS
        SELECT finance_title AS title, 
            finance_idx AS index1,
            finance_img AS img ,
            finance_like AS booked ,
            0 AS 'category' 
        FROM SMWU.finance;
        `;
        let populQuery2 = `
        INSERT INTO popular_list
        (title, index1, img, booked, category)
        SELECT party_title, party_idx, party_img, party_like, 1 AS 'category'
        FROM SMWU.party
        `;
        let populQuery3 = `INSERT INTO popular_list
        (title, index1, img, booked, category)
        SELECT sign_title, sign_idx, sign_img, sign_like, 2 AS 'category'
        FROM SMWU.sign;`;
        let populQuery4 = `INSERT INTO popular_list
        (title, index1, img, booked, category)
        SELECT boycott_title, boycott_idx, boycott_img, boycott_like, 3 AS 'category'
        FROM SMWU.boycott`;
        let populQuery5 = `INSERT INTO popular_list
        (title, index1, img, booked, category)
        SELECT donate_title, donate_idx, donate_img, donate_like, 4 AS 'category'
        FROM SMWU.donate;`;
    
    Result1 = await db.queryParamNone(populQuery0);
    Result2 = await db.queryParamNone(populQuery1);
    Result3 = await db.queryParamNone(populQuery2);
    Result4 = await db.queryParamNone(populQuery3);
    Result5 = await db.queryParamNone(populQuery4);
    Result6 = await db.queryParamNone(populQuery5);
    let selectQuery = `SELECT * FROM popular_list ORDER BY booked desc limit 6 `;
    Result7 = await db.queryParamNone(selectQuery);
    if(!Result7){
        res.status(500).send({
            message:"Internal Server Error"
        });
    }else{
        res.status(200).send({
            message:"Success ",
            data:Result7
        })
    }


});

module.exports = router;