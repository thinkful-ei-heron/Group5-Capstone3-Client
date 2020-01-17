const currTime = Date.now();

function _parseTree(data, level, browser) {
	const indent = '	'.repeat(level);

	return data.map(node => {
		if (node.hasOwnProperty('contents')) {
			const { add_date, last_modified, title, contents } = node;
			const nextNode = _parseTree(contents, level + 1, browser);

			switch (browser) {
				case 'chrome':
				case 'firefox':
					return `${indent}<DT><H3 ADD_DATE="${add_date}" LAST_MODIFIED="${last_modified}">${title}</H3>
${indent}<DL><p>
${nextNode}${indent}</DL><p>
`;
				case 'safari':
					return `${indent}<DT><H3 FOLDED>${title}</H3>
${indent}<DL><p>
${nextNode}${indent}</DL><p>
`;
				default:
					return 'Something went wrong!'
			}

		}
		else {
			const { url, add_date, icon, title, tags } = node;
			const iconInsert = icon === undefined ? '' : ` ICON="${icon}"`;
			const tagInsert = tags === undefined ? '' : ` TAGS="${tags}"`;
			switch (browser) {
				case 'chrome':
				case 'firefox':
					return `${indent}<DT><A HREF="${url}" ADD_DATE="${add_date}"${iconInsert}${tagInsert}>${title}</A>
`;
				case 'safari':
					return `${indent}<DT><A HREF="${url}">${title}</A>
`;
				default:
					return 'Something went wrong!';
			}
		};
	}).join('');
}

function generateHTML(data, browser) {
	let output = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
`;
	switch (browser) {
		case 'chrome':
		case 'firefox':
			output += `<!-- This is an automatically generated file.
	 It will be read and overwritten.
	 DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
`;
			if (browser === 'firefox') {
				output += `<H1>Bookmarks Menu</H1>
<DT><H3 ADD_DATE="${currTime}" LAST_MODIFIED="${currTime}">Imported</H3>
`;
			}
			else {
				output += `<H1>Bookmarks</H1>
`;
			}

			output += `<DL><p>
` + data.map(node => {
				if (node.ns_root === 'toolbar' || node.ns_root === 'unsorted') {
					const folderType = node.ns_root === 'toolbar'
						? `PERSONAL_TOOLBAR_FOLDER="true">Bookmarks Toolbar`
						: `UNFILED_BOOKMARKS_FOLDER="true">Other Bookmarks`
					return `	<DT><H3 ADD_DATE="${node.add_date}" LAST_MODIFIED="${node.last_modified}" ${folderType}</H3>
	<DL><p>
` + _parseTree(node.contents, 2, browser) + `	</DL><p>
`;
				}
				else return _parseTree(node.contents, 1, browser);
			}).join('') + `<DL>`;
			if (browser === 'chrome') output += `<p>`;
			else if (browser === 'firefox') output += `
</DL><p>`;
			break;

		case 'safari':
			output += `	<HTML>
	<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
	<Title>Bookmarks</Title>
	<H1>Bookmarks</H1>
` + data.map(node => {
				return _parseTree(node.contents, 1, browser);
			}).join('') + `</HTML>`;
			break;

		default:
			output = 'Something went wrong!';
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