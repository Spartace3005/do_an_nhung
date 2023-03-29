// Gõ lệnh node index.js để bắt đầu chạy server

var express = require('express')  // Module xử lí chung
var mysql = require('mysql2')     // Module cho phép sử dụng cơ sở dữ liệu mySQL 
var mqtt = require('mqtt')        // Module cho phép sử dụng giao thức mqtt


var app = express()
var port = 3005              // Port của localhost do mình chọn

var exportCharts1 = require('./export.js') // Require file export.js
    .default // Require file export.js
var exportCharts2 = require('./export.js') // Require file export.js
    .default // Require file export.js

app.use(express.static("public"))
app.set("views engine", "ejs")
app.set("views", "./views")

var server = require("http").Server(app)
var io = require('socket.io')(server)


app.get("/", function (req, res) {
  res.render("home.ejs");
});
app.get('/sensor1', function (req, res) {
    res.render('sensor1.ejs')
})
app.get('/sensor2', function (req, res) {
    res.render('sensor2.ejs')
})
app.get('/chart1', function (req, res) {
    res.render('chart1.ejs')
})
app.get('/chart2', function (req, res) {
    res.render('chart2.ejs')
})

server.listen(port, function () {
    console.log('Server listening on port ' + port)
})

var client = mqtt.connect('mqtt://localhost:3005', { clientId: "servergerger" });



// declare topics
var topic1 = "Light-1";
var topic2 = "Light-2";

var topic_list_1 = ["temperature-humidity-light-1"];
var topic_list_2 = ["temperature-humidity-light-2"];


console.log("connected flag  " + client.connected);
client.on("connect", function () {
    console.log("connected mqtt " + client.connected);
});

client.on("error", function (error) {
    console.log("Can't connect" + error);
    process.exit(1)
});



client.subscribe("temperature-humidity-light-1");
client.subscribe("temperature-humidity-light-2");

// SQL--------Temporarily use PHPMyAdmin------------------------------
// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'mcb'
// });
var con1 = mysql.createConnection({
    database:'railway',
    host: 'containers-us-west-204.railway.app',
    user: 'root',
    password: 'TvzyRwueiP6fd8ATKT6l',
    port:'6218',
    user:'root',
});
var con2 = mysql.createConnection({
    database:'railway',
    host: 'containers-us-west-204.railway.app',
    user: 'root',
    password: 'TvzyRwueiP6fd8ATKT6l',
    port:'6218',
    user:'root',
});

//---------------------------------------------CREATE TABLE 1-------------------------------------------------
con1.connect(function (err1) {
    if (err1) throw err1;
    console.log("mysql connected");
    var sql1 = "CREATE TABLE IF NOT EXISTS sensors1(ID int(10) not null primary key auto_increment, Time datetime not null, Temperature int(3) not null, Humidity int(3) not null, Light int(5) not null )"
    con1.query(sql1, function (err1) {
        if (err1)
            throw err1;
        console.log("Table created");
    });
})

var humi_graph_1 = [];
var temp_graph_1 = [];
var date_graph_1 = [];
var light_graph_1 = [];

var m_time_1
var newTemp1
var newHumi1
var newLight1

//--------------------------------------------------------------------
var cnt_check_1 = 0;
client.on('message', function (topic1, message1, packet) {
    console.log("message is " + message1)
    console.log("topic is " + topic1)
    const objData = JSON.parse(message)
    if (topic1 == topic_list_1[0]) {
        cnt_check_1 = cnt_check_1 + 1
        newTemp1  = objData.Temperature;
        newHumi1  = objData.Humidity; 
        newLight1 = objData.Light;
    }

    if (cnt_check_1 == 1) {
        cnt_check_1 = 0

        console.log("ready to save")
        var n = new Date()
        var month = n.getMonth() + 1
        var Date_and_Time = n.getFullYear() + "-" + month + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();

        var sql = "INSERT INTO sensor1 (Time, Temperature, Humidity, Light) VALUES ('" + Date_and_Time.toString() + "', '" + newTemp1 + "', '" + newHumi1 + "', '" + newLight1 + "')"
        con1.query(sql1, function (err1, result1) {
            if (err1) throw err1;
        });

        exportCharts1(con1, io1)
    }
})

