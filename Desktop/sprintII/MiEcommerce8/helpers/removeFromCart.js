const fs = require('fs');
DB_PATH = "api/data/users.json";

const removeFromCart = (prodId) => {
    try{
        const carts = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        console.log(carts)
        carts.forEach(element => {
            element.cart = element.cart.filter((el) => el.product != prodId)
        });

        fs.writeFileSync(DB_PATH, JSON.stringify(carts),'utf-8');

    }catch(error){
        console.log(error);
    }
}

module.exports = removeFromCart;