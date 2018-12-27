module GameEvents {
    export class BlockEvent extends egret.Event{
        public static MOVED_OUT:string = "movedout";
        public static MISSED:string = "missed";
        public static HIT: string = "hit";
        public static HIT_RUSH: string = "hitrush";
        public missed:boolean = false;
        public constructor(type:string, bubbles:boolean=true, cancelable:boolean=false)
        {
            super(type,bubbles,cancelable);
        }
    }
}
