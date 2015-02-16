xdescribe('integration/controllers/core', function () {
    var http = require('./test-app');


    it('/core/error', function (done) {

        http.fire('request', {
            method: 'GET',
            on: function (name, resolve) {
                if (name !== 'destory') {
                    resolve();
                }
            },
            setEncoding: function() {},
            emit: function () {},
            url: '/nonexist'
        }, {
            writeHead: function () {},
            end: function (data) {
                console.log('TEST DATA', data);
                expect(data.indexOf('STACK') > -1).toBe(true);
                expect(data.indexOf('HttpError: 404') > -1).toBe(true);
                expect(data.indexOf('Not found') > -1).toBe(true);
                ca(data);
                done();
            }
        });
    });



    function ca(data) {
        expect(typeof data).toBe("string");
        expect(data.indexOf('<li><a href="/" >Home</a></li>') > -1).toBe(true);
        expect(data.indexOf('<li><a href="/error/handler" >Error handling</a></li>') > -1).toBe(true);
        expect(data.indexOf('<li><a href="/guide/tdd" >TDD</a></li>') > -1).toBe(true);
    }

});