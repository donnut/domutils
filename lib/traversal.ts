export function getChildren(elem){
	return elem.children;
};

export function getParent(elem) {
	return elem.parent;
};

export function getSiblings(elem){
	var parent = getParent(elem);
	return parent ? getChildren(parent) : [elem];
};

export function getAttributeValue(elem, name){
	return elem.attribs && elem.attribs[name];
};

export function hasAttrib(elem, name){
	return !!elem.attribs && elem.attribs.hasOwnProperty(name);
};

export function getName(elem){
	return elem.name;
};
