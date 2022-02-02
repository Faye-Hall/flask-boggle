let score = 0;
let time = 10;

// on start button click begin timer
$(".start-button").on("click", async function () {
    timer();
    $(".start-button").hide();
})

// with submission of form, stop from refreshing page and then saving value of input
$(".add-word").on("submit", async function (evt) {
    evt.preventDefault();
    word = ($('input').val());


    // check server for validity
    const response = await axios.get("/check-word", {
        params: {
            word: word
        }
    });

    // checks to see if score needs to be updated. 
    if (response.data.result === "ok") {
        score += (word.length)
        $(".board").append("\n" + `+ ${word.length}`)


    }
})

//begin the countdown timer & check to see if timer is 0, hide guessing interface.

function timer() {
    setInterval(function countdown() {
        if (time > 0) {
            time--
            console.log(time)
        }

    }, 1000);
    setTimeout(function () {
        if (time === 0) {
            $(".add-word").hide();
            $(".board").append(`***FINAL SCORE!!! ${score}***`)
            endScore();

        }
    }, 10000)
}

// Send post request of final game score to server to save in sesssion
async function endScore() {
    const response = await axios.post("/post-score", {
        "score": score
    })

    console.log(response.data)
}