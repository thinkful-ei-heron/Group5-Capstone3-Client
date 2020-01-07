const path = require('path')
const bmParser = require('bookmark-parser')
const testFile = path.join(__dirname, '/bookmarks.html')

// Read from (NETSCAPE/Firefox) bookmark HTML file
/*
  BMParser.readFromHTMLFile(htmlFilePath)
    .then(res => { ... });
*/

// Read from (NETSCAPE/Firefox) bookmark HTML file and export
/*
  BMParser.readFromHTMLFile(htmlFilePath, exportFilePath)
    .then(res => { ... });
*/

module.exports = bmParser