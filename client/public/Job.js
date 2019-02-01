function searchJob() {
  var keyword = document.getElementById("keyword").value;
  var location = document.getElementById("location").value;

  // alert(keyword);
  $.ajax({
    type: "POST",
    url: "http://localhost:8000/input/",
    dataType: "json",
    data: {
      keyword: keyword,
      location: location,
    },
    success: function(result){
    }
  });

}
