class MagicFreeze extends MagicBase{
	public constructor() {
		super();
		this.setQty(Service.MAGIC_CONFIG.freeze.qty);
	}
	_drawIcon(){
		let icon:egret.Bitmap = Utils.createBitmapByName("freeze_png");
		icon.scaleX = this._zoomRate;
		icon.scaleY = this._zoomRate;
		this.icon = icon;
		this.addChild(icon);
	}
	_getIconOffset(){
		return {
			offsetX: 30,
			offsetY: this.icon.height * this._zoomRate - 40
		};
	}
	disable(){
		super.disable();
		this.icon.texture = RES.getRes("freeze_disabled_png");
	}
	enable(){
		super.enable();
		this.icon.texture = RES.getRes("freeze_png");
	}
}