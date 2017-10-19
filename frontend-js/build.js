import indexOf from 'lodash/indexOf';

import { TEMPLATES, CATEGORIES, CONJUNCTIONS } from '../words';
import { indexesToCode, WORDS } from '../code';

new Vue({
    el: '#builder',
    data: {
        templates: TEMPLATES,
        categories: CATEGORIES,
        conjunctions: CONJUNCTIONS,
        selectedCategoryOne: null,
        selectedCategoryTwo: null,
        templateOne: null,
        wordOne: null,
        conjunction: null,
        templateTwo: null,
        wordTwo: null
    },
    computed: {
        wordsOne() {
            return CATEGORIES[this.selectedCategoryOne];
        },
        wordsTwo() {
            return CATEGORIES[this.selectedCategoryTwo];
        },
        code() {
            let wordOneIndex = indexOf(WORDS, this.wordOne);
            let wordTwoIndex = indexOf(WORDS, this.wordTwo);

            if (wordOneIndex === -1) {
                wordOneIndex = null;
            }

            if (wordTwoIndex === -1) {
                wordTwoIndex = null;
            }

            let code = indexesToCode(
                this.templateOne,
                wordOneIndex,
                this.conjunction,
                this.templateTwo,
                wordTwoIndex
            );

            return code;
        }
    }
});
