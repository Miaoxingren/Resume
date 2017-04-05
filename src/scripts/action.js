var ADD_PAGE = 'ADD_PAGE';
var ADD_COLUMN = 'ADD_COLUMN';
var ADD_MODULE = 'ADD_MODULE';
var REMOVE_PAGE = 'REMOVE_PAGE';
var REMOVE_COLUMN = 'REMOVE_COLUMN';
var REMOVE_MODULE = 'REMOVE_MODULE';
var MODIFY_MODULE = 'MODIFY_MODULE';

function addPage(id) {
    return {
        type: ADD_PAGE,
        pageId: id
    }
}

function addModule(name) {
    return {
        type: ADD_MODULE,
        name: name
    }
}

function removePage(id) {
    return {
        type: REMOVE_PAGE,
        pageId: id
    }
}

function removeModule(name) {
    return {
        type: REMOVE_MODULE,
        name: name
    }
}

function modifyModule(name, data) {
    return {
        type: MODIFY_MODULE,
        name: name,
        data: data
    }
}

exports.ADD_PAGE = ADD_PAGE;
exports.ADD_COLUMN = ADD_COLUMN;
exports.ADD_MODULE = ADD_MODULE;
exports.REMOVE_PAGE = REMOVE_PAGE;
exports.REMOVE_COLUMN = REMOVE_COLUMN;
exports.REMOVE_MODULE = REMOVE_MODULE;
exports.MODIFY_MODULE = MODIFY_MODULE;

exports.addPage = addPage;
exports.addModule = addModule;
exports.removePage = removePage;
exports.removeModule = removeModule;
exports.modifyModule = modifyModule;
