$(document).ready(function(){
	getChannels();
	musicControl();
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
	var theGcIrc;  //歌词地址
	var theGcImg;  //歌的图片地址
	var theGcTitle; //歌的歌名
	var theGcArtist; //歌的专辑
	var theGcSrc  //歌的地址
	
	$(".the_audio_right_gc").find("p").empty(); //当切换歌时将原来的歌词清空
	
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
			 theGcSrc = msg.song[0].url;
			 theGcImg = msg.song[0].picture;
			 theGcTitle = msg.song[0].title;
			 theGcArtist = msg.song[0].artist;
			 alert(theGcId+"第一次");
			// alert(msg.song[0].picture);
			 	//异步请求后，在成功后再进行dom操作
			alert("图片地址："+theGcImg);
			//$(".a-audio").attr("src",""+theGcSrc+"");
			//$(".the-audio-fm-title").text(""+theGcTitle+"");
			//$(".the-audio-fm").find("img").attr("src",""+theGcImg+"");
			//$(".the-audio-fm-gs").text(theGcArtist);
			$(".a-audio").attr("src",""+theGcSrc+"");
			$(".the_audio_left_fm_title").text(""+theGcTitle+"");
			$(".the_audio_left_fm").find("img").attr("src",""+theGcImg+"");
			$(".the_audio_left_fm_gs").text(""+theGcArtist+"");
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
			$(".the_audio_right_gc").find("p").append(""+gcMsg.lyric+"");
			
		}
		
	})
	bgChange();  //当切换歌曲的时候同时切换图片
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

function musicControl(){
	var playZy = {
		theZt:function(){
			musicControlZt();
		},
		theTd:function(){
			musicControlTd();	
		},
		theYd:function(){
			musicbtnHd();
		},
		theKj:function(){
			musicControlKJ();
		}
	}
	playZy.theZt();
	playZy.theTd();	
	playZy.theYd();	
	playZy.theKj();	
}

function musicControlZt(){
	var b ;//缓存的百分百
	//console.log(z); 
	var time;
	var s;
	var z;
	 time = setInterval(function(){
		s = $(".a-audio")[0].buffered.end(0);//获取当前缓冲的秒数
		z = $(".a-audio")[0].duration;//获取歌曲的总秒数
		//alert("弹出状态栏");
		//alert(s);
		b = s/z*100+"%";
		//alert(b);
		console.log(b);
		$(".the_control_k_jd_k_hc").css({
			"width":b,
		})//改变缓存条
		//alert(b);
		console.log(parseFloat(b));
		/*if(parseFloat(b) >= 100){
			alert("加载完");
			clearInterval(time);
		}*/
	},5000);
	alert("当前比为:"+b)
	//console.log(parseFloat(b));
}

function musicControlTd(){
	var theFlat = false;
	var left = 0;
	var td_left =0;
	var btn_width = $(".the_control_k_jd_k_hl_btn").width();//获取按键的宽度
	var td_left_p //声明进度条百分比
	var jdk_width = $(".the_control_k_jd_k").width();//获取进度条的宽度;
	var x_width = $(".the_control_k_jd").offset().left;//进度条到文档宽的距离
	var play_time //声明跳转到播放时间
	var z_time ;//获取歌曲的总秒数
	alert("进度条到文档："+x_width);
	alert("进度条宽："+jdk_width);
	$(".the_control_k_jd_k_hl_btn").mousedown(function(){
		theFlat = true;
		$(".the_control_k_jd_k_hl_btn").addClass("btn_active");
	})
	$(document).mouseup(function(){
		theFlat = false;
		$(".the_control_k_jd_k_hl_btn").removeClass("btn_active");
	})
	//点击按钮拖动
	$(".the_control_k_jd_k").mouseover(function(e){
		//theFlat = true;
		if(theFlat==true){
			$(".the_control_k_jd_k_hl_btn").addClass("btn_active");
			td_left = e.pageX-left-x_width;
			//alert("鼠标"+e.pageX);
			//alert("位置"+td_left);
			if(td_left<0){
				td_left = 0;
			}
			if(td_left>jdk_width){
				td_left = jdk_width;
			}
			td_left_p = (td_left/jdk_width)*100+"%";
			$(".the_control_k_jd_k_hl_btn").css({
				"left":(td_left-btn_width/2)/jdk_width*100+"%",
			})
			$(".the_control_k_jd_k_hl").css({
				"width":td_left_p,
			})
			$(".x-text").html("鼠标位置"+e.pageX+";进度条到文档:"+x_width+";拖动位置:"+td_left+"百分比:"+td_left_p);
			console.log(td_left_p);
			
			//利用currentTime跳转到指定播放时间
			play_time = td_left_p*z_time;
		}
	})
	//点击进度条跳转到指定地方
	$(".the_control_k_jd_k").mousedown(function(e){
		z_time = $(".a-audio")[0].duration;
		var jd_click_w = e.pageX - x_width;
		var jd_btn_click_width = e.pageX - x_width-btn_width/2;
		$(".the_control_k_jd_k_hl_btn").addClass("btn_active");
		$(".the_control_k_jd_k_hl_btn").css({
			"left":jd_btn_click_width/jdk_width*100+"%",
		})
		$(".the_control_k_jd_k_hl").css({
			"width":(jd_click_w/jdk_width)*100+"%",
		})
		td_left_p_w = (jd_click_w/jdk_width)*100+"%";
		play_time = parseFloat(td_left_p_w)*z_time/100;
		alert("总时间："+z_time);
		alert("当前时间："+play_time);
		$(".a-audio")[0].currentTime = play_time;
	})
	//alert("总时间："+z_time);
}

function musicbtnHd(){
	var b_time;//返回的时间
	var z_time;//返回的总时间
	var time = setInterval(function(){
		b_time = $(".a-audio")[0].currentTime;
		z_time = $(".a-audio")[0].duration;//获取歌曲的总秒数
		s_timea_b = b_time/z_time*100+"%";
		//alert(s_timea_b);
		$(".the_control_k_jd_k_hl_btn").css({
			"left":s_timea_b,
		});
		$(".the_control_k_jd_k_hl").css({
			"width":s_timea_b,
		});
	},100);
}

function musicControlKJ(){
	//开始控件
	$(".the_control_start").click(function(){
		$(".a-audio")[0].play();
	})
	//暂停控件
	$(".the_control_stop").click(function(){
		$(".a-audio")[0].pause();
	})
}	