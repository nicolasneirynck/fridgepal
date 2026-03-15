# Dossier

- **Online versies:**
  - **Back-end:** https://frontendweb-2526-neiryncknicolas.onrender.com/docs
  - **Front-end:** https://frontendweb-2526-neiryncknicolas-frontend.onrender.com/


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

## 🚀 Extra technologieën

### Front-end Web Development

- [<Radix_UI dropdown menu>](https://www.npmjs.com/package/@radix-ui/react-dropdown-menu)
  - Ik wou een kant en klare component voor mijn dropdown navigatie-menu zodat ik me enkel op de Tailwind CSS styling kon concentreren. 
  De component laat ook toe om je keyboard te gebruiken om te navigeren en daar had ik mij eerder al op vastgebeten bij de zoekbalk component waar ik als ik meer tijd zou hebben ook een kant-en-klaar UI component voor zou zoeken. Met wat ik nu weet toch.

### Web Services

- [<Cloudinary_link>](https://www.npmjs.com/package/cloudinary)
  - Voor het toevoegen van recepten wou ik de optie om het uploaden van een afbeelding van het recept toe te laten. Om de back-end niet teveel te belasten met de werkelijke opslag ervan heb ik een externe opslag namelijk Cloudinary gebruikt. De back-end beperkt zich er dan toe om zich te richten op de authorisatie, beveiliging en de validatie van de image. Als dat allemaal in orde is zal hij de upload naar Cloudinary regelen en de link opslaan in onze database.
ng met webdevelopment (op de schoolcursussen na) ook zo een grote brok is.

