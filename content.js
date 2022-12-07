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
const trs = document.querySelectorAll("#hnmain > tbody > tr:nth-child(3) > td > table > tbody tr");



// pull out the tr element that has the highest score
const topTr1 = trs[topScoreIndex*3 + 0];
const topTr2 = trs[topScoreIndex*3 + 1];
const topTr3 = trs[topScoreIndex*3 + 2];
// delete the tr elements that has the highest score from the trs node list
trs[topScoreIndex*3 + 0].remove();
trs[topScoreIndex*3 + 1].remove();
trs[topScoreIndex*3 + 2].remove();

trs[0].insertAdjacentElement("beforebegin", topTr1);
trs[0].insertAdjacentElement("beforebegin", topTr2);
trs[0].insertAdjacentElement("beforebegin", topTr3);





