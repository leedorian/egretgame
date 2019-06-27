module GameEvents {
    export class BlockEvent extends egret.Event{
        public static MOVED_OUT:string = "movedout";
        public static ALL_MOVED_IN:string = "allmovedin";
        public static MISSED:string = "missed";
        public static HIT: string = "hit";
        public static HIT_RUSH: string = "hitrush";
        public static HIT_SHRINK: string = "hitshrink";
        public static HIT_UNCLICKABLE: string = "hitunclickable";
        public missed:boolean = false;
        public constructor(type:string, bubbles:boolean=true, cancelable:boolean=false)
        {
            super(type,bubbles,cancelable);
        }
    }
    export class PlayEvent extends egret.Event{
        public static GAME_OVER:string = "gameover";
        public static SCORE:string = "score";
        public score:number = 0;
        public constructor(type:string, bubbles:boolean=true, cancelable:boolean=false)
        {
            super(type,bubbles,cancelable);
        }
    }
    export class MagicEvent extends egret.Event{
        public static UNFREEZE:string = "unfreeze";
        public static UNQUELL:string = "unquell";
        public static UNPURIFY:string = "unpurify";
        public static DESTROY:string = "destroy";
        public constructor(type:string, bubbles:boolean=true, cancelable:boolean=false)
        {
            super(type,bubbles,cancelable);
        }
    }
}
