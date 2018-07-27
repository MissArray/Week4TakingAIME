// (function() {
const form = document.getElementById("form");
const submitButton = document.getElementById("submit-button");
const searchBox = document.getElementById("input");
const resultDiv = document.getElementById("result");
const modalBG = document.getElementById("modal-bg");
const closeButton = document.getElementById("close-button");
var textInput = "";
const emojiNameContainer = document.getElementById("emoji-name");
const emojiImageContainer = document.getElementById("emoji-image");
const emojiMarkdownContainer = document.getElementById("emoji-markdown");

    // Listen for changes in the search-box; assign the value of the search-box, i.e. whatever is typed in it, to the text input variable, which was defined as an emptry string.
    //Make an API request. 
    //Q: the 2nd parameter is set to false. Does that mean, place an empty string in each `option` field if no API request is being made?
    //Put into an array the value, i.e. contents, of the `data` retrieved from the database as a match for the typed input.
    //Access each option (`forEach`) with the querySelector and set its value to an empty string.
    //Go through the array that contains the input data (`for` loop) and place in each `option` field the contents of the respective index position in the array. E.g. if you find 'Great' at [0] and 'Green' at [1], place 'Great' in the first and second `option` fields respectively.
searchBox.addEventListener("input", function() {
  textInput = searchBox.value;
  apiRequest(textInput, false, function(data) {
    var autocompleteArray = data;
    var optionsList = document.querySelectorAll("option");
    optionsList.forEach(option => {
      option.value = "";
    });
    for (i = 0; i < autocompleteArray.length; i++) {
      var optionID = document.getElementById(i);
      optionID.value = autocompleteArray[i];
    }
  });
});

    //Listen for changes in the `submit` button. If it is clicked, trigger an API request and return a response depending on what `data` that input matches.
    //If there's no match between `data` and input, return a message, otherwise get all the properties of the matched `data` object and create a new node for each property that will contain the value of that property.
    //Q: in all the `while` functions, do we essentially destroy and rebuild the original container so that we can display the name/image/MD value?
submitButton.addEventListener("click", function() {
  textInput = searchBox.value;
  apiRequest(textInput, true, function(data) {
    if (data == "sorry no emoji :(") {
      emojiNameContainer.textContent = data;
    } else {
      var emojiName = document.createTextNode(data[0].name);
      var emojiMarkdown = document.createTextNode(
        "Markdown = " + data[0].markdown.join(", ")
      );
      var emojiSymbol = document.createTextNode(data[0].emoji);

      while (emojiNameContainer.firstChild) {
        emojiNameContainer.removeChild(emojiNameContainer.firstChild);
      }
      emojiNameContainer.appendChild(emojiName);

      while (emojiImageContainer.firstChild) {
        emojiImageContainer.removeChild(emojiImageContainer.firstChild);
      }
      emojiImageContainer.appendChild(emojiSymbol);

      while (emojiMarkdownContainer.firstChild) {
        emojiMarkdownContainer.removeChild(emojiMarkdownContainer.firstChild);
      }
      emojiMarkdownContainer.appendChild(emojiMarkdown);
    }
  });
  modalBG.style.display = "block";
});

    //Listen for a click on the modal and hide it when it is clicked?
closeButton.addEventListener("click", function() {
  modalBG.style.display = "none";
});

    //Need to read again about the Heroku app.
    //On JSON.stringify: https://alligator.io/js/json-parse-stringify/
var apiRequest = function(query, submit, callback) {
  query = query.split(" ").join("+");
  var xhr = new XMLHttpRequest();
  var url =
    "https://obscure-shore-44689.herokuapp.com/?q=" +
    query +
    "&submit=" +
    JSON.stringify(submit);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      return callback(data);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};
