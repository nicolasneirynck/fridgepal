# Dossier

## 📋 Studentgegevens

- **Student:** Nicolas Neirynck
- **Studentennummer:** 201095919
- **E-mailadres:** nicolas.neirynck2@student.hogent.be
- **GitHub repository:** https://github.com/HOGENT-frontendweb/frontendweb-2526-neiryncknicolas
- **Online versies:**
  - **Back-end:** https://frontendweb-2526-neiryncknicolas.onrender.com/docs
  - **Front-end:** https://frontendweb-2526-neiryncknicolas-frontend.onrender.com/
- **Demo:** https://hogent.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=855a1a3b-e9c1-4b79-afe5-b3b600f4555f

## 🔐 Logingegevens


### Lokale omgeving

- **E-mailadres**: nicolas@example.com
- **Wachtwoord**: 12345678
- **Rol**: admin

- **E-mailadres**: mario@example.com
- **Wachtwoord**: 12345678
- **Rol**: user

### Online omgeving

- **E-mailadres**: nicolas@example.com
- **Wachtwoord**: 12345678
- **Rol**: admin


- **E-mailadres**: mario@example.com
- **Wachtwoord**: 12345678
- **Rol**: user

## 📖 Projectbeschrijving

Ik ga een recepten-applicatie maken waar de hoofdfunctie is dat je ingrediënten kan ingeven die je in huis hebt (of in je fridge) en dan krijg je een lijst terug van recepten. Deze lijst laat enkel recepten zien die 1 of meerdere van de ingevoerde ingrediënten bevat

Het is dus bedoeld voor mensen die geen zin hebben om uren na te denken over wat ze gaan koken maar heel snel - op basis van wat ze in huis hebben - recepten kunnen filteren en zo kunnen beslissen wat ze willen koken.  

Users kunnen zelf een recept toevoegen of recepten van zichzelf of anderen opslaan bij hun favorieten. 


