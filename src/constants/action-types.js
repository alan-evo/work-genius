var keyMirror = require('keymirror');

export default keyMirror({
    // Demo page actions
    INCREASE_COUNTER: null,
    DECREASE_COUNTER: null,
    INCREASE_COUNTER_LATER: null,

    // Main actions
    SET_LOADING_STATE: null,
    API_FAILURE: null,
    CLEAR_ERROR_MESSAGE: null,
    SET_CURRENT_SELECTED_USER_ID: null,
    SET_CURRENT_SELECTED_PAGE_NAME: null,

    // Task page actions
    SORT_FEATURE_TABLE_BY_CATEGORY: null,
    FILTER_FEATURE_TABLE: null,
    RESET_FEATURE_TABLE: null,
    SORT_BUG_TABLE_BY_CATEGORY: null,
    FILTER_BUG_TABLE: null,
    RESET_BUG_TABLE: null,
    FETCH_BUG_REQUEST: null,
    FETCH_BUG_SUCCESS: null,
    FETCH_FEATURE_SUCCESS: null,
    EDIT_ETA_REQUEST: null,
    EDIT_ETA_SUCCESS: null,
    INITIATE_CRAWLER: null,
    FETCH_INTERNAL_FEATURE_SUCCESS: null,
    FILTER_INTERNAL_FEATURE_TABLE: null,
    SET_DELETE_WARNING_BOX_STATE: null,
    SET_SELECTED_ITEM: null,
    RESET_SELECTED_ITEM: null,
    SET_FEATURE_MODAL_STATE: null,
    RESET_INTERNAL_FEATURE_TABLE: null,
    FETCH_USERS_WITH_TASKS_SUCCESS: null,

    // App actions
    LOGIN_FAILURE: null,
    LOGIN_SUCCESS: null,
    GET_CURRENT_USER_SUCCESS: null,
    SET_TOKEN: null,
    SET_CURRENT_USER: null,
    SET_AUTHENTICATION: null,
    LOG_OUT: null,

    // Data Explorer page actions
    TOGGLE_ADD_FOLDER_MODAL: null,
    ADD_NEW_FOLDER: null,
    SET_FOLDER_MODAL_ERROR_MESSAGE: null,
    DELETE_FOLDER: null,
    TOGGLE_UPLOAD_FILE_MODAL: null,
    CLEAR_UPLOAD_FILES_CACHE: null,
    SET_UPLOAD_FILES_CACHE: null,

    // PTO page actions
    SET_PTO_APPLY_MODAL_STATE: null,
    SET_OVERTIME_APPLY_MODAL_STATE: null,
    FILTER_PTO_TABLE: null,
    SORT_PTO_TABLE_BY_CATEGORY: null,
    FETCH_PTO_APPLICATION_SUCCESS: null,
    FETCH_USERS_WITH_PTO_SUCCESS: null,
    RESET_PTO_TABLE: null,
    DECREASE_YEAR: null,
    INCREASE_YEAR: null,
    SORT_OVERTIME_TABLE_BY_CATEGORY: null,
    FETCH_OVERTIME_APPLICATION_SUCCESS: null,
    FILTER_OVERTIME_TABLE: null,
    FETCH_USERS_WITH_OVERTIME_SUCCESS: null,

    // Admin page actions
    FETCH_USERS_WITH_PRIVILEGE_SUCCESS: null,
    SET_USER_PRIVILGE: null,

    // Article actions
    FETCH_ARTICLE: null,
    FETCH_ARTICLE_SUCCESS: null,
    FETCH_ARTICLE_FAIL: null,
    CREATE_ARTICLE: null,
    CREATE_ARTICLE_SUCCESS: null,
    CREATE_ARTICLE_FAIL: null,
    UPDATE_ARTICLE: null,
    UPDATE_ARTICLE_SUCCESS: null,
    UPDATE_ARTICLE_FAIL: null,
    DELETE_ARTICLE: null,
    DELETE_ARTICLE_SUCCESS: null,
    DELETE_ARTICLE_FAIL: null,
    UPLOAD_ARTICLE_FILE: null,
    UPLOAD_ARTICLE_FILE_SUCCESS: null,
    UPLOAD_ARTICLE_FILE_FAIL: null,
    UPLOAD_ARTICLE_FILE_PROGRESS: null,
    REMOVE_ARTICLE_FILE: null,
    REMOVE_ARTICLE_FILE_SUCCESS: null,
    REMOVE_ARTICLE_FILE_FAIL: null,
    CLEAR_ARTICLE: null,
    CREATE_COMMENT: null,
    CREATE_COMMENT_SUCCESS: null,
    CREATE_COMMENT_FAIL: null,

    // Document page actions
    FETCH_ARTICLES: null,
    FETCH_ARTICLES_SUCCESS: null,
    FETCH_ARTICLES_FAIL: null,
    FETCH_ALL_CATEGORIES: null,
    FETCH_ALL_CATEGORIES_SUCCESS: null,
    FETCH_ALL_CATEGORIES_FAIL: null,
    FETCH_ALL_TAGS: null,
    FETCH_ALL_TAGS_SUCCESS: null,
    FETCH_ALL_TAGS_FAIL: null,

    // Feature analysis page actions
    CHANGE_ASSIGNMENT_CATEGORY_UPDATE_MSG_OPACITY: null,
    CHANGE_CATEGORY_WAIT_TO_UPDATE: null,
    FETCH_DIFFICULTIES_SUCCESS: null,
    FETCH_OWNERS_SUCCESS: null,
    UPDATE_ONE_ASSIGNMENT_CATEGORY_SUCCESS: null,
    UPDATE_ONE_ASSIGNMENT_CATEGORY: null,
    FETCH_ASSIGNMENT_CATEGORIES: null,
    FETCH_ASSIGNMENT_CATEGORIES_SUCCESS: null,
    FETCH_ASSIGNMENT_CATEGORIES_FAIL: null,
    SET_FORM_VISIBILITY: null,
    SET_CURRENT_LEAF_NODE: null,
    SET_CURRENT_TREE_SELECTED_USER: null,

    // Bug Analysis page actions
    FETCH_BUG_REVIEW_APPLICATION_SUCCESS: null,
    FETCH_BUG_REVIEW_CHANGE_OPTIONS_SUCCESS: null,
    FETCH_BUG_REVIEW_PREVENT_TAGS_OPTIONS: null,
    FETCH_BUG_REVIEW_ALL_USERS: null,
    FETCH_BUG_REVIEW_QUERY_DATA: null,
    FETCH_BUG_REVIEW_ADD_OPTIONS_SUCCESS: null,

    // Bug Report page actions
    FETCH_BUG_REPORT_ROOT_CAUSE_SUCCESS: null,
    FETCH_BUG_REPORT_TAGS_SUCCESS: null,
    FETCH_BUG_REPORT_OWNER_SUCCESS: null,
    FETCH_BUG_REPORT_OWNER_TOTAL_SUCCESS: null,
    SET_BUG_REPORT_PROJECT_VERSION: null,

    // Resource Map page actions
    FETCH_RESOURCE_MAP_DATA: null,
    FETCH_RESOURCE_MAP_MODAL: null,
    FETCH_RESOURCE_MAP_WORKLOG_UPSERT: null,
    FETCH_RESOURCE_MAP_ALL_USERS: null,
    FETCH_RESOURCE_MAP_WORKLOG_ADD_MULTI: null
});
