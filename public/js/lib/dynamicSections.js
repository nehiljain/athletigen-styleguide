/*
 * This javascript is used for hiding and unhiding certain pieces of the page
 * depending upon where the user clicks.
 */
var dynButtons = document.getElementsByClassName('dynamic-buttons');
var dynCurVisible = undefined;
var dynOldParent = undefined;

for (var i = 0; i < dynButtons.length; i++)
{
  dynButtons[i].addEventListener("mouseup", switchVisible, true);
}

function switchVisible(ev)
{
  var curParent = ev.target;
  while (curParent == undefined || !$(curParent).hasClass("dynamic-buttons"))
  {
    curParent = curParent.parentNode;
  }
  if(dynCurVisible !== "#content-" + curParent.id)
  {
    if (dynCurVisible == undefined)
    {
      dynCurVisible = "#content-" + curParent.id;
      $(curParent).addClass('active');
      $(dynCurVisible).css("display", "block");
      dynOldParent = curParent.id;
    }
    else
    {
      $("#content-" + curParent.id).css("display", "block");
      $(curParent).addClass('active');
      $("#" + dynOldParent).removeClass("active");
      $(dynCurVisible).hide();
      dynCurVisible = "#content-" + curParent.id;
      dynOldParent = curParent.id;
    }
  }
}
