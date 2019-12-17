/*
Contient l'ensemble des instructions lorsqu'on démarre une partie
*/

/*
Implémentation du début de la partie (pour le masterthinker)
Post-condition :
-scrambleur défini
-proposition définie
*/
function demarrerPartie(parametres){
	valCles = parseInt(parametres.valeurCles);
	nbCles = parseInt(parametres.nombreCles);
	definirScrambleur();
	valMinTest=-1;
	valMaxTest=-1;
	proposition = genererCodeSuivant(0);
	foretGenerale = null;
	dejaYggrasil = false;
	historique_propositions = []; //Liste des propositions du devin
    historique_bp = []; //Liste des "nombres de clés bien placées" correspondant au tableau historique_propositions
    historique_mp = [];
	tableauChaine = [];
	occurencesTC = [];
	nbPlacesLibres = 0;
}





/*
Définit le scrambleur et le rétroscrambleur ; affiche le scrambleur.
Prérequis : aucun scrambleur n'est défini. chaineScrambleur est une permutation des 1ères lettres de l'alphabet sans en oublier ni en répéter. Exemple : 'BDCEFA' ou 'CHBAIEGF' ou 'ABCDEFGHIJKL'*/
function definirScrambleur(){
	var i,j,alea;
	var reste = valCles; //Nombre restant de lettres
	var pos; //Position dans le placement de chaque lettre
	scrambleur = new Array(valCles);
	retroScrambleur = new Array(valCles);
	for(i=0;i<valCles;i++){
		scrambleur[i] = '-';
	}
	
	//Choisir l'un des deux scrambleurs ci-dessous : alphabétique ou aléatoire
	if (scrambleurAlea){
		for(i=0;i<valCles;i++){ //Glisser aléatoirement les valeurs A,B,... dans scrambleur.
			alea = aleatoire(1,reste);
			pos = 0;
			for(j=0;j<alea;j++){
				while(scrambleur[pos]!='-')
					pos++;
				pos++;
			}
			reste--;
			pos--;
			scrambleur[pos]=String.fromCharCode(i+posA);
		}		
	}
	else{
		for(i=0;i<valCles;i++){ //Scrambleur alphabétique ([A,B,...])
			scrambleur[i] = String.fromCharCode(i+posA);
		}	
	}
	
	
	debugScrambleur("Scrambleur : "+scrambleur);
	for(i=0;i<valCles;i++){
		retroScrambleur[positionApresA(scrambleur[i])] = i;
	}
	/*Affichage*/
	debugScrambleur("Voici le tableau de rétroScrambleur : ",retroScrambleur);
}	


/*Renvoie l'indice de la lettre dans le scrambleur. 
Exemple : si scrambleur = 'CDFAEB', indiceScrambleur('A') = 3, indiceScrambleur('E') = 4...*/
function indiceScrambleur(lettre){
	return retroScrambleur[positionApresA(lettre)];
}