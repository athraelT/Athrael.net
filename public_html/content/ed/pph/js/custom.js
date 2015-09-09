/*
 Copyright  (c) 2015 Athrael
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 
 The Elite: Dangerous game logic and data in this file remains the property of Frontier Developments plc,
 and is used here as authorized by Frontier Customer Services (https://forums.frontier.co.uk/showthread.php?t=5349)
 */
var elementList = {};
var graphDataList = [];
var graphData = [];
var powerColorList = [];

function print(msg) {
    // shows console msg if debug is on else does nothing
    if (typeof console !== 'undefined') {
        console.log(msg);
    }
}

function initTabs() {
    $(function () {
        $("#tabs").tabs({
        });
    });
}

function initPowerColorList() {
    powerColorList["Hudson"] = "#fc0100";
    powerColorList["Winters"] = "#ff8100";
    powerColorList["Arissa"] = "#7e02f6";
    powerColorList["Aisling"] = "#208fe0";
    powerColorList["Torval"] = "#0044ff";
    powerColorList["Patreus"] = "#06f9ff";
    powerColorList["Mahon"] = "#00ff00";
    powerColorList["Sirius"] = "#c4ff03";
    powerColorList["Archon"] = "#81fa00";
    powerColorList["Antal"] = "#ffff07";
}

var Power = function (name) {
    this.type = "Power";
    this.name = name;
    this["data"] = {};
    this["Preparation"] = {};
    this["Fortification"] = {};
    this["Expansion"] = {};
    this["Undermining"] = {};
    this["Opposition"] = {};
}

var Analysis = function (name) {
    this.type = "Analysis";
    this.name = name;
    this["data"] = {};
}

function initMultiSelect() {
    $('#example').multiselect({
        buttonWidth: '240',
        includeSelectAllOption: true
    });
}

function initAnalysis() {
    elementList["Overview"] = new Analysis("Overview");
    elementList["Intro"] = new Analysis("Intro");
    elementList["Body"] = new Analysis("Body");
    elementList["Conclusion"] = new Analysis("Conclusion");
    elementList["Writer"] = new Analysis("Writer");
}

function initPower() {
    elementList["Hudson"] = new Power("Hudson");
    elementList["Winters"] = new Power("Winters");
    elementList["Arissa"] = new Power("Arissa");
    elementList["Aisling"] = new Power("Aisling");
    elementList["Torval"] = new Power("Torval");
    elementList["Patreus"] = new Power("Patreus");
    elementList["Mahon"] = new Power("Mahon");
    elementList["Sirius"] = new Power("Sirius");
    elementList["Archon"] = new Power("Archon");
    elementList["Antal"] = new Power("Antal");
}

function initPowerActivities() {
    $.each(cycle_data[0], function (index, value) {
        $.each(value, function (l, data) {
            updatePowerActivity(index, data.Activity, data)
        });
    });
}

function updatePowerActivity(cycle, activity, data) {
    elementList["Hudson"][activity][cycle] = data.Hudson;
    elementList["Winters"][activity][cycle] = data.Winters;
    elementList["Arissa"][activity][cycle] = data.Arissa;
    elementList["Aisling"][activity][cycle] = data.Aisling;
    elementList["Torval"][activity][cycle] = data.Torval;
    elementList["Patreus"][activity][cycle] = data.Patreus;
    elementList["Mahon"][activity][cycle] = data.Mahon;
    elementList["Sirius"][activity][cycle] = data.Sirius;
    elementList["Archon"][activity][cycle] = data.Archon;
    elementList["Antal"][activity][cycle] = data.Antal;
}

function updateAnalysisElements(cycle, analysis_data) {
    elementList["Overview"]["data"][cycle] = analysis_data.Overview;
    elementList["Intro"]["data"][cycle] = analysis_data.Intro;
    elementList["Body"]["data"][cycle] = analysis_data.Body;
    elementList["Conclusion"]["data"][cycle] = analysis_data.Conclusion;
    elementList["Writer"]["data"][cycle] = analysis_data.Writer;

    elementList["Hudson"]["data"][cycle] = analysis_data.Hudson;
    elementList["Winters"]["data"][cycle] = analysis_data.Winters;
    elementList["Arissa"]["data"][cycle] = analysis_data.Arissa;
    elementList["Aisling"]["data"][cycle] = analysis_data.Aisling;
    elementList["Torval"]["data"][cycle] = analysis_data.Torval;
    elementList["Patreus"]["data"][cycle] = analysis_data.Patreus;
    elementList["Mahon"]["data"][cycle] = analysis_data.Mahon;
    elementList["Sirius"]["data"][cycle] = analysis_data.Sirius;
    elementList["Archon"]["data"][cycle] = analysis_data.Archon;
    elementList["Antal"]["data"][cycle] = analysis_data.Antal;
}

