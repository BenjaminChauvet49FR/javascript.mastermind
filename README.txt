Sommaire :
Pr�sentation
D�roulement d'une partie
Exemple de d�roulement d'une partie

====================

Pr�sentation

Le "projet Mastermind" le d�veloppement d'une IA (intelligence artificielle) qui trouve un code auquel vous pensez secr�tement.
Pour cela, il fait des propositions de code et vous lui r�pondez.
Il reprend le jeu de soci�t� nomm� ainsi.

====================

D�roulement d'une partie

1) Ouvrez dans un navigateur le fichier "mastermind.html" (c'est sur cette page que toute l'application aura lieu) .

2) Choisissez : 
-un nombre de "cl�s" (ce sera la taille du code) 
-un nombre de valeurs (ce sera le nombre de valeurs diff�rentes possibles que pourront prendre les cl�s)        
Rentrez les deux donn�es dans les champs correspondants.

3) Choisissez un code coh�rent avec les donn�es entr�es en 2) et notez-le quelque part.
L'ordinateur n'a pas connaissance du code. Sa mission sera justement de le deviner.
Exemple :                                                                                                                                      
4 cl�s et 8 valeurs diff�rentes : choisissez un code de 4 lettres, toutes comprises entre A et H -8�me lettre de l'alphabet- tel qu'ABCD, CGHA, DBHH .


5) Tant que l'IA n'a pas trouv� la bonne r�ponse et estime qu'il reste des r�ponses possibles :
-l'IA fait une proposition de code.
-Indiquez :
  --le nombre de cl�s de la proposition pr�sentes et bien plac�es dans le code
  --le nombre de cl�s de la proposition pr�sentes mais mal plac�es dans le code
  Exemple : si le code est "ABCD" et l'IA propose :
  -"ECGD" : il y a une cl� bien plac�e (le D) et une cl� mal plac�e (le C). Il faut donc rentrer 1 et 1 (en bien plac�s et mal plac�s respectivement).
  -"AHCF" : il y a deux cl�s bien plac�es (le A et le C) et aucune mal plac�e. Il faut donc rentrer 2 et 0.
  -"BBEF" : il y a une cl� bien plac�e (le B en 2nde position) et aucune cl� mal plac�e (le B en position 1 est en exc�s par rapport au nombre de B pr�sents dans le code). Il faut donc rentrer 1 et 0.
  -"HAAC" : il n'y a aucune cl� bien plac�e et deux cl�s mal plac�es (l'un des deux A et le C. Puisqu'il n'y a qu'un A pr�sent dans le code, seul l'un des deux A de la proposition doit �tre comptabilis�). Il faut donc rentrer 0 et 2.
(fin tant que)
Il se peut que l'IA ne voie plus qu'une proposition, dans ce cas elle vous demandera directement si c'est �a.
Cliquez "Oui" si c'est la bonne r�ponse, sinon cliquez le bouton "Non ! Le code est :" en indiquant la valeur du code.
Il se peut �galement que l'IA ne voie aucun code possible. Indiquez le bon code dans ce cas.
ATTENTION : soyez tr�s attentif � rentrer correctement les nombres de valeurs bien plac�es et mal plac�es � chaque fois, sinon vous induirez l'IA en erreur, qui ne vous manquera pas de vous le faire remarquer.

Normalement, l'IA est suffisamment �volu�e pour que l'erreur ne vienne pas d'elle lorsqu'elle ne trouve pas de code ou que sa proposition finale (celle en "L'IA est s�re d'avoir trouv�...") soit erron�e.




====================

Exemple de d�roulement de partie :
Je rentre "Nombre de cl�s 5 et valeurs des cl�s 10" (des cl�s de A � J donc.)
Je pense au code EIFDE :
Voici la liste des propositions accompagn�es respectivement des "bien plac�es/mal plac�es" :
GEJIF 0 3

GEJIF 0 3
JFBCI 0 2
FJAEH 0 2
AAIGJ 0 1
DIFDE 4 0
IIFDE 4 0
EIFDE 5 0
