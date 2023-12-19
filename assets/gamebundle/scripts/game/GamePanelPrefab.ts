import { LoadingPanelShowArgs } from "../../../commonbundle/scripts/popwindow/LoadingPanelPrefab";
import { ToastPanelShowArgs } from "../../../commonbundle/scripts/popwindow/ToastPanelPrefab";
import { PanelConfigs } from "../../../mainbundle/scripts/configs/PanelConfigs";
import { gg } from "../../../scripts/framework/gg";
import { PanelComponent, PanelHideOption, PanelShowOption } from "../../../scripts/framework/lib/router/PanelComponent";
import Mining from "./Mining";
import Monster from "./Monster";

const { ccclass, property } = cc._decorator;

/**
 * 游戏主面板
 *
 * @author caizhitao
 * @created 2020-12-07 21:50:39
 */
@ccclass
export default class GamePanelPrefab extends PanelComponent {
    @property(cc.Node)
    coinBg: cc.Node = null;

    @property(cc.Node)
    brickBg: cc.Node = null;

    @property(cc.Node)
    deleteNode: cc.Node = null;

    @property(cc.Node)
    buyBtn: cc.Node = null;

    @property(cc.Node)
    autoSynBtn: cc.Node = null;

    @property(cc.Node)
    changeViewBtn: cc.Node = null;

    @property(cc.Node)
    UITexts: cc.Node = null;

    @property(cc.Node)
    nailDownBtn: cc.Node = null;

    @property(Monster)
    monster: Monster = null;

    @property(Mining)
    mining: Mining = null;

    curView: ViewEnum = ViewEnum.Mining;

    protected onLoad(): void {
        this.curView = ViewEnum.Mining;
    }

    protected start(): void {
        this.updateInfo();
        this.initData()
        this.initView();
    }

    initData() {
        this.mining.initData();
        this.monster.initData();
    }

    initView() {
        this.monster.initView();
        this.mining.initView();
    }

    show(option: PanelShowOption): void {
        option.onShowed();
        //     // 默认播放loading动画
        //     this._playPanelShowAnim(() => {
        //         option.onShowed();
        //     });
    }

    hide(option: PanelHideOption): void {
        option.onHided();
        // this._playPanelHideAnim(() => {
        //     option.onHided();
        // });
    }


    onNailDownBtnClick() {

    }

    onBuyBtnClick() {

    }

    autoSynBtnClick() {

    }

    onChangeViewBtnClick() {
        let miningChanged = this.curView === ViewEnum.Mining ? -1 : 1;
        let tween = cc.tween().to(2, { x: 750 * miningChanged })
        cc.tween(this.mining.node).then(tween).start();
        cc.tween(this.monster.node).then(tween).start();
    }


    updateInfo() {

    }



}
