var Redux = require('redux');

var ADD_PAGE = 'ADD_PAGE';
var REMOVE_PAGE = 'REMOVE_PAGE';
var ADD_MODULE = 'ADD_MODULE';
var REMOVE_MODULE = 'REMOVE_MODULE';
var MODIFY_MODULE = 'MODIFY_MODULE';

var pageId = 0;
var moduleId = 0;

function addPage(col) {
    return {
        type: ADD_PAGE,
        id: pageId++,
        column: col
    };
}

function addModule(pageId, col, name, data) {
    return {
        type: ADD_MODULE,
        pageId: pageId,
        column: col,
        id: moduleId++,
        name: name,
        data: data
    };
}

function removePage(id) {
    return {
        type: REMOVE_PAGE,
        id: id
    };
}

function removeModule(id) {
    return {
        type: REMOVE_MODULE,
        id: id
    };
}

function modifyModule(id, name, data) {
    return {
        type: MODIFY_MODULE,
        id: id,
        name: name,
        data: data
    };
}

function pages(state, action) {
    state = state || [];
    var nextState = state.slice(0);
    switch (action.type) {
    case ADD_PAGE:
        nextState.push(createPage(action.id, action.column));
        return nextState;
    case REMOVE_PAGE:
        // var index = getPageIndex(action.id);
        // if (index !== undefined) {
        //     nextState.splice(index, 1);
        //     pageId--;
        //     return nextState;
        // }
        nextState.pop();
        pageId--;
        return nextState;
    default:
        return state;
    }

    function createPage(id, col) {
        var column = [];
        for (var i = 0; i < col; i++) {
            column.push({
                module: []
            });
        }
        return {
            id: id,
            column: column
        };
    }

    function getPageIndex(id) {
        for (var i = 0, iLen = state.length; i < iLen; i++) {
            if (state[i].id === id) {
                return i;
            }
        }
    }
}

function modules(state, action) {
    state = state || [];
    var nextState = state.slice(0);
    var index = undefined;
    switch (action.type) {
    case ADD_MODULE:
        nextState.push({
            name: action.name,
            data: action.data
        });
        return nextState;
    case REMOVE_MODULE:
        index = getModuleIndex(action.id);
        if (index !== undefined) {
            nextState.splice(index, 1);
            moduleId--;
            return nextState;
        }
    case MODIFY_MODULE:
        index = getModuleIndex(action.id);
        if (index !== undefined) {
            nextState[index].name = action.name;
            nextState[index].data = action.data;
            return nextState;
        }
    default:
        return state;
    }

    function getModuleIndex(id) {
        for (var i = 0, iLen = state.length; i < iLen; i++) {
            if (state[i].id === id) {
                return i;
            }
        }
    }
}

function resume(state, action) {
    state = state || [];
    var nextState = state.slice(0);
    switch (action.type) {
    case ADD_PAGE:
    case REMOVE_PAGE:
        nextState = pages(state, action);
        return nextState;
    case ADD_MODULE:
        var pageIndex = getPageIndex(state, action.pageId);
        if (pageIndex !== undefined) {
            nextState[pageIndex].column[action.column].module = modules(nextState[pageIndex].column[action.column].module, action);
            return nextState;
        }
    case REMOVE_MODULE:
    case MODIFY_MODULE:
        var indexPCM = getModules(state, action.id);
        if (indexPCM) {
            nextState[indexPCM[0]][indexPCM[1]].module = modules(nextState[indexPCM[0]][indexPCM[1]].module, action);
            return nextState;
        }
    default:
        return state;
    }

    function getModules(pages, id) {
        for (var i = 0, iLen = pages.length; i < iLen; i++) {
            var columns = pages[i].column;
            for (var j = 0, jLen = columns.length; j < jLen; j++) {
                var modules = columns[j].module;
                for (var k = 0, kLen = modules.length; k < kLen; k++) {
                    if (modules[k].id === id) {
                        return [i, j];
                    }
                }
            }
        }
    }

    function getPageIndex(pages, id) {
        for (var i = 0, iLen = pages.length; i < iLen; i++) {
            if (pages[i].id === id) {
                return i;
            }
        }
    }
}

exports.ADD_PAGE = ADD_PAGE;
exports.ADD_MODULE = ADD_MODULE;
exports.REMOVE_PAGE = REMOVE_PAGE;
exports.REMOVE_MODULE = REMOVE_MODULE;
exports.MODIFY_MODULE = MODIFY_MODULE;

exports.addPage = addPage;
exports.addModule = addModule;
exports.removePage = removePage;
exports.removeModule = removeModule;
exports.modifyModule = modifyModule;

exports.reducer = resume;
