var OperatorType = cc.Enum({
    ADD: 1,
    SUB: 2
});

var GameState =  cc.Enum({
    PLAYING : 1,
    GAMEOVER : 2
});

cc.Class({
    extends: cc.Component,

    properties: {
        lblScore: {
            default: null,
            type: cc.Label
        },
        lblQuestion1: {
            default: null,
            type: cc.Label
        },
        lblQuestion2: {
            default: null,
            type: cc.Label
        },
        progressBarTimer: {
            default: null,
            type: cc.ProgressBar
        },
        sfxScore: {
            default: null,
            url: cc.AudioClip
        },
        sfxFail: {
            default: null,
            url: cc.AudioClip
        },
        groupButtons: {
            default: null,
            type: cc.Node
        },
        popupGameOver: {
          default: null,
          type: cc.Animation 
        },
        
        curScore: 0,
        
        timeLimitPerQuestion: 2,
        timerForProgressBar: 0,
        
        curAnswerResult: false,
        curGameState : GameState.PLAYING,
        
    },

    // use this for initialization
    onLoad: function () {
        this.initProgressBarTimer();
        
        this.generateQuestion();
    },

    update: function (dt) {
        //Update for progressBarTimer
        this.updateProgressBarTimer(dt);
    },

    onBtnTrueClicked: function(){
        if(this.curAnswerResult == true)
        {
            this.addScore(1);
            this.generateQuestion();
            this.resetProgressBarTimer();
        }
        else
        this.gameOver();
    },
    
    onBtnFalseClicked: function(){
       if(this.curAnswerResult == false)
        {
            this.addScore(1);
            this.generateQuestion();
            this.resetProgressBarTimer();
        }
        else
        this.gameOver(); 
    },
    
    initProgressBarTimer: function(){
        let sizeScreen = cc.director.getWinSize();
        let widthBar = this.progressBarTimer.node.width;
        this.progressBarTimer.node.scaleX = sizeScreen.width / widthBar;
    },
    
    updateProgressBarTimer: function (dt) {
        if(this.curGameState == GameState.PLAYING)
        {
            var progress = this.progressBarTimer.progress;
            if(progress > 0)
            {
                this.timerForProgressBar += dt;
                progress = this.timerForProgressBar / this.timeLimitPerQuestion;
                this.progressBarTimer.progress = 1 - progress;
            }
            else
            {
                cc.log("Time out => Game Over!");
                this.gameOver();
            }
        }
        
    },
    
    generateQuestion: function () {
        let rndOperator = this.getRandomInt(1, 2);
        let rndLeftValue = this.getRandomInt(1, 10);
        let rndRightvalue = this.getRandomInt(1, 10);
        let rndTrueFalse = this.getRandomInt(1, 100);
        var valueResult = 0;
        var strOperator = "";
        switch(rndOperator)
        {
            case OperatorType.ADD:
            valueResult = rndLeftValue + rndRightvalue;
            strOperator = "+";
            break;
            
            case OperatorType.SUB:
            valueResult = rndLeftValue - rndRightvalue;
            strOperator = "-";
            break;
        }
        
        if(rndTrueFalse >= 60)
        {
            this.curAnswerResult = true;
        }
        else
        {
            this.curAnswerResult = false;
            let rndDelta = 0;
            do{
                rndDelta = this.getRandomInt(-2, 2);
            }while(rndDelta == 0);
            
            valueResult += rndDelta;

        }
        
        this.lblQuestion1.string = rndLeftValue + " " + strOperator + " " + rndRightvalue;
        this.lblQuestion2.string = "= " + valueResult; 
        
        cc.log("Random Operator : " + rndOperator + " Result : " + this.curAnswerResult + " " + valueResult);
    },
    
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    addScore: function(value){
        this.curScore += value;
        this.lblScore.string = this.curScore;
        cc.audioEngine.playEffect(this.sfxScore, false);
    },
    
    gameOver: function(){
        cc.audioEngine.playEffect(this.sfxFail, false);
        
        this.curGameState = GameState.GAMEOVER;
        this.timerForProgressBar = 0;
        this.progressBarTimer.progress = 0;
        this.progressBarTimer.node.active = false;
        
        this.showPopUpGameOver();
    },
    
    resetProgressBarTimer: function(){
        this.timerForProgressBar = 0;
        this.progressBarTimer.progress = 1;
        this.progressBarTimer.node.active = true;
    },
    
    showPopUpGameOver: function(){
        let gameOverController = this.popupGameOver.node.getComponent("GameOverPopUpController");
        gameOverController.show(this.curScore);
        
        //Disable touch to button of gamescene
        cc.eventManager.pauseTarget(this.groupButtons, true);
    },
    
    restart: function(){
        cc.director.loadScene("GameScene");
    }
});
