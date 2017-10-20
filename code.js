const values = require('lodash/values');
const flatten = require('lodash/flatten');

const { TEMPLATES, CONJUNCTIONS, CATEGORIES } = require('./words');

const WORDS = flatten(values(CATEGORIES));

function indexesToCode(templateOneIndex, wordOneIndex, conjunctionIndex = null, templateTwoIndex = null, wordTwoIndex = null) {
    let code = '';

    if (!templateOneIndex && templateOneIndex !== 0 || !wordOneIndex && wordOneIndex !== 0) {
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
    let message = {
      partOne: null,
      conjunction: null,
      partTwo: null
    };

    if (!code.match(/^[0-9a-g][0-9a-z]{2}$/) && !code.match(/^[0-9a-g][0-9a-z]{2}[0-9][0-9a-g][0-9a-z]{2}$/)) {
        return message;
    }

    if (code.length >= 3) {
        let templateId = code[0];
        let wordId = code.slice(1, 3);

        let template = getTemplate(templateId);
        let word = getWord(wordId);

        message.partOne = makeSentence(template, word);
    }

    if (code.length === 7) {
        let conjunctionId = code[3];
        let templateId = code[4];
        let wordId = code.slice(5, 7);

        let template = getTemplate(templateId);
        let word = getWord(wordId);

        message.conjunction = getConjunction(conjunctionId);
        message.partTwo = makeSentence(template, word);
    }

    return message;
}

function getTemplate(codePart) {
    codePart = parseInt(codePart.trim(), 17);
    let template = TEMPLATES[codePart];

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