//---------------------------------------------CREATE TABLE 2-------------------------------------------------
con2.connect(function (err2) {
    if (err2) throw err2;
    console.log("mysql connected");
    var sql2 = "CREATE TABLE IF NOT EXISTS sensors2(ID int(10) not null primary key auto_increment, Time datetime not null, Temperature int(3) not null, Humidity int(3) not null, Light int(5) not null )"
    con2.query(sql2, function (err2) {
        if (err2)
            throw err2;
        console.log("Table created");
    });
})

var humi_graph_2 = [];
var temp_graph_2 = [];
var date_graph_2 = [];
var light_graph_2 = [];

var m_time_2
var newTemp2
var newHumi2
var newLight2
//--------------------------------------------------------------------
var cnt_check_2 = 0;
client.on('message', function (topic2, message2, packet) {
    console.log("message is " + message2)
    console.log("topic is " + topic2)
    const objData = JSON.parse(message2)
    if (topic2 == topic_list_2[0]) {
        cnt_check_2 = cnt_check2 + 1
        newTemp2  = objData.Temperature;
        newHumi2  = objData.Humidity; 
        newLight2 = objData.Light;
    }

    if (cnt_check_2 == 1) {
        cnt_check_2 = 0

        console.log("ready to save")
        var n = new Date()
        var month = n.getMonth() + 1
        var Date_and_Time = n.getFullYear() + "-" + month + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();

        var sql = "INSERT INTO sensor2 (Time, Temperature, Humidity, Light) VALUES ('" + Date_and_Time.toString() + "', '" + newTemp2 + "', '" + newHumi2 + "', '" + newLight2 + "')"
        con2.query(sql1, function (err2, result2) {
            if (err2) throw err2;
        });

        exportCharts2(con2, io)
    }
})

//----Socket---------Control devices----------------------------

io.on('connection', function (socket) {
    console.log(socket.id + " connected")
    socket.on('disconnect', function () {
        console.log(socket.id + " disconnected")
    })

    socket.on("leftLightChange", function (data) {
        if (data == "on") {
            console.log('Left Light ON')
            client.publish(topic1, 'Left_Light_On');
        }
        else {
            console.log('Left Light OFF')
            client.publish(topic1, 'Left_Light_Off');
        }
    })
    socket.on("rightLightChange", function (data) {
        if (data == "on") {
            console.log('Right Light ON')
            client.publish(topic2, 'Right_Light_On');
        }
        else {
            console.log('Right Light OFF')
            client.publish(topic2, 'Right_Light_Off');
        }
    })


    // Send data to History page 1
    var history1 = "SELECT * FROM sensors1 ORDER BY ID"
    con1.query(history1, function (err1, result1, fields) {
        if (err1) throw err1;
        console.log("Full Data selected");
        var fullData1 = []
        result1.forEach(function (value) {
            var m_time = value.Time.toString().slice(4, 24);
            fullData1.push({ id: value.ID, time: m_time, temp: value.Temperature, humi: value.Humidity, light: value.Light })
        })
        io.sockets.emit('send-full', fullData1)
    })
    var history2 = "SELECT * FROM sensors2 ORDER BY ID"
    con2.query(history2, function (err2, result2, fields) {
        if (err2) throw err2;
        console.log("Full Data selected");
        var fullData2 = []
        result2.forEach(function (value) {
            var m_time = value.Time.toString().slice(4, 24);
            fullData2.push({ id: value.ID, time: m_time, temp: value.Temperature, humi: value.Humidity, light: value.Light })
        })
        io.sockets.emit('send-full', fullData2)
    })
})
