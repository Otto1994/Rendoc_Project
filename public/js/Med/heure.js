function updateClock(){
    var now = new Date();
    var jour = now.getDay(),
        mois = now.getMonth(),
        dat = now.getDate(),
        annee = now.getFullYear(),
        heure = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds();
        


        Number.prototype.pad = function(digits){
          for(var n = this.toString(); n.length < digits; n = 0 + n);
          return n;
        }

        var moiis = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
        var semaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samdi"];
        var ids = ["nomdujour", "mois", "jour", "annee", "heure", "minutes", "secondes"];
        var values = [semaine[jour], dat.pad(2), moiis[mois], annee, heure.pad(2), min.pad(2), sec.pad(2)];
        for(var i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
  }

  function initClock(){
    updateClock();
    window.setInterval("updateClock()", 1);
  }