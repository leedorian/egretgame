class MagicQuell extends MagicBase{
	public constructor() {
		super();
		this.setQty(Service.MAGIC_CONFIG.quell.qty);
	}
	_drawIcon(){
		let icon:egret.Bitmap = Utils.createBitmapByName("skull_png");
		icon.scaleX = this._zoomRate;
		icon.scaleY = this._zoomRate;
		this.icon = icon;
		this.addChild(icon);
	}
	_getIconOffset(){
		return {
			offsetX: 3,
			offsetY: this.icon.height * this._zoomRate - 30
		};
	}
	disable(){
		super.disable();
		this.icon.texture = RES.getRes("skull_disabled_png");
	}
	enable(){
		super.enable();
		this.icon.texture = RES.getRes("skull_png");
	}
}