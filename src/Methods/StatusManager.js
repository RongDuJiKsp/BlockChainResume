const StatusManager = {
    ChangeStateOfArray: function (setStateFunc, indexOfChange, valueOf) {
        if(typeof setStateFunc!=="function") return;
        setStateFunc((oldArr) => {
            let res = [...oldArr];
            res[indexOfChange] = valueOf;
            return res;
        })
    }
}
export default StatusManager;