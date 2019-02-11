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
        var tbl = document.getElementById("MyTable");
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
    var table = document.getElementById("MyTable");
    //create new table which we will fill with relevant data
    var difftable = document.createElement('table');
    var r = 0;
    //copy header row firsts
    while(r < 1){
        var newRow = difftable.insertRow();
        var i=0, cell;
        while(cell = table.rows[0].cells[i]){
            var newCell = newRow.insertCell();
            newCell.innerHTML = table.rows[0].cells[i].innerHTML;
            style(newCell);
            i++;
        }
        r++;
    }
    //copy relevant rows
    while(row=table.rows[r]){
        if(document.getElementById("depAir").checked){
            if(row.cells[1].innerHTML.toUpperCase() == document.getElementById("inputText").value.toUpperCase() ||
            row.cells[2].innerHTML.toUpperCase() == document.getElementById("inputText").value.toUpperCase()){
                var newRow = difftable.insertRow();
                var i = 0, cell;
                while(cell = row.cells[i]){
                    var newCell = newRow.insertCell();
                    newCell.innerHTML = row.cells[i].innerHTML;
                    i++;
                }
            }
        }
        else if(document.getElementById("depCountry").checked){
            if(row.cells[3].innerHTML.toUpperCase() == document.getElementById("inputText").value.toUpperCase()){
                var newRow = difftable.insertRow();
                var i = 0, cell;
                while(cell = row.cells[i]){
                    var newCell = newRow.insertCell();
                    newCell.innerHTML = row.cells[i].innerHTML;
                    i++;
                }
            }
        }
        else if(document.getElementById("destAir").checked){
            if(row.cells[4].innerHTML.toUpperCase() == document.getElementById("inputText").value.toUpperCase()
            || row.cells[5].innerHTML.toUpperCase() == document.getElementById("inputText").value.toUpperCase()){
                var newRow = difftable.insertRow();
                var i = 0, cell;
                while(cell = row.cells[i]){
                    var newCell = newRow.insertCell();
                    newCell.innerHTML = row.cells[i].innerHTML;
                    i++;
                }
            }
        }
        else if(document.getElementById("destCountry").checked){
            if(row.cells[6].innerHTML.toUpperCase() == document.getElementById("inputText").value.toUpperCase()){
                var newRow = difftable.insertRow();
                var i = 0, cell;
                while(cell = row.cells[i]){
                    var newCell = newRow.insertCell();
                    newCell.innerHTML = row.cells[i].innerHTML;
                    i++;
                }
            }
        }
        r++;
    }
    //remove old table and suffix (for positioning)
    var suffix = document.getElementById("iata");
    document.getElementById("iata").remove();
    document.getElementById("MyTable").remove();

    //introduce new table and suffix
    document.body.appendChild(difftable);
    //set table id so that multiple criteria can be searched successively
    //i.e. first trim table by looking at all UK flights, then LGW.
    difftable.id = "MyTable";
    document.body.appendChild(suffix);
}

function style(cell){
    cell.style.backgroundColor = "#6633FF";
    cell.style.fontWeight = "bold";
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
