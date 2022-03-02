/*
functions in this file are used for constructing the main page.
*/

var IWMBasemapLayerUrl = "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer";
var satelliteLayerUrl ="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer";

var glanceTable1 = ["Basin", "Approximate Area", "Basin Water Supply", "Near Term Water Demand", "Long Term Water Demand", "Projected Water Demand", "Number of Irrigated Acres"];
var glanceTable2 = [];
var glanceTable3 = ["Basin", "Approximate Area", "Basin Water Supply", "Total Demand", "Number of Irrigated Acres"];
var averageTableX = ["&nbsp;", "Surface Water", "Groundwater"];
var averageTableY2 = ["Irrigation", "Municipal and Industrial", "Streamflow Augmentation"];
var averageTableY = ["Irrigation", "Municipal", "Industry"];
var averageTableData = [];
var highLightOutlineColor = [0, 0, 255, 0.7];
var highLightOutlineWeight = 2;
var highLightFillColor = [0, 0, 255, 0.35];
var labelColorNavy = "rgba(31,79,120,1)";

var m_switch = 2;
var m_subSwitch = 2;
var m_currentNaviTabId = 0;
var styleTabActive = "padding-top: 7px; color: rgba(0,0,0,1); background-color: rgba(161,175,183,1); border-top: 6px solid rgba(0,0,0,0.5);";

// for basin
// for state summary chart
var basinNaviButton = ["Big Blue",				// 0
					   "Elkhorn",				// 1
					   "Little Blue",			// 2
					   "Loup",				    // 3
					   "Lower Platte",			// 4
					   "Missouri Tributaries",	// 5
                       "Niobrara",              // 6
                       "Upper Platte"];			// 8

// for homepage top-right corner navigation links
var basinNaviButtonTmp = ["Big Blue",			  // 0
						  "Elkhorn",			  // 1
						  "Little Blue",		  // 2
						  "Loup",				  // 3
						  "Lower Platte",		  // 4
						  "Missouri Tributaries", // 5
						  "Niobrara",			  // 6
						  "Republican",			  // 7
						  "Upper Platte"];		      // 8

// for subbasin
var subbasinNaviButton = ["Bazile Creek",									// 0
						  "Big Blue River", 								// 1
						  "Elkhorn River Above Norfolk", 					// 2
						  "Elkhorn River Norfolk to Waterloo", 			    // 3
						  "Little Blue River", 								// 4
						  "Lower Loup River", 								// 5
						  "Lower Platte River Above North Bend", 			// 6
						  "Lower Platte River North Bend to Louisville",	// 7
					      "Middle Loup River", 								// 8
						  "Niobrara River Above Box Butte", 				// 9
						  "Niobrara River Box Butte to Gordon", 			// 10
						  "Niobrara River Gordon to Sparks", 				// 11
						  "Niobrara River Sparks to Spencer", 			    // 12
						  "Niobrara River Spencer to Niobrara",			    // 13
						  "North Loup River", 								// 14
						  "South Loup River",								// 15
						//   "Republican",                                     // 16
						//   "Confluence to Odessa",                           // 17
                        "Middle Platte River above Overton",
						  "Middle Platte River Grand Island to Duncan",     // 18
						  "Middle Platte River Odessa to Grand Island",     // 19
						  "North Platte River Above Lewellen",              // 20
						  "North Platte River Lewellen to North Platte",    // 21
						  "South Platte River"];                            // 22

						//   "Lodgepole Creek"];					            // 23

// spatial reference number
var wkIdNumber = 102100; // For ArcGIS 10.0, use 26852; for ArcGIS 10.x+ use 102704.

// if wgs1984 use longlat; if state plane go with feet/*
 				 
var basinCentroid = [[-10849987, 4976681],   // Big Blue
					 [-10849295, 5171554],   // Elkhorn
					 [-10885038, 4902658],   // Little Blue
					 [-11123823, 5124455.5],   // Loup
					 [-10761820, 5028000],   // Lower Platte
					 [-10867539, 5267916],  // Missouri Tributaries
					 [-11277170, 5259611.5],  // Niobrara
                     [-11309296, 4886236],   // Republican
					 [-11426497, 5077253]];   // Upper Platte

                     
// if wgs1984 use longlat; if state plane go with feet
// 12-2021 update the list: removed "Republican" and "Lodgepole Creek"; updated centroid for 602, 1006 etc. 
var subbasinCentroid = [[-10888641, 5247954],       // Bazile Creek  701
						[-10838222, 4962464],    // Big Blue River  101
						[-10983503, 5197597],      // Elkhorn River Above Norfolk 201
						[-10790247, 5153408],     // Elkhorn River Norfolk to Waterloo 202
						[-10909695, 4910700],  // Little Blue River 301
						[-10949082, 5103126],    // Lower Loup River 501
						[-10863277, 5092726],    // Lower Platte River Above North Bend 601
                        [-10753906,	5018189], // Lower Platte River North Bend to Louisville 602
						[-11191627, 5130837],  // Middle Loup River 502
						[-11570210, 5244876],   // Niobrara River Above Box Butte 901
						[-11444266, 5207260],    // Niobrara River Box Butte to Gordon 902
						[-11291384, 5271927], // Niobrara River Gordon to Sparks 903
						[-11119612, 5286081],  // Niobrara River Sparks to Spencer 904
						[-10951725, 5246586], // Niobrara River Spencer to Niobrara 905
						[-11112385, 5170624],  // North Loup River 503
						[-11072425, 5045539],      // South Loup River 504 
						[-11170979, 5022679],          // Middle Platte River above Overton 1001
						[-10952001, 5007424],          // Middle Platte River Grand Island to Duncan 1002
						[-11045258, 4956045],          // Middle Platte River Overton/Odessa to Grand Island 1003
						[-11556341, 5130358],           // North Platte River Above Lewellen 1004
						[-11304486, 5071536],          // North Platte River Lewellen to North Platte 1005
						[-11488642,	4954570]        // South Platte River 1006
                        ];


var basinFeatures=[];
var GraphicsLayerClass;
var GraphicClass;
var PolygonClass;
      
// for state
var stateTabLabel = ["Supply", "Demand", "Nature & Extent of Use"];
// for basin
var basinTabLabel = ["Basin Overview", "Big Picture", "Supply", "Streamflow", "Demand", "Nature & Extent of Use", "Balance"];
// for subbasin
var subbasinTabLabel = ["Big Picture", "Supply", "Streamflow", "Demand", "Nature & Extent of Use", "Balance"];

// chart labels
var chartLabel = ["Chart", "Season", "Time Frame"];
var season = ["Annual", "June - August", "September - May"];
var frame = ["Near-Term", "Long-Term", "Projected"];

// for state
var stateTab01 = ["Precipitation Rates and Volumes by Basin", "Average Basin Water Supply"];
var stateTab02 = ["Average Total Demand"];
var stateTab03 = ["Demand by Category", "Irrigated Acres"];

// for basin
var repubBigTitle = ["Precipitation Rates and Volumes"];
var repubSupplyTitle = ["Total Supply"];
var repubDemandTitle = ["Total Demand"];

var basinTab02 = ["Precipitation Rates and Volumes", "Precipitation Distribution", "Average Precipitation Distribution"];
var basinTab03 = ["Basin Water Supply", "Streamflow", "Surface Water Consumption", "Groundwater Depletion", "Required Inflow"];
var basinTab04 = ["Streamflow"];
var basinTab05 = ["Total Demand", "Total Surface Water Demand", "Total Groundwater Demand", "Total Non-consumptive Demand", "Net Surface Water Loss"];
var basinTab06 = ["Average Total Demand by Category", "Irrigated Acres"];
var basinTab06_rep = ["Average Total Demand by Category", "Surface Water and Comingled"];

// for subbasin
var subbasinTab01 = basinTab02;
var subbasinTab02 = basinTab03;
var subbasinTab03 = basinTab05;
var subbasinTab04 = basinTab06;

// check current active tab
var activeTabId;

// when balance button clicked
var balanceFlag = 0;
var tmpId = 0;

// for state, basin, and subbasin levels
var stateTabFlag = 0;

var basinLabels;
var basinClicked = 0;
var basinId = 0;
var basinName;
var basinTabFlag = 0;
var overviewFlag = 0;

var subbasinLoaded = 0;
var subbasinClicked = 0;
var subbasinId = 0;
var subbasinName;
var subbasinTabFlag = 0;

// for chart
var belowLabelsFlag = 0;
var belowLayoutFlag = 0;
var leftRangeId = 0;
var rightRangeId = 0;

var dataAvailability =1;

// nearest distance
var distance = 0;

// check current level
var levelFlag = 0;
var levelState;

// variables for map
var map;
var highLightSymbol;
var labelsLayer;
var basinLayer;
var basinLineLayer;
var subbasinLayer;
var IWMBasemapLayer;
var params;
var satelliteLayer;
var mapBasemapToggleFlag = 0;
var AvgET = 0;
var AvgRunoff = 0;
var AvgRecharge = 0;
var divisionId = 0;

// assign first string of tab <div> element id at here
var naviTabLevelId = ["state", "basin", "subbasin"];

// variables for CSV generator
var csvTmpId = 0;

var basinArea, basinWaterSupply, nearDemand, longDemand, projectedDemand, irrigatedAcres;
var SWDIrrigat, SWDMunicip, SWDIndustr, GWCIrrigat, GWCMunicip, GWCIndustr;

// streamflow tab
var streamflowTab;

function disableStreamflowTab() {
	streamflowTab.style.display = "none";
}

function enableStreamflowTab() {
	streamflowTab.style.display = "inline";
}

function resetRanges() {
    leftRangeId = 0;
    rightRangeId = 0;
}

function clearChartSelections() {
    var initChartLeftDrop = document.getElementById('below-drop-left');
    if (initChartLeftDrop.innerHTML != "") {
        initChartLeftDrop.innerHTML = "";
    }
    var initChartRightDrop = document.getElementById('below-drop-right');
    if (initChartRightDrop.innerHTML != "") {
        initChartRightDrop.innerHTML = "";
    }
}
function clearLeftChartSelections() {
    var initChartLeftDrop = document.getElementById('below-drop-left');
    if (initChartLeftDrop.innerHTML != "") {
        initChartLeftDrop.innerHTML = "";
    }
}
function clearRightChartSelection() {
    var initChartRightDrop = document.getElementById('below-drop-right');
    if (initChartRightDrop.innerHTML != "") {
        initChartRightDrop.innerHTML = "";
    }
}


function chartDropListListener() {
    var chartLeftArrow = document.getElementById('left-arrow');
    var chartLeftSelection = document.getElementById('below-drop-left');
    chartLeftArrow.addEventListener("mouseover", function () {
        chartLeftSelection.style.visibility = 'visible';
    });
    chartLeftSelection.addEventListener("mouseover", function () {
        chartLeftSelection.style.visibility = 'visible';
    });
    chartLeftSelection.addEventListener("mouseout", function () {
        chartLeftSelection.style.visibility = 'hidden';
    });
    var chartRightArrow = document.getElementById('right-arrow');
    var chartRightSelection = document.getElementById('below-drop-right');
    chartRightArrow.addEventListener("mouseover", function () {
        chartRightSelection.style.visibility = 'visible';
    });
    chartRightSelection.addEventListener("mouseover", function () {
        chartRightSelection.style.visibility = 'visible';
    });
    chartRightSelection.addEventListener("mouseout", function () {
        chartRightSelection.style.visibility = 'hidden';
    });
}

function clearBelowRightContent() {
    var belowRightTitle = document.getElementById('layout-main-below-right-paragraph-title');
    var belowRightTextArea = document.getElementById('layout-main-below-right-paragraph-textarea');
    belowRightTitle.innerHTML = "";
    belowRightTextArea.innerHTML = "";
    var belowRightName = document.getElementById('layout-main-below-right-region-name');
    if (belowRightName) {
        belowRightName.innerHTML = "";
    }
}
//BelowRight is the description text besides the chart
function rebuildBeginningBelowRight() {
    var initBelowRight = document.getElementById('layout-main-below-right-paragraph');
    initBelowRight.innerHTML = "";
    var initBelowRightTitle = document.createElement('div');
    initBelowRightTitle.id = "layout-main-below-right-paragraph-title";
    initBelowRight.appendChild(initBelowRightTitle);
    var initBelowRightTextArea = document.createElement('div');
    initBelowRightTextArea.id = "layout-main-below-right-paragraph-textarea";
    initBelowRight.appendChild(initBelowRightTextArea);
}

function resetLeftLabel() {
    var restoreLeftLabel = document.getElementById('left-label');
    restoreLeftLabel.innerHTML = chartLabel[0] + ":";
}
function resetRightLabel() {
    var restoreRightLabel = document.getElementById('right-label');
    restoreRightLabel.innerHTML = chartLabel[1] + ":";
}
/*
Combine the components in the chart area
*/
function regenerateChartArea() {
    var restoreBelowLeft = document.getElementById('layout-main-below-left-chart');
    var restoreDropLeft = document.createElement('div');
    restoreDropLeft.id = "below-drop-left";
    restoreDropLeft.className = "layout-main-below-drop-left";
    restoreBelowLeft.appendChild(restoreDropLeft);
    var restoreDropRight = document.createElement('div');
    restoreDropRight.id = "below-drop-right";
    restoreDropRight.className = "layout-main-below-drop-right";
    restoreBelowLeft.appendChild(restoreDropRight);
    var restoreChartNavi = document.createElement('div');
    restoreChartNavi.id = "layout-main-below-left-chart-navigation";
    restoreBelowLeft.appendChild(restoreChartNavi);
    var restoreNaviLeft = document.createElement('div');
    restoreNaviLeft.id = "layout-main-below-left-chart-navi-left";
    restoreChartNavi.appendChild(restoreNaviLeft);
    var restoreNaviRight = document.createElement('div');
    restoreNaviRight.id = "layout-main-below-left-chart-navi-right";
    restoreChartNavi.appendChild(restoreNaviRight);
    var restoreNaviStart = document.createElement('div');
    restoreNaviStart.id = "layout-main-below-left-chart-start";
    restoreNaviRight.appendChild(restoreNaviStart);
    var restoreSelectChart = document.createElement('div');
    restoreSelectChart.id = "layout-main-below-left-chart-select-chart";
    restoreNaviRight.appendChild(restoreSelectChart);
    var restoreLeftLabel = document.createElement('div');
    restoreLeftLabel.id = "left-label";
    restoreLeftLabel.className = "layout-main-below-select-chart-label";
    restoreLeftLabel.innerHTML = chartLabel[0] + ":";
    restoreSelectChart.appendChild(restoreLeftLabel);
    var restoreLeftRange = document.createElement('div');
    restoreLeftRange.id = "left-range";
    restoreLeftRange.className = "layout-main-below-select-chart-title";
    restoreSelectChart.appendChild(restoreLeftRange);
    var restoreLeftArrow = document.createElement('div');
    restoreLeftArrow.id = "left-arrow";
    restoreLeftArrow.className = "layout-main-below-select-chart-arrow";
    restoreSelectChart.appendChild(restoreLeftArrow);
    var restoreLeftArrowLink = document.createElement('a');
    restoreLeftArrowLink.setAttribute("href", "javascript:;");
    restoreLeftArrow.appendChild(restoreLeftArrowLink);
    var restoreSelectSeason = document.createElement('div');
    restoreSelectSeason.id = "layout-main-below-left-chart-select-season";
    restoreNaviRight.appendChild(restoreSelectSeason);
    var restoreRightLabel = document.createElement('div');
    restoreRightLabel.id = "right-label";
    restoreRightLabel.className = "layout-main-below-select-chart-label";
    restoreRightLabel.innerHTML = chartLabel[1] + ":";
    restoreSelectSeason.appendChild(restoreRightLabel);
    var restoreRightRange = document.createElement('div');
    restoreRightRange.id = "right-range";
    restoreRightRange.className = "layout-main-below-select-chart-title";
    restoreSelectSeason.appendChild(restoreRightRange);
    var restoreRightArrow = document.createElement('div');
    restoreRightArrow.id = "right-arrow";
    restoreRightArrow.className = "layout-main-below-select-chart-arrow";
    restoreSelectSeason.appendChild(restoreRightArrow);
    var restoreRightArrowLink = document.createElement('a');
    restoreRightArrowLink.setAttribute("href", "javascript:;");
    restoreRightArrow.appendChild(restoreRightArrowLink);
    var restoreChartEnd = document.createElement('div');
    restoreChartEnd.id = "layout-main-below-left-chart-end";
    restoreNaviRight.appendChild(restoreChartEnd);
    var restoreChartArea = document.createElement('div');
    restoreChartArea.id = "layout-main-below-left-chart-area";
    restoreChartNavi.appendChild(restoreChartArea);
    regeneratePortalButtons();  //download button
}

