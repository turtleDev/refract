'use strict';

exports.shuffle = function(arr) {
    arr = [ ...arr ];
    for ( let i = arr.length - 1; i >= 0; --i ) {
        const r = Math.floor(Math.random() * arr.length);
        const tmp = arr[r];
        arr[r] = arr[i];
        arr[i] = tmp;
    }
    return arr;
};

exports.random = function(arr) {

};
