module.exports = class SequenceHelper {
    constructor(options) {
        this.db = options.db;
        this.sequence = options.sequence;
        this.table = options.table;
        this.field = options.field || "ID";
    }

    async getNextNumber() {
        switch (this.db.kind) {
            case "hana":
                try {
                    const result = await this.db.run(`SELECT "${this.sequence}".NEXTVAL FROM DUMMY`);
                    return result[0][`${this.sequence}.NEXTVAL`];
                } catch (error) {
                    throw new Error(`Failed to get next sequence value: ${error.message}`);
                }
            case "sql":
            case "sqlite":
                try {
                    const result = await this.db.run(`SELECT IFNULL(MAX("${this.field}"), 2000000500) + 1 AS nextId FROM "${this.table}"`);
                    return parseInt(result[0].nextId);
                } catch (error) {
                    throw new Error(`Failed to get next sequence value: ${error.message}`);
                }
            default:
                throw new Error(`Unsupported DB kind: ${this.db.kind}`);
        }
    }
};