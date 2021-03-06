var SerialPort = require('serialport');
var gpio = require('rpi-gpio');
var sleep = require('sleep');

// I2C addresses
const BNO055_ADDRESS_A = 0x28
const BNO055_ADDRESS_B = 0x29
const BNO055_ID = 0xA0

// Page id register definition
const BNO055_PAGE_ID_ADDR = 0X07

// PAGE0 REGISTER DEFINITION START
const BNO055_CHIP_ID_ADDR = 0x00
const BNO055_ACCEL_REV_ID_ADDR = 0x01
const BNO055_MAG_REV_ID_ADDR = 0x02
const BNO055_GYRO_REV_ID_ADDR = 0x03
const BNO055_SW_REV_ID_LSB_ADDR = 0x04
const BNO055_SW_REV_ID_MSB_ADDR = 0x05
const BNO055_BL_REV_ID_ADDR = 0X06

// Accel data register
const BNO055_ACCEL_DATA_X_LSB_ADDR = 0X08
const BNO055_ACCEL_DATA_X_MSB_ADDR = 0X09
const BNO055_ACCEL_DATA_Y_LSB_ADDR = 0X0A
const BNO055_ACCEL_DATA_Y_MSB_ADDR = 0X0B
const BNO055_ACCEL_DATA_Z_LSB_ADDR = 0X0C
const BNO055_ACCEL_DATA_Z_MSB_ADDR = 0X0D

// Mag data register
const BNO055_MAG_DATA_X_LSB_ADDR = 0X0E
const BNO055_MAG_DATA_X_MSB_ADDR = 0X0F
const BNO055_MAG_DATA_Y_LSB_ADDR = 0X10
const BNO055_MAG_DATA_Y_MSB_ADDR = 0X11
const BNO055_MAG_DATA_Z_LSB_ADDR = 0X12
const BNO055_MAG_DATA_Z_MSB_ADDR = 0X13

// Gyro data registers
const BNO055_GYRO_DATA_X_LSB_ADDR = 0X14
const BNO055_GYRO_DATA_X_MSB_ADDR = 0X15
const BNO055_GYRO_DATA_Y_LSB_ADDR = 0X16
const BNO055_GYRO_DATA_Y_MSB_ADDR = 0X17
const BNO055_GYRO_DATA_Z_LSB_ADDR = 0X18
const BNO055_GYRO_DATA_Z_MSB_ADDR = 0X19

// Euler data registers
const BNO055_EULER_H_LSB_ADDR = 0X1A
const BNO055_EULER_H_MSB_ADDR = 0X1B
const BNO055_EULER_R_LSB_ADDR = 0X1C
const BNO055_EULER_R_MSB_ADDR = 0X1D
const BNO055_EULER_P_LSB_ADDR = 0X1E
const BNO055_EULER_P_MSB_ADDR = 0X1F

// Quaternion data registers
const BNO055_QUATERNION_DATA_W_LSB_ADDR = 0X20
const BNO055_QUATERNION_DATA_W_MSB_ADDR = 0X21
const BNO055_QUATERNION_DATA_X_LSB_ADDR = 0X22
const BNO055_QUATERNION_DATA_X_MSB_ADDR = 0X23
const BNO055_QUATERNION_DATA_Y_LSB_ADDR = 0X24
const BNO055_QUATERNION_DATA_Y_MSB_ADDR = 0X25
const BNO055_QUATERNION_DATA_Z_LSB_ADDR = 0X26
const BNO055_QUATERNION_DATA_Z_MSB_ADDR = 0X27

// Linear acceleration data registers
const BNO055_LINEAR_ACCEL_DATA_X_LSB_ADDR = 0X28
const BNO055_LINEAR_ACCEL_DATA_X_MSB_ADDR = 0X29
const BNO055_LINEAR_ACCEL_DATA_Y_LSB_ADDR = 0X2A
const BNO055_LINEAR_ACCEL_DATA_Y_MSB_ADDR = 0X2B
const BNO055_LINEAR_ACCEL_DATA_Z_LSB_ADDR = 0X2C
const BNO055_LINEAR_ACCEL_DATA_Z_MSB_ADDR = 0X2D

// Gravity data registers
const BNO055_GRAVITY_DATA_X_LSB_ADDR = 0X2E
const BNO055_GRAVITY_DATA_X_MSB_ADDR = 0X2F
const BNO055_GRAVITY_DATA_Y_LSB_ADDR = 0X30
const BNO055_GRAVITY_DATA_Y_MSB_ADDR = 0X31
const BNO055_GRAVITY_DATA_Z_LSB_ADDR = 0X32
const BNO055_GRAVITY_DATA_Z_MSB_ADDR = 0X33

// Temperature data register
const BNO055_TEMP_ADDR = 0X34

// Status registers
const BNO055_CALIB_STAT_ADDR = 0X35
const BNO055_SELFTEST_RESULT_ADDR = 0X36
const BNO055_INTR_STAT_ADDR = 0X37

