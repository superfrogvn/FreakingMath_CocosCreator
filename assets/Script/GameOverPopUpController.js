cc.Class({
    extends: cc.Component,

    properties: {
        gameController:{
            default: null,
            type: cc.Node  
        },
        lblScore: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
            
    },
    
    show: function(score){
        this.lblScore.string = "Score: " + score;
        var animation = this.getComponent(cc.Animation);
        animation.play();
    },
    
    hide: function(){
        
    },
    
    onBtnRestartClicked: function(){
        let gameController = this.gameController.getComponent("GameController");
        gameController.restart();
    },
    
    onBtnMenuClicked: function(){
        cc.director.loadScene("HomeScene");
    }
    
});
