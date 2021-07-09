const style = `
#selector-top, #selector-bottom {
    background: blue;
    height:3px;
    position: fixed;
    transition:all 300ms ease;
    z-index: 100;
}
#selector-left, #selector-right {
    background: blue;
    width:3px;
    position: fixed;
    transition:all 300ms ease;
    z-index: 100;
}
.n{
    -webkit-transform: scale(3) translateX(100px)
}`;
const html = `
<div id="selector">
    <div id="selector-top"></div>
    <div id="selector-left" ></div>
    <div id="selector-right"></div>
    <div id="selector-bottom"></div>
</div>`
document.getElementsByTagName('style')[0].innerHTML += style
document.getElementsByTagName('body')[0].innerHTML += html

let start
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    start = (request === 'STOP')
    if (!start){
        document.getElementById('selector').style.visibility = 'hidden'
    }else {
        document.getElementById('selector').style.visibility = 'visible'
    }
    sendResponse('ok');
})
//
document.onmouseover = function (event) {
    if (!start) return
    if (event.target.id.indexOf('selector') !== -1 || event.target.tagName === 'BODY' || event.target.tagName === 'HTML') return;

    let target = event.target;
    let targetOffset = target.getBoundingClientRect();
    let targetHeight = targetOffset.height;
    let targetWidth = targetOffset.width;

    document.getElementById("selector-top").style.top = (targetOffset.top - 4) + "px";
    document.getElementById("selector-top").style.width = (targetWidth + 5) + "px";
    document.getElementById("selector-top").style.left = (targetOffset.left - 4) + "px";

    document.getElementById("selector-bottom").style.top = (targetOffset.top + targetHeight + 1) + "px";
    document.getElementById("selector-bottom").style.width = (targetWidth + 4) + "px";
    document.getElementById("selector-bottom").style.left = (targetOffset.left - 3) + "px";

    document.getElementById("selector-left").style.top = (targetOffset.top - 4) + "px";
    document.getElementById("selector-left").style.height = (targetHeight + 8) + "px";
    document.getElementById("selector-left").style.left = (targetOffset.left - 5) + "px";

    document.getElementById("selector-right").style.top = (targetOffset.top - 4) + "px";
    document.getElementById("selector-right").style.height = (targetHeight + 8) + "px";
    document.getElementById("selector-right").style.left = (targetOffset.left + targetWidth + 1) + "px";
};

document.onclick = function (event) {
    if (event.target.id.indexOf('selector') !== -1 || event.target.tagName === 'BODY' || event.target.tagName === 'HTML' || !start) return;

    let target = event.target;
    const children = target.children;
    let childText = '';
    for (const [key, value] of Object.entries(children)){
        childText += value.innerText + ',\n'
    }
    chrome.runtime.sendMessage({data: target.outerHTML, texts: childText, type: 'content'});
};