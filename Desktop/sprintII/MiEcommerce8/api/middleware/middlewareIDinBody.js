
function middlewareIDinBody (req,res,next){
    let validacion = false;
    if(req.query.product && !req.params.id){
        validacion = true;
        req.idProducto = req.query.product; 
    }
    if(req.params.id && !req.query.producto) { 
        validacion = true;
        req.idProducto = req.params.id; 
   
    }
    if(validacion){
        next();
    }else{
        res.status(404).json({
            msj: "Not Found"
        });
    }
}
module.exports = middlewareIDinBody;