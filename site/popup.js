import {PAGES} from "./src/pages.js";

export async function openPopup(url) {
    let params = `status=no,location=no,toolbar=no,menubar=no,width=500,height=900,left=-1000,top=-1000`;
    let loginPopup = open(url, PAGES.AUTOCORD_POPUP, params);
    return new Promise((resolve) => {
        let intId = setInterval(async () => {
            try{
                if (loginPopup.closed || loginPopup.location.pathname.includes('close')) {
                    if (!loginPopup.closed) {
                        loginPopup.close()
                    }
                    clearInterval(intId)
                    resolve(true)
                }
            } catch (e) {
                // ok, do nothing
            }
        }, 200)
    })
}