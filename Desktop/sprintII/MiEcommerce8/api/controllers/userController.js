const generateJWT = require('../../helpers/generateJWT');
const usersHelpers = require('../../helpers/usersHelpers')

let loginUsuario = async (req,res)=>{
    try{
        let info = req.body;
        let users = usersHelpers.readBaseUsers();

        let login = users.find(u => u.username == info.username && u.password === info.password);

        if(login){
            let aux = {
                id: login.id,
                username : login.username,
                role : login.role
            }   

            const token = await generateJWT(aux);
            
            res.status(200).json({
                success: true,
                message: "Authorized",
                user: {
                    iduser: login.id,
                    username: login.username,
                    role: login.role
                },
                token: token
            } )
        }else{
            res.status(500).json({
                success: false,
                message: "Unauthorized",
            })
        }
    }catch(err){

    }
}

let listaUsuarios = (req,res)=>{
    try{
        let users = usersHelpers.readBaseUsers();
        let ret = [];
        users.forEach(e =>{
            let {id,email,username,firstname,lastname,profilepic} = e;
            let aux = {
                id: id,
                email: email,
                username: username,
                firstname:firstname,
                lastname:lastname,
                profilepic:profilepic
            }
            ret.push(aux)
        })
        res.status(200).json({
            "ok": true,
            "users": ret,
            "msg": "Ok"
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            "ok": false,
            "msg": "Server Error"
        });
    }
}
let verUsuario = (req,res)=>{
    try{
        let index = req.params.id;
        let users = usersHelpers.readBaseUsers();
        let {id,email,username,firstname,lastname,profilepic} = users.find((e)=> e.id == index);
        let ret = {
            id: id,
            email: email,
            username: username,
            firstname:firstname,
            lastname:lastname,
            profilepic:profilepic
        }
        if(ret){
            res.status(200).json({
                "ok": true,
                "msg": "Ok",
                "user": ret
            });
        }else{
            res.status(404).json({
                "ok": false,
                "msg": "Not Found"
            });
        }
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            "ok": false,
            "msg": "Server Error"
        });
    }
}


let crearUsuario = (req,res)=>{
    try{
        let {email,username,password,firstname,lastname,profilepic}= req.body;
        let users = usersHelpers.readBaseUsers();
        let id = 1;
        if(users.length>0){
            id = Number(users[users.length-1].id)+ 1;
        }
        if(email&&username&&password&&firstname&&lastname){
            u = {
                "id":id,
                "email":email,
                "username":username,
                "password":password,
                "firstname":firstname,
                "lastname":lastname,
                "role":"GUEST",
                "profilepic":profilepic?profilepic:"sin foto",
                "cart":[]
            }
            users.push(u);
            usersHelpers.writeBaseUsers(users);
            res.status(201).json({
                "ok":true,
                "msg": "Created.",
                "user": u
            })
        }else{
            res.status(400).json({
                "ok": false,
                "msg": "Bad Request"
            });
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            "ok": false,
            "msg": "Server Error"
        });
    }
}

let modificarUsuario = (req,res)=>{
    try{
        let {email,username,password,firstname,lastname,profilepic}= req.body;
        let users = usersHelpers.readBaseUsers();
        let id = req.params.id;
        let index = users.findIndex((e)=>e.id==id);
        if (index != undefined){
            if(email||username||firstname||lastname||profilepic||role){
                email? users[index].email = email:users[index].email=users[index].email;
                username? users[index].username = username:users[index].username=users[index].username;
                firstname? users[index].firstname = firstname:users[index].firstname=users[index].firstname;
                lastname? users[index].lastname = lastname:users[index].lastname = users[index].lastname;
                profilepic? users[index].profilepic = profilepic: users[index].profilepic=users[index].profilepic;
                role? users[index].role = role: users[index].role=users[index].role;
                usersHelpers.writeBaseUsers(users);
                res.status(200).json({
                    "ok":false,
                    "msg": "Ok",
                    "user": users[index]
                })
            }else{
                res.status(400).json({
                    "ok": false,
                    "msg": "Bad Request"
                });
            }
        }else{
            res.status(404).json({
                "ok": false,
                "msg": "Not Found"
            });
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            "ok": false,
            "msg": "Server Error"
        });
    }
}

let eliminarUsuario = (req,res)=>{
    try{
        let id = req.params.id;
        if (id){
            let aux = usersHelpers.readBaseUsers();
            if(aux.filter((e)=>e.id)){
                let users = aux.filter((e)=>e.id != id);
                usersHelpers.writeBaseUsers(users);
                res.status(200).json({
                    "ok": true,
                    "msg": "Ok",
                    "users": users[id]
                });
            }else{
                res.status(404).json({
                    "ok": false,
                    "msg": "Not Found"
                });
            }
        }else{
            res.status(400).json({
                "ok": false,
                "msg": "Bad Request"
            });
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            "ok": false,
            "msg": "Server Error"
        });
    }
    
}

module.exports = {listaUsuarios,verUsuario,crearUsuario,modificarUsuario,eliminarUsuario,loginUsuario}