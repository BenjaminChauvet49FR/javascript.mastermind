/*Permet de changer les fichiers CSS associés à la page*/

var linkCSSGeneral = $("#link_css");

var select_theme = $("#select_theme");

function attribuerStyle(nomDossier){
	$(linkCSSGeneral).setAttribute("href","Style/"+nomDossier+"/general.css");
}

attribuerStyle("classique");

select_theme.addEventListener("change",function(e){
	attribuerStyle(e.target.value);
	
});