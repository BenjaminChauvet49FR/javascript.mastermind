/*Ce fichier contient les fonctions relatives au déroulement d'une partie par IA*/

/*Génere un code aléatoire respectant les valeurs de nb. Le code peut compter des doublons.*/

function genererCodeMaitre(nombre,valeurs){
	code="";
	occurencesCode = [];
	for(i=0;i<valeurs;i++){
		occurencesCode.push(0);
	}
	var alea;
	for(var i=0;i<nombre;i++){
		alea = aleatoire(0,valeurs-1);
		code+= String.fromCharCode(alea+posA);
		occurencesCode[alea]++;
	}
}

/*
Compare la valeur de propositionDevin à celle du code
*/
function indiquerBPetMP(propositionDevin){
	var bp = 0;
	var mp = 0;
	var occurencesRestantesCode = [];
	var carac;
	var i;
	for(i=0;i<valCles;i++){
		occurencesRestantesCode.push(occurencesCode[i]);
	}
	//Passe des bien placés
	for(i=0;i<nbCles;i++){
		carac = propositionDevin.charAt(i);
		if(carac == code.charAt(i)){
			bp++;
			occurencesRestantesCode[positionApresA(carac)]--;
		}
	}
	//Passe des mal placés
	for(i=0;i<nbCles;i++){
		carac = propositionDevin.charAt(i);
		if (carac != code.charAt(i) && occurencesRestantesCode[positionApresA(carac)] > 0){
			mp++;
			occurencesRestantesCode[positionApresA(carac)]--;			
		}
	}
	return {bp:bp,mp:mp};
}

/*
Fonction principale au clic
*/
$("#clic_lancement").click(function(e){
	$(div_liste_propositions).css("visibility","hidden");
	//document.getElementById('div_liste_propositions').style.visibility = 'hidden';
	do{
		/*document.getElementById('div_liste_propositions').innerHTML = '';
		document.getElementById('div_bonne_reponse').innerHTML = '';
		document.getElementById('div_bonne_reponse').style.visibility="hidden";*/
		$(div_liste_propositions).html("");
		$(div_bonne_reponse).html("");
		$(div_bonne_reponse).css("visibility","hidden");
		demarrerPartie({
			nombreCles : parseInt($(input_nbCles).val()),
			valeurCles : parseInt($(input_valCles).val())
		});
		//Attention, pas de garde sur ces valeurs !
		genererCodeMaitre(parseInt($(input_nbCles).val()),parseInt($(input_valCles).val()));
		var indicationMaitre = indiquerBPetMP(proposition);
		ajouter_propositionHTML($(div_liste_propositions),indicationMaitre.bp,indicationMaitre.mp,proposition);
		var reponseDevin = reagirABPMP(indicationMaitre.bp,indicationMaitre.mp);
		var debugMeThat = 0;
		while (reponseDevin != DEVIN_TROUVE_CERTITUDE && reponseDevin != DEVIN_TROUVE_CHANCEUX && debugMeThat < 100){
			indicationMaitre = indiquerBPetMP(proposition);
			if (indicationMaitre.bp != nbCles){ 
				ajouter_propositionHTML($(div_liste_propositions),indicationMaitre.bp,indicationMaitre.mp,proposition);
			}
			reponseDevin = reagirABPMP(indicationMaitre.bp,indicationMaitre.mp); 
			debugMeThat++;
		}
		//On indique la bonne réponse
		ajouter_propositionHTML($(div_bonne_reponse),nbCles,0,proposition);	
		if(reponseDevin == DEVIN_TROUVE_CHANCEUX){
				$(div_bonne_reponse).css("visibility","visible");
		}		
	}while (reponseDevin != DEVIN_TROUVE_CERTITUDE);
	$(div_liste_propositions).css("visibility","visible");

});

/*
Rend visible la réponse
*/
$("#clic_afficher_reponse").click(function(e){
	$(div_bonne_reponse).css("visibility","visible");
	//document.getElementById('div_bonne_reponse').style.visibility="visible";
});

/*
Mélange entre eux les noeuds de proposition
*/
function melangerHTMLPropositions(){
	var permutation = [];
}