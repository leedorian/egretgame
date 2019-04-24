class Login extends eui.Component implements  eui.UIComponent {
	public bgIMG:eui.Image;
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.autoFitStage, this);
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.resize, this)
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
	autoFitStage():void{
		this.height = Utils.getStageHeight();
		this.width = Utils.getStageWidth();
	}
	resize():void{
		Utils.fitToWidth(this.bgIMG, this.width);
	}
}