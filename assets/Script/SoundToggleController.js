cc.Class({
    extends: cc.Component,

    properties: {
        sprOn: {
            default: null,
            type: cc.Sprite
        },
        sprOff: {
            default: null,
            type: cc.Sprite
        }
    },

    // use this for initialization
    onLoad: function () {

    },
    
    
    toggleSprite: function(value){
        if(value == true)
        {
            this.sprOn.node.active = true;
            this.sprOff.node.active = false;
        }
        else
        {
             this.sprOn.node.active = false;
            this.sprOff.node.active = true;
        }
    }
});
