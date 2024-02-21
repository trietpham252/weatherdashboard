import { messaging } from "./fileBase";
import { getToken } from "firebase/messaging";

export const getFCMToken = () => {
    return Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            return getToken(messaging);
        } else {
            console.log("================================================================");
            console.log("permission", permission);
            console.log("================================================================");
        }
    });
};