var credential;
var cred_counter = 0;
var cred_timeout;

function get_credential() {
	if(Comagic === undefined || Comagic === null) {
		return;
	}
	credential = Comagic.getCredentials();
	if( isNaN(credential.hit_id) && cred_counter++ < 5 ) {
 setTimeout(get_credential, 300);
	}
	else {
		clearTimeout(cred_timeout);
		set_credential();
	}
}

function set_credential() {
	var $input_comagic = $("input[data-field='comagic']");
	$input_comagic.val(JSON.stringify(credential));
}

$(window).load(function() {
	
	if(Comagic !== undefined && Comagic !== null) {
		credential = Comagic.getCredentials();
		
		if( isNaN(credential.hit_id) ) {
			cred_timeout = setTimeout(get_credential, 300);
		}
		else {
			set_credential();
		}
	}
	else {
		cred_timeout = setTimeout(get_credential, 300);
	}
});

BX.addCustomEvent('onAjaxSuccess', function(){
	set_credential();
});
