function generateHTML(data, browser) {
	const _parseTree = (data, level) => {
		output += data.map(node => {
			console.log(node);
			if (node.type === 'folder') {
				const { add_date, last_modified, title, contents } = node;
				const indent = '	'.repeat(level);
				const nextNode = _parseTree(contents, level + 1);

				return `${indent}<DT><H3 ADD_DATE="${add_date}" LAST_MODIFIED="${last_modified}">${title}</H3>
${indent}<DL><p>
${nextNode}
${indent}</DL><p>
`;
			}
			else {
				const { url, add_date, icon, title } = node;
				const indent = '	'.repeat(level + 1);
				return `${indent}<DT><A HREF="${url}" ADD_DATE="${add_date}" ICON="${icon}">${title}</A>
`;
			}
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
	_parseTree(data[1].contents, 0);

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

	const msg = generateHTML(data, 'chrome');
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