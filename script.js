function secureRandomInt(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
}

function generatePassword(event) {
    event.preventDefault();

    // Char type
    let charType = "";

    /// Input
    // Length
    let length = parseInt(document.getElementById("length").value);
    if(!length || length <= 0) {
        alert("The field length is required.");
        return;
    }
    // Uppercase Letters
    let upperYes = document.getElementById("upperYes");
    if(upperYes.checked) {
        charType += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    // Lowercase Letters
    let lowerYes = document.getElementById("lowerYes");
    if(lowerYes.checked) {
        charType += "abcdefghijklmnopqrstuvwxyz";
    }
    // Numbers
    let numbers = document.getElementById("numYes");
    if(numbers.checked) {
        charType += "0123456789";
    }
    // Special characters
    let specialYes = document.getElementById("specialYes");
    if(specialYes.checked) {
        charType += "!?#$%&'\"()*+,-./:;<=>@[\\]^_`{|}~";
    }
    
    if (charType==="") {
        alert("Please select at least one character type.");
        return;
    }

    let charTypeSize = charType.length;

    let password = [];

    for(let i=0; i<length; i++) {
        let charPos = secureRandomInt(charTypeSize);
        password[i] = charType[charPos];
    }

    let generatedPassword = password.join('');

    let generatedDiv = document.getElementById("generated");

    generatedDiv.innerHTML = "";

    let label = document.createElement("b");
    label.textContent = "Generated password: ";
    generatedDiv.appendChild(label);

    let passwordSpan = document.createElement("span");
    passwordSpan.textContent = generatedPassword;
    generatedDiv.appendChild(passwordSpan);

    let br = document.createElement("br");
    generatedDiv.appendChild(br);

    let copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.id = "copyBtn";
    generatedDiv.appendChild(copyBtn);

    copyBtn.addEventListener("click", function() {
        navigator.clipboard.writeText(generatedPassword)
            .then(() => alert("Password copied to clipboard."))
            .catch(err => console.error("Error copying password:", err));
    });

}