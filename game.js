let boxes = document.getElementsByClassName("box");
let container = document.getElementById("box-container");

let containerWidth = container.offsetWidth;
let position = container.getBoundingClientRect();
let leftBonud = container.getBoundingClientRect().left;
let rightBound = container.getBoundingClientRect().left + containerWidth;


// console.log(containerWidth);
// console.log(leftBonud);
// console.log(rightBound);



// create random order
let random_order = [2,3,4,5,6,7,8,9];
let colors = ["#000000", "101010", "#202020", "#303030","#404040", "#505050", "#606060", "#707070", "#808080", "#909090"];
let boxes_element = '';
for (let i = 0; i < random_order.length; i++){
    let n = Math.floor(Math.random()*8);
    let a = random_order[i];
    let b = random_order[n];
    random_order[n] = a;
    random_order[i] = b;
}

// correct ans is always 1,2,3,4,5,6,7,8,9,10, assign the order of color in acending color
let correct_ans = '';
for (let n = 1; n < 11; n++) {
    correct_ans += `<div class="box" id="${n}">${n}</div>`;
}


boxes_element = '<div class="box" id="1">1</div>'
for (let i = 0; i < random_order.length; i++){
    boxes_element += `<div class="box" id="${random_order[i]}">${random_order[i]}</div>`;
}
boxes_element += '<div class="box" id="10">10</div>'


container.innerHTML = boxes_element;


let dragging = false;
let box = document.getElementById("2")
box.addEventListener('mousedown', function(evt){
    dragging = true;
  });

window.addEventListener('mouseup', function(evt){
    dragging = false;
  });


window.addEventListener('mousemove', function(evt){
if(dragging){
    
    // get X position of left side of parent element
    var parentContainer = box.parentElement;
    var parentLeft = parentContainer.getBoundingClientRect().left;
    // get current mouse X position
    var mouseX = evt.pageX;
    
    // MOVE -- set CSS 'left' value to mouse X - parent's left X = left offset for drag element
    dragEl.style.left = mouseX - parentLeft;
}
});


// add event listener to div box number 2 - 9

// if dragging, detect position of drag and move the element according to position
    // break down position of container into ten portions, 
    // if the element is dragger to next box
        //create a new boxes element and set innerHTML to new boxes_element
// 