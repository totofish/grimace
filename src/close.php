<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<script>

		function getSearch(name) {
    	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    	if (!results) {
    		return 0;
    	}
    	return results[1] || 0;
    }

	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	  ga('create', 'UA-66203609-1', 'auto');

    if(getSearch('post_id')){
      ga('send', 'pageview', 'share');
    }else{
      ga('send', 'pageview', 'shareCancel');
    }
	  
    setTimeout(function(){
      window.close();
    }, 500);

	</script>
</head>
<body>
</body>
</html>