function Validation() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;
  let error_message = document.getElementById("error_message");

  error_message.style.padding = "10px";

  let text;
  if (name.length < 5) {
    text = "Please Enter valid Name";
    error_message.innerHTML = text;
    return false;
  }
  if (isNaN(phone) || phone.length != 10) {
    text = "Please Enter valid Phone Number";
    error_message.innerHTML = text;
    return false;
  }
  if (email.indexOf("@") == -1 || email.length < 12) {
    text = "Please Enter valid Email";
    error_message.innerHTML = text;
    return false;
  }
  if (message.length <= 10) {
    text = "Please Enter a message of More Than 10 Characters";
    error_message.innerHTML = text;
    return false;
  } else {
    error_message.style.padding = "0px";
    error_message.style.visibility = "0%";
    text = null;
    alert("Form Submitted Succesfully!");
    error_message.innerHTML = null;
    error_message = null;
    return false;
  }
}
