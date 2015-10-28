'use strict';
document.addEventListener('DOMContentLoaded', listener);

function listener() {
    //alert('aaa');

    var button = document.getElementById('buttonGet');
    button.addEventListener('click', clickButton);

    function clickButton() {
        console.log('click');
        app.getObj('/objec').then((that, data) => {
            console.log(that, data);
        }).catch(console.log);
    }


    var App = function() {};
    App.prototype.addObject = function(url, callBack) {

    };
    App.prototype.getObj = function(url) {
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send();
            xhr.onload = function(e) {
                res(this, e);
            };
        });
    };

    var app = new App();
}
