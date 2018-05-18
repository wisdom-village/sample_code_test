"use strict";
const tz = require("./");
const hash = require("../string-hash");

const WIDTH = 6144;
const HEIGHT = 3072;

process.stdout.write(Buffer.from("P6\n" + WIDTH + " " + HEIGHT + "\n255\n"));

const buffer = new Buffer(WIDTH * 3);

for(let y = 0; y < HEIGHT; y++) {
  const v = (1 - (y * 2 + 1) / HEIGHT) * Math.SQRT2;
  let i = 0;

  for(let x = 0; x < WIDTH; x++) {
    const u = ((x * 2 + 1) / WIDTH - 1) * 2 * Math.SQRT2;
    const z = Math.sqrt(1 - 0.0625 * u * u - 0.25 * v * v);
    const lat = (180 / Math.PI) * Math.asin(v * z);
    const lon = (360 / Math.PI) * Math.atan2(u * z, 4 * z * z - 2);

    let number = 0;
    try {
      number = hash(tz(lat, lon));
    }
    catch(err) {
    }

    buffer[i++] = (number >> 0) & 0xFF;
    buffer[i++] = (number >> 8) & 0xFF;
    buffer[i++] = (number >> 16) & 0xFF;
  }

  process.stdout.write(buffer);
}

process.stdout.end(() => process.exit(0));
