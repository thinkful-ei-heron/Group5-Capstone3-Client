const path = require('path')
const bmParser = require('bookmark-parser')
const testFile = path.join(__dirname, '/bookmarks.html')

bmParser.readFromHTMLFile(testFile).then(res=>console.log(res))
