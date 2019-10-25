var current_page = 1;
var records_per_page = 6;
var items_per_row = 3;

var termineData = JSON.parse(document.getElementById('termineData').innerText);
var today = new Date();

function onlyFutureDates(o) 
{   
    var odate = new Date(o.datum);
    if (odate >= today) {
        return o;
    }
}

var objJson = termineData.filter(onlyFutureDates);
// var objJson = termineData;
if (objJson.length == 0)
{
    objJson = termineData;
}

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page)
{
    var btn_next = document.getElementById("termine_btn_next");
    var btn_prev = document.getElementById("termine_btn_prev");
    var listing_table = document.getElementById("termineContainer");
    // var page_span = document.getElementById("terminePage");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";
    var count = 1;
    var content = "";
    var cur_content = "";
 

    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++)
    {
        var row = count % items_per_row;
        var termin = objJson[i];
        var datum = new Date(termin.datum);
        var card = `
        <div class="col-md-4 text-left">
        <div class="datecard" style="float: none;">
        
        <h3>${termin.titel}</h3>
        <i class="fa fa-calendar"> </i> ${datum.toLocaleDateString()}
        </br>
        <i class="fa fa-map-marker"> </i> ${termin.ort}
        </br></br>
        Leitung: ${termin.leitung}
        </br></br>
        ${termin.content}
        </br>
        </div>
        </div>  `;
        if (termin.link != null){
            card = `<a href=${termin.link} target="_blank">${card}</a>`;
        }
        cur_content += card
        if ( row == 0 | i == objJson.length-1 ) {
            (cur_content);
            content += `
            <div class="row">
            ${cur_content}
            </div>`;
            cur_content = "";
        }
        count += 1;
    }
    listing_table.innerHTML = content;
    // page_span.innerHTML = `${page}/${numPages()}`;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}

window.onload = function() {
    changePage(1);
};