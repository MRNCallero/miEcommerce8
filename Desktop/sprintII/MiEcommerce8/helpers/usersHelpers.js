const fs = require('fs');
const path = require('path');
let usersHelpers = {
    readBaseUsers : ()=>JSON.parse(fs.readFileSync(path.join(__dirname, "../api/data/users.json"),"utf8")),
    writeBaseUsers : (u)=>fs.writeFileSync(path.join(__dirname, "/../api/data/users.json"),JSON.stringify(u))
}

module.exports = usersHelpers;