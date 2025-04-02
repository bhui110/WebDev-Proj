document.querySelector(".button").addEventListener("click", function() {
    let circles = document.querySelectorAll(".circle");
    circles.forEach(circle => {
        circle.classList.add("grow");
    });

    setTimeout(function(){
        window.location.href = "game.html"; 
    }, 2000);
});