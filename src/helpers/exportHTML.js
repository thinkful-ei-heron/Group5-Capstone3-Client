function generateChrome(data) {
	const _parseTree = (data, level) => {
		const indent = '	'.repeat(level);

		output += data.map(node => {
			const { add_date, last_modified, title } = node;
			if (node.type === 'folder') {
				return `${indent}<DT><H3 ADD_DATE="${add_date}" LAST_MODIFIED="${last_modified}">${title}</H3>
${indent}<DL><p>
`;
			}
			else return ``;
		}).join('');
	}

	const { add_date, last_modified, contents } = data[0];
	let output = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
	It will be read and overwritten.
	DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
	<DT><H3 ADD_DATE="${add_date}" LAST_MODIFIED="${last_modified}" PERSONAL_TOOLBAR_FOLDER="true">Bookmarks Bar</H3>
	<DL><p>
`;

	_parseTree(contents, 2);

	output += `</DL><p>`;
	return output;
}

export default function exportHTML(data) {
	if (!data) return; // todo: error msg

	let outputFile = null;
	const _makeDownloadLink = (file) => {
		if (outputFile !== null) {
			window.URL.revokeObjectURL(outputFile);
		}
		return window.URL.createObjectURL(file);
	}

	const msg = generateChrome(data); // todo: refactor into switch statement for selecting browser format
	const output = new Blob([msg], { type: 'text/html' });
	const filename = 'test-export';

	const download = document.createElement('a');
	download.download = filename;
	const link = _makeDownloadLink(output);

	if (window.webkitURL != null) download.href = link;
	else {
		download.href = link;
		download.style.display = "none";
		document.body.appendChild(download);
	}

	return download.click();
}