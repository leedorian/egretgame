class Gameover extends eui.Component implements  eui.UIComponent {
	
	public constructor() {
		super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
	}
    private initEui():void{
        
    }
}