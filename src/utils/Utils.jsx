export const JWT_TOKEN = 'jwtToken';

export const BODY_PROJECTS = 'BODY_PROJECTS';
export const BODY_TASKS = 'BODY_TASKS';
export const BODY_COMMENTS = 'BODY_COMMENTS';
export const BODY_DEFAULT = 'BODY_DEFAULT';
export const BODY_USERS = 'BODY_USERS';
export const BODY_PROFILE = 'BODY_PROFILE';

export const BODY_MY_PROJECTS = 'BODY_MY_PROJECTS';
export const BODY_MY_TASKS = 'BODY_MY_TASKS';
export const BODY_MY_COMMENTS = 'BODY_MY_COMMENTS';


export const PROJECTS_BODY_TABLE = 'PROJECTS_BODY_TABLE';
export const PROJECTS_BODY_ADD_EDIT = 'PROJECTS_BODY_ADD_EDIT';

export const LATEST_PROJECTS_COUNT = 4;
export const LATEST_TASKS_COUNT = 4;
export const LATEST_COMMENTS_COUNT = 4;

export const API_DOMAIN = (url) => {
    return 'http://localhost:8080/api/' + url;
};

//For auth and logout only
export const API_DOMAIN_AUTH_LOGOUT = (url) => {
    return 'http://localhost:8080/' + url;
};

export const isAdmin = (beautifyRoleName) => {
    console.log('role::', beautifyRoleName);
    if (beautifyRoleName === 'Admin') {
        return true;
    }else {
        return false;
    }
};

export const getProgressBackground = (progress) => {
    switch (true) {
        case(progress <= 25):
            return 'bg-danger';
        case(progress > 25 && progress <= 50):
            return 'bg-warning';
        case(progress > 50 && progress <= 75):
            return 'bg-info';
        case(progress > 75 && progress <= 99):
            return 'bg-primary';
        case(progress == 100):
            return 'bg-success';
        default:
            return 'bg-dark';
    }
}

export const getTaskStatusText = (status) => {
    switch (true) {
        case(status === 0):
            return 'In Progress';
        case(status === 1):
            return 'Completed';
        default:
            return 'In Progress';
    }
}

export const getEmptyProject = () => {
    return {
        id: 2,
        name: ' ',
        description: ' ',
        statistics: {
            completedTasks: 0,
            inProgressTasks: 0,
            closedTasks: 0,
            userProgress: []
        }
    };
}

export const fillTask = (title, description, assignedUsers) => {
    let assignedToUsersIds = [];
    assignedUsers.map( (user)=> {
        assignedToUsersIds.push(user.id);
    });

    return {
        title: title,
        description: description,
        progress: 0,
        status: 0,
        dateCreated: Date.now(),
        lastModefied: Date.now(),
        assignedToUsersIds: assignedToUsersIds
    };
}

export const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}