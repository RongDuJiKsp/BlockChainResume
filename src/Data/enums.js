export const ValidateStatusEnum = {
    success: "success",
    warning: "warning",
    validating: "validating",
    error: "error"
}
export const LoginStateEnum = {
    none: "none",
    root: "ca",
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
        "text/key":".key",
        "text/plain":".txt"
    }
}
export const ETHKeyEnum = {
    keys: [
        "0xd677e3fa7a85e1001cbe23e520b0d7df4d0ea6282aca91262abea37e11467905",
        "0x40e386413e3b0dcf998aec42664d02888304f312eb3eb8344d79cfb885d950a9",
        "0xe5196789a665724c1e3f4ed5a46719a7ee953480592dbcc28e0b1fb8c429b569",
        "0xfedd536bffd5fb44ef8e4fb9e4273aa3b467b7496823d92cf6f5adf46b4d39b3",
    ],
    keyNum: 4,
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