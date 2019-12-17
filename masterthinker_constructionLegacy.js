
/*
Renvoie une liste d'arbres correspondant au contexte.
Dans une future version, je fusionnerai ce code avec celui de la construction classique (ie du 1er arbre)

Renvoie [] si aucune solution ne convient. (ce n'est pas pareil que d'avoir bp et mp à 0)
Précondition : bp > 0 ou mp > 0 (ou inclusif bien sûr)
*/
function construireLegacy(bpExplo,mpExplo,llLegacy,llNouv){
	
	var lll = llLegacy.length;
	

	
	//Précondition : bpRestantes > 0, mpRestantes >= 0 , bpRestantes >= -mpRestantes
	function construireLegacyBP(bpRestantes,mpRestantes,llNouv,positionPremier){
		if (nbCles-positionPremier<bpRestantes){
			return [];
		}
		if (bpRestantes < -mpRestantes){
			return [];
		}
		if(tableauChaine[positionPremier] != '-' || !isCleLibre(proposition.charAt(positionPremier),positionPremier,llLegacy) ){ 
			return construireLegacyBP(bpRestantes,mpRestantes,llNouv,positionPremier+1);
		}
		debugExplo("("+cTableauChaine()+") On est dans construireLegacyBP("+bpRestantes+","+mpRestantes+",legacy : "+chaineCL(llLegacy)+",nouveau : "+chaineCL(llNouv)+")");

		var reponse = [];
		var carac;
		var fait;
		var valide;
		indenterExplo();
		for(var ip = positionPremier;ip<nbCles;ip++){
			if (tableauChaine[ip] == '-' && isCleLibre(proposition.charAt(ip),ip,llLegacy)){
				fait = false;
				carac = proposition.charAt(ip);
				ajouterTableauChaine(ip,carac);
				
				//Cas de la dernière clé bp
				if (bpRestantes == 1){
					//Si on invalide une clé MP
					if(nbClesMP(carac) > 0 && nbRestantsEnProposition(carac) < 0){
						invaliderCleMP(carac);
						var llNouv2 = copie(llNouv);
						testerAbsenceEtAjouterLL_BP(carac,llNouv2);
						if(mpRestantes == -1){
							var llFinal = intersectionLL(llLegacy,llNouv2); //Ne garder que l'intersection des anciennes lettres libres et des nouvelles, positions prises en compte.
							llFinal = purge(llFinal);
							reponse.push({c:carac,p:ip,ll:llFinal});
							debugExploValidation(llFinal);		
						}else{
							var rameau = construireLegacyMP(mpExplo+1,llNouv2,0,valMinTest,0);
							if (rameau.length > 0){
								reponse.push({c:carac,p:ip,f:rameau});														
							}
						}
						validerCleMP(carac);
					}
					else{
						//On n'a pas invalidé de clé MP. Espérons qu'on n'en avait pas en excès.
						if(mpRestantes > 0){
							var llNouv2 = copie(llNouv);
							testerAbsenceEtAjouterLL_BP(carac,llNouv2);
							llNouv2 = purge(llNouv2);
							var rameau = construireLegacyMP(mpExplo,llNouv2,0,valMinTest,0);				
							if (rameau.length > 0){							
								reponse.push({c:carac,p:ip,f:rameau});
							}
						}
						if(mpRestantes == 0){
							var llNouv2 = copie(llNouv);
							testerAbsenceEtAjouterLL_BP(carac,llNouv2);
							var llFinal = intersectionLL(llLegacy,llNouv2); //Ne garder que l'intersection des anciennes lettres libres et des nouvelles, positions prises en compte.
							llFinal = purge(llFinal);
							reponse.push({c:carac,p:ip,ll:llFinal});
							debugExploValidation(llFinal);							
						}
						if(mpRestantes < 0){
							reponse = [];
						}
					}
					fait = true;
				}
				//Cas où il reste des clés bp derrière
				if (!fait){
					if (nbClesMP(carac) > 0 && nbRestantsEnProposition(carac) < 0){
						invaliderCleMP(carac);
						llNouv2 = copie(llNouv);
						testerAbsenceEtAjouterLL_BP(carac,llNouv2);
						llNouv2 = purge(llNouv2);
						var rameau = construireLegacyBP(bpExplo-1,mpExplo+1,llNouv2,ip+1);
						if (rameau.length > 0){
							reponse.push({c:carac,p:ip,f:rameau});														
						}
						validerCleMP(carac);
					}
					else{
						llNouv2 = copie(llNouv);
						testerAbsenceEtAjouterLL_BP(carac,llNouv2);
						llNouv2 = purge(llNouv2);
						var rameau = construireLegacyBP(bpExplo-1,mpExplo,llNouv2,ip+1);	
						if (rameau.length > 0){
							reponse.push({c:carac,p:ip,f:rameau});							
						}
					}
				}
				retirerTableauChaine(ip);
			}
		}
		desindenterExplo();
		return reponse;
	}

	
	
	
	//Précondition : si indiceLegacy = -1, on regarde indiceScrambleur. Sinon, on regarde indiceLegacy.
	//nbRestants > 0
	function construireLegacyMP(nbRestants,llNouv,indiceLegacy,indiceScrambleur,indicePremier){
		
		var reponse = [];

		/*
		Ajoute à reponse les bons noeuds.
		il et is : indique dans quel indice on est (legacy ou scrambleur)
		*/
		function retournerEffectivementMP(il,is){
			ajouterTableauChaine(ip,carac);	
			if (nbRestants == 1){
				var llNouv2 = copie(llNouv);
				testerAbsenceEtAjouterLL_MP(carac,llNouv2,ip);
				var llFinal = intersectionLL(llLegacy,llNouv2);
				llFinal = purge(llFinal);
				reponse.push({c:carac,p:ip,ll:llFinal});
				debugExploValidation(llFinal);								
			}
			else{
				var llNouv2 = copie(llNouv);
				testerAbsenceEtAjouterLL_MP(carac,llNouv2,ip);
				var rameau = construireLegacyMP(nbRestants-1,llNouv2,il,is,ip+1);
				if (rameau.length != 0){ //Avant j'écrivais "rameau != []" ce qui avait pour conséquence de laisser les rameaux morts.
					reponse.push({c:carac,p:ip,f:rameau});
				}							
			}
			retirerTableauChaine(ip);			
		}
		
		//Sauver une lettre superflue
		// Exemple : si proposition = CBFGH, qu'on explore AD [AD3] (à la suite d'une proposition ABCDE OX) 
		// et qu'on est dans tableauChaine= ADF-- (et donc nbRestants = 1) : le D est superflu. Il faut tout de même le sauver.
		// Note : dans l'exemple précédent, il ne faudrait pas que F soit présent 2 fois dans llNouv : la 1ère fois par le F de ADF-- et la 2nde fois par l'exploration du scrambleur.
		function sauverLettreSuperflue(){
			if(llNouv.filter(
				function(e){
					return e.c == carac;
				}).length == 0)
			{
				llNouv.push({c:carac,pb:union(videsJusquA(ip),positionsProposition(carac))});
			}
		}
		
		
		if (indiceLegacy == -1 && indiceScrambleur > valMaxTest){ // Si on a atteint le dernier indiceScrambleur : échec. //Après la redéfinition de valMinTest/valMaxTest il a fallu que j'ajoute la condition sur indiceLegacy
			return [];
		}
		if(indiceLegacy >= lll){ // Si on a atteint le dernier indiceLegacy : passer aux indiceScrambleur.
			return construireLegacyMP(nbRestants,llNouv,-1,valMinTest,indicePremier);
		}
		if(indicePremier >= nbCles){ //Si on a atteint le dernier indicePremier : augmenter de 1 le llLegacy ou le indiceScrambleur puis passer à la suite.
			if (indiceLegacy != -1){
				return construireLegacyMP(nbRestants,llNouv,indiceLegacy+1,0,0);
			}
			else{
				return construireLegacyMP(nbRestants,llNouv,-1,indiceScrambleur+1,0);				
			}
		}
//		var nvCarac = proposition.charAt(indicePremier);
//		if(tableauChaine[indicePremier] != '-' || !isCleLibre(nvCarac,indicePremier,llLegacy)){ //Si tableauChaine[indicePremier] est pris : passer au suivant
		if(tableauChaine[indicePremier] != '-'){ 
			return construireLegacyMP(nbRestants,llNouv,indiceLegacy,indiceScrambleur,indicePremier+1);
		} 
		debugExplo("("+cTableauChaine()+") On est dans construireLegacyMP("+nbRestants+", nouveau : "+chaineCL(llNouv)+")");	
		
		//Définition des clés libres :
		//A chaque lettre libre testée (de manière utile) :
		//S'il reste 0 occurence, l'ajouter en banissant toutes les positions < indicePremier (afin d'éviter les doublons)
		//A chaque nouvelle valeur de clé testée : 
		//S'il reste 0 occurence, l'ajouter dans ce rameau en banissant toutes les positions < indicePremier (afin d'éviter les doublons)
		//Veiller à supprimer les positions où les clés sont bp
		var carac;
		var ip;
		indenterExplo();
		if(indiceLegacy != -1){
			//On explore les clés legacy
			var positionsBannies = llLegacy[indiceLegacy].pb;
			carac = llLegacy[indiceLegacy].c;
			if (nbRestantsEnProposition(carac) > 0){ //S'il n'y a plus d'occurences de ce caractère, il n'y aura plus de MP.
				for(ip=indicePremier;ip<nbCles;ip++){
					// Retourner les bons (Legacy en cours) (ce code + les 4 autres "retourner les bons" = quasi-dupliqué !)
					if (tableauChaine[ip] == '-' && (proposition.charAt(ip) != carac) && positionsBannies.indexOf(ip) == -1){
						retournerEffectivementMP(indiceLegacy,0);
					}
				}				
			}
			else{ //On a mis une lettre inutile, mais il ne faudrait pas pour autant virer. Il ne faut pas non plus la mettre si elle est déjà présente dans llNouv.
				sauverLettreSuperflue();
			}
			for(var il = indiceLegacy+1;il<lll;il++){
				carac = llLegacy[il].c;
				var positionsBannies = llLegacy[il].pb;
				if (nbRestantsEnProposition(carac) > 0){
					for(ip=0;ip<nbCles;ip++){
						// Retourner les bons (Legacy suivants)
						if (tableauChaine[ip] == '-' && (proposition.charAt(ip) != carac) && positionsBannies.indexOf(ip) == -1){
							retournerEffectivementMP(il,0);
						}
					}
				}
				else{ 
					sauverLettreSuperflue();
				}
			}
			if (valMinTest < valCles){
				for(var is=valMinTest;is<=valMaxTest;is++){
					carac = scrambleur[is];
					if(nbRestantsEnProposition(carac) > 0){
						for(ip=0;ip<nbCles;ip++){
							//Retourner les bons (Scrambleur post legacy)
							if (tableauChaine[ip] == '-' && (proposition.charAt(ip) != carac)){
								retournerEffectivementMP(-1,is);
							}
						}
					}
					else{ 
						sauverLettreSuperflue();
					}
				}				
			}
		}			
		else{
			//On explore les clés du scrambleur directement

			if (valMinTest < valCles){
				for(ip=indicePremier;ip<nbCles;ip++){
					//Retourner les bons (Scrambleur en cours)
					carac = scrambleur[indiceScrambleur];
					if(nbRestantsEnProposition(carac) > 0){
						for(ip=0;ip<nbCles;ip++){
							//Retourner les bons
							if (tableauChaine[ip] == '-' && (proposition.charAt(ip) != carac)){
								retournerEffectivementMP(-1,indiceScrambleur);
							}
						}
					}
					else{ 
						sauverLettreSuperflue();
					}
				}
				for(var is=indiceScrambleur+1;is<=valMaxTest;is++){
					carac = scrambleur[is];
					if(nbRestantsEnProposition(carac) > 0){
						for(ip=0;ip<nbCles;ip++){
							//Retourner les bons (Scrambleur suivant)
							if (tableauChaine[ip] == '-' && (proposition.charAt(ip) != carac)){
								retournerEffectivementMP(-1,is);
							}
						}	
					}
					else{ 
						sauverLettreSuperflue();
					}
				}
					
			}
		}
		desindenterExplo();
		return reponse;
	}
	
	
	
	
	if(bpExplo > 0){
		return construireLegacyBP(bpExplo,mpExplo,llNouv,0);		
	}
	else{
		return construireLegacyMP(mpExplo,llNouv,0,valMinTest,0);
	}
}
