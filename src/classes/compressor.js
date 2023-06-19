import fs from 'fs';
import sharp from 'sharp';
import { getFileExtension } from '../utils/getExtension.js';

const jpgExtensions = ['jpeg', 'jpg'];
const pngExtensions = ['png'];
const defaultExtensionsAllowed = ['jpeg', 'jpg', 'png'];

export default class Compressor {
	/**
	 * Lee y busca todas las imagenes de una carpeta y las comprime en otra
	 * @param {string} folderInput Path de la carpeta de entrada
	 * @param {string} folderOutput Path de la carpeta de salida, si no se especifica, se guardaran en una subcarpeta llamada _processed
	 * @param {{ quality: number, maxWidth: number, maxHeight: number, extensions: string [], pngToWebp: boolean }} options Opciones de compresión:
	 * * quality: calidad de compresión (0 - 100),
	 * * maxWidth: ancho maximo en pixeles,
	 * * maxHeight: alto maximo en pixeles,
	 * * extensions: extensiones que se procesan por default [jpeg, jpg, png],
	 * * pngToWebp: convierte las imagenes .png a .webp al procesarlas
	 */
	static async folderCompress(folderInput, folderOutput = '', options = {}) {
		if (folderInput.endsWith('/')) {
			folderInput = folderInput.slice(0, -1);
		}

		if (!folderInput || !fs.existsSync(folderInput)) {
			throw new Error('No se ha especificado una carpeta de entrada o no existe');
		}

		if (!folderOutput) {
			folderOutput = `${folderInput}/_processed`;
		}

		if (!fs.existsSync(folderOutput)) {
			fs.mkdirSync(folderOutput);
		}

		const { extensions = [...defaultExtensionsAllowed] } = options;

		const files = fs
			.readdirSync(folderInput)
			.filter((file) => extensions.includes(getFileExtension(file)));

		const processed = [];
		const noProcessed = {};

		for (const file of files) {
			const imageInput = `${folderInput}/${file}`;
			const imageOutput = `${folderOutput}/${file}`;

			try {
				const pathToNewFile = await Compressor.imageCompress(imageInput, imageOutput, options);
				processed.push(pathToNewFile);
			} catch (error) {
				noProcessed.push({
					file,
					error: error.message
				});
			}
		}

		return {
			processed,
			noProcessed
		};
	}

	/**
	 * Comprime una imagen y la guarda en otra ruta
	 * @param {string} imageInput Path de la imagen original
	 * @param {string} imageOutput Path de la imagen de salida, si no se especifica se guarda en la misma ruta con el sufijo _processed
	 * @param {{ quality: number, maxWidth: number, maxHeight: number, extensions: string [] }} options Opciones de compresión:
	 * * quality: calidad de compresión (0 - 100),
	 * * maxWidth: ancho maximo en pixeles,
	 * * maxHeight: alto maximo en pixeles,
	 * * extensions: extensiones que se procesan por default [jpeg, jpg, png],
	 * * pngToWebp: convierte las imagenes .png a .webp al procesarlas
	 */
	static async imageCompress(imageInput, imageOutput = '', options = {}) {
		if (!fs.existsSync(imageInput)) {
			throw new Error('La imagen de entrada no existe');
		}
		const extension = getFileExtension(imageInput);

		if (!imageOutput) {
			imageOutput = imageInput.replace('.' + extension, '_processed.' + extension);
		}

		const {
			quality = 80,
			maxWidth = 1000,
			maxHeight = 1000,
			extensions = [...defaultExtensionsAllowed],
			pngToWebp = false
		} = options;

		if (!extensions.includes(extension)) {
			throw new Error('La extension de la imagen no es valida');
		}

		const processingImage = sharp(imageInput);
		const metadata = await processingImage.metadata();

		if (metadata.width > maxWidth || metadata.height > maxHeight) {
			await processingImage.resize({
				width: maxWidth,
				height: maxHeight,
				fit: sharp.fit.inside
			});
		}

		if (jpgExtensions.includes(extension)) {
			await processingImage.jpeg({ quality });
		}

		if (pngExtensions.includes(extension)) {
			if (pngToWebp) {
				await processingImage.webp({ quality });
				imageOutput = imageOutput.replace('.' + extension, '.webp');
			} else {
				await processingImage.png({ quality });
			}
		}

		await processingImage.toFile(imageOutput);

		return imageOutput;
	}
}
