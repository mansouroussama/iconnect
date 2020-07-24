// Form 

function onFocus(input) {
	var label = input.nextElementSibling;
	var span = input.nextElementSibling.nextElementSibling;
	// Move the ribbon
	span.style.width = "100%";
	span.style.left = "0";
	span.style.backgroundColor = "#3598D9"
	// Move the label
	label.style.top = "-10px";
	label.style.fontSize = "13px";
	label.style.color = "#3598D9";
}

function onBlur(input) {
	var label = input.nextElementSibling;
	var span = input.nextElementSibling.nextElementSibling;
	// Return the ribbon
	span.style.width = "0";
	span.style.left = "50%";
	// Return the label ONLY IF the input is empty
	if (input.value == "") {
		label.style.top = "15px";
		label.style.fontSize = "14px";
		label.style.color = "#999";
	}
}

// Log in to iConnect

var messenger = document.getElementById('messenger');
var login = document.getElementById('login');
var email = document.getElementById('email');
var password = document.getElementById('password');
var emailLabel = email.nextElementSibling;
var passwordLabel = password.nextElementSibling;
var emailSpan = emailLabel.nextElementSibling;
var passwordSpan = passwordLabel.nextElementSibling;
var emailErrorMsg = emailSpan.nextElementSibling;
var passwordErrorMsg = passwordSpan.nextElementSibling;
var correctEmail = true;
var correctPassword = true;

function logInWithEnter(key) {
	if ( key.keyCode == "13" ) {
		logIn();
	}
}
email.addEventListener('keyup', logInWithEnter);
password.addEventListener('keyup', logInWithEnter);

function logIn() {
	// Verifying the login info
	if ( email.value == "admin" && password.value == "admin" ) {
		password.value = "";
		passwordLabel.style.top = "15px";
		passwordLabel.style.fontSize = "14px";
		passwordLabel.style.color = "#999";
		emailErrorMsg.style.visibility = "hidden";
		passwordErrorMsg.style.visibility = "hidden";
		setTimeout(function() {
			login.style.display = "none";
			messenger.style.display = "block";
			document.title = "Messenger";			
		},300);
	} else {
		if ( email.value == "admin" ) {
			emailLabel.style.color = "#3598D9";
			emailErrorMsg.style.visibility = "hidden";
			emailErrorMsg.innerHTML = "";
			if ( password.value !== "admin") {
			password.focus();
			passwordSpan.style.backgroundColor = "#D40300";
			passwordErrorMsg.style.visibility = "visible";
				if ( password.value == "" ) {
					passwordErrorMsg.innerHTML = "Please enter your password";
				} else {
					passwordLabel.style.color = "#D40300";
					passwordErrorMsg.innerHTML = "Please check your password";
				}
			}
		} else if ( email.value !== "admin") {
			// Wrong email
			emailSpan.style.backgroundColor = "#D40300";
			emailErrorMsg.style.visibility = "visible";
			// Automatically wrong password
			passwordSpan.style.backgroundColor = "#D40300";
			passwordErrorMsg.style.visibility = "visible";
			if ( email.value == "" ) {
				email.focus();
				emailErrorMsg.innerHTML = "Please enter your email";
				passwordErrorMsg.innerHTML = "Couldn't find your account";
				if ( password.value == "" ) {
					passwordErrorMsg.innerHTML = "Please enter your password";
				}
			} else {
				emailSpan.style.backgroundColor = "#D40300";
				emailLabel.style.color = "#D40300";
				emailErrorMsg.innerHTML = "Couldn't find your account";
				if ( password.value == "" ) {
					password.focus();
					passwordErrorMsg.innerHTML = "Please enter your password";
				} else {
					email.focus();
					emailLabel.style.color = "#D40300";
					passwordLabel.style.color = "#D40300";
					passwordErrorMsg.innerHTML = "Please check your password";
				}
			}
		}

	}
}

// NiceScroll on friends list

$(function() {  
    $("#friends-list, #message-content, #messages").niceScroll({
		cursorwidth:"10px",
		zindex:2,
		cursorborder:"none",
		cursorborderradius:"0",
		cursorcolor: "#ccc",
		scrollspeed:50,
		mousescrollstep:50,
		hidecursordelay:300,
	});
});

