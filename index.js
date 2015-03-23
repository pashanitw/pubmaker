console.log(zip);
var blob = new Blob([ "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..." ], {
  type : "text/plain"
});
zip.createWriter(new zip.BlobWriter(), function(writer) {

  // use a TextReader to read the String to add
  writer.add("folder/filename.txt", new zip.TextReader("test!"), function() {
    // onsuccess callback

    // close the zip writer
    writer.close(function(blob) {
        debugger;
        URL = window.webkitURL || window.mozURL || window.URL;
        var blobUrl=URL.createObjectURL(blob);
        var clickEvent;
        clickEvent = document.createEvent("MouseEvent");
        clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        downloadButton=document.createElement('a')
        downloadButton.href = blobUrl;
        downloadButton.download = "Example.zip";
        downloadButton.dispatchEvent(clickEvent);
     //   creationMethodInput.disabled = false;
       // fileList.innerHTML = "";
      // blob contains the zip file as a Blob object

    });
  }, function(currentIndex, totalIndex) {
    // onprogress callback
  });
}, function(error) {
    console.log(error)
  // onerror callback
});

var page;
var converJson=function(){
    var source   = $("#page-template").html();
    var template = Handlebars.compile(source);
    $.getJSON('templates/modern/layouts/layouts.json',function(data){
        page=template(data.page);
    })
};
converJson();