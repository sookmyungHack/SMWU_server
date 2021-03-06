const express = require('express');
const router = express.Router();
const db = require('../../../module/db')
const crypto = require('crypto-promise');
const jwt = require('../../../module/jwt');
const upload = require('../../../config/s3multer').uploadImage;



/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.post('/',async (req,res,next)=>{
    let kakao= req.body.kakao_idx;
    let nickname = req.body.user_nickname;
    //let sex = req.body.user_sex;
    let img = req.body.user_img;
    console.log(kakao,nickname);
    let token;
    let userIdx;
    


    if(!kakao || !nickname ){//유저 들어왔는가
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
            let insertQuery = `INSERT INTO user (kakao_idx, user_nickname, user_img) VALUES (?,?,?) `;
            let insertResult = await db.queryParamArr(insertQuery,[kakao,nickname,img]);
            if(!insertResult){
                res.status(500).send({
                    message:"Internal Server Error"
                })
            }
            userIdx = insertResult.insertId;
            console.log(userIdx);
            token = jwt.sign(userIdx);

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
            res.status(200).send({
                token : token,
                message:"Success Signup"
            });
        }



            

            

        }


    }


})

module.exports = router;