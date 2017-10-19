const values = require('lodash/values');
const flatten = require('lodash/flatten');

const { TEMPLATES, CONJUNCTIONS, CATEGORIES } = require('./words');

const WORDS = flatten(values(CATEGORIES));

function indexesToCode(templateOneIndex, wordOneIndex, conjunctionIndex = null, templateTwoIndex = null, wordTwoIndex = null) {
    let code = '';

    if (!templateOneIndex || !wordOneIndex) {
        return code;
    }

    let templateOneCode = templateOneIndex.toString(17);
    let wordOneCode = wordOneIndex.toString(36);

    if (wordOneCode && wordOneCode.length === 1) {
        wordOneCode = '0' + wordOneCode;
    }

    code += templateOneCode + wordOneCode;

    if (conjunctionIndex && templateTwoIndex && wordTwoIndex) {
        let conjunctionCode = (conjunctionIndex - 1).toString(10);
        let templateTwoCode = templateTwoIndex.toString(17);
        let wordTwoCode = wordTwoIndex.toString(36);

        if (wordTwoCode && wordTwoCode.length === 1) {
            wordTwoCode = '0' + wordTwoCode;
        }

        code += conjunctionCode + templateTwoCode + wordTwoCode;
    }

    return code;
}

function codeToMessage(code) {
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

        return `${partOne} ${conjunction} ${partTwo}`;
    }
}

function getTemplate(codePart) {
    codePart = parseInt(codePart.trim(), 17);
    var template = TEMPLATES[codePart];

    if (template) {
        return template;
    }
}

function getConjunction(codePart) {
    codePart = parseInt(codePart.trim(), 10) + 1;
    let conjunction = CONJUNCTIONS[codePart];

    if (conjunction) {
        return conjunction;
    }
}

function getWord(codePart) {
    codePart = parseInt(codePart.trim(), 36);
    let word = WORDS[codePart];

    if (word) {
        return word;
    }
}

function makeSentence(template, word) {
    return template.replace(/\*\*\*\*/, word.trim());
}

module.exports = {
    codeToMessage,
    indexesToCode,
    WORDS
};
