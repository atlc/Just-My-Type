$('document').ready(function () {
    // Prefer to use own highlighting class per each character than pushing this over fixed pixel widths
    $('#yellow-block').attr('hidden', true);
    // Hides the uppercase keyboard on the loading of the document
    $('#keyboard-upper-container').attr('hidden', true);

    // I honestly think these are the Irish lyrics (in an English accent) from 'Come On Eileen'
    let sentences = [
        'ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'
    ];

    // Global initialization variable declarations
    let sentenceArrayIndex = 0;
    let sentenceCharAtIndex = 0;
    let activeSentence = sentences[sentenceArrayIndex];
    let activeLetter = activeSentence.charAt(sentenceCharAtIndex);
    let correctLetters = 0;
    let incorrectLetters = 0;
    let totalIncorrect = 0;
    let correctPerSentenceArray = [];
    let incorrectPerSentenceArray = [];
    let startTime = new Date().getTime();
    let endTime = 0;
    const wordsInArray = 54; // Hardcoded count

    $('#sentence').text(activeSentence);
    $('#target-letter').text(activeLetter).addClass('highlight');

    /* ********************************************************************************
        TODO:
        Add timer function and postgame analytics. 
        Use bootstrap for some fancy displaying for the analytics and hide top elements
        Create recording to embed in README; pin repo to github.com/atlc.
            -> Set up GitHub Pages page for project
            -> (maybe add another for Bootstrap resume & other Covalence projects)
    ********************************************************************************  */

    function checkForCorrectCharacter(activeSentence, pressedKey) {
        if (sentenceArrayIndex < sentences.length) {
            if (sentenceCharAtIndex < activeSentence.length) {
                if (activeLetter == pressedKey) {
                    $('#feedback').append('<span class=\'glyphicon glyphicon-ok\'></span>');
                    sentenceCharAtIndex++;
                    activeLetter = activeSentence.charAt(sentenceCharAtIndex);
                    $('#target-letter').text(activeLetter);
                    correctLetters++;
                } else {
                    $('#feedback').append('<span class=\'glyphicon glyphicon-remove\'></span>');
                    incorrectLetters++;
                    totalIncorrect++;
                }
            } else {
                correctPerSentenceArray.push(correctLetters);
                incorrectPerSentenceArray.push(incorrectLetters);
                nextSentence();
            }
        } else {
            endgameAnalytics();
            if(confirm('Would you like to play again?')) {
                location.reload();
            }
        }
    };

    function endgameAnalytics() {
        endTime = new Date().getTime();
        let timeLapsed = ((endTime - startTime) / (1000 * 60)); // Gets the time per game in decimal minutes
        let WPM = (wordsInArray / timeLapsed) - (2 * totalIncorrect);
        alert(`Your words per minute score is: ${WPM}. \nYour total of incorrect characters is: ${totalIncorrect}`);
    };

    // As long as there is a new sentence, this resets all values and then increments the sentence index
    function nextSentence() {
        correctLetters = 0;
        incorrectLetters = 0;
        sentenceCharAtIndex = 0;
        sentenceArrayIndex++;
        activeSentence = sentences[sentenceArrayIndex];
        activeLetter = activeSentence.charAt(sentenceCharAtIndex);
        $('#sentence').text(activeSentence);
        $('#target-letter').text(activeLetter);
        $('#feedback').empty();
    };

    // When the shift key is held down, swap to the upper keyboard
    $('body').keydown(function (event) {
        let keyASCII = event.which;
        if (keyASCII === 16) {
            $('#keyboard-lower-container').attr('hidden', true);
            $('#keyboard-upper-container').attr('hidden', false);
        }
    });

    // When the shift key is released, swap back to the lower keyboard
    $('body').keyup(function (event) {
        let keyASCII = event.which;
        if (keyASCII === 16) {
            $('#keyboard-lower-container').attr('hidden', false);
            $('#keyboard-upper-container').attr('hidden', true);
        }
    });

    $('body').keypress(function (event) {
        // Highlights the key and adds animation if applicable, waits 0.15s, and then removes the class 
        let keyASCII = event.which;
        let $selector = $("[id='" + keyASCII + "']");
        $($selector).addClass('keypress');
        setTimeout(function () { $($selector).removeClass('keypress'); }, 150);
        checkForCorrectCharacter(activeSentence, event.key);
    });
});