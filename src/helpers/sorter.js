function _getDomainExtended(str) {
	const domainStart = str.search(/[.]/);
	return str.substring(domainStart + 1);
}

function _getDomain(str) {
	const domainExt = _getDomainExtended(str);
	const domainEnd = domainExt.search(/[/]/);
	if (domainEnd === -1) return domainExt;
	return domainExt.substring(0, domainEnd);
}

function _makeFolder(title) {
	return {
		type: 'folder',
		title,
		add_date: Date.now(),
		last_modified: Date.now(),
		ns_root: null,
		contents: []
	}
}

function sortTitle(arr) {
	return arr.sort((a, b) => (a.title > b.title) ? 1 : -1);
}

function sortDomain(arr) {
	const firstSort = arr.sort((a, b) => (a.url > b.url) ? 1 : -1)
	return firstSort.sort((a, b) => (_getDomainExtended(a.url) > _getDomainExtended(b.url)) ? 1 : -1)
}

function sortIntoFolders(arr) {
	const list = sortDomain(arr);
	const output = [];

	for (let i = 0; i < arr.length; i++) {
		const domain = _getDomain(list[i].url);

		if (output.length === 0 || output.slice(-1)[0].title !== domain) output.push(_makeFolder(domain));
		output.slice(-1)[0].contents.push(list[i]);
	}
	return output;
}

function sortNewestFirst(arr) {
	return arr.sort((a, b) => (a.add_date > b.add_date) ? 1 : -1);
}

function sortOldestFirst(arr) {
	return arr.sort((a, b) => (a.add_date < b.add_date) ? 1 : -1);
}

module.exports = {
	sortTitle,
	sortDomain,
	sortIntoFolders,
	sortNewestFirst,
	sortOldestFirst
}