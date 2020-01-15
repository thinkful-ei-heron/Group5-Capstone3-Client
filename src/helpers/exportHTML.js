function _parseTree(data, level, browser) {
	const indent = '	'.repeat(level);

	return data.map(node => {
		if (node.type === 'folder') {
			const { add_date, last_modified, title, contents } = node;
			const nextNode = _parseTree(contents, level + 1, browser);

			return `${indent}<DT><H3 ADD_DATE="${add_date}" LAST_MODIFIED="${last_modified}">${title}</H3>
${indent}<DL><p>
${nextNode}${indent}</DL><p>
`;
		}
		else {
			const { url, add_date, icon, title, tags } = node;
			switch (browser) {
				case 'firefox':
					if (tags === undefined) return `${indent}<DT><A HREF="${url}" ADD_DATE="${add_date}" ICON="${icon}">${title}</A>
`;
					else return `${indent}<DT><A HREF="${url}" ADD_DATE="${add_date}" ICON="${icon}" TAGS="${tags}">${title}</A>
`;
				default:
					return `${indent}<DT><A HREF="${url}" ADD_DATE="${add_date}" ICON="${icon}">${title}</A>
`;
			}

		};
	}).join('');
}

function generateHTML(data, browser) {
	let output = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
`;
	if (browser === 'firefox' || 'chrome') {
		output += `<!-- This is an automatically generated file.
	 It will be read and overwritten.
	 DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
`;
		if (browser === 'firefox') {
			output += `<H1>Bookmarks Menu</H1>

`;
		}
		else {
			output += `<H1>Bookmarks</H1>
`;
		}

		output += `<DL><p>
` + data.map(node => {
			let parseOutput = '';
			if (node.ns_root === 'toolbar') {
				parseOutput += `	<DT><H3 ADD_DATE="${node.add_date}" LAST_MODIFIED="${node.last_modified}" PERSONAL_TOOLBAR_FOLDER="true">Bookmarks Toolbar</H3>
	<DL><p>
` + _parseTree(node.contents, 2, browser) + `	</DL><p>
`;
			}
			else if (node.ns_root === 'unsorted') {
				parseOutput += `	<DT><H3 ADD_DATE="${node.add_date}" LAST_MODIFIED="${node.last_modified}" UNFILED_BOOKMARKS_FOLDER="true">Other Bookmarks</H3>
	<DL><p>
` + _parseTree(node.contents, 2, browser) + `	</DL><p>
`;
			}
			else parseOutput += _parseTree(node.contents, 1, browser);

			return parseOutput;
		}).join('');
		output += `<DL>`;
		if (browser === 'chrome') output += `<p>`;
	}

	return output;
}

export default function exportHTML(data, browser) {
	if (!data) return; // todo: error msg

	let outputFile = null;
	const _makeDownloadLink = (file) => {
		if (outputFile !== null) {
			window.URL.revokeObjectURL(outputFile);
		}
		return window.URL.createObjectURL(file);
	}

	const msg = generateHTML(data, browser);
	const output = new Blob([msg], { type: 'text/html' });
	const filename = 'test-export';

	const download = document.createElement('a');
	download.download = filename;
	const link = _makeDownloadLink(output);

	if (window.webkitURL !== null) download.href = link;
	else {
		download.href = link;
		download.style.display = "none";
		document.body.appendChild(download);
	}

	return download.click();
}