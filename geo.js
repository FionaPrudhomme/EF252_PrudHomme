window.onload = function() {

  //affichage de la carte MapQuest
    L.mapquest.key = 'RnwerNMzLxgxpJNtawQYjBUx4tvBKEBe';
    var map = L.mapquest.map('map', {
      center: [48.840606, 2.580433],
      layers: L.mapquest.tileLayer('map'),
      zoom: 2
    });
    //creation d'un groupe de couches
    var lay = L.featureGroup();
    //fonction pemettant le trie de la liste des déplacements verticaux selon leur vitesse, du plus petit au plus grand
    function sortByMVTZ(key1, key2){
      return ((key1.mvtz < key2.mvtz) ? -1 : ((key1.mvtz > key2.mvtz) ? 1 : 0));
    }
    //fonction qui renvoie une couleur en fonction de i (index), permet d'avoir une couleur différente par point selon la vitesse verticale
    function colorMark(i,vz){
      i+=150
      if(vz<=0){
        return "rgb(0,0,"+i+")";
      }
      if(vz>=0){
        return "rgb("+i+",0,0)";
      }
    }

    //initialisation de la variable arrow
    var arrow;

    //requete POST ajax permettant de récupérer un fichier test sous format JSON
    var requestURL = 'donneesTests.json';
    var request = new XMLHttpRequest();
    request.open('POST', requestURL, true);
    request.responseType = 'json';
    request.send();
    //fonction exécutée lors du chargement de la page et du fichier
    request.onload = function() {
      //récupération de la réponse ajax sous forme d'objet json
      var liste = request.response;
      //tri de la liste grâce à la fonction sortByMVTZ ci-dessus
      liste.sort(sortByMVTZ);
      //boucle parcourant la liste
      for(i=0;i<liste.length;i++){
          //création de cercles avec la lattitude et longitude du fichier (lat, lng) et assignation des couleurs selon la fonction de tri
          var marker = L.circle(new L.LatLng(liste[i].lat,liste[i].lng),{color :colorMark(i,liste[i].mvtz), radius: 70000});
          //création d'une flèche partant du centre du cercle jusqu'au point d'arrivé des variables lat1 lng1
          arrow = L.polyline([new L.LatLng(liste[i].lat,liste[i].lng), new L.LatLng(liste[i].lat1,liste[i].lng1)], {color: 'black', weight: 1.5});
          // tête de la flèche
          var arrowHead = L.polylineDecorator(arrow, {
            patterns: [
                {offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 8, polygon: false, pathOptions: {stroke: true, color: 'black', weight: 1.5}})}
            ]
        });
        //ajout des points et flèches à la carte
        lay.addLayer(arrow);
        lay.addLayer(arrowHead);
        lay.addLayer(marker);
        map.addLayer(lay);
      }
    }
  //option sur le zoom
  map.on('movestart moveend', function(ev){

    //recupération des bornes de la carte
    var bounds = map.getBounds();
    //nettoyage des couches
    lay.clearLayers();
    //requete ajax pour récupérer les données du fichier json
    var requestURL = 'donneesTests.json';
    var request = new XMLHttpRequest();
    request.open('POST', requestURL, true);
    request.responseType = 'json';
    request.send(bounds._northEast.lat,bounds._southWest.lat,bounds._southWest.lng,bounds._northEast.lng);
    //fonction exécutée lors du chargement de la page et du fichier
    request.onload = function() {
      //récupération de la réponse ajax sous forme d'objet json
      var liste = request.response;
      //tri de la liste grâce à la fonction sortByMVTZ ci-dessus
      liste.sort(sortByMVTZ);
      //boucle parcourant la liste
      for(j=0;j<liste.length;j++){
            //création de cercles avec la lattitude et longitude (lat lng) du fichier et couleur selon la fonction tri
            var marker = L.circle(new L.LatLng(liste[j].lat,liste[j].lng),{color :colorMark(j,liste[j].mvtz), radius: 70000});
            //création d'une flèche partant du centre du cercle jusqu'au point d'arrivé du fichier lat1 lng1
            arrow = L.polyline([new L.LatLng(liste[j].lat,liste[j].lng), new L.LatLng(liste[j].lat1,liste[j].lng1)], {color: 'black', weight: 1.5});
            // tête de la flèche
            var arrowHead = L.polylineDecorator(arrow, {
              patterns: [
                  {offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true, color: 'black', weight: 1.5}})}
              ]
          });
          //ajout des couches à la carte
          lay.addLayer(arrow);
          lay.addLayer(arrowHead);
          lay.addLayer(marker);
          map.addLayer(lay);
          }
      }

  })

  //fonction retournant une couleur selon la valeur de d
  function getColor(d) {
    return d > 100  ? '#960000' :
           d > 20   ? "#B40000" :
           d > 10   ? "#C80000" :
           d > 0    ? "#e60000" :
           d > -10  ? "#0000c8" :
           d > -20  ? "#0000B4" :
                      '#000096';

}
//création de la variable legande
  var legend = L.control({position: 'bottomright'});

  // création de la légende
  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [-100, -20, -10, 1, 10, 20, 100],
          labels = [];

      // boucle permettant la génération de la légende avec les couleurs adaptées
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };
  // ajout de la légende à la carte
  legend.addTo(map);


}
