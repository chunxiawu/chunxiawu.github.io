/*
The functions in this file are used to draw charts. Each function will query the corresponding data first and 
then draw a chart by using C3js library.
*/

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function hideAllChildNodes(parent){
    var subChildenEl = d3.select(parent).selectAll();
    for(var i = 1; i < subChildenEl.length; i++){
        var a = subChildenEl[i];
        a.style.display = 'none';
     }
}

function drawNoData(){
    var mainBelowDiv = document.getElementById('layout-main-below');
    var mainBelowDivFirstChild = mainBelowDiv.childNodes[1];
    var newBelowNoData = document.getElementById('layout-main-below-noData');

    if (newBelowNoData == null){ // hasn't been created yet
        newBelowNoData = document.createElement('div');
        newBelowNoData.id = 'layout-main-below-noData';
    }else {
        newBelowNoData.innerHTML='';
    }

    mainBelowDivFirstChild.parentNode.insertBefore(newBelowNoData,mainBelowDivFirstChild);
    var textNoData = document.createElement('div');
    textNoData.className ='no-data-text';

    textNoData.innerHTML = 'Subbasin data is currently not available in this area!'+'<div class='+ 'no-data-text-note'+ '>' + ' (This page will be updated when data becomes available.)</div>';
    newBelowNoData.appendChild(textNoData);

}

function showNoData(){
    const noDataView = document.getElementById('layout-main-below-noData');
    noDataView.style.display = 'block';
    noDataViewFlag = 1;
}
function getAverageBasinWaterBarChartData(loadingBar, data1, xValues, links, l, j) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            var sumData1 = 0;
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    sumData1 += Number(json[i].SupplyTotal_Annual);
                }
                if (j == 1) {
                    sumData1 += Number(json[i].SupplyTotal_Peak);
                }
                if (j == 2) {
                    sumData1 += Number(json[i].SuppyTotal_NonPeak);
                }
            }
            if (sumData1 != 0) {
                data1.push(Math.round(sumData1 / json.length));
                if (json[0].Basin == "MISSOURI TRIBUTARIES") {
                    xValues.push(json[0].Basin + " *");
                } else {
                    xValues.push(json[0].Basin);
                }
            }

            if (xValues.length == basinNaviButton.length) {
                var table = [];
                for (var s = 0; s < xValues.length; s++) {
                    table[s] = [];
                    table[s][0] = xValues[s];
                    table[s][1] = data1[s];
                }
                table.sort();
                var category = [];
                var yValues = ['Basin Water Supply (Acre-Feet)'];
                for (var m = 0; m < xValues.length; m++) {
                    category.push(table[m][0]);
                    yValues.push(table[m][1]);
                }
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 10, right: 20, bottom: 10, left: 90 },
                    data: {
                        columns: [yValues],
                        axes: { "Basin Water Supply (Acre-Feet)": 'y' },
                        type: 'bar',
                        colors: { "Basin Water Supply (Acre-Feet)": 'rgba(50,140,186,1)' }
                    },
                    axis: {
                        x: { type: 'category', categories: category },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: { show: false }
                });
                loadingBar.style.visibility = 'hidden';
                loadingBar.style.marginLeft = '388px';
            }
        }
    }
    xmlhttp.open('GET', links[l], true);
    xmlhttp.send();
}


function getAverageTotalDemandMultiBarChartData(loadingBar, data1, data2, data3, xValues, links, l, j) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            var sumData1 = 0;
            var sumData2 = 0;
            var sumData3 = 0;
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    sumData1 += Number(json[i].NearTermDemandTotal_Annual);
                    sumData2 += Number(json[i].LongTermDemandTotal_Annual);
                    sumData3 += Number(json[i].ProjectedLongTermDemandTotal_Annual);
                }
                if (j == 1) {
                    sumData1 += Number(json[i].NearTermDemandTotal_Peak);
                    sumData2 += Number(json[i].LongTermDemandTotal_Peak);
                    sumData3 += Number(json[i].ProjectedLongTermDemandTotal_Peak);
                }
                if (j == 2) {
                    sumData1 += Number(json[i].NearTermDemandTotal_NonPeak);
                    sumData2 += Number(json[i].LongTermDemandTotal_NonPeak);
                    sumData3 += Number(json[i].ProjectedLongTermDemandTotal_NonPeak);
                }
            }
            if (sumData1 != 0) {
                data1.push(Math.round(sumData1 / json.length));
                if (json[0].Basin == "MISSOURI TRIBUTARIES") {
                    xValues.push(json[0].Basin + " *");
                } else {
                    xValues.push(json[0].Basin);
                }
            //}
            //if (sumData2 != 0) {
                data2.push(Math.round(sumData2 / json.length));
           // }
           // if (sumData3 != 0) {
                data3.push(Math.round(sumData3 / json.length));
            }
            if (xValues.length == basinNaviButton.length) {
                var table = [];
                for (var s = 0; s < xValues.length; s++) {
                    table[s] = [];
                    table[s][0] = xValues[s];
                    table[s][1] = data1[s];
                    table[s][2] = data2[s];
                    table[s][3] = data3[s];
                }
                table.sort();
                var category = [];
                var yValues1 = ['Near Term'];
                var yValues2 = ['Long Term'];
                var yValues3 = ['Projected'];
                for (var m = 0; m < xValues.length; m++) {
                    category.push(table[m][0]);
                    yValues1.push(table[m][1]);
                    yValues2.push(table[m][2]);
                    yValues3.push(table[m][3]);
                }
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 10, right: 20, bottom: 10, left: 90 },
                    data: {
                        columns: [yValues1, yValues2, yValues3],
                        type: 'bar',
                        colors: {
                            "Near Term": 'rgba(50,140,186,1)',
                            "Long Term": 'rgba(161,212,240,1)',
                            "Projected": 'rgba(165,148,148,1)'
                        }
                    },
                    axis: {
                        x: { type: 'category', categories: category },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
                });
                loadingBar.style.visibility = 'hidden';
                loadingBar.style.marginLeft = '388px';
            }
        }
    }
    xmlhttp.open("GET", links[l], true);
    xmlhttp.send();
}