function addMultiPieChartsLayout() {
    var mainArea = document.getElementById('layout-main-below-left-chart-area');
    if (levelState == naviTabLevelId[0]) {
        var chartsContainer = document.createElement('div');
        chartsContainer.id = "multi-pie-charts-container";
        mainArea.appendChild(chartsContainer);
        var chartsFixed = document.createElement('div');
        chartsFixed.id = "multi-pie-charts-fixed";
        chartsContainer.appendChild(chartsFixed);
        for (var i = 0; i < basinNaviButton.length; i++) {
            var Chart = document.createElement('div');
            Chart.id = naviTabLevelId[0] + "-pie-chart-" + i;
            Chart.className = naviTabLevelId[0] + "-multi-pie-chart-area";
            chartsFixed.appendChild(Chart);
        }
    } else {
        for (var i = 0; i < 3; i++) {
            var Chart = document.createElement('div');
            Chart.id = naviTabLevelId[1] + "-" + naviTabLevelId[2] + "-pie-chart-" + i;
            Chart.className = naviTabLevelId[1] + "-" + naviTabLevelId[2] + "-multi-pie-chart-area";
            mainArea.appendChild(Chart);
        }
    }
}
/*
The left dropping menu in the chart area
*/
function setLeftArrows() {
    document.getElementById('left-arrow').style.visibility = 'visible';
    document.getElementById('below-drop-left').style.visibility = 'hidden';
    document.getElementById('below-drop-right').style.visibility = 'hidden';
}
/*
The right dropping menu in the chart area
*/
function setRightArrows() {
    document.getElementById('right-arrow').style.visibility = 'visible';
    document.getElementById('below-drop-left').style.visibility = 'hidden';
    document.getElementById('below-drop-right').style.visibility = 'hidden';
}

function changeBelowLeftLabelRangeArrow() {
	if (basinTabFlag == 1) {
		document.getElementById('left-range').innerHTML = repubBigTitle[0]; // change big picture title
		document.getElementById('left-arrow').style.visibility = "hidden";
		document.getElementById('right-arrow').style.visibility = "hidden";
	}
	if (basinTabFlag == 2) {
		document.getElementById('left-range').innerHTML = repubSupplyTitle[0]; // change supply title
		document.getElementById('left-arrow').style.visibility = "hidden";
		document.getElementById('right-arrow').style.visibility = "hidden";
		document.getElementById('right-arrow').style.visibility = "hidden";
	}
	if (basinTabFlag == 4) {
		document.getElementById('left-range').innerHTML = repubDemandTitle[0]; // change demand title
		document.getElementById('left-arrow').style.visibility = "hidden";
	}
	if (basinTabFlag == 6) {
		document.getElementById('left-arrow').style.visibility = "hidden";
	}
}

// for subbasin, change below left label range arrow
function changeSubbasinBelowLeftLabelRangeArrow() {
	if (subbasinTabFlag == 0) {
		document.getElementById('left-range').innerHTML = repubBigTitle[0]; // change big picture title
		document.getElementById('left-arrow').style.visibility = "hidden";
		document.getElementById('right-arrow').style.visibility = "hidden";
	}
	if (subbasinTabFlag == 1) {
		document.getElementById('left-range').innerHTML = repubSupplyTitle[0]; // change supply title
		document.getElementById('left-arrow').style.visibility = "hidden";
		document.getElementById('right-arrow').style.visibility = "hidden";
		document.getElementById('right-arrow').style.visibility = "hidden";
	}
	if (subbasinTabFlag == 3) {
		document.getElementById('left-range').innerHTML = repubDemandTitle[0]; // change demand title
		document.getElementById('left-arrow').style.visibility = "hidden";
	}
	if (subbasinTabFlag == 5) {
		document.getElementById('left-arrow').style.visibility = "hidden";
	}
}

function restoreBelowLeftLabelRangeArrow() {
	if (basinTabFlag == 1) {
		document.getElementById('left-range').innerHTML = basinTab02[0]; // change big picture title
		document.getElementById('left-arrow').style.visibility = "visible";
		document.getElementById('right-arrow').style.visibility = "visible";
	}
	if (basinTabFlag == 2) {
		document.getElementById('left-range').innerHTML = basinTab03[0]; // change supply title
		document.getElementById('left-arrow').style.visibility = "visible";
		document.getElementById('right-arrow').style.visibility = "visible";
		document.getElementById('right-arrow').style.visibility = "visible";
	}
	if (basinTabFlag == 4) {
		document.getElementById('left-range').innerHTML = basinTab05[0]; // change demand title
		document.getElementById('left-arrow').style.visibility = "visible";
	}
	if (basinTabFlag == 6) {
		document.getElementById('left-arrow').style.visibility = "visible";
	}
}

function restoreSubbasinBelowLeftLabelRangeArrow() {
	if (subbasinTabFlag == 0) {
		document.getElementById('left-range').innerHTML = basinTab02[0]; // change big picture title
		document.getElementById('left-arrow').style.visibility = "visible";
	}
	if (subbasinTabFlag == 1) {
		document.getElementById('left-range').innerHTML = basinTab03[0]; // change supply title
		document.getElementById('left-arrow').style.visibility = "visible";
	}
	if (subbasinTabFlag == 3) {
		document.getElementById('left-range').innerHTML = basinTab05[0]; // change demand title
		document.getElementById('left-arrow').style.visibility = "visible";
	}
	if (subbasinTabFlag == 5) {
		document.getElementById('left-arrow').style.visibility = "visible";
	}
}

function hideBelowRightLabelRangeArrow() {
    document.getElementById('right-label').style.visibility = "hidden";
    document.getElementById('right-range').style.visibility = "hidden";
    document.getElementById('right-arrow').style.visibility = "hidden";
}
function showBelowRightLabelRangeArrow() {
    document.getElementById('right-label').style.visibility = "visible";
    document.getElementById('right-range').style.visibility = "visible";
    document.getElementById('right-arrow').style.visibility = "visible";
}
/*
Create the summary table for the basins (except Republican)
*/
function renderOverview() {
    overviewFlag = 1;
    var belowLeftChart = document.getElementById('layout-main-below-left-chart');
    var glance = document.createElement('div');
    glance.id = "layout-main-below-left-chart-at-glance";
    glance.innerHTML = "At a Glance";
    belowLeftChart.appendChild(glance);
    var glanceContent = document.createElement('div');
    glanceContent.id = "layout-main-below-left-chart-at-glance-content";
    belowLeftChart.appendChild(glanceContent);
    var glanceTableContainer = document.createElement('div');
    glanceTableContainer.id = "glance-table-container";
    glanceContent.appendChild(glanceTableContainer);
    var glanceTableAverage = document.createElement('div');
    glanceTableAverage.id = "glance-table-average";
    glanceTableAverage.innerHTML = "Average Consumption by Sector (Acre-Feet)";
    glanceContent.appendChild(glanceTableAverage);
    var glanceTableRow = document.createElement('div');
    glanceTableRow.className = "glance-table-row";
    glanceTableContainer.appendChild(glanceTableRow);
    var glanceTableLeft = document.createElement('div');
    glanceTableLeft.className = "glance-table-left";
    glanceTableRow.appendChild(glanceTableLeft);
    for (var i = 0; i < glanceTable1.length; i++) {
        var leftCell = document.createElement('div');
        leftCell.id = "GL" + i;
        leftCell.className = "glance-table-left-cell";
        leftCell.innerHTML = glanceTable1[i] + ":";
        glanceTableLeft.appendChild(leftCell);
    }
    var glanceTableRight = document.createElement('div');
    glanceTableRight.className = "glance-table-right";
    glanceTableRow.appendChild(glanceTableRight);
    for (var i = 0; i < glanceTable1.length; i++) {
        var rightCell = document.createElement('div');
        rightCell.id = "GR" + i;
        rightCell.className = "glance-table-right-cell";
        rightCell.innerHTML = "&nbsp;";
        glanceTableRight.appendChild(rightCell);
    }
    var glanceTableAverageContainer1 = document.createElement('div');
    glanceTableAverageContainer1.id = "glance-table-average-container";
    glanceContent.appendChild(glanceTableAverageContainer1);
    var AverageTableRow1 = document.createElement('div');
    AverageTableRow1.className = "glance-table-row";
    glanceTableAverageContainer1.appendChild(AverageTableRow1);
    var AverageTableLeft1 = document.createElement('div');
    AverageTableLeft1.className = "glance-table-left";
    AverageTableRow1.appendChild(AverageTableLeft1);
    var GH0 = document.createElement('div');
    GH0.id = "GH0";
    GH0.className = "glance-table-head";
    GH0.innerHTML = averageTableX[0];
    AverageTableLeft1.appendChild(GH0);
    var AverageTableRight1 = document.createElement('div');
    AverageTableRight1.className = "glance-table-right";
    AverageTableRow1.appendChild(AverageTableRight1);
    var GH1 = document.createElement('div');
    GH1.id = "GH1";
    GH1.className = "glance-table-head-col";
    GH1.innerHTML = averageTableX[1];
    AverageTableRight1.appendChild(GH1);
    var AverageTableRight2 = document.createElement('div');
    AverageTableRight2.className = "glance-table-right";
    AverageTableRow1.appendChild(AverageTableRight2);
    var GH2 = document.createElement('div');
    GH2.id = "GH2";
    GH2.className = "glance-table-head-col";
    GH2.innerHTML = averageTableX[2];
    AverageTableRight2.appendChild(GH2);
    var glanceTableAverageContainer2 = document.createElement('div');
    glanceTableAverageContainer2.id = "glance-table-average-container";
    glanceContent.appendChild(glanceTableAverageContainer2);
    var AverageTableRow2 = document.createElement('div');
    AverageTableRow2.className = "glance-table-row";
    glanceTableAverageContainer2.appendChild(AverageTableRow2);
    var AverageTableLeft2 = document.createElement('div');
    AverageTableLeft2.className = "glance-table-left";
    AverageTableRow2.appendChild(AverageTableLeft2);
    for (var i = 0; i < averageTableY.length; i++) {
        var gtColumnHead = document.createElement('div');
        gtColumnHead.id = "GT" + i;
        gtColumnHead.className = "glance-table-head";
        gtColumnHead.innerHTML = averageTableY[i];
        AverageTableLeft2.appendChild(gtColumnHead);
    }
    var gtColumnRight1 = document.createElement('div');
    gtColumnRight1.className = "glance-table-right";
    for (var i = 3; i < 6; i++) {
        var gtColumn = document.createElement('div');
        gtColumn.id = "GT" + i;
        gtColumn.className = "glance-table-number";
        gtColumn.innerHTML = "&nbsp;";
        gtColumnRight1.appendChild(gtColumn);
    }
    AverageTableRow2.appendChild(gtColumnRight1);
    var gtColumnRight2 = document.createElement('div');
    gtColumnRight2.className = "glance-table-right";
    for (var i = 6; i < 9; i++) {
        var gtColumn = document.createElement('div');
        gtColumn.id = "GT" + i;
        gtColumn.className = "glance-table-percentage";
        gtColumn.innerHTML = "&nbsp;";
        gtColumnRight2.appendChild(gtColumn);
    }
    AverageTableRow2.appendChild(gtColumnRight2);
    var gtColumnRight3 = document.createElement('div');
    gtColumnRight3.className = "glance-table-right";
    for (var i = 9; i < 12; i++) {
        var gtColumn = document.createElement('div');
        gtColumn.id = "GT" + i;
        gtColumn.className = "glance-table-number";
        gtColumn.innerHTML = "&nbsp;";
        gtColumnRight3.appendChild(gtColumn);
    }
    AverageTableRow2.appendChild(gtColumnRight3);
    var gtColumnRight4 = document.createElement('div');
    gtColumnRight4.className = "glance-table-right";
    for (var i = 12; i < 15; i++) {
        var gtColumn = document.createElement('div');
        gtColumn.id = "GT" + i;
        gtColumn.className = "glance-table-percentage";
        gtColumn.innerHTML = "&nbsp;";
        gtColumnRight4.appendChild(gtColumn);
    }
    AverageTableRow2.appendChild(gtColumnRight4);
    var glanceTableFooter = document.createElement('div');
    glanceTableFooter.id = "glance-table-footer";
    glanceContent.appendChild(glanceTableFooter);
    readTextFile(overviewHelp, glanceTableFooter);
}
/*
Create the summary table for Republican
*/
function renderOverview2() {
    overviewFlag = 1;
    var belowLeftChart = document.getElementById('layout-main-below-left-chart');
    var glance = document.createElement('div');
    glance.id = "layout-main-below-left-chart-at-glance";
    glance.innerHTML = "At a Glance";
    belowLeftChart.appendChild(glance);
    var glanceContent = document.createElement('div');
    glanceContent.id = "layout-main-below-left-chart-at-glance-content";
    belowLeftChart.appendChild(glanceContent);
    var glanceTableContainer = document.createElement('div');
    glanceTableContainer.id = "glance-table-container";
    glanceContent.appendChild(glanceTableContainer);
    var glanceTableAverage = document.createElement('div');
    glanceTableAverage.id = "glance-table-average";
    glanceTableAverage.innerHTML = "Average Consumption by Sector (Acre-Feet)";
    glanceContent.appendChild(glanceTableAverage);
    var glanceTableRow = document.createElement('div');
    glanceTableRow.className = "glance-table-row";
    glanceTableContainer.appendChild(glanceTableRow);
    var glanceTableLeft = document.createElement('div');
    glanceTableLeft.className = "glance-table-left";
    glanceTableRow.appendChild(glanceTableLeft);
    for (var i = 0; i < glanceTable3.length; i++) {
        var leftCell = document.createElement('div');
        leftCell.id = "GL" + i;
        leftCell.className = "glance-table-left-cell";
        leftCell.innerHTML = glanceTable3[i] + ":";
        glanceTableLeft.appendChild(leftCell);
    }
    var glanceTableRight = document.createElement('div');
    glanceTableRight.className = "glance-table-right";
    glanceTableRow.appendChild(glanceTableRight);
    for (var i = 0; i < glanceTable3.length; i++) {
        var rightCell = document.createElement('div');
        rightCell.id = "GR" + i;
        rightCell.className = "glance-table-right-cell";
        rightCell.innerHTML = "&nbsp;";
        glanceTableRight.appendChild(rightCell);
    }
    var glanceTableAverageContainer1 = document.createElement('div');
    glanceTableAverageContainer1.id = "glance-table-average-container";
    glanceContent.appendChild(glanceTableAverageContainer1);
    var AverageTableRow1 = document.createElement('div');
    AverageTableRow1.className = "glance-table-row";
    glanceTableAverageContainer1.appendChild(AverageTableRow1);
    var AverageTableLeft1 = document.createElement('div');
    AverageTableLeft1.className = "glance-table-left";
    AverageTableRow1.appendChild(AverageTableLeft1);
    var GH0 = document.createElement('div');
    GH0.id = "GH0";
    GH0.className = "glance-table-head2";
    GH0.innerHTML = averageTableX[0];
    AverageTableLeft1.appendChild(GH0);
    var AverageTableRight1 = document.createElement('div');
    AverageTableRight1.className = "glance-table-right";
    AverageTableRow1.appendChild(AverageTableRight1);
    var GH1 = document.createElement('div');
    GH1.id = "GH1";
    GH1.className = "glance-table-head-col";
    GH1.innerHTML = averageTableX[1];
    AverageTableRight1.appendChild(GH1);
    var AverageTableRight2 = document.createElement('div');
    AverageTableRight2.className = "glance-table-right";
    AverageTableRow1.appendChild(AverageTableRight2);
    var GH2 = document.createElement('div');
    GH2.id = "GH2";
    GH2.className = "glance-table-head-col";
    GH2.innerHTML = averageTableX[2];
    AverageTableRight2.appendChild(GH2);
    var glanceTableAverageContainer2 = document.createElement('div');
    glanceTableAverageContainer2.id = "glance-table-average-container";
    glanceContent.appendChild(glanceTableAverageContainer2);
    var AverageTableRow2 = document.createElement('div');
    AverageTableRow2.className = "glance-table-row";
    glanceTableAverageContainer2.appendChild(AverageTableRow2);
    var AverageTableLeft2 = document.createElement('div');
    AverageTableLeft2.className = "glance-table-left";
    AverageTableRow2.appendChild(AverageTableLeft2);
    for (var i = 0; i < averageTableY2.length; i++) {
        var gtColumnHead = document.createElement('div');
        gtColumnHead.id = "GT" + i;
        gtColumnHead.className = "glance-table-head2";
        gtColumnHead.innerHTML = averageTableY2[i];
        AverageTableLeft2.appendChild(gtColumnHead);
    }
    var gtColumnRight1 = document.createElement('div');
    gtColumnRight1.className = "glance-table-right";
    for (var i = 3; i < 6; i++) {
        var gtColumn = document.createElement('div');
        gtColumn.id = "GT" + i;
        gtColumn.className = "glance-table-number";
        gtColumn.innerHTML = "&nbsp;";
        gtColumnRight1.appendChild(gtColumn);
    }
    AverageTableRow2.appendChild(gtColumnRight1);
    var gtColumnRight2 = document.createElement('div');
    gtColumnRight2.className = "glance-table-right";
    for (var i = 6; i < 9; i++) {
        var gtColumn = document.createElement('div');
        gtColumn.id = "GT" + i;
        gtColumn.className = "glance-table-percentage";
        gtColumn.innerHTML = "&nbsp;";
        gtColumnRight2.appendChild(gtColumn);
    }
    AverageTableRow2.appendChild(gtColumnRight2);
    var gtColumnRight3 = document.createElement('div');
    gtColumnRight3.className = "glance-table-right";
    for (var i = 9; i < 12; i++) {
        var gtColumn = document.createElement('div');
        gtColumn.id = "GT" + i;
        gtColumn.className = "glance-table-number";
        gtColumn.innerHTML = "&nbsp;";
        gtColumnRight3.appendChild(gtColumn);
    }
    AverageTableRow2.appendChild(gtColumnRight3);
    var gtColumnRight4 = document.createElement('div');
    gtColumnRight4.className = "glance-table-right";
    for (var i = 12; i < 15; i++) {
        var gtColumn = document.createElement('div');
        gtColumn.id = "GT" + i;
        gtColumn.className = "glance-table-percentage";
        gtColumn.innerHTML = "&nbsp;";
        gtColumnRight4.appendChild(gtColumn);
    }
    AverageTableRow2.appendChild(gtColumnRight4);
    var glanceTableFooter = document.createElement('div');
    glanceTableFooter.id = "glance-table-footer";
    glanceContent.appendChild(glanceTableFooter);
    readTextFile(overviewHelp, glanceTableFooter);
}

