export function getExposedArgumentsInJob(job, storage) {
    let args = []
    for (let chainLink of job.chain.chainLinks) {
        if (chainLink.exposesArguments) {
            args.push(...chainLink.exposesArguments)
        }
    }
    if (storage && storage.data) {
        args.push(...Object.keys(storage.data))
    }
    return args
}

export function isLocalhost(){
    return location.hostname === "localhost" || location.hostname === "127.0.0.1"
}