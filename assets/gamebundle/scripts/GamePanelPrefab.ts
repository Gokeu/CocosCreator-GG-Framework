import { Panels } from "../../mainbundle/scripts/configs/Panels";
import { gg } from "../../scripts/framework/gg";
import { PanelComponent, PanelHideOption, PanelShowOption } from "../../scripts/framework/lib/router/PanelComponent";
import { LoadingPanelShowArgs } from "./popwindow/LoadingPanelPrefab";
import { ToastPanelShowArgs } from "./popwindow/ToastPanelPrefab";

const { ccclass, property } = cc._decorator;

/**
 * @author caizhitao
 * @created 2020-12-07 21:50:39
 */
@ccclass
export default class GamePanelPrefab extends PanelComponent {
    // @property(cc.Node)
    // bgNode: cc.Node = null;

    // @property(cc.Node)
    // loadingSpriteNode: cc.Node = null;

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

    onShowToastPanelBtnClick() {
        //   // 提前加载 Pop 弹窗面板
        //   await gg.panelRouter.loadAsync(Panels.loadingPanel);
        //   await gg.panelRouter.loadAsync(Panels.toastPanel);
        gg.panelRouter.show({
            panelConfig: Panels.toastPanel,
            data: <ToastPanelShowArgs>{
                text: "短Toast测试",
            },
        });
    }

    onShowLoadingPanelBtnClick() {
        // 打开面板弹窗
        gg.panelRouter.show({
            panelConfig: Panels.loadingPanel,
            data: <LoadingPanelShowArgs>{
                playShowAnim: true,
            },
            onShowed: () => {
                cc.log("展示完毕");
            },
        });
    }
}
