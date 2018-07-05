<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>JsLang demo</title>
  <meta name="description" content="JsLang demo">
  <meta name="author" content="Javi">

  <style>
    table { width: 100%; }
    table, th, td {
        border: 1px solid black;
    }
  </style>
  <script src="{{ jslang() }}"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  
  <script>
  
    var translations = [];
  
    function add_trans(x){
        translations.push(x);
    }
    
    $(function(){
        
        $( ".jstrans" ).each(function( i ) {
            $(this).text(translations[i]);
        });
        
    });
  
  </script>

</head>
<body>


    
    <h1>JsLang demo</h1>

    <p> Locale is <b>'{{ App::getLocale() }}'</b>, demo works only for 'en' </p>

    <?php App::setLocale('en'); ?>
    

    <table>
        <tr>
            <th>key</th>
            <th>Laravel php trans</th>
            <th>JsLang trans</th>
        </tr>
        
        {{-- ------------------------------ --}}
        <tr>
            <td><code> trans('jslang::demo.name') </code></td>
            <td>{{ trans('jslang::demo.name') }}</td>
            <td class='jstrans'>
                <script>
                    add_trans( trans('jslang::demo.name') );
                </script>
            </td>
        </tr>
        
        {{-- ------------------------------ --}}
        <tr>
            <td><code> trans('jslang::demo.welcome',['name'=>'You']) </code></td>
            <td>{{trans('jslang::demo.welcome',['name'=>'You'])  }}</td>
            <td class='jstrans'>
                <script>
                    add_trans( trans('jslang::demo.welcome',{'name':'You'})  );
                </script>
            </td>
        </tr>
        
        
        {{-- ------------------------------ --}}
        <tr>
            <td><code> trans_choice('jslang::demo.apples',1) </code></td>
            <td>{{trans_choice('jslang::demo.apples',1)  }}</td>
            <td class='jstrans'>
                <script>
                    add_trans( trans_choice('jslang::demo.apples',1)  );
                </script>
            </td>
        </tr>
        
        {{-- ------------------------------ --}}
        <tr>
            <td><code> trans_choice('jslang::demo.apples',10) </code></td>
            <td>{{trans_choice('jslang::demo.apples',10)  }}</td>
            <td class='jstrans'>
                <script>
                    add_trans( trans_choice('jslang::demo.apples',10)  );
                </script>
            </td>
        </tr>
        
        {{-- ------------------------------ --}}
        <tr>
            <td><code> trans_choice('jslang::demo.apples',["one","two"]]) </code></td>
            <td>{{trans_choice('jslang::demo.apples',["one","two"])  }}</td>
            <td class='jstrans'>
                <script>
                    add_trans( trans_choice('jslang::demo.apples',["one","two"])  );
                </script>
            </td>
        </tr>
        
        
        {{-- ------------------------------ --}}
        <tr>
            <td><code> trans_choice('jslang::demo.apples2',0]) </code></td>
            <td>{{trans_choice('jslang::demo.apples2',0)  }}</td>
            <td class='jstrans'>
                <script>
                    add_trans( trans_choice('jslang::demo.apples2',0)  );
                </script>
            </td>
        </tr>
        
        {{-- ------------------------------ --}}
        <tr>
            <td><code> trans_choice('jslang::demo.apples2',100]) </code></td>
            <td>{{trans_choice('jslang::demo.apples2',100)  }}</td>
            <td class='jstrans'>
                <script>
                    add_trans( trans_choice('jslang::demo.apples2',100)  );
                </script>
            </td>
        </tr>
        
        {{-- ------------------------------ --}}
        <tr>
            <td><code> trans_choice('jslang::demo.apples2',["one","two"]]) </code></td>
            <td>{{trans_choice('jslang::demo.apples2',["one","two"])  }}</td>
            <td class='jstrans'>
                <script>
                    add_trans( trans_choice('jslang::demo.apples2',["one","two"])  );
                </script>
            </td>
        </tr>
        
        
        {{-- ------------------------------ --}}
        <tr>
            <td><code> trans_choice('jslang::demo.books',["one","two"]]) </code></td>
            <td>{{trans_choice('jslang::demo.books',["one","two"])  }}</td>
            <td class='jstrans'>
                <script>
                    add_trans( trans_choice('jslang::demo.books',["one","two"])  );
                </script>
            </td>
        </tr>
        
        
        {{-- ------------------------------ --}}
        <tr>
            <td><code> trans_choice('jslang::demo.books2',4, ['theme'=>'History']]) </code></td>
            <td>{{trans_choice('jslang::demo.books2',4,['theme'=>'History'])  }}</td>
            <td class='jstrans'>
                <script>
                    add_trans( trans_choice('jslang::demo.books2',4,{'theme':'History'})  );
                </script>
            </td>
        </tr>
        
        
        {{-- ------------------------------ --}}
        <tr>
            <td><code> trans_choice('jslang::demo.books2',1000],['theme'=>'History']) </code></td>
            <td>{{trans_choice('jslang::demo.books2',1000,['theme'=>'History'])  }}</td>
            <td class='jstrans'>
                <script>
                    add_trans( trans_choice('jslang::demo.books2',1000,{'theme':'History'})  );
                </script>
            </td>
        </tr>
        
        {{-- ------------------------------ --}}
        <tr>
            <td><code> trans('jslang::demo.missing_key') </code></td>
            <td>{{ trans('jslang::demo.missing_key') }}</td>
            <td class='jstrans'>
                <script>
                    add_trans( trans('jslang::demo.missing_key') );
                </script>
            </td>
        </tr>
        
        
    </table>
    
</body>
</html>