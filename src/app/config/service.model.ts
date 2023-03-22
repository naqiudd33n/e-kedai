export interface IAppConfig {
    env: {
        name                : string;
    };
    apiServer: {
        ekedaiService     : string;
        paymentService      : string;
    };
    deliverinUrl            : string;
    logging                 : number;
}
