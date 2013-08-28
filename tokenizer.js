// SimpleJSTokenizer tokenizes simplified JavaScript
// MIT License, 2013
// Saman Sedighi Rad <saman@posteo.de>

module.exports.tokenizer = function (text) {
    "use strict";

    var c,
        i,
    // next() increments "offset", the first statement is next(),
    // that's why we start by -1, so we have := 0 initially.
        offset = -1,
        tokens = [],
        matched = false,

    // Sorted by look ahead priority descending
        predefined = [
            {text: "===", type: 'OPERATOR'},
            {text: "!==", type: 'OPERATOR'},
            {text: ">>>", type: 'OPERATOR'},

            {text: "<<", type: 'OPERATOR'},
            {text: ">>", type: 'OPERATOR'},
            {text: "<=", type: 'OPERATOR'},
            {text: ">=", type: 'OPERATOR'},
            {text: "&&", type: 'OPERATOR'},
            {text: "||", type: 'OPERATOR'},
            {text: ">", type: 'OPERATOR'},
            {text: "<", type: 'OPERATOR'},
            {text: "|=", type: 'OPERATOR'},
            {text: "&=", type: 'OPERATOR'},

            {text: "+=", type: 'OPERATOR'},
            {text: "-=", type: 'OPERATOR'},

            {text: '(', type: 'LPARENT'},
            {text: ')', type: 'RPARENT'},
            {text: '{', type: 'LBRACE'},
            {text: '}', type: 'RBRACE'},
            {text: ';', type: 'SEMICOLON'},
            {text: '[', type: 'LSQUARE_BRACKET'},
            {text: ']', type: 'RSQUARE_BRACKET'},

            {text: "&", type: 'OPERATOR'},
            {text: "|", type: 'OPERATOR'},
            {text: "^", type: 'OPERATOR'},
            {text: "!", type: 'OPERATOR'},
            {text: "=", type: 'OPERATOR'},
            {text: "*", type: 'OPERATOR'},
            {text: "+", type: 'OPERATOR'},
            {text: "-", type: 'OPERATOR'},
            {text: "/", type: 'OPERATOR'},
            {text: "%", type: 'OPERATOR'},
            {text: "~", type: 'OPERATOR'},
            {text: ".", type: 'OPERATOR'},

            {text: ",", type: 'COMMA'}
        ];

    // Helpers
    String.prototype.isLetter = function () {
        var c = this[0];
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    };

    String.prototype.isNumber = function () {
        var c = this[0];
        return (c >= '0' && c <= '9');
    };

    String.prototype.is = function (c) {
        return this[0] === c;
    };

    String.prototype.isNoise = function () {
        var c = this[0];
        return c === ' ' || c === '\r' || c === '\n' || c === '\t' || c === '';
    };

    /**
     * Add a new token to the tokens list.
     * @param type
     * @param text Optional
     */
    function makeToken(type, text) {
        var token = {
            type: type
        };

        if (text) {
            token.text = text;
            token.from = offset - String(text).length;
            token.to = offset;
        }

        tokens.push(token);
    }

    /**
     * Advances and reads the next char.
     * @returns {boolean}
     */
    function next() {
        offset += 1;
        if (offset < text.length) {
            c = text.charAt(offset);
            return true;
        }
        return false;
    }

    function EOF() {
        makeToken('EOF');
    }

    function lookAhead(n) {
        var la = offset + n;

        if (la < text.length) {
            return text.charAt(la);
        }
        return;
    }

    function number() {
        var consumed = '';

        while (offset < text.length) {
            if (c.isNumber() && lookAhead(1) === '.') {
                consumed += c;
                next();
                consumed += c;
            } else if (c.isNumber()) {
                consumed += c;
            } else {
                break;
            }
            next();
        }

        makeToken('NUMBER', consumed);
    }

    function name() {
        var consumed = '';

        do {
            consumed += c;
        } while (next() && (c.isLetter() || c.is('_') || c.is('$') || c.isNumber()));

        // The initial offset, substract for makeToken
        offset -= 1;
        matched = true;
        makeToken('NAME', consumed);
        offset += 1;
    }

    /**
     * Matches with arbitrary look ahead.
     * @param token.text
     * @param token.type
     */
    function tryMatch(token) {
        var consumed = '',
            tokenPos = 0;

        // Needs lookAhead
        if (token.text.length > 1) {
            // Build token with lookAhead
            var tokenLength = token.text.length,
                tokenPos = 0,
                rightSourceBoundry = text.length - tokenLength,
                confirmedLA = c.is(token.text.charAt(tokenPos));

            while (confirmedLA && (tokenPos < tokenLength) && (offset < rightSourceBoundry)) {
                confirmedLA = confirmedLA && c.is(token.text.charAt(tokenPos));

                if (confirmedLA) {
                    consumed += c;
                    tokenPos += 1;
                    next();
                } else {
                    consumed = '';
                    offset -= tokenPos + 1;
                    next();
                }
            }
        } else {
            // Single char
            if (c.is(token.text)) {
                consumed = token.text;
            }
        }

        if (consumed !== '') {
            matched = true;
            makeToken(token.type, token.text);
        }
    }

    /**
     * Simple string without \" or \'
     * @param terminator
     */
    function string(terminator) {
        var consumed = '';
        next();

        while (!c.is(terminator)) {
            consumed += c;
            next();
        }
        matched = true;
        makeToken('STRING', consumed);
    }

    /**
     * Only single line comments supported
     */
    function comment() {
        do {
            next();
        } while (!c.is('\n'));
    }

    while (next()) {
        if (c.isNoise()) {
            continue;
        }

        // Comments
        if (c.is('/') && lookAhead(1).is('/')) {
            comment();
        }

        if (c.isNumber()) {
            number();
        }

        // Strings
        if (c.is('"') || c.is("'")) {
            string(c);
        }

        // Names
        if (c.isLetter() || c.is('_') || c.is('$')) {
            name();
        }

        for (i = 0; i < predefined.length; i += 1) {
            if (tryMatch(predefined[i])) {
                continue;
            }
        }
        if (!matched) {
            throw { message: 'Unexpected character: "' + c + '" (' + c.charCodeAt(0) + '), at: ' + offset };
        }
    }
    EOF();
    return tokens;
}