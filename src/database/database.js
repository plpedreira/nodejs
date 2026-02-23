import fs from "node:fs/promises"

const DATABASE_PATH = new URL("db.jason", import.meta.url)
export class Database {
    #database = {}

    constructor() {
        fs.readFile(DATABASE_PATH, "utf-8")
        .then((data) => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
    }

    insert (tabele, data) {
    if(Array.isArray(this.#database[tabele])){
        this.#database[tabele].push(data)
    } else {
        this.#database[tabele] = [data]
    }

    this.#persist()
    
 }
}
