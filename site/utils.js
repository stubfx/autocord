export function getExposedArgumentsInJob(job) {
    let args = []
    for (let chainLink of job.chain.chainLinks) {
        if (chainLink.exposesArguments) {
            args.push(...chainLink.exposesArguments)
        }
    }
    return args
}