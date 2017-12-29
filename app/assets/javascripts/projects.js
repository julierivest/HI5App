$(document).ready(function() {
  console.log("IN FUNC");
  var project = $(".project-header");
  project.hover(function() {
    project.css("border", "red");
  })
})