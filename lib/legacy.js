var ElementTypes = require("domelementtype");
var ElementType = ElementTypes.elements;
exports.isTag = ElementType.isTag;
function testElement(options, element) {
    for (var key in options) {
        if (!options.hasOwnProperty(key))
            ;
        else if (key === "tag_name") {
            if (!exports.isTag(element) || !options.tag_name(element.name)) {
                return false;
            }
        }
        else if (key === "tag_type") {
            if (!options.tag_type(element.type))
                return false;
        }
        else if (key === "tag_contains") {
            if (exports.isTag(element) || !options.tag_contains(element.data)) {
                return false;
            }
        }
        else if (!element.attribs || !options[key](element.attribs[key])) {
            return false;
        }
    }
    return true;
}
exports.testElement = testElement;
;
var Checks = {
    tag_name: function (name) {
        if (typeof name === "function") {
            return function (elem) {
                return exports.isTag(elem) && name(elem.name);
            };
        }
        else if (name === "*") {
            return exports.isTag;
        }
        else {
            return function (elem) {
                return exports.isTag(elem) && elem.name === name;
            };
        }
    },
    tag_type: function (type) {
        if (typeof type === "function") {
            return function (elem) {
                return type(elem.type);
            };
        }
        else {
            return function (elem) {
                return elem.type === type;
            };
        }
    },
    tag_contains: function (data) {
        if (typeof data === "function") {
            return function (elem) {
                return !exports.isTag(elem) && data(elem.data);
            };
        }
        else {
            return function (elem) {
                return !exports.isTag(elem) && elem.data === data;
            };
        }
    }
};
function getAttribCheck(attrib, value) {
    if (typeof value === "function") {
        return function (elem) {
            return elem.attribs && value(elem.attribs[attrib]);
        };
    }
    else {
        return function (elem) {
            return elem.attribs && elem.attribs[attrib] === value;
        };
    }
}
function combineFuncs(a, b) {
    return function (elem) {
        return a(elem) || b(elem);
    };
}
function getElements(options, element, recurse, limit) {
    var funcs = Object.keys(options).map(function (key) {
        var value = options[key];
        return key in Checks ? Checks[key](value) : getAttribCheck(key, value);
    });
    return funcs.length === 0 ? [] : this.filter(funcs.reduce(combineFuncs), element, recurse, limit);
}
exports.getElements = getElements;
;
function getElementById(id, element, recurse) {
    if (!Array.isArray(element))
        element = [element];
    return this.findOne(getAttribCheck("id", id), element, recurse !== false);
}
exports.getElementById = getElementById;
;
function getElementsByTagName(name, element, recurse, limit) {
    return this.filter(Checks.tag_name(name), element, recurse, limit);
}
exports.getElementsByTagName = getElementsByTagName;
;
function getElementsByTagType(type, element, recurse, limit) {
    return this.filter(Checks.tag_type(type), element, recurse, limit);
}
exports.getElementsByTagType = getElementsByTagType;
;
