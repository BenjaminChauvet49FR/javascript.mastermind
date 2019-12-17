/*Renvoie un entier aléatoire entre a et b inclus. Prérequis : a <= b*/
function aleatoire(a,b){
	return Math.floor(Math.random()*(b-a+1)+a);
}

/*Renvoie la concaténation de deux listes d'arbres, en modifiant la liste de gauche !*/
function concat(l1,l2){
	for(var i=0;i<l2.length;i++){
		l1.push(l2[i]);
	}
	return l1;
};

/*Renvoie l'union de deux listes croissantes (sans répéter les doublons)
cf. log ci-dessous pour exemple*/
function union(tabA,tabB){
	var reponse = [];
	var indiceA = 0;
	var indiceB = 0;
	var lA = tabA.length,lB=tabB.length;
	while((indiceA < lA) || (indiceB < lB)){
		if ((indiceA == lA) || (tabA[indiceA] > tabB[indiceB])){
			reponse.push(tabB[indiceB]);
			indiceB++;				
		}
		if (indiceA < lA){
			if ((indiceB == lB) || (tabA[indiceA] < tabB[indiceB])){
				reponse.push(tabA[indiceA]);
				indiceA++;				
			}
			if((indiceB < lB) && (tabA[indiceA] == tabB[indiceB])){
				reponse.push(tabA[indiceA]);
				indiceA++;
				indiceB++;
			}	
		}
	}
	return reponse;
}	
//console.log('Exemple d\'union : ',union([1,2,5,7,8,13,21,55,63,76],[2,4,7,9,13,55,89])); /*[1,2,4,5,7,8,9,13,21,55,63,76,89]*/




/*positionApresA('A')=0, positionApresA('C')=2, ..., positionApresA('Z') = 25 */
function positionApresA(caractere){
	return caractere.charCodeAt(0)-posA;
}


/*Renvoie la version triée selon les clés dans le scrambleur et épurée de doublons d'une liste libre*/
function trier(ll){
	var reponse = ll.sort(function(e,f){
		return (indiceScrambleur(e.c)-indiceScrambleur(f.c));
	});
	
	//Attention, on n'a pas épuré des doublons
	return ll;
	
}


