const {
  handleHomeRoute,
  handlePublic,
  handleAutoCompleteQuery,
  handleSubmit
} = require("./handlers");

const router = (request, response) => {
  const url = request.url;

  //If you find any directories or files, execute one or more of the handler functions
  if (url === "/") {
    handleHomeRoute(request, response, url);

    //If you find a match - or rather, if you don't find a non-match - for the `public` directory, handle the request to that dir and send a response; do the same for the `submit` function and the query in the autocomplete form
  } else if (url.indexOf("/public/") !== -1) {
    handlePublic(request, response, url);
  } else if (url.indexOf("&submit=true") !== -1) {
    handleSubmit(request, response, url);
  } else if (url.indexOf("?q=") !== -1) {
    handleAutoCompleteQuery(request, response, url);
  } else {
    response.writeHead(404, "Content-Type: text/html");
    response.end("<h1>404 Not Found - Beached As! 🐳 </h1>");
  }
};

module.exports = router;
