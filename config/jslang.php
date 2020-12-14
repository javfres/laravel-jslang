<?php

return [

    //
    // List of locales, a empty array means all of them
    //
    'locales'        => [],
    // 'locales' => ['en','es'], // Example with only english and spanish
    
    //
    // Default locale
    //
    'default_locale' => 'en',

    //
    // List of files, a empty array means all of them
    //
    'files'          => [],
    // 'files' => ['auth','errors','shop::messages'], // Example with a list of files (namespace supported)

    //
    // Path inside public to store the javascript files
    //
    'public_dir'     => 'jslang',
    
    //
    // Prefix of the javascript files. They will be "${public_dir}/${js_file_prefix}${locale}.js"
    //
    'js_file_prefix' => 'jslang_',
    
    //
    // Trim the string to optimize the result
    //
    'trim'           => true,
    
];