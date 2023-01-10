import { ElementCategory, IElements, Element, ElementFileType, ElementDirType } from "./class/element.class";

export const ASSET_DIR: IElements = {
	"_ Rilievi" : new Element(ElementCategory.dir, ElementDirType.relifs),
	"_ Interventi" : new Element(ElementCategory.dir, ElementDirType.operations),
	"$dossier" : new Element(ElementCategory.dir, ElementDirType.dossier),
	"Dettagli.url" : new Element(ElementCategory.file, ElementFileType.link),
	"base_p$n.dwg" : new Element(ElementCategory.file, ElementFileType.base),
}

export const RELIF_DIR: IElements = {
	"$dossier" : new Element(ElementCategory.dir, ElementDirType.dossier),
	"Dettagli.url" : new Element(ElementCategory.file, ElementFileType.link),
}

export const OPERATION_DIR: IElements = {
	"$dossier" : new Element(ElementCategory.dir, ElementDirType.dossier),
	"Dettagli.url" : new Element(ElementCategory.file, ElementFileType.link),
}