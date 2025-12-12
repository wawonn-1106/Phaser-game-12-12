class MyGame extends Phaser.Scene{
    constructor(){
        super({key:'MyGame'});
        this.player=null;
        this.enemyGroup=null;
        this.coinGroup=null;
        this.cursors=null;
        this.score=0;
        this.scoreText=null;
    }
    preload(){
        this.load.image('player','assets/player.png');
        this.load.image('pumpkin','assets/pumpkin.png');
        this.load.image('ghost','assets/ghost.png');
        this.load.image('zombie','assets/zombie.png');
        this.load.image('kinoko','assets/kinoko.png');
        this.load.image('coin','assets/coin.png');
        this.load.image('tileset','assets/tileset.jpg');
        this.load.image('sky','assets/海.png');
    }
    create(){
        //マップ
        this.add.image(0,0,'sky').setOrigin(0,0).setScale(20);

        const mapData=[
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ];
        const map=this.make.tilemap({
            data:mapData,
            tileWidth:50,
            tileHeight:50
        });
        const tileset=map.addTilesetImage('tileset','tileset');
        const worldLayer=map.createLayer(0,tileset,0,0);
        worldLayer.setOrigin(0,0);
        worldLayer.setCollision([1,3]);

        //プレイヤー
        this.player=this.physics.add.sprite(100,200,'player').setScale(0.1);
        this.player.setCollideWorldBounds(true);

        //敵
        this.enemyGroup=this.physics.add.group({
            defaultKey:'enemy',
            setGravityY:300,
            collideWorldBounds:true
        });
        
        const enemyData=[
            {x:400,y:200,key:'pumpkin'},
            {x:500,y:200,key:'ghost'},
            {x:600,y:200,key:'zombie'},
        ];

        enemyData.forEach(data=>{
            const newEnemy=this.enemyGroup.create(data.x,data.y,data.key);
            newEnemy.setScale(0.1);
            newEnemy.setVelocityX(-100);
        });

        //コイン
        this.coinGroup=this.physics.add.group({
            defaultKey:'coin',
            immovable:true,
            allowGravity:false
        });

        const coinData=[
            {x:400,y:350,key:'coin'},
            {x:450,y:350,key:'coin'},
            {x:500,y:350,key:'coin'},
            {x:550,y:350,key:'coin'},
            {x:600,y:350,key:'coin'},
        ];

        coinData.forEach(data=>{
            const newCoin=this.coinGroup.create(data.x,data.y,data.key);
            newCoin.setScale(0.1);
        });
        //キノコ
        this.kinokoGroup=this.physics.add.group({
            defaultKey:'kinoko',
            setGravityY:300,
            collideWorldBounds:true
        });

        const kinokoData=[
            {x:700,y:350,key:'kinoko'},
            {x:900,y:350,key:'kinoko'}
        ];

        kinokoData.forEach(data=>{
            const newKinoko=this.kinokoGroup.create(data.x,data.y,data.key);
            newKinoko.setScale(0.1);
            newKinoko.setVelocityX(-100);
        });
        //スタートボタンDOMの練習
        const startButton=this.add.dom(
            800,
            500,
            'my-button'
        );
        startButton.setStyle({
            'background-color':'white',
            'width':'600px',
            'height':'200px'
        });

        const inputHTML='<input type="text" name="nameField" placeholder="名前を入力してください" style="font-size:24px; width:240px;">';
        const nameInput=this.add.dom(
            400,
            300,
            'div',
            null,
            inputHTML
        );

        nameInput.setOrigin(0.5);
        nameInput.addListener('click')
        nameInput.on('click',(event)=>{
            if(event.target.name==='nameField'){
                console.log('入力欄がクリックされました');
            }
        });
        //当たり判定
        this.physics.add.collider(this.player,worldLayer);
        this.physics.add.collider(this.enemyGroup,worldLayer);
        this.physics.add.collider(this.kinokoGroup,worldLayer);
        this.physics.add.collider(this.player,this.enemyGroup,this.handlePlayerEnemyCollision,null,this); 
        this.physics.add.overlap(this.player,this.coinGroup,this.collectCoin,null,this);
        this.physics.add.overlap(this.player,this.kinokoGroup,this.hitKinoko,null,this);

        
        //カーソル
        this.cursors=this.input.keyboard.createCursorKeys();
        //カメラ
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0,2000,500);
        //スコア
        this.scoreText=this.add.text(
            16,
            16,
            'Score:0',
            {fontSize:'32px',fill:'black'}
        ).setScrollFactor(0);
    }
    hitEnemy(player,enemy){
        if(player.scale===0.2){
            const newScale=0.1;
            player.setScale(newScale);
            this.updateBodySize(player,newScale);

            this.startInvulnerability(1000);
        }
        if(player.scale===0.1){
            player.disableBody(true,true);
            enemy.setVelocityX(0);
        }
        
    }
    collectCoin(player,coin){
        coin.disableBody(true,true);
        this.score+=10;
        this.scoreText.setText('Score:'+this.score);
    }
    hitKinoko(player,kinoko){
        const newScale=0.2;
        player.setScale(newScale);
        this.updateBodySize(player,newScale);

        kinoko.disableBody(true,true);
    }
    updateBodySize(gameObject,scale){
        const sourceWidth=gameObject.texture.getSourceImage().width;
        const sourceHeight=gameObject.texture.getSourceImage().height;
        gameObject.body.setSize(sourceWidth*scale,sourceHeight*scale);
    }
    startInvulnerability(duration){
        this.isInvulnerable=true;

        this.tweens.add({
            target:this.player,
            alpha:0.2,
            duration:100,
            ease:'Linear',
            yoyo:true,
            repeat:duration/100-1
        });

        this.time.delayedCall(duration,()=>{
            this.isInvulnerable=false;
            this.player.setAlpha(1);
        },[],this);
    }
    handlePlayerEnemyCollision(player,enemy){
        if(this.isInvulnerable){
            return;
        }
        this.hitEnemy(player,enemy);
    }
    update(){
        if(this.player.active){
            if(this.cursors.right.isDown){
                this.player.setVelocityX(100);
            }else if(this.cursors.left.isDown){
                this.player.setVelocityX(-100);
            }else{
                this.player.setVelocityX(0);
            }
            if(this.cursors.up.isDown &&this.player.body.onFloor()){
                this.player.setVelocityY(-330);
            }
        }
        this.enemyGroup.children.each((enemy)=>{
            if(enemy.active){
                if(enemy.body.blocked.left){
                    enemy.setVelocityX(100);
                }else if(enemy.body.blocked.right){
                    enemy.setVelocityX(-100);
                }
            }
        });
        this.kinokoGroup.children.each((kinoko)=>{
            if(kinoko.active){
                if(kinoko.body.blocked.left){
                    kinoko.setVelocityX(100);
                }else if(kinoko.body.blocked.right){
                    kinoko.setVelocityX(-100);
                }
            }
        });
    }
}

const config={
    type:Phaser.AUTO,
    width:2000,
    height:650,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y:300}
        },
        debug:true
    },
    parent:'game-container',
    dom:{
        createContainer:true
    },
    scene:MyGame
}

const game=new Phaser.Game(config);