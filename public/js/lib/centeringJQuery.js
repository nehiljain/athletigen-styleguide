/*
 * This javascript is used for placing elements in certain vertical positions
 * on a page.  For instance if you give a parent element the exclusive class 
 * name: "vertical-center-par" and a child element the class name
 * "vertical-center-par" then the child element will be centered vertically in
 * the parent element while remaining relative to the other elements in the 
 * parent element.
 */

setInterval(centerDivs, 41);
setInterval(bottomDivs, 41);
centerDivs();
bottomDivs();

/*
 * Elements with the class "vertical-center-child" which are contained within 
 * an element with the exlcusive class name of "vertical-center-par"
 * are centered vertically in the parent element while retaining their relative 
 * positioning to the other elements in the parent element.
 */
function centerDivs(ev)
{
  var d = new Date().getTime();
  var elementsToCenter = $(".vertical-center-child");
  var childSizes = new Array();
  var parentSizes = new Array();
  var curParent = undefined;
  for (var i = 0; i < elementsToCenter.length; i++)
  {
    curParent = undefined;
    childSizes[i] = $(elementsToCenter[i]).css('height');
    curParent = elementsToCenter[i].parentNode;
    while (curParent == undefined || 
        !$(curParent).hasClass("vertical-center-par"))
    {
      curParent = curParent.parentNode;
    }
    parentSizes[i] = $(curParent).css('height');
  }
  for (var i = 0; i < elementsToCenter.length; i++)
  {
    var newPadd = Math.floor((parseInt(parentSizes[i].substring(0, 
        parentSizes[i].length - 2)) / 2 
        - parseInt(childSizes[i].substring(0, 
        childSizes[i].length - 2)) / 2)/2) * 2;
    $(elementsToCenter[i]).css("margin-top", newPadd);
  }
  var f = new Date().getTime();
  console.log(f-d + "millis");
}

/*
 * Elements with the class "vertical-bottom-child" which are contained within
 * an element with the exlcusive class name of "vertical-center-par"
 * are placed at the bottom of the parent element that element while 
 * retaining their relative positioning to the other elements in the parent 
 * element.
 */
function bottomDivs(ev)
{
  var elementsToCenter = $(".vertical-bottom-child");
  var childSizes = new Array();
  var parentSizes = new Array();
  var curParent = undefined;
  for (var i = 0; i < elementsToCenter.length; i++)
  {
    curParent = undefined;
    childSizes[i] = $(elementsToCenter[i]).css('height');
    curParent = elementsToCenter[i].parentNode;
    while (curParent == undefined || 
        !$(curParent).hasClass("vertical-center-par"))
    {
      curParent = curParent.parentNode;
    }
    parentSizes[i] = $(curParent).css('height');
  }
  for (var i = 0; i < elementsToCenter.length; i++)
  {
    var newPadd = (parseInt(parentSizes[i].substring(0, parentSizes[i].length 
        - 2))) - parseInt(childSizes[i].substring(0, childSizes[i].length 
        - 2));
    $(elementsToCenter[i]).css("margin-top", newPadd);
  }
}
