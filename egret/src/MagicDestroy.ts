class MagicDestroy extends MagicBase{
	public constructor() {
		super();
		this.setQty(Service.MAGIC_CONFIG.destroy.qty);
	}
	_drawIcon(){
		let icon:egret.Bitmap = Utils.createBitmapByName("nuke_png");
		icon.scaleX = this._zoomRate;
		icon.scaleY = this._zoomRate;
		this.icon = icon;
		this.addChild(icon);
	}
	_getIconOffset(){
		return {
			offsetX: 30,
			offsetY: this.icon.height * this._zoomRate - 30
		};
	}
	disable(){
		super.disable();
		this.icon.texture = RES.getRes("nuke_disabled_png");
	}
	enable(){
		super.enable();
		this.icon.texture = RES.getRes("nuke_png");
	}
}