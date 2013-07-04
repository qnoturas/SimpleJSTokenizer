SimpleJSTokenizer
=================

Tokenizes Simplified JavaScript.

* !== and === must be used in stead of != and ==
* No support for ++ and -- operators.
* No quote escaping within strings.
* Number can't start with a dot, but must start with a number (0.1, not .1).

That is all intentional.

Notice that this tokenizer, of course, doesn't know anything about that,
the parser will throw an exception, when consuming this tokens.

Example:

````javascript
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun) {
        "use strict";

        if (this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i += 1) {
            if (i in t) {
                var val = t[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, t))
                    res.push(val);
            }
        }

        return res;
    };
}
````

Tokens:

````javascript
[ { type: 'NAME', token: 'if' },
  { type: 'LPARENT', token: '(' },
  { type: 'OPERATOR', token: '!' },
  { type: 'NAME', token: 'Array' },
  { type: 'OPERATOR', token: '.' },
  { type: 'NAME', token: 'prototype' },
  { type: 'OPERATOR', token: '.' },
  { type: 'NAME', token: 'filter' },
  { type: 'RPARENT', token: ')' },
  { type: 'LBRACE', token: '{' },
  { type: 'NAME', token: 'Array' },
  { type: 'OPERATOR', token: '.' },
  { type: 'NAME', token: 'prototype' },
  { type: 'OPERATOR', token: '.' },
  { type: 'NAME', token: 'filter' },
  { type: 'OPERATOR', token: '=' },
  { type: 'NAME', token: 'function' },
  { type: 'LPARENT', token: '(' },
  { type: 'NAME', token: 'fun' },
  { type: 'RPARENT', token: ')' },
  { type: 'LBRACE', token: '{' },
  { type: 'DOUBLE_QUOTE', token: '"' },
  { type: 'LITERAL', token: 'use strict' },
  { type: 'DOUBLE_QUOTE', token: '"' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'NAME', token: 'if' },
  { type: 'LPARENT', token: '(' },
  { type: 'NAME', token: 'this' },
  { type: 'OPERATOR', token: '===' },
  { type: 'NAME', token: 'null' },
  { type: 'RPARENT', token: ')' },
  { type: 'NAME', token: 'throw' },
  { type: 'NAME', token: 'new' },
  { type: 'NAME', token: 'TypeError' },
  { type: 'LPARENT', token: '(' },
  { type: 'RPARENT', token: ')' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'NAME', token: 'var' },
  { type: 'NAME', token: 't' },
  { type: 'OPERATOR', token: '=' },
  { type: 'NAME', token: 'Object' },
  { type: 'LPARENT', token: '(' },
  { type: 'NAME', token: 'this' },
  { type: 'RPARENT', token: ')' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'NAME', token: 'var' },
  { type: 'NAME', token: 'len' },
  { type: 'OPERATOR', token: '=' },
  { type: 'NAME', token: 't' },
  { type: 'OPERATOR', token: '.' },
  { type: 'NAME', token: 'length' },
  { type: 'OPERATOR', token: '>>>' },
  { type: 'NUMBER', token: '0' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'NAME', token: 'if' },
  { type: 'LPARENT', token: '(' },
  { type: 'NAME', token: 'typeof' },
  { type: 'NAME', token: 'fun' },
  { type: 'OPERATOR', token: '!==' },
  { type: 'DOUBLE_QUOTE', token: '"' },
  { type: 'LITERAL', token: 'function' },
  { type: 'DOUBLE_QUOTE', token: '"' },
  { type: 'RPARENT', token: ')' },
  { type: 'NAME', token: 'throw' },
  { type: 'NAME', token: 'new' },
  { type: 'NAME', token: 'TypeError' },
  { type: 'LPARENT', token: '(' },
  { type: 'RPARENT', token: ')' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'NAME', token: 'var' },
  { type: 'NAME', token: 'res' },
  { type: 'OPERATOR', token: '=' },
  { type: 'LSQUARE_BRACKET', token: '[' },
  { type: 'RSQUARE_BRACKET', token: ']' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'NAME', token: 'var' },
  { type: 'NAME', token: 'thisp' },
  { type: 'OPERATOR', token: '=' },
  { type: 'NAME', token: 'arguments' },
  { type: 'LSQUARE_BRACKET', token: '[' },
  { type: 'NUMBER', token: '1' },
  { type: 'RSQUARE_BRACKET', token: ']' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'NAME', token: 'for' },
  { type: 'LPARENT', token: '(' },
  { type: 'NAME', token: 'var' },
  { type: 'NAME', token: 'i' },
  { type: 'OPERATOR', token: '=' },
  { type: 'NUMBER', token: '0' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'NAME', token: 'i' },
  { type: 'OPERATOR', token: '<' },
  { type: 'NAME', token: 'len' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'NAME', token: 'i' },
  { type: 'OPERATOR', token: '+=' },
  { type: 'NUMBER', token: '1' },
  { type: 'RPARENT', token: ')' },
  { type: 'LBRACE', token: '{' },
  { type: 'NAME', token: 'if' },
  { type: 'LPARENT', token: '(' },
  { type: 'NAME', token: 'i' },
  { type: 'NAME', token: 'in' },
  { type: 'NAME', token: 't' },
  { type: 'RPARENT', token: ')' },
  { type: 'LBRACE', token: '{' },
  { type: 'NAME', token: 'var' },
  { type: 'NAME', token: 'val' },
  { type: 'OPERATOR', token: '=' },
  { type: 'NAME', token: 't' },
  { type: 'LSQUARE_BRACKET', token: '[' },
  { type: 'NAME', token: 'i' },
  { type: 'RSQUARE_BRACKET', token: ']' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'NAME', token: 'if' },
  { type: 'LPARENT', token: '(' },
  { type: 'NAME', token: 'fun' },
  { type: 'OPERATOR', token: '.' },
  { type: 'NAME', token: 'call' },
  { type: 'LPARENT', token: '(' },
  { type: 'NAME', token: 'thisp' },
  { type: 'COMMA', token: ',' },
  { type: 'NAME', token: 'val' },
  { type: 'COMMA', token: ',' },
  { type: 'NAME', token: 'i' },
  { type: 'COMMA', token: ',' },
  { type: 'NAME', token: 't' },
  { type: 'RPARENT', token: ')' },
  { type: 'RPARENT', token: ')' },
  { type: 'NAME', token: 'res' },
  { type: 'OPERATOR', token: '.' },
  { type: 'NAME', token: 'push' },
  { type: 'LPARENT', token: '(' },
  { type: 'NAME', token: 'val' },
  { type: 'RPARENT', token: ')' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'RBRACE', token: '}' },
  { type: 'RBRACE', token: '}' },
  { type: 'NAME', token: 'return' },
  { type: 'NAME', token: 'res' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'RBRACE', token: '}' },
  { type: 'SEMICOLON', token: ';' },
  { type: 'RBRACE', token: '}' },
  { type: 'EOF', token: '' } ]
````
