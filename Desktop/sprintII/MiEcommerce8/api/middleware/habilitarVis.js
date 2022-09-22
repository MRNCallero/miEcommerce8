const jwt = require('jsonwebtoken');

const habilitarVis = ( req,res,next)=> {
    try{
        const {id,role}= req.jwtauth;
        const idReq = req.params.id;

        if(((req.originalUrl.includes('users') || req.originalUrl.includes('cart')) && id == idReq) || role == "ADMIN" || role == "GOD"){

            next();
        }else{
            res.status(400).json({error: "No tienes las credenciales necesarias para acceder"})
        }
    
    }catch(err){
        console.log(err);
        return res.status(401).json({
            ok: false,
            msg: "Token invalido"
        })
    }
    
}

module.exports = habilitarVis;