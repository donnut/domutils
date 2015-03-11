var ElementType = require("domelementtype");
var GetOuterHTML = require("dom-serializer");
var isTag = ElementType.isTag;
exports.getOuterHTML = GetOuterHTML;
function getInnerHTML(elem, opts) {
    return elem.children ? elem.children.map(function (elem) {
        return exports.getOuterHTML(elem, opts);
    }).join("") : "";
}
exports.getInnerHTML = getInnerHTML;
function getText(elem) {
    if (Array.isArray(elem))
        return elem.map(getText).join("");
    if (isTag(elem) || elem.type === ElementType.CDATA)
        return getText(elem.children);
    if (elem.type === ElementType.Text)
        return elem.data;
    return "";
}
exports.getText = getText;
