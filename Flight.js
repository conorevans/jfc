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
 
readTextFile("http://127.0.0.1:8887/jfc.csv")


var file = new File(fileReadIn,'jfc.csv' ,{
  type: "text/csv"
})

function setRowColours(){
    var table=document.getElementById("MyTable");
    var r=0;
    //we want to allow people to put in 'Gatwick' or 'Heathrow' and have it parsed as if this was correct input
    londonAirports();
    while(row=table.rows[r]){
        if(document.getElementById("depAir").checked){
            if(row.cells[1].innerHTML.toUpperCase() == document.getElementById("inputText").value.toUpperCase()
            || row.cells[2].innerHTML == document.getElementById("inputText").value.toUpperCase()){
                table.rows[r].style.backgroundColor = "#6C33FF";
            }
        }
        else if(document.getElementById("depCountry").checked){
            if(row.cells[3].innerHTML.toUpperCase() == document.getElementById("inputText").value.toUpperCase()){
                table.rows[r].style.backgroundColor = "#6C33FF";
            }
        }
        else if(document.getElementById("destAir").checked){
            if(row.cells[4].innerHTML.toUpperCase() == document.getElementById("inputText").value.toUpperCase()
            || row.cells[5].innerHTML == document.getElementById("inputText").value.toUpperCase()){
                table.rows[r].style.backgroundColor = "#6C33FF";
            }
        }
        else if(document.getElementById("destCountry").checked){
            if(row.cells[6].innerHTML.toUpperCase() == document.getElementById("inputText").value.toUpperCase()){
                table.rows[r].style.backgroundColor = "#6C33FF";
            }
        }
        r++;
    }
}

function londonAirports(){
    if(document.getElementById("inputText").value.toUpperCase() == "GATWICK"){
        document.getElementById("inputText").value = "London Gatwick";
    }
    else if(document.getElementById("inputText").value.toUpperCase() == "HEATHROW"){
        document.getElementById("inputText").value = "London Heathrow";
    }
}

function resetRowColours(){
    var table=document.getElementById("MyTable");
    //set r to 1, as we don't want to reset the colour of the "Headings" row.
    var r=1;
    while(row=table.rows[r]){
        table.rows[r].style.backgroundColor = "#FFFFFF";
        r++;
    }
}

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
        a.splice(1).forEach(element => {
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
