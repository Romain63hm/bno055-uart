"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BNO055_1 = require("./../BNO055");
let bno = new BNO055_1.BNO055("/dev/ttyS0", 18);
bno.begin();
