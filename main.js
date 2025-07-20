let titlescrn = document.getElementById("title-screen");
let orderscrn = document.getElementById("order-screen");
let top1scrn = document.getElementById("toppings1-screen");
let top2scrn = document.getElementById("toppings2-screen");
let basescrn = document.getElementById("base-screen");
let finalscrn = document.getElementById("final-screen");
let takeorder = document.getElementById("orderbutton");
let howto = document.getElementById("instructions")
let canvas=document.getElementById("thecanvas");

let order1 = 0;
let order2 = 0;
let order3 = 0;
let n = 0;
let interval;
let time = 0;
let points = 0;
const ctx = canvas.getContext("2d");
const fullorder = [];
const strfullorder = [];
const drink = [0, 0, 0];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function openhowto() {
    howto.style.display = 'flex';
}

function closehowto() {
    howto.style.display = 'none';
}

window.addEventListener('click', (event) => {
    if (event.target === howto) {
        howto.style.display = 'none';
    }
});

async function orderup() {
    n += 1;
    takeorder.setAttribute("disabled", "disabled")
    fullorder.length = 0;
    strfullorder.length = 0;
    time = 0;
    reset();
    document.getElementById("final-score").innerHTML = "";
    document.getElementById("strnum").innerHTML = `Order # ${n}`;
    order1 = Math.ceil(Math.random() * 4);
    if (order1 == 1) {
        strfullorder[0] = "Milk Tea";
    }
    else if (order1 == 2) {
        strfullorder[0] = "Taro Milk Tea";
    }
    else if (order1 == 3) {
        strfullorder[0] = "Matcha Green Tea";
    }
    else {
        strfullorder[0] = "Passionfruit Tea";
    }
    fullorder[0] = order1;
    document.getElementById("strbase").innerHTML = strfullorder[0];
    await sleep(1000);
    order2 = Math.ceil(Math.random() * 3);
    if (order2 == 1) {
        strfullorder[1] = "Tapioca";
    }
    else if (order2 == 2) {
        strfullorder[1] = "Rainbow Jelly";
    }
    else {
        strfullorder[1] = "Grass Jelly";
    }
    fullorder[1] = order2;
    document.getElementById("strtop1").innerHTML = strfullorder[1];
    await sleep(1000);
    order3 = Math.ceil(Math.random() * 3);
    if (order3 == 1) {
        strfullorder[2] = "Popping Pearls";
    }
    else if (order3 == 2) {
        strfullorder[2] = "Pudding";
    }
    else {
        strfullorder[2] = "Oreo Bits";
    }
    fullorder[2] = order3;
    document.getElementById("strtop2").innerHTML = strfullorder[2];
    await sleep(1000);
    document.getElementById("next1").style.display = "block";
}

function begin() {
    titlescrn.style.display = 'none';
    orderscrn.style.display = 'block';
    document.getElementById("order").style.display = 'block';
}

function nextpage() {
    if (orderscrn.style.display === "block") {
        top1scrn.style.display = 'block';
        orderscrn.style.display = 'none';
        starttime();
        drawcup();
    }
    else if (top1scrn.style.display === "block") {
        top2scrn.style.display = 'block';
        top1scrn.style.display = 'none';
    }
    else if (top2scrn.style.display === "block") {
        basescrn.style.display = 'block';
        top2scrn.style.display = 'none';
    }
    else if (basescrn.style.display === "block") {
        finalscrn.style.display = 'block';
        basescrn.style.display = 'none';
        stoptime();
        checkdrink();
    }
    else if (finalscrn.style.display === "block") {
        takeorder.removeAttribute("disabled");
        orderscrn.style.display = 'block';
        finalscrn.style.display = 'none';
        document.getElementById("strnum").innerHTML = "Order #";
        document.getElementById("strbase").innerHTML = "";
        document.getElementById("strtop1").innerHTML = "";
        document.getElementById("strtop2").innerHTML = "";
        document.getElementById("urbase").innerHTML = "";
        document.getElementById("urtop1").innerHTML = "";
        document.getElementById("urtop2").innerHTML = "";
        document.getElementById("next1").style.display = "none";
        ctx.clearRect(0, 0, 300, 150);            
    }
}

function prevpage() {
    if (top2scrn.style.display === "block") {
        top1scrn.style.display = 'block';
        top2scrn.style.display = 'none';
    }
    else if (basescrn.style.display === "block") {
        top2scrn.style.display = 'block';
        basescrn.style.display = 'none';
    }
}

function reset() {
    for (var i = 0; i < 3; i++) {
        drink[i] = 0;
        updatetext(i, '')
    }
    ctx.clearRect(0, 0, 300, 150);
    drawcup()
}

function increment() {
    time += 1;
}

function drawcup() {
    ctx.globalCompositeOperation = "multiply";
    ctx.beginPath();
    ctx.moveTo(4, 5);
    ctx.lineTo(296, 5);
    ctx.lineTo(250, 145);
    ctx.lineTo(50, 145);
    ctx.lineTo(4, 5);
    ctx.stroke();
    ctx.clip();
}

function drawbase(a) {
    ctx.fillStyle = a;
    ctx.fillRect(0, 0, 300, 150);
}

function drawtop1(a) {
    ctx.fillStyle = a;
    ctx.fillRect(0, 130, 150, 150);
}

function drawtop2(a) {
    ctx.fillStyle = a;
    ctx.fillRect(150, 130, 250, 150);
}

function starttime() {
    interval = setInterval(increment, 1000);
}

function stoptime() {
    clearInterval(interval);
    points += (30 - time);
}

function fill(a, b, c, d) {
    updatetext(a, c);
    fillcup(a, b);
    if (a == 0) {
        drawbase(d);
    }
    else if (a == 1) {
        drawtop1(d);
    }
    else {
        drawtop2(d);
    }
}

function fillcup(a, b) {
    if (drink[a] == 0) {
        drink[a] = b;
    }
}

function updatetext(a, c) {
    if (drink[a] == 0) {
        the = document.getElementsByClassName("urorder");
        the[a].innerHTML = c;
    }
}

async function checkdrink() {
    for (var i = 0; i < drink.length; i++) {
        if (drink[i] == fullorder[i]) {
            points += 15;
        }
    }
    document.getElementById("time-took").innerHTML = `Seconds taken: ${time}`;
    await sleep(1000);
    document.getElementById("final-score").innerHTML = `Current score: ${points}`;
}