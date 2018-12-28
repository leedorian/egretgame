class Utils{
    private static _blockWidth:number = 0;
    private static _blockHeight:number = 0;
    private static _stageHeight:number = 0;
    private static _stageWidth:number = 0;
    public static rowsState:Array<Array<number>> = [];
    public static rows:number = 6;
    public static columns:number = 6;
    public static getBlockWidth():number{
        if(Utils._blockWidth === 0){
            Utils._blockWidth = egret.MainContext.instance.stage.stageWidth / this.columns;
        }
        return Utils._blockWidth;
    }
    public static getBlockHeight():number{
        if(Utils._blockHeight === 0){
            Utils._blockHeight = Math.ceil(egret.MainContext.instance.stage.stageHeight / this.rows);
        }
        return Utils._blockHeight;
    }
    public static getStageWidth():number{
        if(Utils._stageWidth === 0){
            Utils._stageWidth = egret.MainContext.instance.stage.stageWidth;
        }
        return Utils._stageWidth;
    }
    public static getStageHeight():number{
        if(Utils._stageHeight === 0){
            Utils._stageHeight = egret.MainContext.instance.stage.stageHeight;
        }
        return Utils._stageHeight;
    }
    public static getRowBlockState(rowIndex:number){
        if(Utils.rowsState[rowIndex] === undefined){
            let rowState:Array<number> = [];
            let clickableColmun:number = Math.floor(Math.random() * Utils.columns);
            for(let i = 0; i < Utils.columns; i++){
                if(i === clickableColmun){
                    rowState.push(BlockState.clickable);
                }else{
                    rowState.push(BlockState.unclickable);
                }
            }

            Utils.rowsState.push(rowState);
            return rowState;
        }
        return Utils.rowsState[rowIndex];
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
