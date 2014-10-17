$(function () {
    $('#fileupload').fileupload({
      //maxChunkSize: 255, // 255 bytes
        dataType: 'json',
        done: function (e, data) {
          $('#result').html("");
            $.each(data.result.files, function (index, file) {
              if(file.reportUrl) {
                $('#result').append(
                    "<div class='alert alert-success'><strong>Upload Successful</strong>. <a href='${settings['webapp_path']}"+file.reportUrl+"' >View report NOW!</a></div>"
                  );
              } else {
                $('#result').append(
                "<div class='alert alert-danger'><strong>File "+file.name+" Upload failed</strong> Try again later!.</div>"
              );
              }
            });
        }
    });
});
