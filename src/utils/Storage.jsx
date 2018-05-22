//Using as a central for storage//it will be easy to change storage later
export const saveEntry = (key, value) =>{
    localStorage.setItem(key,value);
};

export const getEntry = (key) =>{
    return localStorage.getItem(key);
}

