import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import { AssetBusinessService } from '../business/asset.business.service';
import { DossierBusinessService } from '../business/dossier.business.service';
import { OperationBusinessService } from '../business/operation.business.service';
import { RelifBusinessService } from '../business/relif.business.service';
import { AssetDto } from '../dto/asset.dto';
import { DossierDto } from '../dto/dossier.dto';
import { OperationDto } from '../dto/operation.dto';
import { RelifDto } from '../dto/relif.dto';
import { Element, ElementDirType, ElementFileType, ElementCategory, IElements } from './class/element.class';
import { FileOperationService } from './file-operation.service';

@Injectable({})
export class FileManagerService implements OnModuleInit {
	constructor(
		private assetBusinessService: AssetBusinessService,
		private dossierBusinessService: DossierBusinessService,
		private operationBusinessService: OperationBusinessService,
		private relifBusinessService: RelifBusinessService,
		private fileOperationService: FileOperationService,
	) { }

	async onModuleInit() {
		let tree: IElements = {};
		{
			let assets: AssetDto[] = await this.assetBusinessService.searchAssets();
			for (let asset of assets) {
				let assetElement: Element = new Element(ElementCategory.dir, ElementDirType.asset);
				assetElement.entity = asset;
				// Dossier
				assetElement.addChilds(await this.getDossiers({ assetIdEquals: asset.id }))
				// Files
				{
					assetElement.addChild("Dettagli.link", new Element(ElementCategory.file, ElementFileType.link));
				}
				// Relif
				{
					let relifsDirectory: Element = new Element(ElementCategory.dir, ElementDirType.relifs);
					relifsDirectory.entity = asset;
					{
						let relifs: RelifDto[] = await this.relifBusinessService.searchRelifs({ assetIdEquals: asset.id });
						for (let relif of relifs) {
							let relifElement: Element = new Element(ElementCategory.dir, ElementDirType.relif);
							relifElement.entity = relif;
							{
								// Dossier
								relifElement.addChilds(await this.getDossiers({ relifIdEquals: relif.id }))
								// Files
								{
									//relifElement.addChild("Dettagli.link", new Element(ElementCategory.file, ElementFileType.link));
								}
							}
							// Save
							let relifFolderName: string = `r${relif.id}_ ${relif.description}`;
							relifsDirectory.addChild(relifFolderName, relifElement);
						}
					}
					let relifsFolderName: string = `_ Rilievi`;
					assetElement.addChild(relifsFolderName, relifsDirectory);
				}
				// Operation
				{
					let operationsDirectory: Element = new Element(ElementCategory.dir, ElementDirType.operations);
					operationsDirectory.entity = asset;
					{
						let operations: OperationDto[] = await this.operationBusinessService.searchOperations({ assetIdEquals: asset.id });
						for (let operation of operations) {
							let operationElement: Element = new Element(ElementCategory.dir, ElementDirType.operation);
							operationElement.entity = operation;
							{
								// Dossier
								operationElement.addChilds(await this.getDossiers({ operationIdEquals: operation.id }))
								// Files
								{
									//operationElement.addChild("Dettagli.link", new Element(ElementCategory.file, ElementFileType.link));
								}
							}
							// Save
							let operationFolderName: string = `o${operation.id}_ ${operation.description}`;
							operationsDirectory.addChild(operationFolderName, operationElement);
						}
					}
					let operationsFolderName: string = `_ Interventi`;
					assetElement.addChild(operationsFolderName, operationsDirectory);
				}

				// Save
				let assetFolderName: string = `${asset.id}_ ${asset.description}`;
				tree[assetFolderName] = assetElement;
			}
		}

		let fileCheckResult = this.folderChek("/mnt/c/test-folder/mbs", tree);
	}

	private async getDossiers(filter: any): Promise<IElements> {
		let dossiersTree: IElements = {};
		{
			let dossiers: DossierDto[] = await this.dossierBusinessService.searchDossiers(filter);
			for (let dossier of dossiers) {
				let dossierElement: Element = new Element(ElementCategory.dir, ElementDirType.dossier);
				// Files
				{
					//dossierElement.addChild("Dettagli.link", new Element(ElementCategory.file, ElementFileType.link));
				}
				let dossierFolderName: string = dossier.type.description;
				dossiersTree[dossierFolderName] = dossierElement;
			}
		}
		return dossiersTree;
	}












	folderChek(folderPath: string, structure: IElements): any {
		let result = {
			fileOk: [],
			fileAnomali: [],
		}
		
		for (let struElementName in structure) {
			// 0 - Preapare variables
			let struElementPath = folderPath + "/" + struElementName;
			let struElement: Element = structure[struElementName];

			// 1 - If exist in other
			if (!fs.existsSync(struElementPath)) {
				switch (struElement.category) {
					case ElementCategory.file:
						if (struElement.type != ElementFileType.generic) {
							//CREATION
							//console.log("creazione file", struElement);
							continue;
						}
						result.fileAnomali.push({
							path: struElementPath,
							type: "file",
							problem: "not present in tree",
							solution: "create it"
						});
						continue;
					case ElementCategory.dir:
						switch (struElement.type) {
							case ElementDirType.asset:		this.fileOperationService.createAssetFolder(struElement.entity);	break;
							case ElementDirType.dossier:	this.fileOperationService.createDossiers(struElement.entity);	break;
							case ElementDirType.relifs:		this.fileOperationService.createRelifsFolder(struElement.entity);	break;
							case ElementDirType.relif:		this.fileOperationService.createRelifFolder(struElement.entity);	break;
							case ElementDirType.operations:	this.fileOperationService.createOperationsFolder(struElement.entity);	break;
							case ElementDirType.operation:	this.fileOperationService.createOperationFolder(struElement.entity);	break;
						}
						continue;
					default:
						result.fileAnomali.push({
							path: struElementPath,
							type: "bho",
							problem: "not present in tree",
							solution: "create it"
						});
						continue;
				}
			}
		}

		const dirContents = fs.readdirSync(folderPath);
		dirContents.forEach(dirElementName => {
			// 0 - Preapare variables
			let dirElementPath = folderPath + "/" + dirElementName;

			// 1 - If exist in other
			if (structure[dirElementName] === undefined) {
				result.fileAnomali.push({
					path: dirElementPath,
					problem: "not present in structure",
					solution: "delete it"
				});
				return;
			}

			// 2 - If type is the same of other
			const stat = fs.lstatSync(dirElementPath);
			switch (structure[dirElementName].category) {
				case ElementCategory.file:
					if (!stat.isFile()) {
						result.fileAnomali.push({
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
						result.fileAnomali.push({
							path: dirElementPath,
							type: "file",
							problem: "invalid type! in structure is folder but in reality is file",
							solution: "change type"
						});
						return;
					}
					break;
				default:
					result.fileAnomali.push({
						path: dirElementPath,
						type: "bho",
						problem: "invalid file!",
						solution: "delete it"
					});
					return;
			}

			if (stat.isDirectory()) {
				let childs = structure[dirElementName].childs;
				if (childs !== undefined) {
					this.folderChek(dirElementPath, childs)
				}

			}

			result.fileOk.push(dirElementPath);
		});

		return result;
	}



}