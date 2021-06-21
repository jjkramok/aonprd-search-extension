browser.omnibox.setDefaultSuggestion({
	description: `Search AoN PRD for you term`
});

// Searches AoN PRD for the term/text after the omnibox key based on new tab settings in the browser.
browser.omnibox.onInputEntered.addListener((text, disposition) => {
	let filters = "Filter=111111111111111111";
	let searchTerm = text;
	if (specificSearch(text)) {
		filters = setFilters(text);
		searchTerm = searchTerm.split(" ");
		searchTerm.shift();
		searchTerm = searchTerm.join(" ");
	}
	let url = `https://aonprd.com/Search.aspx?Query=${searchTerm}&${filters}&AllTerms=True&OneLine=False&ExcludeAPModule=False&PFSLegalOnly=False`;
	switch (disposition) {
		case "currentTab":
		  browser.tabs.update({url});
		  break;
		case "newForegroundTab":
		  browser.tabs.create({url});
		  break;
		case "newBackgroundTab":
		  browser.tabs.create({url, active: false});
		  break;
	}
});

// whether the search term is for one category or all
function specificSearch(text) {
	var firstWord = text.split(" ")[0];
	for (const [key, value] of Object.entries(filterCategories)) {
		if (key.indexOf(firstWord.toLowerCase()) >= 0) {
			return true;
		}
	}
	return false;
}

// If first word in 'text' matches a category, search only in that category
function setFilters(text) {
	var firstWord = text.split(" ")[0];
	for (const [key, value] of Object.entries(filterCategories)) {
		if (key.indexOf(firstWord.toLowerCase()) >= 0) {
			return `Filter=${filterCategories[key]}`;
		}
	}
	return "Filter=111111111111111111";
	//num.toString(2) //writes number (base 10) as a binary string (e.g. 15 as "1111")
}

// string and the filter bit associated with it.
var filterCategories = {
	afflictionshazards: "100000000000000000",
	archetypes: 		"010000000000000000",
	classes: 			"001000000000000000",
	deities: 			"000100000000000000",
	equipment: 			"000010000000000000",
	feats: 				"000001000000000000",
	magicitems: 		"000000100000000000",
	monsters: 			"000000010000000000",
	mythicmaterial: 	"000000001000000000",
	npcs: 				"000000000100000000",
	pets: 				"000000000010000000",
	prestigeclasses: 	"000000000001000000",
	races: 				"000000000000100000",
	rules: 				"000000000000010000",
	skills: 			"000000000000001000",
	spellsrituals: 		"000000000000000100",
	technology: 		"000000000000000010",
	traits: 			"000000000000000001",
}