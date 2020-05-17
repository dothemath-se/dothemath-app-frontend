import React from 'react';
import { PopupModalProps, PopupModal } from './PopupModal';

export const UserAgreementPopupModal = (props: PopupModalProps) => (
  <PopupModal {...props}>
    <div>
      <h1>DO THE MATH - Användarvillkor</h1>

      <p>
        Välkommen till <b>DO THE MATH!</b> För att bibehålla en trivsam stämning
        samt ordning och reda i appen så har vi ett antal regler du måste följa:{' '}
      </p>

      <h2>Ställ din fråga och få hjälp</h2>
      <ul>
        <li>
          Innan du ställer en fråga bör du alltid först försöka lösa uppgiften
          på egen hand.
        </li>
        <li>
          När du går in på <b>DO THE MATH</b> för första gången så kan du ställa
          din fråga direkt i chatten till en så kallad <b>Hjälpare</b>
        </li>
        <li>
          I chatten ska du beskriva problemet, din tankegång och lösningsmetod
          så specifikt som du bara kan. Det finns även möjlighet att bifoga bild
          på din uppgift och hur du hittills försökt lösa problemet.{' '}
        </li>
        <li>
          Förutom att du och <b>Hjälparen</b> kan läsa vad som skrivs i chatten
          så övervakas detta även av <b>DO THE MATHs</b> alla <b>Hjälpare,</b>{' '}
          moderatorer och admins. Inga andra elever ser dina frågor.{' '}
        </li>
        <li>
          I chatten ska du endast skriva text och skicka eventuella bilder som
          är relaterade till uppgiften du behöver hjälp med. Undvik därför att
          skapa inlägg som är irrelevanta för sammanhanget i chatten
        </li>
        <li>
          Din chatt ska innehålla <b>en</b> fråga. Mindre delproblem som alla
          hör till huvudfrågan kan postas i samma chatt. Behöver du hjälp med en
          annan uppgift bör du skapa en <b>ny fråga.</b>
        </li>
        <li>
          Du kan endast ha <b>en</b> pågående chatt. Om du behöver hjälp med en
          annan uppgift och klickar på <b>ny fråga</b> så startas en ny chatt
          vilket innebär att historiken från den gamla raderas direkt. Därför är
          det bra att vara noga med att inte klicka på <b>ny fråga</b> förrän du
          är helt färdig med den tidigare uppgiften.{' '}
        </li>
        <li>
          All hjälp ska ske via appen genom att starta en <b>ny fråga.</b> Det
          är därför inte tillåtet att övergå till andra forum för att få
          fortsatt hjälp.
        </li>
      </ul>

      <h2>Trivsel och personliga uppgifter</h2>
      <ul>
        <li>
          Ditt användarnamn på <b>DO THE MATH</b> ska vara påhittat och får
          därför inte utgöras av ditt riktiga namn eller någon annans namn.{' '}
        </li>
        <li>
          Det är inte tillåtet att publicera personlig information såsom namn,
          personuppgifter eller bostadsadress om dig själv eller en annan
          användare
        </li>
        <li>
          Det är inte tillåtet att skicka bilder på dig själv, någon annan eller
          saker som inte är relaterat till uppgiften du behöver hjälp med.{' '}
        </li>
        <li>
          I chatten är vi snälla mot varandra. Använd därför ett vårdat språk,
          var trevlig och håll god ton mot personen som hjälper dig.{' '}
        </li>
        <li>
          Det är inte accepterat att skriva inlägg som innehåller hot,
          trakasserier, diskriminering, personangrepp, är allmänt stötande eller
          bryter mot svensk lag.{' '}
        </li>
      </ul>

      <h2>Spam, annonsering och reklam</h2>
      <ul>
        <li>Spam i chatten är förbjudet</li>
        <li>
          All typ av reklam och annonsering både i privat och kommersiellt syfte
          är förbjudet i chatten utan godkännande från <b>DO THE MATH.</b>
        </li>
      </ul>

      <h2>Fusk</h2>
      <ul>
        <li>
          Det är inte tillåtet att be om hjälp med uppgifter där samarbete eller
          yttre hjälp inte är tillåten, detta leder till avstängning. Är du
          osäker ska du fråga din lärare vad som gäller för den specifika
          uppgiften.
        </li>
        <li>
          Det är inte tillåtet att efterfråga lösningar till uppgifter eller
          hjälp i utbyte mot betalning eller belöning.
        </li>
      </ul>

      <p>
        <b>
          Syftet med DO THE MATH är endast att få hjälp med skoluppgifter. Om du
          ser att någon bryter mot detta, beter sig på ett olämpligt sätt eller
          bryter mot våra användarvillkor så bör du genast kontakta DO THE MATH
          på <a href="mailto:help@dothemath.se">help@dothemath.se</a>.
        </b>
      </p>
    </div>
  </PopupModal>
);
