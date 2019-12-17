/*
Ce fichier contient les fonctions de manipulation de HTML qui découlent des évènements de la partie
*/

/*
Ajoute un code (qui n'est ni celui de certitude ni celui de désapprobation) dans le HTML.
Condition : toujours appelé aux côtés de ajouter_proposition
*/
function ajouter_propositionHTML(noeudJQuery,bp,mp,proposition){
	//div_liste_propositions.innerHTML += chaineNouveauSpan(bp,mp,proposition);
	//noeudHTML.innerHTML += chaineNouveauSpan(bp,mp,proposition);
	$(noeudJQuery).append(chaineNouveauSpan(bp,mp,proposition));
} 

/*
Ajoute un code désapprouvé par le devin dans le HTML.
Condition : toujours appelé aux côtés de ajouter_proposition
*/
function ajouter_propositionHTML_mauvais(noeudHTML,bp,mp,proposition){
	noeudHTML.innerHTML += chaineNouveauSpanMauvais(bp,mp,proposition);
}	


/*
Change la couleur d'un élément span avec une couleur en hexadécimal
*/
function changerCouleurElt(spanElt,couleurHexaDecimal){
	//spanElt.style.backgroundColor =couleurHexaDecimal;
	spanElt.css("backgroundColor",couleurHexaDecimal);
}

/*
Renvoie les chaînes de caractères d'éléments span destinée à être insérées
*/
function chaineNouveauSpan(bp,mp,prop){
	return "<span class=\"exemple_proposition\">"+prop+" </span><span class=\"exemple_bons\">"+bp+" </span><span class=\"exemple_mauvais\">"+mp+"</span></br>";
}

function chaineNouveauSpanBon(prop){
	return "<span class=\"bonne_proposition\">"+prop+" "+nbCles+" 0"+"</span></br>";
}

function chaineNouveauSpanMauvais(bp,mp,prop){
	return "<span class=\"mauvaise_proposition\">"+prop+" "+bp+" "+mp+"</span></br>";
}

	