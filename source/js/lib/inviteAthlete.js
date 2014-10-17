var responsiveHelper;
var breakpointDefinition = {
    tablet: 1024,
    phone : 480
};
var tableContainer;

if ($("#search").length > 0)
{
  jQuery(document).ready(function($)
  {
    tableContainer = $("#search");
    
    tableContainer.dataTable({
      "sPaginationType": "bootstrap",
      "aLengthMenu": [[5, 10, 20, 40], [5, 10, 20, 40]],
      "bStateSave": true,
  
        // Responsive Settings
        bAutoWidth     : false,
        fnPreDrawCallback: function () {
            // Initialize the responsive datatables helper once.
            if (!responsiveHelper) {
                responsiveHelper = new ResponsiveDatatablesHelper(tableContainer, breakpointDefinition);
            }
        },
        fnRowCallback  : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            responsiveHelper.createExpandIcon(nRow);
        },
        fnDrawCallback : function (oSettings) {
            responsiveHelper.respond();
        }
    });
  });
}

if ($("#managing-table").length > 0)
{
  jQuery(document).ready(function($)
  {
    tableContainer = $("#managing-table");
    
    tableContainer.dataTable({
      "sPaginationType": "bootstrap",
      "aLengthMenu": [[4, 8, 15, 20], [4, 8, 15, 20]],
      "bStateSave": true,
  
        // Responsive Settings
        bAutoWidth     : false,
        fnPreDrawCallback: function () {
            // Initialize the responsive datatables helper once.
            if (!responsiveHelper) {
                responsiveHelper = new ResponsiveDatatablesHelper(tableContainer, breakpointDefinition);
            }
        },
        fnRowCallback  : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            responsiveHelper.createExpandIcon(nRow);
        },
        fnDrawCallback : function (oSettings) {
            responsiveHelper.respond();
        }
    });
  });
}

function submitVoidCurrentTrainer(trainerEmail, url) {
	var relationshipBean = { "fromEmailAddress" : trainerEmail }
	  
	  $.ajax({
	    type : "POST",
	    contentType : 'application/json; charset=utf-8',
	        dataType : 'json',
	    url : url,
	    data : JSON.stringify(relationshipBean),
	    success : function(result) {
	      if(result == 'Success') {
	        location.reload();
	      } else if(result == 'Failure') {
	      }
	    }
	  });
}

function submitVoidManagedAthlete(managedAthleteEmail, url) {
	var relationshipBean = { "toEmailAddress" : managedAthleteEmail }
	  
	  $.ajax({
	    type : "POST",
	    contentType : 'application/json; charset=utf-8',
	        dataType : 'json',
	    url : url,
	    data : JSON.stringify(relationshipBean),

	    success : function(result) {
	      if(result == 'Success') {
	        location.reload();
	      } else if(result == 'Failure') {
	      }
	    }
	  });
}

function submitVoidPendingRequest(pendingTraineeEmail, url) {
	var relationshipBean = { "toEmailAddress" : pendingTraineeEmail }
	
	$.ajax({
	    type : "POST",
	    contentType : 'application/json; charset=utf-8',
	        dataType : 'json',
	    url : url,
	    data : JSON.stringify(relationshipBean),

	    success : function(result) {
	      if(result == 'Success') {
	        location.reload();
	      }
	    }
	  });
}

// Ajax call to approve / reject the trainer request
function submitRequestApproval(fromEmailAddress, toEmailAddress, approvalResponse, url) {
  var relationshipBean = {
      "fromEmailAddress" : fromEmailAddress,
      "toEmailAddress" : toEmailAddress,
      "status" : approvalResponse
   }
  
  $.ajax({
    type : "POST",
    contentType : 'application/json; charset=utf-8',
        dataType : 'json',
    url : url,
    data : JSON.stringify(relationshipBean),

    success : function(result) {
      if(result == 'Success') {
        location.reload();
      } else {
      }
    }
  });
}

// Ajax call to update the relationship level 
function submitRequestLevelUpdate(level, fromEmailAddress, toEmailAddress, buttonClicked, url) {
  var relationshipBean = {
      "fromEmailAddress" : fromEmailAddress,
      "toEmailAddress" : toEmailAddress,
      "level" : level
   }
  
  $.ajax({
    type : "POST",
    contentType : 'application/json; charset=utf-8',
    dataType : 'json',
    url : url,
    data : JSON.stringify(relationshipBean),

    success : function(response) {
      if(response == 'Detailed') {
        $(buttonClicked).removeClass("btn-grey").addClass("btn-success");
        $(buttonClicked).parents('.request-block').find('.change-level-summary').removeClass("btn-success").addClass("btn-grey");
        $(buttonClicked).parents('.request-block').find('.change-level-detailed').find('i').removeClass().addClass('entypo-chart-bar');
        $(buttonClicked).parents('.request-block').find('.change-level-summary').find('i').removeClass().addClass('entypo-chart-pie');
      }
      else if(response == 'Summary') {
        $(buttonClicked).removeClass("btn-grey").addClass("btn-success");
        $(buttonClicked).parents('.request-block').find('.change-level-detailed').removeClass("btn-success").addClass("btn-grey");
        $(buttonClicked).parents('.request-block').find('.change-level-summary').find('i').removeClass().addClass('entypo-chart-bar');
        $(buttonClicked).parents('.request-block').find('.change-level-detailed').find('i').removeClass().addClass('entypo-chart-pie');
      } else if(response == 'Error') {
    	  
      }
    }
  });
}


