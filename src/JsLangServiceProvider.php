<?php

namespace Javfres\JsLang;

use Illuminate\Support\ServiceProvider;

class JsLangServiceProvider extends ServiceProvider {

    public function boot(){
        
        // https://laravel.com/docs/5.6/packages#configuration    
        $this->publishes([
            __DIR__.'/../config/jslang.php' => config_path('jslang.php'),
        ]);
        
        $this->loadViewsFrom(__DIR__.'/../views', 'jslang');
        
        $this->loadTranslationsFrom(__DIR__.'/../lang', 'jslang');
                
    }

    public function register(){

        $this->mergeConfigFrom(
            __DIR__.'/../config/jslang.php', 'jslang'
        );

        if ($this->app->runningInConsole()) {
            $this->commands([JSLangCommand::class]);
        }
            
        require_once __DIR__.'/helper.php';
    
    }
    
}
