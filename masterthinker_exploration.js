
/*
On explore un arbre, en voyant si on peut construire quelque chose derrière.
Renvoie : l'arbre, avec les branches explorées ou refermées conformément à la proposition.
Préconditions : 
-proposition contient le code + variables associées en conséquence
-arbre = {c,p,ll} ou {c,p,f}, avec {c,p} déjà incorporé dans tableauChaine
-tous les appels qui ont conduit jusque là ont été répercutés sur tableauOccurences

*/
function explorerAux(arbre,bp,mp,llNouv){
	debugExplo("On explore "+cTableauChaine()+" "+bp+"/"+mp+" "+"(Nouvelles ll = "+chaineCL(llNouv)+")");
	if (bp == -1){ 
		debugExplo("NON, il y aurait trop de BP !");
		arbre.c = '-';
		return arbre;
	}
	if (bp < -mp){ 
		debugExplo("NON, il ne reste pas assez de BP pour compenser les MP en excès !");
		arbre.c = '-';
		return arbre;
	}
	if (arbre.ll !== null && arbre.ll !== undefined){
		indenterExplo();
		if (bp > 0 || mp != 0){
			var llNouv2 = copie(llNouv);
			var carac = arbre.c;
			testerAbsenceEtAjouterLL_explo(carac,llNouv2); //Avant on avait pas de llNouv2 et on utilisait simplement llNouv dans construireLegacy mais ça a changé du fait de l'exploration de la branche C--- qui ne reconduisait pas C en tant que CL (alors que le code était CEHC, scrambleur alphabétique)
			var rameau = construireLegacy(bp,mp,arbre.ll,llNouv2);
			if (rameau.length > 0){
				var pos = arbre.p;
				arbre={c:carac,p:pos,f:rameau,ll:undefined};
			}
			else{
				arbre.c = '-';
			}
		}
		else{
			var carac = arbre.c;
			var pos = arbre.p;
			var llNouv2 = copie(llNouv);
			testerAbsenceEtAjouterLL_explo(carac,llNouv2);
			var llFinal = intersectionLL(arbre.ll,llNouv2);
			arbre={c:carac,p:pos,ll:llFinal};
			debugExploValidation(llFinal);
		}
		desindenterExplo();
		return arbre;// 1910545 J'espère que cette idée est la bonne !
	}
	else{
		//Vérifier récursivement les branches existantes
		var carac,pos;
		var fait;
		var validiteBranche = false;
		indenterExplo();
		for(var ip = 0;ip < arbre.f.length;ip++){
			carac = arbre.f[ip].c;
			pos = arbre.f[ip].p;
			fait = false;
			if (tableauChaine[pos] == '-'){
				ajouterTableauChaine(pos,carac);
				if(proposition.charAt(pos)==carac){//Bonne position ? 
					if(nbClesMP(carac) > 0 && nbRestantsEnProposition(carac) < 0){//Dans un cas on invalide une clé mp
						invaliderCleMP(carac);
						var llNouv2 = copie(llNouv);
						testerAbsenceEtAjouterLL_explo(carac,llNouv2);
						//explorerAux(arbre.f[ip],bp-1,mp+1,llNouv2);
						arbre.f[ip]=explorerAux(arbre.f[ip],bp-1,mp+1,llNouv2);
						validerCleMP(carac);				
					}
					else{
						var llNouv2 = copie(llNouv);
						testerAbsenceEtAjouterLL_explo(carac,llNouv2);
						//explorerAux(arbre.f[ip],bp-1,mp,llNouv2);						
						arbre.f[ip]=explorerAux(arbre.f[ip],bp-1,mp,llNouv2);						
					}
					fait = true;
					if (arbre.f[ip].c != '-'){
						validiteBranche = true;
					}
				}
				if(!fait && nbRestantsEnProposition(carac) >= 0){ //Mauvaise position ? (on avait au moins un caractère non encore placé dans tableauChaine, avant de le placer)
					validerCleMP(carac);	
					var llNouv2 = copie(llNouv);
					testerAbsenceEtAjouterLL_explo(carac,llNouv2);				
					arbre.f[ip] = explorerAux(arbre.f[ip],bp,mp-1,llNouv2);
					invaliderCleMP(carac);
					fait = true;
					if (arbre.f[ip].c != '-'){
						validiteBranche = true;
					}
				}
				if (!fait){
					var llNouv2 = copie(llNouv);
					testerAbsenceEtAjouterLL_explo(carac,llNouv2);
					arbre.f[ip] = explorerAux(arbre.f[ip],bp,mp,llNouv2);
					if (arbre.f[ip].c != '-'){
						validiteBranche = true;
					}
				}
				retirerTableauChaine(pos);		
			}
		}
		desindenterExplo();
		if (validiteBranche){
			arbre.f = arbre.f.filter(function(e){return (e.c.charAt(0) != '-')});
		}
		else{
			debugExplo("Rameau mort !");	
			arbre.c = '-';
		}
		return arbre; //1910545 On retourne l'arbre
	}
}
	
	
	
/*
Appelé lorsqu'on teste la validité d'une proposition sur une série d'arbres
Précondition : 
-proposition est remplie, et tableauOccurences, valMinTest, valMaxTest sont initialisées correctement.
-arbres est un tableau non vide d'arbres
*/
function explorer(arbres,bp,mp){
	explorerAux({c:'Z',p:-1,f:arbres},bp,mp,[]);	
	debugExplo("=====Ouf, l'exploration globale est finie !=====");
	return (arbres.filter(function(e){return e.c.charAt(0) != '-'}));
}

