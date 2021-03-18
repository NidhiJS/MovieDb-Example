xhr = new XMLHttpRequest();
var n = 2;

function fetch() {
    xhr.onreadystatechange = showMovies;
    xhr.timeout = 6000;
    xhr.ontimeout = backoff;
    var data = "{}";
    xhr.open("GET", "https://api.themoviedb.org/3/tv/airing_today?page=1&language=en-US&api_key=<!!!!!!!!!!!!!!!enter the movie db api key !!!!!!!!!!!>");

    xhr.send(data);
}




function showMovies() {
    if (this.readyState === this.DONE) {
        var myArr = JSON.parse(this.responseText);
        for (i in myArr.results) {
            var p = document.createElement("P");
            p.innerHTML = "Title:<br>" + myArr.results[i].title;

            var overview = document.createElement("P");
            overview.innerHTML = "Overview:<br>" + myArr.results[i].overview;
            overview.setAttribute("height", "450px");
            overview.setAttribute("width", "250px");

            var popularity = document.createElement("P");
            popularity.innerHTML = "Rating: " + myArr.results[i].vote_average;

            var elem = document.createElement("img");
            elem.setAttribute("src", "https://image.tmdb.org/t/p/w500/" + myArr.results[i].poster_path);
            elem.setAttribute("height", "150px");
            elem.setAttribute("width", "150px");
            elem.setAttribute("alt", "Flower");

            var div = document.createElement("div");
            div.classList.add("content");


            div.appendChild(elem);
            div.appendChild(p);
            div.appendChild(overview);
            div.appendChild(popularity);
            var div2 = document.createElement("div");
            div2.classList.add("column");
            div2.appendChild(div);
            document.getElementById("main").appendChild(div2);

        }
        setTimeout(fetch, 1000000);
        n = 2;


    }
}

function backoff() {
    console.log("failed");
    n = n * 2;
    console.log(n);
    setTimeout(fetch, n * 1000);
}