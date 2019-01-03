namespace UIComponents {
    export class DefaultButton extends egret.DisplayObjectContainer {
        constructor(w:number, h:number, label:string) {
            super();
            this.width = w;
            this.height = h;
            this._label = label;
            this.touchEnabled = true;
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this._onAddToStage,this);
        }

        private _label:string;

        private _onAddToStage(){
            const btnImage:egret.Bitmap = new egret.Bitmap();
            btnImage.texture = RES.getRes("buttonBg_png");
            const rect:egret.Rectangle = new egret.Rectangle(30,35,196,33);
            btnImage.scale9Grid =rect;
            btnImage.width = this.width;
            btnImage.height = this.height;
            this.addChild(btnImage);

            const label:egret.TextField = new egret.TextField();
            label.width = this.width;
            label.height = this.height;
            label.textColor = TextColors.defaultButtonLable;
            label.textAlign = egret.HorizontalAlign.CENTER;
            label.verticalAlign = egret.VerticalAlign.MIDDLE;
            label.text = this._label;
            label.bold = true;
            this.addChild( label );
        }
    }


}
