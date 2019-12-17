$(function(){
	$("#clic_prepa306").click(function(){
		setNbClesValClesChamps(3,6);
	});
	$("#clic_prepa408").click(function(){
		setNbClesValClesChamps(4,8);
	});
	$("#clic_prepa510").click(function(){
		setNbClesValClesChamps(5,10);
	});
	$("#clic_prepa612").click(function(){
		setNbClesValClesChamps(6,12);
	});
	$("#clic_prepa426").click(function(){
		setNbClesValClesChamps(4,26);
	});
	$("#clic_prepa412").click(function(){
		setNbClesValClesChamps(4,12);
	});
	$("#clic_prepa516").click(function(){
		setNbClesValClesChamps(5,16);
	});
	$("#clic_prepa616").click(function(){
		setNbClesValClesChamps(6,16);
	});

	
});

/*
Interface : placer rapidement le nombre et les valeurs des clés dans les champs
*/
function setNbClesValClesChamps(nbClesToSet,valClesToSet){
	//Note : ce code fonctionnait encore quand il était appelé par du JQuery et portait sur des variables JS (obtenues par document.getElementById)
	$(input_nbCles).val(nbClesToSet);
	$(input_valCles).val(valClesToSet);
	//On peut mettre des constantes externes au code qui contiennent des chaînes JS (valides) en guise de sélecteur
}
