$(function(){
   
    var paint = false;
    var paint_erase = "paint";


    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext('2d');
    var container = $("#canva");
    var mouse = {x:0, y:0};


    if(localStorage.getItem("img")){
        dataUri = localStorage.getItem("img");
        var image = new Image();
        image.onload = function(){
            ctx.drawImage(image, 0, 0);
        }
        image.src = dataUri;
    }


    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.linejoin = "round";

    container.mousedown(function(e){
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY = this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
    })

    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
    container.mouseup(function(){
        paint = false;
    })

    
    $("#reset").click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint",
        $("#erase").removeClass("erasemode")
    })

    $("#erase").click(function(){
        if(paint_erase=="paint"){
            paint_erase = "erase"
        }else{
            paint_erase = "paint";
        }
        $(this).toggleClass("erasemode");
    })

    $("#save").click(function(){
        if(typeof(localStorage!==null)){
            localStorage.setItem("img", canvas.toDataURL());
        }
    })

    $("#paintColor").change(function(){
        $("#circle").css("background-color", $(this).val());
    })

    $('#slider').slider({
        min: 3,
        max: 30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value
        }
    });
})