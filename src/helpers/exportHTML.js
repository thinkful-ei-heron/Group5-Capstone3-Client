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
					else return `${indent}<DT><A HREF="${url}" ADD_DATE="${add_date}" ICON="${icon}">${title}</A>
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
<!-- This is an automatically generated file.
	 It will be read and overwritten.
	 DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
`;
	switch (browser) {
		case 'firefox':
			output += `<H1>Bookmarks Menu</H1>

`;
			break;
		default:
			output += `<H1>Bookmarks</H1>
`;
	}
	output += `<DL><p>
	<DT><H3 ADD_DATE="${data[0].add_date}" LAST_MODIFIED="${data[0].last_modified}" PERSONAL_TOOLBAR_FOLDER="true">Bookmarks Bar</H3>
	<DL><p>
`;

	output += _parseTree(data[0].contents, 2, browser);
	output += `	</DL><p>
`;

	switch (browser) {
		case 'firefox':
			// output += 
			output += `<DT><H3 ADD_DATE="${data[1].add_date}" LAST_MODIFIED="${data[1].last_modified}" UNFILED_BOOKMARKS_FOLDER="true">Other Bookmarks</H3>`
			output += _parseTree(data[1].contents, 1, browser);
			break;
		default:
			output += _parseTree(data[1].contents, 1, browser);
	}

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

	const msg = generateHTML(data, 'firefox');
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