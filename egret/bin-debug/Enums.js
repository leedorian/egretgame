var BlockState;
(function (BlockState) {
    BlockState[BlockState["unclickable"] = 0] = "unclickable";
    BlockState[BlockState["clicked"] = 1] = "clicked";
    BlockState[BlockState["clickable"] = 2] = "clickable";
    BlockState[BlockState["clickableDouble"] = 3] = "clickableDouble";
    BlockState[BlockState["clickableRush"] = 4] = "clickableRush";
})(BlockState || (BlockState = {}));
var BlockColor;
(function (BlockColor) {
    BlockColor[BlockColor["unClickable"] = 16777215] = "unClickable";
    BlockColor[BlockColor["clickable"] = 0] = "clickable";
    BlockColor[BlockColor["border"] = 6710886] = "border";
    BlockColor[BlockColor["clickableDouble"] = 1782970] = "clickableDouble";
    BlockColor[BlockColor["clickableRush"] = 12000541] = "clickableRush";
})(BlockColor || (BlockColor = {}));
var GameMode;
(function (GameMode) {
    GameMode[GameMode["BI_DIR"] = 0] = "BI_DIR";
    GameMode[GameMode["DOWN"] = 1] = "DOWN";
    GameMode[GameMode["UP"] = 2] = "UP";
})(GameMode || (GameMode = {}));
var GameLevel;
(function (GameLevel) {
    GameLevel[GameLevel["EASY"] = 0] = "EASY";
    GameLevel[GameLevel["NORMAL"] = 1] = "NORMAL";
    GameLevel[GameLevel["HARD"] = 2] = "HARD";
})(GameLevel || (GameLevel = {}));
var TextColors;
(function (TextColors) {
    TextColors[TextColors["defaultButtonLable"] = 16777215] = "defaultButtonLable";
})(TextColors || (TextColors = {}));
//# sourceMappingURL=Enums.js.map