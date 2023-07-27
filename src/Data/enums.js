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
}
export const ConfigEnum = {
    MinPasswordLength: 6,
    DefaultDownloadPath: "C:\\"
}
export const ETHKeyEnum = {
    keys: [
        "114515",
        "1919810",
        "1","2","3","5","66","999","489","edf","oo"
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