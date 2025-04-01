//-------------------------------- Initial set up --------------------------------------------
// create random order
let random_order = generate_random();

// create innerHTML for random order
let boxes_element = '<div class="box" id="1">1</div>';
for (let i = 0; i < random_order.length; i++){
    boxes_element += `<div class="box" id="${random_order[i]}">${random_order[i]}</div>`;
}
boxes_element += '<div class="box" id="10">10</div>'

let container = document.getElementById("box-container");
container.innerHTML = boxes_element;


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
let moving_boxes = document.querySelectorAll(".box"); // need to change to class .move only
let dragging = false;
let offsetInBox;
let box_selected;   
let current_elements_order; // innerHTML string
let start_position;
let containerLeft = container.getBoundingClientRect().left;
let left_boundary = containerLeft + 85;
let right_boundary = containerLeft + 85*8;


for (let i = 1; i < (boxes.length -1) ; i++){ //only apply to index 1-8
    boxes[i].addEventListener('mousedown', function(event){
    dragging = true;
    offsetInBox = event.offsetX;
    box_selected = boxes[i];
    event.preventDefault()
    });
}

window.addEventListener('mousemove', function(event){
if(dragging){
    event.preventDefault();
    let mouse_position = event.pageX;
    let box_position;  // box is positioned absolute in container

    if (mouse_position >= left_boundary && mouse_position <= right_boundary){
            box_position = mouse_position - containerLeft - offsetInBox;
    } else if (mouse_position < left_boundary){
        box_position = left_boundary - containerLeft - offsetInBox;
    } else if (mouse_position - offsetInBox < right_boundary) {   /// ??????
        box_position = right_boundary;
    }
 
    box_selected.style.left = box_position + 'px';

    

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
