/*Ajoute la clé c à la position position dans tableauChaine ; ajuste occurencesTC et nbPlacesLibres
Prérequis : tableauChaine[position] = '-'*/
function ajouterTableauChaine(position,c){
	//console.log("On essaie d'ajouter en tableauChaine "+c+position);
	tableauChaine[position] = c;
	occurencesTC[indiceScrambleur(c)]--;
	nbPlacesLibres--;
}

/*Retire la clé à la position position dans tableauChaine ; ajuste occurencesTC et nbPlacesLibres.
Prérequis : tableauChaine[position] != '-' OU on n'est pas dans un contexte de résolution*/
function retirerTableauChaine(position){
	//console.log("On essaie de retirer de tableauChaine "+tableauChaine[position]+position);
	occurencesTC[indiceScrambleur(tableauChaine[position])]++;
	tableauChaine[position]='-';
	nbPlacesLibres++;
}

/*Différence entre le nombre d'occurences de la clé dans proposition et dans tableauChaine*/
function nbRestantsEnProposition(cle){
	return occurencesTC[indiceScrambleur(cle)];
}

// ======================================
// Utile pour déterminer les positions bannies 

/*Renvoie la liste des positions de tableauChaine bannis jusqu'à la position en argument exclue (cette liste s'ajoutera aux positions bannies pour la clé testée puisqu'on aura déjà fait le test avant)
Exemple : si tableauChaine = 'ABCA--' et on passe 5 en paramètre, on aura [4]*/
function videsJusquA(position){
	var reponse = [];
	for(var i=0;i<position;i++)
		if(tableauChaine[i] == '-')
			reponse.push(i);
	return reponse;
}

/*Renvoie toutes les positions d'une clé dans la proposition, qui ne sont pas encore occupées dans tableuChaine 
(exemples : proposition = ABCADA, bp/mp = 1/1, tableauChaine = '-BA---' => positions('A') = [0,3,5] - seul la position 4 sera libre
 proposition = ABCADD bp/mp = 2/2, tableauChaine = 'DBC-A-' => positions('D') = [5] (la position 4 étant déjà prise par 'A')*/
function positionsProposition(carac){
	var resultat = [];
	for(i=0;i<nbCles;i++){
		if ((proposition.charAt(i) == carac) && (tableauChaine[i] == '-'))
			resultat.push(i);
	}
	return resultat;
}