'use strict';

const addClass = function(el, cls) {
    if ( !el ) {
        return;
    }
    el.className = el.className.split(' ').concat([cls]).join(' ');
};

exports.isMobile = function() {
    return window.innerWidth < 420; // blaze it
};

exports.removePreloader = function() {
    const preload = document.querySelector('.preload:not(.done)');
    addClass(preload, 'done');
};
