# Labbgrund till Moment 4 i kursen DT084G, Introduktion till programmering i JavaScript

Skapad av Kevin Maninnerby, kema2501@student.miun.se

## Studentkorts-generator, funktioner
* Genererar studentkort utfriån givna värden (namn, epost,telefonnr och val av typsnitt).
* Validerar formuläret och kollar så att alla fält är ifyllda
* Lagrar värden i webStorage
* Visar tidigare lagrade världen under historik och ger möjlighet att återskapa tidigare skapde studentkort.

## Förbättringsförslag:
* Just nu behöver sidan manuellt laddas om för att läsa in historik. 
* Sättet som programmet lagrar information i webStorage kan bugga, exempelvis om användare raderar en lagringspost manuellt.
