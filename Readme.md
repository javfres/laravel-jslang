
"require": {
    "javfres/laravel-jslang": "dev-master"
},


"repositories": [
    {
        "type": "path",
        "url": "./home/javier/Desktop/packages/javfres/laravel-jslang"
    }
]


composer update javfres/laravel-jslang --lock


php artisan package:discover


php artisan vendor:publish