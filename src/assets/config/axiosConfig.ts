

const AxiosConfig = {
    methods: {
        testMethods() {

        },
    },
};
const errorHandler = {
    methods: {
        getError(error: any) {

        },
        postError(error: any) {

        },
    },
};
const AxiosMixin = {
    methods: {
        AxiosGet(url = '', result: any, params = {}) {
            const getCookie = document.cookie.split(';');
            let CSRFTOKEN = '';
            getCookie.forEach((item) => {
                if (item.indexOf('csrf-secure') !== -1) {
                    CSRFTOKEN = item.split('csrf-secure=')[1];
                }
            });
            (this as any).$http.defaults.headers.common['X-CSRF-TOKEN'] = CSRFTOKEN;
            (this as any).$http.get(url, { params }).then((response: any) => {
                result(response);
            });
        },
        AxiosPost(url = '', form = {}, result: any) {
            const getCookie = document.cookie.split(';');
            let CSRFTOKEN = '';
            getCookie.forEach((item) => {
                if (item.indexOf('csrf-secure') !== -1) {
                    CSRFTOKEN = item.split('csrf-secure=')[1];
                }
            });
            (this as any).$http.post(url, form, {
                headers: {
                    // RequestVerificationToken: "14a1347f412b39f",
                    'X-CSRF-TOKEN': CSRFTOKEN,
                },
            }).then((response: any) => {
                result(response);
            }).catch((error: any) => {
                // result(error);
                (this as any).postError(error);
            });
        },
    },
};
export { AxiosConfig, AxiosMixin, errorHandler };
