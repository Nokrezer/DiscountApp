import { databaseName } from "@/configs/database-config";
import * as SQLite from 'expo-sqlite';

class CardDatabase{
    private connectPromise : Promise<SQLite.SQLiteDatabase> | null;

    constructor(){
        this.connectPromise = null;
    }

    async connect(){
        if(!this.connectPromise)//Если подключения не было/нету
            this.connectPromise = (async () => {
                const db = await SQLite.openDatabaseAsync(databaseName);
                await db.execAsync(`CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY NOT NULL,
                    name TEXT NOT NULL DEFAULT 'Скидочная карта', code_data TEXT NOT NULL, code_type VARCHAR(7) NOT NULL, color VARCHAR(7),
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)
                    `);
                return db;
            })();

        return await this.connectPromise;
    }

    async getAllCards():Promise<Array<Record<string, any>>>{
        const db = await this.connect();
        return await db.getAllAsync(`SELECT name, id, color FROM cards`);
    }

    async getCard(id : number){
        const db = await this.connect();
        const card = await db.getFirstAsync<Record<'name' | 'code_type', any>>(`SELECT * FROM cards WHERE id = ?`, [id]);
        return card as Record<'name' | 'code_type', any>;
    }

    async addCard(name : string|null, code_data:string, code_type:string, color?:string|null){
        const db = await this.connect();
        await db.runAsync(`INSERT INTO cards (name, code_data, code_type, color) VALUES (?, ?, ?, ?)`,
                                [name ?? null, code_data, code_type, color ?? null]);
    }

    async deleteAll(){// FOR DEV
        const db = await this.connect();
        await db.execAsync("DELETE FROM cards");
    }

    async deleteCard(id: number){
        const db = await this.connect();
        await db.execAsync(`DELETE FROM cards WHERE id = ${id}`);
    }
}

export const cardDatabase = new CardDatabase();