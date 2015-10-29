'use strict';
document.addEventListener('DOMContentLoaded', listener);

function listener() {

    var gUrl = '/obj',
        gCallBack = function(obj) {
            document.body.append(obj);
        },
        button1 = document.getElementById('buttonGet1'),
        App = function() {
            this.queueAjaxRequests = [];
            this.queueAjaxResponses = [];
        },
        app = new App();

    button1.addEventListener('click', clickButton1);

    function clickButton1() {
        app.addObject(gUrl, gCallBack);
    }

    App.prototype.addObject = function(url, callBack) {
        if (app.queueAjaxRequests.length) {
            app.queueAjaxRequests.push(gUrl);
        } else {
            app.queueAjaxRequests.push(gUrl);
            app.sendRequests(app.queueAjaxRequests);
        }
    };

    App.prototype.sendXHR = function(url) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = function(e) {
            app.resHandler(e.target);
        };
    };

    App.prototype.sendRequests = function(param) {
        console.log(param);
        if (Array.isArray(param) && param.length) {
            app.sendXHR(param[0])
        } else {
            app.sendXHR(param)
        }
    };

    App.prototype.resHandler = function(res) {
        if (res.status != 200) {
            app.error(res);
            return;
        }
        let next = app.queueAjaxRequests.shift();
        app.queueAjaxResponses.push(res);
        if (next && app.queueAjaxRequests.length) {
            app.sendRequests(next);
            app.responsesQueueHandler(app.queueAjaxResponses);
            return;
        }

        console.log('XHR Ended with: ', res.response);
        console.log('All data were received! ', app);
    };

    App.prototype.error = function(error) {
        console.error('Error status: ', error.status, 'Error text: ', error.statusText);
    };

    App.prototype.responsesQueueHandler = function(param) {
        if (!Array.isArray(param)) {
            console.error('Responses must be a array!');
            return;
        }
        if (param.length) {
            param.forEach((item, param) => {
                console.log('Responses Queue: ', item.response);
            });
        }
    }


}
