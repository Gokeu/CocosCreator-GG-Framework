export class UserInfo {

    arrGrid: string;

    arrWeapons: string;

    moneyCoin: number;

    moneyBrick: number;

    curLevel: number;

    weaponsBuyLevel: number;

    nailBuyLevel: number;

    curWeaponBuyLevelProgress: number;

    curNailBuyLevelProgress: number;

    constructor() {
        this.arrGrid = '';
        this.arrWeapons = '';

        this.moneyBrick = 0;
        this.moneyCoin = 0;

        this.curLevel = 1;

        this.nailBuyLevel = 1;
        this.weaponsBuyLevel = 1;

        this.curWeaponBuyLevelProgress = 0;
        this.curNailBuyLevelProgress = 0;


    }
}