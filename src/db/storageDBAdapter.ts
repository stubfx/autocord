import {getGuild} from "./dbAdapter.js";
import {GuildStorage} from "../schemas/guildStorageSchema.js";
import {StorageParamType} from "../../site/src/ParamTypes.js";

export async function setStorageValue(storageId: string, storageDataName: string, value: string) {
    if (typeof value === "undefined") {
        new Error('value cannot be undefined')
    }
    if (typeof value === "string" && value.length > 150) {
        throw Error('Value cannot be longer than 150 chars')
    }
    if (typeof value === "string" && value.length > 150) {
        throw Error('Value cannot be longer than 150 chars')
    }
    return await _setStorageValue(storageId, storageDataName, value)
}

export async function addStorageData(guildId: string, storageDataName: string, type: string) {
    let value = undefined
    switch (type) {
        case StorageParamType.NUMBER:
            value = 0
            break
        case StorageParamType.STRING:
            value = ''
            break
        case StorageParamType.LIST:
            value = []
            break
        default:
            new Error(`Unknown type ${type}`)
    }
    return await _addStorageData(guildId, storageDataName, type, value)
}

export async function deleteStorageData(guildId: string, storageDataName: string) {
    return await _deleteStorageData(guildId, storageDataName)
}





/////////////////////////////////////////////////////
//////////// ACTUAL DB INTERACTION BELOW ////////////
/////////////////////////////////////////////////////

async function _setStorageValue(storageId: string, storageDataName: string, value: string) {
    await GuildStorage.findOneAndUpdate({_id: storageId}, {
        $set: {[`data.${storageDataName}.value`]: value}
    })
}

async function _addStorageData(guildId: string, storageDataName: string, type: string, value: any) {
    let guild = await getGuild(guildId)
    let storage = guild.storage
    await GuildStorage.findOneAndUpdate({_id: storage._id}, {
        [`data.${storageDataName}`]: {type: type, value: value}
    })
    return true
}

async function _deleteStorageData(guildId: string, storageDataName: string) {
    let guild = await getGuild(guildId)
    let storage = guild.storage
    await GuildStorage.findOneAndUpdate({_id: storage._id}, {
        $unset : {[`data.${storageDataName}`]: ""}
    })
    return true
}