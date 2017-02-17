const config = {
    development: {
        api: 'https://api.crossdeck.navy/v1', // main api endpoint

        auth: 'https://auth.crossdeck.navy/v1/oauth', // main auth endpoint

        url: 'https://necc.crossdeck.navy', // url to be used in link generation

        database: { // postgres connection settings
            host: '',
            port: 5432,
            database: '',
            user: '',
            password: ''
        },

        client: {
            name: 'crossdeck-navy',
            email: 'admin@crossdeck.navy'
        },

        server: { //server details
            host: '127.0.0.1',
            port: '4321'
        }
    },
    production: {
        api: 'https://api.crossdeck.navy/v1', // main api endpoint

        auth: 'https://auth.crossdeck.navy/v1/oauth', // main auth endpoint

        url: 'https://necc.crossdeck.navy', // url to be used in link generation

        database: {  // postgres connection settings
            host: '',
            port: 5432,
            database: '',
            user: '',
            password: ''
        },

        client: {
            name: 'crossdeck-navy',
            email: 'admin@crossdeck.navy'
        },

        server: { //server details
            host: '127.0.0.1',
            port: '4321'
        }
    }
};

export { config };