function deleteOverview() {
    var belowLeftChart = document.getElementById('layout-main-below-left-chart');
    belowLeftChart.innerHTML = "";
    overviewFlag = 0;
}

function addCommas(nStr) {
	if (nStr == "N/A") {
		return "N/A";
	}

    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function drawAverageBasinWaterBarChart(string, j) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var links = [];
    var data1 = [];
    var xValues = [];
    for (var i = 0; i < 10; i++) { //state chart does not contain Republican because we don't have peak non-peak data for Republican basin.
        var url;
        var n = i + 1;
        url = string + n;
        links.push(url);
    }
    for (var l = 0; l < links.length; l++) {
        getAverageBasinWaterBarChartData(loadingBar, data1, xValues, links, l, j);
    }
}

function drawAverageIrrigatedAcresStackedBarChart(string) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var links = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var xValues = [];
    for (var i = 0; i < 10; i++) {
        var url;
        var n = i + 1;
        url = string + n;
        links.push(url);
    }
    for (var l = 0; l < links.length; l++) {
        getAverageIrrigatedAcresStackedBarChartData(loadingBar, data1, data2, data3, xValues, links, l);
    }
}

function drawAverageTotalDemandMultiBarChart(string, j) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var links = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var xValues = [];
    for (var i = 0; i < 10; i++) {
        var url;
        var n = i + 1;
        url = string + n;
        links.push(url);
    }
    for (var l = 0; l < links.length; l++) {
        getAverageTotalDemandMultiBarChartData(loadingBar, data1, data2, data3, xValues, links, l, j);
    }
	
}


function drawAveragePrecipitationRateVolumeCombinationChart(string, j) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var links = [];
    var data1 = [];
    var data2 = [];
    var xValues = [];

	for (var i = 0; i < 10; i++) {
        var url;
        var n = i + 1;
        url = string + n;
        links.push(url);
    }
    for (var l = 0; l < links.length; l++) {
        getAveragePrecipitationRateVolumeCombinationChartData(loadingBar, data1, data2, xValues, links, l, j);
    }
}

function drawDemandByCategory(string, j) {
    var loadingBar = document.getElementById('layout-main-below-loading-bar');
    loadingBar.style.marginLeft = '245px';
    loadingBar.style.visibility = 'visible';
    var links = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];
    var xValues = [];
    for (var i = 0; i < 12; i++) {
        var url;
        var n = i + 1;
        url = string + n;
        links.push(url);
    }
    for (var l = 0; l < links.length; l++) {
        getDemandByCategoryChartData(loadingBar, data1, data2, data3, data4, xValues, links, l, j);
    }
}

function statePrecipitationRatesVolumesRequest() {
    var count = 0;
    var links = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
        var url;
        var n = i + 1;
        url = jsonBasin + n;
        links.push(url);
    }
    for (var l = 0; l < links.length; l++) {
        count++;
        getAveragePrecipitationRateVolumeJsonData(data, count, links, l);
    }
}

function getAveragePrecipitationRateVolumeJsonData(data, count, links, l) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", links[l], false);
    xmlhttp.send();
    var json = JSON.parse(xmlhttp.responseText);

    var totalData = 0;
    var sumData1 = 0; // PrecipitationRate_Annual
    var avgData1 = 0;
    var sumData2 = 0; // PrecipitationVolume_Annual
    var avgData2 = 0;
    var sumData3 = 0; // PrecipitationRate_Peak
    var avgData3 = 0;
    var sumData4 = 0; // PrecipitationVolume_Peak
    var avgData4 = 0;
    var sumData5 = 0; // PrecipitationRate_NonPeak
    var avgData5 = 0;
    var sumData6 = 0; // PrecipitationVolume_NonPeak
    var avgData6 = 0;
    for (var i = 0; i < json.length; i++) {
        sumData1 += Number(json[i].PrecipitationRate_Annual);
        sumData2 += Number(json[i].PrecipitationVolume_Annual);
        sumData3 += Number(json[i].PrecipitationRate_Peak);
        sumData4 += Number(json[i].PrecipitationVolume_Peak);
        sumData5 += Number(json[i].PrecipitationRate_NonPeak);
        sumData6 += Number(json[i].PrecipitationVolume_NonPeak);
    }
    totalData = sumData1 + sumData2 + sumData3 + sumData4 + sumData5 + sumData6;

    if (totalData != 0) {
        avgData1 = Math.round(sumData1 / json.length);
        avgData2 = Math.round(sumData2 / json.length);
        avgData3 = Math.round(sumData3 / json.length);
        avgData4 = Math.round(sumData4 / json.length);
        avgData5 = Math.round(sumData5 / json.length);
        avgData6 = Math.round(sumData6 / json.length);
        var element = {
            Basin: json[0].Basin,
            PrecipitationRate_Annual: avgData1,
            PrecipitationRate_Peak: avgData3,
            PrecipitationRate_NonPeak: avgData5,
            PrecipitationVolume_Annual: avgData2,
            PrecipitationVolume_Peak: avgData4,
            PrecipitationVolume_NonPeak: avgData6
        };
        data.push(element);
    }
    if (count == links.length - 1) {
        var title = stateTab01[0];
        JSONToCSVConvertor(data, title, true);
    }
}

function stateAverageBasinWaterSupplyRequest() {
    var count = 0;
    var links = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
        var url;
        var n = i + 1;
        url = jsonBasin + n;
        links.push(url);
    }
    for (var l = 0; l < links.length; l++) {
        count++;
        getAverageBasinWaterSupplyJsonData(data, count, links, l);
    }
}

function getAverageBasinWaterSupplyJsonData(data, count, links, l) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", links[l], false);
    xmlhttp.send();
    var json = JSON.parse(xmlhttp.responseText);
    var totalData = 0;
    var sumData1 = 0; // SupplyTotal_Annual
    var avgData1 = 0;
    var sumData2 = 0; // SupplyTotal_Peak
    var avgData2 = 0;
    var sumData3 = 0; // SupplyTotal_NonPeak
    var avgData3 = 0;
    for (var i = 0; i < json.length; i++) {
        sumData1 += Number(json[i].SupplyTotal_Annual);
        sumData2 += Number(json[i].SupplyTotal_Peak);
        sumData3 += Number(json[i].SuppyTotal_NonPeak);
    }
    totalData = sumData1 + sumData2 + sumData3;
    if (totalData != 0) {
        avgData1 = Math.round(sumData1 / json.length);
        avgData2 = Math.round(sumData2 / json.length);
        avgData3 = Math.round(sumData3 / json.length);
        var element = {
            Basin: json[0].Basin,
            SupplyTotal_Annual: avgData1,
            SupplyTotal_Peak: avgData2,
            SupplyTotal_NonPeak: avgData3
        };
        data.push(element);
    }
    if (count == links.length - 1) {
        var title = stateTab01[1];
        JSONToCSVConvertor(data, title, true);
    }
}

function stateAverageTotalDemandRequest() {
    var count = 0;
    var links = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
        var url;
        var n = i + 1;
        url = jsonBasin + n;
        links.push(url);
    }
    for (var l = 0; l < links.length; l++) {
        count++;
        getAverageTotalDemandJsonData(data, count, links, l);
    }
}

function getAverageTotalDemandJsonData(data, count, links, l) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", links[l], false);
    xmlhttp.send();
    var json = JSON.parse(xmlhttp.responseText);
    var totalData = 0;
    var sumData1 = 0; // NearTermDemandTotal_Annual
    var avgData1 = 0;
    var sumData2 = 0; // NearTermDemandTotal_Peak
    var avgData2 = 0;
    var sumData3 = 0; // NearTermDemandTotal_NonPeak
    var avgData3 = 0;
    var sumData4 = 0; // LongTermDemandTotal_Annual
    var avgData4 = 0;
    var sumData5 = 0; // LongTermDemandTotal_Peak
    var avgData5 = 0;
    var sumData6 = 0; // LongTermDemandTotal_NonPeak
    var avgData6 = 0;
    var sumData7 = 0; // ProjectedLongTermDemandTotal_Annual
    var avgData7 = 0;
    var sumData8 = 0; // ProjectedLongTermDemandTotal_Peak
    var avgData8 = 0;
    var sumData9 = 0; // ProjectedLongTermDemandTotal_NonPeak
    var avgData9 = 0;
    for (var i = 0; i < json.length; i++) {
        sumData1 += Number(json[i].NearTermDemandTotal_Annual);
        sumData2 += Number(json[i].NearTermDemandTotal_Peak);
        sumData3 += Number(json[i].NearTermDemandTotal_NonPeak);
        sumData4 += Number(json[i].LongTermDemandTotal_Annual);
        sumData5 += Number(json[i].LongTermDemandTotal_Peak);
        sumData6 += Number(json[i].LongTermDemandTotal_NonPeak);
        sumData7 += Number(json[i].ProjectedLongTermDemandTotal_Annual);
        sumData8 += Number(json[i].ProjectedLongTermDemandTotal_Peak);
        sumData9 += Number(json[i].ProjectedLongTermDemandTotal_NonPeak);
    }
    totalData = sumData1 + sumData2 + sumData3 + sumData4 + sumData5 + sumData6 + sumData7 + sumData8 + sumData9;
    if (totalData != 0) {
        avgData1 = Math.round(sumData1 / json.length);
        avgData2 = Math.round(sumData2 / json.length);
        avgData3 = Math.round(sumData3 / json.length);
        avgData4 = Math.round(sumData4 / json.length);
        avgData5 = Math.round(sumData5 / json.length);
        avgData6 = Math.round(sumData6 / json.length);
        avgData7 = Math.round(sumData7 / json.length);
        avgData8 = Math.round(sumData8 / json.length);
        avgData9 = Math.round(sumData9 / json.length);
        var element = {
            Basin: json[0].Basin,
            NearTermDemandTotal_Annual: avgData1,
            NearTermDemandTotal_Peak: avgData2,
            NearTermDemandTotal_NonPeak: avgData3,
            LongTermDemandTotal_Annual: avgData4,
            LongTermDemandTotal_Peak: avgData5,
            LongTermDemandTotal_NonPeak: avgData6,
            ProjectedLongTermDemandTotal_Annual: avgData7,
            ProjectedLongTermDemandTotal_Peak: avgData8,
            ProjectedLongTermDemandTotal_NonPeak: avgData9
        };
        data.push(element);
    }
    if (count == links.length - 1) {
        var title = stateTab02[0];
        JSONToCSVConvertor(data, title, true);
    }
}

function stateAverageTotalDemandByCategoryRequest() {
    var count = 0;
    var links = [];
    var data = [];
    for (var i = 0; i < 12; i++) {
        var url;
        var n = i + 1;
        url = jsonBasin + n;
        links.push(url);
    }
    for (var l = 0; l < links.length; l++) {
        count++;
        getAverageTotalDemandByCategoryJsonData(data, count, links, l);
    }
}

function getAverageTotalDemandByCategoryJsonData(data, count, links, l) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", links[l], false);
    xmlhttp.send();
    var json = JSON.parse(xmlhttp.responseText);
    var totalData = 0;
    var sumData1 = 0; // SWDemand_Annual
    var avgData1 = 0;
    var sumData2 = 0; // SWDemand_Peak
    var avgData2 = 0;
    var sumData3 = 0; // SWDemand_NonPeak
    var avgData3 = 0;
    var sumData4 = 0; // GWCTotal_Annual
    var avgData4 = 0;
    var sumData5 = 0; // GWCTotal_Peak
    var avgData5 = 0;
    var sumData6 = 0; // GWCTotal_NonPeak
    var avgData6 = 0;
    var sumData7 = 0; // TotalNonConsumptiveUse_Annual
    var avgData7 = 0;
    var sumData8 = 0; // TotalNonConsumptiveUse_Peak
    var avgData8 = 0;
    var sumData9 = 0; // TotalNonConsumptiveUse_NonPeak
    var avgData9 = 0;
    var sumData10 = 0; // NetSurfaceWaterLoss_Annual
    var avgData10 = 0;
    var sumData11 = 0; // NetSurfaceWaterLoss_Peak
    var avgData11 = 0;
    var sumData12 = 0; // NetSurfaceWaterLoss_NonPeak
    var avgData12 = 0;
    for (var i = 0; i < json.length; i++) {
        sumData1 += Number(json[i].SWDemand_Annual);
        sumData2 += Number(json[i].SWDemand_Peak);
        sumData3 += Number(json[i].SWDemand_NonPeak);
        sumData4 += Number(json[i].GWCTotal_Annual);
        sumData5 += Number(json[i].GWCTotal_Peak);
        sumData6 += Number(json[i].GWCTotal_NonPeak);
        sumData7 += Number(json[i].TotalNonConsumptiveUse_Annual);
        sumData8 += Number(json[i].TotalNonConsumptiveUse_Peak);
        sumData9 += Number(json[i].TotalNonConsumptiveUse_NonPeak);
        sumData10 += Number(json[i].NetSurfaceWaterLoss_Annual);
        sumData11 += Number(json[i].NetSurfaceWaterLoss_Peak);
        sumData12 += Number(json[i].NetSurfaceWaterLoss_NonPeak);
    }
    totalData = sumData1 + sumData2 + sumData3 + sumData4 + sumData5 + sumData6 + sumData7 + sumData8 + sumData9 + sumData10 + sumData11 + sumData12;
    if (totalData != 0) {
        avgData1 = Math.round(sumData1 / json.length);
        avgData2 = Math.round(sumData2 / json.length);
        avgData3 = Math.round(sumData3 / json.length);
        avgData4 = Math.round(sumData4 / json.length);
        avgData5 = Math.round(sumData5 / json.length);
        avgData6 = Math.round(sumData6 / json.length);
        avgData7 = Math.round(sumData7 / json.length);
        avgData8 = Math.round(sumData8 / json.length);
        avgData9 = Math.round(sumData9 / json.length);
        avgData10 = Math.round(sumData10 / json.length);
        avgData11 = Math.round(sumData11 / json.length);
        avgData12 = Math.round(sumData12 / json.length);
        var element = {
            Basin: json[0].Basin,
            SWDemand_Annual: avgData1,
            SWDemand_Peak: avgData2,
            SWDemand_NonPeak: avgData3,
            GWCTotal_Annual: avgData4,
            GWCTotal_Peak: avgData5,
            GWCTotal_NonPeak: avgData6,
            TotalNonConsumptiveUse_Annual: avgData7,
            TotalNonConsumptiveUse_Peak: avgData8,
            TotalNonConsumptiveUse_NonPeak: avgData9,
            NetSurfaceWaterLoss_Annual: avgData10,
            NetSurfaceWaterLoss_Peak: avgData11,
            NetSurfaceWaterLoss_NonPeak: avgData12,
        };
        data.push(element);
    }
    if (count == links.length - 1) {
        var title = stateTab03[0];
        JSONToCSVConvertor(data, title, true);
    }
}

function stateAverageIrrigatedAcresRequest() {
    var count = 0;
    var links = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
        var url;
        var n = i + 1;
        url = jsonBasin + n;
        links.push(url);
    }
    for (var l = 0; l < links.length; l++) {
        count++;
        getAverageIrrigatedAcresJsonData(data, count, links, l);
    }
}

function getAverageIrrigatedAcresJsonData(data, count, links, l) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", links[l], false);
    xmlhttp.send();
    var json = JSON.parse(xmlhttp.responseText);
    var totalData = 0;
    var sumData1 = 0; // GWIAcres
    var avgData1 = 0;
    var sumData2 = 0; // SWIAcres
    var avgData2 = 0;
    var sumData3 = 0; // COIAcres
    var avgData3 = 0;
    for (var i = 0; i < json.length; i++) {
        sumData1 += Number(json[i].GWIAcres);
        sumData2 += Number(json[i].SWIAcres);
        sumData3 += Number(json[i].COIAcres);
    }
    totalData = sumData1 + sumData2 + sumData3;
    if (totalData != 0) {
        avgData1 = Math.round(sumData1 / json.length);
        avgData2 = Math.round(sumData2 / json.length);
        avgData3 = Math.round(sumData3 / json.length);
        var element = {
            Basin: json[0].Basin,
            GWIAcres: avgData1,
            SWIAcres: avgData2,
            COIAcres: avgData3
        };
        data.push(element);
    }
    if (count == links.length - 1) {
        var title = stateTab03[1];
        JSONToCSVConvertor(data, title, true);
    }
}

var dojoConfig = { parseOnLoad: true };

