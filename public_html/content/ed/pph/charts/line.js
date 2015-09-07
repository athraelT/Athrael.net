function drawLineChart(graphDataList, activity) {

    var series = [];
    var categories = [];

    $.each(graphDataList, function (index, value) {
        if (value[0] !== "Analysis") {
            series.push({
                name: graphDataList[index][0],
                data: graphDataList[index][1]
            });
        }
    });

    for (i = 0; i < graphDataList[1][1].length; i++)
        categories.push(i + 2);

    $('#container').highcharts({
        chart: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },
        colors: [powerColorList["Hudson"], powerColorList["Winters"], powerColorList["Arissa"],
            powerColorList["Aisling"], powerColorList["Torval"], powerColorList["Patreus"],
            powerColorList["Mahon"], powerColorList["Sirius"], powerColorList["Archon"],
            powerColorList["Antal"]],
        legend: {
            enabled: true
        },
        title: {
            text: '',
            style: {"color": "#E0E0E0"}
        }, xAxis: {
            categories: categories,
            title: {
                enabled: true,
                style: {"color": "#E0E0E0"},
                text: 'Cycle #'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: activity + 'Score',
                style: {"color": "#E0E0E0"}
            },
            plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
        },
        tooltip: {
            headerFormat: 'Power: <b>{series.name}</b><br>',
            pointFormat: 'Score: <b>{point.y}</b>'
                    //pointFormat: 'Cycle: <b>{point.x}</b>, Score: <b>{point.y}</b>'
        },
        series: series
    });
}
;