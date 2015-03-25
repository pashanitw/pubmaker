console.log(zip);
var blob = new Blob([ "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..." ], {
  type : "text/plain"
});

var packageEpub=function(pages){
    getFile(pages);

}
var index=0;
var helper=function(writer,pages,callback){
    var page=pages[index];
    writer.add(page.path+page.name+page.ext, new zip.TextReader(pages[index].data), function() {
           index++;
        if(index==pages.length){
            callback();
        }else{
            helper(writer,pages,callback);
        }
    }, function(currentIndex, totalIndex) {

    });
};

function getFile(pages){
   var deferred=$.Deferred();
    zip.createWriter(new zip.BlobWriter(), function(writer) {

        // use a TextReader to read the String to add
        helper.call(this,writer,pages,function(){
            closeWriter();
        });

function closeWriter(){
    writer.close(function(blob) {
        debugger;
        URL = window.webkitURL || window.mozURL || window.URL;
        var blobUrl=URL.createObjectURL(blob);
        var clickEvent;
        clickEvent = document.createEvent("MouseEvent");
        clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        downloadButton=document.createElement('a')
        downloadButton.href = blobUrl;
        downloadButton.download = "test.zip";
        downloadButton.dispatchEvent(clickEvent);
        //   creationMethodInput.disabled = false;
        // fileList.innerHTML = "";
        // blob contains the zip file as a Blob object

    });
}

    }, function(error) {
        console.log(error)
        // onerror callback
    });

    return deferred.promise();
}
var LENGTH=0;
var converJson=function(){
    var pages=[]


    var source   = $("#page-template").html();
    var pageTemplate = Handlebars.compile(source);
    source=$("#container-template").html();
    var containerTemplate=Handlebars.compile(source);
    source=$("#package-template").html();
    var packageTemplate=Handlebars.compile(source);
    $.getJSON('templates/modern/config.json',function(configuration){

    $.getJSON('templates/modern/layouts/layouts.json',function(data){
        for(key in data){
            LENGTH++;
            var ob={
                name:key,
                path:'EPUB/xhtml/',
                ext:'.xhtml',
                data:pageTemplate(data[key])
            }
            pages.push(ob);
        };
        var package={
            name:"package",
            path:'EPUB/',
            ext:'.opf',
            data:packageTemplate(configuration)
        };
        var container={
            name:"container",
            path:'META-INF/',
            ext:'.xml',
            data:containerTemplate()
        };
        var mime={
            name:"mimetype",
            path:'',
            ext:'',
            data:'application/epub+zip'
        }
      pages.push(package);
        pages.push(container);
        pages.push(mime);
        packageEpub(pages);
    })

    });

};
converJson();
Handlebars.registerHelper('spine', function(items, options) {
    var out = "<spine>\n";

    for(var i=0, l=items.length; i<l; i++) {
        out = out + "<itemref idref=page-"+i+"  "  +options.fn(items[i].spine) + "/>\n";
    }
    return out + "</spine>";

});
