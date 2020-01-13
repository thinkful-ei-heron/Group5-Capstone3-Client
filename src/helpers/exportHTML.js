function generateChrome(data) {
	let level = 0;
	let output = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
	It will be read and overwritten.
	DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
	<DT><H3 ADD_DATE="${data[0].add_date}" LAST_MODIFIED="${data[0].last_modified}" PERSONAL_TOOLBAR_FOLDER="true">Bookmarks Bar</H3>`;



	return output;
}

export default function exportHTML(data) {
	if (!data) return; // todo: error msg

	let outputFile = null;
	const makeDownloadLink = (file) => {
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
	const link = makeDownloadLink(output);

	if (window.webkitURL != null) download.href = link;
	else {
		download.href = link;
		// download.onClick = document.body.removeChild(event.target)
		download.style.display = "none";
		document.body.appendChild(download);
	}

	return download.click();
}