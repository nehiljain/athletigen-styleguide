/*
 * This javascript is used on the category details page in order to change the 
 * table from showing 3 genes to showing 5 genes.
 */


//Adds the click event listeners to the show more button and calls the
//startShowingMore function afterwards.
function initializeShowMoreButtons()
{
  var showMoreButtons = document.getElementsByClassName("js-show-more-button");
  
  for (var i = 0; i < showMoreButtons.length; i++)
  {
    showMoreButtons[i].addEventListener('mouseup', startShowingMore, false);
  }
  
  //Shows all of the divs who have the class the name "js-show-more"
  function startShowingMore(ev)
  {
    ev.target.parentNode.parentNode.parentNode.removeChild(ev.target.parentNode.parentNode);
    var showMoreElements = document.getElementsByClassName("js-show-more");
  
    for (var j = 0; j < showMoreElements.length; j++)
    {
      showMoreElements[j].className = "js-show-more visible";
    }
  }
}

initializeShowMoreButtons();

