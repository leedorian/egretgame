class MagicPurify extends MagicBase{
	public constructor() {
		super();
	}
	_drawIcon(){
		let icon:egret.Bitmap = Utils.createBitmapByName("purify_png");
		icon.scaleX = this._zoomRate;
		icon.scaleY = this._zoomRate;
		this.icon = icon;
		this.addChild(icon);
	}
	_getIconOffset(){
		return {
			offsetX: 3,
			offsetY: this.icon.height * this._zoomRate - 12
		};
	}
}