function drawAverageTotalDemandByCategory(string, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';

    var url = string + n;
    var xmlhttp = new XMLHttpRequest();

    var dataAnnual1 = ['Total Surface Water Consumption'];
    var dataAnnual2 = ['Total Groundwater Consumption'];
    var dataAnnual3 = ['Total Non-consumptive Demand'];
    var dataAnnual4 = ['Net Surface Water Loss'];

    var dataPeak1 = ['Total Surface Water Consumption'];
    var dataPeak2 = ['Total Groundwater Consumption'];
    var dataPeak3 = ['Total Non-consumptive Demand'];
    var dataPeak4 = ['Net Surface Water Loss'];

    var dataNonPeak1 = ['Total Surface Water Consumption'];
    var dataNonPeak2 = ['Total Groundwater Consumption'];
    var dataNonPeak3 = ['Total Non-consumptive Demand'];
    var dataNonPeak4 = ['Net Surface Water Loss'];

    var sumDataAnnual1 = 0;
    var sumDataAnnual2 = 0;
    var sumDataAnnual3 = 0;
    var sumDataAnnual4 = 0;

    var sumDataPeak1 = 0;
    var sumDataPeak2 = 0;
    var sumDataPeak3 = 0;
    var sumDataPeak4 = 0;

    var sumDataNonPeak1 = 0;
    var sumDataNonPeak2 = 0;
    var sumDataNonPeak3 = 0;
    var sumDataNonPeak4 = 0;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {

                sumDataAnnual1 += Number(json[i].SWDemand_Annual);
                sumDataAnnual2 += Number(json[i].GWCTotal_Annual);
                
                sumDataAnnual3 += Number(json[i].TotalNonConsumptiveUse_Annual);
                sumDataAnnual4 += Number(json[i].NetSurfaceWaterLoss_Annual);

                sumDataPeak1 += Number(json[i].SWDemand_Peak);
                sumDataPeak2 += Number(json[i].GWCTotal_Peak);
               
                sumDataPeak3 += Number(json[i].TotalNonConsumptiveUse_Peak);
                sumDataPeak4 += Number(json[i].NetSurfaceWaterLoss_Peak);

                sumDataNonPeak1 += Number(json[i].SWDemand_NonPeak);
                sumDataNonPeak2 += Number(json[i].GWCTotal_NonPeak);
               
                sumDataNonPeak3 += Number(json[i].TotalNonConsumptiveUse_NonPeak);
                sumDataNonPeak4 += Number(json[i].NetSurfaceWaterLoss_NonPeak);
            }

            dataAnnual1.push(Math.round(sumDataAnnual1 / json.length));
            dataAnnual2.push(Math.round(sumDataAnnual2 / json.length));
            dataAnnual3.push(Math.round(sumDataAnnual3 / json.length));
            dataAnnual4.push(Math.round(sumDataAnnual4 / json.length));
            var totalDataAnnual = Math.round(sumDataAnnual1 / json.length)
                                  + Math.round(sumDataAnnual2 / json.length)
                                  + Math.round(sumDataAnnual3 / json.length)
                                  + Math.round(sumDataAnnual4 / json.length);

            dataPeak1.push(Math.round(sumDataPeak1 / json.length));
            dataPeak2.push(Math.round(sumDataPeak2 / json.length));
            dataPeak3.push(Math.round(sumDataPeak3 / json.length));
            dataPeak4.push(Math.round(sumDataPeak4 / json.length));
            var totalDataPeak = Math.round(sumDataPeak1 / json.length)
                              + Math.round(sumDataPeak2 / json.length)
                               + Math.round(sumDataPeak3 / json.length)
                               + Math.round(sumDataPeak4 / json.length);

            dataNonPeak1.push(Math.round(sumDataNonPeak1 / json.length));
            dataNonPeak2.push(Math.round(sumDataNonPeak2 / json.length));
            dataNonPeak3.push(Math.round(sumDataNonPeak3 / json.length));
            dataNonPeak4.push(Math.round(sumDataNonPeak4 / json.length));
            var totalDataNonPeak = Math.round(sumDataNonPeak1 / json.length)
                                  + Math.round(sumDataNonPeak2 / json.length)
                                  + Math.round(sumDataNonPeak3 / json.length)
                                  + Math.round(sumDataNonPeak4 / json.length);

            var chartAnnualArea = document.getElementById('basin-subbasin-pie-chart-0');
            var chartAnnualAreaAbove = document.createElement('div');
            chartAnnualAreaAbove.className = "chart-area-above";
            var chartAnnualAreaMiddle = document.createElement('div');
            chartAnnualAreaMiddle.className = "basin-subbasin-chart-area-label";
            var chartAnnualAreaBelow = document.createElement('div');
            chartAnnualAreaBelow.className = "basin-subbasin-chart-area-total";
            chartAnnualArea.appendChild(chartAnnualAreaAbove);
            chartAnnualArea.appendChild(chartAnnualAreaMiddle);
            chartAnnualArea.appendChild(chartAnnualAreaBelow);
            chartAnnualAreaMiddle.innerHTML = "Annual";
            chartAnnualAreaBelow.innerHTML = "Total: " + addCommas(totalDataAnnual) + " Acre Feet";

            var chartPeakArea = document.getElementById('basin-subbasin-pie-chart-1');
            var chartPeakAreaAbove = document.createElement('div');
            chartPeakAreaAbove.className = "chart-area-above";
            var chartPeakAreaMiddle = document.createElement('div');
            chartPeakAreaMiddle.className = "basin-subbasin-chart-area-label";
            var chartPeakAreaBelow = document.createElement('div');
            chartPeakAreaBelow.className = "basin-subbasin-chart-area-total";
            chartPeakArea.appendChild(chartPeakAreaAbove);
            chartPeakArea.appendChild(chartPeakAreaMiddle);
            chartPeakArea.appendChild(chartPeakAreaBelow);
            chartPeakAreaMiddle.innerHTML = "June - August";
            chartPeakAreaBelow.innerHTML = "Total: " + addCommas(totalDataPeak) + " Acre Feet";

            var chartNonPeakArea = document.getElementById('basin-subbasin-pie-chart-2');
            var chartNonPeakAreaAbove = document.createElement('div');
            chartNonPeakAreaAbove.className = "chart-area-above";
            var chartNonPeakAreaMiddle = document.createElement('div');
            chartNonPeakAreaMiddle.className = "basin-subbasin-chart-area-label";
            var chartNonPeakAreaBelow = document.createElement('div');
            chartNonPeakAreaBelow.className = "basin-subbasin-chart-area-total";
            chartNonPeakArea.appendChild(chartNonPeakAreaAbove);
            chartNonPeakArea.appendChild(chartNonPeakAreaMiddle);
            chartNonPeakArea.appendChild(chartNonPeakAreaBelow);
            chartNonPeakAreaMiddle.innerHTML = "September - May";
            chartNonPeakAreaBelow.innerHTML = "Total: " + addCommas(totalDataNonPeak) + " Acre Feet";

            var chartAnnual = c3.generate({
                bindto: '#basin-subbasin-pie-chart-0 .chart-area-above',
                size: { height: 260, width: 286 },
                padding: { top: 10, right: 0, bottom: 3, left: 0 },
                data: {
                    columns: [dataAnnual1, dataAnnual2, dataAnnual3, dataAnnual4],
                    type: 'pie',
                    colors: {
                       "Total Surface Water Consumption": 'rgba(185,200,211,1)',
                        "Total Groundwater Consumption": 'rgba(186,191,51,1)',
                        "Total Non-consumptive Demand": 'rgba(0,96,127,1)',
                        "Net Surface Water Loss": 'rgba(255,200,67,1)'
                    }
                },
                legend: {
                    show: false
                }
            });

            var chartPeak = c3.generate({
                bindto: '#basin-subbasin-pie-chart-1 .chart-area-above',
                size: { height: 260, width: 286 },
                padding: { top: 10, right: 0, bottom: 3, left: 0 },
                data: {
                    columns: [dataPeak1, dataPeak2, dataPeak3, dataPeak4],
                    type: 'pie',
                    colors: {
                        "Total Surface Water Consumption": 'rgba(185,200,211,1)',
                        "Total Groundwater Consumption": 'rgba(186,191,51,1)',
                        "Total Non-consumptive Demand": 'rgba(0,96,127,1)',
                        "Net Surface Water Loss": 'rgba(255,200,67,1)'
                    }
                },
                legend: {
                    show: false
                }
            });

            var chartNonPeak = c3.generate({
                bindto: '#basin-subbasin-pie-chart-2 .chart-area-above',
                size: { height: 260, width: 286 },
                padding: { top: 10, right: 0, bottom: 3, left: 0 },
                data: {
                    columns: [dataNonPeak1, dataNonPeak2, dataNonPeak3, dataNonPeak4],
                    type: 'pie',
                    colors: {
                        "Total Surface Water Consumption": 'rgba(185,200,211,1)',
                        "Total Groundwater Consumption": 'rgba(186,191,51,1)',
                        "Total Non-consumptive Demand": 'rgba(0,96,127,1)',
                        "Net Surface Water Loss": 'rgba(255,200,67,1)'
                    }
                },
                legend: {
                    show: false
                }
            });

            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawRepubAverageTotalDemandByCategory(string, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';

    var url = string + n;
    var xmlhttp = new XMLHttpRequest();

    var dataAnnual1 = ['Total Groundwater Consumption'];
    var dataAnnual2 = ['Total Surface Water Consumption'];
    

    var sumDataAnnual1 = 0;
    var sumDataAnnual2 = 0;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {

                sumDataAnnual1 += Number(json[i].GWDP_Annual);
                sumDataAnnual2 += Number(json[i].SWDTotal_Annual);
                
            }

            dataAnnual1.push(Math.round(sumDataAnnual1 / json.length));
            dataAnnual2.push(Math.round(sumDataAnnual2 / json.length));
            var totalDataAnnual = Math.round(sumDataAnnual1 / json.length)
                                  + Math.round(sumDataAnnual2 / json.length);

            var chartAnnualArea = document.getElementById('basin-subbasin-pie-chart-1');
            var chartAnnualAreaAbove = document.createElement('div');
            chartAnnualAreaAbove.className = "chart-area-above";
            var chartAnnualAreaMiddle = document.createElement('div');
            chartAnnualAreaMiddle.className = "basin-subbasin-chart-area-label";
            var chartAnnualAreaBelow = document.createElement('div');
            chartAnnualAreaBelow.className = "basin-subbasin-chart-area-total";
            chartAnnualArea.appendChild(chartAnnualAreaAbove);
            chartAnnualArea.appendChild(chartAnnualAreaMiddle);
            chartAnnualArea.appendChild(chartAnnualAreaBelow);
            chartAnnualAreaMiddle.innerHTML = "Annual";
            chartAnnualAreaBelow.innerHTML = "Total: " + addCommas(totalDataAnnual) + " Acre Feet";

            var chartAnnual = c3.generate({
                bindto: '#basin-subbasin-pie-chart-1 .chart-area-above',
                size: { height: 260, width: 286 },
                padding: { top: 10, right: 0, bottom: 3, left: 0 },
                data: {
                    columns: [dataAnnual1, dataAnnual2],
                    type: 'pie',
                    colors: {
                        "Total Surface Water Consumption": 'rgba(185,200,211,1)',
                        "Total Groundwater Consumption": 'rgba(186,191,51,1)'
                    }
                },
                legend: {
                    show: false
                }
            });
            
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawAveragePrecipitationDistributionPieChart() {
    var sum = Number(AvgET) + Number(AvgRunoff ) + Number(AvgRecharge);
    var chartArea = document.getElementById('layout-main-below-left-chart-area');
    var above = document.createElement('div');
    above.id = "layout-main-below-left-chart-area-above";
    var below = document.createElement('div');
    below.innerHTML = "Total: " + addCommas(sum) + " Acre Feet";
    below.id = "layout-main-below-left-chart-area-below";
    chartArea.appendChild(above);
    chartArea.appendChild(below);
    var chart = c3.generate({
        bindto: '#layout-main-below-left-chart-area-above',
        size: { height: 298, width: 859 },
        padding: { top: 5, right: 0, bottom: 35, left: 0 },
        data: {
            columns: [['Evapotranspiration', AvgET], ['Runoff', AvgRunoff], ['Recharge', AvgRecharge]],
            type: 'pie',
            colors: {
                "Evapotranspiration": 'rgba(21,141,186,1)',
                "Runoff": 'rgba(83,124,138,1)',
                "Recharge": 'rgba(155,213,240,1)'
            }
        },
        legend: {
            position: 'right'
        }
    });
}

function getAverageIrrigatedAcresStackedBarChartData(loadingBar, data1, data2, data3, xValues, links, l) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            var sumData1 = 0;
            var sumData2 = 0;
            var sumData3 = 0;
            for (var i = 0; i < json.length; i++) {
                sumData1 += Number(json[i].GWIAcres);
                sumData2 += Number(json[i].SWIAcres);
                sumData3 += Number(json[i].COIAcres);
            }
            if (sumData1 != 0) {
                data1.push(Math.round(sumData1 / json.length));
                data2.push(Math.round(sumData2 / json.length));
                data3.push(Math.round(sumData3 / json.length));
                if (json[0].Basin == "MISSOURI TRIBUTARIES") {
                    xValues.push(json[0].Basin + " *");
                } else {
                    xValues.push(json[0].Basin);
                }
            }
            if (xValues.length == basinNaviButton.length-1) {
                var table = [];
                for (var s = 0; s < xValues.length; s++) {
                    table[s] = [];
                    table[s][0] = xValues[s];
                    table[s][1] = data1[s];
                    table[s][2] = data2[s];
                    table[s][3] = data3[s];
                }
                table.sort();
                var category = [];
                var yValues1 = ['Groundwater'];
                var yValues2 = ['Surface Water'];
                var yValues3 = ['Commingled'];
                for (var m = 0; m < xValues.length; m++) {
                    category.push(table[m][0]);
                    yValues1.push(table[m][1]);
                    yValues2.push(table[m][2]);
                    yValues3.push(table[m][3]);
                }
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 10, right: 20, bottom: 10, left: 90 },
                    data: {
                        columns: [yValues1, yValues2, yValues3],
                        type: 'bar',
                        groups: [['Groundwater', 'Surface Water', 'Commingled']],
                        order: 'desc', 
                        colors: {
                            "Groundwater": '#C8CFA3',
                            "Surface Water": '#D1BE94',
                            "Commingled": '#BDE1B5'
                        }
                    },
                    axis: {
                        x: { type: 'category', categories: category },
                        y: {
                            label: {
                                text: 'Acres',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.35 }
                    },
                    transition: { duration: 1 },
                    legend: { show: true }
                });
                loadingBar.style.visibility = 'hidden';
                loadingBar.style.marginLeft = '388px';
            }
        }
    }
    xmlhttp.open("GET", links[l], true);
    xmlhttp.send();
}

