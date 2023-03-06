// Remember to set type: module in package.json or use .mjs extension
import {join, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

import * as lowdb from "lowdb";
// @ts-ignore
import {JSONFile} from "lowdb/node";


// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const guildsFile = join(__dirname, 'localDB.json')

// Configure lowdb to write to JSONFile
// const adapter = new JSONFile(file)

declare type LocalData = {
    clock: {
        everyHour: Date
        everyDay: Date
        random: Date
    }
}

const localDB = new lowdb.Low<LocalData>(new JSONFile(guildsFile))

// Read data from JSON file, this will set db.data content
await localDB.read()
if (!localDB.data) {
    localDB.data = {
        clock: {
            everyHour: new Date(),
            everyDay: new Date(),
            random: new Date()
        }
    }
    await localDB.write()
}

export default localDB