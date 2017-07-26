$(document).ready(function(){
	getChannels();
	
})

/*获取音乐*/
function getChannels(){
	/*
	//获取音乐频道
	$.get('http://api.jirengu.com/fm/getChannels.php')
   .done(function(channelInfo){
    console.log(channelInfo)
	//var s = eval(channelInfo)
	alert(channelInfo.length);
	alert(typeof(channelInfo));//从后台获取到的是字符串，需要转换成json数组
	var theChannel = eval('(' + channelInfo + ')');
	console.log(theChannel);
	alert(theChannel.channels[0].name);
	for(var i=0;i<theChannel.channels.length;i++){
		//alert(theChannel.channels[i].name);
		$(".the-channels").find("ul").append("<li>"+theChannel.channels[i].name+"</li>")	
	}
	//需求
	for(thisChannel in theChannel.channels){
		//alert(theChannel.channels.thisChannel)
		$(".the-channels").find("ul").append("<li data-channel='"+theChannel.channels[thisChannel].channel_id+"'>"+theChannel.channels[thisChannel].name+"</li>")
	}
	

		//点击选择频道获取歌曲
	$(".the-channels").find("li").click(function(){
		var aChannel = $(this).data('channel');
		alert(aChannel);
		//ajax发送获取音乐请求
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
	})
	*/
	//获取随机歌曲
	$(".the-control-kj-sj").click(function(){
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
	
	});
	

}