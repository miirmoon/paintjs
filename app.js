const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");          // context: canvas 안에서 픽셀을 다루는 것
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;                     // canvas로 사용할 실제 크기 지정
canvas.height = CANVAS_SIZE;                    // canvas.offsetHeight

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);       // 초기 배경을 흰색으로 칠해둠(하지 않으면 이미지 저장할 때 투명배경으로 저장됨)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {          // 마우스를 움직이는 동안 계속 실행
    const x = event.offsetX;           // canvas 내의 좌표 (clientX, Y는 윈도우 전체 대상 좌표)
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();       
        ctx.moveTo(x, y); 
    } else {
        ctx.lineTo(x, y); 
        ctx.stroke(); 
    }
}

function onMouseDown(event) {
    painting = true;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();                           // "image/jpeg" 등으로 확장자 변경 가능
    const link = document.createElement("a");
    link.href = image;                                          // 이미지의 url
    link.download = "PaintJS[Export]";                          // 다운로드 되는 이미지 이름
    link.click();
}

if(canvas) {                                                    // canvas 위에 있을 때
    canvas.addEventListener("mousemove", onMouseMove);          // 마우스의 움직임
    canvas.addEventListener("mousedown", startPainting);        // 마우스를 클릭하는 이벤트
    canvas.addEventListener("mouseup", stopPainting);           // 마우스를 클릭한 상태에서 떼는 이벤트
    canvas.addEventListener("mouseleave", stopPainting);        // 마우스가 캔버스 밖으로 나가는 이벤트
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);    // Array.from()은 object를 array로 만든다.

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}