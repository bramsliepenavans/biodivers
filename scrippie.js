// let width = 600;
// let height = 400;
// var svg = d3.select("body")
//     .append("svg")
//     .attr("height", height)
//     .attr("width", width);

let broeigassen = 50;
let leefruimte = 0;
let vervuiling = 10;
let natuurschade = 10;
let verspilling = 10;

let vlees;
let tuin;
let voertuig;
let afstand;
let telefoon;
let vakantievoertuig;
let vakantiebestemming;
let plantenwater;
let dak;
let printer;

var generateGraphic = function(){
    //Take all values based on questions and generate (partially randomized) graphic

    //make canvas
    let width = 600;
    let height = 400;
    var svg = d3.select("body")
        .append("svg")
        .attr("height", height)
        .attr("width", width);


    //Oude code, tering wat is dit vies
    //Clear canvas
    //d3.selectAll("svg > *").remove();

    // let x = d3.select("#co2").property("value");
    // console.log(x);

    // let rs = d3.select("#bos").property("value");    
    // let r = parseInt(rs); 
    // console.log(r);

    // let y = d3.select("#biodiv").property("value");
    // console.log(y);
        
    // svg.append("circle")
    // .attr("cx", x)
    // .attr("cy", y)
    // .attr("r", r)
    // .attr("fill", "#4287f5");
}

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function printValues(){
    console.log("VALUES:");
    console.log('vlees ' + vlees);
    console.log('tuin ' + tuin);
    console.log('voertuig ' + voertuig);
    console.log('afstand ' + afstand);
    console.log('telefoon ' + telefoon);
    console.log('vakantievoertuig ' + vakantievoertuig);
    console.log('vakantiebestemming ' + vakantiebestemming);
    console.log('plantenwater ' + plantenwater);
    console.log('dak ' + dak);
    console.log('printer ' + printer);
}

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    printValues();
    makeArt();
    //document.getElementById("regForm").submit();  //////////////////////////////// GENERATE Toevoegen
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
        if(y[i].type == "radio"){
            if(y[i].checked == false){
                valid = true;
                console.log("SHEEEESH");
            }else{
                valid = false;
                console.log("Niet geselecteerd");
            }
        } else {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
        }
    } else {
        //Hier ziek lelijke switch statement met alle factoren:
        switch(y[i].id){
            case 'vlees':
                vlees = parseInt(y[i].value);
                break;
            case 'tuin':
                tuin = parseInt(y[i].value);
                break;
            case 'afstand':
                afstand = parseInt(y[i].value);
                voertuig = parseInt(x[currentTab].getElementsByTagName("select")[0].value);
                break;
            case 'telefoon':
                telefoon = parseInt(y[i].value);
                break;
            case 'vakantievoertuig':
                vakantievoertuig = parseInt(y[i].value);
                break;
            case 'vakantiebestemming':
                vakantiebestemming = parseInt(y[i].value);
                break;
            case 'plantenwater':
                plantenwater = parseInt(y[i].value);
                break;
            case 'dak':
                dak = parseInt(y[i].value);
                break;
            case 'printer':
                printer = parseInt(y[i].value);
                break;
        }
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}


