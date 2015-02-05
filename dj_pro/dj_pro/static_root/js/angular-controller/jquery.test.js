app.controller('jquery_test_ctrl', function($scope,$timeout) {
    console.log('work');
        $("#test").click(function(){
            $(this).hide();
            console.log(this);
            $("p").addClass('btn btn-success alter');
            $("p").removeClass('btn-success');
            console.log($("p").text());
            console.log($("p").text('jquery'));
   //         console.log($("p").html());
    });
        $("#toggle").click(function(){
            $("#test").toggle();
        });
        
    var foo = function( value ) {
        console.log( "foo: " + value );
    };
 
// another function to also be added to the list
    var bar = function( value ){
        console.log( "bar: " + value );
    };
 
    var callbacks = $.Callbacks();
 
// add the function "foo" to the list
    callbacks.add( foo );
    
    console.log( "1.comfirm been callbacked:" + callbacks.fired() );   //false
// fire the items on the list
    callbacks.fire( "hello" );
// outputs: "foo: hello"
    console.log( "2.comfirm been callbacked:" + callbacks.fired() );  //true
    console.log(callbacks.has( foo ));

    callbacks.remove( foo );
 
// add the function "bar" to the list
    callbacks.add( bar );
 
// fire the items on the list again
    callbacks.fire( "world" );
    
    callbacks.add( foo );

    callbacks.empty();

    console.log(callbacks.has( foo ) + callbacks.has( bar ));

    $( "div.test" ).click(function() {
        console.log('here');
        $("p",this).hide();
    });
    /* put it in to the head run it first
    $.holdReady(true);
    
    $.getScript("../angular-controller/checkuser_cookie.js", function() {
    
    $.holdReady(false);
    */
    //do it like python dict
    var foo = {foo: "bar", hello: "world"};
 
    // Pass it to the jQuery function
    var $foo = $( foo );
 
    // test accessing property values
    var test1 = $foo.prop( "foo" ); // bar
    console.log(test1);
 
    // test setting property values
    $foo.prop( "foo", "foobar" );
    var test2 = $foo.prop( "foo" ); // foobar
    console.log(test2);
    console.log($foo);
 
    // test using .data() as summarized above
    $foo.data( "keyName", "someValue");
    console.log( $foo ); // will now contain a jQuery{randomNumber} property
 
    // test binding an event name and triggering
    $foo.bind( "eventName", function () {
        console.log("eventName was called");
    });
 
    $foo.trigger( "eventName" ); // logs "eventName was called"

    $( "div#sed > p").css("border", "1px solid gray");
});