const BNO055_SYS_CLK_STAT_ADDR = 0X38
const BNO055_SYS_STAT_ADDR = 0X39
const BNO055_SYS_ERR_ADDR = 0X3A

// Unit selection register
const BNO055_UNIT_SEL_ADDR = 0X3B
const BNO055_DATA_SELECT_ADDR = 0X3C

// Mode registers
const BNO055_OPR_MODE_ADDR = 0X3D
const BNO055_PWR_MODE_ADDR = 0X3E

const BNO055_SYS_TRIGGER_ADDR = 0X3F
const BNO055_TEMP_SOURCE_ADDR = 0X40

// Axis remap registers
const BNO055_AXIS_MAP_CONFIG_ADDR = 0X41
const BNO055_AXIS_MAP_SIGN_ADDR = 0X42

// Axis remap values
const AXIS_REMAP_X = 0x00
const AXIS_REMAP_Y = 0x01
const AXIS_REMAP_Z = 0x02
const AXIS_REMAP_POSITIVE = 0x00
const AXIS_REMAP_NEGATIVE = 0x01

// SIC registers
const BNO055_SIC_MATRIX_0_LSB_ADDR = 0X43
const BNO055_SIC_MATRIX_0_MSB_ADDR = 0X44
const BNO055_SIC_MATRIX_1_LSB_ADDR = 0X45
const BNO055_SIC_MATRIX_1_MSB_ADDR = 0X46
const BNO055_SIC_MATRIX_2_LSB_ADDR = 0X47
const BNO055_SIC_MATRIX_2_MSB_ADDR = 0X48
const BNO055_SIC_MATRIX_3_LSB_ADDR = 0X49
const BNO055_SIC_MATRIX_3_MSB_ADDR = 0X4A
const BNO055_SIC_MATRIX_4_LSB_ADDR = 0X4B
const BNO055_SIC_MATRIX_4_MSB_ADDR = 0X4C
const BNO055_SIC_MATRIX_5_LSB_ADDR = 0X4D
const BNO055_SIC_MATRIX_5_MSB_ADDR = 0X4E
const BNO055_SIC_MATRIX_6_LSB_ADDR = 0X4F
const BNO055_SIC_MATRIX_6_MSB_ADDR = 0X50
const BNO055_SIC_MATRIX_7_LSB_ADDR = 0X51
const BNO055_SIC_MATRIX_7_MSB_ADDR = 0X52
const BNO055_SIC_MATRIX_8_LSB_ADDR = 0X53
const BNO055_SIC_MATRIX_8_MSB_ADDR = 0X54

// Accelerometer Offset registers
const ACCEL_OFFSET_X_LSB_ADDR = 0X55
const ACCEL_OFFSET_X_MSB_ADDR = 0X56
const ACCEL_OFFSET_Y_LSB_ADDR = 0X57
const ACCEL_OFFSET_Y_MSB_ADDR = 0X58
const ACCEL_OFFSET_Z_LSB_ADDR = 0X59
const ACCEL_OFFSET_Z_MSB_ADDR = 0X5A

// Magnetometer Offset registers
const MAG_OFFSET_X_LSB_ADDR = 0X5B
const MAG_OFFSET_X_MSB_ADDR = 0X5C
const MAG_OFFSET_Y_LSB_ADDR = 0X5D
const MAG_OFFSET_Y_MSB_ADDR = 0X5E
const MAG_OFFSET_Z_LSB_ADDR = 0X5F
const MAG_OFFSET_Z_MSB_ADDR = 0X60

// Gyroscope Offset register s
const GYRO_OFFSET_X_LSB_ADDR = 0X61
const GYRO_OFFSET_X_MSB_ADDR = 0X62
const GYRO_OFFSET_Y_LSB_ADDR = 0X63
const GYRO_OFFSET_Y_MSB_ADDR = 0X64
const GYRO_OFFSET_Z_LSB_ADDR = 0X65
const GYRO_OFFSET_Z_MSB_ADDR = 0X66

// Radius registers
const ACCEL_RADIUS_LSB_ADDR = 0X67
const ACCEL_RADIUS_MSB_ADDR = 0X68
const MAG_RADIUS_LSB_ADDR = 0X69
const MAG_RADIUS_MSB_ADDR = 0X6A

// Power modes
const POWER_MODE_NORMAL = 0X00
const POWER_MODE_LOWPOWER = 0X01
const POWER_MODE_SUSPEND = 0X02

// Operation mode settings
const OPERATION_MODE_CONFIG = 0X00
const OPERATION_MODE_ACCONLY = 0X01
const OPERATION_MODE_MAGONLY = 0X02
const OPERATION_MODE_GYRONLY = 0X03
const OPERATION_MODE_ACCMAG = 0X04
const OPERATION_MODE_ACCGYRO = 0X05
const OPERATION_MODE_MAGGYRO = 0X06
const OPERATION_MODE_AMG = 0X07
const OPERATION_MODE_IMUPLUS = 0X08
const OPERATION_MODE_COMPASS = 0X09
const OPERATION_MODE_M4G = 0X0A
const OPERATION_MODE_NDOF_FMC_OFF = 0X0B
const OPERATION_MODE_NDOF = 0X0C

