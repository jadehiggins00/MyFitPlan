var checkstatus = document.getElementsByClassName("goals");
var find = /\bCompleted\b/i;
for(var i =0; i < checkstatus.length; i++) {
	var checkEach = checkstatus[i];
	if(find.test(checkEach.innerHTML)) {
		checkEach.style.backgroundColor = '#94BFA2';
	}
	else {
		checkEach.style.backgroundColor = '#D6D7D9';
	}
}