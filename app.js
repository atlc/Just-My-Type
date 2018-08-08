$('document').ready(function () {
    $('#yellow-block').attr('hidden', true);
    // Hides the uppercase keyboard on the loading of the document
    $('#keyboard-upper-container').attr('hidden', true);

    let sentences = [
        'ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'
    ];

    function iterateThroughSentences() {
        let sentenceChars = sentences[0].split('');
        let id = 0;
        sentenceChars.forEach(function(char) {
            $('#sentence').append('<p id=\'char'+ id + '\' style=\'display: inline;\'>'+char+'</p>');
            //$('#char'+id).addClass('highlight');
            $('#char0').addClass('highlight');
            id++;
        });
    };

    function correctCharacter(char) {

    };

    iterateThroughSentences();


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

    // Highlights the key and adds animation if applicable, waits 0.15s, and then removes the class 
    $('body').keypress(function (event) {
        let keyASCII = event.which;
        let $selector = $("[id='" + keyASCII + "']");
        $($selector).addClass('keypress');
        setTimeout(function () { $($selector).removeClass('keypress'); }, 150);
    });
});