class BNO055 {

    constructor(port, resetPin, cb) {
		if (!cb) {
			cb = function(err) {}
		}
		
		var self = this
		if (resetPin) {
			// Setting up the GPIO mode to OUT 
			gpio.setup(resetPin, gpio.DIR_HIGH, function(err) {
				if (err) {
					return cb(err);
				}
				// If succeeded we send a reset message to the specified
				// reset pin
				gpio.write(18, true, function(err) {
					if (err) {
						return cb(err);
					}
					sleep.msleep(650);
					console.log("Reset Succeeded");
					self.serial = new SerialPort(port, { autoOpen: false, baudRate: 115200 });	
								
					self.serial.open(function (err) {
						if (err) {
							return cb(err);
						}	
						console.log("Port successfully opened");
						return cb()
					});
				});
			});
		}
	}
	
	begin() {
		var self = this
		this.writeByte(BNO055_PAGE_ID_ADDR, 0, function(err) {
			self.configMode(function(err) {
				if (err) {
					console.log(err);
				}
				console.log("ok");
				self.writeByte(BNO055_PAGE_ID_ADDR, 0, function(err, succ) {
					if (err) {
						console.log(err)
					}
					console.log("Succeessssss")
					console.log(succ)
					self.readByte(BNO055_CHIP_ID_ADDR, function(err, succ) {
						if (err) {
							console.log(err)
						}
						console.log(succ);
						if(BNO055 == succ) {
							console.log("On a la bonne adresse");
						} else {
							console.log("On a PAAAAS la bonne adresse");
							return false;
						}
					});
				});
			});
		}, false);
	}
	
	configMode(cb) {
		this.setMode(OPERATION_MODE_CONFIG, cb);
	}
	
	setMode(mode, cb) {
		// Set operation mode for BNO055 sensor. Mode should be a value from table 3-3 and 3-5 datasheet
		console.log("Set mode");
		console.log(mode)
		this.writeByte(BNO055_OPR_MODE_ADDR, mode & 0xFF, cb);
		sleep.msleep(30);
	}

	readByte(address, cb) {
		this.readBytes(address, 1, cb);
	}
	
    readBytes(address, length, cb) {
		var self = this
        var command = new Array(4)
        command[0] = 0xAA;  // Start byte
        command[1] = 0x01;  // Write
        command[2] = address & 0xFF;
        command[3] = length & 0xFF;
        
        this.serialSend(command, function(err, succ) {
			if (err) { 
				return cb(err) 
			}
			console.log(succ[0])
			if (succ[0] != 0xBB) {
				return cb('Register Read error');
			}
			var length = succ[1];
			var resp = self.serial.read(length)
			console.log("New Read");
			console.log(resp);
			if (resp == null || resp.length != length) {
				return cb('Timeout waiting to read data, is the BNO055 connected?', null)
			}
			return cb(null, resp);
		}, true)
    }

    serialSend(command, cb, ack) {
        var self = this;
        console.log(command)
		self.serial.write(command, 'hex',  function (err) {
			if (err) {
				console.log("Error while writing")
				return cb(err)
			}
			if (!ack) {
				console.log('Ack is false');
				return cb()
			}
			var resp = self.serial.read(2);
			
			if (resp == null || resp.length != 2) {
				return cb('Timeout waiting for serial acknoledge, is the BNO055 connected?')
			} 
			if (!(resp[0] == 0xEE && resp[1] == 0x07)) {
				console.log(resp[0])
				console.log(resp[1])
				return cb(null, resp)
			}
			return cb("Error will sending command to serial");
		});
    }
    
    writeByte(address, value, cb, ack = true) {
		var command = new Array(5)
        command[0] = 0xAA;  // Start byte
        command[1] = 0x00;  // Write
        command[2] = address & 0xFF;
        command[3] = 1;
        command[4] = value & 0xFF
        this.serialSend(command, function(err, succ) {
			if (err) {
				return cb(err);
			}
			if (ack && succ[0] != 0xEE && resp[1] != 0x01) {
				return cb("Register write error", null);
			}
			return cb(null, succ);
		}, ack)
	}
	
	getCalibrationStatus(cb) {
		this.readByte(BNO055_CALIB_STAT_ADDR, cb);
	}
}

var bno = new BNO055('/dev/ttyS0', 18, function(err) {
	
	if (err) {
		console.log("Open error" + err);
	}

	console.log("Connection to /dev/ttySO succeeded");
	console.log(bno.begin());
	//bno.getCalibrationStatus(function(err, succ) {
	//	console.log("Calibration infos");
	//	console.log(err);
	//	console.log(succ);
			
	//});
});
