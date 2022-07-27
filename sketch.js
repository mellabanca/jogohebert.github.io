{ //variáveis

    //configurações
    var estado = "inicio", combustivel = 100; 

    //menu
    var titulo, tituloImg, play, playImg;
    var controle = "não";

    //cenário
    var lua, solo, plataforma, plataformaImg;
    var obstaculo1, obstaculo2, obstaculo3, obstaculoImg;

    //nave
    var nave, naveParada, naveCima, naveBaixo, naveQuebrada;
    var naveEsquerda1, naveEsquerda2, naveDireita1, naveDireita2;

    //painel
    var gasolina, gasolinaImg;
    var velocimetroV, velocimetroH, velocimetroImg;
}

{ //pré carregamento e configurações

    function preload(){

        //menu
        tituloImg = loadImage("Images/menu/titulo.png");
        playImg = loadImage("Images/menu/play.png");

        //cenário
        lua = loadImage("Images/cenario/lua.png");
        obstaculoImg = loadImage("Images/cenario/obstaculo.png");
        plataformaImg = loadImage("Images/cenario/plataforma.png");

        //painel
        gasolinaImg = loadImage("Images/cenario/gasolina.png");
        velocimetroImg = loadImage("Images/cenario/velocimetro.png");
      
        //nave

        naveParada = loadAnimation("Images/nave/vertical/nave1.png");
      
        naveCima = loadAnimation("Images/nave/vertical/nave1.png", "Images/nave/vertical/nave2.png", "Images/nave/vertical/nave3.png");
        naveCima.looping = false;
        naveCima.frameDelay = 2;
      
        naveBaixo = loadAnimation("Images/nave/vertical/nave3.png", "Images/nave/vertical/nave2.png", "Images/nave/vertical/nave1.png");
        naveBaixo.looping = false;
        naveBaixo.frameDelay = 2;
        
        naveEsquerda1 = loadAnimation("Images/nave/horizontal/naveE1.png", "Images/nave/horizontal/naveE2.png");
        naveEsquerda1.looping = false;
        naveEsquerda1.frameDelay = 3;
      
        naveEsquerda2 = loadAnimation("Images/nave/horizontal/naveE1.png", "Images/nave/vertical/nave1.png");
        naveEsquerda2.looping = false;
        naveEsquerda2.frameDelay = 3;
      
        naveDireita1 = loadAnimation("Images/nave/horizontal/naveD1.png", "Images/nave/horizontal/naveD2.png");
        naveDireita1.looping = false;
        naveDireita1.frameDelay = 3;
      
        naveDireita2 = loadAnimation("Images/nave/horizontal/naveD1.png", "Images/nave/vertical/nave1.png");
        naveDireita2.looping = false;
        naveDireita2.frameDelay = 3;
      
        naveQuebrada = loadAnimation("Images/nave/quebrada/naveQ1.png", "Images/nave/quebrada/naveQ1.png", "Images/nave/quebrada/naveQ2.png", "Images/nave/quebrada/sumiu.png");
        naveQuebrada.looping = false;
        naveQuebrada.frameDelay = 4;
    }
      
    function setup(){
      
        //tela
        createCanvas(windowWidth, windowHeight-4);

        //menu
        titulo = createSprite(width/2, 140);
        titulo.addImage(tituloImg);
        titulo.scale = 1.7;

        play = createSprite(width/2, height/2+50);
        play.addImage(playImg);
        play.scale = 0.8;

        //cenário

        solo = createSprite(width/2, height+10, width, 20);

        plataforma = createSprite(200, height-200);
        plataforma.setCollider("rectangle", 0, 200, 580, 130);
        plataforma.addImage(plataformaImg);
        plataforma.scale = 0.5;
    
        obstaculo1 = createSprite(width/2+30, height-130);
        obstaculo1.setCollider("rectangle", 12, 17, 270, 230);
        obstaculo1.addImage(obstaculoImg);
    
        obstaculo2 = createSprite(width/2+30, height/2+50, 10, 10);
        obstaculo2.setCollider("rectangle", -10, 10, 100, 170, 40);
        obstaculo2.visible = false;
    
        obstaculo3 = createSprite(width/2+90, height/2+50, 10, 10);
        obstaculo3.setCollider("rectangle", -10, 10, 80, 80, 80);
        obstaculo3.visible = false;

        //painel
    
        velocimetroV = createSprite(80, 85);
        velocimetroV.addImage(velocimetroImg);
        velocimetroV.scale = 0.3;
    
        velocimetroH = createSprite(230, 85);
        velocimetroH.addImage(velocimetroImg);
        velocimetroH.scale = 0.3;
    
        gasolina = createSprite(50, 205);
        gasolina.addImage(gasolinaImg);
        gasolina.scale = 0.15;
    
        //nave
        nave = createSprite(width-100, 120);
        nave.setCollider("rectangle", 0, -15, 220, 210);
        nave.addAnimation("parada", naveParada);
        nave.scale = 0.8;
    }

    function windowResized(){
        resizeCanvas(windowWidth, windowHeight);
    }
}

