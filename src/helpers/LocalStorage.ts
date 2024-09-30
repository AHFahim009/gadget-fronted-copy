

export const doSaveAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
};

export const doRemoveAccessToken = () => {
    localStorage.removeItem('accessToken');
};

export const hasAccessToken = () => {
    if (window === undefined) {
        return null
    }
    return localStorage.getItem('accessToken') || null;
};



