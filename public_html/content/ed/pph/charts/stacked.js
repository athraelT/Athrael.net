function drawStackedChart(graphDataList, activity, selectedPowers) {
    var prepList = [], fortList = [], expList = [];
    var colors = [];

    $.each(graphDataList, function (index, value) {
        //  If power selected to be displayed.
        if (jQuery.inArray(value[0], selectedPowers) !== -1)
        {
            colors.push(powerColorList[value[0]]);
            /*
             Push data for each member.
             
             prepList.push();
             fortList.push();
             expList.push();
             
             */
        }
    });

    $(function () {
        $('#container').highcharts({
            chart: {
                type: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
            },
            //colors: colors,
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: selectedPowers
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
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
            series: [{
                    name: 'Preparation',
                    data: [5, 3, 4]
                }, {
                    name: 'Fortification',
                    data: [2, 2, 3]
                }, {
                    name: 'Expansion',
                    data: [3, 4, 4]
                }]
        });
    });
}