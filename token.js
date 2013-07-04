// SimpleJSTokenizer tokenizes simplified JavaScript
// MIT License, 2013
// Saman Sedighi Rad <saman@posteo.de>

var fs = require('fs');

function tokenizer(source) {
    "use strict";

    var c,
        i = -1, // next() drives the look by incrementing first
        tokens = [],
        matched = false,

    // Sorted by look ahead priority descending
        matches = [
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
        return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';
    };

    String.prototype.isNumber = function () {
        var c = this[0];
        return c >= '0' && c <= '9';
    };

    String.prototype.is = function (c) {
        return this[0] === c;
    };

    String.prototype.isNoise = function () {
        var c = this[0];
        return (c.charCodeAt(0) <= 32);
    };

    /**
     * Add a new token to the tokens list.
     * @param type
     * @param name
     */
    function pushToken(type, name) {
        tokens.push({type: type, token: name});
    }

    /**
     * Advances and reads the next char.
     * @returns {boolean}
     */
    function next() {
        i += 1;
        if (i < source.length) {
            c = source.charAt(i);
            return true;
        }
        return false;
    }

    function EOF() {
        pushToken('EOF', '');
    }

    function lookAhead(n) {
        var lookAhead = i + n;

        if (lookAhead < source.length) {
            return source.charAt(lookAhead);
        }
        return '';
    }

    function number() {
        var number = '';

        while (i < source.length) {
            if (c.isNumber() && lookAhead(1) === '.') {
                number += c;
                next();
                number += c;
            }
            else if (c.isNumber()) {
                number += c;
            }
            else {
                break;
            }
            next();
        }

        pushToken('NUMBER', number);
    }

    function name() {
        var name = '';

        do {
            name += c;
            next();
        } while (c.isLetter() && (i < source.length));

        pushToken('NAME', name);
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
                rightSourceBoundry = source.length - tokenLength,
                confirmedLookAhead = c.is(token.text.charAt(tokenPos));

            while (confirmedLookAhead && (tokenPos < tokenLength) && (i < rightSourceBoundry)) {
                confirmedLookAhead = confirmedLookAhead && c.is(token.text.charAt(tokenPos));

                if (confirmedLookAhead) {
                    consumed += c;
                    tokenPos += 1;
                    next();
                } else {
                    consumed = '';
                    i -= tokenPos + 1;
                    next();
                }
            }
            if (confirmedLookAhead) {
                matched = true;
            }
        } else {
            // Single char
            if (c.is(token.text)) {
                consumed = token.text;
                matched = true;
            }
        }

        if (consumed !== '') {
            matched = true;
            pushToken(token.type, token.text);
        }
    }

    /**
     * Simple string without \" or \'
     * @param terminator
     */
    function literal(terminator) {
        var literal = '',
            tokenType = 'DOUBLE_QUOTE';

        // Open string token
        if (c.is("'")) {
            tokenType = 'SINGLE_QUOTE';
        }
        pushToken(tokenType, terminator);
        next();

        while (!c.is(terminator)) {
            literal += c;
            next();
        }

        pushToken('LITERAL', literal);

        // Close string token
        pushToken(tokenType, terminator);
    }

    function comment() {
        while (!c.is('\n')) {
            next();
        }
    }

    while (next()) {
        if (c.isNoise()) {
            continue;
        }

        // Comments
        if (c.is('/') && lookAhead(1).is('/')) {
            next();
            comment();
        }

        if (c.isNumber()) {
            number();
        }

        // Strings
        if (c.is('"') || c.is("'")) {
            literal(c);
        }

        // Names
        if (c.isLetter() || c.is('_')) {
            name();
        }

        for (var m = 0; m < matches.length; m += 1) {
            if (tryMatch(matches[m])) {
                continue;
            }
        }

        if (!matched && c.charCodeAt(0) > 32) {
            throw { message: 'Not recognized character (ASCII): ' + c.charCodeAt(0)};
        }
    }
    EOF();
    return tokens;
}

(function () {
    var file = './' + (process.argv.splice(2)[0]);

    fs.readFile(file, {encoding: 'utf8', flag: 'r'}, function (err, data) {
        if (err) {
            throw err;
        } else {
            var tokens = tokenizer(data);
            console.log(tokens);
        }
    });
}());