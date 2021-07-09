const data = {}
data.data = ''
data.texts = ''
chrome.runtime.onMessage.addListener(function (message, callback) {
    if (message.type === 'popup') {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message.data);
        });
    } else if (message.type === 'retrieveData'){
        chrome.runtime.sendMessage(data);
    } else {
        data.data = message.data || ''
        data.texts = message.texts || ''
    }
});