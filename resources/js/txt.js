// JavaScript Document
// Welcome
var welcomeTxt = "txt/welcome.txt";

// Getting Started txt paths
var gettingStarted = "txt/getting_started.txt";

// State chart explanation txt paths	
var stateChartExplanation = ["txt/chart_description/state/supply.txt",
							 "txt/chart_description/state/demand.txt", 
							 "txt/chart_description/state/nature_and_extent_of_use.txt",
							 "txt/chart_description/state/FTP.txt",
							 "txt/chart_description/state/stream_gaging.txt"];

// Basin Overview txt paths
var overviewHelp = "txt/basin_overview/help.txt";							
var bigBlueOverview = "txt/basin_overview/big_blue.txt";
var elkhornOverview = "txt/basin_overview/elkhorn.txt";
var littleBlueOverview = "txt/basin_overview/little_blue.txt";
var loupOverview = "txt/basin_overview/loup.txt";
var lowerPlatteOverview = "txt/basin_overview/lower_platte.txt";
var missouriTributariesOverview = "txt/basin_overview/missouri_tributaries.txt";
var niobraraOverview = "txt/basin_overview/niobrara.txt";
var republicanOverview = "txt/basin_overview/republican.txt";
var platteOverview = "txt/basin_overview/platte.txt";

// Basin or Subbasin chart explanation txt paths							
var basinChartExplanation = ["txt/chart_description/basin/big_picture.txt",
								"txt/chart_description/basin/supply.txt",
								"txt/chart_description/basin/streamflow.txt",
								"txt/chart_description/basin/demand.txt",
								"txt/chart_description/basin/nature_and_extent_of_use.txt",
								"txt/chart_description/basin/balance.txt"];
								
var repChartExplanation = ["txt/chart_description/basin/republican/big_picture.txt",
								"txt/chart_description/basin/republican/supply.txt",
								"txt/chart_description/basin/republican/streamflow.txt",
								"txt/chart_description/basin/republican/demand.txt",
								"txt/chart_description/basin/republican/nature_and_extent_of_use.txt",
								"txt/chart_description/basin/republican/balance.txt"];
								
// Header and Footer path
var header = "header.html";
var footer = "footer.html";
								
window.onload = function () {
	$("#layout-banner").load(header);
	$("#layout-footer-area").load(footer);
	loadWelcomeGettingStarted();
}
								
function readTextFile(file, textArea)
{
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if(rawFile.readyState == 4) {
			if(rawFile.status == 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				if (textArea != null){
					textArea.innerHTML = allText; // If want to read as text, use: textArea.innerText = allText;
				}
				
			}
		}
	}
	rawFile.send();
}

function loadWelcomeGettingStarted() {
	var welcome = document.getElementById('layout-main-header');
	readTextFile(welcomeTxt, welcome);
	var getStart = document.getElementById('layout-info-paragraph');
	if (getStart) {
		readTextFile(gettingStarted, getStart);
	}
}