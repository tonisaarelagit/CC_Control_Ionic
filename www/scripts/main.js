$(document).ready(function(){
	
	var player_ip = '10.8.99.171';

	var play_list1 = 'Video1';
	var play_list2 = 'Video2';
	var play_list3 = 'Video3';
	var play_list4 = 'Video4';
	var play_list5 = 'Video5';
	var play_list6 = 'Video6';
	var play_list7 = 'Mirror';
	
	var startFlag = 0;
	var startedPlaylist;

	$(document).on( 'click', ".thumb", function()
	{
		var clicked_id = $(this).attr('id');

		switch(clicked_id)
		{
			case 'thumb_1':
				checkStart(play_list1);
				break;
			case 'thumb_2':
				checkStart(play_list2);
				break;
			case 'thumb_3':
				checkStart(play_list3);
				break;
			case 'thumb_4':
				checkStart(play_list4);
				break;
			case 'thumb_5':
				checkStart(play_list5);
				break;
			case 'thumb_6':
				checkStart(play_list6);
				break;
			case 'mirrorBtn':
				checkStart(play_list7);
				break;
			default:
				break;
		}
	});

	function checkStart(playlist){
		startFlag = (startFlag ==0) ? 1 : 0;
		if(startFlag == 0){
			stopPlaylist(player_ip, startedPlaylist);
			if(startedPlaylist != playlist)
				startPlaylist(player_ip, playlist);
		}
		else{
			startedPlaylist = playlist;
			startPlaylist(player_ip, playlist);
		}
	}

	function startPlaylist(ip, playlist){
		//send play command
		$.ajax({
			type:     "GET",
		    url:      "http://" + ip + ":17236/services;execute?command=start%20playlist%20-n%20" + playlist + "%20-o%20-fi%201%20-fo%201%20-g%20CC",
		    dataType: "jsonp",
		    success: function(data)
			{
		        console.log("play command sent")
		    },
		    error: function(jqXHR, textStatus, errorThrown)
			{
		        player.notes = "ERROR";     
		    }
		}); 
	}

	function stopPlaylist(ip, playlist){
		//send stop command
		$.ajax({
			type:     "GET",
		    url:      "http://" + ip + ":17236/services;execute?command=stop%20playlist%20-n%20" + playlist+ "%20-o%20-fo%201%20-g%20CC",
		    dataType: "jsonp",
		    success: function(data)
			{
		        console.log("stop command sent")
		    },
		    error: function(jqXHR, textStatus, errorThrown)
			{
		        player.notes = "ERROR";     
		    }
		}); 
	}

})
