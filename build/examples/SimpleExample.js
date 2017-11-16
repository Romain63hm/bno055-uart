"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BNO055_1 = require("./../BNO055");
const timers_1 = require("timers");
let bno = new BNO055_1.BNO055("/dev/ttyS0", 18);
bno.read((error, result) => {
    console.log("inside ead begin");
    console.log(result);
    console.log("inside ead end");
});
timers_1.setTimeout(() => {
    bno.write();
}, 5000);
