

//-----------------READ FILE FROM SERVER
var fileReadIn = [""];
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                fileReadIn[0] = allText;              
            }
        }
    }
    rawFile.send(null);

}
 
//localhost
readTextFile("http://127.0.0.1:8887/jfc.csv")


var file = new File(fileReadIn,'jfc.csv' ,{
  type: "text/csv"
})


Papa.parse(file, {
  
    delimiter: ",",  // auto-detect <--------- We don't want this!
    newline: "\n",    // auto-detect
    quoteChar: '"',
    header: false,
    dynamicTyping: false,
    //to be worked on 
    preview: 13,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    complete: function(results){
        var tbl = document.getElementById("MyTable");
        var a = results.data;
        console.log(a);
        //we want to slice the first row of the data, as it represents an array of the text field atop each column of data
        //necessary in the file for comprehension, but not for posting to our table.
        //the option 'header' set to true can provide this capability according to the PapaParse docs. However, the programme
        //reacted poorly, and this is a very simple fix.
        a.slice(1).forEach(element => {
            var row = tbl.insertRow();
            element.forEach(element1 => {
                var cell = row.insertCell();
                cell.innerHTML = element1; 
            });     
        });
    },
    error: undefined,
    download: false,
    skipEmptyLines: false,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined

});
