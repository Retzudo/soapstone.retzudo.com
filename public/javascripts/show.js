(function () {
    'use strict';

    var WORDS = _.chain(CATEGORIES).values().flatten().value();
    var input = document.getElementById('code');
    var messageContainer = document.getElementById('message');

    if (!window.location.hash) {
        window.location.href = '/create';
    }

    try {
        var message = getMessage(window.location.hash.replace(/#/, ''));
        messageContainer.innerHTML = message;
    } catch (e) {
        console.error('Error: ' + e);
        messageContainer.innerHTML = '';
    }

    function getMessage(code) {
        if (!code.match(/^[0-9a-g][0-9a-z]{2}$/) && !code.match(/^[0-9a-g][0-9a-z]{2}[0-9][0-9a-g][0-9a-z]{2}$/)) {
            throw 'Invalid code';
        }

        if (code.length === 3) {
            var templateId = code[0];
            var wordId = code.slice(1, 3);

            var template = getTemplate(templateId);
            var word = getWord(wordId);

            return makeSentence(template, word);
        }

        if (code.length === 7) {
            var templateId = code[0];
            var wordId = code.slice(1, 3);

            var template = getTemplate(templateId);
            var word = getWord(wordId);

            var partOne = makeSentence(template, word);

            var conjunctionId = code[3];
            templateId = code[4];
            wordId = code.slice(5, 7);

            var conjunction = getConjunction(conjunctionId);
            var template = getTemplate(templateId);
            var word = getWord(wordId);

            var partTwo = makeSentence(template, word);

            return partOne + '<br>' + conjunction + ' ' + partTwo;
        }
    }

    function getTemplate(codePart) {
        codePart = parseInt(codePart.trim(), 17);
        var template = TEMPLATES[codePart];
        if (!template) {
            throw 'Invalid template';
        }
        return template;
    }

    function getConjunction(codePart) {
        codePart = parseInt(codePart.trim(), 10);
        var conjunction = CONJUNCTIONS[codePart];
        if (!conjunction) {
            throw 'Invalid conjunction';
        }
        return conjunction;
    }

    function getWord(codePart) {
        codePart = parseInt(codePart.trim(), 36);
        var word = WORDS[codePart];
        if (!word) {
            throw 'Invalid word';
        }
        return word;
    }

    function makeSentence(template, word) {
        return template.replace(/\*\*\*\*/, word.trim());
    }
}());
