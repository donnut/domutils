function getChildren(elem) {
    return elem.children;
}
exports.getChildren = getChildren;
;
function getParent(elem) {
    return elem.parent;
}
exports.getParent = getParent;
;
function getSiblings(elem) {
    var parent = getParent(elem);
    return parent ? getChildren(parent) : [elem];
}
exports.getSiblings = getSiblings;
;
function getAttributeValue(elem, name) {
    return elem.attribs && elem.attribs[name];
}
exports.getAttributeValue = getAttributeValue;
;
function hasAttrib(elem, name) {
    return !!elem.attribs && elem.attribs.hasOwnProperty(name);
}
exports.hasAttrib = hasAttrib;
;
function getName(elem) {
    return elem.name;
}
exports.getName = getName;
;
