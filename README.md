SimpleJSTokenizer
=================

Tokenizes Simplified JavaScript.

* !== and === must be used in stead of != and ==
* No support for ++ and -- operators.
* No quote escaping within strings.
* Only single line comment: // Comment...
* Number can't start with a dot, but must start with a number (0.1, not .1).

That is all intentional.

Notice that the tokenizer, of course, doesn't know anything about the grammar.
A parser consuming this tokens will throw an exception (not included).

Example callable via:

````shell
node tokenize.js input.js
````

Example:

````javascript
"use strict";

function traversePath(obj, path) {
    var head,
        index;

    if (path.length > 1) {
        head = String(path.splice(0, 1));

        if (SCHICK.isArray(obj)) {
            head = parseInt(head, 10);
        }
        if (typeof obj[head] !== 'undefined') {
            return traversePath(obj[head], path);
        }
        // Passed the for() means we didn't found the key
        error('Key "' + head + '" not found in object');
    }
    // We are at the last element
    else {
        head = String(path.splice(0, 1));
        index = parseInt(head, 10);

        if (SCHICK.isArray(obj[index])) {
            return obj[index];
        }
        else if (typeof obj[head] !== 'undefined') {
            return obj[head];
        }
        else {
            error('Invalid query path: "' + head + '"');
        }
    }iojoi
}
````

Tokens:

