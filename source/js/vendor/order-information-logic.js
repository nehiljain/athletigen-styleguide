if (document.getElementById("billingForm") != undefined)
{
  document.getElementById("billingDiff").addEventListener("click",
      billingDiffChange, false);
  $("#billingForm").hide();
  console.log("here1");
}

function billingDiffChange(ev)
{
  $("#billingForm").toggle();
}
