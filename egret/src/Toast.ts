/**
 * Created by egret on 2016/1/26.
 */
class Toast extends egret.DisplayObjectContainer{
    
    public static init( cont:egret.DisplayObjectContainer, txtrToastBg:egret.Texture ):void{
        console.log( "Toast.init", txtrToastBg );
        this._cont = cont;
        this._txtrToastBg = txtrToastBg;
    }
    
    public static launch( msg:string ):void{
        if( this._cont ){
            var toast:Toast = new Toast( msg,  Constant.DESIGN_WID, Constant.DESIGN_HEI);
            //var toast:Toast = new Toast( msg, this._cont.stage.stageWidth, this._cont.stage.stageHeight );
            this._cont.addChild( toast );
        }
    }

    private static _txtrToastBg:egret.Texture;
    private static _cont:egret.DisplayObjectContainer;

    constructor ( msg:string, w:number, h:number ){
        super();
        
        console.log( "Toast:", msg + " | " + w + " | " + h);
        
        var bg:egret.Bitmap = new egret.Bitmap( Toast._txtrToastBg );
        this.addChild( bg );
        
        var tx:egret.TextField = new egret.TextField;
        tx.multiline = true;
        tx.size = 50;
        tx.bold = true;
        tx.textColor = 0xFFFFFF;
        tx.stroke = 2;
        tx.strokeColor = 0;
        tx.text = msg;
        tx.fontFamily = "微软雅黑";
        tx.textAlign = egret.HorizontalAlign.CENTER;
        tx.width = 600;
        // tx.x = ( Toast._txtrToastBg.textureWidth - tx.width ) / 2;
        tx.x = 50;
        tx.y = 25;
        this.addChild( tx );
         
        bg.height = 50 + tx.height;
       
        bg.width = tx.width +100;
        // this.anchorOffsetX = 0;
        //this.anchorOffsetY = this.height * .5;
        // this.x = w * .5;
        // this.x = (w - bg.width)/2;
        this.x = 200;
        this.y = h * .618;
        
        this.alpha = 0;
        console.log("this.width11 = " + bg.width);
        egret.Tween.get( this )
            .to( { alpha: 1 }, 800, egret.Ease.quintOut )
            //.to( { scaleX: 1.2, scaleY: 1.2 }, 100, egret.Ease.quintOut )
            //.call( ()=>{ console.log( "tween tween tween" ); } ) 
            //.to( { scaleX: 1.0, scaleY: 1.0 }, 300, egret.Ease.quintIn )
            .wait( 1600 )
            .to( { alpha: 0 }, 1200, egret.Ease.quintIn  ).call( ()=>{      /*  y: this.y - 50, */
            if( this.parent ){
                this.parent.removeChild( this );
            }
        } );
}
}