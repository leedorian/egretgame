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

	}
	public icon: egret.Bitmap;
	protected _zoomRate: number = 0.4;
	protected _bg: egret.Bitmap;
	protected _drawIcon() { }
	protected _getIconOffset(): any {}
	public getBaseWidth():number{
		return this._bg.width * this._zoomRate;
	}
}