const express = require('express');
const router = express.Router();
const db = require('../../../../module/db')
const jwt = require('../../../../module/jwt');
router.get('/', async (req, res, next) => {
    let category = req.query.category;
    let boardIdx = req.query.idx;
    console.log(category)
    console.log(boardIdx)
    let selectQuery;
    let selectResult;
    switch(category){
      case "0" :
      selectQuery = `SELECT * 
      FROM
      (SELECT * FROM finance) AS finance
      JOIN(SELECT user_idx, user_img, user_nickname FROM SMWU.user) AS user
      ON user.user_idx = finance.user_idx
      WHERE finance.finance_idx = ?
      `
      break;
      case "1" :
      selectQuery = `SELECT * 
      FROM
      (SELECT * FROM party) AS party
      JOIN(SELECT user_idx, user_img, user_nickname FROM SMWU.user) AS user
      ON user.user_idx = party.user_idx
      WHERE party.party_idx = ?`
      
      break;
      case "2" :
      selectQuery = `SELECT * 
      FROM
      (SELECT * FROM sign) AS sign
      JOIN(SELECT user_idx, user_img, user_nickname FROM SMWU.user) AS user
      ON user.user_idx = sign.user_idx
      WHERE sign.sign_idx = ?
      `;

      break;
      case "3" :
      selectQuery =`SELECT * 
      FROM
      (SELECT * FROM boycott) AS boycott
      JOIN(SELECT user_idx, user_img, user_nickname FROM SMWU.user) AS user
      ON user.user_idx = boycott.user_idx
      WHERE boycott.boycott_idx = ?`;
      
      break;
      case "4" :
      selectQuery = `SELECT * 
      FROM
      (SELECT * FROM donate) AS donate
      JOIN(SELECT user_idx, user_img, user_nickname FROM SMWU.user) AS user
      ON user.user_idx = donate.user_idx
      WHERE donate.donate_idx = ?`;
      
      break;
    }
    selectResult = await db.queryParamArr(selectQuery,[boardIdx]);
    if(!selectResult){
      res.status(500).send({
        message:"Internal Server Error"
      })
    }else{
      res.status(201).send({
        message:"Success",
        data : selectResult[0]
      })
    }

  });



  
  

module.exports = router;