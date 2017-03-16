'use strict';

const addClass = function(el, cls) {

    el.className = el.className.split(' ').concat([cls]).join(' ');
}
exports.isMobile = function() {
    return window.innerWidth < 420; // blaze it
};

exports.removePreloader = function() {
    const preload = document.querySelector('.preload');
    addClass(preload, 'done');
}
