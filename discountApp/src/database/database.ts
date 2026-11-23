import { databaseName } from "@/configs/database-config";
import { fullCardData, minCardData } from "@/constants/types";
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
                    logo_domen TEXT, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)
                    `);
                return db;
            })();

        return await this.connectPromise;
    }

    async getAllCards():Promise<Array<minCardData>>{
        const db = await this.connect();
        return await db.getAllAsync(`SELECT name, id, color, logo_domen FROM cards`);
    }

    async getCard(id : number){
        const db = await this.connect();
        const card = await db.getFirstAsync<fullCardData>(`SELECT * FROM cards WHERE id = ?`, [id]);
        return card as fullCardData;
    }

    async addCard(name : string, code_data:string, code_type:string, color:string, logo_domen?:string|null){
        const db = await this.connect();
        const result = await db.runAsync(`INSERT INTO cards (name, code_data, code_type, color, logo_domen) VALUES (?, ?, ?, ?, ?)`,
                                [name, code_data, code_type, color, logo_domen ?? '']);

        return result;
    }

    async deleteDB(){
        await SQLite.deleteDatabaseAsync(databaseName);
    }

    async deleteAll(){// FOR DEV
        const db = await this.connect();
        await db.execAsync("DELETE FROM cards");
    }

    async deleteCard(id: number){
        const db = await this.connect();
        await db.execAsync(`DELETE FROM cards WHERE id = ${id}`);
    }

    async editCard(id:number, name:string, color:string, logo_domen?:string|null){
        const db = await this.connect();
        await db.runAsync(`UPDATE cards
                           SET name = ?, color = ?, logo_domen = ?
                           WHERE id = ?`, [name, color, logo_domen ?? "", id]);
    }
}

export const cardDatabase = new CardDatabase();