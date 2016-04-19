cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        var actDelay = cc.delayTime(1);
        var endFunc = cc.callFunc(this.onGoToMainMenu, this);
        var actSplash = cc.sequence(actDelay, endFunc);
        this.node.runAction(actSplash);
    },

    // called every frame
    update: function (dt) {

    },
    
    onGoToMainMenu: function(){
        cc.director.loadScene("HomeScene");
    }
});
