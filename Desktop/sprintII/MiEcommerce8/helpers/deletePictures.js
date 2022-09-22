const fs = require('fs');
const path = require('node:path');
const writeBasePictures = (Pictures) => fs.writeFileSync(path.join(__dirname, "/../api/data/pictures.json"), JSON.stringify(Pictures));
const readBasePictures = () => JSON.parse(fs.readFileSync(path.join(__dirname, "/../api/data/pictures.json")));


function deletePicture(idPicture) {
    const picturesJSON = readBasePictures(); 
    const PicturesFiltradas = picturesJSON.filter(el => el.id !== Number(idPicture));
    writeBasePictures(PicturesFiltradas)
    return PicturesFiltradas
}
module.exports = deletePicture