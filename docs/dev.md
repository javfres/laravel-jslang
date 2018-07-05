
# Dev notes

Notes for myself


For development, you can import the package into a laravel project with:

```
    {
        "type": "path",
        "url": "./home/javier/Desktop/packages/javfres/laravel-jslang"
    }
```

`php artisan package:discover`


## Compiling the base javascript file

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
