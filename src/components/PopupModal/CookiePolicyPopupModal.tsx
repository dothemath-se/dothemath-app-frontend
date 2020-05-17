import React from 'react';
import { PopupModalProps, PopupModal } from './PopupModal';

export const CookiePolicyPopupModal = (props: PopupModalProps) => (
  <PopupModal {...props}>
    <div>
      <p>Stockholm</p>
      <p>2020-05-07</p>
      <h1>Cookiepolicy för DoTheMath</h1>
      <p>
        Syftet med denna policy är att ge dig som användare av DoTheMaths
        tjänster tydlig och lättillgänglig information om de cookies som vi
        använder, vilken roll de spelar för att hjälpa oss att ge dig bästa
        möjliga upplevelse och vilka val du har när det gäller dina
        cookieinställningar
      </p>

      <h2>1. Vad är cookies?</h2>
      <p>
        Cookies är textfiler som laddas ner till din enhet när du besöker en
        webbplats. De är praktiska eftersom de gör att en webbplats kan känna
        igen en användares enhet. Mer information om cookies finns på:{' '}
        <a
          href="https://allaboutcookies.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.allaboutcookies.org
        </a>{' '}
        eller{' '}
        <a
          href="https://youronlinechoices.eu"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.youronlinechoices.eu.
        </a>
      </p>

      <p>Vi använder oss av följande cookies:</p>
      <ul>
        <li>
          <b>Sessionscookies:</b> tillfälliga cookies som upphör när du stänger
          din webbläsare eller app
        </li>
        <li>
          <b>Varaktiga cookies:</b> cookies som ligger kvar på din dator tills
          du raderar dem eller de upphör att gälla
        </li>
        <li>
          <b>Förstapartscookies:</b> cookies satta av webbplatsen du besöker
        </li>
        <li>
          <b>Tredjepartscookies:</b> cookies satta av en tredjepartssida
        </li>
      </ul>

      <p>
        Web beacons är små transparenta grafiska bilder som kan finnas i e-post
        som vi skickar till dig. ”Liknande tekniker” är tekniker som lagrar
        information i din webbläsare eller på din enhet på ett sätt som liknar
        cookies och web beacons
      </p>
      <p>
        Cookies gör det möjligt för vår webbplats och våra tjänster att komma
        ihåg dina val och preferenser (så som inloggning, textstorlek och andra
        inställningar) under en tid, så att du inte behöver ställa in dem på
        nytt varje gång du besöker oss.
      </p>

      <h2>2. Hur använder vi cookies</h2>
      <p>
        De cookies vi använder förbättrar normalt sett de tjänster vi erbjuder
        dig. Generellt sett kategoriserar vi våra cookies och deras användning
        enligt följande:
      </p>
      <ul>
        <li>
          Nödvändiga cookies är absolut nödvändiga för att kunna erbjuda våra
          grundläggande tjänster. Våra tjänster skulle inte fungera utan dessa
          cookies
        </li>
        <li>
          Optimeringscookies ger oss övergripande analytisk information avseende
          din användning av våra tjänster. Det hjälper oss att kontinuerligt
          förbättra våra produkter, vilket är nödvändigt eftersom våra produkter
          inte skulle inte vara lika bra utan dessa cookies.
        </li>
        <li>
          Preferenscookies möjliggör för oss att spara inställningar såsom att
          förifylla dina uppgifter eller inte. Utan dessa typer av cookies
          skulle vi inte kunna skräddarsy våra tjänster enligt dina önskemål.
          Dessa cookies är till för att få din upplevelse att bli så bekväm som
          möjligt.
        </li>
      </ul>

      <h2>3. Så hanterar du dina inställningar för cookies</h2>
      <h3>Cookies i webbläsaren</h3>
      <p>
        Du kan när som helst dra tillbaka eller ändra ditt medgivande till vår
        användning av cookies. Om du inte längre vill ta emot cookies kan du
        använda dina webbläsarinställningar för att godkänna, neka och ta bort
        cookies. För att göra det följer du instruktionerna som finns i
        webbläsaren (vanligtvis under ”Hjälp”, ”Verktyg” eller ”Redigera”). Om
        du vill ha mer information kan du besöka{' '}
        <a
          href="https://allaboutcookies.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.allaboutcookies.org.
        </a>
      </p>

      <h3>Mobila identifierare</h3>
      <p>
        På din mobila enhet kan ditt operativsystem ge dig ytterligare
        alternativ för att avböja anpassad annonsering eller på annat sätt
        återställa dina mobila identifierare. Du kan t ex. använda ”Limit Ad
        Tracking” (Begränsa spårning) (på iOS-enheter) eller en inställning om
        att ”Opt out of Interest-Based Ads” (Avböja anpassade annonser)
        (Android) vilket gör att du kan begränsa användningen av information om
        din användning av appar för annonser som är inriktade på dina intressen
      </p>

      <h2>4. Uppdateringar av denna policy</h2>
      <p>
        Denna Policy uppdaterades senast den 7 maj 2020 och kan komma att
        ändras. Om väsentliga ändringar i texten görs kommer vi att meddela dig
        senast 30 dagar innan ändringen träder i kraft genom tjänsten eller
        genom att publicera en ny version på vår webplats; dothemath.se. Se till
        att du läser sådana meddelanden noggrant.
      </p>
      <p>
        Om du vill ta reda på mer om hur DoTheMath använder dina personliga
        uppgifter kan du hitta den informationen i vår integritetspolicy.
      </p>

      <h2>5. Så kontaktar du oss</h2>
      <p>
        Tack för att du har läst vår cookiepolicy. Om du har några frågor om
        denna cookiepolicy kan du kontakta oss på{' '}
        <a href="mailto:privacy@dothemath.se">privacy@dothemath.se</a>.
      </p>
    </div>
  </PopupModal>
);
