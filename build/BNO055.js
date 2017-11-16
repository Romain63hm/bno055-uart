"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerialPort = require("serialport");
const winston = require("winston");
const Observable_1 = require("rxjs/Observable");
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'somefile.log' })
    ]
});
class BNO055 {
    constructor(port, resetPin) {
        this.observers = new Array();
        let options = {
            autoOpen: false,
            baudRate: 115200
        };
        this.serial = new SerialPort(port, options);
        this.serial.open((error) => {
            //gpio.setup(resetPin, gpio.DIR_HIGH, (error) => {
            //});
        });
        logger.info('Constructor');
    }
    read(callback) {
        var self = this;
        Observable_1.Observable.create(function (observer) {
            self.observers.push(observer);
        }).subscribe(result => {
            callback(null, result);
        });
    }
    write() {
        this.observers[0].next("ca marcheeeeee");
    }
}
exports.BNO055 = BNO055;
