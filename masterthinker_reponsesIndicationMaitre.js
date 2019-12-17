/*
Ce fichier contient toutes les réactions du devin par rapport aux indications du maître. 
*/

/*
Contexte : le maître a donné au devin des valeurs BP et MP par rapport à sa dernière proposition.
Il réfléchit à la suite en conséquence, cad redessine Foret et affirme s'il n'y a plus qu'une proposition, plusieurs (cas standard) ou aucune.
Retourne si le devin a trouvé la solution, a plusieurs possibilités, n'en a plus, etc... cf. constantes
Il n'y a QUE de l'intelligence dans cette fonctions
Précondition : les valeurs de BP et de MP sont cohérentes par rapport à nbCles (une incohérence comme bp=3 mp=1 pour nbCles=4 ne passe pas car déjà filtrée en amont)

Postcondition : 
-en cas de trouvaille chanceuse, proposition n'est pas modifiée. Si elle apparaît déjà à l'écran, attention à ne pas la ressortir.
-en cas de trouvaille certaine, proposition est modifiée dans le bon code.
-en cas de non-trouvaille, proposition ne vaut rien d'important.
-en cas de trouvaille commune (il reste plusieurs possibilités), proposition vaut la nouvelle proposition, à soumettre au maître

*/	
function reagirABPMP(bp,mp){
	if(bp==nbCles && mp==0){
		return DEVIN_TROUVE_CHANCEUX;
	}
	else{
		testerPropositionEtConstruireForet(bp,mp); //c'est ici qu'Foret est construit
		var ancienneProposition=proposition;
		preparerCodePourSelection();
		dejaYggrasil = (dejaYggrasil || (foretGenerale != null && foretGenerale.length > 0));
		
		if (dejaYggrasil){
			retournerCode(foretGenerale);
			debugExplo("Nombre de possibilités = "+totalPossibilites);
			if (totalPossibilites == 1){
				ajouter_proposition(bp,mp,ancienneProposition);
				return DEVIN_TROUVE_CERTITUDE;	
			}
			else if (totalPossibilites == 0){
				ajouter_proposition(bp,mp,ancienneProposition);
				return DEVIN_INTROUVABLE;
			}
			else{
				ajouter_proposition(bp,mp,ancienneProposition);
				return DEVIN_COMMUN;
			}
		}
		else{
			proposition = genererCodeSuivant(valMaxTest+1);
			ajouter_proposition(bp,mp,ancienneProposition);
			return DEVIN_COMMUN;
		}		
	}
}

/*
Construit la forêt d'arbres foretGenerale
Précondition : proposition est correctement initialisée
Postcondition : foretGenerale contient un ensemble de possibilités
*/
function testerPropositionEtConstruireForet(nbB,nbM){
	if (foretGenerale != null && foretGenerale.length > 0){
		console.log("====Exploration avec "+proposition+" "+nbB+"/"+nbM+"====");
		resetTC();
		setValMinMax();
		foretGenerale = explorer(foretGenerale,nbB,nbM);
	}
	else{
		console.log("====Construction avec "+proposition+" "+nbB+"/"+nbM+"====");
		resetClesMP();
		resetTC();
		setValMinMax();
		foretGenerale = construirePossibilites(nbB,nbM,[]);
	}	
}


/*
Ajoute un code dans les tableaux d'historique
Condition : toujours appelé aux côtés de ajouter_propositionHTML ou dérivé
*/
function ajouter_proposition(bp,mp,proposition){
	historique_propositions.push(proposition);
	historique_bp.push(bp);
	historique_mp.push(mp);
}

/*
Lorsque le maître donne le code que le devin était supposé trouver, le devin teste la validité de ce code vis-à-vis des nombres et valeurs des clés, mais aussi des propositions du devin.
*/

/*
Contexte : le maître n'a pas trouvé la solution, ou est certain d'une solution qui n'est pas la bonne
Teste si le code proposé - par le maître - est : 1) cohérent vis-à-vis de nbCles et valCles 2) cohérent vis-à-vis de toutes les propositions
Aucune forme !
Retourne la réponse du devin
*/
function testerCoherenceCodeMaitre(propositionMaitre){
	if (!testerCoherenceAuxParams(propositionMaitre)){
		return DEVIN_CODE_INCOHERENT_PARAMS;
	}
	else{
		var ok = true;
		var i = 0;
		while(i < historique_bp.length && ok){
			ok = testerCoherenceAuCodeUltime(historique_propositions[i],historique_bp[i],historique_mp[i],propositionMaitre);
			if (ok){
				i++;
			}
		}
		if (!ok){
			return {type:DEVIN_CODE_INCOHERENT_PROPOSITIONS,
					proposition : historique_propositions[i],
					bp : historique_bp[i],
					mp : historique_mp[i]};
		}
		else{
			return DEVIN_ECHEC;
		}
	}
}

/*
Teste si la proposition de gauche est correcte en termes de bp et de mp à celle de droite
*/
function testerCoherenceAuCodeUltime(proposition,bp,mp,codeFinal){
	var dejaPris = []; //Indique si une clé est prise par les bp
	var vraisBP = 0;
	var vraisMP = 0;
	var occurencesMP = new Array(valCles);
	var i;
	for(i=0;i<valCles;i++){
		occurencesMP[i] = 0;
	}
	//Passe des bp et signalisation des lettres MP dans proposition
	for(i=0;i<nbCles;i++){
		if (proposition.charAt(i) == codeFinal.charAt(i)){
			vraisBP++;
			dejaPris.push(true);
		}
		else{
			dejaPris.push(false);
			occurencesMP[positionApresA(codeFinal.charAt(i))]++;
		}
	}
	if (vraisBP != bp){
		return false;
	}
	//Passe des mp
	for(i=0;i<nbCles;i++){
		if(!dejaPris[i] && occurencesMP[positionApresA(proposition.charAt(i))] > 0){
			vraisMP++;
			occurencesMP[positionApresA(proposition.charAt(i))]--;
		}
	}
	return vraisMP == mp;
}
	
/*
Teste si une proposition est cohérente avec les valeurs de nbCles et valCles
*/
function testerCoherenceAuxParams(propositionHumain){
	if (propositionHumain.length != nbCles){
		return false;
	}
	var i=0;
	var ok = true;
	var posApresA;
	while(i<nbCles && ok){
		posApresA = positionApresA(propositionHumain.charAt(i));
		if (posApresA < 0 || posApresA >= valCles){
			ok = false;
		}
		else{
			i++;
		}
	}
	return ok;
}

