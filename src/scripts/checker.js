require("imports?this=>window!./webpack-ie8.js");
require("../css/bootstrap.min.css");
//require('!style!css!sass!../css/mainStyle.scss'); // 如果想用內嵌就這樣設
require('../css/mainStyle.scss');

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
		$('body').html( require("html!../template/nosupport.html") );
		ga('send', 'event', 'nosupport', 'GG');
	}
});
