<?php

use Illuminate\Support\Facades\App;


if (! function_exists('jslang')) {


    function jslang($options = []){

        $path = public_path(config('jslang.public_dir'));
        $manifest_json = file_get_contents($path . '/jslang_manifest.json');
        $manifest = json_decode($manifest_json);


        $jslang2_get_current_locale = function() use (&$manifest){

            $locale = App::getLocale();

            if($locale && isset($manifest->{$locale})){
                return $manifest->{$locale};
            }

            $locale = config('jslang.default_locale');

            return $manifest->{$locale};           

        };


        try {
        
            $locale = App::getLocale();

            $legacy = '';
            if(isset($options['legacy']) && $options['legacy']){
                $legacy = 'JSLang.declareGlobal();';
            }


            $lang_url = $jslang2_get_current_locale();

            $content = <<<JSSCRIPT
                <!-- JSLang2 -->
                <script src="$lang_url"></script>
                <script>

                    (function(){

                        JSLang.init('$locale', $manifest_json, JSLang_CURRENT_DICT);
                        $legacy

                    })();
                </script>
JSSCRIPT;

            return $content;

            /**/
        
        
        } catch (\Exception $e){
            error_log($e);

            $content = <<<JSSCRIPT
                <!-- JSLang2 Error -->
                <script>
                    (function(){

                        console.error('Error including jslang files');
                    })();
                </script>
JSSCRIPT;

            return $content;

        }
        
        
    }

}