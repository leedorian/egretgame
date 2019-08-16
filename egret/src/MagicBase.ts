class MagicBase extends egret.Sprite {
	public constructor() {
		super();

		let bg: egret.Bitmap = Utils.createBitmapByName("rock_bg_png");
		bg.scaleX = this._zoomRate;
		bg.scaleY = this._zoomRate;
		this._bg = bg;
		this._drawIcon();
		let iconSize = this._getIconOffset();
		this.icon.x = -iconSize.offsetX;
		bg.y = iconSize.offsetY;
		this.addChildAt(bg, 0);
		this.touchEnabled = true;
		
		let unreadbg: egret.Bitmap = Utils.createBitmapByName("unread_png");
		unreadbg.scaleX = this._zoomRate;
		unreadbg.scaleY = this._zoomRate;
		this.addChild(unreadbg);
		unreadbg.x = bg.x + bg.width - 25;
		unreadbg.y = bg.y + bg.height - 40;
		this._qtyLabel = new eui.Label();
		this._qtyLabel.width = 34;
		this._qtyLabel.textAlign = egret.HorizontalAlign.CENTER;
		this._qtyLabel.x = bg.x + bg.width - 25;
		this._qtyLabel.y = bg.y + bg.height - 35;
		this._qtyLabel.text = "0";
		this.addChild(this._qtyLabel);
	}
	public icon: egret.Bitmap;
	public qty: number = 0;
	private _qtyLabel: eui.Label;
	protected _zoomRate: number = 1;
	protected _bg: egret.Bitmap;
	protected _drawIcon() { }
	protected _getIconOffset(): any {}
	protected enable() { 
		this.touchEnabled = true;
	}
	protected disable() { 
		this.touchEnabled = false;
	}
	public getBaseWidth():number{
		return this._bg.width * this._zoomRate;
	}
	public setQty(qty){
		this.qty = qty;
		this._qtyLabel.text = qty.toString();
		let magicActive = this.parent? this.parent['magicActive'] : false;
		if(qty == 0){
			this.disable();
		}else if(!magicActive){
			this.enable();
		}
	}
}