function submitSendInvitation(emailAddress, buttonClicked, url) {
	var relationshipBean = { "toEmailAddress" : emailAddress }
	
	$.ajax({
      type : "POST",
      contentType : 'application/json; charset=utf-8',
      dataType : 'json',
      url : url,
      data : JSON.stringify(relationshipBean),

      success : function(response) {
        
        if (response == 'Sent') {
        	$(buttonClicked).html("Invitation <br> Sent!").removeClass("btn-gold").addClass("btn-orange disabled");
        } else if(response == 'AlreadyManaged') {
        	$(buttonClicked).html("Already <br> Managed!").removeClass("btn-gold").addClass("btn-blue disabled");
        } else if(response == 'AlreadyPending') {
        	$(buttonClicked).html("Already <br> Pending!").removeClass("btn-gold").addClass("btn-blue disabled");
        } else if(response == 'FlaggedAsSpam') {
        	$(buttonClicked).text("Blocked!").removeClass("btn-gold").addClass("btn-red");
        } else if(response == 'Error') {
        	$(buttonClicked).html("Error - <br>Not Sent!").removeClass("btn-gold").addClass("btn-red disabled");
        }
      }
    });
}

//Ajax call to send an invitation to a non-registered user.
$('.send-inv').click(function(event) {
  var emailAddress = $(this).parent().find("input:hidden").val();
  $(this).removeClass("btn-success").addClass("btn-gold disabled").text("Sending..");
  submitSendInvitation(emailAddress, $(this), GLOBALPATH + "/secure/invite-existing-athlete");
});

$('.change-level-summary').click(function(event) {
  fromEmailAddress = $(this).parents('.request-block').find('.change-level-trainer').attr('value');
  toEmailAddress = $(this).parents('.request-block').find('.change-level-trainee').attr('value');
  submitRequestLevelUpdate("summary", fromEmailAddress, toEmailAddress, $(this), GLOBALPATH + "/secure/submit-request-level-update");
});
  
$('.change-level-detailed').click(function(event) {
  fromEmailAddress = $(this).parents('.request-block').find('.change-level-trainer').attr('value');
  toEmailAddress = $(this).parents('.request-block').find('.change-level-trainee').attr('value');
  submitRequestLevelUpdate("detailed", fromEmailAddress, toEmailAddress, $(this), GLOBALPATH + "/secure/submit-request-level-update");
});

$('.confirm-trainer').click(function(event) {
  fromEmailAddress = $(this).parents('.request-block').find('.confirm-from-email').attr('value');
  toEmailAddress = $(this).parents('.request-block').find('.confirm-to-email').attr('value');
  submitRequestApproval(fromEmailAddress, toEmailAddress, "Accepted", GLOBALPATH + "/secure/submit-request-response");
});

$('.decline-trainer').click(function(event) {
  fromEmailAddress = $(this).parents('.request-block').find('.confirm-from-email').attr('value');
  toEmailAddress = $(this).parents('.request-block').find('.confirm-to-email').attr('value');
  submitRequestApproval(fromEmailAddress, toEmailAddress, "Rejected", GLOBALPATH + "/secure/submit-request-response");
});

$('.void-pending-request').click(function(event) {
  pendingTraineeEmail = $(this).parents('.request-block').find('.pending-request-email').val();
  submitVoidPendingRequest(pendingTraineeEmail, GLOBALPATH + "/secure/void-pending-request");
});

$('.void-managed-athlete').click(function(event) {
  managedAthleteEmail = $(this).parents('.request-block').find('.managed-athlete-email').val();
  submitVoidManagedAthlete(managedAthleteEmail, GLOBALPATH + "/secure/void-managed-athlete");
});

$('.void-current-trainer').click(function(event) {
  trainerEmail = $(this).parents('.request-block').find('.change-level-trainer').val();
  submitVoidCurrentTrainer(trainerEmail, GLOBALPATH + "/secure/void-current-trainer");
});
