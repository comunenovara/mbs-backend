import { ElementCategory, IElements, Element, ElementFileType, ElementDirType } from "./class/element.class";

export const ASSET_DIR: IElements = {
	"_ Rilievi" : new Element(ElementCategory.dir, ElementDirType.relifs),
	"_ Interventi" : new Element(ElementCategory.dir, ElementDirType.operations),
	"Dettagli.link" : new Element(ElementCategory.file, ElementFileType.link),
}

export const RELIF_DIR: IElements = {
	"Dettagli.link" : new Element(ElementCategory.file, ElementFileType.link),
}

export const OPERATION_DIR: IElements = {
	"Dettagli.link" : new Element(ElementCategory.file, ElementFileType.link),
}