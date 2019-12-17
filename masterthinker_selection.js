/*
Fonctions relatives à la sélection du code
*/

/*
Pour un code + ensemble de clés libres donnés, le valMaxTest lors de l'essai précédent, donne le nombre de codes possibles.
Exemple : scrambleur ABCDEFGH, valMax = 3 : nbPossibilites(A-B- , [AB1]) = 5*6 = 20)
*/
function nbPossibilites(code,cl){
	var valDash = valCles-valMaxTest-1;
	if (valDash < 0){
		valDash = 0; //La valeur de valMaxTest une fois toutes les clés essayées n'est pas très catholique...
	}
	var reponse = 1;
	var valDashTmp;
	var i=0;
	while(i < nbCles && reponse > 0){
		if(code[i] == '-'){
			reponse *= (valDash+(cl.filter(function(e){return (e.pb.indexOf(i) == -1);}).length)); 			
		}
		i++;
	}
	return reponse;
}

/*
Fabrique un code à partir de clés déjà en place et de clés manquantes, à remplacer par des clés libres ou non encore testées dans l'ordre du scrambleur. 
Préconditions : 
-on est à l'extrêmité d'un rameau dans retournerCode
-il y a au moins une possibilité pour ce code-branche
-les nouvelles valeurs de valMinTest et valMaxTest sont connues.
-valMinScrambleur = Indice de scrambleur de la 1ère nouvelle lettre à exploiter
*/
function fabriquerProposition(tc,cl,valMinScrambleur){
	var reponse = "";
	var carac;
	var alea;
	var nbLibresLegacy;
	var nbClesNonExploitees = valCles-valMinScrambleur;
	var libresLegacy;
	if (nbClesNonExploitees < 0){
		nbClesNonExploitees = 0;		
	}
	var nbNvClesExploitees = 0; //Nombre de clés déjà rencontrées
	for(var i=0;i<nbCles;i++){
		if (tc[i] != "-"){
			carac = tc[i];
		}
		else{
			libresLegacy = cl.filter(function(e){return (e.pb.indexOf(i) == -1);});
			nbLibresLegacy = libresLegacy.length;
			alea = aleatoire(0,nbLibresLegacy+nbClesNonExploitees-1);
			//De 0 à nbLibresLegacy : on choisit une clé qui convient au pif dans cl. 
			//De nbLibresLegacy+1 à nbLibresLegacy+nbNouvellesClesExploitees : on choisit une clé nouvelle déjà présente dans le code
			//Sinon on choisit une nouvelle clé déjà exploitée
			//Sinon : on choisit la clé suivante et on augmente de 1 nbNvClesExploitees sans lui permettre de dépasser nbClesNonExploitees
			if (alea < nbLibresLegacy){
				carac = libresLegacy[alea].c;
			}
			else{
				if (alea < nbLibresLegacy+nbNvClesExploitees){
					carac = scrambleur[valMinScrambleur+alea-nbLibresLegacy];
				}
				else{
					carac = scrambleur[valMinScrambleur+nbNvClesExploitees];
					if (nbNvClesExploitees < nbClesNonExploitees){
						nbNvClesExploitees++;
					}
				}
			}
		}
		reponse+=carac;
	}
	return reponse;
	/*Exemple avec A-B--- [AB1], scrambleur ABCDEFGHIJKL, valMinScrambleur = 6
		nbClesNonExploitees = 6.
		Position 0 : A
		Position 1 : libresLegacy = [A], tirer un nombre au hasard de 0 à 6
		0 : on obtient A. 1 à 6 : on choisit G et on incrémente nbNvClesExploitees. Supposons qu'on obtienne de 1 à 6. On a donc G.
		Position 2 : B
		Position 3 : libresLegacy = [AB], nbNvClesExploitees = 1.
		Tirer un nombre au hasard de 0 à 7. 0 : on choisit A. 1 : on choisit B. 2 : on choisit G. 3 à 7 : on choisit H et nbNvClesExploitees++. Supposons qu'on obtienne de 3 à 7. On a donc H.
		Position 4 : libresLegacy = [AB], nbNvClesExploitees = 2.
		Tirer un nombre au hasard de 0 à 7. 0 : A. 1 : B. 2 : G. 3 : H. 4-7 : I et nbNvClesExploitees++. On obtient 2 : G.
		Position 5 : libresLegacy = [AB], nbNvClesExploitees = 2. (car on ne l'a pas incrémentée en 4).
		Tirer un nombre au hasard de 0 à 7. 0 : A. 1 : B. 2 : G. 3 : H. 4-7 : I et nbNvClesExploitees++. On obtient 4-7 : I.
		Ainsi, la proposition finale est AGBHGI.
	*/
	
	/*Un autre exemple critique avec le même scrambleur, cette fois valMinScrambleur = 10
	AJE--- [E4J5]
	nbClesNonExploitees = 2.
	Positions 0 à 2 : A,J,E. 
	Position 3 : libresLegacy = [AEJ], tirer un nombre au hasard de 0 à 5.
	0 A, 1 E, 2 J, 3-4 K. On obtient 4 : K et nbNvClesExploitees = 1
	Position 4 : libresLegacy = [AJ], tirer un nombre au hasard de 0 à 4.
	0 A, 1 J, 2 K, 3 L. On obtient 3 : L et nbNvClesExploitees = 2
	Position 5 : 
	0 A, 1 E, 2 K, 3 L. 
	Imaginons qu'il y ait une 6ème clé derrière la position 5 : on n'augmenterait en aucun cas nbNvClesExploitees.
	*/
	
}
 
/*
Initialise le tableau de lettres codePourSelection
*/
function preparerCodePourSelection(){
	codePourSelection = [];
	totalPossibilites = 0;
	for(var i=0;i<nbCles;i++)
		codePourSelection.push("-");	
}

/*
Choisit un code parmi la forêt de foretGenerale (avant les nouvelles valeurs de valMinTest et de valMaxTest).
Précondition : 
-premier appel : foret correspond à foretGenerale
-foret est non null 
-tableau codePourSelection correspond à ------ 
*/


function retournerCode(foret){
	var alea; //Utilisée dans 
	
	for(var i=0;i<foret.length;i++){
		codePourSelection[foret[i].p] = foret[i].c;
		if (foret[i].f != null && foret[i].f != undefined){
			retournerCode(foret[i].f);
		}
		else{
			possibilites = nbPossibilites(codePourSelection,foret[i].ll);
			totalPossibilites += possibilites;
			alea = aleatoire(1,totalPossibilites);
			if (alea<=possibilites){
				proposition = fabriquerProposition(codePourSelection,foret[i].ll,valMaxTest+1);
			}
		}
		codePourSelection[foret[i].p] = "-";
	}
}