function getAveragePrecipitationRateVolumeCombinationChartData(loadingBar, data1, data2, xValues, links, l, j) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            var sumData1 = 0;
            var sumData2 = 0;
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    sumData1 += Number(json[i].PrecipitationVolume_Annual);
                    sumData2 += Number(json[i].PrecipitationRate_Annual);
                }
                if (j == 1) {
                    sumData1 += Number(json[i].PrecipitationVolume_Peak);
                    sumData2 += Number(json[i].PrecipitationRate_Peak);
                }
                if (j == 2) {
                    sumData1 += Number(json[i].PrecipitationVolume_NonPeak);
                    sumData2 += Number(json[i].PrecipitationRate_NonPeak);
                }
            }
            if (sumData1 != 0) {
                data1.push(Math.round(sumData1 / json.length));
                if (json[0].Basin == "MISSOURI TRIBUTARIES") {
                    xValues.push(json[0].Basin + " *");
                } else {
                    xValues.push(json[0].Basin);
                }
            }
            if (sumData2 != 0) {
                data2.push(Math.round(sumData2 / json.length));
            }
            if (xValues.length == basinNaviButton.length) {
                var table = [];
                for (var s = 0; s < xValues.length; s++) {
                    table[s] = [];
                    table[s][0] = xValues[s];
                    table[s][1] = data1[s];
                    table[s][2] = data2[s];
                }
                table.sort();
                var category = [];
                var yValues1 = ['Volume of Precipitation (Acre-Feet)'];
                var yValues2 = ['Rate of Precipitation (Inches/Year)'];
                for (var m = 0; m < xValues.length; m++) {
                    category.push(table[m][0]);
                    yValues1.push(table[m][1]);
                    yValues2.push(table[m][2]);
                }
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 10, bottom: 10 },
                    data: {
                        columns: [yValues1, yValues2],
                        axes: { "Volume of Precipitation (Acre-Feet)": 'y', "Rate of Precipitation (Inches/Year)": 'y2' },
                        type: 'bar',
                        types: { "Rate of Precipitation (Inches/Year)": 'bar' }, //spline, bar, line, scatter
                        colors: {
                            "Volume of Precipitation (Acre-Feet)": 'rgba(186,191,51,1)',
                            "Rate of Precipitation (Inches/Year)": '#1F577A'
                        }
                    },
                    axis: {
                        x: { type: 'category', categories: category },
                        y: {
                            label: {
                                text: 'Volume of Precipitation (Acre-Feet)',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        },
                        y2: {
                            show: true,
                            label: {
                                text: 'Rate of Precipitation (Inches/Year)',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.60 }
                    },
                    transition: { duration: 1 },
                    legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
                });
                loadingBar.style.visibility = 'hidden';
                loadingBar.style.marginLeft = '388px';
            }
        }
    }
    xmlhttp.open("GET", links[l], true);
    xmlhttp.send();
}

function drawBalanceAnnualBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Positive'];
    var data2 = ['Negative'];
    var xValues = ['x'];
    var sum = 0;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    if (json[i].NearTermBalance_Annual >= 0) {
                        data1.push(json[i].NearTermBalance_Annual);
                        data2.push(null);
                    }
                    if (json[i].NearTermBalance_Annual < 0) {
                        data1.push(null);
                        data2.push(json[i].NearTermBalance_Annual);
                    }
                    sum += Number(json[i].NearTermBalance_Annual);
                }
                if (j == 1) {
                    if (json[i].LongTermBalance_Annual >= 0) {
                        data1.push(json[i].LongTermBalance_Annual);
                        data2.push(null);
                    }
                    if (json[i].LongTermBalance_Annual < 0) {
                        data1.push(null);
                        data2.push(json[i].LongTermBalance_Annual);
                    }
                    sum += Number(json[i].LongTermBalance_Annual);
                }
                if (j == 2) {
                    if (json[i].ProjectedLongTermBalance_Annual >= 0) {
                        data1.push(json[i].ProjectedLongTermBalance_Annual);
                        data2.push(null);
                    }
                    if (json[i].ProjectedLongTermBalance_Annual < 0) {
                        data1.push(null);
                        data2.push(json[i].ProjectedLongTermBalance_Annual);
                    }
                    sum += Number(json[i].ProjectedLongTermBalance_Annual);
                }
                xValues.push(json[i].Year);
            }
            if (sum == 0) {
                var chartArea = document.getElementById('layout-main-below-left-chart-area');
                var text = document.createElement('div');
                text.className = "no-data-text";
                text.innerHTML = "Balance Annual Does Not Exist In This Area";
                chartArea.appendChild(text);
            } else {
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, data1, data2],
                        type: 'bar',
                        groups: [['Positive', 'Negative']],
                        colors: { "Positive": 'rgba(50,140,186,1)', "Negative": 'rgba(255,0,0,1)' }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
                });
            }
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawBalanceNonPeakBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Positive'];
    var data2 = ['Negative'];
    var xValues = ['x'];
    var sum = 0;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    if (json[i].NearTermBalanceNonPeak >= 0) {
                        data1.push(json[i].NearTermBalanceNonPeak);
                        data2.push(null);
                    }
                    if (json[i].NearTermBalanceNonPeak < 0) {
                        data1.push(null);
                        data2.push(json[i].NearTermBalanceNonPeak);
                    }
                    sum += Number(json[i].NearTermBalanceNonPeak);
                }
                if (j == 1) {
                    if (json[i].LongTermBalance_NonPeak >= 0) {
                        data1.push(json[i].LongTermBalance_NonPeak);
                        data2.push(null);
                    }
                    if (json[i].LongTermBalance_NonPeak < 0) {
                        data1.push(null);
                        data2.push(json[i].LongTermBalance_NonPeak);
                    }
                    sum += Number(json[i].LongTermBalance_NonPeak);
                }
                if (j == 2) {
                    if (json[i].ProjectedLongTermBalance_NonPeak >= 0) {
                        data1.push(json[i].ProjectedLongTermBalance_NonPeak);
                        data2.push(null);
                    }
                    if (json[i].ProjectedLongTermBalance_NonPeak < 0) {
                        data1.push(null);
                        data2.push(json[i].ProjectedLongTermBalance_NonPeak);
                    }
                    sum += Number(json[i].ProjectedLongTermBalance_NonPeak);
                }
                xValues.push(json[i].Year);
            }
            if (sum == 0) {
                var chartArea = document.getElementById('layout-main-below-left-chart-area');
                var text = document.createElement('div');
                text.className = "no-data-text";
                text.innerHTML = "Balance September - May Does Not Exist In This Area";
                chartArea.appendChild(text);
            } else {
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, data1, data2],
                        type: 'bar',
                        groups: [['Positive', 'Negative']],
                        colors: { "Positive": 'rgba(50,140,186,1)', "Negative": 'rgba(255, 0, 0,1)' }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
                });
            }
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawBalancePeakBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Positive'];
    var data2 = ['Negative'];
    var xValues = ['x'];
    var sum = 0;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    if (json[i].NearTermBalance_Peak >= 0) {
                        data1.push(json[i].NearTermBalance_Peak);
                        data2.push(null);
                    }
                    if (json[i].NearTermBalance_Peak < 0) {
                        data1.push(null);
                        data2.push(json[i].NearTermBalance_Peak);
                    }
                    sum += Number(json[i].NearTermBalance_Peak);
                }
                if (j == 1) {
                    if (json[i].LongTermBalance_Peak >= 0) {
                        data1.push(json[i].LongTermBalance_Peak);
                        data2.push(null);
                    }
                    if (json[i].LongTermBalance_Peak < 0) {
                        data1.push(null);
                        data2.push(json[i].LongTermBalance_Peak);
                    }
                    sum += Number(json[i].LongTermBalance_Peak);
                }
                if (j == 2) {
                    if (json[i].ProjectedLongTermBalance_Peak >= 0) {
                        data1.push(json[i].ProjectedLongTermBalance_Peak);
                        data2.push(null);
                    }
                    if (json[i].ProjectedLongTermBalance_Peak < 0) {
                        data1.push(null);
                        data2.push(json[i].ProjectedLongTermBalance_Peak);
                    }
                    sum += Number(json[i].ProjectedLongTermBalance_Peak);
                }
                xValues.push(json[i].Year);
            }
            if (sum == 0) {
                var chartArea = document.getElementById('layout-main-below-left-chart-area');
                var text = document.createElement('div');
                text.className = "no-data-text";
                text.innerHTML = "Balance June - August Does Not Exist In This Area";
                chartArea.appendChild(text);
            } else {
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, data1, data2],
                        type: 'bar',
                        groups: [['Positive', 'Negative']],
                        colors: { "Positive": 'rgba(50,140,186,1)', "Negative": 'rgba(255, 0, 0,1)' }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
                });
            }
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawBasinWaterSupplyStackedBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Streamflow'];
    var data2 = ['Surface Water Consumption'];
    var data3 = ['Groundwater Depletions'];
    var data4 = ['Required Inflows'];
    var xValues = ['x'];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    data1.push(json[i].StreamflowAF_Annual);
                    data2.push(json[i].SWDTotal_Annual);
                    data3.push(json[i].GWDP_Annual);
                    data4.push(json[i].BasinInflows_Annual);
                }
                if (j == 1) {
                    data1.push(json[i].StreamflowAF_Peak);
                    data2.push(json[i].SWDTotal_Peak);
                    data3.push(json[i].GWDP_Peak);
                    data4.push(json[i].BasinInflows_Peak);
                }
                if (j == 2) {
                    data1.push(json[i].StreamflowAF_NonPeak);
                    data2.push(json[i].SWDTotal_NonPeak);
                    data3.push(json[i].GWDP_NonPeak);
                    data4.push(json[i].BasinInflows_NonPeak);
                }
                xValues.push(json[i].Year);
            }
            var chart = c3.generate({
                bindto: '#layout-main-below-left-chart-area',
                size: { height: 298, width: 859 },
                padding: { top: 5, right: 20, bottom: 5, left: 90 },
                data: {
                    x: 'x',
                    columns: [xValues, data1, data2, data3, data4],
                    type: 'bar',
                    groups: [['Streamflow', 'Surface Water Consumption', 'Groundwater Depletions', 'Required Inflows']],
                    order: null, 
                    colors: {
                        "Required Inflows": 'rgba(197,209,219,1)',
                        "Groundwater Depletions": 'rgba(148,170,188,1)',
                        "Surface Water Consumption": 'rgba(55,115,144,1)',
                        "Streamflow": 'rgba(0,72,95,1)'
                    }
                },
                axis: {
                    x: {
                        label: {
                            text: 'Year',
                            position: 'outer-left'
                        }
                    },
                    y: {
                        label: {
                            text: 'Acre-Feet',
                            position: 'outer-middle'
                        },
                        tick: {
                            format: d3.format(",")
                        }
                    }
                },
                bar: {
                    width: { ratio: 0.75 }
                },
                transition: { duration: 1 },
                 legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            });
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getDemandByCategoryChartData(loadingBar, data1, data2, data3, data4, xValues, links, l, j) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            var sumData1 = 0;
            var sumData2 = 0;
            var sumData3 = 0;
            var sumData4 = 0;
            var totalData = 0;
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    sumData1 += Number(json[i].SWDemand_Annual);
                    sumData2 += Number(json[i].GWCTotal_Annual);
                    sumData3 += Number(json[i].TotalNonConsumptiveUse_Annual);
                    sumData4 += Number(json[i].NetSurfaceWaterLoss_Annual);
                }
                if (j == 1) {
                    sumData1 += Number(json[i].SWDemand_Peak);
                    sumData2 += Number(json[i].GWCTotal_Peak);
                    sumData3 += Number(json[i].TotalNonConsumptiveUse_Peak);
                    sumData4 += Number(json[i].NetSurfaceWaterLoss_Peak);
                }
                if (j == 2) {
                    sumData1 += Number(json[i].SWDemand_NonPeak);
                    sumData2 += Number(json[i].GWCTotal_NonPeak);
                    sumData3 += Number(json[i].TotalNonConsumptiveUse_NonPeak);
                    sumData4 += Number(json[i].NetSurfaceWaterLoss_NonPeak);
                }
            }
            totalData = sumData1 + sumData2 + sumData3 + sumData4;
            if (totalData != 0) {
                xValues.push(json[0].Basin);
                if (sumData1 != 0) {
                    data1.push(Math.round(sumData1 / json.length));
                } else {
                    data1.push(0);
                }
                if (sumData2 != 0) {
                    data2.push(Math.round(sumData2 / json.length));
                } else {
                    data2.push(0);
                }
                if (sumData3 != 0) {
                    data3.push(Math.round(sumData3 / json.length));
                } else {
                    data3.push(0);
                }
                if (sumData4 != 0) {
                    data4.push(Math.round(sumData4 / json.length));
                } else {
                    data4.push(0);
                }
            }
            if (xValues.length == basinNaviButton.length) {
                var table = [];
                for (var s = 0; s < xValues.length; s++) {
                    table[s] = [];
                    table[s][0] = xValues[s];
                    table[s][1] = data1[s];
                    table[s][2] = data2[s];
                    table[s][3] = data3[s];
                    table[s][4] = data4[s];
                }
                table.sort();
                for (var m = 0; m < xValues.length; m++) {
                    var totalSum = 0;
                    totalSum = table[m][1] + table[m][2] + table[m][3] + table[m][4];
                    var yValues1 = ['Total Surface Water Consumption'];
                    var yValues2 = ['Total Groundwater Consumption'];
                    var yValues3 = ['Total Non-consumptive Demand'];
                    var yValues4 = ['Net Surface Water Loss'];
                    yValues1.push(table[m][1]);
                    yValues2.push(table[m][2]);
                    yValues3.push(table[m][3]);
                    yValues4.push(table[m][4]);
                    var chartAreaId = "state-pie-chart-" + m;
                    var chartArea = document.getElementById(chartAreaId);
                    if (chartArea.innerHTML != "") {
                        chartArea.innerHTML = "";
                    }
                    var chartAreaAbove = document.createElement('div');
                    chartAreaAbove.className = "chart-area-above";
                    var chartAreaMiddle = document.createElement('div');
                    chartAreaMiddle.className = "state-chart-area-label";
                    var chartAreaBelow = document.createElement('div');
                    chartAreaBelow.className = "state-chart-area-total";
                    chartArea.appendChild(chartAreaAbove);
                    chartArea.appendChild(chartAreaMiddle);
                    chartArea.appendChild(chartAreaBelow);
                    if (table[m][0] == "MISSOURI TRIBUTARIES") {
                        chartAreaMiddle.innerHTML = table[m][0] + " *";
                    } else {
                        chartAreaMiddle.innerHTML = table[m][0];
                    }
                    chartAreaBelow.innerHTML = "Total: " + addCommas(totalSum) + " Acre Feet";
                    var chartBindId = "#" + chartAreaId + " .chart-area-above";
                    var chart = c3.generate({
                        bindto: chartBindId,
                        size: { height: 182, width: 211 },
                        padding: { top: 2, right: 0, bottom: 2, left: 0 },
                        data: {
                            columns: [yValues1, yValues2, yValues3, yValues4],
                            type: 'pie',
                            colors: {
                            "Total Surface Water Consumption": 'rgba(185,200,211,1)',
                        "Total Groundwater Consumption": 'rgba(186,191,51,1)',
                        "Total Non-consumptive Demand": 'rgba(0,96,127,1)',
                        "Net Surface Water Loss": 'rgba(255,200,67,1)'
                            }
                        },
                        tooltip: {
                            position: function (data, width, height, element) {
                                return { top: 120, left: 5 }
                            }
                        },
                        legend: {
                            show: false
                        }
                    });
                }
                loadingBar.style.visibility = 'hidden';
                loadingBar.style.marginLeft = '388px';
            }
        }
    }
    xmlhttp.open("GET", links[l], true);
    xmlhttp.send();
}

function drawGWDPBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var yValues = ['Groundwater Depletions'];
    var xValues = ['x'];
    var sum = 0;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    yValues.push(json[i].GWDP_Annual);
                    sum += Number(json[i].GWDP_Annual);
                }
                if (j == 1) {
                    yValues.push(json[i].GWDP_Peak);
                    sum += Number(json[i].GWDP_Peak);
                }
                if (j == 2) {
                    yValues.push(json[i].GWDP_NonPeak);
                    sum += Number(json[i].GWDP_NonPeak);
                }
                xValues.push(json[i].Year);
            }
            if (sum == 0) {
                var chartArea = document.getElementById('layout-main-below-left-chart-area');
                var text = document.createElement('div');
                text.className = "no-data-text";
                text.innerHTML = "Groundwater Depletions Does Not Exist In This Area";
                chartArea.appendChild(text);
            } else {
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, yValues],
                        type: 'bar',
                        colors: { "Groundwater Depletions": 'rgba(83,124,138,1)' }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: { show: false }
                });
            }
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawIrrigatedAcresStackedBarChart(string, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Groundwater'];
    var data2 = ['Surface Water'];
    var data3 = ['Commingled'];
    var xValues = ['x'];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (basinId != 11) {
                var json = JSON.parse(xmlhttp.responseText);
                for (var i = 0; i < json.length; i++) {
                    data1.push(json[i].GWIAcres);
                    data2.push(json[i].SWIAcres);
                    data3.push(json[i].COIAcres);
                    xValues.push(json[i].Year);
                }
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, data1, data2, data3],
                        type: 'bar',
                        groups: [['Groundwater', 'Surface Water', 'Commingled']],
                        order: 'desc', 
                        colors: { "Groundwater": '#C8CFA3', "Surface Water": '#D1BE94', "Commingled": '#BDE1B5' }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acres',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
                });

                loadingBar.style.marginLeft = '388px';
                loadingBar.style.visibility = 'hidden'; 
            } else {
                var json = JSON.parse(xmlhttp.responseText);
                for (var i = 0; i < json.length; i++) {
                    data1.push(json[i].GWIAcres);
                    data2.push(json[i].SWIAcres);
                    xValues.push(json[i].Year);
                }
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, data1, data2],
                        type: 'bar',
                        groups: [['Groundwater', 'Surface Water']],
                        order: 'desc', 
                        colors: { "Groundwater": '#C8CFA3', "Surface Water": '#D1BE94' }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acres',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
                });

                loadingBar.style.marginLeft = '388px';
                loadingBar.style.visibility = 'hidden'; 
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawNetSurfaceWaterLossBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var yValues = ['Net Surface Water Loss'];
    var xValues = ['x'];
    var sum = 0;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    yValues.push(json[i].NetSurfaceWaterLoss_Annual);
               
                    sum += Number(json[i].NetSurfaceWaterLoss_Annual);
                }
                if (j == 1) {
                    yValues.push(json[i].NetSurfaceWaterLoss_Peak);
            
                    sum += Number(json[i].NetSurfaceWaterLoss_Peak);
                }
                if (j == 2) {
                    yValues.push(json[i].NetSurfaceWaterLoss_NonPeak);
         
                    sum += Number(json[i].NetSurfaceWaterLoss_NonPeak);
                }
                xValues.push(json[i].Year);
            }
            if (sum == 0) {
                var chartArea = document.getElementById('layout-main-below-left-chart-area');
                var text = document.createElement('div');
                text.className = "no-data-text";
                text.innerHTML = "Net Surface Water Loss Does Not Exist In This Area";
                chartArea.appendChild(text);
            } else {
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, yValues],
                        type: 'bar',
                        colors: { "Net Surface Water Loss": '#CCCBA2' }
                    },
                    axis: {
                  
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: { show: false }
                });
            }
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawPrecipitationDistributionStackedBarChart(string, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Evapotranspiration'];
    var data2 = ['Recharge'];
    var data3 = ['Runoff'];
    var xValues = ['x'];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                data1.push(json[i].TotalET);
                data2.push(json[i].TotalRecharge);
                data3.push(json[i].TotalRunoff);
                xValues.push(json[i].Year);
            }
            var chart = c3.generate({
                bindto: '#layout-main-below-left-chart-area',
                size: { height: 298, width: 859 },
                padding: { top: 5, right: 20, bottom: 5, left: 90 },
                data: {
                    x: 'x',
                    columns: [xValues, data1, data2, data3],
                    type: 'bar',
                    groups: [['Evapotranspiration', 'Recharge', 'Runoff']],
                    order: 'desc', 
                    colors: {
                        "Evapotranspiration": 'rgba(21,141,186,1)',
                        "Recharge": 'rgba(155,213,240,1)',
                        "Runoff": 'rgba(83,124,138,1)'
                    }
                },
                axis: {
                    x: {
                        label: {
                            text: 'Year',
                            position: 'outer-left'
                        }
                    },
                    y: {
                        label: {
                            text: 'Acre-Feet',
                            position: 'outer-middle'
                        },
                        tick: {
                            format: d3.format(",")
                        }
                    }
                },
                bar: {
                    width: { ratio: 0.75 }
                },
                transition: { duration: 1 },
                legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            });
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawPrecipitationRateVolumeCombinationChart(string, j, n) {
    if (levelState == naviTabLevelId[1]) {
        var loadingBar = document.getElementById('layout-main-below-loading-bar');
        loadingBar.style.marginLeft = '245px';
        loadingBar.style.visibility = 'visible';
    }
    if (subbasinLoaded == 1) {
        var loadingBar = document.getElementById('layout-main-below-loading-bar');
        loadingBar.style.marginLeft = '245px';
        loadingBar.style.visibility = 'visible';
    }
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Precipitation Volume (Acre-Feet)'];
    var data2 = ['Precipitation Rate (Inches/Year)'];
    var xValues = ['x'];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    data1.push(json[i].PrecipitationVolume_Annual);
                    data2.push(json[i].PrecipitationRate_Annual);
                }
                if (j == 1) {
                    data1.push(json[i].PrecipitationVolume_Peak);
                    data2.push(json[i].PrecipitationRate_Peak);
                }
                if (j == 2) {
                    data1.push(json[i].PrecipitationVolume_NonPeak);
                    data2.push(json[i].PrecipitationRate_NonPeak);
                }

                xValues.push(json[i].Year );
				
            }
            var chart = c3.generate({
                bindto: '#layout-main-below-left-chart-area',
                size: { height: 298, width: 859},
                padding: { top: 5, bottom: 5},
                data: {
                    x: 'x',
                    columns: [xValues, data1, data2],
                    axes: { "Precipitation Volume (Acre-Feet)": 'y', "Precipitation Rate (Inches/Year)": 'y2' },
                    type: 'bar',
                    types: { "Precipitation Rate (Inches/Year)": 'line' }, //spline, bar, line, scatter
                    groups: [['Precipitation Volume (Acre-Feet)', 'Precipitation Rate (Inches/Year)']],
                    colors: {
                        "Precipitation Volume (Acre-Feet)": 'rgba(186,191,51,1)',
                        "Precipitation Rate (Inches/Year)": 'rgba(0,96,127,1)'
                    }
                },
                axis: {
                    x: {
                        label: {
                            text: 'Year',
                            position: 'outer-left'
                        }
                    },
                    y: {
                        label: {
                            text: 'Volume of Precipitation (Acre-Feet)',
                            position: 'outer-middle'
                        },
                        tick: {
                            format: d3.format(",")
                        }
                    },
                    y2: {
                        show: true,
                        label: {
                            text: 'Precipitation Rate (Inches/Year)',
                            position: 'outer-middle'
                        },
                        tick: {
                            format: d3.format(",")
                        }
                    }
                },
                bar: {
                    width: { ratio: 0.75 }
                },
                transition: { duration: 1 },
                legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            });
            if (levelState == naviTabLevelId[1]) {
                var loadingBar = document.getElementById('layout-main-below-loading-bar');
                loadingBar.style.marginLeft = '388px';
                loadingBar.style.visibility = 'hidden';
            }
            if (subbasinLoaded == 1) {
                var loadingBar = document.getElementById('layout-main-below-loading-bar');
                loadingBar.style.marginLeft = '388px';
                loadingBar.style.visibility = 'hidden';
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawRequiredInflowsBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var yValues = ['Required Inflows'];
    var xValues = ['x'];
    var sum = 0;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    yValues.push(json[i].BasinInflows_Annual);
                    sum += Number(json[i].BasinInflows_Annual);
                }
                if (j == 1) {
                    yValues.push(json[i].BasinInflows_Peak);
                    sum += Number(json[i].BasinInflows_Peak);
                }
                if (j == 2) {
                    yValues.push(json[i].BasinInflows_NonPeak);
                    sum += Number(json[i].BasinInflows_NonPeak);
                }
                xValues.push(json[i].Year);
            }
            if (sum == 0) {
                var chartArea = document.getElementById('layout-main-below-left-chart-area');
                var text = document.createElement('div');
                text.className = "no-data-text";
                text.innerHTML = "Required Inflow Does Not Exist In This Area";
                chartArea.appendChild(text);
            } else {
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, yValues],
                        type: 'bar',
                        colors: { "Required Inflows": 'rgba(65,105,225,1)' }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: { show: false }
                });
            }
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawStreamflowMultiBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Uncapped Streamflow'];
    var data2 = ['Capped Streamflow'];
    var xValues = ['x'];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    data1.push(json[i].StreamflowAFUncapped_Annual);
                    data2.push(json[i].StreamflowAF_Annual);
                }
                if (j == 1) {
                    data1.push(json[i].StreamflowAFUncapped_Peak);
                    data2.push(json[i].StreamflowAF_Peak);
                }
                if (j == 2) {
                    data1.push(json[i].StreamflowAFUncapped_NonPeak);
                    data2.push(json[i].StreamflowAF_NonPeak);
                }
                xValues.push(json[i].Year);
            }
            var chart = c3.generate({
                bindto: '#layout-main-below-left-chart-area',
                size: { height: 298, width: 859 },
                padding: { top: 5, right: 20, bottom: 5, left: 90 },
                data: {
                    x: 'x',
                    columns: [xValues, data1, data2],
                    type: 'bar',
                    colors: { "Uncapped Streamflow": 'rgba(21,141,186,1)', "Capped Streamflow": 'rgba(155,213,240,1)' }
                },
                axis: {
                    x: {
                        label: {
                            text: 'Year',
                            position: 'outer-left'
                        }
                    },
                    y: {
                        label: {
                            text: 'Acre-Feet',
                            position: 'outer-middle'
                        },
                        tick: {
                            format: d3.format(",")
                        }
                    }
                },
                transition: { duration: 1 },
                legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            });
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawBasinTotalSupplyBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Allocation'];
    var data2 = ['Imported Water Supply'];
    var data3 = ['Resolution Credit'];
    var yValues = ['Total Supply Annual'];
    var xValues = ['x'];
    var sum = 0;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    sum += Number(json[i].SupplyTotal_Annual);
                    data1.push(json[i].SupplyTotal_Annual);
                    
                    data2.push(json[i].ImportedWaterSupply_Annual);
                    sum += Number(json[i].ImportedWaterSupply_Annual);
                    
                    data3.push(json[i].ResolutionWaterSupply_Annual);
                    sum += Number(json[i].ResolutionWaterSupply_Annual);
                }
                xValues.push(json[i].Year);
            }
            if (sum <= 0) {
                var chartArea = document.getElementById('layout-main-below-left-chart-area');
                var text = document.createElement('div');
                text.className = "no-data-text";
                text.innerHTML = "Total Supply Annual Does Not Exist In This Area";
                chartArea.appendChild(text);
            } else {
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, data1, data2, data3],
                        type: 'bar',
                        groups: [['Allocation', 'Imported Water Supply', 'Resolution Credit']],
                        order: 'desc', 
                        colors: {
                            "Allocation": 'rgba(148,170,188,1)',
                            "Imported Water Supply": 'rgba(55,115,144,1)',
                            "Resolution Credit": 'rgba(0,72,95,1)'
                        }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                     legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
                });
            }
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    // */
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawStreamflowBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Streamflow'];
    var data2 = ['Canal discharge'];
    var yValues = ['Streamflow Annual'];
    var xValues = ['x'];
    var sum = 0;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    yValues.push(json[i].StreamflowAF_Annual);
                    sum += Number(json[i].StreamflowAF_Annual);
                    data1.push(json[i].StreamflowAF_Annual);
                    data2.push(json[i].CanalFlowAF_Annual);
                }
                xValues.push(json[i].Year);
            }
            if (sum == 0) {
                var chartArea = document.getElementById('layout-main-below-left-chart-area');
                var text = document.createElement('div');
                text.className = "no-data-text";
                text.innerHTML = "Streamflow Annual Does Not Exist In This Area";
                chartArea.appendChild(text);
            } else {
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        // columns: [xValues, yValues],
                        columns: [xValues, data1, data2],
                        type: 'bar',
                        groups: [['Streamflow', 'Canal discharge']],
                        order: 'desc',
                        colors: { 
                            "Streamflow Annual": 'rgba(53,133,155,1)',
                            "Canal discharge": 'rgba(53,133,0,1)'
                        }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    
                    transition: { duration: 1 },
                    legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
                });
            }
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawTotalSWDBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var yValues = ['Surface Water Demand Annual'];
    var xValues = ['x'];
    var sum = 0;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    yValues.push(json[i].SWDemandTotal_Annual);
                    sum += Number(json[i].SWDemandTotal_Annual);
                }
                xValues.push(json[i].Year);
            }
            if (sum == 0) {
                var chartArea = document.getElementById('layout-main-below-left-chart-area');
                var text = document.createElement('div');
                text.className = "no-data-text";
                text.innerHTML = "Surface Water Demand Annual Does Not Exist In This Area";
                chartArea.appendChild(text);
            } else {
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, yValues],
                        type: 'bar',
                        colors: { "Surface Water Demand Annual": 'rgba(222,208,236,1)' }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: { show: false }
                });
            }
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawTotalGWDBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var yValues = ['Groundwater Demand Annual'];
    var xValues = ['x'];
    var sum = 0;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    yValues.push(json[i].GWCTotal_Annual);
                    sum += Number(json[i].GWCTotal_Annual);
                }
                xValues.push(json[i].Year);
            }
            if (sum == 0) {
                var chartArea = document.getElementById('layout-main-below-left-chart-area');
                var text = document.createElement('div');
                text.className = "no-data-text";
                text.innerHTML = "Groundwater Demand Annual Does Not Exist In This Area";
                chartArea.appendChild(text);
            } else {
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, yValues],
                        type: 'bar',
                        colors: { "Groundwater Demand Annual": 'rgba(192,170,203,1)' }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: { show: false }
                });
            }
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawSWDBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var yValues = ['Surface Water Consumption'];
    var xValues = ['x'];
    var sum = 0;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    yValues.push(json[i].SWDTotal_Annual);
                    sum += Number(json[i].SWDTotal_Annual);
                }
                if (j == 1) {
                    yValues.push(json[i].SWDTotal_Peak);
                    sum += Number(json[i].SWDTotal_Peak);
                }
                if (j == 2) {
                    yValues.push(json[i].SWDTotal_NonPeak);
                    sum += Number(json[i].SWDTotal_NonPeak);
                }
                xValues.push(json[i].Year);
            }
            if (sum == 0) {
                var chartArea = document.getElementById('layout-main-below-left-chart-area');
                var text = document.createElement('div');
                text.className = "no-data-text";
                text.innerHTML = "Surface Water Consumption Does Not Exist In This Area";
                chartArea.appendChild(text);
            } else {
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, yValues],
                        type: 'bar',
                        colors: { "Surface Water Consumption": 'rgba(155,213,240,1)' }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: { show: false }
                });
            }
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawTotalGWDStackedBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Irrigation'];
    var data2 = ['Municipal'];
    var data3 = ['Industrial'];
    var xValues = ['x'];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    data1.push(json[i].GWCIrrigation_Annual);
                    data2.push(json[i].GWCMunicipal_Annual);
                    data3.push(json[i].GWCIndustrial_Annual);
                }
                if (j == 1) {
                    data1.push(json[i].GWCIrrigation_Peak);
                    data2.push(json[i].GWCMunicipal_Peak);
                    data3.push(json[i].GWCIndustrial_Peak);
                }
                if (j == 2) {
                    data1.push(json[i].GWCIrrigation_NonPeak);
                    data2.push(json[i].GWCMunicipal_NonPeak);
                    data3.push(json[i].GWCIndustrial_NonPeak);
                }
                xValues.push(json[i].Year);
            }
            var chart = c3.generate({
                bindto: '#layout-main-below-left-chart-area',
                size: { height: 298, width: 859 },
                padding: { top: 5, right: 20, bottom: 5, left: 90 },
                data: {
                    x: 'x',
                    columns: [xValues, data1, data2, data3],
                    type: 'bar',
                    groups: [['Irrigation', 'Municipal', 'Industrial']],
                    order: 'desc', 
                    colors: { "Irrigation": '#C8CFA3', "Municipal": '#D1BE94', "Industrial": '#CCCBA2' }
                },
                axis: {
                    x: {
                        label: {
                            text: 'Year',
                            position: 'outer-left'
                        }
                    },
                    y: {
                        label: {
                            text: 'Acre-Feet',
                            position: 'outer-middle'
                        },
                        tick: {
                            format: d3.format(",")
                        }
                    }
                },
                bar: {
                    width: { ratio: 0.75 }
                },
                transition: { duration: 1 },
                 legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            });
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawTotalLongTermDemandStackedBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Total Surface Water'];
    var data2 = ['Total Groundwater'];
    var data3 = ['Total Non-consumptive Demand'];
    var data4 = ['Net Surface Water Loss'];
    var xValues = ['x'];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    data1.push(json[i].SWDemandTotal_Annual);
                    data2.push(json[i].GWCTotal_Annual);
                    data3.push(json[i].TotalNonConsumptiveUse_Annual);
                    data4.push(json[i].NetSurfaceWaterLoss_Annual);
                }
                if (j == 1) {
                    data1.push(json[i].SWDemandTotal_Peak);
                    data2.push(json[i].GWCTotal_Peak);
                    data3.push(json[i].TotalNonConsumptiveUse_Peak);
                    data4.push(json[i].NetSurfaceWaterLoss_Peak);
                }
                if (j == 2) {
                    data1.push(json[i].SWDemandTotal_NonPeak);
                    data2.push(json[i].GWCTotal_NonPeak);
                    data3.push(json[i].TotalNonConsumptiveUse_NonPeak);
                    data4.push(json[i].NetSurfaceWaterLoss_NonPeak);
                }
                xValues.push(json[i].Year);
            }
            var chart = c3.generate({
                bindto: '#layout-main-below-left-chart-area',
                size: { height: 298, width: 859 }, 
                padding: { top: 5, right: 20, bottom: 5, left: 90 },
                data: {
                    x: 'x',
                    columns: [xValues, data1, data2, data3, data4],
                    type: 'bar',
                    groups: [['Total Non-consumptive Demand','Total Groundwater','Total Surface Water','Net Surface Water Loss']],
                    order: null, 
                    colors: {
                        "Total Surface Water": 'rgba(139,143,38,1)',
                        "Total Groundwater": 'rgba(199,201,90,1)',
                        "Total Non-consumptive Demand": 'rgba(255,200,67,1)',
                        "Net Surface Water Loss": 'rgba(255,219,143,1)'
                    }
                },
                axis: {
                    x: {
                        label: {
                            text: 'Year',
                            position: 'outer-left'
                        }
                    },
                    y: {
                        label: {
                            text: 'Acre-Feet',
                            position: 'outer-middle'
                        },
                        tick: {
                            format: d3.format(",")
                        }
                    }
                },
                bar: {
                    width: { ratio: 0.75 }
                },
                transition: { duration: 1 },
                legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            });
            
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawTotalDemandStackedBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Total Groundwater Depletion'];
    var data2 = ['Total Surface Water'];
    var xValues = ['x'];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    data1.push(json[i].GWDP_Annual);
                    data2.push(json[i].SWDTotal_Annual);
                }
                xValues.push(json[i].Year);
            }
            var chart = c3.generate({
                bindto: '#layout-main-below-left-chart-area',
                size: { height: 298, width: 859 },
                padding: { top: 5, right: 20, bottom: 5, left: 90 },
                data: {
                    x: 'x',
                    columns: [xValues, data1, data2],
                    type: 'bar',
                    groups: [['Total Groundwater Depletion', 'Total Surface Water']],
                    order: 'desc', 
                    colors: {
                        "Total Groundwater Depletion": 'rgba(255,219,143,1)',
                        "Total Surface Water": 'rgba(139,143,38,1)'
                    }
                },
                axis: {
                    x: {
                        label: {
                            text: 'Year',
                            position: 'outer-left'
                        }
                    },
                    y: {
                        label: {
                            text: 'Acre-Feet',
                            position: 'outer-middle'
                        },
                        tick: {
                            format: d3.format(",")
                        }
                    }
                },
                bar: {
                    width: { ratio: 0.75 }
                },
                transition: { duration: 1 },
                 legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            });

            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawTotalNonConsumptionDemandCombinationChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Hydropower'];
    var data2 = ['Proportionate Downstream'];
    var data3 = ['Instream Flow'];
    var data4 = ['Induced Recharge'];
    var data5 = ['Total Non-consumptive Demand'];
    var xValues = ['x'];
    var sum = 0;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    data1.push(json[i].Hydropower_Annual);
                    data2.push(json[i].BasinOutflows_Annual);
                    data3.push(json[i].InstreamFlow_Annual);
                    data4.push(json[i].InducedGWRecharge_Annual);
                    data5.push(json[i].TotalNonConsumptiveUse_Annual);

                    sum += Number(json[i].Hydropower_Annual);
                    sum += Number(json[i].BasinOutflows_Annual);
                    sum += Number(json[i].InstreamFlow_Annual);
                    sum += Number(json[i].InducedGWRecharge_Annual);
                    sum += Number(json[i].TotalNonConsumptiveUse_Annual);
                }
                if (j == 1) {
                    data1.push(json[i].Hydropower_Peak);
                    data2.push(json[i].BasinOutflows_Peak);
                    data3.push(json[i].InstreamFlow_Peak);
                    data4.push(json[i].InducedGWRecharge_Peak);
                    data5.push(json[i].TotalNonConsumptiveUse_Peak);

                 
                    sum += Number(json[i].Hydropower_Peak);
                    sum += Number(json[i].BasinOutflows_Peak);
                    sum += Number(json[i].InstreamFlow_Peak);
                    sum += Number(json[i].InducedGWRecharge_Peak);
                    sum += Number(json[i].TotalNonConsumptiveUse_Peak);
                }
                if (j == 2) {
                    data1.push(json[i].Hydropower_NonPeak);
                    data2.push(json[i].BasinOutflows_NonPeak);
                    data3.push(json[i].InstreamFlow_NonPeak);
                    data4.push(json[i].InducedGWRecharge_NonPeak);
                    data5.push(json[i].TotalNonConsumptiveUse_NonPeak);

                    sum += Number(json[i].Hydropower_NonPeak);
                    sum += Number(json[i].BasinOutflows_NonPeak);
                    sum += Number(json[i].InstreamFlow_NonPeak);
                    sum += Number(json[i].InducedGWRecharge_NonPeak);
                    sum += Number(json[i].TotalNonConsumptiveUse_NonPeak);
                }
                xValues.push(json[i].Year);
            }
            if (sum == 0) {
                var chartArea = document.getElementById('layout-main-below-left-chart-area');
                var text = document.createElement('div');
                text.className = "no-data-text";
                text.innerHTML = "Total Non-consumptive Demand Does Not Exist In This Area";
                chartArea.appendChild(text);
            } else {
                var chart = c3.generate({
                    bindto: '#layout-main-below-left-chart-area',
                    size: { height: 298, width: 859 },
                    padding: { top: 5, right: 20, bottom: 5, left: 90 },
                    data: {
                        x: 'x',
                        columns: [xValues, data1, data2, data3, data4, data5],
                        type: 'bar',
                        types: { "Total Non-consumptive Demand": 'step' },
                        order: 'desc', 
                        colors: {
                            "Hydropower": 'rgba(79,129,190,1)',
                            "Proportionate Downstream": 'rgba(193,80,77,1)',
                            "Instream Flow": 'rgba(156,188,89,1)',
                            "Induced Recharge": 'rgba(128,100,163,1)',
                            "Total Non-consumptive Demand": 'rgba(0,0,0,1)'
                        }
                    },
                    axis: {
                        x: {
                            label: {
                                text: 'Year',
                                position: 'outer-left'
                            }
                        },
                        y: {
                            label: {
                                text: 'Acre-Feet',
                                position: 'outer-middle'
                            },
                            tick: {
                                format: d3.format(",")
                            }
                        }
                    },
                    bar: {
                        width: { ratio: 0.75 }
                    },
                    transition: { duration: 1 },
                    legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
                });
            }

            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function drawTotalSWDStackedBarChart(string, j, n) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var url = string + n;
    var xmlhttp = new XMLHttpRequest();
    var data1 = ['Surface Water Demand'];
    var data2 = ['Surface Water Evaporation'];
    var xValues = ['x'];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (j == 0) {
                    data1.push(json[i].SWDemand_Annual);
                    data2.push(json[i].SWDEvaporation_Annual);
                }
                if (j == 1) {
                    data1.push(json[i].SWDemand_Peak);
                    data2.push(json[i].SWDEvaporation_Peak);
                }
                if (j == 2) {
                    data1.push(json[i].SWDemand_NonPeak);
                    data2.push(json[i].SWDEvaporation_NonPeak);
                }
                xValues.push(json[i].Year);
            }
            var chart = c3.generate({
                bindto: '#layout-main-below-left-chart-area',
                size: { height: 298, width: 859 },
                padding: { top: 5, right: 20, bottom: 5, left: 90 },
                data: {
                    x: 'x',
                    columns: [xValues, data1, data2],
                    type: 'bar',
                    groups: [['Surface Water Demand', 'Surface Water Evaporation']],
                    order: 'desc', 
                    colors: { "Surface Water Demand": '#D1BE94', "Surface Water Evaporation": '#C8CFA3' }
                },
                axis: {
                    x: {
                        label: {
                            text: 'Year',
                            position: 'outer-left'
                        }
                    },
                    y: {
                        label: {
                            text: 'Acre-Feet',
                            position: 'outer-middle'
                        },
                        tick: {
                            format: d3.format(",")
                        }
                    }
                },
                bar: {
                    width: { ratio: 0.75 }
                },
                transition: { duration: 1 },
                legend: {
                    show: true,
                    item: {
                        tile: {
                            width: 20,
                            height: 20
                        }
                    }
                }
            });
            loadingBar.style.marginLeft = '388px';
            loadingBar.style.visibility = 'hidden';
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


