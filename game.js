let random_order = generate_random();
let container = document.getElementById("box-container");
changeHTMLBox(random_order);


let boxes = document.querySelectorAll(".box");
let colors = ["#000000", "#101010", "#202020", "#303030","#404040", "#505050", "#606060", "#707070", "#808080", "#ffffff"];
// colors should be a list of color in correct order, the first and the last can be generated randomly, 
// colors in between are automatically calculated

coloringBox();
positionBox();

let dragging = false;
let offsetInBox;
let boxSelected;   
let mouseStart;
let containerLeft = container.getBoundingClientRect().left;
let leftBoundary = containerLeft + 85;
let rightBoundary = containerLeft + 85*8;
let currentOrder = random_order; // innerHTML string
let scoreBox = document.getElementById("score");
let log = document.getElementById("log");
let startIndex;


setBoxHandler()
setDragHandler()
setDropHandler()

let button = document.getElementsByTagName("button");
button.onclick = displayResult;

// ----------------------------------- check answer, display result ------------------------------

// correct ans is always 1,2,3,4,5,6,7,8,9,10, assign the order of color in acending color


function displayResult(){
    
}


function setBoxHandler(){
    for (let i = 1; i < (boxes.length -1) ; i++){ //only apply to index 1-8
        boxes[i].addEventListener('mousedown', function(event){
            dragging = true;
            offsetInBox = event.offsetX;
            boxSelected = boxes[i];
            event.preventDefault()
            mouseStart = event.pageX;
            startIndex = i - 1;
            boxes[i].style.zIndex = "10";
        });
}
}

function setDragHandler(){
    window.addEventListener('mousemove', function(event){
    if(dragging){
        event.preventDefault();
        let mousePosition = event.pageX;
        let boxPosition;  // box is positioned absolute in container

        if (mousePosition >= leftBoundary + offsetInBox && mousePosition <= rightBoundary + offsetInBox){
            boxPosition = mousePosition - containerLeft - offsetInBox;
        } else if (mousePosition < leftBoundary + offsetInBox){
            boxPosition = leftBoundary - containerLeft ;
        } else if (mousePosition <= rightBoundary + offsetInBox) {   
            boxPosition = rightBoundary - containerLeft ; 
        }
    
        boxSelected.style.left = boxPosition + 'px';
    }
    });
}

function setDropHandler(){
        
    window.addEventListener('mouseup', function(event){
        dragging = false;
        boxSelected.style.zIndex = "1"; // ?? not working


        let i = Math.floor((event.pageX - containerLeft)/85) -1; // new index
        console.log(i);
        if (event.pageX > mouseStart + 40 || event.pageX < mouseStart - 40){ // moving right
            reArangeOrder(i, 1);
        }

        changeHTMLBox(currentOrder);
        boxes = document.querySelectorAll(".box"); // box element is updated, re-do all the steps to set up boxes
        coloringBox();
        positionBox();
        setBoxHandler();
    });
}


function generate_random(){
    let order = [2,3,4,5,6,7,8,9];
    for (let i = 0; i < order.length; i++){
        let n = Math.floor(Math.random()*8);
        let a = order[i];
        let b = order[n];
        order[n] = a;
        order[i] = b;
    }
    return order;
}


function reArangeOrder(i){ 
    let s = startIndex;
    let moving = currentOrder[s]
    currentOrder.splice(s, 1);
    currentOrder.splice(i, 0, moving);    
    log.innerHTML = currentOrder;
}

function changeHTMLBox(order){
    let boxes_element = '<div class="box" id="1">1</div>';
    for (let i = 0; i < order.length; i++){
        boxes_element += `<div class="box" id="${order[i]}">${order[i]}</div>`;
    }
    boxes_element += '<div class="box" id="10">10</div>'
    container.innerHTML = boxes_element;   // global variable
}

function coloringBox(){
    for (let i = 0; i < boxes.length; i++){
        let id = (i+1).toString();
        document.getElementById(id).style.backgroundColor = colors[i];
    }
}

function positionBox(){
    for (let i = 0; i < boxes.length; i++){
        boxes[i].style.left = `${85*i}px`;
    }
}