// // /*
// // Functions in this file are used for csv & shape files downloading. 
// We encode each basin by its id then create an event listener 
// // for the basin. So when a user triggers a downloading event, he can get the corresponding csv file.
// // */

// /*
// Create download buttons (csv & shapefile)
// */

var downloadPath = "https://nednr.nebraska.gov/media/insight/"; // ShapeFile download path
var SHPpath = [downloadPath+"State.zip", downloadPath+"Basin.zip", downloadPath+"Subbasin.zip"];

function regeneratePortalButtons() {
    var buttonArea = document.getElementById('layout-main-below-left-chart-navi-left');
    buttonArea.innerHTML = "";
    var newLinkTag = document.createElement('a');
    if (levelState == naviTabLevelId[0]) {
        newLinkTag.setAttribute("href", SHPpath[0]);
        
    }
    if (levelState == naviTabLevelId[1]) {
        newLinkTag.setAttribute("href", SHPpath[1]);
        
    }
    if (levelState == naviTabLevelId[2]) {
        newLinkTag.setAttribute("href", SHPpath[2]);
       
    }
	// create shp download button
    var newSHPButton = document.createElement('div');
    newSHPButton.id = "layout-shapefile-download";
    buttonArea.appendChild(newSHPButton);
    newSHPButton.appendChild(newLinkTag);
    var newSHPImg = document.createElement('img');
    newSHPImg.setAttribute("src", "resources/img/shp.png");
    newSHPImg.setAttribute("width", "100%");
    newSHPImg.setAttribute("height", "100%");
    newSHPImg.setAttribute("alt", "");
    newLinkTag.appendChild(newSHPImg);
	// create csv download button
    var newCSVButton = document.createElement('div');
    newCSVButton.id = "layout-generate-csv-button";
    buttonArea.appendChild(newCSVButton);
    var newCSVImg = document.createElement('img');
    newCSVImg.setAttribute("src", "resources/img/csv.png");
    newCSVImg.setAttribute("width", "100%");
    newCSVImg.setAttribute("height", "100%");
    newCSVImg.setAttribute("alt", "");
    newCSVButton.appendChild(newCSVImg);
	//create png download button
    var newPNGButton = document.createElement('div');
    newPNGButton.id = "layout-generate-png-button";
    buttonArea.appendChild(newPNGButton);
    var newPNGImg = document.createElement('img');
    newPNGImg.setAttribute("src", "resources/img/png.png");
    newPNGImg.setAttribute("width", "100%");
    newPNGImg.setAttribute("height", "100%");
    newPNGImg.setAttribute("alt", "");
    newPNGButton.appendChild(newPNGImg);	
	
}

/*
Add corresponding listener for CSV button and PNG button on state level
*/
function startStateCSVgenerator(stateCSVId) {
    if (stateCSVId != csvTmpId) {
        csvTmpId = stateCSVId;
        regeneratePortalButtons();
        // Supply
        // Precipitation Rates and Volumes by Basin
        if (stateCSVId == naviTabLevelId[0] + "-0-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", statePrecipitationRatesVolumesRequest);
			document.getElementById('layout-generate-png-button').addEventListener("click", exportPrecipitationRatesVolumesRequest);
        }
        // Average Basin Water Supply
        if (stateCSVId == naviTabLevelId[0] + "-0-1") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", stateAverageBasinWaterSupplyRequest);
			document.getElementById('layout-generate-png-button').addEventListener("click", exportAverageBasinWaterSupplyRequest);
        }
        // Demand
        // Average Total Demand
        if (stateCSVId == naviTabLevelId[0] + "-1-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", stateAverageTotalDemandRequest);
			document.getElementById('layout-generate-png-button').addEventListener("click", exportAverageTotalDemandRequest);
        }
        // Nature & Extent of Use
        // Demand by Category
        if (stateCSVId == naviTabLevelId[0] + "-2-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", stateAverageTotalDemandByCategoryRequest);
			document.getElementById('layout-generate-png-button').addEventListener("click", exportAverageTotalDemandByCategoryRequest);
        }
        // Irrigated Acres
        if (stateCSVId == naviTabLevelId[0] + "-2-1") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", stateAverageIrrigatedAcresRequest);
			document.getElementById('layout-generate-png-button').addEventListener("click", exportAverageIrrigatedAcresRequest);
        }
    }
}

