import { ElementCategory, IElements, Element, ElementFileType, ElementDirType } from "./class/element.class";

export const ASSET_DIR: IElements = {
	"0_ Rilievi" : new Element(ElementCategory.dir, ElementDirType.relifs),
	"1_ Interventi" : new Element(ElementCategory.dir, ElementDirType.operations),
	"2_ Elaborati - Stato di fatto" : new Element(ElementCategory.dir, ElementDirType.main_elaborated),
	"$dossier" : new Element(ElementCategory.dir, ElementDirType.dossier),
	"Dettagli.url" : new Element(ElementCategory.file, ElementFileType.link),
	"base_p$n.dwg" : new Element(ElementCategory.file, ElementFileType.base),
}

export const RELIF_DIR: IElements = {
	"$dossier" : new Element(ElementCategory.dir, ElementDirType.dossier),
	"?Elaborati $dossier" : new Element(ElementCategory.dir, ElementDirType.elaborateds),
	"Dettagli.url" : new Element(ElementCategory.file, ElementFileType.link),
}

export const OPERATION_DIR: IElements = {
	"$dossier" : new Element(ElementCategory.dir, ElementDirType.dossier),
	"?Elaborati $dossier" : new Element(ElementCategory.dir, ElementDirType.elaborateds),
	"Dettagli.url" : new Element(ElementCategory.file, ElementFileType.link),
}

export const ELABORATED_GROUP_DIR: IElements = {
	"$dossier" : new Element(ElementCategory.dir, ElementDirType.dossier),
}