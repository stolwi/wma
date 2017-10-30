
// This is more complicated - must only hide if NO tags are checked.
var hideByTag = function(tag) {

	// For each section that currently has this tag,
	$("section." + tag).each( function(index) {
		var classList = $(this).attr('class').split(/\s+/); // Get a list of classes
		for (var i = 0; i < classList.length; i++) {
			// Look for a element with this ID - if it's checked, then we won't hide it
			var inputElem = $("#" + classList[i]);
			if (inputElem && inputElem.is(':checked')) {
				console.log("Skipping hide by tag because of " + classList[i])
				return; // 
			}
		}
		// We got here, so no tags for this section are currently checked.
		console.log("hiding by tag", tag);
		$(this).hide();
	});
}

var showHideByTag = function(elem) {
	if (elem.id) {
		var tag = elem.id;
		if (elem.checked) {
			console.log("Showing by tag", tag);
			$("section." + tag).show();
		} else {
			hideByTag(tag);
		}
	} else {
		console.log("No id for element", elem);
	}

}

var populateWhoList = function() {

	for (var i = 0; i < whoList.length; i++)
	{
		var item = whoList[i];
		var label = whoList[i].replace('_',' ');
		var str = "<input type='checkbox' id='" + item + "' checked onclick=\"showHideByTag(this)\">" + label + "</input>"
		$("#wholist").append("<td>" + str + "</td>");
	}
}

var populateBandEnsembles = function() {

	for (var i = 0; i < bandEnsembleList.length; i++)
	{
		var item = bandEnsembleList[i];
		var label = bandEnsembleList[i].replace('_',' ');
		var str = "<input type='checkbox' id='" + item + "' checked onclick=\"showHideByTag(this)\">" + label + "</input>"
		$("#bandensemblelist").append("<td>" + str + "</td>");
	}
}

var populateChoralEnsembles = function() {

	for (var i = 0; i < choralEnsembleList.length; i++)
	{
		var item = choralEnsembleList[i];
		var label = choralEnsembleList[i].replace('_',' ');
		var str = "<input type='checkbox' id='" + item + "' checked onclick=\"showHideByTag(this)\">" + label + "</input>"
		$("#choralensemblelist").append("<td>" + str + "</td>");
	}
}

var formatDate = function(dt) {
	return dt.getMonth() + "/" + dt.getDate() + "/" + dt.getFullYear();
}

var formatWhere = function(where) {
	if (where) {
		return " - " + where;
	}
	return "";
}

var populateEvents = function() {


	for (var i = 0; i < eventList.length; i++)
	{
		var event = eventList[i];
		var dateline = "<span class='dateline'>" + formatDate(event.when) + formatWhere(event.where) + "</span>";
		var title = "<span class='eventtitle'>" + event.title + "</span>";
		var header = "<div>" + title + dateline + "</div>";
		var body = "<div class='eventbody'>" + event.what + "</div>";
		var tags = event.tagList.join(" ");
		var str = "<section class='" + tags + "'>" + header + body + "</section>";
		$("#eventlist").append(str);
	}
}

var reloadData = function() {

	retrieveCategories();
	populateWhoList();
	populateBandEnsembles();
	populateChoralEnsembles();

	retrieveEvents();
	populateEvents();
}

reloadData();