/*
Add corresponding listener for CSV button and PNG button on basin level
*/
function startBasinCSVgenerator(basinCSVId) {
    if (basinCSVId != csvTmpId || basinId != divisionId) {
        csvTmpId = basinCSVId;
        divisionId = basinId;
        regeneratePortalButtons();
		
        // Big Picture
        // Precipitation Rates and Volumes
        if (basinCSVId == naviTabLevelId[1] + "-1-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", precipitationRatesVolumesRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", precipitationRatesVolumesPNGRequest);
        }
        // Precipitation Distribution
        if (basinCSVId == naviTabLevelId[1] + "-1-1") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", precipitationDistributionRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", precipitationDistributionPNGRequest);
        }
        // Average Precipitation Distribution
        if (basinCSVId == naviTabLevelId[1] + "-1-2") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", averagePrecipitationDistributionRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", averagePrecipitationDistributionPNGRequest);
        }
        // Supply
        // Basin Water Supply
        if (basinCSVId == naviTabLevelId[1] + "-2-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", basinWaterSupplyRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", basinWaterSupplyPNGRequest);
        }
        // Streamflow
        if (basinCSVId == naviTabLevelId[1] + "-2-1") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", streamflowRequest);
			document.getElementById('layout-generate-png-button').addEventListener("click", streamflowPNGRequest);
        }
        // Surface Water Consumption
        if (basinCSVId == naviTabLevelId[1] + "-2-2") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", surfaceWaterConsumptionRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", surfaceWaterConsumptionPNGRequest);
        }
        // Groundwater Depletions
        if (basinCSVId == naviTabLevelId[1] + "-2-3") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", groundwaterDepletionsRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", groundwaterDepletionsPNGRequest);
        }
        // Required Inflows
        if (basinCSVId == naviTabLevelId[1] + "-2-4") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", requiredInflowsRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", requiredInflowsPNGRequest);
        }
		// Streamflow for republican
        if (basinCSVId == naviTabLevelId[1] + "-3-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", repubStreamflowRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", repubStreamflowPNGRequest);
        }		
        // Demand
        // Total Long Term Demand
        if (basinCSVId == naviTabLevelId[1] + "-4-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", totalLongTermDemandRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", totalLongTermDemandPNGRequest);
        }
        // Total Surface Water Demand
        if (basinCSVId == naviTabLevelId[1] + "-4-1") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", totalSurfaceWaterDemandRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", totalSurfaceWaterDemandPNGRequest);
        }
        // Total Groundwater Demand
        if (basinCSVId == naviTabLevelId[1] + "-4-2") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", totalGroundwaterDemandRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", totalGroundwaterDemandPNGRequest);
        }
        // Total Non-consumptive Demand
        if (basinCSVId == naviTabLevelId[1] + "-4-3") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", totalNonConsumptionDemandRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", totalNonConsumptionDemandPNGRequest);
        }
        // Net Surface Water Loss
        if (basinCSVId == naviTabLevelId[1] + "-4-4") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", netSurfaceWaterLossRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", netSurfaceWaterLossPNGRequest);
        }
        // Nature & Extent of Use
        // Average Total Demand by Category
        if (basinCSVId == naviTabLevelId[1] + "-5-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", averageTotalDemandByCategoryRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", averageTotalDemandByCategoryPNGRequest);
        }
        // Irrigated Acres
        if (basinCSVId == naviTabLevelId[1] + "-5-1") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", irrigatedAcresRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", irrigatedAcresPNGRequest);
        }
        // Balance
        if (basinCSVId == naviTabLevelId[1] + "-6-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", balanceSeasonRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", balanceSeasonPNGRequest);
        }
        if (basinCSVId == naviTabLevelId[1] + "-6-1") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", balanceSeasonRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", balanceSeasonPNGRequest);
        }
        if (basinCSVId == naviTabLevelId[1] + "-6-2") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", balanceSeasonRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", balanceSeasonPNGRequest);
        }
    }
}

