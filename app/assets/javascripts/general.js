// Flash alerts timeout
$(document).ready(function() {
  $(".alert" ).delay(1000).fadeOut(500);
})

// New project toggle actual effort dropdown
$(document).ready(function() {
  var el = $("#actualEffortForm")
  $(".form-status").change(function() {
    if ($("#statusCompletedSelected").prop("checked")) {
      el.toggle()
    } else {
      el.hide()
    }
  })
  $("#statusCompletedSelected").change();
})
