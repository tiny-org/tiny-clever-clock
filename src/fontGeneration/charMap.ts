import fs from "fs";
import { PNG } from "pngjs";
import { Image } from "../types/image";

// function generateCharMap();

const allChars =
  "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~";

const chars = allChars.split("");

const data = fs.readFileSync("./src/fontGeneration/FiraCode-Regular.png");
const png = PNG.sync.read(data) as Image;

function createCharImage(png: Image, i: number): Image {
  const charWidth = (png.width - 1) / allChars.length;
  const data: number[] = [];
  const dataOffset = i * charWidth * 4;

  for (let y = 0; y < png.height; y += 1) {
    for (let x = 0; x < charWidth; x += 1) {
      const dataIndex = 4 * png.width * y + x * 4 + dataOffset;

      data.push(png.data[dataIndex]);
      data.push(png.data[dataIndex + 1]);
      data.push(png.data[dataIndex + 2]);
      data.push(png.data[dataIndex + 3]);
    }
  }

  return {
    width: charWidth,
    height: png.height,
    data: Buffer.from(data),
  };
}

const charMap = new Map<string, Image>(
  chars.map((char, i) => [char, createCharImage(png, i)])
);

for (let i = 0; i < png.data.length; i += 1) {
  if ((i + 1) % 4 === 0) {
    continue;
  }
  png.data[i] = 255 - png.data[i];
}

const png2 = {
  width: png.width,
  height: png.height,
  data: png.data,
};

const png3 = charMap.get("A");

console.log(png3?.data.length);

fs.writeFileSync("out.png", PNG.sync.write(png3));
