
// 这个工具包提供了一个IndexedDBHelper类，通过构造函数传入数据库名、版本号和对象仓库名。然后提供了四个方法分别对应增（add）、删（delete）、改（put）和查（get、getAll）操作。
// put(item)：更新或添加一个数据项，如果数据项的键已经存在，则更新该键对应的值；否则，插入新的数据项。
// delete(id)：根据给定的ID删除存储中的数据项。
// get(id)：根据给定的ID获取存储中的数据项。
// getAll()：获取存储中的所有数据项。

export class IndexedDBHelper {
    constructor(dbName, version = 1, storeName = 'defaultStore') {
        this.dbName = dbName;
        this.version = version;
        this.storeName = storeName;
        this.dbPromise = new Promise((resolve, reject) => {
            let request = window.indexedDB.open(this.dbName, this.version);
            request.onerror = () => reject(request.error);
            request.onsuccess = (event) => resolve(event.target.result);
            request.onupgradeneeded = (event) => {
                let db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    let store = db.createObjectStore(this.storeName, { keyPath: 'id' });
                    // 创建名为 'name' 的索引，基于 'name' 字段
                    store.createIndex('name', 'name', { unique: true /* 或 true，取决于是否要求唯一 */ });
                }
            };
        });
    }

    /**
     * @description: 添加一个新的数据项。
     * @param {*} item
     * @return {*}
     */    
    async add(item) {
        let db = await this.dbPromise;
        let transaction = db.transaction([this.storeName], 'readwrite');
        let store = transaction.objectStore(this.storeName);
        let request = store.add(item);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async put(item) {
        let db = await this.dbPromise;
        let transaction = db.transaction([this.storeName], 'readwrite');
        let store = transaction.objectStore(this.storeName);
        let request = store.put(item);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    /**
     * @description: 删除单个项目
     * @param {*} id
     * @return {*}
     */    
    async delete(id) {
        let db = await this.dbPromise;
        let transaction = db.transaction([this.storeName], 'readwrite');
        let store = transaction.objectStore(this.storeName);
        let request = store.delete(id);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
    /**
     * @description: 删除全部数据
     * @return {*}
     */    
    async deleteAll() {
        let db = await this.dbPromise;
        let transaction = db.transaction([this.storeName], 'readwrite');
        let store = transaction.objectStore(this.storeName);
        // 开启游标遍历所有记录
        let cursorRequest = store.openCursor();
        return new Promise((resolve, reject) => {
            cursorRequest.onsuccess = (event) => {
                let cursor = event.target.result;
                if (cursor) {
                    // 删除当前记录并移动到下一个
                    let request = cursor.delete();
                    request.onsuccess = () => cursor.continue();
                    request.onerror = () => reject(request.error);
                } else {
                    // 当没有更多记录时，视为完成
                    resolve();
                }
            };
            cursorRequest.onerror = () => reject(cursorRequest.error);
        });
    }

    /**
     * @description: 精确搜索
     * @param {*} indexName
     * @param {*} indexedValue
     * @return {*}
     */    
    async get(indexName, indexedValue) {
        let db = await this.dbPromise;
        let transaction = db.transaction([this.storeName], 'readonly');
        let store = transaction.objectStore(this.storeName);
        console.log(indexName, indexedValue)
        let index = store.index(indexName); // 使用指定的索引名获取索引
        // 根据索引值发起查询请求
        let request = index.get(indexedValue);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * @description: 模糊搜索
     * @param {*} searchTerm
     * @return {*}
     */    
    async fuzzySearch(searchTerm) {
        let allItems = await this.getAll(); // 获取所有数据
        let results = allItems.filter(item => {
            // 假设我们要在名为 'name' 的字段上进行模糊搜索
            return item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        return results; // 返回匹配项数组
    }
    
    /**
     * @description: 获取全部数据
     * @return {*}
     */    
    async getAll() {
        let db = await this.dbPromise;
        let transaction = db.transaction([this.storeName], 'readonly');
        let store = transaction.objectStore(this.storeName);
        let result = [];
        let cursor = store.openCursor();
        return new Promise((resolve, reject) => {
            cursor.onsuccess = (event) => {
                let current = event.target.result;
                if (current) {
                    result.push(current.value);
                    current.continue();
                } else {
                    resolve(result);
                }
            };
            cursor.onerror = () => reject(cursor.error);
        });
    }
}