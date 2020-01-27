import { eachSeries } from "async";
const parsers = [];

// load parsers

parsers.push(require("./parsers/netscape.js"));

export default function(html, callback) {
  eachSeries(
    parsers,
    function(parser, next) {
      parser.canParse(html, function(err, can) {
        // ignore error check
        if (!can) {
          return next();
        }
        parser.parse(html, function(err, bookmarks) {
          if (err) {
            return callback(err);
          }
          callback(null, {
            parser: parser.name,
            bookmarks: bookmarks
          });
        });
      });
    },
    () => {
      callback(new Error("can not parse by any of the parsers"));
    }
  );
}
