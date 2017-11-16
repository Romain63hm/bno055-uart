import { BNO055 } from './../BNO055';
import { setTimeout } from 'timers';

let bno = new BNO055("/dev/ttyS0", 18);
bno.begin();