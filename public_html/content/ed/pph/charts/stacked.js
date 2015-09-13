function drawStackedChart(selectedPowers, activity, prepList, fortList, expList, opList, undList) {

    var series = [];
    var colors = [];

    if (activity === "Preparation, Fortification & Expansion") {
        series.push({name: "Preparation", data: prepList}, {name: "Fortification", data: fortList}, {name: "Expansion", data: expList});
        colors.push("#8FBC8F", "#BDB76B", "#B22222");
    }
    else if (activity === "Undermining & Opposition") {
        series.push({name: "Undermining", data: undList}, {name: "Opposition", data: opList});
        colors.push("#BDB76B", "#FF8C00");
    }
    else if (activity === "Preparation & Fortification") {
        series.push({name: "Preparation", data: prepList}, {name: "Fortification", data: fortList});
        colors.push("#8FBC8F", "#BDB76B");
    }

    $(function () {
        $('#container').highcharts({
            chart: {
                type: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
            },
            colors: colors,
            title: {
                text: activity
            },
            xAxis: {
                categories: selectedPowers
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Activity'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            }, /*
             legend: {
             align: 'right',
             x: -30,
             verticalAlign: 'top',
             y: 25,
             floating: true,
             backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
             borderColor: '#CCC',
             borderWidth: 1,
             shadow: false
             },*/
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: series
        });
    });
}