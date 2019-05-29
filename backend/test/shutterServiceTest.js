const assert = require('assert');
const ShutterService = require('../src/services/shutterService');

describe('ShutterService tests', () => {
    it('test can ShutterService be constructed', () => {
        const shutterService = new ShutterService();

        if(shutterService !== undefined && shutterService !== null) {
            assert.ok(true);
        } else{
            assert.ok(false);
        }
    });

    it('test ShutterService.readShutterColors (success)', () => {
        const DAO = {
            readShutterColors : function(success, error){
                success(["1","2"]);
            }
        };
        const shutterService = new ShutterService(DAO);

        shutterService.readShutterColors(
            (resp) => {
                assert.deepStrictEqual(resp, ["1","2"]);
            },
            (error) => {
                assert.fail(error);
            }
        );
    });

    it('test ShutterService.readShutterColors (error)', () => {
        const DAO = {
            readShutterColors : function(success, error){
                error("error");
            }
        };
        const shutterService = new ShutterService(DAO);

        shutterService.readShutterColors(
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.ok(true);
            }
        );
    });

    it('test ShutterService.readShutterMats (success)', () => {
        const DAO = {
            readShutterMats : function(success, error){
                success(["1","2"]);
            }
        };
        const shutterService = new ShutterService(DAO);

        shutterService.readShutterMats(
            (resp) => {
                assert.deepStrictEqual(resp, ["1","2"]);
            },
            (error) => {
                assert.fail(error);
            }
        );
    });

    it('test ShutterService.readShutterMats (error)', () => {
        const DAO = {
            readShutterMats : function(success, error){
                error("error");
            }
        };
        const shutterService = new ShutterService(DAO);

        shutterService.readShutterMats(
            (resp) => {
                assert.fail();
            },
            (error) => {
                assert.ok(true);
            }
        );
    });
});
