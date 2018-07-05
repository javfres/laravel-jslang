
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

Generate the javascript dictionaries from the php ones:

`php artisan javfres:jslang`

Add the script in the blade (this will load the dictionary based on the current locale):

```
<script src="{{ jslang() }}"></script>
```

## Test

```
Route::get('/jslang-demo', function (){ return view('jslang::demo'); });
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


## Output of the demo view

<table>
        <tbody><tr>
            <th>key</th>
            <th>Laravel php trans</th>
            <th>JsLang trans</th>
        </tr>
        
        
        <tr>
            <td><code> trans('jslang::demo.name') </code></td>
            <td>Name</td>
            <td class="jstrans">Name</td>
        </tr>
        
        
        <tr>
            <td><code> trans('jslang::demo.welcome',['name'=&gt;'You']) </code></td>
            <td>Welcome You!!!</td>
            <td class="jstrans">Welcome You!!!</td>
        </tr>
        
        
        
        <tr>
            <td><code> trans_choice('jslang::demo.apples',1) </code></td>
            <td>There is one apple</td>
            <td class="jstrans">There is one apple</td>
        </tr>
        
        
        <tr>
            <td><code> trans_choice('jslang::demo.apples',10) </code></td>
            <td>There are many apples</td>
            <td class="jstrans">There are many apples</td>
        </tr>
        
        
        <tr>
            <td><code> trans_choice('jslang::demo.apples',["one","two"]]) </code></td>
            <td>There are many apples</td>
            <td class="jstrans">There are many apples</td>
        </tr>
        
        
        
        <tr>
            <td><code> trans_choice('jslang::demo.apples2',0]) </code></td>
            <td>There are none apples</td>
            <td class="jstrans">There are none apples</td>
        </tr>
        
        
        <tr>
            <td><code> trans_choice('jslang::demo.apples2',100]) </code></td>
            <td>There are many apples (100)</td>
            <td class="jstrans">There are many apples (100)</td>
        </tr>
        
        
        <tr>
            <td><code> trans_choice('jslang::demo.apples2',["one","two"]]) </code></td>
            <td>There are some apples (2)</td>
            <td class="jstrans">There are some apples (2)</td>
        </tr>
        
        
        
        <tr>
            <td><code> trans_choice('jslang::demo.books',["one","two"]]) </code></td>
            <td>There are 2 books.</td>
            <td class="jstrans">There are 2 books.</td>
        </tr>
        
        
        
        <tr>
            <td><code> trans_choice('jslang::demo.books2',4, ['theme'=&gt;'History']]) </code></td>
            <td>Four is a great number of books about History!</td>
            <td class="jstrans">Four is a great number of books about History!</td>
        </tr>
        
        
        
        <tr>
            <td><code> trans_choice('jslang::demo.books2',1000],['theme'=&gt;'History']) </code></td>
            <td>The number of books you have is uncountable!</td>
            <td class="jstrans">The number of books you have is uncountable!</td>
        </tr>
        
        
        <tr>
            <td><code> trans('jslang::demo.missing_key') </code></td>
            <td>jslang::demo.missing_key</td>
            <td class="jstrans">jslang::demo.missing_key</td>
        </tr>
        
        
    </tbody>
</table>

