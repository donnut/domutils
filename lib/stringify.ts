import ElementType = require("domelementtype");
import GetOuterHTML = require("dom-serializer");

var isTag = ElementType.isTag;

export var getOuterHTML = GetOuterHTML;

export function getInnerHTML(elem, opts){
	return elem.children ? elem.children.map(function(elem){
		return getOuterHTML(elem, opts);
	}).join("") : "";
}

export function getText(elem){
	if (Array.isArray(elem)) return elem.map(getText).join("");
	if (isTag(elem) || elem.type === ElementType.CDATA) return getText(elem.children);
	if (elem.type === ElementType.Text) return elem.data;
	return "";
}
