//-------------------------------- Initial set up --------------------------------------------
// create random order
let random_order = generate_random();

// create innerHTML for random order
let boxes_element = '<div class="box" id="1">1</div>';
let container = document.getElementById("box-container");
positioningBox(random_order);


// changing color one by one according to the list
let boxes = document.querySelectorAll(".box");
let colors = ["#000000", "#101010", "#202020", "#303030","#404040", "#505050", "#606060", "#707070", "#808080", "#ffffff"];
// colors should be a list of color in correct order, the first and the last can be generated randomly, 
// colors in between are automatically calculated

for (let i = 0; i < boxes.length; i++){
    let id = (i+1).toString();
    document.getElementById(id).style.backgroundColor = colors[i];
}

// set starting position of the boxes
for (let i = 0; i < boxes.length; i++){
    boxes[i].style.left = `${85*i}px`;
}


//--------------------------------- drag and drop ---------------------------------


// drag and drop
let dragging = false;
let offsetInBox;
let boxSelected;   
let mouseStart;
let containerLeft = container.getBoundingClientRect().left;
let leftBoundary = containerLeft + 85;
let rightBoundary = containerLeft + 85*8;
let currentOrder = random_order; // innerHTML string
let scoreBox = document.getElementById("score");

for (let i = 1; i < (boxes.length -1) ; i++){ //only apply to index 1-8
    boxes[i].addEventListener('mousedown', function(event){
    dragging = true;
    offsetInBox = event.offsetX;
    boxSelected = boxes[i];
    event.preventDefault()
    mouseStart = event.pageX;
    });
}

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
    let boxIndex = Math.floor((mousePosition - containerLeft)/85); // index
    console.log(boxIndex);


    if (mousePosition > mouseStart){ // moving right
        currentOrder = reArangeOrder(currentOrder, boxIndex, 1);
    } else {
        currentOrder = reArangeOrder(currentOrder, boxIndex, 0);
    }

    scoreBox.innerHTML = currentOrder;


    // if current mouse position is across 1/2 of the next, move the other boxes away
        // if the mouse is moving left, move the box on its right one unit to the right
            // change the current element order and only apply position change to that 1 box

        // if the mouse is moving right, move the box on its left on unit to the left
            // change the current element order and only apply position change to that 1 box
   
}
});

window.addEventListener('mouseup', function(){
    dragging = false;

    // when mouseup, position the selected box according to current_elements_order
  });


// ----------------------------------- check answer, display result ------------------------------

// correct ans is always 1,2,3,4,5,6,7,8,9,10, assign the order of color in acending color
let correct_ans = '';
for (let n = 1; n < 11; n++) {
    correct_ans += `<div class="box" id="${n}">${n}</div>`;
}




// ------------------------------------ functions ---------------------------------------

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


function reArangeOrder(order, i, direction){ 
    let moving = order[i];
    let swapBox;
    let newOrder = [];
    if (direction === 1){  // movint to the right, only interchange if i between 1 and 7
        if (i >= 1 && i <= 7){
            let swapBox = order[i+1];
            newOrder = order.slice(0,i);
            newOrder.push(swapBox, moving);
            newOrder = newOrder.concat(order.slice(i+2));
        }

    } else if (direction === 0){ // moving to the left, only interchange if i between 2 and 8
        if (i >= 2 && i <= 8 ){
            let swapBox = order[i-1];
            newOrder = order.slice(0,i-2);
            newOrder.push(moving, swapBox,);
            newOrder = newOrder.concat(order.slice(i+1));
        }
    }
    console.log(newOrder);
    return newOrder
}

function positioningBox(order){
    let boxes_element = '<div class="box" id="1">1</div>';
    for (let i = 0; i < order.length; i++){
        boxes_element += `<div class="box" id="${order[i]}">${order[i]}</div>`;
    }
    boxes_element += '<div class="box" id="10">10</div>'
    container.innerHTML = boxes_element;   // global variable
}