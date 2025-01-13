function toggle() {
    let element = document.getElementById("showPassword");
    let input = document.getElementById("password");

    if (element.checked) {
        input.type = "text";
    } else {
      input.type = "password";
    }
}


