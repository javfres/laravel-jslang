


global.JsLang_DICT = {
    '*':{
        "profile":{
            "user": "Usuario",
            "welcome": "Welcome :name!!!",
            "name": "Nombre"
        },
        "messages": {
            'apples': 'There is one apple|There are many apples',
            'apples2': '{0} There are none apples|[1,19] There are some apples (:count)|[20,*] There are many apples (:count) ',
            'books': `There is one book.|There are :count books.`,     
            'books2': ` |{0} There are no books about :theme!
                        |{1,2,3} You have one, two or three books about :theme.
                        |{4} Four is a great number of books about :theme!
                        | The number of books you have is uncountable!`,
        }
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
const trans_choice = window.trans_choice;


console.log(trans('profile.user'));
console.log(trans('common::profile'));
console.log(trans('common::profile2.otro.jajaja.quebien'));
console.log(trans('profile.welcome',{name:"javix"}));
console.log(trans('profile.welcome',{name:true}));
console.log(trans('XXX'));
console.log(trans('profile',{param:true}));
console.log(trans_choice('messages.apples', 1));
console.log(trans_choice('messages.apples', 2));
console.log(trans_choice('messages.apples2', 0));
console.log(trans_choice('messages.apples2', 2));
console.log(trans_choice('messages.apples2', 200));
console.log(trans_choice('messages.books', 1));
console.log(trans_choice('messages.books', 10));

console.log(trans_choice('messages.books2', [], {theme:'Science Fiction'}));
console.log(trans_choice('messages.books2', ['A','B','C','D'], {theme:'Science Fiction'}));
console.log(trans_choice('messages.books2', 10, {theme:'Science Fiction'}));

console.log(trans_choice('profile.user', 10));




