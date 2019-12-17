


/*Réinitialise tableauChaine, nbPlacesLibres et ajuste occurencesTC à la proposition
Prérequis : on est dans un contexte d'initialisation. On connait nbCles et valCles
*/
function resetTC(){
	tableauChaine = new Array(nbCles);
	occurencesTC = new Array(valCles);
	var i;
	for(i=0;i<nbCles;i++)
		tableauChaine[i] = '-';
	nbPlacesLibres = nbCles ; //En permanence égal au nombre de '-' dans tableauChaine.
	for(i=0;i<valCles;i++){
		occurencesTC[i] = 0;
	}
	for(i=0;i<nbCles;i++){
		occurencesTC[indiceScrambleur(proposition.charAt(i))]++;
	}
	console.log("Voici le tableau des occurences : ",occurencesTC);
}


/*
Adapte à position les valeurs de valMinTest et valMaxTest
Précondition : Une nouvelle valeur de "proposition" est en place dans tableauChaine. 
Postcondition : valMinTest = valMaxTest de la précédente proposition+1. Sauf si les 2 étaient déjà à valCles. (la 1ère fois, on considère que valMinTest = 0 et valMaxTest = après.
*/
function setValMinMax(){
	if(valMinTest < valCles){
		valMinTest = valMaxTest+1;
		valMaxTest = valMinTest;
		while((valMaxTest < valCles) && (occurencesTC[valMaxTest] > 0)){
			valMaxTest++;
		}
		valMaxTest--;			
	}
}

/*
Génère un code en suivant le scrambleur ou en plaçant des lettres aléatoires
Précondition : on sait que dans l'ordre du scrambleur aucune clé d'indice < valClemin n'est présent dans le code à trouver (appelé lorsque dejaForet est à false)
*/
function genererCodeSuivant(valCleMin){
	reponse = "";
	var alea;
	for(var i=0;i<nbCles;i++){
		if (i < valCles){
			reponse+=scrambleur[i+valCleMin];
		}
		else{
			alea = aleatoire(valCleMin,valCles-1);
			reponse+=scrambleur[alea];
		}
	}
	return reponse;
	
}