$(function () {
  $('#fileupload').fileupload({
    //maxChunkSize: 255, // 255 bytes
      add: function(e, data) {
        var uploadErrors = [];
        var acceptFileTypes = "text/plain";
        if(data.originalFiles[0]['type'].length && acceptFileTypes !== data.originalFiles[0]['type']) 
        {
          uploadErrors.push('Not an accepted file type');
        }
        //30MB limit on size
        if(data.originalFiles[0]['size'].length && data.originalFiles[0]['size'] > 30000000) 
        {
          uploadErrors.push('Filesize is too big');
        }
        if (data.originalFiles[0].name.split(".")[data.originalFiles[0].name.split(".").length - 1] !== "txt")
        {
          uploadErrors.push('File extension needs to be .txt');
        }
        if(uploadErrors.length > 0) 
        {
          $('#progress').html("File not supported <br>" 
              + uploadErrors.join("<br>"));
        } 
        else 
        {
          data.submit();
        }
      },
      dataType: 'json',
      done: function (e, data) {
        $('#result').html("");
          $.each(data.result.files, function (index, file) {
            if(file.reportUrl) {
              $('#result').append(
                  "<div class='alert alert-success'><strong>Upload Successful</strong>. <a href='" + GLOBALPATH +file.reportUrl+"' >View report NOW!</a></div>"
              );
              $('#progress').html(
                  '100% complete'
              );
              $('#progressBar').css(
                  'width',
                  '100%'
              );
            } else {
              $('#result').append(
              "<div class='alert alert-danger'><strong>File "+file.name+" Upload failed</strong> Try again later!.</div>"
            );
            }
          });
      },
      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10) - 1;
        $('#progressBar').css(
            'width',
            progress + '%'
        );
        $('#progress').html(
            progress + '% complete'
        );
      }
  });
});


