# imgpress - Image Compressor

## Description

This is a simple image compressor that uses the [sharp](https://www.npmjs.com/package/sharp) package to compress images.

## Global Installation & Usage

### Installation cli (globally)

```bash
npm i -g imgpress
```

### Compressing a single image from cli

```bash
imgpress s -i <input> -o <output> -q <quality> -w <width> -h <height> -p <webp compression for png files>
```

If no output is specified, the output will be OriginalFile_processed.ext

### Compressing multiple images in a directory from cli

```bash
imgpress f -i <input-directory> -o <output-directory> -q <quality> -w <width> -h <height> -p <webp compression for png files>
```

If no output directory is specified, the output directory will be "_processed" in the input directory.

## Project Installation & Usage

### Project-level Installation

```bash
npm i imgpress
```

### Compressing a single image in node project

```javascript
import { Compressor } from 'imgpress';

await Compressor.imageCompress('./original.jpg', './processed.jpg', {
  quality: 80, //default is 80
  maxWidth: 1000, //default is 1000
  maxHeight: 1000, //default is 1000
  pngToWebp: true // default is false, only works for png files
});
```

### Compressing multiple images in a directory in node project

```javascript
import { Compressor } from 'imgpress';

await Compressor.folderCompress('./originals', './processed', {
  quality: 80, //default is 80
  maxWidth: 1000, //default is 1000
  maxHeight: 1000, //default is 1000
  extensions: ['jpg', 'png', 'jpeg'], //default is ['jpg', 'png', 'jpeg'], images to process by extension
  pngToWebp: false // default is false, only works for png files
});
```
