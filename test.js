// get span elements with class "score", get inner text parse the number
// that is present in the string and console it

const scores = document.querySelectorAll("span.score");

let topScoreIndex = 0;
let topScore = 0;


for (var i = 0; i < scores.length; i++) {
    const innerText = scores[i].innerText;
    // split the string into an array of strings
    const split = innerText.split(" ");
    // get first element of the array and parse it to an integer
    const score = parseInt(split[0]);
    if (score > topScore) {
        topScore = score;
        topScoreIndex = i;
    }
}

// get all the tr elements in the table whose border is 0
const trs = document.querySelectorAll("table table[border='0'] tbody tr");

// pull out the tr element that has the highest score
const topTr1 = trs[topScoreIndex*3 + 1];
const topTr2 = trs[topScoreIndex*3 + 2];
const topTr3 = trs[topScoreIndex*3 + 3];
// delete the tr elements that has the highest score from the trs node list
trs[topScoreIndex*3 + 1].remove();
trs[topScoreIndex*3 + 2].remove();
trs[topScoreIndex*3 + 3].remove();

// insert topTr1, topTr2, topTr3 at the top of the trs node list
const trs2 = document.querySelectorAll("table table[border='0'] tbody tr");
// trs[0].insertAdjacentElement("beforebegin", topTr3);
// trs[0].insertAdjacentElement("beforebegin", topTr2);

// convert trs2 to an array
const trs2Array = Array.from(trs2);
// insert topTr1, topTr2, topTr3 at the top of the trs node list
trs2Array.splice(0, 0, topTr1, topTr2, topTr3);

// convert arraylist back to node list
const trs2NodeList = trs2Array.map((tr) => {
    return document.createRange().createContextualFragment(tr);
});

// convert trs2Array to a string
const trs2String = trs2Array.join("");

console.log(trs2String)


// update the dom with the new trs2Array
document.querySelectorAll("#hnmain > tbody > tr:nth-child(3) > td > table > tbody").innerHTML = trs2NodeList;





