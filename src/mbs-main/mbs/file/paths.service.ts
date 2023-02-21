import { Injectable } from "@nestjs/common";
import { MBS_FOLDER_PATH } from "src/mbs-main/constants";
import { AssetDto } from "src/mbs-main/dto/asset.dto";
import { DossierDto } from "src/mbs-main/dto/dossier.dto";
import { OperationDto } from "src/mbs-main/dto/operation.dto";
import { RelifDto } from "src/mbs-main/dto/relif.dto";

@Injectable({})
export class PathsService {


	getAssetFolderPath(asset: AssetDto) {
		return `${MBS_FOLDER_PATH}/${asset.id}_ ${asset.description}`;
	}



    

	getRelifsFolderPath(asset: AssetDto) {
		return `${this.getAssetFolderPath(asset)}/0_ Rilievi`;
	}
	getRelifFolderPath(relif: RelifDto) {
		return `${this.getRelifsFolderPath(relif.asset)}/r${relif.id}_ ${relif.description}`;
	}




    getOperationsFolderPath(asset: AssetDto) {
		return `${this.getAssetFolderPath(asset)}/1_ Interventi`;
	}
	getOperationFolderPath(operation: OperationDto) {
		return `${this.getOperationsFolderPath(operation.asset)}/o${operation.id}_ ${operation.description}`;
	}





    

	getDossiersFolderPath(dossier: DossierDto) {
        if (dossier.relif !== undefined && dossier.relif !== null) {
			return `${this.getRelifFolderPath(dossier.relif)}`
		}
		if (dossier.operation !== undefined && dossier.operation !== null) {
			return `${this.getOperationFolderPath(dossier.operation)}`
		}
		return `${this.getAssetFolderPath(dossier.asset)}`;
		/*
		if (dossier.relif !== undefined && dossier.relif !== null) {
			return `${this.getRelifFolderPath(dossier.relif)}/Elaborati ${dossier.description}`
		}
		if (dossier.operation !== undefined && dossier.operation !== null) {
			return `${this.getOperationFolderPath(dossier.operation)}/Elaborati ${dossier.description}`
		}
		return `${this.getAssetFolderPath(dossier.asset)}/2_ Elaborati - Stato di fatto`;
		*/
	}
	getDossierFolderPath(dossier: DossierDto) {
		let folderPath: string = `${dossier.type.description}`;

		// Se dossier di rilievo
		if (dossier.relif !== undefined && dossier.relif !== null) {
			folderPath = `d${dossier.id}_ ${dossier.description} _ ${dossier.type.description}`
		}
		// Se dossier di operation
		if (dossier.operation !== undefined && dossier.operation !== null) {
			folderPath = `d${dossier.id}_ ${dossier.description} _ ${dossier.type.description}`
		}

		return `${this.getDossiersFolderPath(dossier)}/${folderPath}`;
	}
}