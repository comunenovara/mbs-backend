import { Injectable } from "@nestjs/common";
import { Element, ElementCategory, ElementDirType, ElementFileType, IElements } from "../class/element.class";
import * as fs from 'fs';
import { AssetFileService } from "./asset.file.service";
import { DossierFileService } from "./dossier.file.service";
import { RelifFileService } from "./relif.file.service";
import { OperationFileService } from "./operation.file.service";
import { MBS_FOLDER_PATH } from "src/mbs-main/constants";

@Injectable({})
export class FileStructureCheckerService {

	constructor(
		private assetFileService: AssetFileService,
		private dossierFileService: DossierFileService,
		private relifFileService: RelifFileService,
		private operationFileService: OperationFileService,
	) { }

	private result = {
		fileOk: [],
		fileCreati: [],
		fileAnomali: [],
	}

	async structureChek(structure: IElements, path: string = MBS_FOLDER_PATH) {
		for (let struElementPath in structure) {
			// 0 - Preapare variables
			let struElement: Element = structure[struElementPath];

			// 1 - If exist in other
			if (!fs.existsSync(struElementPath)) {
				switch (struElement.category) {
					case ElementCategory.file:
						switch (struElement.type) {
							case ElementFileType.generic:	console.log("File mancante:", struElementPath, ". Invia mail di warning!"); break;
							case ElementFileType.link: 		this.result.fileCreati.push(this.assetFileService.createAssetLinkFile(struElement.entity)); break; // NON GESTISCE TUTTI I TIPI DI LINK
							case ElementFileType.base: 		this.result.fileCreati.push(this.assetFileService.createAssetBaseFile(struElement.entity)); break; // NON GESTISCE TUTTI I TIPI DI BASE
						}
						continue;
					case ElementCategory.dir:
						switch (struElement.type) {
							case ElementDirType.asset:		this.result.fileCreati.push(await this.assetFileService.createAsset(struElement.entity)); break;
							case ElementDirType.dossier:	this.result.fileCreati.push(this.dossierFileService.createDossier(struElement.entity)); break;
							case ElementDirType.relifs:		this.result.fileCreati.push(await this.relifFileService.createRelifsFolder(struElement.entity)); break;
							case ElementDirType.relif:		this.result.fileCreati.push(await this.relifFileService.createRelif(struElement.entity)); break;
							case ElementDirType.operations:	this.result.fileCreati.push(await this.operationFileService.createOperationsFolder(struElement.entity)); break;
							case ElementDirType.operation:	this.result.fileCreati.push(await this.operationFileService.createOperation(struElement.entity)); break;
						}
						continue;
					default:
						this.result.fileAnomali.push({
							path: struElementPath,
							type: "bho",
							problem: "not present in tree",
							solution: "create it"
						});
						continue;
				}
			}
		}

		const dirContents = fs.readdirSync(path);
		for await (let dirElementName of dirContents) {
			// 0 - Preapare variables
			let dirElementPath = path + "/" + dirElementName;

			// 1 - If exist in other
			if (structure[dirElementPath] === undefined) {
				this.result.fileAnomali.push({
					path: dirElementPath,
					problem: "not present in structure",
					solution: "delete it"
				});
				return;
			}

			// 2 - If type is the same of other
			const stat = fs.lstatSync(dirElementPath);
			switch (structure[dirElementPath].category) {
				case ElementCategory.file:
					if (!stat.isFile()) {
						this.result.fileAnomali.push({
							path: dirElementPath,
							type: "folder",
							problem: "invalid type! in structure is file but in reality is folder",
							solution: "change type"
						});
						return;
					}
					break;
				case ElementCategory.dir:
					if (!stat.isDirectory()) {
						this.result.fileAnomali.push({
							path: dirElementPath,
							type: "file",
							problem: "invalid type! in structure is folder but in reality is file",
							solution: "change type"
						});
						return;
					}
					break;
				default:
					this.result.fileAnomali.push({
						path: dirElementPath,
						type: "bho",
						problem: "invalid file!",
						solution: "delete it"
					});
					return;
			}

			if (stat.isDirectory()) {
				let childs = structure[dirElementPath].childs;
				if (childs !== undefined) {
					await this.structureChek(childs, dirElementPath)
				}
			}

			this.result.fileOk.push(dirElementPath);
		}

		return this.result;
	}
}