function draw(){

    background(lua);
    drawSprites();

    if(estado === "inicio"){

        menuInicial();

    }else if(estado === "instruções"){
     
        comoJogar();
        
    }else if(estado === "jogo"){

        nave.visible = true;
        gasolina.visible = true;
        plataforma.visible = true;
        obstaculo1.visible = true;
        obstaculo2.visible = true;
        obstaculo3.visible = true;
        velocimetroH.visible = true;
        velocimetroV.visible = true;

        movimento();
        colisoes();
        mostrarCombustivel();
        velocidade();
    }else if(estado === "perdeu" || estado === "venceu"){
        fimDeJogo();
    }
}

{ //menu inicial

    function menuInicial(){

        nave.visible = false;
        gasolina.visible = false;
        plataforma.visible = false;
        obstaculo1.visible = false;
        obstaculo2.visible = false;
        obstaculo3.visible = false;
        velocimetroH.visible = false;
        velocimetroV.visible = false;

        if(mouseIsOver(play)){
            cursor("pointer");
            play.scale = 0.85;
        }else{
            play.scale = 0.8;
            cursor("auto");
        }

        if(mousePressedOver(play) && estado === "inicio"){
            estado = "instruções";
        }
    }

    function comoJogar(){

        titulo.y = 50; 
        titulo.scale = 0.7;
        play.y = height-80;

        fill("#fff");
        textSize(25);
        textAlign(CENTER);
        textFont("Geórgian");
        text("Saudações Astronauta!", width/2, 140);
        text("Infelizmente sua comunicação com a NASA foi perdida", width/2, 200);
        text("então use suas habilidades como piloto para, sozinho,", width/2, 230);
        text("pousar a nave em segurança.", width/2, 260);
        text("Mas em consideração à nossa amizade, vou te dar essa dica:", width/2, 320);
        text("Utilize as teclas W, A e D ou as setas do teclado", width/2, 350);
        text("para controlar a nave.", width/2, 380);
        text("Boa Sorte!", width/2, 440);
        
        if(mouseIsOver(play)){
            cursor("pointer");
            play.scale = 0.55;
        }else{
            play.scale = 0.5;
            cursor("auto");
        }

        if(mousePressedOver(play) && controle === "sim"){
            estado = "jogo";
        }

        if(mouseDown("LEFT_BUTTON")){
            controle = "não";
        }else{
            controle = "sim";
        }
    }
}