/*
Add corresponding listener for CSV button and PNG button on subbasin level
*/
function startSubbasinCSVgenerator(subbasinCSVId) {  
    if (subbasinCSVId != csvTmpId || subbasinId != divisionId) {
        csvTmpId = subbasinCSVId;
        divisionId = subbasinId;
        regeneratePortalButtons();
        // Big Picture
        // Precipitation Rates and Volumes
        if (subbasinCSVId == naviTabLevelId[2] + "-0-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", precipitationRatesVolumesRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", precipitationRatesVolumesPNGRequest);
        }
        // Precipitation Distribution
        if (subbasinCSVId == naviTabLevelId[2] + "-0-1") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", precipitationDistributionRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", precipitationDistributionPNGRequest);
        }
        // Average Precipitation Distribution
        if (subbasinCSVId == naviTabLevelId[2] + "-0-2") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", averagePrecipitationDistributionRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", averagePrecipitationDistributionPNGRequest);
        }
        // Supply
        // Basin Water Supply
        if (subbasinCSVId == naviTabLevelId[2] + "-1-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", basinWaterSupplyRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", basinWaterSupplyPNGRequest);
        }
        // Streamflow
        if (subbasinCSVId == naviTabLevelId[2] + "-1-1") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", streamflowRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", streamflowPNGRequest);
        }
        // Surface Water Consumption
        if (subbasinCSVId == naviTabLevelId[2] + "-1-2") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", surfaceWaterConsumptionRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", surfaceWaterConsumptionPNGRequest);
        }
        // Groundwater Depletions
        if (subbasinCSVId == naviTabLevelId[2] + "-1-3") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", groundwaterDepletionsRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", groundwaterDepletionsPNGRequest);
        }
        // Required Inflows
        if (subbasinCSVId == naviTabLevelId[2] + "-1-4") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", requiredInflowsRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", requiredInflowsPNGRequest);
        }
		
		// Streamflow for republican
        if (subbasinCSVId == naviTabLevelId[2] + "-2-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", repubStreamflowRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", repubStreamflowPNGRequest);
        }
		
        // Demand
        // Total Long Term Demand
        if (subbasinCSVId == naviTabLevelId[2] + "-3-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", totalLongTermDemandRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", totalLongTermDemandPNGRequest);
        }
        // Total Surface Water Demand
        if (subbasinCSVId == naviTabLevelId[2] + "-3-1") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", totalSurfaceWaterDemandRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", totalSurfaceWaterDemandPNGRequest);
        }
        // Total Groundwater Demand
        if (subbasinCSVId == naviTabLevelId[2] + "-3-2") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", totalGroundwaterDemandRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", totalGroundwaterDemandPNGRequest);
        }
        // Total Non-consumptive Demand
        if (subbasinCSVId == naviTabLevelId[2] + "-3-3") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", totalNonConsumptionDemandRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", totalNonConsumptionDemandPNGRequest);
        }
        // Net Surface Water Loss
        if (subbasinCSVId == naviTabLevelId[2] + "-3-4") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", netSurfaceWaterLossRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", netSurfaceWaterLossPNGRequest);
        }
        // Nature & Extent of Use
        // Average Total Demand by Category
        if (subbasinCSVId == naviTabLevelId[2] + "-4-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", averageTotalDemandByCategoryRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", averageTotalDemandByCategoryPNGRequest);
        }
        // Irrigated Acres
        if (subbasinCSVId == naviTabLevelId[2] + "-4-1") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", irrigatedAcresRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", irrigatedAcresPNGRequest);
        }
        // Balance
        if (subbasinCSVId == naviTabLevelId[2] + "-5-0") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", balanceSeasonRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", balanceSeasonPNGRequest);
        }
        if (subbasinCSVId == naviTabLevelId[2] + "-5-1") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", balanceSeasonRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", balanceSeasonPNGRequest);
        }
        if (subbasinCSVId == naviTabLevelId[2] + "-5-2") {
            document.getElementById('layout-generate-csv-button').addEventListener("click", balanceSeasonRequest);
            document.getElementById('layout-generate-png-button').addEventListener("click", balanceSeasonPNGRequest);
        }
    }
}

function precipitationRatesVolumesRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab02[0];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab01[0];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            
            for (var i = 0; i < json.length; i++) {
                var element = {
                    Year: json[i].Year,
                    PrecipitationRate_Annual: json[i].PrecipitationRate_Annual,
                    PrecipitationRate_Peak: json[i].PrecipitationRate_Peak,
                    PrecipitationRate_NonPeak: json[i].PrecipitationRate_NonPeak,
                    PrecipitationVolume_Annual: json[i].PrecipitationVolume_Annual,
                    PrecipitationVolume_Peak: json[i].PrecipitationVolume_Peak,
                    PrecipitationVolume_NonPeak: json[i].PrecipitationVolume_NonPeak
                };

                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function precipitationDistributionRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab02[1];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab01[1];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                var element = {
                    Year: json[i].Year,
                    TotalET: json[i].TotalET,
                    TotalRecharge: json[i].TotalRecharge,
                    TotalRunoff: json[i].TotalRunoff
                };
                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function averagePrecipitationDistributionRequest() {
    var title;
    var element;
    var data = [];
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab02[2];
        element = { Basin: basinName, AvgET: AvgET, AvgRecharge: AvgRecharge, AvgRunoff: AvgRunoff };
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab01[2];
        element = { Subbasin: subbasinName, AvgET: AvgET, AvgRecharge: AvgRecharge, AvgRunoff: AvgRunoff };
    }
    data.push(element);
    JSONToCSVConvertor(data, title, true);
}

function basinWaterSupplyRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab03[0];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab02[0];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (basinId != 11) {
                    var element = {
                        Year: json[i].Year,
                        StreamflowAF_Annual: json[i].StreamflowAF_Annual,
                        StreamflowAF_Peak: json[i].StreamflowAF_Peak,
                        StreamflowAF_NonPeak: json[i].StreamflowAF_NonPeak,
                        SWDTotal_Annual: json[i].SWDTotal_Annual,
                        SWDTotal_Peak: json[i].SWDTotal_Peak,
                        SWDTotal_NonPeak: json[i].SWDTotal_NonPeak,
                        GWDP_Annual: json[i].GWDP_Annual,
                        GWDP_Peak: json[i].GWDP_Peak,
                        GWDP_NonPeak: json[i].GWDP_NonPeak,
                        BasinInflows_Annual: json[i].BasinInflows_Annual,
                        BasinInflows_Peak: json[i].BasinInflows_Peak,
                        BasinInflows_NonPeak: json[i].BasinInflows_NonPeak
                    };
                    data.push(element);
                } else {
                    var element = {
                        Year: json[i].Year,
                        SupplyTotal_Annual: json[i].SupplyTotal_Annual,
                        ImportedWaterSupply_Annual: json[i].ImportedWaterSupply_Annual,
                        ResolutionWaterSupply_Annual: json[i].ResolutionWaterSupply_Annual
                    };
                    data.push(element);
                }
                
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function streamflowRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab03[1];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab02[1];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                var element = {
                    Year: json[i].Year,
                    StreamflowAFUncapped_Annual: json[i].StreamflowAFUncapped_Annual,
                    StreamflowAFUncapped_Peak: json[i].StreamflowAFUncapped_Peak,
                    StreamflowAFUncapped_NonPeak: json[i].StreamflowAFUncapped_NonPeak,
                    StreamflowAF_Annual: json[i].StreamflowAF_Annual,
                    StreamflowAF_Peak: json[i].StreamflowAF_Peak,
                    StreamflowAF_NonPeak: json[i].StreamflowAF_NonPeak
                };
                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function surfaceWaterConsumptionRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab03[2];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab02[2];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                var element = {
                    Year: json[i].Year,
                    SWDTotal_Annual: json[i].SWDTotal_Annual,
                    SWDTotal_Peak: json[i].SWDTotal_Peak,
                    SWDTotal_NonPeak: json[i].SWDTotal_NonPeak
                };
                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function repubStreamflowRequest() {
    var url;
    var title;
    url = jsonBasin + basinId;
    title = basinName + " " + basinTab04[0];
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                var element = {
                    Year: json[i].Year,
                    StreamflowAF_Annual: json[i].StreamflowAF_Annual,
                    CanalFlowAF_Annual: json[i].CanalFlowAF_Annual
                };
                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function groundwaterDepletionsRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab03[3];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab02[3];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                var element = {
                    Year: json[i].Year,
                    GWDP_Annual: json[i].GWDP_Annual,
                    GWDP_Peak: json[i].GWDP_Peak,
                    GWDP_NonPeak: json[i].GWDP_NonPeak
                };
                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function requiredInflowsRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab03[4];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab02[4];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                var element = {
                    Year: json[i].Year,
                    BasinInflows_Annual: json[i].BasinInflows_Annual,
                    BasinInflows_Peak: json[i].BasinInflows_Peak,
                    BasinInflows_NonPeak: json[i].BasinInflows_NonPeak
                };
                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function totalLongTermDemandRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab05[0];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab03[0];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (basinId != 11) {
                    var element = {
                        Year: json[i].Year,
                        SWDemandTotal_Annual: json[i].SWDemandTotal_Annual,
                        SWDemandTotal_Peak: json[i].SWDemandTotal_Peak,
                        SWDemandTotal_NonPeak: json[i].SWDemandTotal_NonPeak,
                        GWCTotal_Annual: json[i].GWCTotal_Annual,
                        GWCTotal_Peak: json[i].GWCTotal_Peak,
                        GWCTotal_NonPeak: json[i].GWCTotal_NonPeak,
                        TotalNonConsumptiveUse_Annual: json[i].TotalNonConsumptiveUse_Annual,
                        TotalNonConsumptiveUse_Peak: json[i].TotalNonConsumptiveUse_Peak,
                        TotalNonConsumptiveUse_NonPeak: json[i].TotalNonConsumptiveUse_NonPeak,
                        NetSurfaceWaterLoss_Annual: json[i].NetSurfaceWaterLoss_Annual,
                        NetSurfaceWaterLoss_Peak: json[i].NetSurfaceWaterLoss_Peak,
                        NetSurfaceWaterLoss_NonPeak: json[i].NetSurfaceWaterLoss_NonPeak
                    };
                    data.push(element);
                } else {
                    var element = {
                        Year: json[i].Year,
                        GWDP_Annual: json[i].GWDP_Annual,
                        SWDTotal_Annual: json[i].SWDTotal_Annual
                    };
                    data.push(element);
                }
                
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function totalSurfaceWaterDemandRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab05[1];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab03[1];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                var element = {
                    Year: json[i].Year,
                    SWDemand_Annual: json[i].SWDemand_Annual,
                    SWDemand_Peak: json[i].SWDemand_Peak,
                    SWDemand_NonPeak: json[i].SWDemand_NonPeak,
                    SWDEvaporation_Annual: json[i].SWDEvaporation_Annual,
                    SWDEvaporation_Peak: json[i].SWDEvaporation_Peak,
                    SWDEvaporation_NonPeak: json[i].SWDEvaporation_NonPeak
                };
                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function totalGroundwaterDemandRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab05[2];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab03[2];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                var element = {
                    Year: json[i].Year,
                    GWCIrrigation_Annual: json[i].GWCIrrigation_Annual,
                    GWCIrrigation_Peak: json[i].GWCIrrigation_Peak,
                    GWCIrrigation_NonPeak: json[i].GWCIrrigation_NonPeak,
                    GWCMunicipal_Annual: json[i].GWCMunicipal_Annual,
                    GWCMunicipal_Peak: json[i].GWCMunicipal_Peak,
                    GWCMunicipal_NonPeak: json[i].GWCMunicipal_NonPeak,
                    GWCIndustrial_Annual: json[i].GWCIndustrial_Annual,
                    GWCIndustrial_Peak: json[i].GWCIndustrial_Peak,
                    GWCIndustrial_NonPeak: json[i].GWCIndustrial_NonPeak
                };
                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function totalNonConsumptionDemandRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab05[3];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab03[3];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                var element = {
                    Year: json[i].Year,
                    Hydropower_Annual: json[i].Hydropower_Annual,
                    Hydropower_Peak: json[i].Hydropower_Peak,
                    Hydropower_NonPeak: json[i].Hydropower_NonPeak,
                    BasinOutflows_Annual: json[i].BasinOutflows_Annual,
                    BasinOutflows_Peak: json[i].BasinOutflows_Peak,
                    BasinOutflows_NonPeak: json[i].BasinOutflows_NonPeak,
                    InstreamFlow_Annual: json[i].InstreamFlow_Annual,
                    InstreamFlow_Peak: json[i].InstreamFlow_Peak,
                    InstreamFlow_NonPeak: json[i].InstreamFlow_NonPeak,
                    InducedGWRecharge_Annual: json[i].InducedGWRecharge_Annual,
                    InducedGWRecharge_Peak: json[i].InducedGWRecharge_Peak,
                    InducedGWRecharge_NonPeak: json[i].InducedGWRecharge_NonPeak,
                    TotalNonConsumptiveUse_Annual: json[i].TotalNonConsumptiveUse_Annual,
                    TotalNonConsumptiveUse_Peak: json[i].TotalNonConsumptiveUse_Peak,
                    TotalNonConsumptiveUse_NonPeak: json[i].TotalNonConsumptiveUse_NonPeak
                };
                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function netSurfaceWaterLossRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab05[4];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab03[4];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                var element = {
                    Year: json[i].Year,
                    NetSurfaceWaterLoss_Annual: json[i].NetSurfaceWaterLoss_Annual,
                    NetSurfaceWaterLoss_Peak: json[i].NetSurfaceWaterLoss_Peak,
                    NetSurfaceWaterLoss_NonPeak: json[i].NetSurfaceWaterLoss_NonPeak
                };
                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function averageTotalDemandByCategoryRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab06[0];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab04[0];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if (basinId != 11) {
                    var element = {
                        Year: json[i].Year,
                        SWDemand_Annual: json[i].SWDemand_Annual,
                        SWDemand_Peak: json[i].SWDemand_Peak,
                        SWDemand_NonPeak: json[i].SWDemand_NonPeak,
                        GWCTotal_Annual: json[i].GWCTotal_Annual,
                        GWCTotal_Peak: json[i].GWCTotal_Peak,
                        GWCTotal_NonPeak: json[i].GWCTotal_NonPeak,
                        TotalNonConsumptiveUse_Annual: json[i].TotalNonConsumptiveUse_Annual,
                        TotalNonConsumptiveUse_Peak: json[i].TotalNonConsumptiveUse_Peak,
                        TotalNonConsumptiveUse_NonPeak: json[i].TotalNonConsumptiveUse_NonPeak,
                        NetSurfaceWaterLoss_Annual: json[i].NetSurfaceWaterLoss_Annual,
                        NetSurfaceWaterLoss_Peak: json[i].NetSurfaceWaterLoss_Peak,
                        NetSurfaceWaterLoss_NonPeak: json[i].NetSurfaceWaterLoss_NonPeak
                    };
                    data.push(element);
                } else {
                    var sumDataAnnual1 = 0;
                    var sumDataAnnual2 = 0;
                    for (var i = 0; i < json.length; i++) {
                        sumDataAnnual1 += Number(json[i].GWDP_Annual);
                        sumDataAnnual2 += Number(json[i].SWDTotal_Annual);
                    }
                    var element = {
                        GWDP_Annual_Average: sumDataAnnual1,
                        SWDTotal_Annual_Average: sumDataAnnual2
                    };
                    data.push(element);
                }
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function irrigatedAcresRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTab06[1];
        if(basinId==11) title = basinName + " " + basinTab06_rep[1];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTab04[1];
        if(subbasinId==801){
            title = basinName + " " + basinTab06_rep[1];
            url=jsonBasin + 11;   //json file does not contain the subbasin for Republican.
        }   
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                if(basinId != 11 && subbasinId != 801){
                    var element = {
                        Year: json[i].Year,
                        GWIAcres: json[i].GWIAcres,
                        SWIAcres: json[i].SWIAcres,
                        COIAcres: json[i].COIAcres
                    };
                }else{
                    var element = {
                        Year: json[i].Year,
                        GWIAcres: json[i].GWIAcres,
                        SWIandCOIAcres: json[i].SWIAcres
                    };
                }
                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function balanceSeasonRequest() {
    var url;
    var title;
    if (levelState == naviTabLevelId[1]) {
        url = jsonBasin + basinId;
        title = basinName + " " + basinTabLabel[6];
    }
    if (levelState == naviTabLevelId[2]) {
        url = jsonSubbasin + subbasinId;
        title = subbasinName + " " + subbasinTabLabel[5];
    }
    var xmlhttp = new XMLHttpRequest();
    var data = [];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                var element = {
                    Year: json[i].Year,
                    NearTermBalance_Annual: json[i].NearTermBalance_Annual,
                    NearTermBalance_Peak: json[i].NearTermBalance_Peak,
                    NearTermBalance_NonPeak: json[i].NearTermBalanceNonPeak,
                    LongTermBalance_Annual: json[i].LongTermBalance_Annual,
                    LongTermBalance_Peak: json[i].LongTermBalance_Peak,
                    LongTermBalance_NonPeak: json[i].LongTermBalance_NonPeak,
                    ProjectedLongTermBalance_Annual: json[i].ProjectedLongTermBalance_Annual,
                    ProjectedLongTermBalance_Peak: json[i].ProjectedLongTermBalance_Peak,
                    ProjectedLongTermBalance_NonPeak: json[i].ProjectedLongTermBalance_NonPeak
                };
                data.push(element);
            }
            JSONToCSVConvertor(data, title, true);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    var fileName;
    var CSV = '';
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    CSV += ReportTitle + '\r\n\n';
    if (ShowLabel) {
        var row = "";
        for (var index in arrData[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';
    }
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }
    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    fileName = ReportTitle.replace(/ /g, "_");
    if (navigator.msSaveBlob) { // IE 10+ 
        navigator.msSaveBlob(new Blob([CSV], { type: 'text/csv;charset=utf-8;' }), fileName + ".csv");
    } else {
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        link.id = "csv-download-link";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}



//functions below are to download a png file


function precipitationRatesVolumesPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab02[0];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab01[0];
    }
    save2png(title);
}

function precipitationDistributionPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab02[1];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab01[1];
    }
    save2png(title);
}

function averagePrecipitationDistributionPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab02[2];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab01[2];
    }
    save2png(title);
}

function basinWaterSupplyPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab03[0];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab02[0];
    }
    save2png(title);
}

function streamflowPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab03[1];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab02[1];
    }
    save2png(title);
}

function surfaceWaterConsumptionPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab03[2];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab02[2];
    }
    save2png(title);
}

function repubStreamflowPNGRequest() {
    var title;
    title = basinName + " " + basinTab04[0];
    save2png(title);
}

function groundwaterDepletionsPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab03[3];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab02[3];
    }
    save2png(title);
}

function requiredInflowsPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab03[4];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab02[4];
    }
    save2png(title);
}

function totalLongTermDemandPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab04[0];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab03[0];
    }
    save2png(title);
}

function totalSurfaceWaterDemandPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab04[1];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab03[1];
    }
    save2png(title);
}

function totalGroundwaterDemandPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab04[2];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab03[2];
    }
    save2png(title);
}

function totalNonConsumptionDemandPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab04[3];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab03[3];
    }
    save2png(title);
}

function netSurfaceWaterLossPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab04[4];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab03[4];
    }
    save2png(title);
}

function averageTotalDemandByCategoryPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab05[0];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab04[0];
    }
    save2png(title);
}

function irrigatedAcresPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTab05[1];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTab04[1];
    }
    save2png(title);
}

function balanceSeasonPNGRequest() {
    var title;
    if (levelState == naviTabLevelId[1]) {
        title = basinName + " " + basinTabLabel[6];
    }
    if (levelState == naviTabLevelId[2]) {
        title = subbasinName + " " + subbasinTabLabel[4];
    }
    save2png(title);
} 

function exportPrecipitationRatesVolumesRequest() {
	var title = stateTab01[0];
	save2png(title);
}

function exportAverageBasinWaterSupplyRequest() {
	var title = stateTab01[1];
	save2png(title);	
}

function exportAverageTotalDemandRequest() {
	var title = stateTab02[0];
	save2png(title);	
}

function exportAverageTotalDemandByCategoryRequest() {
	var title = stateTab03[0];
	save2png(title);	
}

function exportAverageIrrigatedAcresRequest() {
	var title = stateTab03[1];
	save2png(title);	
}
// test found chrome and Firefox did not make difference in saving data, 
// updated to use same save2png() function by Wu on 2/25/2022

function save2png(title) {
	var fileName;
	var png = document.getElementById('layout-main-below-left-chart-area').cloneNode(true);

	var div = document.createElement('div');
	div.setAttribute('id', 'png_div');
	var p = document.createElement('p');
	p.style.textAlign="center";
	p.style.fontSize = "20px";
	var textnode1 = document.createTextNode(title);
	var season = document.getElementById('right-range').textContent;
	if(season == "Annual") season += " Total";
	var textnode2 = document.createTextNode(season);
	var watermark = document.createElement('img');
	var date = new Date();
	
	var p2 = document.createElement('p');
	p2.style.textAlign="center";
	var textnode3 = document.createTextNode(date);
	watermark.setAttribute("src", "resources/img/waterMark.PNG");
	watermark.setAttribute("width", "150px");
	div.style.textAlign="center";
	watermark.onload=function(){      //setAttribute() is async
		p.appendChild(textnode1);
		p.appendChild(document.createElement('br'));
		p.appendChild(textnode2);
		div.appendChild(p);
		div.appendChild(png);
		div.appendChild(document.createElement('br'));
		div.appendChild(watermark);
		p2.appendChild(textnode3);
		div.appendChild(document.createElement('br'));
		div.appendChild(document.createElement('br'));
		div.appendChild(document.createElement('br'));
		div.appendChild(p2);
		div.appendChild(document.createElement('br')); //without the last element, p2 cannot show correctly.

		fileName = title.replace(/ /g, "_");
		var filefullname = fileName + ".png";
		document.body.appendChild(div); 
		var domContainer = document.getElementById('png_div');
		domtoimage.toBlob(domContainer).then(function (blob) {    //dom-to-image cannot take cloneNode directly, an extra dom container will be added to the bottom of the page and then delete
			window.saveAs(blob, filefullname);
			domContainer.parentNode.removeChild(domContainer);
			
		});
	};
	
} 




	
