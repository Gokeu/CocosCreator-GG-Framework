import { gg } from "../../../scripts/framework/gg";
import { GameConfig } from "../game/GameConfig";
import { UserInfo } from "./UserInfo";

export default class UserMgr {
    private static _instance: UserMgr = null;
    private constructor() { }
    public static get inst() {
        if (!this._instance) {
            this._instance = new UserMgr();
        }
        return this._instance;
    }

    userInfo: UserInfo = null;

    public init(callback: Function) {
        let self = UserMgr.inst;
        let userInfo = JSON.parse(gg.storage.getItem(GameConfig.CacheKey));
        if (userInfo) {
            for (const key in self.userInfo) {
                let isKey = this.checkObj(key, userInfo);
                if (!isKey) {
                    userInfo[key] = self.userInfo[key];
                }
            }
            self.userInfo = userInfo;
        } else {
            gg.storage.setItem(GameConfig.CacheKey, JSON.stringify(self.userInfo));
        }

        setInterval(self.autoSave, 1000);
        callback && callback();
    }

    checkObj(key: string, data: any): boolean {
        for (let dataKey of data) {
            if (key === dataKey) {
                return true;
            }
        }
        return false;
    }

    autoSave() {
        cc.sys.localStorage.setItem(GameConfig.CacheKey, JSON.stringify(UserMgr.inst.userInfo));
    }

    clearData() {
        gg.storage.removeItem(GameConfig.CacheKey);
        gg.storage.clear();
        cc.game.end();
    }

    getGridArr(): Array<number> {
        if (UserMgr.inst.userInfo.arrGrid === '') {
            let arrGrid = []
            for (let i = 0; i < 10; i++) {
                arrGrid.push(-1)
            }
            arrGrid[2] = 0
            UserMgr.inst.userInfo.arrGrid = JSON.stringify(arrGrid);
        }
        return JSON.parse(UserMgr.inst.userInfo.arrGrid);
    }
}