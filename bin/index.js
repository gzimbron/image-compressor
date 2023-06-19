#! /usr/bin/env node
import { Command } from 'commander';
import Compressor from '../src/classes/compressor.js';

const program = new Command();

program
	.command('single')
	.alias('s')
	.description('Comprime una sola imagen')
	.requiredOption('-i, --input <path>', 'Path de la imagen original')
	.option('-o, --output <path>', 'Path de la imagen de salida')
	.option('-w, --max-width <number>', 'Ancho maximo en pixeles')
	.option('-h, --max-height <number>', 'Alto maximo en pixeles')
	.option('-q, --quality <number>', 'Calidad de compresión (0 - 100)')
	.option('-p, --png-to-webp', 'Convierte las imagenes .png a .webp al procesarlas')
	.action(async (options) => {
		const { input, output, maxWidth, maxHeight, quality, pngToWebp } = options;

		if (!input) {
			console.log('No se ha especificado una imagen de entrada o una de salida');
			return;
		}

		const result = await Compressor.imageCompress(input, output, {
			maxWidth,
			maxHeight,
			quality,
			pngToWebp
		});

		console.log('Imagen procesada:');
		console.log(result);
	});

program
	.command('folder')
	.alias('f')
	.description('Comprime una carpeta de imagenes')
	.requiredOption('-i, --input <path>', 'Path de la carpeta de entrada')
	.option('-o, --output <path>', 'Path de la carpeta de salida')
	.option('-w, --max-width <number>', 'Ancho maximo en pixeles')
	.option('-h, --max-height <number>', 'Alto maximo en pixeles')
	.option('-q, --quality <number>', 'Calidad de compresión (0 - 100)')
	.option('-p, --png-to-webp', 'Convierte las imagenes .png a .webp al procesarlas')
	.option('-e, --extensions <array>', 'Extensiones que se procesan por default [jpeg, jpg, png]')
	.action(async (options) => {
		const { input, output, maxWidth, maxHeight, quality, pngToWebp, extensions } = options;
		const result = await Compressor.folderCompress(input, output, {
			maxWidth,
			maxHeight,
			quality,
			pngToWebp,
			extensions
		});

		if (result.processed.length) {
			const outputFolder = result.processed[0].slice(0, result.processed[0].lastIndexOf('/'));
			console.log(`Se han procesado ${result.processed.length} imágenes en la carpeta:`);

			console.log(outputFolder);
		}

		if (result.noProcessed.length) {
			console.log('Imágenes no procesadas:');
			console.log(result.noProcessed);
		}
	});

program.parse(process.argv);