require([
	"esri/map",
	"esri/Color",
	"esri/graphic",
	"esri/SpatialReference",
	"esri/dijit/HomeButton",
	"esri/dijit/Geocoder",
	"esri/dijit/Scalebar",
	"esri/layers/LabelLayer",
	"esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/ArcGISImageServiceLayer",
    "esri/layers/ImageServiceParameters",
	"esri/symbols/Font",
	"esri/symbols/SimpleFillSymbol",
	"esri/symbols/SimpleLineSymbol",
	"esri/symbols/TextSymbol",
	"esri/layers/FeatureLayer",
	"esri/layers/GraphicsLayer",
	"esri/renderers/SimpleRenderer",
    // "esri/layers/LabelClass",
	"esri/geometry/Extent",
	"esri/geometry/Point",
	"esri/geometry/Polygon",
	"esri/tasks/query",
	"esri/tasks/QueryTask",
    // "esri/layers/LabelClass",
	"dojo/dom",
	"dojo/on",
	"dojo/parser",
	"dojo/ready"
], function (Map,Color, Graphic, SpatialReference, HomeButton, Geocoder, Scalebar, LabelLayer, Tiled, ArcGISImageServiceLayer, ImageServiceParameters, Font, SimpleFillSymbol, SimpleLineSymbol, TextSymbol, 
    FeatureLayer, GraphicsLayer, SimpleRenderer, Extent, Point,Polygon, Query, QueryTask, dom, on, parser, ready) {

    ready(function () {

        var initExtent = new Extent({
            xmin: -12472810.909933532, 
            ymin: 4621263.6726877075, 
            xmax: -9620792.510557795, 
            ymax: 5540953.997014703,
            zoom:6,

            "spatialReference": { "wkid": wkIdNumber }
        });

        var mapCenterPoint = new Point ({            
            type: "point",
            x: -11054095.79819472,
            y: 5089482.924525625,
            spatialReference: {wkid: wkIdNumber}
        })
        
        var panExtent = new Extent({
         
            xmax: -10333185.614175448,
            xmin: -11760417.806315878,
            ymax: 5540953.997014703,
            ymin: 4621263.6726877075, 
            zoom:6,

            "spatialReference": { "wkid": wkIdNumber }
            // xmin: -1.3E7,
            // ymin: 4500000,
            // xmax: -0.9E7,
            // ymax: 5500000,
            // zoom:6,
            // "spatialReference": { "wkid": wkIdNumber }
        });


        map = new Map("map", {
            extent: initExtent,
            fitExtent: false, //true
            logo: false,
            maxZoom: 10,
            minZoom: 6,
            showAttribution: false,
            smartNavigation: false,
            zoom: 6
        });
		
		GraphicsLayerClass = GraphicsLayer;
		GraphicClass = Graphic;
		PolygonClass = Polygon;
        
     

        IWMBasemapLayer = new Tiled(IWMBasemapLayerUrl, { showAttribution: false });
        map.addLayer(IWMBasemapLayer);

        var res = satelliteLayerUrl.split("/");
        if (res[res.length - 1] == "MapServer") {
           satelliteLayer = new Tiled(satelliteLayerUrl, { showAttribution: false });
           
        } else {
           params = new ImageServiceParameters();
           params.noData = 0;
           satelliteLayer = new ArcGISImageServiceLayer(satelliteLayerUrl, {
               imageServiceParameters: params,
               opacity: 0.75
           });
        }

        var mapHomeButton = new HomeButton({ map: map }, "map-home-button");
        mapHomeButton.startup();

        var homeButtonbasinClicked = document.getElementById('map-home-button');
        homeButtonbasinClicked.addEventListener("click", function () {
            map.graphics.clear();
        });

		var MapInfo = document.getElementById('map-info');
		var MapInfoCover = document.getElementById('layout-info-cover');
		MapInfo.addEventListener('click', function() {
			MapInfoCover.style.visibility = "visible";
		});
		var MapInfoClose = document.getElementById('layout-info-cover-close');
		MapInfoClose.addEventListener('click', function() {
			MapInfoCover.style.visibility = "hidden";
		});

        var geocoder = new Geocoder({ map: map }, "map-searchbar");
        geocoder.startup();

        var mapScalebar = new Scalebar({ map: map, scalebarUnit: "english" }, dojo.byId("map-scalebar"));
        mapScalebar.show();
        var mapBasemapToggle = document.getElementById('map-basemap-switch');
        mapBasemapToggle.addEventListener('click', function () {
            if (mapBasemapToggleFlag == 0) {
                map.addLayer(satelliteLayer);
                mapBasemapToggle.innerHTML = "Satellite | <strong>ON</strong>";
                mapBasemapToggleFlag = 1;
            } else {
                mapBasemapToggle.innerHTML = "Satellite | <strong>OFF</strong>";
                map.removeLayer(satelliteLayer);
                mapBasemapToggleFlag = 0;
            }
        });

        highLightSymbol = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(
                SimpleLineSymbol.STYLE_SOLID,
                new Color(highLightOutlineColor),
                highLightOutlineWeight
                ),
                new Color(highLightFillColor)
        );

        loadFeatureLayer();
        addSubbasinLayerLabels();

        map.on("update-start", function () {
            document.getElementById('map-loading-spin').style.visibility = 'visible';
        });

        map.on("update-end", function () {
            document.getElementById('map-home-button').style.visibility = 'visible';
            document.getElementById('map-scalebar').style.visibility = 'visible';
            document.getElementById('map-searchbar').style.visibility = 'visible';
            document.getElementById('map-basemap-switch').style.visibility = 'visible';
            document.getElementById('map-loading-spin').style.visibility = 'hidden';
			document.getElementById('map-info').style.visibility = 'visible';
            document.getElementById('layout-header-drop-list').style.visibility = 'visible';
        });

        var dropDownList = document.getElementById('layout-header-drop-list-arrow');
        var dropDownMenu = document.getElementById('layout-main-above-drop-menu');

        var newDropStateButton = document.createElement('div');
        newDropStateButton.className = "layout-main-above-drop-menu-header";
        dropDownMenu.appendChild(newDropStateButton);
        var boldStateButtonLabel = document.createElement('strong');
        boldStateButtonLabel.innerHTML = "State";        
        newDropStateButton.appendChild(boldStateButtonLabel);

        var newStateButton = document.createElement('div');
        newStateButton.className = "layout-main-above-drop-menu-button";
        dropDownMenu.appendChild(newStateButton);
        var newStateButtonLabel = document.createElement('div');
        newStateButtonLabel.className = "layout-main-above-drop-menu-button-label";
        newStateButton.appendChild(newStateButtonLabel);
        var newStateButtonLink = document.createElement('a');
        newStateButtonLink.setAttribute("href", "javascript:;");
        newStateButtonLink.innerHTML = "Nebraska";
        newStateButtonLabel.appendChild(newStateButtonLink);

        newStateButton.addEventListener("click", function () {
            map.setExtent(initExtent);
            map.graphics.clear();
        });


        var newDropBasinButton = document.createElement('div');
        newDropBasinButton.className = "layout-main-above-drop-menu-header";
        dropDownMenu.appendChild(newDropBasinButton);
        var boldBasinButtonLabel = document.createElement('strong');
        boldBasinButtonLabel.innerHTML = "Basins";
        newDropBasinButton.appendChild(boldBasinButtonLabel);

        for (var i = 0; i < basinNaviButtonTmp.length; i++) {
            var newListButton = document.createElement('div');
            newListButton.id = i;
            newListButton.className = "layout-main-above-drop-menu-button";
            dropDownMenu.appendChild(newListButton);
            var newListButtonLabel = document.createElement('div');
            newListButtonLabel.className = "layout-main-above-drop-menu-button-label";
            newListButton.appendChild(newListButtonLabel);
            var newListButtonLink = document.createElement('a');
            newListButtonLink.setAttribute("href", "javascript:;");
            newListButtonLink.innerHTML = basinNaviButtonTmp[i];
            newListButtonLabel.appendChild(newListButtonLink);
            newListButton.addEventListener("click", function () {             
                var tempId = this.id;
                if (tempId == 7) { // "REPUBLICAN"
                    basinName = "REPUBLICAN";
                };
                zoomToBasins(this.id); 
            });

        }

        var boldSubbasinButtonLabel = document.createElement('strong');
        boldSubbasinButtonLabel.innerHTML = "Subbasins";

        var newDropSubbasinButton = document.createElement('div');
        newDropSubbasinButton.className = "layout-main-above-drop-menu-header";
        dropDownMenu.appendChild(newDropSubbasinButton);
        
        newDropSubbasinButton.appendChild(boldSubbasinButtonLabel);
        for (var i = 0; i < subbasinNaviButton.length; i++) {
            var newListButton = document.createElement('div');
            newListButton.id = i;
            newListButton.className = "layout-main-above-drop-menu-button";
            dropDownMenu.appendChild(newListButton);
            var newListButtonLabel = document.createElement('div');
            newListButtonLabel.className = "layout-main-above-drop-menu-button-label";
            newListButton.appendChild(newListButtonLabel);
            var newListButtonLink = document.createElement('a');
            newListButtonLink.setAttribute("href", "javascript:;");
            newListButtonLink.innerHTML = subbasinNaviButton[i];
            newListButtonLabel.appendChild(newListButtonLink);
            newListButton.addEventListener("click", function () { zoomToSubbasins(this.id); });
        }
        dropDownList.addEventListener("mouseover", function () {
            dropDownMenu.style.visibility = 'visible';
        });
        dropDownMenu.addEventListener("mouseover", function () {
            dropDownMenu.style.visibility = 'visible';
        });
        dropDownMenu.addEventListener("mouseout", function () {
            dropDownMenu.style.visibility = 'hidden';
        });

        chartDropListListener();

        dojo.connect(map, "onExtentChange", function (e) {
            var currentExtent = map.extent;
            var currentCenter = map.extent.getCenter();

            var currentScale = map.getScale();

            var noDataDiv = document.getElementById('layout-main-below-noData');
            if(noDataDiv != null){
                noDataDiv.parentNode.removeChild(noDataDiv);
            }

            if (panExtent.contains(currentCenter)) { 

            } else {
                var mapOutBoundDiv = document.getElementById('map-outbound');
                mapOutBoundDiv.style.visibility = 'visible';
                map.centerAndZoom(mapCenterPoint,6);
                setTimeout(function () { mapOutBoundDiv.style.visibility = 'hidden'; }, 1500);
                
            }


            if (levelFlag != 2 && map.getZoom() <= 6 ) {

                if (overviewFlag != 0) {
                    deleteOverview();
                }
                if (document.getElementById('layout-main-below-loading-bar').style.visibility != 'hidden') {
                    document.getElementById('layout-main-below-loading-bar').style.visibility = 'hidden';
                }
                levelState = naviTabLevelId[0];
                addBasinLayerLabels();
                restoreMainBelowLayout();
                restoreDropLabels();

                tmpId = 0;
                csvTmpId = 0;
                balanceFlag = 0;
                stateTabFlag = 0;

                map.graphics.clear();

                document.getElementById('map-center').style.visibility = 'hidden';
                showBelowRightLabelRangeArrow();

                var layoutBreak = document.getElementById('layout-main-below-break');
                if (layoutBreak.innerHTML != "") {
                    layoutBreak.innerHTML = "";
                }

                var noDataDiv = document.getElementById('layout-main-below-noData');
                if(noDataDiv != null){
                    noDataDiv.parentNode.removeChild(noDataDiv);
                }

                clearChartSelections();

                initializeBelowRight();
                loadWelcomeGettingStarted();
                document.getElementById('super-cover').style.visibility = 'hidden';

                var path = stateChartExplanation[0];
                setBelowRightContent(stateTabLabel, 0, path);

                for (var i = 0; i < stateTabLabel.length; i++) {
                    createNewTab(stateTabLabel[i], layoutBreak, naviTabLevelId[0], i);
                }
                var initialTabId = naviTabLevelId[0] + "-" + "0";
                var initialTab = document.getElementById(initialTabId);
                initialTab.setAttribute("style", styleTabActive);

                updateChartTitles(stateTab01[0], season[0]);
                resetRanges();
                updateChartId(initialTabId);
                createChartDropMenu(initialTabId, stateTab01, season);
                chartDropListListener();

                levelFlag = 2;
                subbasinLoaded = 0;
            }
            else if (basinLayer.isVisibleAtScale(currentScale)) {
                if (levelFlag != 1) {
                    levelState = naviTabLevelId[1];
                    addBasinLayerLabels();

                    tmpId = 0;
                    csvTmpId = 0;
                    basinTabFlag = 0;

                    map.graphics.clear();
                    document.getElementById('map-center').style.visibility = 'visible';

                    var layoutBreak = document.getElementById('layout-main-below-break');
                    if (layoutBreak.innerHTML != "") {
                        layoutBreak.innerHTML = "";
                    }
                    for (var i = 0; i < basinTabLabel.length; i++) {
                        createNewTab(basinTabLabel[i], layoutBreak, naviTabLevelId[1], i);
                    }
                    var initialTabId = naviTabLevelId[1] + "-" + "0";
                    var initialTab = document.getElementById(initialTabId);
                    initialTab.setAttribute("style", styleTabActive);

					var streamflowTabId = naviTabLevelId[1] + "-nav-tab-" + 3;
					streamflowTab = document.getElementById(streamflowTabId);
					disableStreamflowTab();

                    lockTabs(naviTabLevelId[1], basinTabLabel.length);

                    clearBelowRightContent();
                    rebuildBeginningBelowRight();
                    changeMainBelowLayout();
					if(basinId==11) renderOverview2();
					else renderOverview();

                    levelFlag = 1;
                    subbasinLoaded = 0;
                }

                getBID(e);
            }
            else if (subbasinLayer.isVisibleAtScale(currentScale)) {
				addSubbasinLayerLabels();

                if (levelFlag != 0) {
                    if (overviewFlag != 0) {
                        deleteOverview();
                    }
                    levelState = naviTabLevelId[2];
                    restoreMainBelowLayout();
                    restoreDropLabels();

                    tmpId = 0;
                    csvTmpId = 0;
                    subbasinTabFlag = 0;

                    map.graphics.clear();
                    document.getElementById('map-center').style.visibility = 'visible';

                    var layoutBreak = document.getElementById('layout-main-below-break');
                    if (layoutBreak.innerHTML != "") {
                        layoutBreak.innerHTML = "";
                    }

                    clearChartSelections();

                    for (var i = 0; i < subbasinTabLabel.length; i++) {
                        createNewTab(subbasinTabLabel[i], layoutBreak, naviTabLevelId[2], i);
                    }
                    var initialTabId = naviTabLevelId[2] + "-" + "0";
                    var initialTab = document.getElementById(initialTabId);
                    initialTab.setAttribute("style", styleTabActive);
                    activeTabId = initialTabId;

					var streamflowTabId = naviTabLevelId[2] + "-nav-tab-" + 2;
					streamflowTab = document.getElementById(streamflowTabId);
					disableStreamflowTab();

                    lockTabs(naviTabLevelId[2], subbasinTabLabel.length);
                    updateChartTitles(subbasinTab01[0], season[0]);
                    resetRanges();
                    updateChartId(initialTabId);
                    createChartDropMenu(initialTabId, subbasinTab01, season);
                    chartDropListListener();

                    levelFlag = 0;
                    subbasinLoaded = 1;
                }

                getSubID(e);
            }
        });

        dojo.connect(basinLayer, "onClick", function (e) {
            basinClicked = 1;
            if (levelFlag == 1) {
                getBID(e);
            }
        });

        dojo.connect(subbasinLayer, "onClick", function (e) {
            subbasinClicked = 1;
            if (levelFlag == 0) {
                getSubID(e);
            }
        });

    });

    function restoreMainBelowLayout() {
        if (belowLayoutFlag == 1) {
            var newBelowLeft = document.getElementById('layout-main-below-left');
            newBelowLeft.style.width = "879px";
            var newBelowRight = document.getElementById('layout-main-below-right');
            newBelowRight.style.width = "289px";
            var newChartLeft = document.getElementById('layout-main-below-left-chart');
            newChartLeft.style.width = "859px";
            var newChartRight = document.getElementById('layout-main-below-right-paragraph');
            newChartRight.style.width = "269px";
            regenerateChartArea();
        }
        belowLayoutFlag = 0;
    }

    function restoreDropLabels() {
        if (belowLabelsFlag == 1) {
            resetLeftLabel();
            resetRightLabel();
        }
        belowLabelsFlag = 0;
    }

    function initializeBelowRight() {
        if (levelState == naviTabLevelId[0]) {
            rebuildBeginningBelowRight();
        } else {
            var initBelowRight = document.getElementById('layout-main-below-right-paragraph');
            initBelowRight.innerHTML = "";
            var initBelowRightName = document.createElement('div');
            initBelowRightName.id = "layout-main-below-right-region-name";
            if (levelState == naviTabLevelId[1]) {
                initBelowRightName.innerHTML = basinName;
            }
            if (levelState == naviTabLevelId[2]) {
                initBelowRightName.innerHTML = subbasinName;
            }
            initBelowRight.appendChild(initBelowRightName);
            var initBelowRightTitle = document.createElement('div');
            initBelowRightTitle.id = "layout-main-below-right-paragraph-title";
            initBelowRight.appendChild(initBelowRightTitle);
            var initBelowRightTextArea = document.createElement('div');
            initBelowRightTextArea.id = "layout-main-below-right-paragraph-textarea";
            initBelowRight.appendChild(initBelowRightTextArea);
        }
    }

	// Changed by Jieting on 2017-9-8 to make N/A data field

    function setBelowLeftContent() {
        glanceTable2 = [];
		glanceTable2.push(basinName);
		var NA_dataField = "N/A";

		if (basinName == "REPUBLICAN") {
			glanceTable2.push(basinArea);
			glanceTable2.push(basinWaterSupply);
			glanceTable2.push(nearDemand);
			glanceTable2.push(irrigatedAcres);
		} else {
			glanceTable2.push(basinArea);
			glanceTable2.push(basinWaterSupply);
			glanceTable2.push(nearDemand);
			glanceTable2.push(longDemand);
			glanceTable2.push(projectedDemand);
			glanceTable2.push(irrigatedAcres);
		}

        averageTableData = [];
        var sumSWD = 0;
        sumSWD = SWDIrrigat + SWDMunicip + SWDIndustr;
        var sumGWC = 0;
        sumGWC = GWCIrrigat + GWCMunicip + GWCIndustr;

		//fill data into the summary table
		if (basinName == 'REPUBLICAN') {
			averageTableData.push(SWDIrrigat);
			averageTableData.push(SWDMunicip);
			averageTableData.push(SWDIndustr);
			averageTableData.push(Math.round((SWDIrrigat / sumSWD) * 100));
			averageTableData.push(Math.round((SWDMunicip / sumSWD) * 100));
			averageTableData.push(Math.round((SWDIndustr / sumSWD) * 100));
			averageTableData.push(GWCIrrigat);
			averageTableData.push(GWCMunicip);
			averageTableData.push(GWCIndustr);
			averageTableData.push(Math.round((GWCIrrigat / sumGWC) * 1000)/10);
			averageTableData.push(Math.round((GWCMunicip / sumGWC) * 1000)/10);
			averageTableData.push(Math.round((GWCIndustr / sumGWC) * 1000)/10);

            var GR0 = document.getElementById('GR0');
            var GR1 = document.getElementById('GR1');
            var GR2 = document.getElementById('GR2');
            var GR3 = document.getElementById('GR3');
            var GR4 = document.getElementById('GR4');
            GR0.innerHTML = "";
            GR1.innerHTML = "";
            GR2.innerHTML = "";
            GR3.innerHTML = "";
            GR4.innerHTML = "";
            GR0.innerHTML = glanceTable2[0];
            GR1.innerHTML = addCommas(glanceTable2[1]) + " square miles";
            GR2.innerHTML = addCommas(glanceTable2[2]) + " acre-feet/year";
            GR3.innerHTML = addCommas(glanceTable2[3]) + " acre-feet/year";
            GR4.innerHTML = addCommas(glanceTable2[4]) + " acres *";

		} else {

			averageTableData.push(SWDIrrigat);
			averageTableData.push(SWDMunicip);
			averageTableData.push(SWDIndustr);
			averageTableData.push(Math.round((SWDIrrigat / sumSWD) * 100));
			averageTableData.push(Math.round((SWDMunicip / sumSWD) * 100));
			averageTableData.push(Math.round((SWDIndustr / sumSWD) * 100));
			averageTableData.push(GWCIrrigat);
			averageTableData.push(GWCMunicip);
			averageTableData.push(GWCIndustr);
			averageTableData.push(Math.round((GWCIrrigat / sumGWC) * 100));
			averageTableData.push(Math.round((GWCMunicip / sumGWC) * 100));
			averageTableData.push(Math.round((GWCIndustr / sumGWC) * 100));

            var GR0 = document.getElementById('GR0');
            var GR1 = document.getElementById('GR1');
            var GR2 = document.getElementById('GR2');
            var GR3 = document.getElementById('GR3');
            var GR4 = document.getElementById('GR4');
            var GR5 = document.getElementById('GR5');
            var GR6 = document.getElementById('GR6');
            GR0.innerHTML = "";
            GR1.innerHTML = "";
            GR2.innerHTML = "";
            GR3.innerHTML = "";
            GR4.innerHTML = "";
            if (GR5 != null){
                GR5.innerHTML = "";
                GR5.innerHTML = addCommas(glanceTable2[5]) + " acre-feet/year";
            }
            if (GR6 != null){
                GR6.innerHTML = "";
                GR6.innerHTML = addCommas(glanceTable2[6]) + " acres *";
            }
            
            GR0.innerHTML = glanceTable2[0];
            GR1.innerHTML = addCommas(glanceTable2[1]) + " square miles";
            GR2.innerHTML = addCommas(glanceTable2[2]) + " acre-feet/year";
            GR3.innerHTML = addCommas(glanceTable2[3]) + " acre-feet/year";
            GR4.innerHTML = addCommas(glanceTable2[4]) + " acre-feet/year";           
            
		}

        var GT3 = document.getElementById('GT3');
        var GT4 = document.getElementById('GT4');
        var GT5 = document.getElementById('GT5');
        var GT6 = document.getElementById('GT6');
        var GT7 = document.getElementById('GT7');
        var GT8 = document.getElementById('GT8');
        var GT9 = document.getElementById('GT9');
        var GT10 = document.getElementById('GT10');
        var GT11 = document.getElementById('GT11');
        var GT12 = document.getElementById('GT12');
        var GT13 = document.getElementById('GT13');
        var GT14 = document.getElementById('GT14');
        GT3.innerHTML = "";
        GT4.innerHTML = "";
        GT5.innerHTML = "";
        GT6.innerHTML = "";
        GT7.innerHTML = "";
        GT8.innerHTML = "";
        GT9.innerHTML = "";
        GT10.innerHTML = "";
        GT11.innerHTML = "";
        GT12.innerHTML = "";
        GT13.innerHTML = "";
        GT14.innerHTML = "";

        GT3.innerHTML = addCommas(averageTableData[0]);
        GT4.innerHTML = addCommas(averageTableData[1]);
        GT5.innerHTML = addCommas(averageTableData[2]);
        GT6.innerHTML = averageTableData[3] + "%";
        GT7.innerHTML = averageTableData[4] + "%";
        GT8.innerHTML = averageTableData[5] + "%";
        GT9.innerHTML = addCommas(averageTableData[6]);
        GT10.innerHTML = addCommas(averageTableData[7]);
        GT11.innerHTML = addCommas(averageTableData[8]);
        GT12.innerHTML = averageTableData[9] + "%";
        GT13.innerHTML = averageTableData[10] + "%";
        GT14.innerHTML = averageTableData[11] + "%";
    }

    function setBelowLeftContent2(){
        if(dataAvailability ==0 ){
            drawNoData();
        }else {
            const noDataDiv = document.querySelector('layout-main-below-noData');
            if (noDataDiv != null){
                noDataDiv.parentElement.removeChild(noDataDiv);
            }
            setBelowLeftContent();
        }
    }
    function setBelowRightContent(tab, n, path) {

        var belowRightTitle = document.getElementById('layout-main-below-right-paragraph-title');
        var belowRightTextArea = document.getElementById('layout-main-below-right-paragraph-textarea');

        if (levelState == naviTabLevelId[0]) {
            belowRightTitle.innerHTML = tab[n];
            readTextFile(path, belowRightTextArea);
        }
        if (levelState == naviTabLevelId[1]) {
            if (tab[n] == basinTabLabel[0]) {
                belowRightTitle.innerHTML = basinName;
                readTextFile(path, belowRightTextArea);
            } else {
                var belowRightName = document.getElementById('layout-main-below-right-region-name');
				if (belowRightName) {
                	belowRightName.innerHTML = basinName;

                	belowRightTitle.innerHTML = tab[n];
                	readTextFile(path, belowRightTextArea);
				}
            }
        }
        if (levelState == naviTabLevelId[2]) {
            var belowRightName = document.getElementById('layout-main-below-right-region-name');
            belowRightName.innerHTML = subbasinName;
            belowRightTitle.innerHTML = tab[n];
            readTextFile(path, belowRightTextArea);
        }
    }

	function resetHTMLLabel() {
		var initBelowLeftSelect = document.getElementById('left-label');
		initBelowLeftSelect.innerHTML = "Chart:";
		var initBelowRightSelect = document.getElementById('right-label');
		initBelowRightSelect.innerHTML = "Season:";
	}

    function createNewTab(text, element, level, Id) {
        var newNaviTab = document.createElement('div');
		newNaviTab.id = level + "-nav-tab-" + Id;
        newNaviTab.className = "layout-main-below-navigation-tab";
        element.appendChild(newNaviTab);
        var newNaviLink = document.createElement('a');
        newNaviLink.setAttribute("href", "javascript:;"); //javascript:;, javascript:void(0)
        newNaviTab.appendChild(newNaviLink);
        var newNaviLabel = document.createElement('div');
        newNaviLabel.id = level + "-" + Id;
        newNaviLabel.className = "layout-main-below-navigation-tab-label";
        newNaviLabel.innerHTML = text;
        newNaviLink.appendChild(newNaviLabel);
        newNaviLabel.addEventListener("click", function tagTrigger() {
            if (levelFlag == 2) {
                for (var j = 0; j < stateTabLabel.length; j++) {
                    var currentNaviTabId = naviTabLevelId[0] + "-" + j;
                    if (currentNaviTabId != newNaviLabel.id) {
                        var currentNaviTab = document.getElementById(currentNaviTabId);
                        currentNaviTab.setAttribute("style", "");
                    } else {
                        activeTabId = currentNaviTabId;
                        newNaviLabel.setAttribute("style", styleTabActive);
                        if (j == 0) {
                            if (stateTabFlag != j) {
                                stateTabFlag = j;
                                showBelowRightLabelRangeArrow();
                                resetChart(stateTab01[0], season[0], currentNaviTabId, j);
                                clearChartSelections();
                                createChartDropMenu(currentNaviTabId, stateTab01, season);
								resetHTMLLabel();
                                var path = stateChartExplanation[0];
                                setBelowRightContent(stateTabLabel, j, path);
                            }
                        }
                        if (j == 1) {
                            if (stateTabFlag != j) {
                                stateTabFlag = j;
                                showBelowRightLabelRangeArrow();
                                resetChart(stateTab02[0], season[0], currentNaviTabId, j);
                                clearChartSelections();
                                createChartDropMenu(currentNaviTabId, stateTab02, season);
                                resetHTMLLabel();
								var path = stateChartExplanation[1];
                                setBelowRightContent(stateTabLabel, j, path);
                            }
                        }
                        if (j == 2) {
                            if (stateTabFlag != j) {
                                stateTabFlag = j;
                                resetChart(stateTab03[0], season[0], currentNaviTabId, j);
                                clearChartSelections();
                                createChartDropMenu(currentNaviTabId, stateTab03, season);
                                resetHTMLLabel();
								var path = stateChartExplanation[2];
                                setBelowRightContent(stateTabLabel, j, path);
                            }
                        }

                    }
                }
            }
            if (levelFlag == 1) {
                for (var j = 0; j < basinTabLabel.length; j++) {
                    var currentNaviTabId = naviTabLevelId[1] + "-" + j;
                    if (currentNaviTabId != newNaviLabel.id) {
                        var currentNaviTab = document.getElementById(currentNaviTabId);
                        currentNaviTab.setAttribute("style", "");
                    } else {
                        activeTabId = currentNaviTabId;
                        newNaviLabel.setAttribute("style", styleTabActive);
                        if (j == 0) {
                            if (basinTabFlag != j) {
                                basinTabFlag = j;
                                balanceFlag = 0;
                                rebuildBeginningBelowRight();
                                changeMainBelowLayout();
                                var path = findBasinOverview();
                                setBelowRightContent(basinTabLabel, 0, path);
                                basinTabFlag = j;

                                renderOverview();
                                if (basinName !== "undefined" || subbasinName !=="undefined"){
                                    setBelowLeftContent2();
                                }

                            }
                        }
                        if (j == 1) {
                            if (basinTabFlag != j) {

                                if (overviewFlag != 0) {
                                    deleteOverview();
                                }

                                basinTabFlag = j;
                                balanceFlag = 0;
                                restoreMainBelowLayout();
                                initializeBelowRight();
                                var path = basinChartExplanation[0];
								if (basinId == 11) {
									path = repChartExplanation[0];
								}
                                setBelowRightContent(basinTabLabel, j, path);
                                restoreDropLabels();
                                clearChartSelections();
                                resetChart(basinTab02[0], season[0], currentNaviTabId, j);
                                resetRightLabel();
                                createChartDropMenu(currentNaviTabId, basinTab02, season);
								if (basinId == 11) {
									hideBelowRightLabelRangeArrow();
									changeBelowLeftLabelRangeArrow();
								}
                                chartDropListListener();
                            }
                        }
                        if (j == 2) {
                            if (basinTabFlag != j) {

                                if (overviewFlag != 0) {
                                    deleteOverview();
                                }

                                basinTabFlag = j;
                                balanceFlag = 0;
                                restoreMainBelowLayout();
                                initializeBelowRight();
                                showBelowRightLabelRangeArrow();
                                var path = basinChartExplanation[1];
								if (basinId == 11) {
									path = repChartExplanation[1];
								}
                                setBelowRightContent(basinTabLabel, j, path);
                                restoreDropLabels();
                                clearChartSelections();
                                resetChart(basinTab03[0], season[0], currentNaviTabId, j);
                                resetRightLabel();
								if (basinId == 11) {
									createChartDropMenu(currentNaviTabId, repubSupplyTitle, season);
									hideBelowRightLabelRangeArrow();
									changeBelowLeftLabelRangeArrow();
								} else {
									createChartDropMenu(currentNaviTabId, basinTab03, season);
								}
                                chartDropListListener();
                            }
                        }
                        if (j == 3) {
                            if (basinTabFlag != j) {

                                if (overviewFlag != 0) {
                                    deleteOverview();
                                }

                                basinTabFlag = j;
                                balanceFlag = 0;
                                restoreMainBelowLayout();
                                initializeBelowRight();
                                showBelowRightLabelRangeArrow();
                                var path = basinChartExplanation[2];
								if (basinId == 11) {
									path = repChartExplanation[2];
								}
                                setBelowRightContent(basinTabLabel, j, path);
                                restoreDropLabels();
                                clearChartSelections();
                                resetChart(basinTab04[0], season[0], currentNaviTabId, j);
                                resetRightLabel();
                                createChartDropMenu(currentNaviTabId, basinTab04, false);
                                chartDropListListener();
                            }
                        }
                        if (j == 4) {
                            if (basinTabFlag != j) {

                                if (overviewFlag != 0) {
                                    deleteOverview();
                                }

                                basinTabFlag = j;
                                balanceFlag = 0;
                                restoreMainBelowLayout();
                                initializeBelowRight();
                                showBelowRightLabelRangeArrow();
                                var path = basinChartExplanation[3];
								if (basinId == 11) {
									path = repChartExplanation[3];
								}
                                setBelowRightContent(basinTabLabel, j, path);
                                restoreDropLabels();
                                clearChartSelections();
                                resetChart(basinTab05[0], season[0], currentNaviTabId, j);
                                resetRightLabel();
                                createChartDropMenu(currentNaviTabId, basinTab05, season);
								if (basinId == 11) {
									hideBelowRightLabelRangeArrow();
									changeBelowLeftLabelRangeArrow();
								}
                                chartDropListListener();
                            }
                        }
                        if (j == 5) {
                            if (basinTabFlag != j) {

                                if (overviewFlag != 0) {
                                    deleteOverview();
                                }

                                basinTabFlag = j;
                                balanceFlag = 0;
                                restoreMainBelowLayout();
                                initializeBelowRight();
                                var path = basinChartExplanation[4];
								if (basinId == 11) {
									path = repChartExplanation[4];
								}
                                setBelowRightContent(basinTabLabel, j, path);
                                restoreDropLabels();
                                clearChartSelections();
                                resetChart(basinTab06[0], season[0], currentNaviTabId, j);

								if(basinId == 11) {
									createChartDropMenu(currentNaviTabId, basinTab06_rep, false);
								}else{
									createChartDropMenu(currentNaviTabId, basinTab06, false);
								}

                                chartDropListListener();
                            }
                        }
                        if (j == 6) {
                            if (basinTabFlag != j) {

                                if (overviewFlag != 0) {
                                    deleteOverview();
                                }

                                basinTabFlag = j;
                                balanceFlag = 1;
                                restoreMainBelowLayout();
                                initializeBelowRight();
                                showBelowRightLabelRangeArrow();
                                var path = basinChartExplanation[5];
								if (basinId == 11) {
									path = repChartExplanation[5];
								}
                                setBelowRightContent(basinTabLabel, j, path);
                                changeDropLabels();
                                clearChartSelections();
                                resetChart(" - " + chartLabel[1] + ": " + season[0], frame[0], currentNaviTabId, j);
                                createChartDropMenu(currentNaviTabId, season, frame);
								if (basinId == 11) {
									hideBelowRightLabelRangeArrow();
									changeBelowLeftLabelRangeArrow();
								}
                                chartDropListListener();
                            }
                        }
                    }
                }
            }
            if (levelFlag == 0) {
                for (var j = 0; j < subbasinTabLabel.length; j++) {
                    var currentNaviTabId = naviTabLevelId[2] + "-" + j;
                    if (currentNaviTabId != newNaviLabel.id) {
                        var currentNaviTab = document.getElementById(currentNaviTabId);
                        currentNaviTab.setAttribute("style", "");
                    } else {
                        activeTabId = currentNaviTabId;
                        newNaviLabel.setAttribute("style", styleTabActive);
                        if (j == 0) {
                            if (subbasinTabFlag != j) {
                                subbasinTabFlag = j;
                                balanceFlag = 0;
                                restoreMainBelowLayout();
                                initializeBelowRight();
                                var path = basinChartExplanation[0];
								if (subbasinId == 801) {
									path = repChartExplanation[0];
								}
                                setBelowRightContent(subbasinTabLabel, j, path);
                                restoreDropLabels();
                                clearChartSelections();
                                resetChart(subbasinTab01[0], season[0], currentNaviTabId, j);
                                resetRightLabel();
                                createChartDropMenu(currentNaviTabId, subbasinTab01, season);
								if (subbasinId == 801) {
									hideBelowRightLabelRangeArrow();
									changeBelowLeftLabelRangeArrow();
								}
                                chartDropListListener();
                            }
                        }
                        if (j == 1) {
                            if (subbasinTabFlag != j) {
                                subbasinTabFlag = j;
                                balanceFlag = 0;
                                restoreMainBelowLayout();
                                initializeBelowRight();
                                showBelowRightLabelRangeArrow();
                                var path = basinChartExplanation[1];
								if (subbasinId == 801) {
									path = repChartExplanation[1];
								}
                                setBelowRightContent(subbasinTabLabel, j, path);
                                restoreDropLabels();
                                clearChartSelections();
                                resetChart(subbasinTab02[0], season[0], currentNaviTabId, j);
                                resetRightLabel();
								if (subbasinId == 801) {
									createChartDropMenu(currentNaviTabId, repubSupplyTitle, season);
									hideBelowRightLabelRangeArrow();
									changeBelowLeftLabelRangeArrow();
								} else {
									createChartDropMenu(currentNaviTabId, basinTab03, season);
								}
                                chartDropListListener();
                            }
                        }
						if (j == 2) {
                            if (subbasinTabFlag != j) {
                                subbasinTabFlag = j;
                                balanceFlag = 0;
                                restoreMainBelowLayout();
                                initializeBelowRight();
                                showBelowRightLabelRangeArrow();
                                var path = basinChartExplanation[2];
								if (subbasinId == 801) {
									path = repChartExplanation[2];
								}
                                setBelowRightContent(subbasinTabLabel, j, path);
                                restoreDropLabels();
                                clearChartSelections();
                                resetChart(basinTab04[0], season[0], currentNaviTabId, j);
                                resetRightLabel();
                                createChartDropMenu(currentNaviTabId, basinTab04, false);
                                chartDropListListener();
                            }
                        }
                        if (j == 3) {
                            if (subbasinTabFlag != j) {
                                subbasinTabFlag = j;
                                balanceFlag = 0;
                                restoreMainBelowLayout();
                                initializeBelowRight();
                                showBelowRightLabelRangeArrow();
                                var path = basinChartExplanation[3];
								if (subbasinId == 801) {
									path = repChartExplanation[3];
								}
                                setBelowRightContent(subbasinTabLabel, j, path);
                                restoreDropLabels();
                                clearChartSelections();
                                resetChart(subbasinTab03[0], season[0], currentNaviTabId, j);
                                resetRightLabel();
                                createChartDropMenu(currentNaviTabId, subbasinTab03, season);
								if (subbasinId == 801) {
									hideBelowRightLabelRangeArrow();
									changeBelowLeftLabelRangeArrow();
								}
                                chartDropListListener();
                            }
                        }
                        if (j == 4) {
                            if (subbasinTabFlag != j) {
                                subbasinTabFlag = j;
                                balanceFlag = 0;
                                restoreMainBelowLayout();
                                initializeBelowRight();
                                showBelowRightLabelRangeArrow();
                                var path = basinChartExplanation[4];
								if (subbasinId == 801) {
									path = repChartExplanation[4];
								}
                                setBelowRightContent(subbasinTabLabel, j, path);
                                restoreDropLabels();
                                clearChartSelections();
                                resetChart(subbasinTab04[0], season[0], currentNaviTabId, j);
								if(subbasinId == 801){
									createChartDropMenu(currentNaviTabId, basinTab06_rep, false);
                                }else{
									createChartDropMenu(currentNaviTabId, subbasinTab04, false);
								}
								chartDropListListener();
                            }
                        }
                        if (j == 5) {
                            if (subbasinTabFlag != j) {
                                subbasinTabFlag = j;
                                balanceFlag = 1;
                                restoreMainBelowLayout();
                                initializeBelowRight();
                                showBelowRightLabelRangeArrow();
                                var path = basinChartExplanation[5];
								if (subbasinId == 801) {
									path = repChartExplanation[5];
								}
                                setBelowRightContent(subbasinTabLabel, j, path);
                                changeDropLabels();
                                clearChartSelections();
                                resetChart(" - " + chartLabel[1] + ": " + season[0], frame[0], currentNaviTabId, j);
                                createChartDropMenu(currentNaviTabId, season, frame);
								if (subbasinId == 801) {
									hideBelowRightLabelRangeArrow();
									changeBelowLeftLabelRangeArrow();
								}
                                chartDropListListener();
                            }
                        }
                    }
                }
            }
        });
    }

    function updateChartTitles(leftText, rightText) {
        var chartLeftTitle = document.getElementById('left-range');
        chartLeftTitle.innerHTML = leftText;
        var chartRightTitle = document.getElementById('right-range');
        chartRightTitle.innerHTML = rightText;
    }

    function updateChartId(Id) {
        var stateChartId;
        var basinChartId;
        var subbasinChartId;
        if (levelState == naviTabLevelId[0]) {
            stateChartId = Id + "-" + leftRangeId + "-" + rightRangeId;
            drawStateChart(stateChartId);
            startStateCSVgenerator(Id + "-" + leftRangeId);
        }
        if (levelState == naviTabLevelId[1]) {
			if (basinId == 11) {
				hideBelowRightLabelRangeArrow();
			} else {
				showBelowRightLabelRangeArrow();
			}
            basinChartId = Id + "-" + leftRangeId + "-" + rightRangeId + "-" + basinId;
            drawBasinChart(basinChartId, Id, leftRangeId);
        }
        if (levelState == naviTabLevelId[2]) {
			if (subbasinId == 801) {
				hideBelowRightLabelRangeArrow();
			} else {
				showBelowRightLabelRangeArrow();
			}
            subbasinChartId = Id + "-" + leftRangeId + "-" + rightRangeId + "-" + subbasinId;
            drawSubbasinChart(subbasinChartId, Id, leftRangeId);
        }
    }

    function createChartDropMenu(tab, left, right) {

        setLeftArrows();
        if (left.length > 1) {
            clearLeftChartSelections();
            for (var i = 0; i < left.length; i++) {

                createChartLeftDrop(tab, left, i);
            }
        }
        else {
            document.getElementById('left-arrow').style.visibility = 'hidden';
        }
        setRightArrows();
        if (right.length > 1) {

            for (var j = 0; j < right.length; j++) {
                createChartRightDrop(tab, right, j);
            }
        } else {
            if (right == false) {
                document.getElementById('right-label').innerHTML = "";
                document.getElementById('right-range').innerHTML = "";
            }
            document.getElementById('right-arrow').style.visibility = 'hidden';
        }
    }

    function changeMainBelowLayout() {
        var newBelowLeft = document.getElementById('layout-main-below-left');
        newBelowLeft.style.width = "520px"; // original 879px;
        var newBelowRight = document.getElementById('layout-main-below-right');
        newBelowRight.style.width = "648px"; // original 289px;
        var newChartLeft = document.getElementById('layout-main-below-left-chart');
        newChartLeft.style.width = "500px"; // original 859px;
        newChartLeft.innerHTML = "";
        var newChartRight = document.getElementById('layout-main-below-right-paragraph');
        newChartRight.style.width = "628px"; // original 269px;
        belowLayoutFlag = 1;
    }

    function resetChart(left, right, tab, n) {
        if (levelFlag == 2) {
            for (var i = 0; i < stateTabLabel.length; i++) {
                if (stateTabFlag != i) {
                    updateChartTitles(left, right);
                    resetRanges();
                    updateChartId(tab);
                }
            }
            stateTabFlag = n;
        }
        if (levelFlag == 1) {
            for (var j = 0; j < basinTabLabel.length; j++) {
                if (basinTabFlag != j) {
                    updateChartTitles(left, right);
                    resetRanges();
                    updateChartId(tab);
                }
            }
            basinTabFlag = n;
        }
        if (levelFlag == 0) {
            for (var k = 0; k < subbasinTabLabel.length; k++) {
                if (subbasinTabFlag != k) {
                    updateChartTitles(left, right);
                    resetRanges();
                    updateChartId(tab);
                }
            }
            subbasinTabFlag = n;
        }
    }

    function changeDropLabels() {
        var changeLeftLabel = document.getElementById('left-label');
        changeLeftLabel.innerHTML = chartLabel[0] + ": " + basinTabLabel[6];
        var changeRightLabel = document.getElementById('right-label');
        changeRightLabel.innerHTML = chartLabel[2] + ":";

        belowLabelsFlag = 1;
    }

    function createChartLeftDrop(Id, leftLabel, l) {

        var chartLeftDrop = document.getElementById('below-drop-left');
        var chartLeftList = document.createElement('div');
        chartLeftList.id = Id + "-" + l;
        chartLeftList.className = "layout-main-below-drop-left-button";
        chartLeftDrop.appendChild(chartLeftList);
        var chartLeftLink = document.createElement('a');
        chartLeftLink.setAttribute("href", "javascript:;");
        chartLeftList.appendChild(chartLeftLink);
        var chartLeftTitle = document.createElement('div');
        chartLeftTitle.className = "layout-main-below-drop-left-button-label";
        chartLeftTitle.innerHTML = leftLabel[l];
        chartLeftLink.appendChild(chartLeftTitle);

        chartLeftList.addEventListener("click", function () {
            for (var i = 0; i < leftLabel.length; i++) {
                var currentChartLeftListId = Id + "-" + i;
                if (currentChartLeftListId == chartLeftList.id) {
                    var leftRange = document.getElementById('left-range');
					var leftArrow = document.getElementById('left-arrow');
                    if (balanceFlag == 1) {
                        leftRange.innerHTML = " - " + chartLabel[1] + ": " + leftLabel[l];
                    } else {
                        leftRange.innerHTML = leftLabel[l];
                    }
                    leftRangeId = l;
                    updateChartId(Id);
                }
            }
        });
    }

    function createChartRightDrop(Id, rightLabel, r) {
        var chartRightDrop = document.getElementById('below-drop-right');
        var chartRightList = document.createElement('div');
        chartRightList.id = Id + "-" + r;
        chartRightList.className = "layout-main-below-drop-right-button";
        chartRightDrop.appendChild(chartRightList);
        var chartRightLink = document.createElement('a');
        chartRightLink.setAttribute("href", "javascript:;");
        chartRightList.appendChild(chartRightLink);
        var chartRightTitle = document.createElement('div');
        chartRightTitle.className = "layout-main-below-drop-right-button-label";
        chartRightTitle.innerHTML = rightLabel[r];
        chartRightLink.appendChild(chartRightTitle);

        chartRightList.addEventListener("click", function () {
            for (var i = 0; i < rightLabel.length; i++) {
                var currentChartRightListId = Id + "-" + i;
                if (currentChartRightListId == chartRightList.id) {
                    document.getElementById('right-range').innerHTML = rightLabel[r];
                    rightRangeId = r;
                    updateChartId(Id);
                }
            }
        });
    }


    function drawCartogram(){
	 var graphicsLayer = new GraphicsLayer();
     var polygon = new Polygon({
        "rings": basinFeatures[2]["geometry"]["rings"],
		"spatialReference": {"wkid": 102100}
      });
      var simpleFillSymbol = {
        type: "simple-fill",
        color: [227, 139, 79, 1],  
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      };
	  
	  var myPolygon = {"geometry":{"paths":[[[-115.3125,37.96875],[-111.4453125,37.96875],
      [-99.84375,36.2109375],[-99.84375,23.90625],[-116.015625,24.609375],[-115.3125,37.96875]]],
        "spatialReference":{"wkid":4326}},
        "symbol":{"color":[0,0,0,64],"outline":{"color":[0,0,0,255],
    "width":1,"type":"esriSLS","style":"esriSLSSolid"},
    "type":"esriSFS","style":"esriSFSSolid"}};
     var gra = new Graphic(myPolygon);  

      var polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: simpleFillSymbol
      });

      graphicsLayer.add(polygonGraphic);
      map.addLayer(graphicsLayer);

}

	/* Add all kinds of layers in the map*/
    function loadFeatureLayer() {

        basinLayer = new FeatureLayer(
		    basinLayerUrl, {
            //mode: FeatureLayer.MODE_SELECTION,
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["*"],
            // showLabels: true,
            "opacity": 0.5
        });		 
		
        map.addLayer(basinLayer);

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var json = JSON.parse(xmlhttp.responseText);
                basinFeatures = json["features"];

            }
        };
        xmlhttp.open("GET", basinLayerUrl+"/query?where=BID>0&returnGeometry=true&f=pjson", true);
        xmlhttp.send();


        subbasinLayer = new FeatureLayer(subbasinLayerUrl, {
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["*"],
            showLabels: true,
            "opacity": 0.5
        });
        map.addLayer(subbasinLayer);

        
        // labelsLayer = new FeatureLayer(labelsLayerUrl, {
        //     mode: FeatureLayer.MODE_SNAPSHOT,
        //     outFields: ["*"],
        //     "opacity": 1
        // });
        // map.addLayer(labelsLayer);
    }

    function addBasinLayerLabels() {

        var basinLayerLabelColor = new Color(labelColorNavy);
        var basinLayerLabel = new TextSymbol().setColor(basinLayerLabelColor);
		basinLayerLabel.font.setSize("18px");
        basinLayerLabel.font.setFamily("palatino linotype");
        basinLayerLabel.font.setWeight("bold");
		basinLayerLabel.setOffset(0, 0);

        var basinLayerLabelRenderer = new SimpleRenderer(basinLayerLabel);
        var basinLabels = new LabelLayer({ id: "basinLabels" });
        basinLabels.addFeatureLayer(basinLayer, basinLayerLabelRenderer, "{BasinName}");
        map.addLayer(basinLabels);

// // *************
//         //this is the very least of what should be set within the JSON  
//         var json = {
//             "labelExpressionInfo": {"value": "{BasinName}"}
//             };
    
//         //create instance of LabelClass (note: multiple LabelClasses can be passed in as an array)
//         var labelClass = new LabelClass(json);
//         labelClass.symbol = basinLayerLabel; // symbol also can be set in LabelClass' json
//         states.setLabelingInfo([ labelClass ]);
//         map.addLayer(basinLayer);
// // ***************************
    }

    function addSubbasinLayerLabels() {
        var subbasinLayerLabelColor = new Color(labelColorNavy);
        var subbasinLayerLabel = new TextSymbol().setColor(subbasinLayerLabelColor);
        subbasinLayerLabel.font.setSize("18px");
        subbasinLayerLabel.font.setFamily("palatino linotype");
        subbasinLayerLabel.font.setWeight("bold");
        subbasinLayerLabel.setOffset(0, 0);

        var subbasinLayerLabelRenderer = new SimpleRenderer(subbasinLayerLabel);
        var subbasinLabels = new LabelLayer({ id: "subbasinLabels" })

        subbasinLabels.addFeatureLayer(subbasinLayer, subbasinLayerLabelRenderer, "{SubBasinName}");

        map.addLayer(subbasinLabels);
    }

    function zoomToBasins(n) {
        var coordinates = new Point(basinCentroid[n], new SpatialReference({ wkid: wkIdNumber }));
        map.centerAndZoom(coordinates, 6);
    }

    function zoomToSubbasins(n) {
        var coordinates = new Point(subbasinCentroid[n], new SpatialReference({ wkid: wkIdNumber }));
        map.centerAndZoom(coordinates, 9);
    }

    function getBID(evt) {
		
        var queryTask = new QueryTask(basinLayerUrl);
        var query = new Query();
        query.returnGeometry = true;
        query.outFields = ["*"];

        if (basinClicked == 1) {
            query.geometry = evt.mapPoint;
            basinClicked = 0;
        } else {
            var geo = map.extent;
            var center = geo.getCenter();
            query.geometry = center;
        }

        dojo.connect(queryTask, "onComplete", function (featureSet) {

            if (featureSet.features.length < 1) {
                findNearest(center.x, center.y);
            }
			
			else {
                var basinClickedBasin = featureSet.features[0];
                var attributeValue = basinClickedBasin.attributes;
                basinId = parseInt(attributeValue.BID, 10);
				dataAvailability = attributeValue.DataAvailability;

                if (dataAvailability ==0 ){
                    drawNoData();
                }else{
                    var link = jsonBasinOverview + basinId;
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            var json = JSON.parse(xmlhttp.responseText);
                            json = json[0];
                            
                            basinName = json.Basin;
                            basinArea = json.ApproArea;
                            basinWaterSupply = json.Supply;
                            nearDemand = json.NearDemand;
                            longDemand = json.LongDemand;
                            projectedDemand = json.Demand;
                            irrigatedAcres = json.Acres;
    
                            AvgET = json.ET;
                            AvgRunoff = json.Runoff;
                            AvgRecharge = json.Recharge;
    
                            SWDIrrigat = json.SWDIrrigat;
                            SWDMunicip = json.SWDMunicip;
                            SWDIndustr = json.SWDIndustr;
    
                            if (SWDIrrigat == " ") {
                                SWDIrrigat = 0;
                            }
                            if (SWDMunicip == " ") {
                                SWDMunicip = 0;
                            }
                            if (SWDIndustr == " ") {
                                SWDIndustr = 0;
                            }
    
                            GWCIrrigat = json.GWCIrrigat;
                            GWCMunicip = json.GWCMunicip;
                            GWCIndustr = json.GWCIndustr;
    
                            if (GWCIrrigat == " ") {
                                GWCIrrigat = 0;
                            }
                            if (GWCMunicip == " ") {
                               GWCMunicip = 0;
                            }
                            if (GWCIndustr == " ") {
                                GWCIndustr = 0;
                            }
                        
                        }
                        fset = featureSet;
                        highLightFeature(fset.features[0]);
            
                    }
                    xmlhttp.open('GET', link, true);
                    xmlhttp.send();
                }	
  
            }
   
        });
		 queryTask.execute(query, function (fset) {

            if (fset.features.length == 1) {
               highLightFeature(fset.features[0]);
            } else if (fset.features.length !== 0) {
                console.log("ERROR: Layers overlapping!");
            }
        });
    }

    function getSubID(evt) {
        var queryTask = new QueryTask(subbasinLayerUrl);
        var query = new Query();
        query.returnGeometry = true;
        query.outFields = ["*"];

        if (subbasinClicked == 1) {
            query.geometry = evt.mapPoint;
            subbasinClicked = 0;
        } else {
            var geo = map.extent;
            var center = geo.getCenter();
            query.geometry = center;
        }

        dojo.connect(queryTask, "onComplete", function (featureSet) {
            if (featureSet.features.length < 1) {
                findNearest(center.x, center.y);
            }
           else {
                var subbasinClickedSubbasin = featureSet.features[0];
                var attributeValue = subbasinClickedSubbasin.attributes;

                dataAvailability = attributeValue.DataAvailability;

                subbasinId = parseInt(attributeValue.SubID, 10);

                if (dataAvailability == 0){ // republican subbasins, without data                                   
                    drawNoData();
                }
                else {
                    var link = jsonSubbasinOverview + subbasinId;
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            var json = JSON.parse(xmlhttp.responseText);
                            json = json[0];
                            subbasinName = json.Subbasin;
                            AvgET = json.ET;
                            AvgRunoff = json.Runoff;
                            AvgRecharge = json.Recharge;						
                            
                        }
                        fset = featureSet;
                        highLightFeature(fset.features[0]);
                    }
                    xmlhttp.open('GET', link, true);
                    xmlhttp.send();
                }

            }

        });

        queryTask.execute(query, function (fset) {

            if (fset.features.length == 1) {
               highLightFeature(fset.features[0]);
            } else if (fset.features.length !== 0) {
                console.log("ERROR: Layers overlapping!");
            }
        });
    }

    function findNearest(x, y) {
        if (levelState == naviTabLevelId[1]) {
            var i = computeDistance(basinCentroid, x, y);
            var coordinates = new Point(basinCentroid[i], new SpatialReference({ wkid: wkIdNumber }));
            map.centerAndZoom(coordinates, 2);
        }
        if (levelState == naviTabLevelId[2]) {
            var i = computeDistance(subbasinCentroid, x, y);
            var coordinates = new Point(subbasinCentroid[i], new SpatialReference({ wkid: wkIdNumber }));
            map.centerAndZoom(coordinates, 3);
        }
    }

    function computeDistance(centroid, x, y) {
        var n = 0;
        for (var i = 0; i < centroid.length; i++) {
            var d = Math.sqrt((x - centroid[i][0]) * (x - centroid[i][0]) + (y - centroid[i][1]) * (y - centroid[i][1]));
            if (distance == 0) {
                distance = d;
            } else if (d <= distance) {
                distance = d;
                n = i;
            }
        }
        distance = 0;
        return n;
    }

    var preBasinId=-1;
    function highLightFeature(feature) {
    	var counter =0;
        map.graphics.clear();
        var highLightGraphic = new Graphic(feature.geometry, highLightSymbol);

        var chartArea = document.getElementById('layout-main-below-left-chart-area');

        if (levelState == naviTabLevelId[0]) {
            if (chartArea) {
                drawStateChart(naviTabLevelId[0] + "-0-0-0");
            }
        }

        if(basinId!=11 && preBasinId==11 && counter<1) {
        	renderOverview();
        	counter ++;
        	preBasinId=basinId;
        }
        preBasinId = basinId;
        if (levelState == naviTabLevelId[1]) {

            map.graphics.add(highLightGraphic);

            if (chartArea) {
                updateChartId(activeTabId);
            }

			var path;
            if (basinTabFlag == 0) {
                // setBelowLeftContent();
                setBelowLeftContent();
                path = findBasinOverview();
            } else {
                path = findBasinTabDescription();
            }

			setBelowRightContent(basinTabLabel, basinTabFlag, path);
			if (basinId == 11) {
				if (m_switch == 0 || m_switch == 2) {
					rebuildBeginningBelowRight();
					changeMainBelowLayout();
					path = findBasinOverview();
					setBelowRightContent(basinTabLabel, 0, path);
					renderOverview2();

					var currentNaviTabId = naviTabLevelId[1] + "-" + basinTabFlag;
					var currentNaviTab = document.getElementById(currentNaviTabId);
					currentNaviTab.setAttribute("style", "");
					currentNaviTabId = naviTabLevelId[1] + "-" + "0";
					currentNaviTab = document.getElementById(currentNaviTabId);
					currentNaviTab.setAttribute("style", styleTabActive);

					basinTabFlag = 0;
					m_switch = 1;
				}
				// setBelowLeftContent();
                setBelowLeftContent2();
				setBelowRightContent(basinTabLabel, basinTabFlag, path);

				enableStreamflowTab();
				changeBelowLeftLabelRangeArrow();

			} else {
				if (m_switch == 1 || m_switch == 2) {
					rebuildBeginningBelowRight();
					changeMainBelowLayout();
					path = findBasinOverview();
					setBelowRightContent(basinTabLabel, 0, path);
					renderOverview();

					var currentNaviTabId = naviTabLevelId[1] + "-" + basinTabFlag;
					var currentNaviTab = document.getElementById(currentNaviTabId);
					currentNaviTab.setAttribute("style", "");
					var currentNaviTabId = naviTabLevelId[1] + "-" + "0";
					var currentNaviTab = document.getElementById(currentNaviTabId);
					currentNaviTab.setAttribute("style", styleTabActive);

					basinTabFlag = 0;
					m_switch = 0;

					// setBelowLeftContent();
                    setBelowLeftContent2();
				}
				setBelowRightContent(basinTabLabel, basinTabFlag, path);

				disableStreamflowTab();
				restoreBelowLeftLabelRangeArrow();
			}
            unlockTabs(naviTabLevelId[1], basinTabLabel.length);
        }
        if (levelState == naviTabLevelId[2]) {

            map.graphics.add(highLightGraphic);

            if (chartArea) {
                updateChartId(activeTabId);
            }

            initializeBelowRight();
			var path = findSubbasinTabDescription();

            setBelowRightContent(subbasinTabLabel, subbasinTabFlag, path);

			if (subbasinId == 801) {
				if (m_subSwitch == 0 || m_subSwitch == 2) {
					var path = repChartExplanation[0];

					var currentNaviTabId = naviTabLevelId[2] + "-" + subbasinTabFlag;
					var currentNaviTab = document.getElementById(currentNaviTabId);
					currentNaviTab.setAttribute("style", "");
					currentNaviTabId = naviTabLevelId[2] + "-" + "0";
					currentNaviTab = document.getElementById(currentNaviTabId);
					currentNaviTab.setAttribute("style", styleTabActive);

					subbasinTabFlag = 0;
					m_subSwitch = 1;

					updateChartTitles(subbasinTab01[0], season[0]);
					resetRanges();
					updateChartId(currentNaviTabId);
					createChartDropMenu(currentNaviTabId, subbasinTab01, season);
					chartDropListListener();
				}
				setBelowRightContent(subbasinTabLabel, subbasinTabFlag, path);

				enableStreamflowTab();
				changeSubbasinBelowLeftLabelRangeArrow();
			} else {
				if (m_subSwitch == 1 || m_subSwitch == 2) {
					var path = basinChartExplanation[0];

					var currentNaviTabId = naviTabLevelId[2] + "-" + subbasinTabFlag;
					var currentNaviTab = document.getElementById(currentNaviTabId);
					currentNaviTab.setAttribute("style", "");
					currentNaviTabId = naviTabLevelId[2] + "-" + "0";
					currentNaviTab = document.getElementById(currentNaviTabId);
					currentNaviTab.setAttribute("style", styleTabActive);

					subbasinTabFlag = 0;
					m_subSwitch = 0;

					updateChartTitles(subbasinTab01[0], season[0]);
					resetRanges();
					updateChartId(currentNaviTabId);
					createChartDropMenu(currentNaviTabId, subbasinTab01, season);
					chartDropListListener();
				}
				setBelowRightContent(subbasinTabLabel, subbasinTabFlag, path);

				disableStreamflowTab();
				restoreSubbasinBelowLeftLabelRangeArrow();
			}

            unlockTabs(naviTabLevelId[2], subbasinTabLabel.length);
        }
    }

    function lockTabs(Id, n) {
        var loadingBar = document.getElementById('layout-main-below-loading-bar');
        loadingBar.style.visibility = 'visible';
        for (var i = 1; i < n; i++) {
            var lockTabId = Id + "-" + i;
            var lockTab = document.getElementById(lockTabId);
            lockTab.style.visibility = 'hidden';
        }
    }

    function unlockTabs(Id, n) {
        var loadingBar = document.getElementById('layout-main-below-loading-bar');
        loadingBar.style.visibility = 'hidden';
        for (var i = 1; i < n; i++) {
            var unlockTabId = Id + "-" + i;
            var unlockTab = document.getElementById(unlockTabId);
            unlockTab.style.visibility = 'visible';
        }
    }

    function findBasinOverview() {
        if (basinId == 1) {
            var p = bigBlueOverview;
            return p;
        }
        if (basinId == 2) {
            var p = elkhornOverview;
            return p;
        }
        if (basinId == 3) {
            var p = littleBlueOverview;
            return p;
        }
        if (basinId == 5) {
            var p = loupOverview;
            return p;
        }
        if (basinId == 6) {
            var p = lowerPlatteOverview;
            return p;
        }
        if (basinId == 7) {
            var p = missouriTributariesOverview;
            return p;
        }
        if (basinId == 9) {
            var p = niobraraOverview;
            return p;
        }
		if (basinId == 10) {
            var p = platteOverview;
            return p;
        }
        if (basinId == 11) {
            var p = republicanOverview;
            return p;
        }
    }

    function findBasinTabDescription() {
        if (basinTabFlag == 1) {
            var p = basinChartExplanation[0];
			if (basinId == 11) {
				p = repChartExplanation[0];
			}
            return p;
        }
        if (basinTabFlag == 2) {
            var p = basinChartExplanation[1];
			if (basinId == 11) {
				p = repChartExplanation[1];
			}
            return p;
        }
        if (basinTabFlag == 3) {
            var p = basinChartExplanation[2];
			if (basinId == 11) {
				p = repChartExplanation[2];
			}
            return p;
        }
        if (basinTabFlag == 4) {
            var p = basinChartExplanation[3];
			if (basinId == 11) {
				p = repChartExplanation[3];
			}
            return p;
        }
        if (basinTabFlag == 5) {
            var p = basinChartExplanation[4];
			if (basinId == 11) {
				p = repChartExplanation[4];
			}
            return p;
        }
        if (basinTabFlag == 6) {
            var p = basinChartExplanation[5];
			if (basinId == 11) {
				p = repChartExplanation[5];
			}
            return p;
        }
    }

    function findSubbasinTabDescription() {
        if (subbasinTabFlag == 0) {
            var p = basinChartExplanation[0];
			if (subbasinId == 801) {
				p = repChartExplanation[0];
			}
            return p;
        }
        if (subbasinTabFlag == 1) {
            var p = basinChartExplanation[1];
			if (subbasinId == 801) {
				p = repChartExplanation[1];
			}
            return p;
        }
		if (subbasinTabFlag == 2) {
            var p = basinChartExplanation[2];
            if (subbasinId == 801) {
				p = repChartExplanation[2];
			}
			return p;
        }
        if (subbasinTabFlag == 3) {
            var p = basinChartExplanation[3];
            if (subbasinId == 801) {
				p = repChartExplanation[3];
			}
			return p;
        }
        if (subbasinTabFlag == 4) {
            var p = basinChartExplanation[4];
            if (subbasinId == 801) {
				p = repChartExplanation[4];
			}
			return p;
        }
        if (subbasinTabFlag == 5) {
            var p = basinChartExplanation[5];
			if (subbasinId == 801) {
				p = repChartExplanation[5];
			}
            return p;
        }
    }

    function drawStateChart(stateChartId) {
        var chartArea = document.getElementById('layout-main-below-left-chart-area');
        if (stateChartId != tmpId || chartArea.innerHTML == "") {
            tmpId = stateChartId;
            chartArea.innerHTML = "";

            // Supply
            // Precipitation Rates and Volumes by Basin
            if (stateChartId == naviTabLevelId[0] + "-0-0-0") {
                var k = 0;
                drawAveragePrecipitationRateVolumeCombinationChart(jsonBasin, k);
            }
            if (stateChartId == naviTabLevelId[0] + "-0-0-1") {
                var k = 1;
                drawAveragePrecipitationRateVolumeCombinationChart(jsonBasin, k);
            }
            if (stateChartId == naviTabLevelId[0] + "-0-0-2") {
                var k = 2;
                drawAveragePrecipitationRateVolumeCombinationChart(jsonBasin, k);
            }
            // Average Basin Water Supply
            if (stateChartId == naviTabLevelId[0] + "-0-1-0") {
                var k = 0;
                drawAverageBasinWaterBarChart(jsonBasin, k);
            }
            if (stateChartId == naviTabLevelId[0] + "-0-1-1") {
                var k = 1;
                drawAverageBasinWaterBarChart(jsonBasin, k);
            }
            if (stateChartId == naviTabLevelId[0] + "-0-1-2") {
                var k = 2;
                drawAverageBasinWaterBarChart(jsonBasin, k);
            }

            // Demand
            // Average Total Demand
            if (stateChartId == naviTabLevelId[0] + "-1-0-0") {
                var k = 0;
                drawAverageTotalDemandMultiBarChart(jsonBasin, k);
            }
            if (stateChartId == naviTabLevelId[0] + "-1-0-1") {
                var k = 1;
                drawAverageTotalDemandMultiBarChart(jsonBasin, k);
            }
            if (stateChartId == naviTabLevelId[0] + "-1-0-2") {
                var k = 2;
                drawAverageTotalDemandMultiBarChart(jsonBasin, k);
            }

            // Natural and Extent of Use
            // State Demand by Category
            if (stateChartId == naviTabLevelId[0] + "-2-0-0") {
                showBelowRightLabelRangeArrow();
                addMultiPieChartsLayout();
                var k = 0;
                drawDemandByCategory(jsonBasin, k);
            }
            if (stateChartId == naviTabLevelId[0] + "-2-0-1") {
                showBelowRightLabelRangeArrow();
                addMultiPieChartsLayout();
                var k = 1;
                drawDemandByCategory(jsonBasin, k);
            }
            if (stateChartId == naviTabLevelId[0] + "-2-0-2") {
                showBelowRightLabelRangeArrow();
                addMultiPieChartsLayout();
                var k = 2;
                drawDemandByCategory(jsonBasin, k);
            }
            // State Irrigated Acres
            if (stateChartId == naviTabLevelId[0] + "-2-1-0" || stateChartId == naviTabLevelId[0] + "-2-1-1" || stateChartId == naviTabLevelId[0] + "-2-1-2") {
                hideBelowRightLabelRangeArrow();
                drawAverageIrrigatedAcresStackedBarChart(jsonBasin);
            }
        }
    }

    function drawBasinChart(basinChartId, Id, leftRangeId) {
        var chartArea = document.getElementById('layout-main-below-left-chart-area'); // 859 * 298

        if (basinChartId != tmpId || chartArea.innerHTML == "") {
            tmpId = basinChartId;
            chartArea.innerHTML = "";
            // Big Picture
            if (basinChartId == naviTabLevelId[1] + "-1-0-0-" + basinId) {
                showBelowRightLabelRangeArrow();
                var k = 0;
                drawPrecipitationRateVolumeCombinationChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-1-0-1-" + basinId) {
                showBelowRightLabelRangeArrow();
                var k = 1;
                drawPrecipitationRateVolumeCombinationChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-1-0-2-" + basinId) {
                showBelowRightLabelRangeArrow();
                var k = 2;
                drawPrecipitationRateVolumeCombinationChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-1-1-0-" + basinId || basinChartId == naviTabLevelId[1] + "-1-1-1-" + basinId || basinChartId == naviTabLevelId[1] + "-1-1-2-" + basinId) {
                hideBelowRightLabelRangeArrow();
                drawPrecipitationDistributionStackedBarChart(jsonBasin, basinId);
            }
            // Average Precipitation Distribution
            if (basinChartId == naviTabLevelId[1] + "-1-2-0-" + basinId || basinChartId == naviTabLevelId[1] + "-1-2-1-" + basinId || basinChartId == naviTabLevelId[1] + "-1-2-2-" + basinId) {
                hideBelowRightLabelRangeArrow();
                drawAveragePrecipitationDistributionPieChart();
            }

            // Supply
            // Basin Water Supply
            if (basinChartId == naviTabLevelId[1] + "-2-0-0-" + basinId) { // draw annual
                var k = 0;
				if (basinId == 11) {
					drawBasinTotalSupplyBarChart(jsonBasin, k, basinId);
				} else {
                	drawBasinWaterSupplyStackedBarChart(jsonBasin, k, basinId);
				}
            }
            if (basinChartId == naviTabLevelId[1] + "-2-0-1-" + basinId) { // draw peak
                var k = 1;
                drawBasinWaterSupplyStackedBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-2-0-2-" + basinId) { // draw non-peak
                var k = 2;
                drawBasinWaterSupplyStackedBarChart(jsonBasin, k, basinId);
            }

            // Basin Supply Streamflow
            if (basinChartId == naviTabLevelId[1] + "-2-1-0-" + basinId) { // draw annual
                var k = 0;
                drawStreamflowMultiBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-2-1-1-" + basinId) { // draw peak
                var k = 1;
                drawStreamflowMultiBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-2-1-2-" + basinId) { // draw non-peak
                var k = 2;
                drawStreamflowMultiBarChart(jsonBasin, k, basinId);
            }

            // Basin Supply SWD
            if (basinChartId == naviTabLevelId[1] + "-2-2-0-" + basinId) { // draw annual
                var k = 0;
                drawSWDBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-2-2-1-" + basinId) { // draw peak
                var k = 1;
                drawSWDBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-2-2-2-" + basinId) { // draw non-peak
                var k = 2;
                drawSWDBarChart(jsonBasin, k, basinId);
            }

            // Basin Supply GWDP
            if (basinChartId == naviTabLevelId[1] + "-2-3-0-" + basinId) { // draw annual
                var k = 0;
                drawGWDPBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-2-3-1-" + basinId) { // draw peak
                var k = 1;
                drawGWDPBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-2-3-2-" + basinId) { // draw non-peak
                var k = 2;
                drawGWDPBarChart(jsonBasin, k, basinId);
            }

            // Basin Supply REQUIRED INFLOWS
            if (basinChartId == naviTabLevelId[1] + "-2-4-0-" + basinId) { // draw annual
                var k = 0;
                drawRequiredInflowsBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-2-4-1-" + basinId) { // draw peak
                var k = 1;
                drawRequiredInflowsBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-2-4-2-" + basinId) { // draw non-peak
                var k = 2;
                drawRequiredInflowsBarChart(jsonBasin, k, basinId);
            }

			// Streamflow for republican
            if (basinChartId == naviTabLevelId[1] + "-3-0-0-" + basinId) { // draw annual
                var k = 0;
                drawStreamflowBarChart(jsonBasin, k, basinId);
            }

            // Demand
            // Basin Total Long Term Demand
            if (basinChartId == naviTabLevelId[1] + "-4-0-0-" + basinId) { // draw annual
                var k = 0;
				if (basinId == 11) {
					drawTotalDemandStackedBarChart(jsonBasin, k, basinId);
				} else {
                	drawTotalLongTermDemandStackedBarChart(jsonBasin, k, basinId);
				}
            }
            if (basinChartId == naviTabLevelId[1] + "-4-0-1-" + basinId) { // draw peak
                var k = 1;
                drawTotalLongTermDemandStackedBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-4-0-2-" + basinId) { // draw non-peak
                var k = 2;
                drawTotalLongTermDemandStackedBarChart(jsonBasin, k, basinId);
            }

            // Basin Total SWD
            if (basinChartId == naviTabLevelId[1] + "-4-1-0-" + basinId) { // draw annual
                var k = 0;
				if (basinId == 11) {
					drawTotalSWDBarChart(jsonBasin, k, basinId);
				} else {
                	drawTotalSWDStackedBarChart(jsonBasin, k, basinId);
				}
            }
            if (basinChartId == naviTabLevelId[1] + "-4-1-1-" + basinId) { // draw peak
                var k = 1;
                drawTotalSWDStackedBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-4-1-2-" + basinId) { // draw non-peak
                var k = 2;
                drawTotalSWDStackedBarChart(jsonBasin, k, basinId);
            }

            // Basin Total GWD
            if (basinChartId == naviTabLevelId[1] + "-4-2-0-" + basinId) { // draw annual
                var k = 0;
				if (basinId == 11) {
					drawTotalGWDBarChart(jsonBasin, k, basinId);
				} else {
                	drawTotalGWDStackedBarChart(jsonBasin, k, basinId);
				}
            }
            if (basinChartId == naviTabLevelId[1] + "-4-2-1-" + basinId) { // draw peak
                var k = 1;
                drawTotalGWDStackedBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-4-2-2-" + basinId) { // draw non-peak
                var k = 2;
                drawTotalGWDStackedBarChart(jsonBasin, k, basinId);
            }

            // Basin Total Non-consumptive Demand
            if (basinChartId == naviTabLevelId[1] + "-4-3-0-" + basinId) { // draw annual
                var k = 0;
                drawTotalNonConsumptionDemandCombinationChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-4-3-1-" + basinId) { // draw peak
                var k = 1;
                drawTotalNonConsumptionDemandCombinationChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-4-3-2-" + basinId) { // draw non-peak
                var k = 2;
                drawTotalNonConsumptionDemandCombinationChart(jsonBasin, k, basinId);
            }

            // Basin Demand NET SURFACE WATER LOSS
            if (basinChartId == naviTabLevelId[1] + "-4-4-0-" + basinId) { // draw annual
                var k = 0;
                drawNetSurfaceWaterLossBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-4-4-1-" + basinId) { // draw peak
                var k = 1;
                drawNetSurfaceWaterLossBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-4-4-2-" + basinId) { // draw non-peak
                var k = 2;
                drawNetSurfaceWaterLossBarChart(jsonBasin, k, basinId);
            }

            // Nature and Extent of Use
            // Basin Average Total Demand by Category
            if (basinChartId == naviTabLevelId[1] + "-5-0-0-" + basinId) { // draw annual
                addMultiPieChartsLayout();
				if (basinId == 11) {
					drawRepubAverageTotalDemandByCategory(jsonBasin, basinId);
				} else {
                	drawAverageTotalDemandByCategory(jsonBasin, basinId);
				}
            }
            // Basin Irrigated Acres
            if (basinChartId == naviTabLevelId[1] + "-5-1-0-" + basinId) { // draw annual
				drawIrrigatedAcresStackedBarChart(jsonBasin, basinId);
            }

            // Balance
            // Basin Season Annual
            if (basinChartId == naviTabLevelId[1] + "-6-0-0-" + basinId) { // draw annual
                var k = 0;
                drawBalanceAnnualBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-6-0-1-" + basinId) { // draw peak
                var k = 1;
                drawBalanceAnnualBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-6-0-2-" + basinId) { // draw non-peak
                var k = 2;
                drawBalanceAnnualBarChart(jsonBasin, k, basinId);
            }
            // Basin Season 6 ~ 8
            if (basinChartId == naviTabLevelId[1] + "-6-1-0-" + basinId) { // draw annual
                var k = 0;
                drawBalancePeakBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-6-1-1-" + basinId) { // draw peak
                var k = 1;
                drawBalancePeakBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-6-1-2-" + basinId) { // draw non-peak
                var k = 2;
                drawBalancePeakBarChart(jsonBasin, k, basinId);
            }
            // Basin Season 9 ~ 5
            if (basinChartId == naviTabLevelId[1] + "-6-2-0-" + basinId) { // draw annual
                var k = 0;
                drawBalanceNonPeakBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-6-2-1-" + basinId) { // draw peak
                var k = 1;
                drawBalanceNonPeakBarChart(jsonBasin, k, basinId);
            }
            if (basinChartId == naviTabLevelId[1] + "-6-2-2-" + basinId) { // draw non-peak
                var k = 2;
                drawBalanceNonPeakBarChart(jsonBasin, k, basinId);
            }
            if (basinId != 0) {
                startBasinCSVgenerator(Id + "-" + leftRangeId);
            }
        }
    }

    function drawSubbasinChart(subbasinChartId, Id, leftRangeId) {
        var chartArea = document.getElementById('layout-main-below-left-chart-area');

        if (subbasinChartId != tmpId || chartArea.innerHTML == "") {
            tmpId = subbasinChartId;
            chartArea.innerHTML = "";
            // Big Picture
            if (subbasinChartId == naviTabLevelId[2] + "-0-0-0-" + subbasinId) {
                showBelowRightLabelRangeArrow();
                var k = 0;
				if (subbasinId == 801) {
					drawPrecipitationRateVolumeCombinationChart(jsonBasin, k, 11);
				} else {
					drawPrecipitationRateVolumeCombinationChart(jsonSubbasin, k, subbasinId);
				}
            }
            if (subbasinChartId == naviTabLevelId[2] + "-0-0-1-" + subbasinId) {
                showBelowRightLabelRangeArrow();
                var k = 1;
                drawPrecipitationRateVolumeCombinationChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-0-0-2-" + subbasinId) {
                showBelowRightLabelRangeArrow();
                var k = 2;
                drawPrecipitationRateVolumeCombinationChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-0-1-0-" + subbasinId || subbasinChartId == naviTabLevelId[2] + "-0-1-1-" + subbasinId || subbasinChartId == naviTabLevelId[2] + "-0-1-2-" + subbasinId) {
                hideBelowRightLabelRangeArrow();
                drawPrecipitationDistributionStackedBarChart(jsonSubbasin, subbasinId);
            }
            // Average Precipitation Distribution
            if (subbasinChartId == naviTabLevelId[2] + "-0-2-0-" + subbasinId || subbasinChartId == naviTabLevelId[2] + "-0-2-1-" + subbasinId || subbasinChartId == naviTabLevelId[2] + "-0-2-2-" + subbasinId) {
                hideBelowRightLabelRangeArrow();
                drawAveragePrecipitationDistributionPieChart();
            }

            // Supply
            // Subbasin Water Supply
            if (subbasinChartId == naviTabLevelId[2] + "-1-0-0-" + subbasinId) { // draw annual
                var k = 0;
				if (subbasinId == 801) {
					drawBasinTotalSupplyBarChart(jsonBasin, k, 11);
				} else {
					drawBasinWaterSupplyStackedBarChart(jsonSubbasin, k, subbasinId);
				}
            }
            if (subbasinChartId == naviTabLevelId[2] + "-1-0-1-" + subbasinId) { // draw peak
                var k = 1;
                drawBasinWaterSupplyStackedBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-1-0-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawBasinWaterSupplyStackedBarChart(jsonSubbasin, k, subbasinId);
            }

            // Subbasin Supply Streamflow
            if (subbasinChartId == naviTabLevelId[2] + "-1-1-0-" + subbasinId) { // draw annual
                var k = 0;
                drawStreamflowMultiBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-1-1-1-" + subbasinId) { // draw peak
                var k = 1;
                drawStreamflowMultiBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-1-1-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawStreamflowMultiBarChart(jsonSubbasin, k, subbasinId);
            }

            // Subbasin Supply SWD
            if (subbasinChartId == naviTabLevelId[2] + "-1-2-0-" + subbasinId) { // draw annual
                var k = 0;
                drawSWDBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-1-2-1-" + subbasinId) { // draw peak
                var k = 1;
                drawSWDBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-1-2-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawSWDBarChart(jsonSubbasin, k, subbasinId);
            }

            // Subbasin Supply GWDP
            if (subbasinChartId == naviTabLevelId[2] + "-1-3-0-" + subbasinId) { // draw annual
                var k = 0;
                drawGWDPBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-1-3-1-" + subbasinId) { // draw peak
                var k = 1;
                drawGWDPBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-1-3-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawGWDPBarChart(jsonSubbasin, k, subbasinId);
            }

            // Subbasin Supply REQUIRED INFLOWS
            if (subbasinChartId == naviTabLevelId[2] + "-1-4-0-" + subbasinId) { // draw annual
                var k = 0;
                drawRequiredInflowsBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-1-4-1-" + subbasinId) { // draw peak
                var k = 1;
                drawRequiredInflowsBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-1-4-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawRequiredInflowsBarChart(jsonSubbasin, k, subbasinId);
            }

			// Streamflow for republican
            if (subbasinChartId == naviTabLevelId[2] + "-2-0-0-" + subbasinId) { // draw annual
                var k = 0;
                drawStreamflowBarChart(jsonBasin, k, 11);
            }

            // Demand
            // Subbasin Total Long Term Demand
            if (subbasinChartId == naviTabLevelId[2] + "-3-0-0-" + subbasinId) { // draw annual
                var k = 0;
				if (subbasinId == 801) {
					drawTotalDemandStackedBarChart(jsonBasin, k, 11);
				} else {
					drawTotalLongTermDemandStackedBarChart(jsonSubbasin, k, subbasinId);
				}
            }
            if (subbasinChartId == naviTabLevelId[2] + "-3-0-1-" + subbasinId) { // draw peak
                var k = 1;
                drawTotalLongTermDemandStackedBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-3-0-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawTotalLongTermDemandStackedBarChart(jsonSubbasin, k, subbasinId);
            }

            // Subbasin Total SWD
            if (subbasinChartId == naviTabLevelId[2] + "-3-1-0-" + subbasinId) { // draw annual
                var k = 0;
				if (subbasinId == 801) {
					drawTotalSWDBarChart(jsonBasin, k, 11);
				} else {
					drawTotalSWDStackedBarChart(jsonSubbasin, k, subbasinId);
				}
            }
            if (subbasinChartId == naviTabLevelId[2] + "-3-1-1-" + subbasinId) { // draw peak
                var k = 1;
                drawTotalSWDStackedBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-3-1-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawTotalSWDStackedBarChart(jsonSubbasin, k, subbasinId);
            }

            // Subbasin Total GWD
            if (subbasinChartId == naviTabLevelId[2] + "-3-2-0-" + subbasinId) { // draw annual
                var k = 0;
				if (subbasinId == 801) {
					drawTotalGWDBarChart(jsonBasin, k, 11);
				} else {
					drawTotalGWDStackedBarChart(jsonSubbasin, k, subbasinId);
				}
            }
            if (subbasinChartId == naviTabLevelId[2] + "-3-2-1-" + subbasinId) { // draw peak
                var k = 1;
                drawTotalGWDStackedBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-3-2-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawTotalGWDStackedBarChart(jsonSubbasin, k, subbasinId);
            }

            // Subbasin Total Non-consumptive Demand
            if (subbasinChartId == naviTabLevelId[2] + "-3-3-0-" + subbasinId) { // draw annual
                var k = 0;
                drawTotalNonConsumptionDemandCombinationChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-3-3-1-" + subbasinId) { // draw peak
                var k = 1;
                drawTotalNonConsumptionDemandCombinationChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-3-3-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawTotalNonConsumptionDemandCombinationChart(jsonSubbasin, k, subbasinId);
            }

            // Subbasin Demand NET SURFACE WATER LOSS
            if (subbasinChartId == naviTabLevelId[2] + "-3-4-0-" + subbasinId) { // draw annual
                var k = 0;
                drawNetSurfaceWaterLossBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-3-4-1-" + subbasinId) { // draw peak
                var k = 1;
                drawNetSurfaceWaterLossBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-3-4-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawNetSurfaceWaterLossBarChart(jsonSubbasin, k, subbasinId);
            }

            // Nature and Extent of Use
            // Subbasin Average Total Demand by Category
            if (subbasinChartId == naviTabLevelId[2] + "-4-0-0-" + subbasinId) { // draw annual
                addMultiPieChartsLayout();
				if (subbasinId == 801) {
					drawRepubAverageTotalDemandByCategory(jsonBasin, 11);
				} else {
					drawAverageTotalDemandByCategory(jsonSubbasin, subbasinId);
				}
            }
            // Subbasin Irrigated Acres
            if (subbasinChartId == naviTabLevelId[2] + "-4-1-0-" + subbasinId) { // draw annual
				if (subbasinId == 801) {
					drawIrrigatedAcresStackedBarChart(jsonBasin, 11);
				} else {
					drawIrrigatedAcresStackedBarChart(jsonSubbasin, subbasinId);
				}
            }

            // Balance
            // Subbasin Season Annual
            if (subbasinChartId == naviTabLevelId[2] + "-5-0-0-" + subbasinId) { // draw annual
                var k = 0;
				if (subbasinId == 801) {
					drawBalanceAnnualBarChart(jsonBasin, k, 11);
				} else {
					drawBalanceAnnualBarChart(jsonSubbasin, k, subbasinId);
				}
            }
            if (subbasinChartId == naviTabLevelId[2] + "-5-0-1-" + subbasinId) { // draw peak
                var k = 1;
                drawBalanceAnnualBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-5-0-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawBalanceAnnualBarChart(jsonSubbasin, k, subbasinId);
            }
            // Subbasin Season 6 ~ 8
            if (subbasinChartId == naviTabLevelId[2] + "-5-1-0-" + subbasinId) { // draw annual
                var k = 0;
                drawBalancePeakBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-5-1-1-" + subbasinId) { // draw peak
                var k = 1;
                drawBalancePeakBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-5-1-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawBalancePeakBarChart(jsonSubbasin, k, subbasinId);
            }
            // Subbasin Season 9 ~ 5
            if (subbasinChartId == naviTabLevelId[2] + "-5-2-0-" + subbasinId) { // draw annual
                var k = 0;
                drawBalanceNonPeakBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-5-2-1-" + subbasinId) { // draw peak
                var k = 1;
                drawBalanceNonPeakBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinChartId == naviTabLevelId[2] + "-5-2-2-" + subbasinId) { // draw non-peak
                var k = 2;
                drawBalanceNonPeakBarChart(jsonSubbasin, k, subbasinId);
            }
            if (subbasinId != 0) {
                startSubbasinCSVgenerator(Id + "-" + leftRangeId);
            }
        }
    }
});
