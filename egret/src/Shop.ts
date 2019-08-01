class Shop  extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
		//this.init();
        
	}
    private initEui():void{
        
    }
	
}