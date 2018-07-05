<?php

namespace Javfres\JsLang;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Lang;

class JSLangCommand extends Command {
    
    
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'javfres:jslang';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'JS lang';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle() {

        //
        // Init
        //
        $this->alert("JsLang package to generate javacript laravel translations");


        //
        // Get the locales
        //
        $locales = config('jslang.locales');
        if(empty($locales)) $locales = $this->get_all_locales();
        error_log("Locales:");
        foreach($locales as $locale) error_log("* $locale");
        error_log("");

        //
        // Get the files
        //
        $files = config('jslang.files');
        if(empty($files)) $files = $this->get_all_files();
        error_log("Files:");
        foreach($files as $file) error_log("* $file");
        error_log("");

        //
        // Generate the dicts
        //
        $this->manifest = [];
        foreach($locales as $locale){
            error_log("Generating js dict for $locale");
            $this->generate_dict($locale, $files);
        }
        
        $this->generate_manifest();
        
    }
    
    
    //
    // Get the lang namespaces
    //
    private function get_namespaces(){
        
        $loader = Lang::getLoader();

        $namespaces = [];
        $namespaces['*'] = app('path.lang'); // Default namespace
        foreach ($loader->namespaces() as $namespace => $path){
            $namespaces[$namespace] = $path;
        }
        
        return $namespaces;
        
    }
    
    
    //
    // Get the locales of all namespaces
    //
    private function get_all_locales(){
        
        $namespaces = $this->get_namespaces();

        $locales = [];
        foreach($namespaces as $namespace => $path){
            $locales = array_unique(array_merge($this->get_locales_path($path), $locales));
        }
        
        return $locales;
        
    }
    
    
    //
    // Get the locales of a path
    //
    private function get_locales_path($path){
        
        $scan = scandir($path);
        $scan = array_diff($scan, [".", ".."]);
        $locales = [];
        
        foreach($scan as $s){
            if(strlen($s) !== 2) continue;
            if(!is_dir($path . '/' . $s)) continue;
            $locales[] = $s;
        }
        
        return $locales;
    }
    
    
    
    private function get_all_files(){
        
        $files = [];
        $namespaces = $this->get_namespaces();
        $locales = $this->get_all_locales();

        foreach($namespaces as $namespace => $path){
            foreach($locales as $locale) {
                
                $full_path = $path . '/' . $locale;
                if(!is_dir($full_path)) continue;
                
                $scan = scandir($full_path);
                $scan = array_diff($scan, [".", ".."]);    
                                
                foreach($scan as $file){
                    
                    $parts = pathinfo($file);
                    if(strtolower($parts['extension']) !== 'php') continue;
                    
                    $group = $parts['filename'];
                    $key = $namespace === '*' ? $group : $namespace . '::' . $group;
                                        
                    $files[] = $key;
                    
                } // foreach scan
                
                                
            } // foreach
        } // foreach
        
        return array_unique($files);
    }
    
    
    
    
    private function generate_dict($locale, $files){
        
        //JH::log("Generating $locale lang");
        
        $dict = [];
        
        foreach($files as $key){
            
            $parts = explode('::', $key);
            if(count($parts) === 1){
                $namespace = '*';
                $file = $key; 
            } else {
                $namespace = $parts[0];
                $file = $parts[1];
            }
            
            $lang_data = Lang::get($key, [], $locale);
            if(config('jslang.trim')){
                $lang_data = $this->optimize_trim($lang_data);
            }
            $dict[$namespace][$file] = $lang_data;               
        }
        
        //
        // Save the file in public
        //
        $path = public_path(config('jslang.public_dir'));
        if (!file_exists($path)) mkdir($path);
        
        $json_dict = json_encode($dict);
        
        $js_file = file_get_contents(__DIR__.'/../dist/trans-compiled.js');
        $js_file = str_replace('JsLang_DICT', $json_dict, $js_file);
        
        $js_prefix = config('jslang.js_file_prefix');
        $js_file_name = "$js_prefix$locale.js";
        $js_file_path = $path . '/' . $js_file_name;
        
        file_put_contents($js_file_path, $js_file);
        
        $hash = hash_file('md5', $js_file_path);
        
        $this->manifest[$locale] = config('jslang.public_dir') . '/' . $js_file_name . '?' . $hash;
        
    }
    
    private function generate_manifest(){
        
        $content = json_encode($this->manifest, JSON_PRETTY_PRINT);
        
        $path = public_path(config('jslang.public_dir'));
        $manifest_file = $path . '/jslang_manifest.json';
        file_put_contents($manifest_file, $content);

    }
    
    
    private function optimize_trim($x){
    
        
        if(is_array($x)){
            $x = array_map('self::optimize_trim', $x);
        }
        
        if(is_string($x)){
            $x = trim($x);
            $arr = explode('|',$x);
            $arr = array_map('trim', $arr);
            $x = implode('|',$arr);
        }
        
        return $x;
    
    }
    




}
