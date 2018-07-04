


global.JsLang_DICT = {
    '*':{
        "profile":{
            "user": "Usuario",
            "wellcome": "Wellcome :name!!!",
            "name": "Nombre"
        },
    },
    "common":{
        "profile":{
            "user": "UsuarioCommon",
            "name": "NombreCommon"
        },
    },
};


// Simulate browser
global.window = {};
require('./trans');
const trans = window.trans;


console.log(trans('profile.user'));
console.log(trans('common::profile'));
console.log(trans('common::profile2.otro.jajaja.quebien'));
console.log(trans('profile.wellcome',{name:"javix"}));
