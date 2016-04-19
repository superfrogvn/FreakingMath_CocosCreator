cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        let sizeScreen = cc.director.getWinSize();
        let widthBar = this.node.width;
        this.node.scaleX = sizeScreen.width / widthBar;
    },

});
