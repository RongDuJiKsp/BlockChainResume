export const ValidateStatusEnum = {
    success: "success",
    warning: "warning",
    validating: "validating",
    error: "error"
}
export const LoginStateEnum = {
    none: "none",
    root: "root",
    employer: "employer",
    employee: "employee",
    register: "register",
    finder:"finder"
}
export const ConfigEnum = {
    FrontEndPort:"3000",
    BackendPort:"8080",
    IPFSSystemPort:"5001",
    MinPasswordLength: 6,
    SupposedFileType: "application/pdf",
    FileType: {
        "application/pdf": ".pdf",
        "text/key":".key"
    }
}
export const ETHKeyEnum = {
    keys: [
        "114515",
        "1919810",
        "1", "2", "3", "5", "66", "999", "489", "edf", "oo"
    ],
    keyNum: 10,
    nowKey: 0,
    addKey: function () {
        let tmp = this.nowKey;
        this.nowKey = (this.nowKey + 1) % this.keyNum;
        return tmp;
    },
    getKey: function () {
        return this.keys[this.addKey()];
    }
}