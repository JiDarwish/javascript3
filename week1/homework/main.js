const hyfUrl = "https://api.github.com/orgs/HackYourFuture/repos"; //repos url

//div where in all repos will go
let allDiv = document.createElement("div");
allDiv.setAttribute("id", "allRepoContainer");
document.body.appendChild(allDiv);

//button displays all repos
let showRepo = document.getElementById("showRepos");
showRepo.onclick = () => {
 document.getElementById("searchTerm").style.display = "block";
    XHR(hyfUrl, allRepoRender)
};

//clear all button
let allRepoClearer = document.getElementById("clearButt");
allRepoClearer.onclick = () => {
    allDiv.innerHTML = "";
    document.getElementById("searchTerm").style.display = "none"
};

//button filter 
let orderForm = document.getElementById("orderForm");
let orderTrigger = document.getElementById("orderTrigger");
orderTrigger.onclick = () => {
    let orderAspect = orderForm.options[orderForm.selectedIndex].value;
    XHR(hyfUrl, order, orderAspect);
}


//Statistics button
let statisticButt = document.getElementById("statistic");
statisticButt.onclick = () => XHR(hyfUrl, statistics);






//GET request
function XHR(theUrl, callback, filter) {
    let request = new XMLHttpRequest();
    request.open("GET", theUrl, true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let rawData = request.responseText;

            setTimeout(callback, 500, rawData, filter);
        }
    }
}





//function displays the statistics
function statistics(raw){
    //if there is sth throw it away!
    if (!allDiv.innerHTML == ""){
        allDiv.innerHTML = "";
    }
    
    let theData = JSON.parse(raw);//parse data into valid JSON
    
    //Making new objects of the max and mix of sth
    let maxForks = theData.reduce((a, b) => {return (a.forks > b.forks) ? a: b});
    let minForks = theData.reduce((a, b) => {return (a.forks < b.forks) ? a: b});
    let maxWatch = theData.reduce((a, b) => {return (a.watchers > b.watchers) ? a: b});
    let minWatch = theData.reduce((a, b) => {return (a.watchers < b.watchers) ? a: b});
    let maxSize = theData.reduce((a, b) => {return (a.size > b.size) ? a: b});
    let minSize = theData.reduce((a, b) => {return (a.size < b.size) ? a: b});
    
    //Total stuff calc
    let totalForks = theData.reduce((a,b) => { a += b.forks; return a}, 0);
    let totalWatchers = theData.reduce((a,b) => { a += b.watchers; return a}, 0);
    let totalSize = theData.reduce((a, b) => { a += b.size; return a}, 0)
    
    ////container and header for statistics
    let divInDiv = document.createElement("div");
    divInDiv.setAttribute("id", "statisticDiv");
    allDiv.appendChild(divInDiv);
    let h1 = document.createElement("h1");
    h1.innerHTML = "Statistics of HYF repositories";
    divInDiv.appendChild(h1);
    
    //Statistic list parent
    let ul = document.createElement("ul");
    ul.setAttribute("id", "statisticList");
    divInDiv.appendChild(ul);
    
    //forks
    let forkLi = document.createElement("li");
    ul.appendChild(forkLi);
    let h3Fork = document.createElement("h3");
    h3Fork.innerHTML = "Forks";
    forkLi.appendChild(h3Fork);
    let pForks = document.createElement("p");
    pForks.innerHTML = "Total forks: " + totalForks + "<br />"
                + "Most forked repo is <span>" + maxForks.name + "</span> Number of forks:  " + maxForks.forks + "<br />" 
                + "Least forked repo is <span>" + minForks.name + "</span> Number of forks: " + minForks.forks;
    forkLi.appendChild(pForks);
    
    
    //Watchers
    let watchLi = document.createElement("li");
    ul.appendChild(watchLi);
    let h3Watch = document.createElement("h3");
    h3Watch.innerHTML = "Watchers";
    watchLi.appendChild(h3Watch);
    let pWatch = document.createElement("p");
    pWatch.innerHTML = "Total watchers: " + totalWatchers + "<br />"
                + "Most watched repo is <span>" + maxWatch.name + "</span> Number of watchers:  " + maxWatch.watchers + "<br />" 
                + "Least watched repo is <span>" + minWatch.name + "</span> Number of watchers: " +  minWatch.watchers;
    watchLi.appendChild(pWatch);
    
    
    //Sizes
    let sizeLi = document.createElement("li");
    ul.appendChild(sizeLi);
    let h3Size = document.createElement("h3");
    h3Size.innerHTML = "Size";
    sizeLi.appendChild(h3Size);
    let pSize = document.createElement("p");
    pSize.innerHTML = "Total size: " + totalSize + "<br />"
                + "Biggest size repo is <span>" + maxSize.name + "</span>, it's size:  " + maxSize.size + "<br />" 
                + "Smallest repo is <span>" + minSize.name + "</span> it's Size: " +  minSize.size;
    sizeLi.appendChild(pSize);
}




//function assembles all the repos in appropriate elements
function allRepoRender(response) {
    let theData = JSON.parse(response);
    if (!allDiv.innerHTML == ""){
        allDiv.innerHTML = "";
    }
    let ul = document.createElement("ul"); // ul creater
    allDiv.appendChild(ul);
    //loop prints all repos name into fitting elements
    for (i in theData) {
        let li = document.createElement("li");
        li.setAttribute("class", "oneOfAll");
        let h3 = document.createElement("h3");
        h3.innerHTML = theData[i].name;
        li.appendChild(h3);
        let link = document.createElement("a");
        link.setAttribute("href", "https://github.com/HackYourFuture/" + theData[i].name);
        link.innerHTML = "here";
        let p = document.createElement("p");
        p.innerHTML = "A link to the course: ";
        let pDetails = document.createElement("p");
        pDetails.innerHTML = "Forks: " + theData[i].forks + ", Watchers: " + theData[i].watchers + ", Size: " + theData[i].size;
        p.appendChild(link);
        li.appendChild(p);
        li.appendChild(pDetails);
        ul.appendChild(li);
    }
}



function order(rawData, orderAspect) {
    let theData = JSON.parse(rawData);
    switch (orderAspect) {
        case "forks":
            let forkOrder = theData.sort((a, b) => b.forks - a.forks);
            allRepoRender(JSON.stringify(forkOrder));
            break;
        case "watchers":
            let watchOrder = theData.sort((a, b) => b.watchers - a.watchers);
            allRepoRender(JSON.stringify(watchOrder));
            break;
        case "size":
            let sizeOrder = theData.sort((a, b) => b.size - a.size);
            allRepoRender(JSON.stringify(sizeOrder));
            break;
    }
}
