function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
/** Code Couleurs
 * 0: Rose
 * 1: Bleu
 * 2: Bordeaux
 * 3: Jaune
 * 4: Cyan
 * 5: Gris
 * 6: Orange
 * 7: Vert
 */

var combinaison = [4];

/*
Ce tableau permet de faire le lien entre les billes de la ligne et celles de la combinaison.
0 : la bille de la combinaison n'a pas été traitée.
1 : la bille de la ligne est la même que la bille de la combinaison à un même index.
2 : une des billes de la ligne a la même couleur que la bille de la combinaison de cet index.
*/
var tab = [4]; 
var numLigne;
var lancI=0;
var volGlob=0.2;

function genereSecret(){
    for(var i = 0; i < 4; i++){
        combinaison[i] = getRandomInt(8);
        tab[i] = 0;
    }
    numLigne = 1;
}
function afficheSecret(i){
    var source;

    switch (combinaison[i]){
        case 0:
            source = "personnages/personnages_gagne/alfyn_gagne.png";
        break;

        case 1:
            source = "personnages/personnages_gagne/therion_gagne.png";
        break;

        case 2:
            source = "personnages/personnages_gagne/cyrus_gagne.png";
        break;

        case 3:
            source = "personnages/personnages_gagne/haanit_gagne.png";
        break;

        case 4:
            source = "personnages/personnages_gagne/olberic_gagne.png";
        break;

        case 5:
            source = "personnages/personnages_gagne/ophilia_gagne.png";
        break;

        case 6:
            source = "personnages/personnages_gagne/primrose_gagne.png";
        break;

        case 7:
            source = "personnages/personnages_gagne/tressa_gagne.png";
        break;
    }
    return source;
}
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.src);
    document.getElementById('erreur').hidden = true;
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.src = data;
}
function colourToInteger(index, nLigne){
    nLigne = nLigne.toString();
    var retour;
    var source = document.getElementById("case" +nLigne +index).src;

    switch (source){
        case (document.getElementById("bille_rose").src):
            retour = 0;
        break;

        case (document.getElementById("bille_bleue").src):
            retour = 1;
        break;

        case (document.getElementById("bille_bordeaux").src):
            retour = 2;
        break;

        case (document.getElementById("bille_jaune").src):
            retour = 3;
        break;

        case (document.getElementById("bille_cyan").src):
            retour = 4;
        break;

        case (document.getElementById("bille_grise").src):
            retour = 5;
        break;

        case (document.getElementById("bille_orange").src):
            retour = 6;
        break;

        case (document.getElementById("bille_verte").src):
            retour = 7;
        break;
        
        default: retour = null;
    }
    return retour;
}
function testPosition(couleur, index){

    if(couleur == combinaison[index]){
        return true;
    }

    return false;
}
function testLigne(){
    var pionRouge;
    var compteurRouge = 0;
    var pionBlanc;
    var compteurBlanc = 0;
    var couleur = [4];
    var nLigne = 2;
    nLigne = nLigne.toString(); // on doit convertir nLigne en string sinon cela fera l'addition de numLigne et i...
    
    for(var i = 0; i < 4; i++){
        couleur[i] = colourToInteger(i, nLigne);

        pionBlanc = document.getElementById("pion_blanc" +nLigne +compteurBlanc);
        pionBlanc.hidden = true;

        pionRouge = document.getElementById("pion_rouge" +nLigne +compteurRouge);
        pionRouge.hidden = true;

        if(testPosition(couleur[i], i)){
            if(tab[i] == 2){
                compteurBlanc--;
                pionBlanc = document.getElementById("pion_blanc" +nLigne +compteurBlanc);
                pionBlanc.hidden = true;
            }

            tab[i] = 1;

            pionRouge.hidden = false;
            compteurRouge++;
        }
        else {
            var j = 0;

            while(j < 4){
                if((tab[j] == 0) && (testPosition(couleur[i], j))){
                tab[j] = 2;
                pionBlanc = document.getElementById("pion_blanc" +nLigne +compteurBlanc);
                pionBlanc.hidden = false;
                compteurBlanc++;
                break;
                }

                j++;
            }
        }
    }
}
function gagne(){
    var couleur = [4];
    var compteur = 0;

    for(var i = 0; i < 4; i++){
        couleur[i] = colourToInteger(i, 1);
        if(testPosition(couleur[i], i)) compteur++;
    }

    return (compteur == 4);
}
function cachePions(){
    numLigne = numLigne.toString();
    for(var i = 0; i < 4; i++){
        pion = document.getElementById("pion_rouge" +numLigne +i);
        pion.hidden = true;
        pion = document.getElementById("pion_blanc" +numLigne +i);
        pion.hidden = true;
    }
}
function ligneSuivante(){
    if(numLigne < 12){
        for(var i = numLigne; i > 0; i--){
            for(var j = 0; j < 4; j++){
                if(i == 1){
                    var k = parseInt(i) + 1;
                    k = k.toString();
                    i = i.toString();
                    var bille = document.getElementById("case" +i +j);
                    tab[j] = 0;
                    
                    var bille_suivante = document.getElementById("case" +k +j);
                    bille_suivante.src = bille.src;
                    bille.src = "personnages/Black characters/alfyn_black.png";
                }
                else{
                    var k = parseInt(i) + 1;
                    i = i.toString();
                    var bille = document.getElementById("case" +i +j);
                    k = k.toString();
                    var bille_suivante = document.getElementById("case" +k +j);
                    bille_suivante.src = bille.src;

                    var pion_blanc = document.getElementById("pion_blanc" +i +j);
                    if(!pion_blanc.hidden){
                        document.getElementById("pion_blanc" +k +j).hidden = false;
                        pion_blanc.hidden = true;
                    }
    
                    var pion_rouge = document.getElementById("pion_rouge" +i +j);
                    if(!pion_rouge.hidden){
                        document.getElementById("pion_rouge" +k +j).hidden = false;
                        pion_rouge.hidden = true;
                    }
                }
            }
        }
        numLigne++;
    }
    else {
        document.getElementById("perdu_fond").hidden = false;
        var valider = document.getElementById("bouton_valider");
        valider.style.display = 'none';
        document.getElementById("fond").pause();
        var defaite = document.getElementById("defeat");
        defaite.volume = volGlob;
        defaite.play();
    }
}
function elementsValides(){
    for(var i = 0; i < 4; i++){
        if(colourToInteger(i, 1) == null){
            return false;
        }
    }
    
    return true;
}
function valider(){
    if(elementsValides()){
        if(!jeuFini()){
            ligneSuivante();
            testLigne();
        }
    }
    else document.getElementById('erreur').hidden = false;
}
function jeuFini(){
    if(gagne()){
        while(numLigne >= 1){
            for(var i = 0; i < 4; i ++){
                var bille = document.getElementById("case1" +i);
                bille.draggable = false;
                bille.ondrop = "";
                bille.ondragover = "";
                bille.src = afficheSecret(i);
            }
            numLigne--;            
        }
        numLigne = 1;

        popup();
        var valider = document.getElementById("bouton_valider");
        valider.style.display = 'none';
        document.getElementById("fond").pause();
        var victoire = document.getElementById("victory");
        victoire.volume = volGlob;
        victoire.play();

        return true;
    }
    else return false;
}
function refresh(){
    var refresh = document.getElementById('refresh');
    refresh.addEventListener('click', location.reload(), false);
}
function revele(){
    for(var i = 0; i < 4; i++){
        afficheSecret(i);
    }
}
function popup() {
    var popup = document.getElementById("gagne_fond");
    popup.hidden = false;
}
function afficheRegles(){
    var regles = document.getElementById("regles");
    regles.hidden = false;
    var bouton = document.getElementById("bouton_regles");
    bouton.style.display = 'none';
}
function fermerRegles(){
    var regles = document.getElementById("regles");
    regles.hidden = true;
    var bouton = document.getElementById("bouton_regles");
    bouton.style.display = '';
}
function lancer(){
    var audioE = document.getElementById("fond");
    var ima = document.getElementById("jouer");
    var vol = document.getElementById("volu");
    if(lancI%2==0){
        audioE.volume=volGlob;
        vol.value=audioE.volume*100;
        audioE.loop=true;
        audioE.play();
        ima.src="musique/pause.png";
        ima.style.draggable = false;
    }
    else{
        audioE.pause();
        ima.src="musique/play.png";
        ima.style.draggable = false;
    }
    lancI++;
    
}

