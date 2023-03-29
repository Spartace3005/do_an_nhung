    var humi_graph_1 = [];
    var temp_graph_1 = [];
    var date_graph_1 = [];
    var light_graph_1 = [];
    var humi_graph_2 = [];
    var temp_graph_2 = [];
    var date_graph_2 = [];
    var light_graph_2 = [];

function exportCharts1(con1, io1) {
    var m_time_1
    var newTemp_1
    var newHumi_1
    var newLight_1

    var sql1 = "SELECT * FROM sensors1 ORDER BY ID DESC limit 1"
    con1.query(sql1, function (err1, result, fields) {
        if (err1) throw err1;
        console.log("Data selected");
        result.forEach(function (value) {
            m_time_1 = value.Time.toString().slice(4, 24);
            newTemp_1 = value.Temperature
            newHumi_1 = value.Humidity
            newLight_1 = value.Light
            console.log(m_time_1 + " " + value.Temperature + " " + value.Humidity + " " + value.Light);

            io.sockets.emit('server-update-data-2', { id: value.ID, time: m_time_1, temp: value.Temperature, humi: value.Humidity, light: value.Light })
        })
        if (humi_graph_1.length < 5) {
            humi_graph_1.push(newHumi_1);
        }
        else {
            for (i = 0; i < 4; i++) {
                humi_graph_1[i] = humi_graph_1[i + 1];
            }
            humi_graph_1[4] = newHumi_1;
        }

        if (temp_graph_1.length < 5) {
            temp_graph_1.push(newTemp_1);
        }
        else {
            for (u = 0; u < 4; u++) {
                temp_graph_1[u] = temp_graph_1[u + 1];
            }
            temp_graph_1[4] = newTemp_1;
        }
        
        if (light_graph_1.length < 5) {
            light_graph_1.push(newLight_1);
        }
        else {
            for (a = 0; a < 5; a++) {
                light_graph_1[a] = light_graph_1[a + 1];
            }
            light_graph_1[4] = newLight_1;
        }


        if (date_graph_1.length < 5) {
            date_graph_1.push(m_time_1);
        }
        else {
            for (x = 0; x < 4; x++) {
                date_graph_1[x] = date_graph_1[x + 1];
            }
            date_graph_1[4] = m_time_1;
        }

        // console.log(temp_graph_1,humi_graph_1)

        io1.sockets.emit("server-send-humi_graph_1", humi_graph_1);
        io1.sockets.emit("server-send-temp_graph_1", temp_graph_1);
        io1.sockets.emit("server-send-date_graph_1", date_graph_1);
        io1.sockets.emit("server-send-light_graph_1", light_graph_1);


    });

}
function exportCharts2(con2, io2) {
    var m_time_2
    var newTemp_2
    var newHumi_2
    var newLight_2

    var sql2 = "SELECT * FROM sensors2 ORDER BY ID DESC limit 1"
    con1.query(sql2, function (err2, result, fields) {
        if (err2) throw err2;
        console.log("Data selected");
        result.forEach(function (value) {
            m_time_2 = value.Time.toString().slice(4, 24);
            newTemp_2 = value.Temperature
            newHumi_2 = value.Humidity
            newLight_2 = value.Light
            console.log(m_time_2 + " " + value.Temperature + " " + value.Humidity + " " + value.Light);

            io.sockets.emit('server-update-data-1', { id: value.ID, time: m_time_2, temp: value.Temperature, humi: value.Humidity, light: value.Light })
        })
        if (humi_graph_2.length < 5) {
            humi_graph_2.push(newHumi_2);
        }
        else {
            for (i = 0; i < 4; i++) {
                humi_graph_2[i] = humi_graph_1[i + 1];
            }
            humi_graph_2[4] = newHumi_2;
        }

        if (temp_graph_2.length < 5) {
            temp_graph_2.push(newTemp_2);
        }
        else {
            for (u = 0; u < 4; u++) {
                temp_graph_2[u] = temp_graph_2[u + 1];
            }
            temp_graph_2[4] = newTemp_2;
        }
        
        if (light_graph_2.length < 5) {
            light_graph_2.push(newLight_2);
        }
        else {
            for (a = 0; a < 5; a++) {
                light_graph_2[a] = light_graph_2[a + 1];
            }
            light_graph_2[4] = newLight_2;
        }


        if (date_graph_2.length < 5) {
            date_graph_2.push(m_time_2);
        }
        else {
            for (x = 0; x < 4; x++) {
                date_graph_2[x] = date_graph_2[x + 1];
            }
            date_graph_2[4] = m_time_2;
        }

        // console.log(temp_graph_1,humi_graph_1)

        io1.sockets.emit("server-send-humi_graph_2", humi_graph_2);
        io1.sockets.emit("server-send-temp_graph_2", temp_graph_2);
        io1.sockets.emit("server-send-date_graph_2", date_graph_2);
        io1.sockets.emit("server-send-light_graph_2", light_graph_2);


    });
}
export  {exportCharts1,exportCharts2}