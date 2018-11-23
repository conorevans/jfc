

//creation of basic table in HTML, eventually want to represent the data from the CSV file as a(n interactive) table on the webpage.
function insertRow(){
    var tbl = document.getElementById("MyTable");
    var row = tbl.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    cell1.innerHTML = "abc";
    cell2.innerHTML = "def";
}
//-----------------READ FILE FROM SERVER
var fileReadIn = [""]
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
 
readTextFile("http://127.0.0.1:8887/jfcmin.csv")


var file = new File(fileReadIn,'jfcmin.csv' ,{
  type: "text/csv"
})


Papa.parse(file, {
  
    delimiter: ",",  // auto-detect <--------- We don't want this!
    newline: "\n",    // auto-detect
    quoteChar: '"',
    header: false,
    dynamicTyping: false,
    preview: 0,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    complete: function(results,file){
      console.log("results", results)
      console.log("file:", file)
     
    },
    error: undefined,
    download: false,
    skipEmptyLines: false,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined

});
