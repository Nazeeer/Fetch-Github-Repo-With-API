let scroller =document.querySelector(".scroller");
let height =document.documentElement.scrollHeight - document.documentElement.clientHeight;

console.log(document.documentElement.scrollHeight);
console.log(document.documentElement.clientHeight);
console.log(height);


window.addEventListener('scroll',()=>{
    let scrollTop =document.documentElement.scrollTop;

    // console.log(scrollTop);
    let test = `${(scrollTop/height)*100}%`;
    scroller.style.width = `${test}`;
})


//////////////////////////////////////////////////////


let theInput = document.getElementById("nameOfRepo");
let btn =document.querySelector("button");
let showRepos =document.querySelector(".show-data");


btn.onclick = ()=>{
    getRepos();
}

// function  get repos
function getRepos(){
    if(theInput.value == ""){
        // console.log("value can't be empty");
        showRepos.innerHTML = `<span>Please Write Github Username</span>`;
    }else{
        // console.log(theInput.value);
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => response.json())
        .then((repos) => {
            // console.log(repos);
            showRepos.innerHTML = "";

            repos.forEach(repo => {
                console.log(repo.name);
                let mainDiv =document.createElement("div");
                let repoName =document.createTextNode(`${repo.name}`);
                mainDiv.appendChild(repoName);

                // create repo url
                let theUrl =document.createElement("a");
                let theUrlText =document.createTextNode("visit");
                theUrl.appendChild(theUrlText);

                // add the hyper text
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                theUrl.setAttribute('target' , "_blank");
                mainDiv.appendChild(theUrl);

                let startSpan =document.createElement("span");
                let startText =document.createTextNode(`Stars ${repo.stargazers_count}`);

                startSpan.appendChild(startText);
                mainDiv.appendChild(startSpan);

                mainDiv.className='repoBox';

                showRepos.appendChild(mainDiv);
                // document.body.appendChild(mainDiv);
            });
        });
    }
}

