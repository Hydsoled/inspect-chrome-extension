const content = document.getElementById('content')
const sendElement = document.getElementById("sendData")

const sendData = function () {
    const username = document.getElementsByName('username')[0]
    const htmlInput = document.getElementsByName('htmlInput')[0]
    const textInput = document.getElementsByName('textInput')[0]
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://198.27.64.8:5001/', true);
    xhr.onreadystatechange = function () {
        if (this.status === 200) {
            console.log(xhr.responseText)
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "username": username,
        "html": htmlInput,
        "text": textInput,
    }));
}
const contentFunction = function () {
    if (content.innerHTML === "START") {
        content.innerHTML = "STOP"
    } else {
        content.innerHTML = "START"
    }

    chrome.runtime.sendMessage({data: content.innerHTML, type: 'popup'});

}
chrome.extension.onMessage.addListener(function (message, messageSender, sendResponse) {
    document.getElementsByName('htmlInput')[0].innerText = message.data.substring(0, 1000)
    document.getElementsByName('textInput')[0].innerText = message.texts.substring(0, 1000)
    sendResponse('ok')
});

chrome.runtime.sendMessage({data: content.innerHTML, type: 'retrieveData'});

document.addEventListener('DOMContentLoaded', function () {
    sendElement.addEventListener('click', sendData)
    content.addEventListener('click', contentFunction)
}, false)