function calculateValues() {
    broeigassen += vlees*10 + vakantievoertuig*vakantiebestemming;
    leefruimte += vlees*10 + voertuig*afstand + plantenwater;
    vervuiling += vlees*10 + telefoon*10 + vakantievoertuig*vakantiebestemming;
    natuurschade += telefoon*10;
    verspilling += plantenwater;

    console.log("broeigassen " + broeigassen);
    console.log("leefruimte " + leefruimte);
    console.log("vervuiling " + vervuiling);
    console.log("natuurschade " + natuurschade);
    console.log("verspilling " + verspilling);

    // broeigassen          10-320
    // leefruimte           0-580
    // vervuiling           20-390
    // natuurschade         10-70
    // verspilling          0-10

    // vlees                0-70
    // tuin                 0-20
    // voertuig             0-5
    // afstand              0-100
    // telefoon             1-7
    // vakantievoertuig     10-50
    // vakantiebestemming   1-5
    // plantenwater         0-10
    // dak                  0-10
    // printer              0-10
}
function makeRefreshButton(){
    const button = d3.select("body").append("button").attr("onclick", "window.location.reload();").text("RESET");
}
function makeArt(){

    //
    calculateValues();
    //

    d3.selectAll("body > *").remove();

    const width = window.innerWidth-50;
    const height = window.innerHeight-50;
    const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("filter", "url(#gooey)");
    
    ///
    var defs = svg.append("defs");

    var gradient = defs.append("linearGradient")
    .attr("id", "svgGradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "100%");

    var color1 = d3.scaleLinear().domain([0,320]).range(["black", "white"])
    var color2 = d3.scaleLinear().domain([0,390]).range(["black", "red"])
    var bgcolor1 = d3.scaleLinear().domain([0,390]).range(["green", "red"])
    var bgcolor2 = d3.scaleLinear().domain([0,390]).range(["blue", "yellow"])
    
    gradient.append("stop")     ///SET COLOR 1
    .attr('class', 'start')
    .attr("offset", "0%")
    .attr("stop-color", color1(broeigassen))
    .attr("stop-opacity", 1);
    
    gradient.append("stop")     //SET COLOR 2
    .attr('class', 'end')
    .attr("offset", "100%")
    .attr("stop-color", color2(vervuiling))
    .attr("stop-opacity", 1);

    var gradient = defs.append("linearGradient")
    .attr("id", "svgGradient2")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "100%");
    
    gradient.append("stop")     ///SET BGCOLOR 1
    .attr('class', 'start')
    .attr("offset", "0%")
    .attr("stop-color", bgcolor1(broeigassen))
    .attr("stop-opacity", 1);
    
    gradient.append("stop")     //SET BGCOLOR 2
    .attr('class', 'end')
    .attr("offset", "100%")
    .attr("stop-color", bgcolor2(broeigassen))
    .attr("stop-opacity", 1);
    ///

    svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "url(#svgGradient2)");

    const centered = svg
    .append("g")
    .style("transform", `translate(${width / 2}px, ${height / 2}px)`);

    //const defs = svg.append("defs");
    const filter = defs.append("filter").attr("id", "gooey");
    filter
    .append("feGaussianBlur")
    .attr("in", "SourceGraphic")
    .attr("stdDeviation", "8")
    .attr("result", "blur");
    filter
    .append("feColorMatrix")
    .attr("in", "blur")
    .attr("mode", "matrix")
    .attr("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -10")
    .attr("result", "gooey");
    filter
    .append("feComposite")
    .attr("in", "SourceGraphic")
    .attr("in2", "gooey")
    .attr("operator", "atop");

    const data = d3.range(40-natuurschade/2).map(d => ({               //was 20
    radius: Math.random() * (150 -verspilling-natuurschade),                                //broeigassen was 100 laat schommelen tussen 50 en 150?
    }));

    const node = centered
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", d => d.radius)
    .attr("fill", d => "url(#svgGradient)");                              //af laten hangen van waarde?

    d3.forceSimulation(data)
    .force("charge", d3.forceManyBody())
    .on("tick", () => {
        node.attr("cx", d => d.x).attr("cy", d => d.y);
    });
    makeRefreshButton();
}

var vleesSlider = document.getElementById("vlees");
var vleesWaarde = document.getElementById("vleesWaarde");
vleesWaarde.innerHTML = vleesSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
vleesSlider.oninput = function() {
    vleesWaarde.innerHTML = this.value;
}

var printerSlider = document.getElementById("printer");
var printerWaarde = document.getElementById("printerWaarde");
printerWaarde.innerHTML = printerSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
printerSlider.oninput = function() {
    if(this.value==10){
    printerWaarde.innerHTML = this.value + " of meer";
    } else{
        printerWaarde.innerHTML = this.value;
    }
}

var telefoonSlider = document.getElementById("telefoon");
var telefoonWaarde = document.getElementById("telefoonWaarde");
telefoonWaarde.innerHTML = telefoonSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
telefoonSlider.oninput = function() {
    if(this.value==7){
        telefoonWaarde.innerHTML = this.value + " of meer";
    }else{
        telefoonWaarde.innerHTML = this.value;
    }
}

