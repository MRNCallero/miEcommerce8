const fs = require('fs');
DB_PATH = "api/data/users.json";
const readProdData = () => JSON.parse(fs.readFileSync('api/data/products.json', 'utf8'));
const prodListViewer = require('../../helpers/prodListViewer')


const listCart = (req, res) => {
    const id = Number(req.params.id);
    try{
        const carts = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        let productsJSON = readProdData();
        const cart = carts.find((elem) => elem.id === id);
        if(cart){
            let foundProd = [];
            let listaAux = [];
            cart.cart.forEach(elem =>{
                    foundProd.push(productsJSON.find(el => {
                        return el.id == elem.product
                    }));})
            listaAux = prodListViewer(foundProd);
            listaAux = listaAux.map((ele,i)=>{
                return {
                    producto:ele,
                    quantity:cart.cart[i].quantity
                }
            })
            if(foundProd == undefined){
                res.status(404).json({
                    ok: false,
                    msg: 'Producto no encontrado'
                })
            }else{
                res.status(200).json(listaAux);
            }

        }else{
            res.status(404).json({
                ok: false,
                message: "Cart does not exist"
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Error opening file"
        });
    }
}

const updateCart = (req, res) => {
    const id = Number(req.params.id);
    try{
        const carts = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        let exist = false;
        let index = 0;
        let updatedCart = carts.map((elem,i) => {
            if(elem.id === id){
                exist = true;
                index = i;
                elem.cart = req.body;
            }
            return elem;
        });
        if(exist){
            fs.writeFileSync(DB_PATH, JSON.stringify(updatedCart),'utf-8');
            res.status(200).json(updatedCart[index].cart);
        }else{
            res.status(404).json({
                ok: false,
                message: "Cart does not exist"
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Error handling file"
        });
    }

}


module.exports = {listCart, updateCart};