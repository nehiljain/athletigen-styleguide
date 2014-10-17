/*
 * This javascript is used for placing elements in certain vertical positions
 * on a page.  For instance if you give a parent element the exclusive class 
 * name: "vertical-center-par" and a child element the class name
 * "vertical-center-par" then the child element will be centered vertically in
 * the parent element while remaining relative to the other elements in the 
 * parent element.
 */

centerElements(undefined);
setInterval(centerElements, 33);

/*
 * Elements with the class "vertical-center-child" which are contained within 
 * an element with the exlcusive class name of "vertical-center-par"
 * are centered vertically in the parent element while retaining their relative 
 * positioning to the other elements in the parent element.
 */
function centerElements(ev)
{
  var elementsToCenter = document.getElementsByClassName("js-vertical-center-child");
  var childSizes = new Array();
  var parentSizes = new Array();
  var curParent = undefined;
  for (var i = 0; i < elementsToCenter.length; i++)
  {
    curParent = undefined;
    childSizes[i] = elementsToCenter[i].offsetHeight;
    curParent = elementsToCenter[i].parentNode;
    while (curParent == undefined || 
        !centHasClass(curParent, "js-vertical-center-par"))
    {
      curParent = curParent.parentNode;
    }
    parentSizes[i] = curParent.offsetHeight;
  }
  for (var i = 0; i < elementsToCenter.length; i++)
  {
    var newPadd = Math.floor(((parentSizes[i] / 2 - childSizes[i] / 2))/2.5) * 2.5;
    elementsToCenter[i].style.marginTop = newPadd + "px";
  }
}

/*
 * Checks to see if an element has a certain class (string) or not
 * returns true or false
 */
function centHasClass(element, string)
{
  var className = " " + string + " ";
  return ((" " + element.className + " ").replace(/[\t\r\n\f]/g, " ")
      .indexOf(className) > -1);
}
