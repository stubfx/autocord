export interface ChainLinkInterface {
    type: "CONDITION" | "TASK"
    params: Array<string>
    name: string
}