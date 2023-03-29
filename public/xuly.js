var socket = io()

socket.on("server-update-data-1", function (data) {

    // Home page
    $("#currentTemp1").html(data.temp)
    $("#currentHumi1").html(data.humi)
    $("#currentLight1").html(data.light)


    // History page
    $("#id-content-1").append("<div class='h-para'>" + data.id + "</div>")//
    $("#time-content-1").append("<div class='h-para'>" + data.time + "</div>")
    $("#temp-content-1").append("<div class='h-para'>" + data.temp + "</div>")
    $("#humi-content-1").append("<div class='h-para'>" + data.humi + "</div>")
    
})

socket.on("server-update-data-2", function (data) {

    // Home page
    $("#currentTemp2").html(data.temp)
    $("#currentHumi2").html(data.humi)
    $("#currentLight2").html(data.light)


    // History page
    $("#id-content-2").append("<div class='h-para'>" + data.id + "</div>")//
    $("#time-content-2").append("<div class='h-para'>" + data.time + "</div>")
    $("#temp-content-2").append("<div class='h-para'>" + data.temp + "</div>")
    $("#humi-content-2").append("<div class='h-para'>" + data.humi + "</div>")
    
})



// ---- Control devices ----
function Light1() {
    var sttlight = document.getElementById("den-1")
  
    var checkBox = document.getElementById("checkBox_light_1");
    if (checkBox.checked == true) {
        var result = confirm(" Do you want to turn on left light? ")
        if(result){ 
        document.getElementById("light1_img").src='on.svg'
        socket.emit("leftLightChange", "on")
        }
        else{
            document.getElementById("light1_img").src='off.svg'
            checkBox.checked = false
        }
    } else {
        document.getElementById("light1_img").src='off.svg'
        socket.emit("leftLightChange", "off")

    }
}
function Light2() {
 var stttv = document.getElementById("den-2")
    var checkBox = document.getElementById("checkBox_light_2");
    if (checkBox.checked == true) {
        var result = confirm(" Do you want to turn on right light? ")
        if(result){
        document.getElementById("light2_img").src="on.svg"
        socket.emit("rightLightChange", "on")
        }
        else{
            document.getElementById("light2_img").src="off.svg"
            checkBox.checked = false
        }
    } else {
        document.getElementById("light2_img").src="off.svg"
        socket.emit("rightLightChange", "off")
    }
}

