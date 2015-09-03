require("imports?this=>window!TweenMax");
require("imports?this=>window!TimelineMax");
require("imports?this=>window!createjs");
require("imports?this=>window!tweenjs");
require("imports?this=>window!movieclip");
require("imports?this=>window!bootstrap");
require("imports?this=>window!LZWEncoder");
require("imports?this=>window!NeuQuant");
var encode64 = require("b64");
require("imports?this=>window!GIFEncoder");
window.THREE = require("imports?this=>window!threejs");
require("imports?this=>window!CSS3DRenderer");
require("script!./help.js");


'use strict';
(function(){
	
	var camera, scene, renderer, area;
	var objects = [];

	window.init = function init(){
		//$('body').load( "template/main.html", initialize );
		$('body').html( require("html!../template/main.html") );
		initialize();
	}


	function initialize(){
		TweenMax.set(".t1",{rotationZ:-55+Math.random()*30, y:-250, x:-100, transformOrigin:"50% 50%"});
		TweenMax.set(".t2",{rotationZ:40+Math.random()*30, y:-200, x:$(window).width()-300, transformOrigin:"50% 50%"});
		TweenMax.set(".t3",{rotationZ:150+Math.random()*30, y:$(window).height()-400, x:$(window).width()/2 - 200, transformOrigin:"50% 50%"});
		TweenMax.set(".t4",{rotationZ:220+Math.random()*30, y:$(window).height()-500, x: -100, transformOrigin:"50% 50%"});

		camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.x = 1000;
		camera.position.y = 1000;
		camera.position.z = -800;

		scene = new THREE.Scene();
		area = new THREE.Object3D();
		for(var i=0; i<130; i++){
			$('#boxArea').append($('<div class="box"></div>'));
		}
		var elements = $('.box');
		var sw = screen.width;
		var sh = screen.height;
		$.each(elements, function(index, element){
			var object = new THREE.CSS3DObject( element );
			object.position.x = Math.random() * sw*6 - sw*3;
			object.position.y = Math.random() * sh*6 - sh*3;
			object.position.z = Math.random() * sw*6 - sw*3;
			object.rotation.x = Math.random();
			object.rotation.y = Math.random();
			object.rotation.z = Math.random();
			area.add(object);
		});
		// boy
		var boyArea = new THREE.Object3D();
		boyArea.position.z = -750;
		boyArea.rotation.y = 0.4;
		boyArea.rotation.z = -0.1;
		var boy = new THREE.CSS3DObject( $('.boy')[0] );
		boy.position.x = -450;
		boy.position.y = -40;
		boy.rotation.x = 0.1;
		boy.rotation.y = 1;
		boy.rotation.z = 0.1;
		boyArea.add(boy);
		var boyText = new THREE.CSS3DObject( $('#boyText')[0] );
		boyText.scale.multiplyScalar(1.5);
		boyText.position.x = 130;
		boyText.position.y = 130;
		boyText.rotation.x = 0.1;
		boyText.rotation.y = 0;
		boyText.rotation.z = 0.25;
		boyArea.add(boyText);

		// girl
		var girlArea = new THREE.Object3D();
		girlArea.position.x = 1500;
		girlArea.position.y = -1000;
		girlArea.position.z = 700;
		girlArea.rotation.x = 0.2;
		girlArea.rotation.y = -2.2;
		girlArea.rotation.z = 0;
		var girl_1 = new THREE.CSS3DObject( $('.girl')[0] );
		girl_1.position.x = 500;
		girl_1.position.y = -30;
		girl_1.position.z = -300;
		girl_1.rotation.x = 0;
		girl_1.rotation.y = -1.2;
		girl_1.rotation.z = 0;
		girlArea.add(girl_1);
		var girl_2 = new THREE.CSS3DObject( $('.girl')[1] );
		girl_2.position.x = 450;
		girl_2.position.y = 150;
		girl_2.position.z = -50;
		girl_2.rotation.x = 0;
		girl_2.rotation.y = -1.2;
		girl_2.rotation.z = 0;
		girlArea.add(girl_2);
		var girl_3 = new THREE.CSS3DObject( $('.girl')[2] );
		girl_3.position.x = 450;
		girl_3.position.y = -70;
		girl_3.position.z = 200;
		girl_3.rotation.x = 0;
		girl_3.rotation.y = -1.2;
		girl_3.rotation.z = 0;
		girlArea.add(girl_3);
		var girlText = new THREE.CSS3DObject( $('#girlText')[0] );
		girlText.scale.multiplyScalar(1.5);
		girlText.position.x = -150;
		girlText.position.y = 0;
		girlText.rotation.x = 0;
		girlText.rotation.y = 0;
		girlText.rotation.z = 0;
		girlArea.add(girlText);

		// help
		var helpArea = new THREE.CSS3DObject( $('#help')[0] );
		helpArea.position.x = -700;
		helpArea.position.y = -1090;
		helpArea.position.z = 600;
		helpArea.rotation.x = 0;
		helpArea.rotation.y = 2.3;
		helpArea.rotation.z = 0;

		// gifArea
		var gifArea = new THREE.CSS3DObject( $('#gifArea')[0] );
		gifArea.position.x = -1300;
		gifArea.position.y = 100;
		gifArea.position.z = 1000;
		gifArea.rotation.x = 1;
		gifArea.rotation.y = 0;
		gifArea.rotation.z = 1;

		// COPY
		var copyArea = new THREE.CSS3DObject( $('#copy-button')[0] );
		copyArea.position.x = -600;
		copyArea.position.y = -215;
		copyArea.position.z = 520;
		copyArea.rotation.x = 0;
		copyArea.rotation.y = 2.3;
		copyArea.rotation.z = 0;

		area.add(boyArea);
		area.add(girlArea);
		area.add(helpArea);
		area.add(gifArea);
		area.add(copyArea);
		scene.add( area );
		renderer = new THREE.CSS3DRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.domElement.style.position = 'absolute';
		document.getElementById( 'container' ).appendChild( renderer.domElement );

		var tl = new TimelineMax();
		tl.to(camera.position, 2, {delay:1, x:0, y:0, z:800, ease: Power2.easeInOut, onComplete:function(){$(window).trigger('resize');} });
		tl.to(boyArea.rotation, 10, {y:-0.2, z:0.1}, "-=2");
		tl.add( TweenMax.to(camera.rotation, 2, {x:0, y:-2, ease: Power2.easeInOut}), "-=5");
		tl.add( TweenMax.to(camera.position, 2, {z:0, y:-1000, ease: Power2.easeInOut, onComplete:function(){$(window).trigger('resize');} }), "-=5");
		tl.to(girlArea.rotation, 10, {y:-1.2}, "-=5");
		tl.add( TweenMax.to(camera.rotation, 2, {x:0, y:-4, ease: Power2.easeInOut, onComplete:function(){
			$(window).trigger('resize');
			help.play();
			help.addEventListener("tick", function(event){
				if(event.currentTarget.currentFrame >= 707){
					help.removeAllEventListeners();
					TweenMax.to(camera.position, 2, {delay:1, y:0, ease: Power2.easeInOut});
					TweenMax.to(gifArea.rotation, 2, {delay:1, x:0, z:0, y:2.3, ease: Power2.easeInOut});
					TweenMax.to(gifArea.position, 2, {delay:1, x:-700, y:-30, z:578, ease: Power2.easeInOut, onComplete:function(){
						TweenMax.killTweensOf(helpArea.rotation);
						GifJS();
					}});
					$(window).trigger('resize');
				}
			});
		}}), "-=5");


		TweenMax.to(helpArea.rotation, 4, {y:2.6, ease: Power2.easeInOut, startAt:{y:2}, repeat:-1, yoyo:true});

		createHelp();
		createCopy();

		animate();
	}

	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
	}

	$(window).resize(function(){
		var w = $(this).width();
		var h = $(this).height();
		TweenMax.to(".t1", 1,{rotationZ:-55+Math.random()*30, y:-400 + Math.random()*200, x:-100, transformOrigin:"50% 50%"});
		TweenMax.to(".t2", 1,{rotationZ:40+Math.random()*30, y:-200, x:w-300, transformOrigin:"50% 50%"});
		TweenMax.to(".t3", 1,{rotationZ:150+Math.random()*60, y:$(window).height()-400, x:$(window).width()/2 - 200, transformOrigin:"50% 50%"});
		TweenMax.to(".t4", 1,{rotationZ:220+Math.random()*30, y:$(window).height()-500, x:-100 - Math.random()*200, transformOrigin:"50% 50%"});

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );

	});

	// canvas
	var canvas, stage, help;

	function createHelp(){
		canvas = document.getElementById("help");
		help = new lib.help(null, 0, false);
		help.stop();
		stage = new createjs.Stage(canvas);
		stage.addChild(help);
		stage.update();

		createjs.Ticker.setFPS(55);
		createjs.Ticker.addEventListener("tick", stage);
	}
	

	// JSGIF
	function GifJS(){
		ga('send', 'pageview', 'editGIF');
		var canvas = document.getElementById('bitmap');
		var context = canvas.getContext('2d');
		var gif_w = 470;
		var gif_h = 470;
		var hasImg = false;
		canvas.width = gif_w;
		canvas.height = gif_h;

		var encoder = new GIFEncoder();
		encoder.setRepeat(0); //auto-loop
		encoder.setDelay(600);
		encoder.setSize(gif_w, gif_h);

		window.ondragover = function () { $('.drag').addClass('hover'); $('#gifArea').addClass('hover'); return false; };
		window.ondragleave = function () { $('.drag').removeClass('hover'); $('#gifArea').removeClass('hover'); return false; };
		window.ondragend = function () { $('.drag').removeClass('hover'); $('#gifArea').removeClass('hover'); return false; };
		window.ondrop = function (e) {
		  $('.drag').removeClass('hover');
		  $('#gifArea').removeClass('hover');
		  e.preventDefault();
		  if(e.dataTransfer.files.length == 0) return;
		  TweenMax.to($('#copy-button'), 0.5, {autoAlpha:0, onComplete:function(){
		  	$('#copy-button').css('display','none');
		  } });
		  encoder.start();
		  hasImg = false;
		  startLoad(e.dataTransfer.files, 0);
		  return false;
		};

		function startLoad(files, num){
		  if(num >= files.length){
		    encoder.finish();
		    if(!hasImg) return;
		    $('#bitmap').css('display','none');
		    var gifBase64 = 'data:image/gif;base64,'+encode64(encoder.stream().getData());
			$('#gif').css('display','initial').attr('src', gifBase64);
			$.post('api/canvas_upload.php',{ gif:gifBase64 },function(data){
				if(data.error === 0){
					var sharelink = "https://www.facebook.com/dialog/feed?app_id=1612839722299015&display=popup&caption"
					+ "&link="+encodeURIComponent("https://fb.webgene.com.tw/grimace/upload/"+data.gif)
					+ "&redirect_uri="+encodeURIComponent("https://fb.webgene.com.tw/grimace/close.php")
 					+ "&picture="+encodeURIComponent("https://fb.webgene.com.tw/grimace/upload/"+data.gif)
					+ "&description="+encodeURIComponent("叫我今日最佳鬼臉王")
					+ "&name="+encodeURIComponent("鬼臉３連拍");
					TweenMax.killTweensOf($('#copy-button'));
					$('#copy-button').attr('data-clipboard-text', sharelink).css('display','initial');
					TweenMax.to($('#copy-button'), 1, {autoAlpha:1, startAt:{autoAlpha:0} });
				}else{
					$('#copyMsg .modal-content').html('儲存失敗');
					$('#copyMsg').modal('show');
				}
			},'json').fail(function() {
				$('#copyMsg .modal-content').html('連線失敗');
				$('#copyMsg').modal('show');
			});
			ga('send', 'event', 'gif', 'create');
		    return;
		  }
		  var file = files[num];
		  var reader = new FileReader();
		  reader.onload = function (event) {
		    var imageObj = new Image();
		    imageObj.onerror = function(){
				startLoad(files, num+1);
			}
		    imageObj.onload = function() {
		      context.fillStyle = "rgb(255,255,255)";  
		      context.fillRect(0,0,canvas.width, canvas.height);
		      var w = imageObj.width;
		      var h = imageObj.height;
		      var newW, newH;
		      if(w / h > gif_w / gif_h){
		      	newW = w * (gif_h / h);
		      	newH = gif_h;
		      }else{
		      	newW = gif_w;
		      	newH = h * (gif_w / w);
		      }
		      //context.drawImage(this, 0, 0, imageObj.width, imageObj.height, 0, 0, gif_w, gif_h);
		      context.drawImage(this, (gif_w-newW)/2, (gif_h-newH)/2, newW, newH);
		      encoder.addFrame(context);
		      hasImg = true;
		      startLoad(files, num+1);
		    };
		    imageObj.src = event.target.result;
		  };
		  reader.onerror = function(){
		  	startLoad(files, num+1);
		  }
		  reader.readAsDataURL(file);
		}


		function getWebPath() {
			var path;
			if(location.hash != ""){
				path = location.href.split(location.hash).slice(0,-1)[0];
			}else{
				path = location.href;
			}
			return path.split("/").slice(0, -1).join('/') + '/';
		}
	}

	// COPY
	function createCopy(){
		$('#copy-button').click(function(){
			ga('send', 'event', 'gif', 'share');
			window.open($(this).attr('data-clipboard-text'));
		});
	}











})();