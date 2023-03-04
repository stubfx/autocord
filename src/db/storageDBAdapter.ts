import {getGuild} from "./dbAdapter.js";
import {GuildStorage} from "../schemas/guildStorageSchema.js";

export async function setStorageValue(storageId: string, storageDataName: string, value: string) {
    await GuildStorage.findOneAndUpdate({_id: storageId}, {
        $set: {[`data.${storageDataName}`]: value}
    })
}

export async function addStorageData(guildId: string, storageDataName: string) {
    let guild = await getGuild(guildId)
    let storage = guild.storage
    await GuildStorage.findOneAndUpdate({_id: storage._id}, {
        [`data.${storageDataName}`]: ""
    })
    return true
}

export async function deleteStorageData(guildId: string, storageDataName: string) {
    let guild = await getGuild(guildId)
    let storage = guild.storage
    await GuildStorage.findOneAndUpdate({_id: storage._id}, {
        $unset : {[`data.${storageDataName}`]: ""}
    })
    return true
}