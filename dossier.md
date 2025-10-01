# Dossier

> **Instructies:**
>
> - Vul dit dossier volledig in en zorg ervoor dat alle links correct zijn
> - In het geval je slechts één olod volgt, verwijder alle inhoud omtrent het andere olod uit dit document
> - Lees [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) om te weten hoe een Markdown-bestand opgemaakt moet worden
> - Verwijder alle instructies (lijnen die starten met >) wanneer je klaar bent

## 📋 Studentgegevens

- **Student:** Voornaam Naam
- **Studentennummer:** xxxxxxxx
- **E-mailadres:** <voornaam.naam@student.hogent.be>
- **GitHub repository:** <LINK_NAAR_GITHUB_REPO>
- **Online versies:**
  - **Back-end:** <LINK_NAAR_ONLINE_BACKEND>
  - **Front-end:** <LINK_NAAR_ONLINE_FRONTEND>
- **Demo:** <LINK_NAAR_DEMO_VIDEO>

## 🔐 Logingegevens

> **Instructies:**
>
> - Vul de logingegevens in voor test accounts.
> - Zorg ervoor dat deze accounts representatieve data bevatten.
> - Voeg hieronder eventueel extra accounts toe voor administrators of andere rollen.

### Lokale omgeving

- **E-mailadres**: <test@example.com>
- **Wachtwoord**: testpassword
- **Rol**: admin/user

### Online omgeving

- **E-mailadres**: <test@example.com>
- **Wachtwoord**: testpassword
- **Rol**: admin/user

## 📖 Projectbeschrijving

> **Instructie:** Beschrijf hier duidelijk en beknopt waarover jouw project gaat. Wat is het doel? Wie is de doelgroep? Welke functionaliteiten biedt het?
>
> Ik ga een recepten-applicatie maken waar de hoofdfunctie is dat je ingrediënten kan ingeven die je in huis hebt (of in je fridge) en dan krijg je een lijst terug van recepten. Deze lijst is gesorteerd op recepten met minst ontbrekende ingrediënten.
> Het is dus bedoeld voor mensen die geen zin hebben om uren na te denken over wat ze gaan koken maar heel snel - op basis van wat ze in huis hebben - tussen hun opgeslagen recepten kunnen kijken wat ze willen koken.
>
> Users kunnen zelf een recept toevoegen of recepten van anderen opslaan. Je kan recepten een rating geven, toevoegen aan een zelfgemaakte lijst (doordeweeks, comfort food, gezonde snacks,..).

[Beschrijf hier je project...]

> **Instructie:** Voeg hier een afbeelding van jouw ERD toe en licht de belangrijkste entiteiten en relaties kort toe.

![ERD](https://kroki.io/erd/svg/eNp1kcFugzAMhs_1U3AG9bBX2HapNPXQqSfUQxZcZAkCcpxNvP0SkkLo2Ikff7__OE59tcg3KKkB59VZ9QijsvZn4AbuxFbmUqeS0IMzwhNgr6gDqC-oacQYYIKBetXilTsQ8n-VZlSCzet0OHj3m9ftwFPmf0RsUcVz8eSVTsBrqE-mZWwIjexEPEPVh2HBGZI8kBZbirTCTgsNJrZZwfHs-i9kaNBqpjGwLAHqT_WNzXL1RD7IhsRyNZpB0C7jBZ5NXYV9exPZd7wr18livCjxM96A568PTM4sGcKzFS_HY1nEnj-FcBqsMqJs7sRifQM25HmzG5itbqcpXmMHPJ66AFiD_zkOFvNOwC8Ak-qF)

**Recipe:** houdt recepten bij  
 **SavedRecipe:** houdt de recepten bij die door een user zijn opgeslaan in een lijst en eventuele notities daarbij  
 **RecipeList:** als een gebruiker een recept opslaat komt deze in een lijst terecht, er zal een default lijst “Favorieten” voorzien zijn.  
 **Ingrediënt:** houdt ingrediënten bij in de database, zal gebruikt worden om autocomplete te gebruiken bij de zoekfunctie op basis van ingrediënten  
 **RecipeIngredient:** houdt een ingrediënt bij voor een recept samen met het aantal en de meeteenheid.  
 **Category:** er bestaan verschillende categorieën (hoofgerecht, vegetarisch,..)  
 **RecipeCategory:** linkt een recept met een of meerdere categorieën  

## ✅ Ontvankelijkheidscriteria

- [ ] Het project van Web Services voldoet aan **alle** ontvankelijkheidscriteria zoals beschreven in de rubrics.
- [ ] Het project van Front-end Web Development voldoet aan **alle** ontvankelijkheidscriteria zoals beschreven in de rubrics.

## 🚀 Extra technologieën

> **Instructie:** Beschrijf welke extra technologieën je hebt gebruikt. Vermeld waarom je deze hebt gekozen.

### Front-end Web Development

- <LINK_NAAR_NPM_PACKAGE>
  - [Reden van keuze]
- ...

### Web Services

- <LINK_NAAR_NPM_PACKAGE>
  - [Reden van keuze]
- ...

## 🤔 Reflectie

> **Instructie:** Reflecteer eerlijk over je leerproces en het project. Dit helpt zowel jezelf als de docenten om de cursus te verbeteren.

**Wat heb je geleerd?**

[Beschrijf je belangrijkste leermoment...]

**Wat vond je goed aan dit project?**

[Positieve aspecten...]

**Wat zou je anders doen?**

[Verbeterpunten voor jezelf...]

**Wat waren de grootste uitdagingen?**

[Moeilijkheden die je bent tegengekomen...]

**Wat zou je behouden aan de cursus?**

[Wat werkt goed...]

**Wat zou je toevoegen/aanpassen?**

[Suggesties voor verbetering...]

