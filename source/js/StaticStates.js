window.addEventListener("load", pasteHeaderAndFooter, false);

function pasteHeaderAndFooter()
{
  console.log(getURL());
  if (getURL() == "accept-or-reject-request")
  {
    document.getElementById("acceptButton").addEventListener("click", clicked, 
        false);
    document.getElementById("declineButton").addEventListener("click", clicked, 
        false);    
  }
  if (getURL() == "accept-confirm")
  {
    localStorage.getItem("accept");
  }
}

function clicked(ev)
{
  if (ev.target.id == "acceptButton")
  {
    localStorage.setItem("accept", "true");
  }
  else
  {
    localStorage.setItem("accept", "false");
  }
}


function getURL()
{
  var names = document.location.pathname.split("/");
  return names[names.length - 1].split(".")[0];
}
