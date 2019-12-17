/*----------------------------*/	
/*Clés mal placées*/
//Recense le nombre de "clés mal placées" présentes dans tableauChaine par rapport à proposition.
//Exemple : proposition = "ABCDEF", tableauChaine = "BA-DA-" : occurencesTC = [-1,0,1,0,1,1]; malPlaceesTC = [1,1,0,0,0,0]; totalMalPlacees = 2;
var clesMP;
function resetClesMP(){
	clesMP = new Array(valCles);
	for(i=0;i<valCles;i++)
		clesMP[i] = 0;
}
function validerCleMP(carac){
	clesMP[indiceScrambleur(carac)]++;
}
function invaliderCleMP(carac){
	clesMP[indiceScrambleur(carac)]--;
}
function nbClesMP(carac){
	return clesMP[indiceScrambleur(carac)];
}