enum BlockState{
    unclickable = 0,
    clicked = 1,
    clickable = 2,
    clickableDouble = 3,
    clickableRush = 4
}
enum BlockColor{
    unClickable = 0xffffff,
    clickable = 0x000000,
    clicked = 0xe5e5e5,
    border = 0x666666,

    clickableDouble = 0x1b34ba,
    clickableRush = 0xb71d1d,
    clickableBlink = 0x93d500,
    clickableShrink = 0xc900ff
}
enum BlockTexture{
    unClickable = "b_normal_png",
    clicked = "block_clicked",
    clickableDouble = "b_blue_png",
    clickableRush = "b_red_png",
    clickableBlink = "b_yellow_png",
    clickableShrink = "b_purple_png",
    clickableNormal= "b_black_png",
    clickableNormalRushStyle= "b_black_rush_png",
    clickableShrinkRushStyle= "b_purple_rush_png",
    clickableBlinkRushStyle= "b_yellow_rush_png",
    clickableRushRushStyle= "b_red_rush_png",
    clickableDoubleRushStyle= "b_blue_rush_png"
}
enum BlockType{
    BlockNormal = 0,
    BlockDouble = 1,
    BlockRush = 2,
    BlockBlink = 3,
    BlockShrink = 4,
    BlockBonus = 5
}
//块样式
enum BlockStyle{
    Default = 0,//普通
    Rush = 1//加速
}
enum GameMode{
    BI_DIR,
    DOWN,
    UP
}
enum GameLevel{
    EASY,
    NORMAL,
    HARD
}
enum TextColors{
    defaultButtonLable = 0xffffff
}
