/*
 * This javascript is used for taking the click on a single checkbox
 * and applying it to many checkboxes at once.
 */
document.getElementById('ath-c-all')
    .addEventListener("change", checkAll, true);

function checkAll(ev)
{
  console.log("here");
  var i = 1;
  var latest = document.getElementById("ath-c" + i);
  while (latest!= undefined)
  {
    latest.checked = ev.target.checked;
    i++;
    latest = document.getElementById("ath-c" + i);
  }
}
