///<reference path="cordova.d.ts"/>

class GameScene extends egret.Sprite {
    public constructor(param: any) {
        super();
        this._mode = param.mode;
        this._level = param.level;
        this._calculateColsRows();
        this._drawColumns();
        this._drawScore();
        this.addEventListener(GameEvents.BlockEvent.MOVED_OUT, this._onMovedOut, this, true);
        this.addEventListener(GameEvents.BlockEvent.HIT, this._onHit, this, true);
        let state = "_" + (+new Date());
        Wechat.auth("snsapi_userinfo", state, function (response) {
            // you may use response.code to get the access token.
            if (response.code) {
                console.log(response.code);
            }
        }, function (reason) {
            console.log("Failed: " + reason);
        });
    }
    private _mode: number;
    private _level: number;
    private _cols: number;
    private _rows: number;
    private _score: number = 0;
    private _scoreText: egret.TextField;
    private _blockColumns: Array<BlocksColumn> = [];
    private _drawColumns() {
        let blockColumn: BlocksColumn
        let aDir: Array<string> = ["up", "down"];
        let nColWidth: number = Utils.getBlockWidth();
        for (let i = 0; i < Utils.columns; i++) {
            let sDir: string = "up";
            if (this._mode === GameMode.BI_DIR) {
                sDir = aDir[Math.floor(Math.random() * 2)];
            } else if (this._mode === GameMode.DOWN) {
                sDir = aDir[1];
            }
            blockColumn = new BlocksColumn({
                dir: sDir,
                speed: Math.floor(Math.random() * Utils.columns + 1),
                name: "col_" + i
            });
            blockColumn.x = i * nColWidth;
            this.addChild(blockColumn);
            this._blockColumns.push(blockColumn);
        }

    }
    private _calculateColsRows() {
        let nThumbWidth: number = 48;
        let nThumbHeight: number = 48;
        let nStageWidth: number = Utils.getStageWidth();
        let nStageHeight: number = Utils.getStageHeight();
        let nColsMax: number = Math.floor(nStageWidth / nThumbWidth);
        let nRowsMax: number = Math.floor(nStageWidth / nThumbHeight);
        if (this._level === GameLevel.EASY) {
            Utils.columns = 4;
            Utils.rows = 6;
        } else if (this._level === GameLevel.NORMAL) {
            Utils.columns = 5;
            Utils.rows = 7;
        } else if (this._level === GameLevel.HARD) {
            Utils.columns = 6;
            Utils.rows = 8;
        }
        if (Utils.columns > nColsMax) {
            Utils.columns = nColsMax;
        }
        if (Utils.rows > nRowsMax) {
            Utils.rows = nRowsMax;
        }

    }
    private _drawScore() {
        let label: egret.TextField = new egret.TextField();
        label.width = Utils.getStageWidth();
        label.y = Utils.getStageHeight() * 0.2;
        label.height = 30;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.textColor = 0xffffff;
        label.bold = true;
        label.strokeColor = 0x0000ff;
        label.stroke = 2;
        label.text = this._score.toString();
        this._scoreText = label;
        this.addChild(this._scoreText);
    }
    private _onMovedOut(evt: GameEvents.BlockEvent) {

        // let tarBlock: Block = evt.target;
        // let missed: boolean = evt.missed;

    }

    private _onHit(evt: GameEvents.BlockEvent) {
        this._score++;
        this._scoreText.text = this._score.toString();
    }

    public gameStart() {
        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].move();
        }
    }
}