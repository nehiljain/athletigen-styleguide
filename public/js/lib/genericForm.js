if (document.getElementById("#form_invite") != undefined)
{
  $("#form_invite").validate({
    errorPlacement: 
    function(error, element) 
    {
      error.appendTo(element.parent().parent());
    }
  });
  
  $("#form_invite").submit(function(event) 
  {
    if ($("#form_invite").valid())
    {
      
    }
    else
    {
      event.preventDefault();
    }
  });
}