function couperSon(){
        var son = document.getElementById("fond");
        var vol = document.getElementById("volu");
        son.volume=0;
        vol.value=0;
        volGlob=0;
}

function changVol(){
        var vol = document.getElementById("volu");
        var aud = document.getElementById("fond");
        aud.volume=vol.value*0.01;
        volGlob=aud.volume;
}
function randomBoss(){
    var b = getRandomInt(17);
    
    switch(b){
        case 0:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Balogar.webp";
            boss.style.top = "29.5%";
            boss.style.width = "20%";
            document.getElementById("nom_boss").innerHTML = "Balogar le Seigneur des Runes";
        break;

        case 1:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Boss_Azure-eyed_Tiger.webp";
            boss.style.top = "30%";
            boss.style.width = "22%"; 
            document.getElementById("nom_boss").innerHTML = "un Tigre aux yeux d'Azur";
        break;

        case 2:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Boss_Behemoth.webp";
            boss.style.top = "28%";
            boss.style.width = "22%";
            document.getElementById("nom_boss").innerHTML = "Béhémoth";
        break;

        case 3:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Boss_Giant_Python.webp";
            boss.style.top = "30%";
            boss.style.width = "20%";
            document.getElementById("nom_boss").innerHTML = "un Python Géant"
        break;

        case 4:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Boss_Lord_of_the_Sands.webp";
            boss.style.top = "25.5%";
            boss.style.width = "22%";
            document.getElementById("nom_boss").innerHTML = "le Seigneur des Sables";
        break;

        case 5:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Boss_Tyrannodrake.webp";
            boss.style.top = "30%";
            boss.style.width = "22%";
            document.getElementById("nom_boss").innerHTML = "un Tyrannodrake";
        break;

        case 6:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/DevourerOfDreams.webp";
            boss.style.top = "26%";
            boss.style.width = "22%";
            document.getElementById("nom_boss").innerHTML = "le Dévoreur de Rêves"
        break;

        case 7:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Dreadwolf.webp";
            boss.style.top = "30%";
            boss.style.width = "22%";
            document.getElementById("nom_boss").innerHTML = "le Loup Effroyable";
        break;

        case 8:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Gaston.webp";
            boss.style.top = "26%";
            boss.style.width = "22%";
            document.getElementById("nom_boss").innerHTML = "Gaston le Pirate";
        break;

        case 9:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Gustav.webp";
            boss.style.top = "26%";
            boss.style.width = "22%";
            document.getElementById("nom_boss").innerHTML = "Gustav le Chevalier Noir";
        break;

        case 10:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Managarm.webp";
            boss.style.top = "35%";
            boss.style.width = "24%";
            document.getElementById("nom_boss").innerHTML = "Managarm le Maudit";
        break;

        case 11:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Miguel.webp";
            boss.style.top = "28%";
            boss.style.width = "20%";
            document.getElementById("nom_boss").innerHTML = "Miguel le Bandit";
        break;

        case 12:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Ogreeagle.webp";
            boss.style.top = "31%";
            boss.style.width = "22%";
            document.getElementById("nom_boss").innerHTML = "un Ograigle";
        break;

        case 13:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Omar.webp";
            boss.style.top = "28%";
            boss.style.width = "20%";
            document.getElementById("nom_boss").innerHTML = "Omar le Renégat";
        break;

        case 14:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Redeye.webp";
            boss.style.top = "31%";
            boss.style.width = "25%";
            document.getElementById("nom_boss").innerHTML = "l'immonde Oeil-Rouge";
        break;

        case 15:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Steorra.webp";
            boss.style.top = "28%";
            boss.style.width = "18%";
            document.getElementById("nom_boss").innerHTML = "Steorra l'Astromancienne";
        break;

        case 16:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Winnehild.webp";
            boss.style.top = "28%";
            boss.style.width = "21%";
            document.getElementById("nom_boss").innerHTML = "Winnehild le Maître de Guerre";
        break;

        case 17:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Yvon.webp";
            boss.style.top = "26%";
            boss.style.width = "22%";
            document.getElementById("nom_boss").innerHTML = "Yvon le Terrible";
        break;

        default:
            var boss = document.getElementById("boss");
            boss.src = "Bosses/Yvon.webp";
            boss.style.top = "26%";
            boss.style.width = "22%";
            document.getElementById("nom_boss").innerHTML = "Yvon le Terrible";
    }
}
function nouvellePartie(){
    var refresh = document.getElementById("bouton_recommencer");
    refresh.addEventListener('click', location.reload(), false);
}