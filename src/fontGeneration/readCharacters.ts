import fs from "fs";
import { PNG } from "pngjs";

function processImage(png) {
  const { width, height, data } = png;

  console.log(data);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;

      if (x === 37 && y === 33) {
        console.log({
          r: data[idx],
          g: data[idx + 1],
          b: data[idx + 2],
          a: data[idx + 3],
        });
      }

      // Invert color
      data[idx] = 255 - data[idx];
      data[idx + 1] = 255 - data[idx + 1];
      data[idx + 2] = 255 - data[idx + 2];

      // Reduce opacity
      data[idx + 3] = 255; // data[idx + 3] >> 1;
    }
  }

  return png;
}

fs.createReadStream("openbsd-playwright-shot.png")
  .pipe(new PNG({ filterType: 4 }))
  .on("parsed", function () {
    const processedPng = processImage(this);
    processedPng.pack().pipe(fs.createWriteStream("out.png"));
  });
