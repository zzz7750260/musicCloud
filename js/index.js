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
	
	$(".the_audio_right_gc_k_nr").find("ul").empty(); //当切换歌时将原来的歌词清空
	
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
			
			//添加历史
			musicHistory(msg);
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
			//$(".the_audio_right_gc").find("p").append(""+gcMsg.lyric+"");
			//console.log(gcMsg);
			console.log("这个是分段2222========================");
			console.log(gcSplit2(gcMsg.lyric));
			var gcArr = gcSplit2(gcMsg.lyric)//获取歌词数值	
			gcXr(gcArr);
			timeupdateSj();//播放器播放时间
		}
		
	})
	bgChange();  //当切换歌曲的时候同时切换图片
}

//歌词分段成数组
function gcSplit(theGc){
	var lrcArrs = theGc.split("\n");
	var lrcObj = {};
	console.log(lrcArrs);
	for(var i = 0; i<lrcArrs.length; i++){
		var lrcArr = decodeURIComponent(lrcArrs[i]);
		var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
		var timeRegExparr = lrcArr.match(timeReg);
		if(timeRegExparr){
			var clause = lrcArr.replace(timeReg,'');
			for(var k = 0; k < timeRegExparr.length; k++){
				var t = timeRegExparr[k];
				var min = Number(String(t.match(/\[\d*/i)).slice(1));
				var sec = Number(String(t.match(/\[\d*/i)).slice(1));
				var time = min * 60 + sec;
				lrcObj[time] = clause;
			}
		}
		else{
			continue;
		}
		return lrcObj;
		//console.log(lrcObj);
	}
}



//歌词分段2 歌词分段成数组
function gcSplit2(theGc){
	var lrcArrs = theGc.split("\n");
	var lrcObj = {};
	console.log(lrcArrs);
	for(var i = 0; i<lrcArrs.length; i++){
		var lrcArr = decodeURIComponent(lrcArrs[i]);
		var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
		var timeRegExpArr = lrcArr.match(timeReg);
		if(!timeRegExpArr)continue;
		var clause = lrcArr.replace(timeReg,'');
		for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
			var t = timeRegExpArr[k];
			var min = Number(String(t.match(/\[\d*/i)).slice(1)),
				sec = Number(String(t.match(/\:\d*/i)).slice(1));
			var time = min * 60 + sec;
			lrcObj[time] = clause;
		}
	}
	return lrcObj;
}


//歌词渲染
function gcXr(lrcObjArr){
	var k = lrcObjArr.length;
	$.each(lrcObjArr,function(index,item){
		console.log(index);
		console.log(item);
		$(".the_audio_right_gc_k_nr").find("ul").append("<li class='gcKey"+index+"'>"+item+"</li>")
		
	})
}


//audio的timeupdate时间，驱动歌词的滚动
function timeupdateSj(){
	//
	$(".a-audio").bind("timeupdate",gcgd)
	
}

//歌词滚动
function gcgd(){
	var gcTime = this.currentTime;
	var gcCurrentTime = Math.round(gcTime);
	var gcDuration = $(".a-audio")[0].duration  //获取歌总时间
	var gcTimeP = -(gcTime/gcDuration*100)+"%" // 当前播放进度百分比
	console.log(gcDuration);
	console.log(gcDuration);
	console.log(gcTimeP);
	$(".the_audio_right_gc_k_nr").find("ul").css("transform","translateY("+gcTimeP+")")
	//var pyHeight; //获取偏移量
	var pd = $(".the_audio_right_gc_k_nr").find("li").hasClass("gcKey"+gcCurrentTime+"");
	console.log(pd);
	if(pd == true){
		//var gcLiHeight = $(".the_audio_right_gc_k_nr").find(".gcKey"+gcCurrentTime+"").height();
		//pyHeight = 0 - gcLiHeight	
		$(".the_audio_right_gc_k_nr").find("li").removeClass("gc_active");
		$(".the_audio_right_gc_k_nr").find(".gcKey"+gcCurrentTime+"").addClass("gc_active");
	}
	//$(".the_audio_right_gc_k_nr").find("ul").css("transform","translateY("+pyHeight+"px)")
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
		},
		theHistory:function(){
			musicHistory();
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

//自动加入历史记录
function musicHistory(tjson){
	if(typeof(Storage)=="undefined"){
		alert("本浏览器不支持本地储存，不能使用历史记录，建议使用高版本浏览器")	
	}
	else{
		var songFolder = localStorage.getItem("historyFolder");
		alert("支持本地存储");
		if(!songFolder){
			console.log("这个是历史的")
			console.log(tjson.song[0])
			var songFolder = new Array();
			songFolder.push(tjson.song[0])
			//console.log("这个是数组中的")
			//console.log(songFolder)
			//var str = JSON.stringify(songFolder);
			var str = arrChangeStr(songFolder)
			console.log("这个是转换后的数组");
			console.log(str);
			localStorage.setItem("historyFolder",str);		
		}
		else{
			console.log(songFolder);
			//var songFolderArray = JSON.parse(songFolder);
			var songFolderArray = strChangeArr(songFolder)
			console.log("这个是转换后的数组再转回数组");
			console.log(songFolderArray);
			if(songFolderArray.length<10){
				//判断历史记录中是否存在目前的音乐
				var avalues = checkMusicReply(songFolderArray,tjson.song[0])
					console.log("这个是检测数组中的value");
					console.log(avalues);
				songFolderArray.push(tjson.song[0]);
				var str = arrChangeStr(songFolderArray)
				localStorage.setItem("historyFolder",str);
			}	
			else{
				songFolderArray.splice(0,1);//删除历史歌曲数组的第一条
				songFolderArray.push(tjson.song[0]);
				var str = arrChangeStr(songFolderArray)
				localStorage.setItem("historyFolder",str);
			}
		}
		//html渲染
		$(".the_collect_history_k").find("ul").empty();
		var asongFolder = localStorage.getItem("historyFolder");
		var asongFolderA = strChangeArr(asongFolder)
		console.log("html需转换的数组");
		console.log(asongFolderA);
		$.each(asongFolderA,function(index,item){
			console.log("这个是数组获取")
			console.log(item[index])
			$(".the_collect_history_k").find("ul").append("<li><span>"+item.title+"</span></li>")
			
		})
		
	}
	
}

//由于localStorage不支持数组的存储，只能通过将数值转换为字符串存储
function arrChangeStr(theArr){
	var theStr = JSON.stringify(theArr);
	return theStr
}
function strChangeArr(theStr){
	var theArr = JSON.parse(theStr);
	return theArr
}

function checkMusicReply(musicArr,theMuice){
	console.log("这个是判断中的数组")
	console.log(musicArr)
	var isHaveMusic;//判断歌曲是否存在，值为boolean
	var pMuisc = new Array();   //判断是否存在的标识，类型为数组，用于存储存在时的值最后做判断
	var values = $.grep(musicArr,function(item){
		if(item.sid != theMuice.sid){
			pMuisc.push(item.sid)
		}		
		return pMuisc;
		//console.log(pMuisc)
	})
	//测试成功可以返回vlues是数组，最后为了代码的简便性，决定还是放回boolean值
	//console.log("(内循环)这个是检测数组中的value");
	//console.log(values);
	//return values
	var isValuesLen = values.length;
	if(isValuesLen>0){
		isHaveMusic = true		
	}
	else{
		isHaveMusic = false;
	}
	console.log("检测中判断的值："+isHaveMusic);
	return isHaveMusic;
}