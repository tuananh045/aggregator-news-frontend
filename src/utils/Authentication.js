class Authentication {

    // eslint-disable-next-line
    constructor() {

    }

    isAuthentication() {
        const token = sessionStorage.getItem('token');
        return token;
    }

}

const authentication = new Authentication();
export { authentication };
