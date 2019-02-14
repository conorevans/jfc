//-----------------READ FILE FROM SERVER


var fileReadIn = [""];
function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                fileReadIn[0] = allText;              
            }
        }
    }
    rawFile.send(null);
}
 
readTextFile("http://127.0.0.1:8887/JFC/jfc.csv")

var file = new File(fileReadIn,'jfc.csv' ,{
  type: "text/csv"
})

//parse csv file and use returned json array to build our initial table
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
        var tbl = document.getElementById("flightTable");
        //we want to slice the first row of the data, as it represents an array of the text field atop each column of data
        //necessary in the file for comprehension, but not for posting to our table.
        results.data.splice(1).forEach(element => {
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


function updateTable(){
    //we want to be able to parse inputs such as 'gatwick' or 'stansted' correctly
    londonAirports();
    
    var table = document.getElementById("flightTable");
    var r = 1;

    //remove irrelevant rows
    while(row=table.rows[r]){
        if(
            (document.getElementById("depAir").checked
            && row.cells[1].innerHTML.toUpperCase() != document.getElementById("inputText").value.toUpperCase()
            && row.cells[2].innerHTML.toUpperCase() != document.getElementById("inputText").value.toUpperCase())
             
            || (document.getElementById("depCountry").checked
            && row.cells[3].innerHTML.toUpperCase() != document.getElementById("inputText").value.toUpperCase()) 
            
            || (document.getElementById("destAir").checked
            && row.cells[4].innerHTML.toUpperCase() != document.getElementById("inputText").value.toUpperCase()
            && row.cells[5].innerHTML.toUpperCase() != document.getElementById("inputText").value.toUpperCase())

            || (document.getElementById("destCountry").checked
            && row.cells[6].innerHTML.toUpperCase() != document.getElementById("inputText").value.toUpperCase()) 
            ){
            table.deleteRow(r);   
        }
        //if valid row, move on to next row
        else {
            r++;
        }
    }
}

//some common airports are known by their shorthand name, especially when their are multiple in a city.
//plans to expand to other major cities once dataset is complete.
function londonAirports(){
    if(document.getElementById("inputText").value.toUpperCase() == "GATWICK"){
        document.getElementById("inputText").value = "London Gatwick";
    }
    else if(document.getElementById("inputText").value.toUpperCase() == "HEATHROW"){
        document.getElementById("inputText").value = "London Heathrow";
    }
}

function searchCriteria() {

    //get elements to re-use
    var criterion1 = document.getElementById("criterion1");
    var criterion2 = document.getElementById("criterion2");
    var criterion3 = document.getElementById("criterion3");
    var criterion4 = document.getElementById("criterion4");
    var text = document.getElementById("inputText").value;

    document.getElementById("searchCriteria").classList.remove("initiallyHidden");
    if(document.getElementById("depAir").checked){
        //?remove floats
        if(criterion4.classList.contains("floatLeft")){
            criterion4.classList.remove("floatLeft");
        }
        else if(criterion3.classList.contains("floatLeft") ){
           criterion3.classList.remove("floatLeft");
        }
        else if(criterion2.classList.contains("floatLeft")){
            criterion2.classList.remove("floatLeft");
        }
        document.getElementById("c1Text").innerHTML = text;
        criterion1.classList.add("floatLeft");
        criterion1.classList.remove("initiallyHidden");
    }
    else if(document.getElementById("depCountry").checked){
        //?set float
        if(criterion1.classList.contains("initiallyHidden")){
            criterion2.classList.add("floatLeft");
        }
        document.getElementById("c2Text").innerHTML = document.getElementById("inputText").value;
        criterion2.classList.remove("initiallyHidden");
    }
    else if(document.getElementById("destAir").checked){
        //?set float
        if(criterion1.classList.contains("initiallyHidden")
        && criterion2.classList.contains("initiallyHidden")){
            criterion3.classList.add("floatLeft");
        }
        document.getElementById("c3Text").innerHTML =text;
        criterion3.classList.remove("initiallyHidden");
    }
    else if(document.getElementById("destCountry").checked){
        //?set float
        if(criterion1.classList.contains("initiallyHidden")
        && criterion2.classList.contains("initiallyHidden")
        && criterion3.classList.contains("initiallyHidden")){
            criterion4.classList.add("floatLeft");
        }
        document.getElementById("c4Text").innerHTML = text;
        criterion4.classList.remove("initiallyHidden");
    }
}

