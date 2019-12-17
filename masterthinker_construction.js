/*Avant, il n'y avait pas de llLegacy (nulle part) ni de indiceAncien (dans construireArbreBP/MP)*/	
	
/*Renvoie l'arbre de combinaisons en sachant qu'il reste nbRestants (>= 1) lettre(s) à placer, qu'il y aura nbMal arbres à placer, et qu'il faut tenir compte de ll.
Prérequis : tableauChaine est dans un certain état (éventuellement vierge), il faudra penser à essayer les clés libres contenues dans llLegacy

*/
function construirePossibilites(bp,mp,llLegacy){
	var reponse = [];
	var i,j,k; //Variables de boucles for dont la variable n'est pas mémorisée dans un appel successif.
	
	/*-----------
	Sous-fonctions principales
	
	Renvoie un tableau d'arbres construit récursivement correspondant au rameau (éventuellement le tronc) en cours. 
	Pour rappel, le rameau peut être : 
	-un tronc (llLegacy est toujours vide), 
	-une succession de noeuds qui a abouti à une certaine valeur de tableauChaine (llLegacy peut être rempli dans le cas des clés répétées, et est vide sinon) ; 
	
	nbRestants : le nombre de clés bien placées dans <proposition> non encore présentes dant tableauChaine
	indicePremier : position à partir de laquelle toutes les *clés bien placées* seront situées
	llNouv : valeurs des "lettres libres" contenues dans le rameau lors de l'appel à la fonction (une version alourdie ou épurée sera transmise au futur appel)
	
	Préconditions : 
	- tableauChaine

	*/
	function construireArbreBP(nbRestants,indicePremier,llNouv){

		var reponse = [];
		var ll;
		var pos;
		var carac;
		var npb; //Liste des positions non bannies.
		ll = llNouv.slice();
		var iq;
		
		//Cas non-logué : on a atteint la fin : 
		if(indicePremier >= nbCles){
			return [];
		}
		//Cas non-logué : tableauChaine[indicePremier] est occupé => essayer avec une bonne clé à la position suivante
		if (tableauChaine[indicePremier] != '-'){
			reponse = concat(reponse,construireArbreBP(nbRestants,indicePremier+1,llNouv)); 			
		} 
		
		debugConst("("+cTableauChaine()+") On est dans construireArbreBP("+nbRestants+","+chaineCL(llNouv)+")");
		
		//Cas où on fonce dans le mur (il n'y a plus assez de trous dans tableauChaine pour positionner les bonnes clés) => oublier cette possibilité
		if (indicePremier+nbRestants > nbCles){
			"NON, il n'y aura plus assez de trous pour accueillir les BP";
			return [];			
		}

		//Exploration des clés à partir de la position indicePremier. Pour chaque position d'indicePremier à (nbCles-nbRestants), on va placer une clé puis retourner la liste des rameaux correspondants
		ll = llNouv.slice();
		for(var ip=indicePremier;ip<=nbCles-nbRestants;ip++){ 
			carac = proposition.charAt(ip);
			ajouterTableauChaine(ip,carac);
			//A propos des "positions bannies" : si tableauChaine contient autant d'occurences de la clé de la proposition, on n'a pas à se soucier des futures occurences et donc on peut sortir la lettre des positions bannies.
			if (nbRestantsEnProposition(carac) == 0)
				ll.push({c:carac,pb:[]});			
			if (nbRestants > 1){ //Il reste des clés bp
				indenterConst();
				var rameau = construireArbreBP(nbRestants-1,ip+1,ll);
				desindenterConst();
				if (rameau !== []){
					reponse.push(	{c:carac,
								p:ip,
								f:rameau});
				}
			}	
			else{
				if (mp > 0){ //Il n'y a plus de clés bp et au moins une mp
					indenterConst();
					var rameau = construireArbreMP(mp,ll,0,0);
					desindenterConst();
					if (rameau !== []){ //1910545 Attention...
						reponse.push(	{c:carac,
									p:ip,
									f:rameau});		
					}								
				}
				else{ //il n'a plus de clés bp et il n'y a aucune mp
					
					var ll2 = copie(ll);
					ll2 = purge(ll2);
					debugConst("("+cTableauChaine()+")"+" OK, on valide avec "+chaineCL(ll2));
					reponse.push({c:carac,
								p:ip,
								ll:ll2});					
				}
			}
			if (nbRestantsEnProposition(carac) == 0)
				ll.pop();
			retirerTableauChaine(ip);
		} //fin for de l'exploration des nouvelles clés
		return reponse;	
	}
	
	/*
	Tester toutes les possibilités d'avoir la clé scrambleur[pValeur] en position pPosition, avec pour autres lettres mal placées 
	//llNouv : clés libres obtenues par la phase de recherche. (ne gère pas les clés libres déjà issues d'une recherche précédente -_-)
	//pValeur : valeur de la clé par rapport à son indice dans le scrambleur (scrambleur = 'BDHAGCEF' : 0 correspond à une clé B, 1 à une clé D, 2 à une clé H...)
	//pPosition : position que l'on souhaite faire occuper. 
	//Prérequis : (nbRestants > 0) 
	*/
	function construireArbreMP(nbRestants,llNouv,pValeur,pPosition){ 	
		if (pPosition > nbCles) //Passer à la valeur de clé suivante en revenant à la première position Exemple : Passer de A5 à B0 pour nbCles = 6. 
			return construireArbreMP(nbRestants,llNouv,pValeur+1,0); 
		if ((tableauChaine[pPosition] != '-') || (proposition.charAt(pPosition) == scrambleur[pValeur])) //Cas d'une case déjà occupée ou d'une clé qui, si elle était ici, serait "bien placée" (limitation)
			return construireArbreMP(nbRestants,llNouv,pValeur,pPosition+1);
		if (pValeur > valMaxTest){ //Si on a atteint la valeur de clé maximale (la plus avancée dans le scrambleur) présente dans la proposition, c'est perdu (Exemple : valMax = 5, on essaye donc jusqu'à 'F' d'un scrambleur 'ABCDEFGH...' - rappel : A <=> 0) et qu'on veut essayer une clé au-delà de 'F'... on ne peut pas. Après il faudra prendre en compte les clés libres des arbres précédents).	
			return []; 
		}		
		debugConst("("+cTableauChaine()+") On est dans construireArbreMP("+nbRestants+","+chaineCL(llNouv)+")");
		if (occurencesTC[pValeur] == 0) //Exemple : passer de A3 à B0 pour proposition = AABCDEF, bp/mp = 1/2 et chaineTableau = 'A-A----' et on est dans la branche d'A2.
			return construireArbreMP(nbRestants,llNouv,pValeur+1,0); 
		
		//Ca vaut le coup de continuer
		//Essayer sur toutes les clés de même valeur aux positions futures puis sur les clés qui suivent à toutes les positions 
		//(exemple : si on démarre à A3 et et nbCles = 6, faire ensuite A4,A5,B0,...,B5,C0,...)
		var debutIP = pPosition;
		var ll = llNouv.slice();
		var reponse = [];
		var ip;
		
		//Exploration clés anciennes (llLegacy)
		
		//Exploration nouvelles clés
		for(var iv = pValeur; iv<=valMaxTest;iv++){
			var carac = scrambleur[iv];
			//debugBoucle("Test de caractère "+carac);
			if(occurencesTC[iv] > 0){
				for(ip = debutIP;ip<nbCles;ip++){
					//debugBoucle("En position "+ip+"(on a -sans les nouveaux bannissements- "+chaineCodeLettresLibres(tableauChaine,ll)+")");
					if ((tableauChaine[ip] == '-') && (proposition.charAt(ip) != scrambleur[iv])){ //On peut faire une incursion de la nouvelle lettre sans crainte
						//debugBoucle("Entrée OK");
						ajouterTableauChaine(ip,carac);
						var feuille = [];
						if (nbRestants == 1){
							if (nbRestantsEnProposition(carac) == 0){ /*Rendre la clé libre, sauf dans les positions qui ont déjà été testées pour cette clé et qui sont encore libres*/
								var ll2 = copie(ll);
								ll2.push({c:carac,pb:union((videsJusquA(ip)),(positionsProposition(carac)))});
								ll2 = purge(ll2);
								reponse.push({c:carac,p:ip,ll:ll2});
							}
							else{
								var ll2 = copie(ll);
								ll2 = purge(ll2);
								reponse.push({c:carac,p:ip,ll:ll2});
							}
							debugConst("("+cTableauChaine()+")"+" OK, on valide avec "+chaineCL(ll2));
						}
						else{
							if (nbRestantsEnProposition(carac) == 0){ 	/*Passer directement à la clé suivante et ajouter une clé libre, sauf dans les positions qui ont déjà été testées pour cette clé et qui sont encore libres (mais pourraient bien être prises plus tard)*/
								var ll2 = copie(ll);
								ll2.push({c:carac,pb:union(videsJusquA(ip),positionsProposition(carac))});
								indenterConst();
								feuille = construireArbreMP(nbRestants-1,ll2,iv+1,0);
								desindenterConst();
							}
							else{
								indenterConst();
								feuille= construireArbreMP(nbRestants-1,copie(ll),iv,ip+1);
								desindenterConst();
							}
						}
						if (feuille.length > 0) //Ne pas mettre (feuille != []) ça ne marchera pas.
							reponse.push({c:carac,p:ip,f:feuille});
						retirerTableauChaine(ip); //Gérer les rameaux morts
					}
				}
				debutIP = 0;
			}
		}
		return reponse;
	}
	
	//-----------------------
	//Point de départ
	if (bp > 0)
		return construireArbreBP(bp,0,[]);	//nbRestants,indicePremier,llNouv
	else{
		if (mp > 0)
			return construireArbreMP(mp,[],0,0); //nbRestants,llNouv,pValeur,pPosition
		else
			return [];
	}
	
}