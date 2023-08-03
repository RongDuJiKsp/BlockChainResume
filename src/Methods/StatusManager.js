const StatusManager = {
    ChangeStateOfArray: function (setStateFunc, indexOfChange, valueOf) {
        setStateFunc((oldArr) => {
            let res = [...oldArr];
            res[indexOfChange] = valueOf;
            return res;
        })
    }
}
export default StatusManager;