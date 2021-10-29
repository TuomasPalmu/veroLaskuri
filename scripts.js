// Luodaan event listenerit
document.getElementById("lähetä").addEventListener("click", tallenna);
document.getElementById("lataa").addEventListener("click", lataa);
document.getElementById("poistaKaikki").addEventListener("click", poistaKaikki);

//tallennus localstorageen
function tallenna () {
    //tarkistetaan tiedot esim. negatiivisten numeroiden varalta ja annetaan alert jos ei mene läpi
    if(document.getElementById("palkka").value <= 0){
        document.getElementById("palkka").style.borderColor = "red" ;
        alert("Palkan on oltava yli 0");
    } else if (document.getElementById("veroPros").value < 0 ){
        document.getElementById("veroPros").style.borderColor = "red" ;
        alert("Veroprosentin on oltava yli 0")
    } else
    //luodaan muuttujat jotka tallennetaan localStorageen
    var p = document.getElementById("palkka").value;
    var v = document.getElementById("veroPros").value;
    console.log("palkka on: " + p + " ja veroprosentti on: " + v);
    data = { palkka: p, vero: v};
    var old = JSON.parse(localStorage.getItem("tiedot"))||[];
    old.push(data);
    localStorage.setItem("tiedot", JSON.stringify(old));
    //Muutetaan syöttökenttien reunat takaisin siltä varalta että ne on muutettu punaisiksi aiemmin kun on syötetty vääränlaista  tietoa.
    document.getElementById("veroPros").style.borderColor = "lightgray" ;
    document.getElementById("palkka").style.borderColor = "lightgray" ;
    //nollataan syöttökentät
    palkka.value = "";
    veroPros.value = "";
    }


function lataa (){
    //luodaan muuttujat. Tämän tyylin katsoin sieltä LocalStorage leikkikenttä jutusta. Oli hankaluuksia saada toimimaan itse.
    var list = "<table><tr><th>Palkka </th><th> Vero %</th><th>Veron osuus</th><th>Palkka veron jälkeen</th></tr>\n";
    var parsed = JSON.parse(localStorage.getItem("tiedot"));
    //tarkistetaan onko kirkon jäsen
    var checked = document.getElementById("kirkkoVero").checked;
    console.log("checkbox : " + checked);
    if(checked==true){
        for( i = 0; i < parsed.length; i++) {
            //luodaan muuttujia, jotta laskut on helpompaa
            var palkka = parsed[i].palkka;
            //Käytetään parseInt metodia, sillä muuten yhteenlasku ei toimi vaan se lisää perään ykkösen. Esim. 14+1 tuottaa 141.
            var veroPros = parseInt(parsed[i].vero, 10)+1;
            var veroOsuus = parsed[i].palkka*(veroPros/100);
            list += "<tr><td><i>" + palkka + "</i></td>\n<td><i>" + (veroPros) + "</i></td>\n" + "<td><i>" + veroOsuus + "</td></i><td><i>" + (palkka-veroOsuus) + "</td></i></tr>\n";
        }
        list += "</table>";
        document.querySelector(".taulukko").innerHTML = list;

    } else{
    for( i = 0; i < parsed.length; i++) {
        var veroOsuus = parsed[i].palkka*(parsed[i].vero/100);
        var palkka = parsed[i].palkka;
        list += "<tr><td><i>" + parsed[i].palkka + "</i></td>\n<td><i>" + parsed[i].vero + "</i></td>\n" + "<td><i>" + veroOsuus + "</td></i><td><i>" + (palkka-veroOsuus) + "</td></i></tr>\n";
    }
    list += "</table>";
    document.querySelector(".taulukko").innerHTML = list;
}
}

function poistaKaikki(){
    //tyhjennetään localstorage
    localStorage.clear();
}