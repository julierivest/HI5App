// Flash alerts timeout
$(document).ready(function() {
  $(".alert" ).delay(2000).fadeOut(500);
})

// New project toggle actual effort dropdown
$(document).ready(function() {
  var el = $("#actualEffortForm")
  $(".form-status").change(function() {
    if ($("#statusCompletedSelected").prop("checked")) {
      console.log("HERE 1")
      el.toggle()
    } else {
      el.hide()
    }
  })
  $("#statusCompletedSelected").change();
})
