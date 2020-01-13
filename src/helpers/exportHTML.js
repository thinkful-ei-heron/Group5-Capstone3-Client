export default function exportHTML(data) {
	let outputFile = null;
	const makeDownloadLink = (data) => {
		if (outputFile !== null) {
			window.URL.revokeObjectURL(outputFile);
		}
		return window.URL.createObjectURL(data);
	}

	const msg = '<h1>Hello world!</h1>';
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