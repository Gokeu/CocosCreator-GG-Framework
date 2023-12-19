
import { BundleConfigs } from "../../../mainbundle/scripts/configs/BundleConfigs";
import BundleLoader from "../../../scripts/framework/lib/asset/BundleLoader";
import UserMgr from "../user/UserMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Mining extends cc.Component {

    initData() {

    }


    initView() {

    }


    async createGrid() {
        let count = UserMgr.inst.getGridArr().length;
        let col = Math.floor(count / 5);
        for (let i = 0; i < count; i++) {
            let row = Math.floor(i / 5);
            let grid = await BundleLoader.load(BundleConfigs.GameBundle, 'gameItem/', cc.Prefab);

        }
    }
}