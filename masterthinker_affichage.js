function cTableauChaine(){
	var chaineAffichee = '';
	for(var i=0;i<tableauChaine.length;i++){
		chaineAffichee += tableauChaine[i];
	}
	return chaineAffichee;
}



function chaineCL(cl){
	var	chaineAffichee = '[';
	for(var i=0;i<cl.length;i++){
		chaineAffichee += cl[i].c;
		for(var j=0;j<cl[i].pb.length;j++){
			chaineAffichee += cl[i].pb[j];
		}
	}
	return chaineAffichee+"]";
}

function chaineCodeLettresLibres(cl){
	return cTableauChaine()+" "+chaineCL(cl);
}



/*Ajoute le scrambleur d'une manière HTML. 
Prérequis : le scrambleur est défini*/
function montrerScrambleur(){
	document.getElementById("div_infos").appendChild(document.createTextNode("Scrambleur : "+scrambleur+" ; nombre de clés : " +nbCles));
}



/*Affiche sous forme d'arbre*/
afficherArbres = function(tableauArbres,longueur){
	


	var drd = document.getElementById('div_reponse_devin');drd.innerHTML='';
	var chaineAffichee;
	var i,j;
	var ll;
	var tableauChaineHTML = [];
	for(i=0;i<longueur;i++)
		tableauChaineHTML.push('-');
	
	function cTableauChaineHTML(){
		var chaineAffichee = '';
		for(var i=0;i<tableauChaineHTML.length;i++){
			chaineAffichee += tableauChaineHTML[i];
		}
		return chaineAffichee;
	}
	
	function chaineCodeLettresLibresHTML(cl){
		return cTableauChaineHTML()+" "+chaineCL(cl);
	}

	//Affichage d'un noeud de l'arbre
	function afficherNoeud(decalage,arbreReponse){
		chaineAffichee = "";
		for(i=0;i<decalage;i++)
			chaineAffichee += "-|-";
		chaineAffichee+=arbreReponse.c+arbreReponse.p;
		drd.appendChild(document.createTextNode(chaineAffichee));
		drd.appendChild(document.createElement('br'));
	}

	//Affichage d'une feuille
	function afficherFeuille(decalage,arbre){
		ll=arbre.ll;
		chaineAffichee = "";
		for(i=0;i<decalage;i++)
			chaineAffichee += "-|-";
		chaineAffichee+=arbre.c+arbre.p;
		chaineAffichee += '( '+chaineCodeLettresLibresHTML(ll)+' )' + '('+nbPossibilites(cTableauChaineHTML(),ll)+')';
		drd.appendChild(document.createTextNode(chaineAffichee));
		drd.appendChild(document.createElement('br'));
	}


	//Fonction d'affichage d'un arbre. Préalablement
	afficherArbresAux = function(arbre,decalage){
		tableauChaineHTML[arbre.p]=arbre.c;			
		if(arbre.ll !== undefined){
			afficherFeuille(decalage,arbre);
		}
		else{
			afficherNoeud(decalage,arbre);
			for(var ind=0;ind<arbre.f.length;ind++){
				afficherArbresAux(arbre.f[ind],decalage+1);
			}
		}
		tableauChaineHTML[arbre.p]='-';		
	}

	//Affichage de tous les arbres
	for(glo=0;glo<tableauArbres.length;glo++){
		afficherArbresAux(tableauArbres[glo],0);
	}
	
}

	
/*Affichage II*/
afficherToutesCombis = function(tableauArbres,nbCles){

var drd = document.getElementById('div_reponse_devin');drd.innerHTML='';
var chaineAffichee = '';
var chaineTableau = new Array(nbCles);
var i,j,k;

/*Affiche le résultant des variables chaineTableau (globale à la fonction) et du contenu de ll(lettres libres) */
afficherChaine = function(ll){
	chaineAffichee = '';
	//Affichage du code
	for(i=0;i<nbCles;i++){
		chaineAffichee += chaineTableau[i];
	}
	//Affichage des lettres libres
	chaineAffichee += '(';
	for(i=0;i<ll.length;i++){
		chaineAffichee += ll[i].c;
		for(j=0;j<ll[i].pb.length;j++){
			chaineAffichee += ll[i].pb[j]+',';
		}
	}
	chaineAffichee += ')';
	drd.appendChild(document.createTextNode(chaineAffichee));
	drd.appendChild(document.createElement('br'));
}

/*Fonction récursive. Dernière feuille on affiche tout, sinon on descend d'un niveau.*/
afficherToutesCombisAux = function(arbreReponse){
	if(arbreReponse.ll !== undefined){
		chaineTableau[arbreReponse.p]=arbreReponse.c;
		afficherChaine(arbreReponse.ll);
		chaineTableau[arbreReponse.p]='-';
	}
	else{
		chaineTableau[arbreReponse.p]=arbreReponse.c;
		for(var ind=0;ind<arbreReponse.f.length;ind++)
			afficherToutesCombisAux(arbreReponse.f[ind]);
		chaineTableau[arbreReponse.p]='-';	
	}
}
	
/*Appel global*/
var glo;
for(glo=0;glo<nbCles;glo++)
	chaineTableau[glo]='-';
for(glo=0;glo<tableauArbres.length;glo++){
	afficherToutesCombisAux(tableauArbres[glo]);
}


}