function updateAnalysis() {
    $.each(cycle_analysis[0], function (index, value) {
        $.each(value, function (type, data) {
            $.each(value, function (type, powerAnalysis) {
                updateAnalysisElements(index, powerAnalysis);
            });

        });
    });
}

function writeAnalysis() {
    var numCycles = 1;

    var cycleData = "";
    cycleData += "<div class='scroller'>";
    cycleData += "<ul>";

    $.each(elementList["Mahon"]["data"], function (cycle, data) {
        numCycles++;
    });

    for (i = numCycles; i > 1; i--)
        cycleData += "<li><a href='#tab-" + i + "'>Cycle " + i + "</a></li>";

    cycleData += "</ul>";
    cycleData += "</div>";
    $("#tabs").append(cycleData);

    $.each(elementList["Mahon"]["data"], function (cycle, data) {
        cycleData = "";
        cycleData += "<div id='tab-" + cycle + "' class='tab-panel'>";
        //cycleData += "<h1 class='powers-h' align='center'><u>Cycle " + cycle + "</u></h1><hr>";

        cycleData += "<h3 class='powers-h'>Overview</h3>";
        cycleData += elementList["Overview"]["data"][cycle] + "<hr>";

        cycleData += "<div class='powers-div'>";
        var powersExist = false;
        $.each(elementList, function (index, value) {
            if (elementList[index]["data"][cycle] !== "" && value.type === "Power") {
                cycleData += "<h3 class='powers-h' style='color:" + powerColorList[index] + "'>" + index + "</h3>";
                cycleData += "<p class='powers-p'><img class = 'powers-img'src='img/powers/" + index + ".jpg'> " + elementList[index]["data"][cycle] + "</p>";
                powersExist = true;
            }
        });
        cycleData += "</div>";

        cycleData += "<div class='powers-div'>";
        /*  Intro excluded for the time being.
         cycleData += "<h3 class='powers-h'>Intro</h3>";
         cycleData += elementList["Intro"]["data"][cycle];
         */
        if (powersExist)
            cycleData += "<hr>";

        cycleData += "<h3 class='powers-h'>Guesses & Predictions</h3>";
        cycleData += elementList["Body"]["data"][cycle];
        cycleData += "<hr>";

        if (elementList["Conclusion"]["data"][cycle] !== "") {
            cycleData += "<h3 class='powers-h'>Final Words</h3>";
            cycleData += elementList["Conclusion"]["data"][cycle];
            cycleData += "<hr>";
        }

        cycleData += "<h3 class='powers-h'>Written By</h3>";
        cycleData += "<div align='center'>" + elementList["Writer"]["data"][cycle] + "</div>";

        cycleData += "</div>";

        $("#tabs").append(cycleData);
    });
}

$("#about-nav").on("click", function () {
    switchDiv("#about-div");
});

$("#prank-nav").on("click", function () {
    switchDiv("#prank-div");
});

$("#apred-nav").on("click", function () {
    switchDiv("#apred-div");
});

$(document).on("click", "#proceed-to-prank", function () {
    switchDiv("#prank-div");
});

$(document).on("click", "#proceed-to-apred", function () {
    switchDiv("#apred-div");
});

$(document).on("click", "#back-to-prank", function () {
    switchDiv("#prank-div");
});

$('.dropdown-menu a').click(function (a) {
    a.preventDefault();
    var activity = $(this).text();
    $("#actA").html(activity);
    graphDataList = [];

    $.each(elementList, function (name, value) {
        graphData = [];

        if (value.type === "Power") {
            $.each(value[activity], function (index, value) {
                graphData.push(value);
            });
            graphDataList.push([name, graphData]);
        }
    });
    var selectedPowers = $('#example').val();

    if (selectedPowers === null)
        swal("Error!", "Please Enter one or more powers to display the chart.")
    else
        drawLineChart(graphDataList, activity, selectedPowers);
});

function switchDiv(divID) {
    var divList = ['#about-div', '#prank-div', '#apred-div'];
    $.each(divList, function (index, value) {
        if (value === divID)
            $(divID).show("slow");
        else {
            $(value).hide("slow");
        }
    });
}

$(document).ready(function () {
    initMultiSelect();
    initPowerColorList();
    initPower();
    initPowerActivities();

    initAnalysis();
    updateAnalysis();
    writeAnalysis();

    initTabs();
});