/* 
Cette page contient les instructions Jquery du fichier mastermind.html.
Anciennement des addEventListener, aka AEL.
*/

$(function(){

	/*
	Démarrer une nouvelle partie. Le devin fait sa première proposition.
	*/
	$("#clic_preparation").click(function(){
		$(div_preparation).css("display","none");
		$(div_resume).css("display","block");
		$(div_proposition).css("display","block");
		$(div_proposition_commune).css("display","block");
		$(div_liste_propositions).css("display","block");
		$(span_infoNbCles).html($(input_nbCles).val());
		$(span_infoValCles).html(String.fromCharCode(parseInt($(input_valCles).val())+posA-1)+"");
		changerCouleurElt($(clic_reponse),"#ffff00");
		demarrerPartie({
			nombreCles : parseInt($(input_nbCles).val()),
			valeurCles : parseInt($(input_valCles).val())
		});
		$(span_proposition).html(proposition);
		$(div_liste_propositions).html("");
	});
	
	/*
	Mettre fin à la partie en cours
	*/
	$("#clic_retour").click(function(){
		$(div_preparation).css("display","block");
		$(div_resume).css("display","none");
		$(div_proposition).css("display","none");
		$(div_liste_propositions).css("display","none");
		$(div_ultime_proposition).css("display","none");
		$(div_code_impossible).css("display","none");
		
	});
	
	/*
	Indiquer au devin le nombre de bp et de mp
	*/
	$("#clic_reponse").click(function(){
		var bp = parseInt($(input_bons).val());
		var mp = parseInt($(input_mauvais).val());
		//Test de cohérence
		if (isNaN(bp) || isNaN(mp)){
			alert("Merci de saisir des valeurs numériques.");
			return;
		}
		if (bp < 0 || mp < 0 || bp+mp > nbCles || ((bp == nbCles-1)&&(mp == 1))){
			alert("Merci de saisir des valeurs cohérentes.");
			return;
		}
		
		changerCouleurElt($(clic_reponse),"#ff0000");
		var ancienneProposition=proposition;
		var reactionDevin = reagirABPMP(bp,mp);
		if (reactionDevin == DEVIN_TROUVE_CHANCEUX){
			alert("Super ;)");
			div_liste_propositions.innerHTML += chaineNouveauSpanBon(proposition);
		}		
		if (reactionDevin == DEVIN_TROUVE_CERTITUDE){
			//semi-style
			ajouter_propositionHTML(div_liste_propositions,bp,mp,ancienneProposition);
			//style
			debugExplo("Alerte ! Plus qu'une possibilité !");
			$(span_ultime_proposition).html(proposition);		
			$(div_ultime_proposition).css("display","block");
			$(div_proposition_commune).css("display","none");
			$(input_bons).css("enabled",false);
			$(input_mauvais).css("enabled",false);
		}
		if (reactionDevin == DEVIN_INTROUVABLE){
			ajouter_propositionHTML_mauvais(div_liste_propositions,bp,mp,ancienneProposition);
			$(span_ultime_proposition).html(proposition);	
			$(div_code_impossible).css("display","block");
			$(div_proposition_commune).css("display","none");
		}
		if (reactionDevin == DEVIN_COMMUN){
			ajouter_propositionHTML(div_liste_propositions,bp,mp,ancienneProposition);
		}
		
		changerCouleurElt($(clic_reponse),"#ffff00");
		$(input_bons).val(0);
		$(input_mauvais).val(0);
		$(span_proposition).html(proposition);
	});
	
	/*
	Indiquer que c'est la bonne réponse
	*/
	$("#clic_ultime_oui").click(function(){
		alert("Super ;)");
		div_liste_propositions.innerHTML += chaineNouveauSpanBon(proposition);
	});

	/*
	Indiquer que ce n'est pas la bonne réponse tout en lui donnant la bonne
	*/	
	$("#clic_ultime_non").click(function(){
		var ultimeCodeHumain = $(input_reponse_finale).val();
		testerCoherenceCodeHumainHTML(ultimeCodeHumain);
	});
		
	/*
	Indiquer la bonne réponse lorsque le devin affirme qu'il y en a pas
	*/
	$("#clic_code_impossible").click(function(){
		var ultimeCodeHumain = $(input_code_impossible).val();
		testerCoherenceCodeHumainHTML(ultimeCodeHumain);
	});
		
	
});


/*
Le maître indique le bon code au devin, qui dit s'il est cohérent ou non.
*/
function testerCoherenceCodeHumainHTML(propositionMaitre){
	var reponse = testerCoherenceCodeMaitre(propositionMaitre);
	if (reponse == DEVIN_CODE_INCOHERENT_PARAMS){
		alert("Ce code n'est pas cohérent avec la taille ("+nbCles+") ou les valeurs possibles (de A à "+String.fromCharCode(valCles+posA-1)+"). Est-ce une erreur de frappe ou le code a mal été pensé ? En outre, des majuscules sont attendues.");		
	}
	if (reponse == DEVIN_ECHEC){
		alert("L'IA n'a pas trouvé. Bravo...");
	}
	if (reponse.type != undefined){
		if (reponse.type == DEVIN_CODE_INCOHERENT_PROPOSITIONS){
			alert ("L'IA conteste : "+reponse.proposition+" "+reponse.bp+" "+reponse.mp+" "
			+" n'est pas cohérent avec le code "+propositionMaitre+ ". Sois plus attentif la prochaine fois.");
		}
	}
}

