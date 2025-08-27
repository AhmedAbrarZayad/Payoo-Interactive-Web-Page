const button = document.querySelector(".btn");
console.log(button);

button.addEventListener("click", function(e) {
    console.log("Button clicked!");
    const number = "01768531042";
    const pin = 1234;
    console.log(document.getElementById("mobile-number").value);
    console.log(document.getElementById("pin").value);
    if (document.getElementById("mobile-number").value === number && parseInt(document.getElementById("pin").value) === pin) {
        console.log("Login successful!");
        window.location.href = "./main.html";
    }else{
        alert("Invalid credentials");
    }
});