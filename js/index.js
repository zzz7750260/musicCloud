$(document).ready(function(){
	getChannels();
	
})

/*获取音乐*/
function getChannels(){
	var aChannel;
	//获取音乐频道
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
		alert(aChannel);
		hqSong(aChannel);
		alert($(".a-audio")[0].ended);	
		return aChannel;
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
		return aChannel;
	});	
	
	//当歌播放结束后自动切换
	//setinterval监控音乐播放状态，true为音乐播放结束
	setInterval(function(aChannel){
		//alert(aChannel);
		//alert($(".a-audio")[0].ended);
		if($(".a-audio")[0].ended == true){
				//alert("播放完，下一首");
				hqSong(aChannel);
		}
	},50);
}

//根据频道获取歌曲（包括随机）
function hqSong(theChannels){
	alert(theChannels);
	$.ajax({
		url:'https://jirenguapi.applinzi.com/fm/getSong.php',
		data:{channel:''+theChannels+''},
		type:'get',
		dataType:'json',
		success:function(msg){
			console.log(msg);
			$(".the-audio").find("audio").attr("src",""+msg.song[0].url+"");
			$(".the-audio-fm-title").text(""+msg.song[0].title+"");
			$(".the-audio-fm").find("img").attr("src",""+msg.song[0].picture+"");
			$(".the-audio-fm-gs").text(""+msg.song[0].artist+"");
		}
	})
}