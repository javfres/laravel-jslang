
# Laravel JsLang

This is a laravel package that transform the laravel php dictionaries
into javascript keeping the same usage method.

By default it processes all the dict files for all the namespaces and
all the locales. You can config using the `jslang.php` config file.


## Installation

Add this require to the `composer.json`:

`"javfres/laravel-jslang": "dev-master"`

And also the repository

```
"repositories": [
    {
        "type": "git",
        "url": "https://github.com/javfres/laravel-jslang.git"
    }
]
```

Install the package

`composer update javfres/laravel-jslang --lock`

Generate the config file (you can edit it to change
the locales, dictionaries, and paths.

`php artisan vendor:publish`

Add the script in the blade:

```
<script src="{{ jslang() }}"></script>
```



## Dev notes

Notes for myself


For development, you can import the package into a laravel project with:

```
    {
        "type": "path",
        "url": "./home/javier/Desktop/packages/javfres/laravel-jslang"
    }
```

`php artisan package:discover`


