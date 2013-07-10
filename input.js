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