````javascript
[ { type: 'STRING', text: 'use strict', from: 1, to: 11 },
  { type: 'SEMICOLON', text: ';', from: 11, to: 12 },
  { type: 'NAME', text: 'function', from: 16, to: 24 },
  { type: 'NAME', text: 'traversePath', from: 25, to: 37 },
  { type: 'LPARENT', text: '(', from: 37, to: 38 },
  { type: 'NAME', text: 'obj', from: 38, to: 41 },
  { type: 'COMMA', text: ',', from: 41, to: 42 },
  { type: 'NAME', text: 'path', from: 43, to: 47 },
  { type: 'RPARENT', text: ')', from: 47, to: 48 },
  { type: 'LBRACE', text: '{', from: 49, to: 50 },
  { type: 'NAME', text: 'var', from: 56, to: 59 },
  { type: 'NAME', text: 'head', from: 60, to: 64 },
  { type: 'COMMA', text: ',', from: 64, to: 65 },
  { type: 'NAME', text: 'index', from: 75, to: 80 },
  { type: 'SEMICOLON', text: ';', from: 80, to: 81 },
  { type: 'NAME', text: 'if', from: 89, to: 91 },
  { type: 'LPARENT', text: '(', from: 92, to: 93 },
  { type: 'NAME', text: 'path', from: 93, to: 97 },
  { type: 'OPERATOR', text: '.', from: 97, to: 98 },
  { type: 'NAME', text: 'length', from: 98, to: 104 },
  { type: 'OPERATOR', text: '>', from: 105, to: 106 },
  { type: 'NUMBER', text: '1', from: 108, to: 109 },
  { type: 'RPARENT', text: ')', from: 108, to: 109 },
  { type: 'LBRACE', text: '{', from: 110, to: 111 },
  { type: 'NAME', text: 'head', from: 121, to: 125 },
  { type: 'OPERATOR', text: '=', from: 126, to: 127 },
  { type: 'NAME', text: 'String', from: 128, to: 134 },
  { type: 'LPARENT', text: '(', from: 134, to: 135 },
  { type: 'NAME', text: 'path', from: 135, to: 139 },
  { type: 'OPERATOR', text: '.', from: 139, to: 140 },
  { type: 'NAME', text: 'splice', from: 140, to: 146 },
  { type: 'LPARENT', text: '(', from: 146, to: 147 },
  { type: 'NUMBER', text: '0', from: 148, to: 149 },
  { type: 'COMMA', text: ',', from: 148, to: 149 },
  { type: 'NUMBER', text: '1', from: 151, to: 152 },
  { type: 'RPARENT', text: ')', from: 151, to: 152 },
  { type: 'RPARENT', text: ')', from: 152, to: 153 },
  { type: 'SEMICOLON', text: ';', from: 153, to: 154 },
  { type: 'NAME', text: 'if', from: 166, to: 168 },
  { type: 'LPARENT', text: '(', from: 169, to: 170 },
  { type: 'NAME', text: 'SCHICK', from: 170, to: 176 },
  { type: 'OPERATOR', text: '.', from: 176, to: 177 },
  { type: 'NAME', text: 'isArray', from: 177, to: 184 },
  { type: 'LPARENT', text: '(', from: 184, to: 185 },
  { type: 'NAME', text: 'obj', from: 185, to: 188 },
  { type: 'RPARENT', text: ')', from: 188, to: 189 },
  { type: 'RPARENT', text: ')', from: 189, to: 190 },
  { type: 'LBRACE', text: '{', from: 191, to: 192 },
  { type: 'NAME', text: 'head', from: 206, to: 210 },
  { type: 'OPERATOR', text: '=', from: 211, to: 212 },
  { type: 'NAME', text: 'parseInt', from: 213, to: 221 },
  { type: 'LPARENT', text: '(', from: 221, to: 222 },
  { type: 'NAME', text: 'head', from: 222, to: 226 },
  { type: 'COMMA', text: ',', from: 226, to: 227 },
  { type: 'NUMBER', text: '10', from: 229, to: 231 },
  { type: 'RPARENT', text: ')', from: 230, to: 231 },
  { type: 'SEMICOLON', text: ';', from: 231, to: 232 },
  { type: 'RBRACE', text: '}', from: 242, to: 243 },
  { type: 'NAME', text: 'if', from: 253, to: 255 },
  { type: 'LPARENT', text: '(', from: 256, to: 257 },
  { type: 'NAME', text: 'typeof', from: 257, to: 263 },
  { type: 'NAME', text: 'obj', from: 264, to: 267 },
  { type: 'LSQUARE_BRACKET', text: '[', from: 267, to: 268 },
  { type: 'NAME', text: 'head', from: 268, to: 272 },
  { type: 'RSQUARE_BRACKET', text: ']', from: 272, to: 273 },
  { type: 'OPERATOR', text: '!==', from: 275, to: 278 },
  { type: 'STRING', text: 'undefined', from: 280, to: 289 },
  { type: 'RPARENT', text: ')', from: 289, to: 290 },
  { type: 'LBRACE', text: '{', from: 291, to: 292 },
  { type: 'NAME', text: 'return', from: 306, to: 312 },
  { type: 'NAME', text: 'traversePath', from: 313, to: 325 },
  { type: 'LPARENT', text: '(', from: 325, to: 326 },
  { type: 'NAME', text: 'obj', from: 326, to: 329 },
  { type: 'LSQUARE_BRACKET', text: '[', from: 329, to: 330 },
  { type: 'NAME', text: 'head', from: 330, to: 334 },
  { type: 'RSQUARE_BRACKET', text: ']', from: 334, to: 335 },
  { type: 'COMMA', text: ',', from: 335, to: 336 },
  { type: 'NAME', text: 'path', from: 337, to: 341 },
  { type: 'RPARENT', text: ')', from: 341, to: 342 },
  { type: 'SEMICOLON', text: ';', from: 342, to: 343 },
  { type: 'RBRACE', text: '}', from: 353, to: 354 },
  { type: 'NAME', text: 'error', from: 423, to: 428 },
  { type: 'LPARENT', text: '(', from: 428, to: 429 },
  { type: 'STRING', text: 'Key "', from: 431, to: 436 },
  { type: 'OPERATOR', text: '+', from: 437, to: 438 },
  { type: 'NAME', text: 'head', from: 439, to: 443 },
  { type: 'OPERATOR', text: '+', from: 444, to: 445 },
  { type: 'STRING',
    text: '" not found in object',
    from: 448,
    to: 469 },
  { type: 'RPARENT', text: ')', from: 469, to: 470 },
  { type: 'SEMICOLON', text: ';', from: 470, to: 471 },
  { type: 'RBRACE', text: '}', from: 477, to: 478 },
  { type: 'NAME', text: 'else', from: 519, to: 523 },
  { type: 'LBRACE', text: '{', from: 524, to: 525 },
  { type: 'NAME', text: 'head', from: 535, to: 539 },
  { type: 'OPERATOR', text: '=', from: 540, to: 541 },
  { type: 'NAME', text: 'String', from: 542, to: 548 },
  { type: 'LPARENT', text: '(', from: 548, to: 549 },
  { type: 'NAME', text: 'path', from: 549, to: 553 },
  { type: 'OPERATOR', text: '.', from: 553, to: 554 },
  { type: 'NAME', text: 'splice', from: 554, to: 560 },
  { type: 'LPARENT', text: '(', from: 560, to: 561 },
  { type: 'NUMBER', text: '0', from: 562, to: 563 },
  { type: 'COMMA', text: ',', from: 562, to: 563 },
  { type: 'NUMBER', text: '1', from: 565, to: 566 },
  { type: 'RPARENT', text: ')', from: 565, to: 566 },
  { type: 'RPARENT', text: ')', from: 566, to: 567 },
  { type: 'SEMICOLON', text: ';', from: 567, to: 568 },
  { type: 'NAME', text: 'index', from: 578, to: 583 },
  { type: 'OPERATOR', text: '=', from: 584, to: 585 },
  { type: 'NAME', text: 'parseInt', from: 586, to: 594 },
  { type: 'LPARENT', text: '(', from: 594, to: 595 },
  { type: 'NAME', text: 'head', from: 595, to: 599 },
  { type: 'COMMA', text: ',', from: 599, to: 600 },
  { type: 'NUMBER', text: '10', from: 602, to: 604 },
  { type: 'RPARENT', text: ')', from: 603, to: 604 },
  { type: 'SEMICOLON', text: ';', from: 604, to: 605 },
  { type: 'NAME', text: 'if', from: 617, to: 619 },
  { type: 'LPARENT', text: '(', from: 620, to: 621 },
  { type: 'NAME', text: 'SCHICK', from: 621, to: 627 },
  { type: 'OPERATOR', text: '.', from: 627, to: 628 },
  { type: 'NAME', text: 'isArray', from: 628, to: 635 },
  { type: 'LPARENT', text: '(', from: 635, to: 636 },
  { type: 'NAME', text: 'obj', from: 636, to: 639 },
  { type: 'LSQUARE_BRACKET', text: '[', from: 639, to: 640 },
  { type: 'NAME', text: 'index', from: 640, to: 645 },
  { type: 'RSQUARE_BRACKET', text: ']', from: 645, to: 646 },
  { type: 'RPARENT', text: ')', from: 646, to: 647 },
  { type: 'RPARENT', text: ')', from: 647, to: 648 },
  { type: 'LBRACE', text: '{', from: 649, to: 650 },
  { type: 'NAME', text: 'return', from: 664, to: 670 },
  { type: 'NAME', text: 'obj', from: 671, to: 674 },
  { type: 'LSQUARE_BRACKET', text: '[', from: 674, to: 675 },
  { type: 'NAME', text: 'index', from: 675, to: 680 },
  { type: 'RSQUARE_BRACKET', text: ']', from: 680, to: 681 },
  { type: 'SEMICOLON', text: ';', from: 681, to: 682 },
  { type: 'RBRACE', text: '}', from: 692, to: 693 },
  { type: 'NAME', text: 'else', from: 703, to: 707 },
  { type: 'NAME', text: 'if', from: 708, to: 710 },
  { type: 'LPARENT', text: '(', from: 711, to: 712 },
  { type: 'NAME', text: 'typeof', from: 712, to: 718 },
  { type: 'NAME', text: 'obj', from: 719, to: 722 },
  { type: 'LSQUARE_BRACKET', text: '[', from: 722, to: 723 },
  { type: 'NAME', text: 'head', from: 723, to: 727 },
  { type: 'RSQUARE_BRACKET', text: ']', from: 727, to: 728 },
  { type: 'OPERATOR', text: '!==', from: 730, to: 733 },
  { type: 'STRING', text: 'undefined', from: 735, to: 744 },
  { type: 'RPARENT', text: ')', from: 744, to: 745 },
  { type: 'LBRACE', text: '{', from: 746, to: 747 },
  { type: 'NAME', text: 'return', from: 761, to: 767 },
  { type: 'NAME', text: 'obj', from: 768, to: 771 },
  { type: 'LSQUARE_BRACKET', text: '[', from: 771, to: 772 },
  { type: 'NAME', text: 'head', from: 772, to: 776 },
  { type: 'RSQUARE_BRACKET', text: ']', from: 776, to: 777 },
  { type: 'SEMICOLON', text: ';', from: 777, to: 778 },
  { type: 'RBRACE', text: '}', from: 788, to: 789 },
  { type: 'NAME', text: 'else', from: 799, to: 803 },
  { type: 'LBRACE', text: '{', from: 804, to: 805 },
  { type: 'NAME', text: 'error', from: 819, to: 824 },
  { type: 'LPARENT', text: '(', from: 824, to: 825 },
  { type: 'STRING',
    text: 'Invalid query path: "',
    from: 827,
    to: 848 },
  { type: 'OPERATOR', text: '+', from: 849, to: 850 },
  { type: 'NAME', text: 'head', from: 851, to: 855 },
  { type: 'OPERATOR', text: '+', from: 856, to: 857 },
  { type: 'STRING', text: '"', from: 860, to: 861 },
  { type: 'RPARENT', text: ')', from: 861, to: 862 },
  { type: 'SEMICOLON', text: ';', from: 862, to: 863 },
  { type: 'RBRACE', text: '}', from: 873, to: 874 },
  { type: 'RBRACE', text: '}', from: 880, to: 881 },
  { type: 'NAME', text: 'iojoi', from: 881, to: 886 },
  { type: 'RBRACE', text: '}', from: 888, to: 889 },
  { type: 'EOF' } ]
````
