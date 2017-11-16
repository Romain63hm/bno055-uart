var gpio = require('rpi-gpio');
var sleep = require('sleep');

gpio.setup(18, gpio.DIR_OUT, write);

function write(err) {
    if (err) throw err;
    gpio.write(18, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
	sleep.msleep(1000);
	gpio.write(18, false, function(err) {
		if (err) {
			console.log("Write False error");
		}
		console.log("pin is low");
	});
    });
}
