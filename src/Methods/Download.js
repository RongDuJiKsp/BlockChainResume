import {ConfigEnum} from "../Data/enums";

export default function Download(file, name, type) {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = "" + name + ConfigEnum.FileType[type];
    console.log("" + name + ConfigEnum.FileType[type])
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
}
