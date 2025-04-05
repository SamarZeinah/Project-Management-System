
// USERS_URLS
export const USERS_URLS={
    LOGIN:`/Users/Login`,
    REGISTER:`/Users/Register`,
    CREATE_MANAGER:`/Users/Create`,
    GET_USER:(id:number)=>`/Users/${id}`,
    ACTIVE_EMPLOYEE:(id:number)=>`/Users/${id}`,
    GET_USERS_COUNT:`/Users/count`,
    GET_USERS:`/Users/Manager`,
    VERIFY_USER:`/Users/verify`,
    GET_CURRENT_USER:`/Users/currentUser`,
    GIT_FILTER_LOGGED_USER:`/Users/`,
    UPDATE_PROFILE:`/Users/`,
    UPDATE_USER_PASSWORD:`/Users/ChangePassword`,
    Request_RESET_PASSWORD:`/Users/Reset/Request`,
    RESET_PASSWORD:`/Users/Reset`,

    
}
//tasks count
export const TASK_Count={
    GET_TASKS_COUNT:'/Task/count'
}


// TASKS_URLS
export const TASKS_URLS = {
    CREATE_TASK:`/Task`,
    GET_ALL_MY_TASKS:`/Task`,
    GET_ALL_MY_TASKS_FOR_MANAGER:`/Task/manager`,
    GET_TASK_BY_ID:(id:number)=>`/Task/${id}`,
    UPDATE_TASK:(id:number)=>`/Task/${id}`,
    DELETE_TASK:(id:number)=>`/Task/${id}`,
    COUNT_TASKS_FOR_MANAGER_EMPLOYEE:`/Task/count`,
    CHANGE_TASK_STATUS_BY_EMPLOYEE:(id:number)=>`/Task/${id}/change-status`,
    GET_TASKS_BY_PROJECT:(id:number)=>`/Task/project/${id}`,
}
