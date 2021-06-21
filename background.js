browser.omnibox.setDefaultSuggestion({
	description: `Search AoN PRD for you term`
});

// Searches AoN PRD for the term/text after the omnibox key based on new tab settings in the browser.
browser.omnibox.onInputEntered.addListener((text, disposition) => {
	let url = `https://aonprd.com/Search.aspx?Query=${text}&Filter=111111111111111111&AllTerms=True&OneLine=False&ExcludeAPModule=False&PFSLegalOnly=False`;
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