![ERD](https://kroki.io/erd/svg/eNp1kcFqwzAMhs_TU_Tc0sMeoRsMeumh0FMowbO1IEjsIMsbffs5ddLYnXeKov_X99tyc_HIV9iSgVF5_-PYAA6Kevgi9nJSA0Kv5gKaM2oaMfnt1DLoNdMo5CzQoDq8cA9CUdlpRiVo3m4wVwd5iYj3WHaObxlk4baltuN79xgrPQuxhuZoO0ZDaKXGeFbV4IIVCJYkJ9LDNjO9cNDTPdKYFxxPYfhELu64EqCZVtd-qG_HJNg-VrNarBP0i3E-3llJjL4C37_RHaIYvdkYTP7N636_3aShrFHLfJaLJID0m_T6fO74s8VCzdZU9Cu5FejyvAAr_r9UWMxVwi8KOOwk)

**Recipe:** houdt recepten bij  
 **Ingrediënt:** houdt alle ingrediënten bij in de database, zal gebruikt worden om autocomplete te gebruiken bij de zoekfunctie op basis van ingrediënten  
 **RecipeIngredient:** houdt een ingrediënt bij van een specifiek recept samen met het aantal en de meeteenheid. 
 
 **Recipe - RecipeIngredient** elk recept heeft 1 of meerdere ingredienten 
 **Category:** er bestaan verschillende categorieën (hoofgerecht, vegetarisch,..)  
 **RecipeCategory:** linkt een recept met een of meerdere categorieën  
 **Instruction** houdt de beschrijving en stapnummer bij van een instructie bij van een specifiek recept
 
 **Recipe - Instructions** elk recept heeft 1 of meerdere instructies
 **User** houdt de users bij
 **UserFavoriteRecipe** houdt de favoriete recepten bij van de user

## ✅ Ontvankelijkheidscriteria

- [x] Het project van Web Services voldoet aan **alle** ontvankelijkheidscriteria zoals beschreven in de rubrics.
- [x] Het project van Front-end Web Development voldoet aan **alle** ontvankelijkheidscriteria zoals beschreven in de rubrics.

## 🚀 Extra technologieën

### Front-end Web Development

- [<Radix_UI dropdown menu>](https://www.npmjs.com/package/@radix-ui/react-dropdown-menu)
  - Ik wou een kant en klare component voor mijn dropdown navigatie-menu zodat ik me enkel op de Tailwind CSS styling kon concentreren. 
  De component laat ook toe om je keyboard te gebruiken om te navigeren en daar had ik mij eerder al op vastgebeten bij de zoekbalk component waar ik als ik meer tijd zou hebben ook een kant-en-klaar UI component voor zou zoeken. Met wat ik nu weet toch.

### Web Services

- [<Cloudinary_link>](https://www.npmjs.com/package/cloudinary)
  - Voor het toevoegen van recepten wou ik de optie om het uploaden van een afbeelding van het recept toe te laten. Om de back-end niet teveel te belasten met de werkelijke opslag ervan heb ik een externe opslag namelijk Cloudinary gebruikt. De back-end beperkt zich er dan toe om zich te richten op de authorisatie, beveiliging en de validatie van de image. Als dat allemaal in orde is zal hij de upload naar Cloudinary regelen en de link opslaan in onze database.


## 🤔 Reflectie


**Wat heb je geleerd?**

[Beschrijf je belangrijkste leermoment...]

Ik heb ontzettend veel geleerd want React en Typescript waren helemaal nieuw voor mij. Tegelijk was mijn grootste les om modulair te werken. Te beginnen met 1 functionaliteit en langzaam aan uit te bouwen. Zo begon ik met een nog uitgebreidere ERD voor mijn database (oa rating, eigen lijsten bijhouden,..) maar gaandeweg begon ik te merken dat ik daardoor erg veel werk had. Daarbovenop werd alles een heel stuk complexer. Bijvoorbeeld door de geneste recepten die heel wat relaties heeft met andere tabellen. Soms ben ik daardoor heel erg moeten deepdiven in complexe stukken die ik dan op het moment zelf (na veel frustraties) uiteindelijk geregeld kreeg maar ik merk als het enkele weken liet liggen ik al niet helemaal meer goed begreep hoe ik het alweer had opgelost. Ik heb gaandeweg het project veel geknipt en weggelaten maar een deel van het kwaad was al geschied.

**Wat vond je goed aan dit project?**

De programmeertalen (React en Typescript) zijn al doende en op een speelse manier wel meer eigen geworden. Ik vind het op deze manier minder vermoeiend om het aan te leren dan soms van die bootcamp oefeningen.

Ook is voor mij de structuur van een website wel levendiger geworden. Het verschil tussen back-end en front-end kende ik nog niet en dat is voor mij nu een heel stuk duidelijker geworden.

**Wat zou je anders doen?**

Zoals ik al zei: simpel beginnen! Achteraf gezien had ik veel liever een eenvoudiger plan gehad om dat dan tot in de puntjes af te werken. Zo heb ik veel plezier gehad om wat van de theorie-filmpjes over React te bekijken van op de congressen. Die stof helemaal snappen ligt mij wel maar door de grootte van mijn project heb ik daar minder mee bezig geweest dan ik had gewild.

**Wat waren de grootste uitdagingen?**

Ik heb erg gevloekt op het toevoegen/wijzigen van een recept. In mijn koppigheid wou ik dat in 3 stappen doen bestaande uit 3 aparte componenten. Een eerste uitdaging was dan om alle informatie bij te houden, nadien kwam ik in de miserie met mijn validatie,.. In het vervolg zou ik simpel beginnen met een lang formulier, zorgen dat dit helemaal in orde is en pas als alles klaar is overwegen om het in 3 stappen te doen zoals nu.

**Wat zou je behouden aan de cursus?**

Het zit voor mij goed in elkaar. Het stap voor stap opbouwen van het project met als illustratie het voorbeeldproject. 

**Wat zou je toevoegen/aanpassen?**

Tegelijk is het best veel lesstof merk ik. Ik heb er enorm veel werk in gestoken, zeker in verhouding met de studiepunten die er voor staan. Maar aangezien ik het mijzelf zo moeilijk heb gemaakt zou het ook daar aan kunnen liggen. Maar ik vraag me af dit niet een andere studenten zoals mij die geen React kennen of nog geen ervaring met webdevelopment (op de schoolcursussen na) ook zo een grote brok is.

