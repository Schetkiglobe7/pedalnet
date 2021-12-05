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

    $('#inputSoundSelect').on('change', function() {
  		alert( this.value );
  		/* CHIAMATA JQUERY PER CALCOLARE I GRAFICI */
	});

	$('#outputSoundSelect').on('change', function() {
  		alert( this.value );
  		/* CHIAMATA JQUERY PER CALCOLARE I GRAFICI */
	});

});
