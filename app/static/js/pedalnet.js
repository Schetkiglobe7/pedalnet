Dropzone.autoDiscover = false;


let showModal = (id) => {
	if($('#testModal').is(':visible')) 
    		$("#testModal").modal('hide');
    	else 
    		$("#testModal").modal('show');
};


$("document").ready(function() {

	$('select').selectpicker();

	$(".navbar-brand").on("click", function() {
		location.href = "/";
	});


    $("#uploadTrainFiles").dropzone({
        url: "/upload_train_files",
        addRemoveLinks: true,
        success: function (file, response) {
            var imgName = response;
            file.previewElement.classList.add("dz-success");
        },
        error: function (file, response) {
            file.previewElement.classList.add("dz-error");
        }
    });
    $("#test").on('click', function() {
    	$.ajax({
    		url:'get_file_list',
    		method: 'POST',
    		beforeSend: function() {
    			$(".css-loader").show();
    			$("#inputSoundSelect").find('option').remove().end();
    			$("#inputSoundSelect").selectpicker('refresh');
    			$("#outputSoundSelect").find('option').remove().end();
    			$("#outputSoundSelect").selectpicker('refresh');
    		},
    		success: function(data) {
    			$.each(data, function(indx, item) {
    				$("#inputSoundSelect").append($('<option>', { 
        				value: item,
        				text : item 
    				}));
    				$("#inputSoundSelect").selectpicker('refresh');
    				$("#outputSoundSelect").append($('<option>', { 
        				value: item,
        				text : item 
    				}));
    				$("#outputSoundSelect").selectpicker('refresh');
    			});
    		},
    		error: function() {

    		}
    	}).done(function() {
    		$(".css-loader").fadeOut(9999999);
    		showModal("#testModal");
    	});
    	
    });

	$("#testForm").submit(function (event) {
	event.preventDefault();
	let form = $(this);
    let url = form.attr('action');
    console.log(`URL: ${url}`);
	console.log(`INPUT: ${$('#inputSoundSelect').val()}`);
	console.log(`OUTPUT: ${$('#outputSoundSelect').val()}`);

    let data = {
      'input_file_path' : $('#inputSoundSelect').val(),
      'output_file_path': $('#outputSoundSelect').val()
    };

    $.ajax({
    	url: url,
    	contentType: "application/json;charset=utf-8",
    	method: 'POST',
    	dataType: "json",
    	data: JSON.stringify(data, null, '\t'),
      beforeSend: function() {
      	$(".css-loader").show();
      },
      success: function(data) {
      	console.log('success');
      	$(".css-loader").fadeOut(9999999);
      	console.log(data);

      	$("#waveSound").empty();
      	$("#waveSound").append(data['soundWaves']);

      	$("#spectrums").empty();
      	$("#spectrums").append(data['spectrums']);

      	$("#envelopes").empty();
      	$("#envelopes").append(data['envelopes']);

      },
      error: function(data) {
      	console.log('error');
/*
      	$(".css-loader").fadeOut(9999999);
      	console.log(data);
      	$("#waveSound").empty();
      	$("#waveSound").append(data['soundWaves']);
*/
      }
    });

  });

});
