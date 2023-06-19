# imgpress - Image Compressor

## Description

This is a simple image compressor that uses the [sharp](https://www.npmjs.com/package/sharp) package to compress images.

## Installation

```npm i -g imgpress```

## Usage

### Compressing a single image

```imgpress s -i <input> -o <output> -q <quality> -w <width> -h <height> -p <webp compression for png files>```

If no output is specified, the output will be OriginalFile_processed.ext

### Compressing multiple images in a directory

```imgpress f -i <input-directory> -o <output-directory> -q <quality> -w <width> -h <height> -p <webp compression for png files>```

If no output directory is specified, the output directory will be "_processed" in the input directory.
