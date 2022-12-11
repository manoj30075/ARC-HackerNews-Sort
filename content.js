// author: Manoj kumar reddy Palasamudram
// email: mp6112@rit.edu
// date: 2022-12-06
// description: Sort news by votes, comments, time
// Path: content.js
// Language: javascript

const sortNewsByVotes = (sort, sortBy) => {
    const scores = document.querySelectorAll("span.score");
    const comments = document.querySelectorAll("a[href^='item?id=']");

    const scoresObj = {};
    const commentsObj = {};

    // filter out the comments which has text "comments" or "comment" in regex form
    const filteredComments = Array.from(comments).filter((comment) => {
        return comment.innerText.match(/comment(s)?/);
    });


    const trs_temp = document.querySelectorAll("#hnmain > tbody > tr:nth-child(3) > td > table:nth-child(2) > tbody tr");
    const trsToArr = Array.from(trs_temp);
    let index = [];

    // for loop to get all the required elements
    for (var i = 1; i < 88; i += 3) {
        const toCheckTr = trsToArr[i];

        if (sortBy === "votes") {
            if (toCheckTr.lastChild.firstChild.className !== 'subline') {
                index.push(((i+2)/3) - 1);
            }
        } else if (sortBy === "comments") {
            if (!toCheckTr.innerText.match(/comment(s)?/)) {
                index.push(((i+2)/3) - 1);
            }
        }
    }

    // creating comments object with
    let counter = 0;
    for (var i = 0; i < filteredComments.length; i++) {
        const innerText = filteredComments[i].innerText;
        // split the string into an array of strings
        const split = innerText.split(" ");
        // get first element of the array and parse it to an integer
        const noOfComments = parseInt(split[0]);

        // add 0 to the comments object if there are no comments for the post
        if (index.includes(i)) {
            counter++;
            commentsObj[i] = 0;
        } else {
            commentsObj[i + counter] = noOfComments;
        }
    }

    counter = 0;
    for (var i = 0; i < scores.length; i++) {
        const innerText = scores[i].innerText;
        // split the string into an array of strings
        const split = innerText.split(" ");
        // get first element of the array and parse it to an integer
        const score = parseInt(split[0]);

        // add 0 to the score object if there is no score for the post
        if (index.includes(i)) {
            counter++;
            scoresObj[i] = 0;
        }
        else {
            scoresObj[i + counter] = score;
        }
    }

    let sortedScoresIndices;

    if (sort) {
        if (sortBy === "votes") {
            sortedScoresIndices = Object.keys(scoresObj).sort((a, b) => scoresObj[a] - scoresObj[b]);
        } else if (sortBy === "comments") {
            sortedScoresIndices = Object.keys(commentsObj).sort((a, b) => commentsObj[a] - commentsObj[b]);
        }
    } else {
        if (sortBy === "votes") {
            sortedScoresIndices =
                Object.keys(scoresObj);
        } else if (sortBy === "comments") {
            sortedScoresIndices =
                Object.keys(commentsObj);
        }
    }

// parse the sortedScoresIndices array to an array of integers
    const sortedScoresIndicesInt = sortedScoresIndices.map((index) => {
        return parseInt(index);
    });

    for (var i = 0; i < sortedScoresIndicesInt.length; i++) {
        const trs = document.querySelectorAll("#hnmain > tbody > tr:nth-child(3) > td > table:nth-child(2) > tbody tr");
        const trIndex = sortedScoresIndicesInt[i];
        const topTr1 = trs[trIndex * 3];
        const topTr2 = trs[trIndex*3 + 1];
        const topTr3 = trs[trIndex*3 + 2];

        trs[trIndex * 3].remove();
        trs[trIndex*3 + 1].remove();
        trs[trIndex*3 + 2].remove();

        trs[0].insertAdjacentElement("beforebegin", topTr1);
        trs[0].insertAdjacentElement("beforebegin", topTr2);
        trs[0].insertAdjacentElement("beforebegin", topTr3);

        // increment by 1 to all the elements in the sortedScoresIndicesInt array before the trIndex
        for (var j = 0; j < sortedScoresIndicesInt.length; j++) {
            if (sortedScoresIndicesInt[j] < trIndex) {
                sortedScoresIndicesInt[j] += 1;
            }
        }

    }
}

const addSortButtons = () => {
    const main = document.querySelector("#hnmain > tbody > tr:nth-child(3) > td");

    // create Most Votes button
    const button = document.createElement("button");
    button.innerText = "Most votes";
    button.addEventListener("click", () => sortNewsByVotes(true, "votes"));


    // create Most Comments button
    const button2 = document.createElement("button");
    button2.innerText = "Most comments";
    button2.addEventListener("click", () => sortNewsByVotes(true, "comments"));


    // create a tr element
    const tr = document.createElement("tr");
    const text = document.createTextNode("Sort by: ");
    // create a td element
    const td = document.createElement("td");

    // append the created elements
    td.appendChild(text);
    td.appendChild(button);
    td.appendChild(button2);
    tr.appendChild(td);

    const tbody = document.createElement("tbody");
    tbody.appendChild(tr);

    const table = document.createElement("table");
    table.appendChild(tbody);

    main.insertAdjacentElement("afterbegin", table);
    button.style.marginRight = "10px";
    button2.style.marginRight = "10px";
}

const addTargetBlank = () => {
    const lengthOfItems = document.getElementsByClassName("titleline").length;

    for (let i = 0; i < lengthOfItems; i++) {
        document.getElementsByClassName("titleline").item(i).firstChild.target = "_blank"
    }
}


const checkIfUserIsOnHomePage = () => {
    const url = window.location.href;
    const hackerNewsUrls = ["https://news.ycombinator.com/", "https://news.ycombinator.com/news"]

    if (hackerNewsUrls.includes(url)) {
        addSortButtons();
    }
}

checkIfUserIsOnHomePage()
addTargetBlank();
