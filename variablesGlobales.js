/*
Constantes
*/
var posA = 65; 
var DEVIN_INDEFINI = -1; //Valeur du devin qui ne correspond à aucun état de code trouvé ou autre. 
var DEVIN_TROUVE_CHANCEUX = 0;
var DEVIN_TROUVE_CERTITUDE = 1;
var DEVIN_INTROUVABLE = 2;
var DEVIN_COMMUN = 3;
var DEVIN_CODE_INCOHERENT_PARAMS = 4;
var DEVIN_CODE_INCOHERENT_PROPOSITIONS = 5;
var DEVIN_ECHEC = 6;

/*
Liste de toutes les variables globales + initialisation de certaines d'elles.
*/
var foretGenerale = null; 
var dejaYggrasil = false; //vaut true si on a déjà une valeur d'foretGenerale existante, false sinon. Testée et mise à jour dans la fonction lorsqu'on soumet une nouvelle proposition.
var historique_propositions = []; //Liste des propositions du devin
var historique_bp = []; //Liste des "nombres de clés bien placées" correspondant au tableau historique_propositions
var historique_mp = []; //Liste des "nombres de clés mal placées" correspondant au tableau historique_propositions
var ancienneProposition; //????

var nbCles = 0; //Nombre de clés qui composent le code
var valCles = 0; //Nombre de valeurs différentes
var scrambleur = []; 
var retroScrambleur; /*Donne la position de chaque lettre de l'alphabet dans le scrambleur. Exemple : scrambleur = 'BHCAFDEG' => retroScrambleur = [3,0,2,5,6,4,7,1]*/

//Relatif à la sélection de code dans masterthinker_selection.js
var totalPossibilites; //Nombre total de possibilités dans le code
var possibilites //Valeur de retour de la fonction "nbPossibilites". Ajoutée à totalPossibilites, puis testée pour sélectionner aléatoirement un nouveau code.
var codePourSelection = []; // Tableau de lettres pour parcourir un code

var proposition;
var valMinTest = -1; //Indice dans le scrambleur de la première clé testée par cette proposition et non testée par les précédentes.
var valMaxTest = -1; //Indice dans le scrambleur de la dernière clé testée par toutes les propositions.
/*Les deux variables valent valCles si on a déjà testé toutes les clés à la proposition précédente
Exemple : 
1ère proposition = 'ABCDAB' : valMinTest = 0, valMaxTest = 3 pour la résolution ; car on teste les clés de A à D (à la 1ère résolution on a toujours valMinTest = 0)
2ème proposition = AEFDCG : valMinTest = 4, valMaxTest = 6 (car les nouvelles clés testées sont de E à G)
*/

var code; //Le code généré par le maître (lorsque le maître est une IA ou un humain)
var occurencesCode; //Tableau constant des occurences des lettres dans le code ; tableau ordonné naturellement et donc indépendant du scrambleur.

var tableauChaine; //Tableau utilisé dans la construction du code
var occurencesTC; 
/*Nombre de fois qu'il est encore possible de mettre chaque lettre dans tableauChaine ; tableau ordonné selon les valeurs du scrambleur 
(exemple : si scrambleur = 'ABCDEF', proposition = 'ABCDAB' on a au départ tableauChaine = '------' et donc occurencesTC = [2,2,1,1,0,0] ; 
si à un moment où tableauChaine= 'BBA---' on a occurencesTC = [1,0,1,1,0,0])*/
var nbPlacesLibres; //nombre de places libres dans tableauChaine




/*
document.getElementById s. Certains ne servent que dans un fichier.
*/
$(function(){
	var input_nbCles = $("#input_nbCles");
	var input_valCles = $("#input_valCles");
	var input_bons = $("#input_bons");
	var input_mauvais = $("#input_mauvais");
	var div_preparation = $("#div_preparation");
	var div_resume = $("#div_resume");
	var div_liste_propositions = $("#div_liste_propositions");
	var div_liste_propositions = $("#div_liste_propositions");
	var div_proposition = $("#div_proposition");
	var div_proposition_commune = $("#div_proposition_commune");
	var div_ultime_proposition = $("#div_ultime_proposition");
	var div_code_impossible = $("#div_code_impossible");
	var span_proposition = $("#span_proposition");
	var span_ultime_proposition = $("#span_ultime_proposition");
	var input_reponse_finale = $("#input_reponse_finale");
	var input_code_impossible = $("#input_code_impossible");

});


