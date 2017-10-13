This is a website that gets all HackYourFuture's repositories and displays them on command of the user (the user can clear the screen again if he wants as well)
The website enables the user aswell to oreder the list of repositories in many aspects. The most forked repository, the most viewd ones and the largest size wise.


The solution of the problem was by sending a XmlHttpRequest to the API mentioned further in the readme file, and making the request Asynchronous so that the page don't break while loading if the URL for the API was (for some reason) unvalid.



- Here is a sample of the GET request:


```javascript
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
```


- And here is a sample of using arrow functions:


```javascript
statisticButt.onclick = () => XHR(hyfUrl, statistics);
```


- And last but not least a sample of using one of the Arrays methods:

```javascript
let maxForks = theData.reduce((a, b) => {return (a.forks > b.forks) ? a: b});
```



This was a homework assignment that I had to make for HackYourFuture, but the main motivation behind this is to practice using the arrow functions and some very interesting array built in function.


the Api used for the homework is: 
https://api.github.com/orgs/HackYourFuture/repos

Have fun using the website!!! ^_^
[Link to page](https://jidarwish.github.io/javascript3/week1/homework/)
