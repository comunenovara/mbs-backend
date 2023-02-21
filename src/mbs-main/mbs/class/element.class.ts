import { AssetDto } from "src/mbs-main/dto/asset.dto";
import { DossierDto } from "src/mbs-main/dto/dossier.dto";
import { OperationDto } from "src/mbs-main/dto/operation.dto";
import { RelifDto } from "src/mbs-main/dto/relif.dto";

export enum ElementCategory {
    file, dir
}

export enum ElementFileType {
    generic = 0,
    link = 1,
    base = 20,
}

export enum ElementDirType {
    generic = 0,
    asset = 1,
	dossier = 2,
	relif = 20,
	relifs = 21,
    operation = 4,
	operations = 31,
    elaborated = 40,
    elaborateds = 41,
    main_elaborated = 42,
}

export interface IElements {
    [key: string]: Element;
}

export interface IElement {
    category: ElementCategory;
    type: ElementDirType | ElementFileType;
    childs?: IElements;
	entity?: AssetDto | DossierDto | RelifDto | OperationDto;
}

export class Element implements IElement {
    readonly category: ElementCategory;
    readonly type: ElementDirType | ElementFileType;
    childs?: IElements;
	entity?: AssetDto | DossierDto | RelifDto | OperationDto;

    constructor(category: ElementCategory, type: ElementDirType | ElementFileType) {
        this.category = category;

        switch (this.category) {
            case ElementCategory.dir:
                if (type in ElementDirType) this.type = type; break;
            case ElementCategory.file:
                if (type in ElementFileType) this.type = type; break;
            default:
                throw new Error('Pass correct type of element');
        }
    }

    addChild(name: string, child: Element) {
        if (this.childs === undefined) this.childs = {};

        this.childs[name] = child;
    }

    addChilds(childs: IElements) {
        if (this.childs === undefined) this.childs = {};

        this.childs = { ...this.childs, ...childs };
    }
}