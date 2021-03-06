// initialize the help popover icon for giving help with factor typing
$(function () {
	$("#factorTypeHelp").popover({trigger: 'hover', placement:'bottom', html : true });  
}); 


var colorMap = {
	"red"     : "rgb(255, 204, 153)",	
	"blue"   : "rgb(153, 204, 255)",
	"gray"   : "rgb(208, 208, 208)",
	"purple" : "rgb(204, 153, 204)",
	"yellow" : "rgb(255, 255, 0)",
	"white"  : "rgb(255, 255, 255)"
};


// initialize the tag manager
jQuery(".tm-input").tagsManager({hiddenTagListName: "answerTagsHidden"});

$("#listButton").remove();
$("#submitAnswersButton").text("Submit your answers");

// split the paragraph into words
/*var split_words = $("#par").text().replace(/\b(\w+?)\b/g, '<span class="word">$1</span>');
$("#par").html(split_words);
*/
var words = $("#par").text().split(" ");
$("#par").empty();
$.each(words, function(i, v) {
		if (v.charAt(v.length - 1) == ",") {
			$("#par").append(" ");
			$("#par").append($("<span class=\"word\">").text(v.substring(0, v.length - 1)));
			$("#par").append(", ");
		}
		else if (v.charAt(v.length - 1) == ".") {
			$("#par").append(" ");
			$("#par").append($("<span class=\"word\">").text(v.substring(0, v.length - 1)));
			$("#par").append(". ");
		}
		else if (v.charAt(v.length - 1) == "!") {
			$("#par").append(" ");
			$("#par").append($("<span class=\"word\">").text(v.substring(0, v.length - 1)));
			$("#par").append("! ");
		}
		else if (v.charAt(v.length - 1) == "?") {
			$("#par").append(" ");
			$("#par").append($("<span class=\"word\">").text(v.substring(0, v.length - 1)));
			$("#par").append("? ");
		}
		else if (v.charAt(v.length - 1) == ";") {
			$("#par").append(" ");
			$("#par").append($("<span class=\"word\">").text(v.substring(0, v.length - 1)));
			$("#par").append("; ");
		}
		else {
			$("#par").append(" ");
    	$("#par").append($("<span class=\"word\">").text(v));
			$("#par").append(" ");
    }
});

var i = 0;
var w = $("#par").find("span").each(function() {
	$(this).attr("id", i++);
});

for (var i = 0; i < term1.length; i++) {
	$("#par").find("span[id='" + term1[i] + "']").each(function() {
		$(this).css("background-color", colorMap["blue"]);
		if (i > 0) term1Expl += " ";
		term1Expl += $(this).text();
	});
}
for (var i = 0; i < term2.length; i++) {
	$("#par").find("span[id='" + term2[i] + "']").each(function() {
		$(this).css("background-color", colorMap["blue"]);
		if (i > 0) term2Expl += " ";
		term2Expl += $(this).text();
	});
}


/*
** Select a new type of factor
*/
function changeSelectedFactorType(index) {
	fInd = index;
	
	var i = 0;
	for (var i = 0; i < fTypes.length; i++) {
		if (i == fInd) {
			fType = fTypes[i];
			document.getElementById('selectedFactorDropdown').innerHTML = fType;
		}
	}
	
	// change help box
	$("#factorTypeHelp").attr("data-content", "Example solution: <div class=\"pop-inner\">" + " " + "</div>");
	$("#factorTypeHelp").attr("data-original-title", " ");
	
	// change example box
	//$("div.accordion-inner").html(fTypesExample[fType]);
	
	timeFactorStart = new Date();
}

function createFactorDialog() {
	fInd = 0;
	var i = 0;
	var factorTypesHTML = "";
	
	var i = 0;
	for (var i = 0; i < fTypes.length; i++) {
		if (i == fInd) {
			fType = fTypes[i];
			document.getElementById('selectedFactorDropdown').innerHTML = fType;
		}
		factorTypesHTML = factorTypesHTML + "<li><a href=\"#\" onclick=\"factorTypeSelect(" + i + ")\" id=\"" + fTypes[i].replace(' ', '-') + "\">" + fTypes[i] + "</a></li>";
	}
	
	$('#factorTypesDropdown').html(factorTypesHTML);
	
	// change help box
	$("#factorTypeHelp").attr("data-content", "Example solution: <div class=\"pop-inner\">" + " " + "</div>");
	$("#factorTypeHelp").attr("data-original-title", " ");
	//alert($("#factorTypeHelp").attr("data-content"));
	
	// change example box
	//$("div.accordion-inner").html();
	
	timeFactorStart = new Date();
}

function makeStruct(names) {
  var names = names.split(' ');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}

function alreadySubmitted() {
	if (document.getElementById("submitAnswersButton").disabled == true) {
		return true;
	}
	return false;
}

function createHiddenInput(iName, iVal) {
	var input = document.createElement("input");
	input = document.createElement("input");
	input.setAttribute("type", "hidden");
	input.setAttribute("name", iName);
	input.setAttribute("value", iVal);
	return input;
}




