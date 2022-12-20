//declarations des variables globales de toutes les fonctions
var golds=0;
var a=0;
var x = 0;
var m=1;
var gps=0;
var min=0;
var p=0;

var players = [
{ id: 0, name: "Stephen CURRY", cost: 10, gps: 0.1, owned:  0,son:'son/SCson.mp3'},
{ id: 1, name: "Kobe BRYANT", cost: 50, gps: 1, owned: 0 ,son:'son/KBson.mp3'},
{ id: 2, name: "Lebron JAMES", cost: 250, gps: 2, owned: 0, son: 'son/LBJson.mp3'},
{ id: 3, name: "Michael JORDAN", cost: 2000, gps: 4, owned: 0, son:'son/MJson.mp3'},
{ id: 4, name: "NBA trophy", cost: 5000, gps: 10, owned: 0, son:'son/NBASound.mp3'}
];

setInterval(function()
{
golds+=gps;
displayGolds();

},1000);
//ajout du gold
function addGold(m)
{
    golds = golds+m;
    var b = 'son/ballonson.mp3';
    var audioElement = new Audio(b);
    audioElement.play();
    displayGolds();
}
//Affichage du gold
function displayGolds()
{
    let gold= document.querySelector("#gold");
    gold.innerText= Math.round(golds);
    
}
//acheter un joueur
function buyPlayer(identifiant)
{
    players.forEach(player => {
        if(player.id === identifiant)
        {
            if(golds >= player.cost)
            {
                player.owned += 1;
                //a chaque achat le nombre de gold diminue
                golds -= player.cost;
                player.cost= player.cost*1.15;
                //tous les 50 joueur le clique de la fonction addgold double
                min++;
                x = min/50;
                m=Math.pow(2, x);
                addGold(m);
                var po=player.owned;
                getGPS();
                displayGps();
                son(player.id);
                display_playerschange(player.id);
                //pour chaque palier de type de joueur le gps du type double
                if(po === 25 || po === 50||po === 100 || po === 250 || po === 1000)
                {
                    player.gps *= 2;
                }
                
            }
            else{
                alert("Vous n'avez pas assez de points");
            }
            
        }
        //pour l'affichage du gps; owned et du cost
        if(player.id === 0){
            document.getElementById("playercost_0").innerHTML=Math.round(player.cost);
            document.getElementById("playerowned_0").innerHTML=Math.round(player.owned);
            document.getElementById("gpsSC").innerHTML=(player.gps);
        
        }
        else if(player.id === 1){
            document.getElementById("playercost_1").innerHTML=Math.round(player.cost);
            document.getElementById("playerowned_1").innerHTML=Math.round(player.owned);
            document.getElementById("gpsKB").innerHTML=(player.gps);
        
        }
        else if(player.id === 2){
            document.getElementById("playercost_2").innerHTML=Math.round(player.cost);
            document.getElementById("playerowned_2").innerHTML=Math.round(player.owned);
            document.getElementById("gpsLBJ").innerHTML=(player.gps);
            
        }
        else if(player.id === 3){
            document.getElementById("playercost_3").innerHTML=Math.round(player.cost);
            document.getElementById("playerowned_3").innerHTML=Math.round(player.owned);
            document.getElementById("gpsMJ").innerHTML=(player.gps);
        }
        else if(player.id === 4){
            document.getElementById("playercost_4").innerHTML=Math.round(player.cost);
            document.getElementById("playerowned_4").innerHTML=Math.round(player.owned);
            document.getElementById("gpsNBA").innerHTML=(player.gps);
        }
    });
}
//localstorage
function display_playerschange(id) {
    document.getElementById("playercost_" + id).textContent= players[id].cost.toFixed(2);
    document.getElementById("playerowned_" + id).textContent= players[id].owned;
    }
//fonctions pour la sauvegarde et le load
function save() {
    localStorage.setItem("golds", golds);
    localStorage.setItem("gps", gps);
    let playersString = JSON.stringify(players);
    localStorage.setItem("playersString", playersString);
    }
function load() {
    golds = localStorage.getItem("golds");
    golds = parseInt(golds);
    displayGolds();
    
    gps = localStorage.getItem("gps");
    gps = parseInt(gps);
    displayGps();
    playersString = localStorage.getItem("playersString");
    players = JSON.parse(playersString);
i = 0
while ( players != null &&  i < players.length) {
document.getElementById("playercost_" + players[i].id).textContent= players[i].cost.toFixed(2);
document.getElementById("playerowned_" + players[i].id).textContent= players[i].owned;
i++;
}

}
//affichage du nb de gps
function displayGps()
{
    let gps_= document.querySelector("#gps");
    gps_.innerText= gps.toFixed(2);;
}
//recuperation du nombre de gps
function getGPS()
{
gps=0;
players.forEach(function(player)
{
gps += player.gps * player.owned;
});
}
//jouer un son a l'achat d'un joueur
function son(identifiant){
    players.forEach(player => {
        if(player.id === identifiant)
    {
        var a = player.son;
        var audioElement = new Audio(a);
        audioElement.play();
    }
        
    });
    
}
//sauvegarde toutes les 30 secondes
setInterval(function(){
    save();
    },30000);




