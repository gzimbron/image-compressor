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
	static folderCompress(
		folderInput: string,
		folderOutput?: string,
		options?: {
			quality?: number;
			maxWidth?: number;
			maxHeight?: number;
			extensions?: string[];
			pngToWebp?: boolean;
		}
	): Promise<{
		processed: string[];
		noProcessed: Array<{ file: string; error: string }>;
	}>;

	/**
	 * Comprime una imagen y la guarda en otra ruta
	 * @param {string} imageInput Path de la imagen original
	 * @param {string} imageOutput Path de la imagen de salida, si no se especifica se guarda en la misma ruta con el sufijo _processed
	 * @param {{ quality: number, maxWidth: number, maxHeight: number, pngToWebp: boolean }} options Opciones de compresión:
	 * * quality: calidad de compresión (0 - 100),
	 * * maxWidth: ancho maximo en pixeles,
	 * * maxHeight: alto maximo en pixeles,
	 * * pngToWebp: convierte las imagenes .png a .webp al procesarlas
	 */
	static imageCompress(
		imageInput: string,
		imageOutput?: string,
		options?: {
			quality?: number;
			maxWidth?: number;
			maxHeight?: number;
			pngToWebp?: boolean;
		}
	): Promise<string>;
}
