require("imports?this=>window!./webpack-ie8.js");
require("../css/bootstrap.min.css");
require("../css/mainStyle.css");

//require("script!./modernizr.custom.82438.js");
require("imports?this=>window!modernizr");



$(function(){
	// !!Modernizr.csstransforms3d
	if(!!Modernizr.canvas && !!Modernizr.draganddrop){
		var mainload = require("bundle?lazy!./main.js");
		mainload(function(file) {
			init();
		});
		/*
		require.ensure([], function () {
	    	var Home = require([ './main.js' ]);
	    });
		*/
	}else{
		//$('body').load( "template/nosupport.html" );
		$('body').html( require("html!../template/nosupport.html") );
		ga('send', 'event', 'nosupport', 'GG');
	}
});
