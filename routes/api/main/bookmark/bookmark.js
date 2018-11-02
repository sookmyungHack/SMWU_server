const express = require('express');
const router = express.Router();
const db = require('../../../../module/db')
const jwt = require('../../../../module/jwt');

router.post('/add',async(req,res,next)=>{
    let token = req.headers.token;
    console.log(token);
    let decoded = jwt.verify(token);
    let category = req.body.category;
    let boardIdx = req.body.board_idx;
    console.log(decoded);
    let selectQuery;
    let insertQuery;
    let selectResult;
    let insertResult;

    if(decoded === -1){
        res.status(500).send({
            message : "token err"//여기서 400에러를 주면 클라의 문제니까 메세지만 적절하게 잘 바꿔주면 된다.
        });

    }else{
        switch(category)
        {
            case "0" :
            console.log(1);
            selectQuery = `
            SELECT * FROM finance WHERE finance_idx =?
            `;
            selectResult = await db.queryParamArr(selectQuery,[boardIdx]);
            if(selectResult.length<1){
                res.status(500).send({
                    message:"No content"
                });
            }else{
                insertQuery = `
                INSERT INTO bookmark_finance (finance_idx, user_idx) VALUES (?,?)
                `
                insertResult = await db.queryParamArr(insertQuery,[boardIdx,decoded.user_idx])
                if(!insertResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }else if(insertResult.length>=1){
                    res.status(500).send({
                        message:"Already Exist"
                    })
                }
                insertQuery =`UPDATE finance SET finance_like = 
                (SELECT count(*) FROM bookmark_finance WHERE finance_idx = ?)
                WHERE finance_idx = ? `
                insertResult = await db.queryParamArr(insertQuery,[boardIdx,boardIdx]);
                if(!insertResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
            }
            let checkQuery = `
            SELECT count(*) AS isBooked FROM bookmark_finance WHERE finance_idx =? AND user_idx =? `;
            let checkResult = await db.queryParamArr(checkQuery,[boardIdx,decoded.user_idx]);
            
        res.status(200).send({
            message:"Success bookmark",
            isBooked : checkResult[0]["isBooked"]

        });

            break;
            case "1" :
            selectQuery = `
            SELECT * FROM party WHERE party_idx =?
            `;
            selectResult = await db.queryParamArr(selectQuery,[boardIdx]);
            if(selectResult.length<1){
                res.status(500).send({
                    message:"No content"
                });
            }else{
                insertQuery = `
                INSERT INTO bookmark_party (party_idx, user_idx) VALUES (?,?)
                `
                insertResult = await db.queryParamArr(insertQuery,[boardIdx,decoded.user_idx])
                if(!insertResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }else if(insertResult.length>=1){
                    res.status(500).send({
                        message:"Already Exist"
                    })
                }
                insertQuery =`UPDATE party SET party_like = 
                (SELECT count(*) FROM bookmark_party WHERE party_idx = ?)
                WHERE party_idx = ? `
                insertResult = await db.queryParamArr(insertQuery,[boardIdx,boardIdx]);
                if(!insertResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
                let checkQuery = `
            SELECT count(*) AS isBooked FROM bookmark_party WHERE party_idx =? AND user_idx =? `;
            let checkResult = await db.queryParamArr(checkQuery,[boardIdx,decoded.user_idx]);
            
        res.status(200).send({
            message:"Success bookmark",
            isBooked : checkResult[0]["isBooked"]

        });
            }
            break;
            case "2" :
            selectQuery = `
            SELECT * FROM sign WHERE sign_idx =?
            `;
            selectResult = await db.queryParamArr(selectQuery,[boardIdx]);
            if(selectResult.length<1){
                res.status(500).send({
                    message:"No content"
                });
            }else{
                insertQuery = `
                INSERT INTO bookmark_sign (sign_idx, user_idx) VALUES (?,?)
                `
                insertResult = await db.queryParamArr(insertQuery,[boardIdx,decoded.user_idx])
                if(!insertResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }else if(insertResult.length>=1){
                    res.status(500).send({
                        message:"Already Exist"
                    })
                }
                insertQuery =`UPDATE sign SET sign_like = 
                (SELECT count(*) FROM bookmark_sign WHERE sign_idx = ?)
                WHERE sign_idx = ? `
                insertResult = await db.queryParamArr(insertQuery,[boardIdx,boardIdx]);
                if(!insertResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
                let checkQuery = `
            SELECT count(*) AS isBooked FROM bookmark_sign WHERE sign_idx =? AND user_idx =? `;
            let checkResult = await db.queryParamArr(checkQuery,[boardIdx,decoded.user_idx]);
            
        res.status(200).send({
            message:"Success bookmark",
            isBooked : checkResult[0]["isBooked"]

        });
            }
            break;
            case "3" :
            selectQuery = `
            SELECT * FROM boycott WHERE boycott_idx =?
            `;
            selectResult = await db.queryParamArr(selectQuery,[boardIdx]);
            if(selectResult.length<1){
                res.status(500).send({
                    message:"No content"
                });
            }else{
                insertQuery = `
                INSERT INTO bookmark_boycott (boycott_idx, user_idx) VALUES (?,?)
                `
                insertResult = await db.queryParamArr(insertQuery,[boardIdx,decoded.user_idx])
                if(!insertResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }else if(insertResult.length>=1){
                    res.status(500).send({
                        message:"Already Exist"
                    })
                }
                insertQuery =`UPDATE boycott SET boycott_like = 
                (SELECT count(*) FROM bookmark_boycott WHERE boycott_idx = ?)
                WHERE boycott_idx = ? `
                insertResult = await db.queryParamArr(insertQuery,[boardIdx,boardIdx]);
                if(!insertResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
                let checkQuery = `
            SELECT count(*) AS isBooked FROM bookmark_boycott WHERE boycott_idx =? AND user_idx =? `;
            let checkResult = await db.queryParamArr(checkQuery,[boardIdx,decoded.user_idx]);
            
        res.status(200).send({
            message:"Success bookmark",
            isBooked : checkResult[0]["isBooked"]

        });
            }
            break;
            case "4" :
            selectQuery = `
            SELECT * FROM donate WHERE donate_idx =?
            `;
            selectResult = await db.queryParamArr(selectQuery,[boardIdx]);
            if(selectResult.length<1){
                res.status(500).send({
                    message:"No content"
                });
            }else{
                insertQuery = `
                INSERT INTO bookmark_donate (donate_idx, user_idx) VALUES (?,?)
                `
                insertResult = await db.queryParamArr(insertQuery,[boardIdx,decoded.user_idx])
                if(!insertResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }else if(insertResult.length>=1){
                    res.status(500).send({
                        message:"Already Exist"
                    })
                }

                insertQuery =`UPDATE donate SET donate_like = 
                (SELECT count(*) FROM bookmark_donate WHERE donate_idx = ?)
                WHERE donate_idx = ? `
                insertResult = await db.queryParamArr(insertQuery,[boardIdx,boardIdx]);
                if(!insertResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
                let checkQuery = `
            SELECT count(*) AS isBooked FROM bookmark_donate WHERE donate_idx =? AND user_idx =? `;
            let checkResult = await db.queryParamArr(checkQuery,[boardIdx,decoded.user_idx]);
            
        res.status(200).send({
            message:"Success bookmark",
            isBooked : checkResult[0]["isBooked"]

        });
            }
            
            break;


        }
        

    }




});
router.post('/cancel',async(req,res,next)=>{
    let token = req.headers.token;
    console.log(token);
    let decoded = jwt.verify(token);
    let category = req.body.category;
    let boardIdx = req.body.board_idx;
    console.log(decoded);
    let selectQuery;
    let updateQuery;
    let selectResult;
    let updateResult;

    if(decoded === -1){
        res.status(500).send({
            message : "token err"//여기서 400에러를 주면 클라의 문제니까 메세지만 적절하게 잘 바꿔주면 된다.
        });

    }else{
        switch(category)
        {
            case "0" :
            console.log(1);
            selectQuery = `
            SELECT * FROM finance WHERE finance_idx =?
            `;
            selectResult = await db.queryParamArr(selectQuery,[boardIdx]);
            if(selectResult.length<1){
                res.status(500).send({
                    message:"No content"
                });
            }else{
                updateQuery = `
                DELETE FROM bookmark_finance WHERE finance_idx = ? AND  user_idx = ?
                `
                updateResult = await db.queryParamArr(updateQuery,[boardIdx,decoded.user_idx])
                if(!updateResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
                updateQuery =`UPDATE finance SET finance_like = 
                (SELECT count(*) FROM bookmark_finance WHERE finance_idx = ?)
                WHERE finance_idx = ? `
                updateResult = await db.queryParamArr(updateQuery,[boardIdx,boardIdx]);
                if(!updateResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
            }
            let checkQuery = `
            SELECT count(*) AS isBooked FROM bookmark_finance WHERE finance_idx =? AND user_idx =? `;
            let checkResult = await db.queryParamArr(checkQuery,[boardIdx,decoded.user_idx]);
            
        res.status(200).send({
            message:"Success bookmark",
            isBooked : checkResult[0]["isBooked"]

        });

            break;
            case "1" :
            selectQuery = `
            SELECT * FROM party WHERE party_idx =?
            `;
            selectResult = await db.queryParamArr(selectQuery,[boardIdx]);
            if(selectResult.length<1){
                res.status(500).send({
                    message:"No content"
                });
            }else{
                updateQuery = `
                DELETE FROM bookmark_party WHERE party_idx = ? AND  user_idx = ?
                `
                updateResult = await db.queryParamArr(updateQuery,[boardIdx,decoded.user_idx])
                if(!updateResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
                updateQuery =`UPDATE party SET party_like = 
                (SELECT count(*) FROM bookmark_party WHERE party_idx = ?)
                WHERE party_idx = ? `
                updateResult = await db.queryParamArr(updateQuery,[boardIdx,boardIdx]);
                if(!updateResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
                let checkQuery = `
            SELECT count(*) AS isBooked FROM bookmark_party WHERE party_idx =? AND user_idx =? `;
            let checkResult = await db.queryParamArr(checkQuery,[boardIdx,decoded.user_idx]);
            
        res.status(200).send({
            message:"Success bookmark",
            isBooked : checkResult[0]["isBooked"]

        });
            }
            break;
            case "2" :
            selectQuery = `
            SELECT * FROM sign WHERE sign_idx =?
            `;
            selectResult = await db.queryParamArr(selectQuery,[boardIdx]);
            if(selectResult.length<1){
                res.status(500).send({
                    message:"No content"
                });
            }else{
                updateQuery = `
                DELETE FROM bookmark_sign WHERE sign_idx = ? AND  user_idx = ?
                `
                updateResult = await db.queryParamArr(updateQuery,[boardIdx,decoded.user_idx])
                if(!updateResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
                updateQuery =`UPDATE sign SET sign_like = 
                (SELECT count(*) FROM bookmark_sign WHERE sign_idx = ?)
                WHERE sign_idx = ? `
                updateResult = await db.queryParamArr(updateQuery,[boardIdx,boardIdx]);
                if(!updateResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
                let checkQuery = `
            SELECT count(*) AS isBooked FROM bookmark_sign WHERE sign_idx =? AND user_idx =? `;
            let checkResult = await db.queryParamArr(checkQuery,[boardIdx,decoded.user_idx]);
            
        res.status(200).send({
            message:"Success bookmark",
            isBooked : checkResult[0]["isBooked"]

        });
            }
            break;
            case "3" :
            selectQuery = `
            SELECT * FROM boycott WHERE boycott_idx =?
            `;
            selectResult = await db.queryParamArr(selectQuery,[boardIdx]);
            if(selectResult.length<1){
                res.status(500).send({
                    message:"No content"
                });
            }else{
                updateQuery = `
                DELETE FROM bookmark_boycott WHERE boycott_idx = ? AND  user_idx = ?
                `
                updateResult = await db.queryParamArr(updateQuery,[boardIdx,decoded.user_idx])
                if(!updateResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
                updateQuery =`UPDATE boycott SET boycott_like = 
                (SELECT count(*) FROM bookmark_boycott WHERE boycott_idx = ?)
                WHERE boycott_idx = ? `
                updateResult = await db.queryParamArr(updateQuery,[boardIdx,boardIdx]);
                if(!updateResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
                let checkQuery = `
            SELECT count(*) AS isBooked FROM bookmark_boycott WHERE boycott_idx =? AND user_idx =? `;
            let checkResult = await db.queryParamArr(checkQuery,[boardIdx,decoded.user_idx]);
            
        res.status(200).send({
            message:"Success bookmark",
            isBooked : checkResult[0]["isBooked"]

        });
            }
            break;
            case "4" :
            selectQuery = `
            SELECT * FROM donate WHERE donate_idx =?
            `;
            selectResult = await db.queryParamArr(selectQuery,[boardIdx]);
            if(selectResult.length<1){
                res.status(500).send({
                    message:"No content"
                });
            }else{
                updateQuery = `DELETE FROM bookmark_donate WHERE donate_idx = ? AND  user_idx = ?
                `
                updateResult = await db.queryParamArr(updateQuery,[boardIdx,decoded.user_idx])
                if(!updateResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }

                updateQuery =`UPDATE donate SET donate_like = 
                (SELECT count(*) FROM bookmark_donate WHERE donate_idx = ?)
                WHERE donate_idx = ? `
                updateResult = await db.queryParamArr(updateQuery,[boardIdx,boardIdx]);
                if(!updateResult){
                    res.status(500).send({
                        message:"Internal Server Error"
                    })
                }
                let checkQuery = `
            SELECT count(*) AS isBooked FROM bookmark_donate WHERE donate_idx =? AND user_idx =? `;
            let checkResult = await db.queryParamArr(checkQuery,[boardIdx,decoded.user_idx]);
            
        res.status(200).send({
            message:"Success bookmark",
            isBooked : checkResult[0]["isBooked"]

        });
            }
            
            break;


        }
        

    }

});
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});



module.exports = router;