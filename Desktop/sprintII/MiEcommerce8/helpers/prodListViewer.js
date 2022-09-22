const path = require("node:path")
const searchPicture = require('./searchPicture');

const prodListViewer = (productsJSON) => {
    let listAux = []
    productsJSON.forEach(prod => {
        prod.gallery = prod.gallery.map(el => {
            return searchPicture(el)
        })
        listAux.push(prod)
    })
    return listAux;
}



module.exports = prodListViewer;