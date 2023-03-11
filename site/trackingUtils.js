import posthog from 'posthog-js'
import {isLocalhost} from "./utils.js";

export function initTracker() {
    posthog.init('phc_s55wiylScPcHVymsaH9BmF430nnhDoFKiq03GakkW0M', { api_host: 'https://eu.posthog.com' })
}

export function track(name, params) {
    if (!isLocalhost()) {
        posthog.capture(name, {params})
    }
}
