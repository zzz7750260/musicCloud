$(document).ready(function(){
	getChannels();
	
})

/*获取音乐*/
function getChannels(){
	//获取音乐频道
	var aChannel;
	$.get('https://jirenguapi.applinzi.com/fm/getChannels.php')
   .done(function(channelInfo){
    console.log(channelInfo)
	//var s = eval(channelInfo)
	alert(channelInfo.length);
	alert(typeof(channelInfo));//从后台获取到的是字符串，需要转换成json数组
	var theChannel = eval('(' + channelInfo + ')');
	console.log(theChannel);
	alert(theChannel.channels[0].name);
	/*
	for(var i=0;i<theChannel.channels.length;i++){
		//alert(theChannel.channels[i].name);
		$(".the-channels").find("ul").append("<li>"+theChannel.channels[i].name+"</li>")	
	}*/
	
	//需求
	for(thisChannel in theChannel.channels){
		//alert(theChannel.channels.thisChannel)
		$(".the-channels").find("ul").append("<li data-channel='"+theChannel.channels[thisChannel].channel_id+"'>"+theChannel.channels[thisChannel].name+"</li>")
	}
	
		//点击选择频道获取歌曲
	$(".the-channels").find("li").click(function(){
		aChannel = $(this).data('channel');
	//	alert(aChannel);
		hqSong(aChannel);
		alert($(".a-audio")[0].ended);	
		
		//return aChannel;
		//ajax发送获取音乐请求
		//jsonp解决跨域问题
		/*
		$.get('https://jirenguapi.applinzi.com/fm/getSong.php',{channel: ''+aChannel+''})
		   .done(function(song){
			console.log(song);
			alert(typeof(song));
			var theSong = eval('('+ song +')');
			console.log(theSong);
			$(".the-audio").find("audio").attr("src",""+theSong.song[0].url+"");
			$(".the-audio-fm-title").text(""+theSong.song[0].title+"");
			$(".the-audio-fm").find("img").attr("src",""+theSong.song[0].picture+"");
			$(".the-audio-fm-gs").text(""+theSong.song[0].artist+"");
		  });
		 
		$.ajax({
			url:"https://jirenguapi.applinzi.com/fm/getSong.php",
			data:{channel:''+aChannel+''},
			//dataType:'json',
			type:'post',
			dataType:'jsonp',
			jsonp:"callback",
			success:function(msg){
				console.log(msg);
				$(".the-audio").find("audio").attr("src",""+msg.song[0].url+"");
				$(".the-audio-fm-title").text(""+msg.song[0].title+"");
				$(".the-audio-fm").find("img").attr("src",""+msg.song[0].picture+"");
				$(".the-audio-fm-gs").text(""+msg.song[0].artist+"");
			}
		})
		 */
		 
	})
   })
	
	
	
	//获取随机歌曲
	$(".the-control-kj-sj").click(function(){
		/*
		$.get('https://jirenguapi.applinzi.com/fm/getSong.php')
	   .done(function(song){
		console.log(song)
		var sjSong = eval('('+ song +')');
			$(".the-audio").find("audio").attr("src",""+sjSong.song[0].url+"");
			$(".the-audio-fm-title").text(""+sjSong.song[0].title+"");
			$(".the-audio-fm").find("img").attr("src",""+sjSong.song[0].picture+"");
			$(".the-audio-fm-gs").text(""+sjSong.song[0].artist+"");
	  });		
	})
	*/
		aChannel = parseInt(Math.random()*40);	
		hqSong(aChannel);
		//return aChannel;
	});	
	
	setInterval(function(){qhbf(aChannel)},5000);
}

//根据频道获取歌曲（包括随机）
function hqSong(theChannels){
	var theGcId;   //歌的id，只要根据id获取歌词
	var theGcIrc  //歌词地址
	bgChange();  //当切换歌曲的时候同时切换图片
	$(".the-audio-gc").find("p").empty(); //当切换歌时将原来的歌词清空
	
	alert(theChannels);
	$.ajax({
		url:'https://jirenguapi.applinzi.com/fm/getSong.php',
		data:{channel:''+theChannels+''},
		type:'get',
		dataType:'json',
		async:false,//异步请求,这里需要需要ajax的异步请求，在服务器端响应完后再进行一下操作
		success:function(msg){
			console.log(msg);
			 theGcId = msg.song[0].sid;
			 alert(theGcId+"第一次");
			$(".the-audio").find("audio").attr("src",""+msg.song[0].url+"");
			$(".the-audio-fm-title").text(""+msg.song[0].title+"");
			$(".the-audio-fm").find("img").attr("src",""+msg.song[0].picture+"");
			$(".the-audio-fm-gs").text(""+msg.song[0].artist+"");
		}
	})
	alert(theGcId+"第二次");
	//ajax获取对应歌曲的歌词
	$.ajax({
		url:'https://jirenguapi.applinzi.com/fm/getLyric.php',//饥人谷的获取歌词地址
		type:'post',
		data:{sid:''+theGcId+''},
		dataType:'json',
		success:function(gcMsg){
			console.log(gcMsg.lyric);
			$(".the-audio-gc").find("p").append(""+gcMsg.lyric+"");
			
		}
		
	})
	
}

//设置setInterval的方法
function qhbf(sChannel){
		console.log(sChannel);
		//alert($(".a-audio")[0].ended);
		if($(".a-audio")[0].ended == true){
				//alert("播放完，下一首");
				hqSong(sChannel);
				
		}
}
	//console.log(sChannel)
	//当歌播放结束后自动切换
	//setinterval监控音乐播放状态，true为音乐播放结束

	
//当音乐完了之后进行切换图片
function bgChange(){
	//var l = bg.length;
	//alert(l);
	//var cImg;
	$.ajax({
		url:'./json/musicBg.json',
		type:'get',
		dataType:'json',
		//async:false,//异步请求,这里需要需要ajax的异步请求，在服务器端响应完后再进行一下操作
		success:function($data){
			alert('这个是切换图片');
			var l = $data.bg.length;			
			var s = parseInt(Math.random()*l);
			alert(s);
			console.log($data.bg[s].theBg);
			alert($data.bg[s].theBg);
			var cImg = $data.bg[s].theBg
			//alert($data.bg);
			//console.log($data);
			alert(cImg);
			$(".the-background").css({
				'backgroundImage':'url('+cImg+')',
			})
		},
		error:function($data){
			alert('这个是弹出失败');
		}
	})
		/*
			alert(cImg);
			$(".the-background").css({
				'backgroundImage':'url('+cImg+')',
			})
			*/
}
	