
function search() {
    let isbn = document.getElementById("input_data").value;

    if (!validateISBN(isbn)) {
        return;
    }
    
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let obj = JSON.parse(this.responseText.replace(";",'').split("=")[1]);
            let keys = Object.keys(obj);
            
            let book = obj[keys[0]];
            updateBookInfo(book);


        }
    };
    xhttp.open("GET", "https://openlibrary.org/api/books?bibkeys=ISBN:"+isbn, true);
    xhttp.send();
}

function validateISBN(isbn) {
    if (!isbn || isbn == "") {
        alert("Please enter ISBN number");
        return false;
    }
    if (isbn.length == 10 || isbn.length == 13) {

        return true;
    }
    alert("ISBN number must be 10 or 13 characters length");
    return false;
}

function updateBookInfo(book)
{
    
    let infoUrl = book['info_url'];
    let previewUrl = book['preview_url'];
    let thumbNail = book['thumbnail_url'];

    if(infoUrl)
    {
        let info = document.getElementById("info");
        info.innerText = infoUrl;
        info.setAttribute("href",infoUrl);
        info.setAttribute("traget","_blank");
    }
    if(previewUrl)
    {
        let preview = document.getElementById("preview");
        preview.innerText = previewUrl;
        preview.setAttribute("href",previewUrl);
        preview.setAttribute("traget","_blank");
    }
    if(thumbNail)
    {
        let thumnail = document.getElementById("thumnail");
        thumnail.innerText = thumbNail;
        thumnail.setAttribute("src",thumbNail);
        
    }
    else
    {
        let thumnail = document.getElementById("thumnail");
        thumnail.setAttribute("src","images/book.jpg");
    }

}
