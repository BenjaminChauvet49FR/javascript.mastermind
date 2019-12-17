Sommaire :
Présentation
Déroulement d'une partie
Exemple de déroulement d'une partie

====================

Présentation

Le "projet Mastermind" le développement d'une IA (intelligence artificielle) qui trouve un code auquel vous pensez secrètement.
Pour cela, il fait des propositions de code et vous lui répondez.
Il reprend le jeu de société nommé ainsi.

====================

Déroulement d'une partie

1) Ouvrez dans un navigateur le fichier "mastermind.html" (c'est sur cette page que toute l'application aura lieu) .

2) Choisissez : 
-un nombre de "clés" (ce sera la taille du code) 
-un nombre de valeurs (ce sera le nombre de valeurs différentes possibles que pourront prendre les clés)        
Rentrez les deux données dans les champs correspondants.

3) Choisissez un code cohérent avec les données entrées en 2) et notez-le quelque part.
L'ordinateur n'a pas connaissance du code. Sa mission sera justement de le deviner.
Exemple :                                                                                                                                      
4 clés et 8 valeurs différentes : choisissez un code de 4 lettres, toutes comprises entre A et H -8ème lettre de l'alphabet- tel qu'ABCD, CGHA, DBHH .


5) Tant que l'IA n'a pas trouvé la bonne réponse et estime qu'il reste des réponses possibles :
-l'IA fait une proposition de code.
-Indiquez :
  --le nombre de clés de la proposition présentes et bien placées dans le code
  --le nombre de clés de la proposition présentes mais mal placées dans le code
  Exemple : si le code est "ABCD" et l'IA propose :
  -"ECGD" : il y a une clé bien placée (le D) et une clé mal placée (le C). Il faut donc rentrer 1 et 1 (en bien placés et mal placés respectivement).
  -"AHCF" : il y a deux clés bien placées (le A et le C) et aucune mal placée. Il faut donc rentrer 2 et 0.
  -"BBEF" : il y a une clé bien placée (le B en 2nde position) et aucune clé mal placée (le B en position 1 est en excès par rapport au nombre de B présents dans le code). Il faut donc rentrer 1 et 0.
  -"HAAC" : il n'y a aucune clé bien placée et deux clés mal placées (l'un des deux A et le C. Puisqu'il n'y a qu'un A présent dans le code, seul l'un des deux A de la proposition doit être comptabilisé). Il faut donc rentrer 0 et 2.
(fin tant que)
Il se peut que l'IA ne voie plus qu'une proposition, dans ce cas elle vous demandera directement si c'est ça.
Cliquez "Oui" si c'est la bonne réponse, sinon cliquez le bouton "Non ! Le code est :" en indiquant la valeur du code.
Il se peut également que l'IA ne voie aucun code possible. Indiquez le bon code dans ce cas.
ATTENTION : soyez très attentif à rentrer correctement les nombres de valeurs bien placées et mal placées à chaque fois, sinon vous induirez l'IA en erreur, qui ne vous manquera pas de vous le faire remarquer.

Normalement, l'IA est suffisamment évoluée pour que l'erreur ne vienne pas d'elle lorsqu'elle ne trouve pas de code ou que sa proposition finale (celle en "L'IA est sûre d'avoir trouvé...") soit erronée.




====================

Exemple de déroulement de partie :
Je rentre "Nombre de clés 5 et valeurs des clés 10" (des clés de A à J donc.)
Je pense au code EIFDE :
Voici la liste des propositions accompagnées respectivement des "bien placées/mal placées" :
GEJIF 0 3

GEJIF 0 3
JFBCI 0 2
FJAEH 0 2
AAIGJ 0 1
DIFDE 4 0
IIFDE 4 0
EIFDE 5 0