{ //jogo

    function movimento(){

        nave.velocityY += 0.2;
    
        if(combustivel > 2){
           
            //cima
    
            if(keyDown("w") || keyDown("UP_ARROW")){
                nave.velocityY -= 0.5;
                combustivel -= 1.5;
            }
    
            if(keyWentDown("w") || keyWentDown("UP_ARROW")){
                nave.addAnimation("cima", naveCima);
                nave.changeAnimation("cima");
            }
    
            if(keyWentUp("w") || keyWentUp("UP_ARROW")){
                nave.addAnimation("baixo", naveBaixo);
                nave.changeAnimation("baixo");
            }
    
            //esquerda
    
            if(keyDown("a") || keyDown("LEFT_ARROW")){
                nave.velocityX -= 0.5;
                combustivel -= 1.5;
            }
    
            if(keyWentDown("a") || keyWentDown("LEFT_ARROW")){
                nave.addAnimation("esquerda1", naveEsquerda1);
                nave.changeAnimation("esquerda1");
            }
    
            if(keyWentUp("a") || keyWentUp("LEFT_ARROW")){
                nave.addAnimation("esquerda2", naveEsquerda2);
                nave.changeAnimation("esquerda2");
            }
    
            //direita
    
            if((keyDown("d") || keyDown("RIGHT_ARROW")) && combustivel > 0){
                nave.velocityX += 0.5;
                combustivel -= 1.5;
            }
    
            if(keyWentDown("d") || keyWentDown("RIGHT_ARROW")){
                nave.addAnimation("direita1", naveDireita1);
                nave.changeAnimation("direita1");
            }
    
            if(keyWentUp("d") || keyWentUp("RIGHT_ARROW")){
                nave.addAnimation("direita2", naveDireita2);
                nave.changeAnimation("direita2");
            }

        }else{
            nave.changeAnimation("parada");
        }  
    }
    
    function velocidade(){
    
        //velocidade vertical
    
        let velY = nave.velocityY.toFixed(0);

        textSize(30);
        textAlign(CENTER);

        if(velY < 0){
            fill("lightGreen");
        }else{
            fill("gray");
        }

        text(velY*(-1), velocimetroV.x, velocimetroV.y+40);
    
        //velocidade horizontal

        let velX = nave.velocityX.toFixed(0);

        if(velX != 0){
            fill("lightGreen");
        }else{
            fill("gray");
        }

        if(velX < 0){
            text(velX*(-1), velocimetroH.x, velocimetroH.y+40);
        }else{
            text(velX, velocimetroH.x, velocimetroH.y+40);
        }
    }
    
    function mostrarCombustivel(){
    
        fill("#f06635");
        strokeWeight(3);
        stroke("#c73804");
        rect(99, 199, 182, 22);
    
        noStroke();
        fill("#e34810");
        rect(100, 200, combustivel*1.8, 20);
    }
    
    function colisoes(){
    
        if(nave.isTouching(plataforma)){
    
            if( nave.x > 160 && nave.x < 280){
                estado = "venceu";
            }else{
                estado = "perdeu";
                nave.addAnimation("quebrada", naveQuebrada);
                nave.changeAnimation("quebrada");
                nave.velocityY = 0;
            }
        }
    
        if(nave.isTouching(obstaculo1) || nave.isTouching(obstaculo2) ||
           nave.isTouching(obstaculo3) || nave.isTouching(solo)){
    
            nave.addAnimation("quebrada", naveQuebrada);
            nave.changeAnimation("quebrada");
            estado = "perdeu";
    
            if(nave.isTouching(solo)){
                nave.velocityY = 0;
            }
        }
    }
}

{ //fim de jogo

    function fimDeJogo(){

        textAlign(CENTER);
        textSize(50);
        textFont("Geórgian");
        stroke(0);
        strokeWeight(3);
    
        if(estado === "venceu"){
            fill("lightGreen");
            text("VOCÊ VENCEU!!", width/2, height/2-150);
            nave.velocityX = 0;
            nave.velocityY = 0;
        }
    
        if(estado === "perdeu"){
            fill("red");
            text("VOCÊ PERDEU!!", width/2, height/2-150);
            nave.velocityX = 0;
        }
    }
}