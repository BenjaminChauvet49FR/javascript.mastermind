/*Copie intégralement la liste libre. Avant, je faisais un simple ll.slice, ce qui était une mauvaise idée, puisque ça copiait les références sur les objets mais pas les objets eux-mêmes. Puisque chaque objet contenait un tableau, modifier le tableau dans l'objet avait des répercussions sur les utilisations ultérieures.*/
function copie(ll){
	var reponse = [];
	var k,l=ll.length;
	for(k=0;k<l;k++){
		reponse.push({c:ll[k].c,pb:ll[k].pb.slice()});
	}
	return(reponse);
}

/*Renvoie toutes les positions possibles d'une clé libre (exclut les positions présentées dans l'argument pb (positions bannies) et les positions occupées dans tableauChaine).
Exemple : si tableauChaine = '-AB---', positionsNonBannies([0,5]) = [3,4];*/
function positionsNonBannies(pb){
	var reponse = [];
	for(i=0;i<nbCles;i++){
		if ((tableauChaine[i] === '-') && (pb.indexOf(i) == -1))
			reponse.push(i);
	}
	return reponse;
}

/*
Renvoie une liste purgée, selon 2 aspects :
-Pour chaque clé:
	-bannit les places déjà prises (dans tableauChaine)
	-bannit la clé si toutes les places restantes sont prises dans tableauChaine
*/
function purge(mm){
	var ll=mm;
	var l = ll.length; //Longueur de ll;
	var carac;
	var i,j;
	var index;
	for(i=0;i<l;i++){
		carac = ll[i].c;
		var indexof;
		for(j=0;j<nbCles;j++){ //inspecter chaque clé du code
			if (tableauChaine[j] !== "-"){ //place occupée dans le code ? On retire cette position des "positions bannies" 
				index = ll[i].pb.indexOf(j);
				if ((index >= 0))
					ll[i].pb.splice(index, 1);
			}
		}
	}
	
	//Plus de positions bannies que de places libres dans tableauChaine : on bannit
	ll = ll.filter(function(e){
		return (e.pb.length < nbPlacesLibres);
	});
	return ll;
}	

/*
Dit si une clé est libre à une position donnée dans une liste triée par ordre du scrambleur puis des positions bannies
*/
function isCleLibre(cle,position,ll){
	var is = indiceScrambleur(cle);
	if (is >= valMinTest){
		return true;		
	}
	else{
		var i = 0;
		while(i < ll.length){
			if (ll[i].c == cle){
				return(ll[i].pb.indexOf(position) == -1);
			}
			i++;
		}		
	}
	return false;
}

/*
Teste si une clé n'est plus présente dans la proposition et ce cas, l'ajouter aux lettres libres
*/
function testerAbsenceEtAjouterLL_BP(carac,cl){
	if(nbRestantsEnProposition(carac) == 0){ //1910545 <= ou == ? 
		cl.push({c:carac,pb:[]});
	}
}

function testerAbsenceEtAjouterLL_explo(carac,cl){
	if(nbRestantsEnProposition(carac) <= 0){  
		for(var i=0;i<cl.length;i++){
			if (cl[i].c == carac)
				return;
		}
		cl.push({c:carac,pb:[]});
	}
}

/*
Idem mais : on bannit les positions "jusqu'à" et on retire la clé si présente dans le code.
Précondition : tableauChaine[ip] est pris.
*/
function testerAbsenceEtAjouterLL_MP(carac,cl,ip){
	if(nbRestantsEnProposition(carac) == 0){
		cl.push({c:carac,pb:union(videsJusquA(ip),positionsProposition(carac))});
	}
}

/*
Renvoie l'intersection des anciennes lettres libres et des nouvelles
*/
function intersectionLL(llLegacy,llNouv){
	//return [{c:"Intersection de "+chaineCL(llLegacy)+" & "+chaineCL(llNouv),pb:[]}];
	var reponse = [];
	var carac;
	var i,j;
	for(i = 0;i<llNouv.length;i++){
		carac = llNouv[i].c;
		if (indiceScrambleur(carac) >= valMinTest){
			reponse.push({c:carac,pb:llNouv[i].pb.slice()});
		}
		else{
			for(j=0;j<llLegacy.length;j++){
				if(llLegacy[j].c == carac){
					reponse.push({c:carac,pb:union(llNouv[i].pb,llLegacy[j].pb)});
				}
			}
		}
	}
	return reponse;
}