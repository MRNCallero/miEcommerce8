const fs = require('fs');
const path = require("node:path")
const readBasePictures = () => JSON.parse(fs.readFileSync(path.join(__dirname, "/../api/data/pictures.json")));

function buscador(pId){
    const picturesJSON = readBasePictures();
    const theObject = picturesJSON.find(elem => elem.id === pId);
    return theObject

}

module.exports = buscador