if (document.getElementById("kitSelection") != undefined)
{
  $("#kitSelection").validate({
    errorPlacement: 
    function(error, element) 
    {
      error.appendTo(element.parent().parent());
    }
  });
  
  $("#minusButton").click(
    function() 
    {
      if($("#kitCount").val() < 1) {
        $("#kitCount").val(1);
      }
    }
  );
  
  $("#kitSelection").submit(function( event ) 
  {
    if ($("#kitSelection").valid())
    {
      var kitCount = $("#kitCount").val();
      window.location.href = "../details?role=Athlete&kitCount="+kitCount;
      event.preventDefault();
    }
  });
}