// Add a new message

var messages = document.getElementById('messages');
var msgInput = document.getElementById('message-content');
msgInput.addEventListener('keyup', function(clk){
	if ( clk.keyCode == 13 ) {
		messages.innerHTML += '<div class="message-sent"><img src="img/avatar.png" alt="user" title="Mansour"><p>'+ msgInput.value + '</p><div class="clearfix"></div></div>';
		msgInput.value = '';
		messages.scrollTop = messages.scrollHeight;
	}	
});

// Add like button

function thumbsUp() {
	messages.innerHTML += '<div class="message-sent"><img src="img/avatar.png" alt="user" title="Mansour"> <img src="img/thumb-up.png" alt="thumbs up" class="thumbs-up"><div class="clearfix"></div></div>';
	messages.scrollTop = messages.scrollHeight;
}

// Show the bottom settings menu

var settingsMenu = document.getElementById('settings-menu');
var showSettingsMenu = document.getElementById('showSettingsMenu');
showSettingsMenu.addEventListener('click', function showSettingsMenu() {
	if (settingsMenu.style.display == "none" || settingsMenu.style.display == "") {
		settingsMenu.style.display = "block";
	} else {
		settingsMenu.style.display = "none"
	}
}
);

// Show the whole settings

var settings = document.getElementById('settings');
var showSettingsBtn = document.getElementById('showSettings');
showSettingsBtn.addEventListener('click',function showSettings() {
	settings.style.display = "block";
	settingsMenu.style.display = "none";
})

// Go back to chat 

function backToChat() {
	settings.style.display = "none";
	settingsMenu.style.display = "none";
}

// Show remaining time

function showRemainingtime() {
	var remainingTime = document.getElementById('remainingTime');
	if (remainingTime.style.visibility == "hidden" || remainingTime.style.visibility == "" ) {
		remainingTime.style.visibility = "visible";
	} else {
		remainingTime.style.visibility = "hidden"
	}
}

// Set the timer

var remainingTime = document.getElementById('remainingTime');
var time = document.getElementById('time');
function setTimer(btn) {
	// Variables
	var displayedHours = document.getElementById('displayedHours');
	var displayedMinutes = document.getElementById('displayedMinutes');
	var displayedSeconds = document.getElementById('displayedSeconds');
	var hours = document.getElementById('hours');
	var minutes = document.getElementById('minutes');
	var seconds = document.getElementById('seconds');
	var totalSeconds = (hours.options[hours.selectedIndex].value * 3600) + (minutes.options[minutes.selectedIndex].value * 60) + (seconds.options[seconds.selectedIndex].value);
	// Calculating the remaining time
	if (totalSeconds == 0) {
		return false
	}
	displayedHours.innerHTML = parseInt(totalSeconds / 3600);
	displayedMinutes.innerHTML = parseInt(totalSeconds % 3600 / 60);
	displayedSeconds.innerHTML = totalSeconds % 3600 % 60;
	btn.disabled = true;
	setInterval(function countdown(){
		if (totalSeconds == 0) {
			sessionExpired();
			return false;
		} else {
			totalSeconds -= 1;
			displayedHours.innerHTML = parseInt(totalSeconds / 3600);
			displayedMinutes.innerHTML = parseInt(totalSeconds % 3600 / 60);
			displayedSeconds.innerHTML = totalSeconds % 3600 % 60;
			remainingTime.innerHTML = time.innerHTML;
		}
},1000)
}

// Time is out!

function sessionExpired() {
	var expiredSessionMsg = document.getElementById('expiredSessionMsg');
	document.title = "Oops!";
	expiredSessionMsg.style.display = "block";
	messenger.style.display = "none"
}

// Log out from iConnect 

function logOut() {
	settingsMenu.style.display = "none";
	setTimeout(function() {
		settingsMenu.style.display = "none";
		messenger.style.display = "none";
		login.style.display = "block";
		document.title = "Sign in - iConnect";
		password.focus();
	},500)
}