<?php


if (! function_exists('jslang')) {


    function jslang(){
        
        try {
        
            $path = public_path(config('jslang.public_dir'));
            $manifest_file = $path . '/jslang_manifest.json';
            $content = json_decode(file_get_contents($manifest_file));
            
            return $content->{App::getLocale()};
        
        } catch (\Exception $e){
            return "error_including_jslang_file.js";
        }
        
    }

}