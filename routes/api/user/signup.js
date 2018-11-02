const express = require('express');
const router = express.Router();
const db = require('../../../module/db')
const crypto = require('crypto-promise');
const jwt = require('../../../module/jwt');


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.post('/',async (req,res,next)=>{
    let kakao= req.body.kakao_idx;
    let nickname = req.body.user_nickname;
    let sex = req.body.user_sex;
    console.log(kakao,nickname,sex);
    let token;
    let userIdx;


    if(!kakao || !nickname ||!sex){//유저 들어왔는가
        res.status(400).send({
            message:"Null Value"
        });
    }else{
        let checkQuery = `SELECT * FROM SMWU.user WHERE kakao_idx = ?`;
        let checkResult = await db.queryParamArr(checkQuery,[kakao]);
        if(!checkResult){
            res.status(500).send({
                message:"Internal Server Error"
            });
        }else if(checkResult.length>=1){
            res.status(400).send({
                message:"Already Exists"
            });
        }else{
            let insertQuery = `INSERT INTO user (kakao_idx, user_nickname, user_sex) VALUES (?,?,?) `;
            let insertResult = await db.queryParamArr(insertQuery,[kakao,nickname,sex]);
            if(!insertResult){
                res.status(500).send({
                    message:"Internal Server Error"
                })
            }
            userIdx = insertResult.insertId;
            token = jwt.sign(kakao);

            let insertTokenQuery =
		`
		UPDATE user SET user_token = ? WHERE user_idx = ?
		`
        let insertTokenResult = await db.queryParamArr(insertTokenQuery, [token, userIdx]);
        if(!insertTokenResult){
            res.status(500).send({
                message:"Internal Server Error"
            });
        }else{
            res.status(201).send({
                message:"Success Signup"
            });
        }



            

            

        }


    }


})

module.exports = router;