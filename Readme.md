
# Laravel JsLang

This is a laravel package that transform the laravel php dictionaries
into javascript keeping the same usage method.

By default it processes all the dict files for all the namespaces and
all the locales. You can config using the `jslang.php` config file.

It supports the `trans` function and the basic part of the `trans_choice`.

```
<script>
    console.log(trans('profile.user'));                   // Basic use
    console.log(trans('profile.welcome',{name:"Alice"})); // Use with variables
    console.log(trans('shop::messages.confirm'));         // Namespace
    console.log(trans('fruits.apples',10));               // Trans choice
</script>
```


## Installation

Add this require to the `composer.json`:

`"javfres/laravel-jslang": "^1.1.0"`

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

Generate the javascript dictionaries from the php ones:

`php artisan javfres:jslang`

Add the script in the blade (this will load the dictionary based on the current locale):

```
<script src="{{ jslang() }}"></script>
```

## Demo

I've created a demo view to test the translations
and compare the php and js versions.
Add this to the routes:

```
Route::get('/jslang-demo', function (){ return view('jslang::demo'); });
```

## Development

```
"repositories": [
    {
        "type": "path",
        "url": "../laravel-jslang"
    }
],

```

`"javfres/laravel-jslang": "^1.1.0"`

`composer update javfres/laravel-jslang`

`php artisan package:discover`


### Compiling the base javascript file

I am using babel to generate the base javascript file that contains 
the `trans` function.

```
npm install
npm run compile
```

A demo

```
node src/js/demo_dict.js
```
