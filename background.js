/* This runs after a web page loads */

// Get the html "a" elements which is inside span of class "titleline"
var links = document.querySelectorAll("span.titleline a");

// for each link, when it is hovered over for 1 second, console.log the link's href
for (var i = 0; i < links.length; i++) {
  console.log("here")
    links[i].addEventListener("mouseover", function() {
        console.log(this.href);
    });
}

// assign the links back to the html "a" elements
document.querySelectorAll("span.titleline a") = links;