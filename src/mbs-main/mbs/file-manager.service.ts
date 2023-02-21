import { Injectable, OnModuleInit } from '@nestjs/common';
import { AssetDto } from '../dto/asset.dto';
import { DossierDto } from '../dto/dossier.dto';
import { OperationDto } from '../dto/operation.dto';
import { RelifDto } from '../dto/relif.dto';
import { AssetEntityService } from '../entity/asset.entity.service';
import { DossierEntityService } from '../entity/dossier.entity.service';
import { OperationEntityService } from '../entity/operation.entity.service';
import { RelifEntityService } from '../entity/relif.entity.service';
import { Element, ElementDirType, ElementCategory, IElements, ElementFileType } from './class/element.class';
import { PathsService } from './file/paths.service';
import { FileStructureCheckerService } from './file/structure-checker.service';
import { ASSET_DIR, OPERATION_DIR, RELIF_DIR } from './structure.costants';

@Injectable({})
export class FileManagerService implements OnModuleInit {
	constructor(
		private assetEntityService: AssetEntityService,
		private dossierEntityService: DossierEntityService,
		private operationEntityService: OperationEntityService,
		private relifEntityService: RelifEntityService,
		private pathsService: PathsService,
		private fileStructureCheckerService: FileStructureCheckerService,
	) { }

	async onModuleInit() {
		let fileCheckResult = await this.fileStructureCheckerService.structureChek(await this.getElementsToCheck());
		console.log(fileCheckResult.fileCreati);
	}

	async getElementsToCheck(): Promise<IElements> {
		let tree: IElements = {};
		{
			let assets: AssetDto[] = await this.assetEntityService.getAssets();
			for (let asset of assets) {
				let assetElement: Element = new Element(ElementCategory.dir, ElementDirType.asset);
				assetElement.entity = asset;

				for (let elementKey in ASSET_DIR) {
					let element = ASSET_DIR[elementKey];
					switch (element.category) {
						case ElementCategory.dir: {
							switch (element.type) {
								case ElementDirType.dossier: {
									// Dossier
									assetElement.addChilds(await this.getDossiers({ assetIdEquals: asset.id }))
								} break;
								case ElementDirType.relifs: {
									// Relif
									let relifsDirectory: Element = new Element(ElementCategory.dir, ElementDirType.relifs);
									relifsDirectory.entity = asset;
									{
										let relifs: RelifDto[] = await this.relifEntityService.getRelifs({ assetIdEquals: asset.id });
										for (let relif of relifs) {
											let relifElement: Element = new Element(ElementCategory.dir, ElementDirType.relif);
											relifElement.entity = relif;
											for (let elementRelifName in RELIF_DIR) {
												let elementRelif = RELIF_DIR[elementRelifName];
												switch (elementRelif.category) {
													case ElementCategory.dir: {
														switch (elementRelif.type) {
															case ElementDirType.dossier:		relifElement.addChilds(await this.getDossiers({ relifIdEquals: relif.id })); break;
															case ElementDirType.elaborateds:	relifElement.addChilds(await this.getDossiers({ relifIdEquals: relif.id, "dossier.": '' })); break;
															default: console.log("Non gestito:", elementKey, element);
														}
													} break;
													case ElementCategory.file: {
														switch (elementRelif.type) {
															case ElementFileType.generic: 	console.log("File in relif mancante: '", elementRelifName, "' Invia mail di warning!"); break;
															//case ElementFileType.link: 		relifElement.addChild(elementRelifName, new Element(ElementCategory.file, ElementFileType.link)); break;
															case ElementFileType.base: 		console.log("Tipo file non disponibile in questa sezione:", elementKey, ". Invia mail di warning!"); break;
														}
													} break;
												}
											}
											relifsDirectory.addChild(this.pathsService.getRelifFolderPath(relif), relifElement);
										}
									}
									assetElement.addChild(this.pathsService.getRelifsFolderPath(asset), relifsDirectory);
								} break;
								case ElementDirType.operations: {
									// Operation
									let operationsDirectory: Element = new Element(ElementCategory.dir, ElementDirType.operations);
									operationsDirectory.entity = asset;
									{
										let operations: OperationDto[] = await this.operationEntityService.getOperations({ assetIdEquals: asset.id });
										for (let operation of operations) {
											let operationElement: Element = new Element(ElementCategory.dir, ElementDirType.operation);
											operationElement.entity = operation;
											for (let elementOperationName in OPERATION_DIR) {
												let elementOperation = OPERATION_DIR[elementOperationName];
												switch (elementOperation.category) {
													case ElementCategory.dir: {
														switch (elementOperation.type) {
															case ElementDirType.dossier:	elementOperation.addChilds(await this.getDossiers({ operationIdEquals: operation.id })); break;
															default: console.log("Non gestito:", elementKey, element);
														}
													} break;
													case ElementCategory.file: {
														switch (elementOperation.type) {
															case ElementFileType.generic: 	console.log("File in operation mancante:", elementOperationName, ". Invia mail di warning!"); break;
															//case ElementFileType.link: 		elementOperation.addChild(elementOperationName, new Element(ElementCategory.file, ElementFileType.link)); break;
															case ElementFileType.base: 		console.log("Tipo file non disponibile in questa sezione:", elementKey, ". Invia mail di warning!"); break;
														}
													} break;
												}
											}
											operationsDirectory.addChild(this.pathsService.getOperationFolderPath(operation), operationElement);
										}
									}
									assetElement.addChild(this.pathsService.getOperationsFolderPath(asset), operationsDirectory);
								} break;
								default: console.log("Non gestito:", elementKey, element);
							}
						} break;
						case ElementCategory.file: {
							// Files
							let e = new Element(ElementCategory.file, element.type);
							e.entity = asset;
							assetElement.addChild(this.pathsService.getAssetFolderPath(asset)+"/"+elementKey, e);
						} break;
					}
				}
				// Save
				tree[this.pathsService.getAssetFolderPath(asset)] = assetElement;
			}
		}

		console.log(">>>>", await this.getDossiers({ relifIdEquals: 1, "dossier.": '' }))

		return tree;
	}

	private async getDossiers(filter: any): Promise<IElements> {
		let dossiersTree: IElements = {};
		{
			let dossiers: DossierDto[] = await this.dossierEntityService.getDossiers(filter);
			for (let dossier of dossiers) {
				let dossierElement: Element = new Element(ElementCategory.dir, ElementDirType.dossier);
				dossierElement.entity = dossier;
				// Files
				{
					//dossierElement.addChild("Dettagli.link", new Element(ElementCategory.file, ElementFileType.link));
				}

				dossiersTree[this.pathsService.getDossierFolderPath(dossier)] = dossierElement;
			}
		}
		return dossiersTree;
	}









































}