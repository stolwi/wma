
var xmlhttp;
var whoList;
var bandEnsembleList;
var choralEnsembleList;
var eventList;

if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

var remotePrefix = "";

var loadXmlFile = function(docName) {

	xmlhttp.open("GET",remotePrefix + docName,false);
	xmlhttp.send();
	return xmlhttp.responseXML;
}

var getStringsFrom = function(xmlNode, elementName) {
	var nodeList = xmlNode.getElementsByTagName(elementName);
	var array = [];
	for (var i = 0; i < nodeList.length; i++) {
		var raw = nodeList[i].childNodes[0].nodeValue;
		if (raw) {
			array.push(raw.replace(" ", "_"));
		}
	}
	return array;
}

var retrieveCategories = function() {

	var xmlDoc = loadXmlFile("categories.xml");

	whoList = getStringsFrom(xmlDoc, "who");
	bandEnsembleList = getStringsFrom(xmlDoc.getElementsByTagName("band")[0], "ensemble");
	choralEnsembleList = getStringsFrom(xmlDoc.getElementsByTagName("choral")[0], "ensemble");
}

var parseSingleEvent = function(xmlNode) {
	var event = {};

	event.title = xmlNode.getElementsByTagName("title")[0].childNodes[0].nodeValue;
	event.what = xmlNode.getElementsByTagName("what")[0].innerHTML;
	event.where = xmlNode.getElementsByTagName("where")[0].innerHTML;
	event.when = new Date(Date.parse(xmlNode.getElementsByTagName("when")[0].childNodes[0].nodeValue))
	event.tagList = getStringsFrom(xmlNode, "who").concat(getStringsFrom(xmlNode, "ensemble"));
	return event;
}

var parseEvents = function(xmlDoc) {
	var nodeList = xmlDoc.getElementsByTagName("event");
	var array = [];

	for (var i = 0; i < nodeList.length; i++) {
		array.push(parseSingleEvent(nodeList[i]));
	}
	array.sort(function(a,b) { return a.when - b.when; });
	return array;
}

var retrieveEvents = function() {
	var xmlDoc = loadXmlFile("events.xml");
	eventList = parseEvents(xmlDoc);
}