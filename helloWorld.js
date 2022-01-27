var pong1 = document.getElementById('pong1');
var ball = document.getElementById('ball');
var intervall;
var both = 0;
var INITIAL_ANGL = Math.floor(Math.random() * 20) % 2 ? Math.floor(Math.random() * 20) / 10 : -Math.floor(Math.random() * 20)/10;
let game = true;
let vertt = true;
let hor = true;
var counter = 0;
function reset(){
    counter=0;
}
function start(){
    var dia = parseFloat(window.getComputedStyle(ball).getPropertyValue('left'));
    var vert = parseFloat(window.getComputedStyle(ball).getPropertyValue('top'));
    console.log(dia,vert)
    var vertPong = parseInt(window.getComputedStyle(pong1).getPropertyValue('top'));
    if(vert>370 || vert<0) {
        vertt = !vertt
        if (vert<10) {vert+=3}
        else{vert-=3}
    }
    else if (dia >= 850){
        hor = !hor
        dia-=3
        console.log(hor,'ja')
    }
    else if ((dia <= 20 && vert > vertPong) && (vert < (170 + vertPong))) {
        hor = !hor
        console.log(222)
        var back = (vert-vertPong)/170
        if (back<0.5){
            back = (back-0.5)*2
            INITIAL_ANGL = Math.max(-2,INITIAL_ANGL-back)//minus equal up
        }else{
            back = (back-0.5)*2
            INITIAL_ANGL = Math.min(2,INITIAL_ANGL+back)
        }
    }
    if (dia<=0){
        clearInterval(intervalReal);
        alert('Game over');
        game = true;
        reset();
    }

    var diagonal = hor ? 2 : -2;
    var vertical = vertt ? INITIAL_ANGL : -INITIAL_ANGL;
    ball.style.left = (1.5+(counter/7000))*diagonal+dia+'px';
    ball.style.top = (1.5+(counter/7000))*vertical+vert+'px';
    counter++;
    console.log(vert,dia,diagonal)
    }
    
function pongDown(){
    var down = parseInt(window.getComputedStyle(pong1).getPropertyValue('top'));
    if (down<=228){
        pong1.style.top = down + 2 + 'px';
    }
}
function pongUp() {
    var up = parseInt(window.getComputedStyle(pong1).getPropertyValue('top'));
    if (up>=2) {
        pong1.style.top= up - 2 + 'px';
    }
}
document.addEventListener('keydown',event => {
    if (both==0){
        both++;
        if(event.key=='ArrowDown'){
            intervall = setInterval(pongDown,0.5);
        }
        if (event.key == 'ArrowUp') {
            intervall = setInterval(pongUp, 0.5);
        }
        if (event.code =='Space' && game) {
            ball.style.left = 435 + 'px';
            ball.style.top = 185 + 'px';
            hor=true;
            intervalReal = setInterval(start, 2);
            game = false
        }
    }
});
document.addEventListener('keyup',event =>{
    clearInterval(intervall);
    both=0;
});
