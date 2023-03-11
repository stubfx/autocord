import {PAGES} from "./src/pages.js";
import {track} from "./trackingUtils.js";

export async function discordPopup(url) {
    let params = `status=no,location=no,toolbar=no,menubar=no,width=500,height=900,left=-1000,top=-1000`;
    let discordPopup = open(url, PAGES.AUTOCORD_POPUP, params);
    if (!discordPopup) {
        track('Popup blocked')
        alert('Please make sure popups are not blocked.')
    }
    return new Promise((resolve) => {
        let intId = setInterval(async () => {
            try{
                if (discordPopup.closed || discordPopup.location.pathname.includes('popup')) {
                    if (!discordPopup.closed) {
                        discordPopup.close()
                    }
                    clearInterval(intId)
                    resolve(true)
                }
            } catch (e) {
                // ok, do nothing
                track('Popup error', e)
            }
        }, 200)
    })
}