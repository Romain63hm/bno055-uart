var SerialPort = require('serialport');

class BNO055 {

    constructor(port) {
        this.serial = new SerialPort(port, { autoOpen: false });
        this.serial.flush()
        this.serial.open(function (err) {
            console.log("opened");
            if (err) {
                return console.log('Error opening port: ', err.message);
            } else {
                console.log("Port successfully opened");
            }
        });
    }

    readBytes(address, length) {
        var command = new Uint8Array(4)
        command[0] = 0xAA;  // Start byte
        command[1] = 0x01;  // Write
        command[2] = address & 0xFF;
        command[3] = length & 0xFF;
        this.serialSend(command)
    }

    serialSend(command) {
        var attempts = 0
        while (true) {
            this.serial.write(command, function (err) {
                if (err) {
                    return console.log('Error on write: ', err.message);
                }
                console.log('message written');
            });
            var resp = this.serial.read();

            if (resp != null) {
                return resp
            }
        }
    }
}

var bno = new BNO055('/dev/ttyS0');
console.log(bno.readBytes("OX35", 1));
