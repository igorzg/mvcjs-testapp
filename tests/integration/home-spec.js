describe('integration/controllers/home', function () {
    var http = require('./test-app');


    it('/home/index', function (done) {
        http.fire('request', {
            method: 'GET',
            on: function (name, resolve) {
                if (name !== 'destory') {
                    resolve();
                }
            },
            headers: {},
            getRequestHeader: function () { return ''; },
            setEncoding: function() {},
            emit: function () {},
            url: '/'
        }, {
            writeHead: function () {},
            end: function (data) {
                expect(data.indexOf('Fast, TDD driven, opinionated lightweight mvc framework for Node.js') > -1).toBe(true);
                expect(data.indexOf('MVCJS &nbsp;&nbsp;&nbsp;') > -1).toBe(true);
                ca(data);
                done();
            }
        });
    });



    it('/dynamic-content', function (done) {
        http.fire('request', {
            method: 'GET',
            on: function (name, resolve) {
                if (name !== 'destory') {
                    resolve();
                }
            },
            headers: {},
            getRequestHeader: function () { return ''; },
            setEncoding: function() {},
            emit: function () {},
            url: '/dynamic-content'
        }, {
            writeHead: function () {},
            end: function (data) {
                expect(data.indexOf('<h5>SOME_TEXT</h5>') > -1).toBe(true);
                expect(data.indexOf('CUSTOM_TITLE') > -1).toBe(true);
                expect(data.indexOf('CUSTOM_DESC') > -1).toBe(true);
                ca(data);
                done();
            }
        });
    });


    function ca(data) {
        expect(data.indexOf('<li><a href="/" >Home</a></li>') > -1).toBe(true);
        expect(data.indexOf('<li><a href="/error/handler" >Error handling</a></li>') > -1).toBe(true);
        expect(data.indexOf('<li><a href="/guide/tdd" >TDD</a></li>') > -1).toBe(true);
    }


});