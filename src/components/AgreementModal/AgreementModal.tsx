import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

interface AgreementModalProps {
  type: 'cookies' | 'user' | 'privacy';
  onCloseClick: () => any;
}

export const AgreementModal = ({ type, onCloseClick }: AgreementModalProps) => {
  return (
    <ReactModal
      isOpen
      style={{
        overlay: {
          zIndex: 100,
        },
      }}
    >
      {type === 'cookies' && <Cookiepolicy />}
      {type === 'privacy' && <PrivacyPolicy />}
      {type === 'user' && <UserAgreement />}
      <button onClick={onCloseClick}>Stäng</button>
    </ReactModal>
  );
};

const Cookiepolicy = () => (
  <div>
    <p>Stockholm</p>
    <p>2020-05-07</p>
    <h1>Cookiepolicy för DoTheMath</h1>
    <p>
      Syftet med denna policy är att ge dig som användare av DoTheMaths tjänster
      tydlig och lättillgänglig information om de cookies som vi använder,
      vilken roll de spelar för att hjälpa oss att ge dig bästa möjliga
      upplevelse och vilka val du har när det gäller dina cookieinställningar
    </p>

    <h2>1. Vad är cookies?</h2>
    <p>
      Cookies är textfiler som laddas ner till din enhet när du besöker en
      webbplats. De är praktiska eftersom de gör att en webbplats kan känna igen
      en användares enhet. Mer information om cookies finns på:{' '}
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
        <b>Varaktiga cookies:</b> cookies som ligger kvar på din dator tills du
        raderar dem eller de upphör att gälla
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
      Cookies gör det möjligt för vår webbplats och våra tjänster att komma ihåg
      dina val och preferenser (så som inloggning, textstorlek och andra
      inställningar) under en tid, så att du inte behöver ställa in dem på nytt
      varje gång du besöker oss.
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
        förifylla dina uppgifter eller inte. Utan dessa typer av cookies skulle
        vi inte kunna skräddarsy våra tjänster enligt dina önskemål. Dessa
        cookies är till för att få din upplevelse att bli så bekväm som möjligt.
      </li>
    </ul>

    <h2>3. Så hanterar du dina inställningar för cookies</h2>
    <h3>Cookies i webbläsaren</h3>
    <p>
      Du kan när som helst dra tillbaka eller ändra ditt medgivande till vår
      användning av cookies. Om du inte längre vill ta emot cookies kan du
      använda dina webbläsarinställningar för att godkänna, neka och ta bort
      cookies. För att göra det följer du instruktionerna som finns i
      webbläsaren (vanligtvis under ”Hjälp”, ”Verktyg” eller ”Redigera”). Om du
      vill ha mer information kan du besöka{' '}
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
      På din mobila enhet kan ditt operativsystem ge dig ytterligare alternativ
      för att avböja anpassad annonsering eller på annat sätt återställa dina
      mobila identifierare. Du kan t ex. använda ”Limit Ad Tracking” (Begränsa
      spårning) (på iOS-enheter) eller en inställning om att ”Opt out of
      Interest-Based Ads” (Avböja anpassade annonser) (Android) vilket gör att
      du kan begränsa användningen av information om din användning av appar för
      annonser som är inriktade på dina intressen
    </p>

    <h2>4. Uppdateringar av denna policy</h2>
    <p>
      Denna Policy uppdaterades senast den 7 maj 2020 och kan komma att ändras.
      Om väsentliga ändringar i texten görs kommer vi att meddela dig senast 30
      dagar innan ändringen träder i kraft genom tjänsten eller genom att
      publicera en ny version på vår webplats; dothemath.se. Se till att du
      läser sådana meddelanden noggrant.
    </p>
    <p>
      Om du vill ta reda på mer om hur DoTheMath använder dina personliga
      uppgifter kan du hitta den informationen i vår integritetspolicy.
    </p>

    <h2>5. Så kontaktar du oss</h2>
    <p>
      Tack för att du har läst vår cookiepolicy. Om du har några frågor om denna
      cookiepolicy kan du kontakta oss på{' '}
      <a href="mailto:privacy@dothemath.se">privacy@dothemath.se</a>.
    </p>
  </div>
);

const PrivacyPolicy = () => (
  <div>
    <p>Stockholm</p>
    <p>2020-05-07</p>
    <h1>Integritetspolicy för DoTheMath</h1>

    <h2>1. Bakgrund och syfte</h2>
    <p>
      Vi vill ge dig bästa möjliga upplevelse när du använder DoTheMath och se
      till att du har glädje av vår tjänst. För att göra detta behöver vi lagra
      viss information om dig, så att vi kan göra din upplevelse personlig, men
      också möjliggöra för oss att på ett effektivt sätt ge dig ett så bra svar
      som möjligt. Integritet och skydd av dina personuppgifter är, och kommer
      att förbli, enormt viktig för oss. Därför vill vi på ett transparent sätt
      beskriva hur vi samlar in, lagrar, delar och behandlar dina
      personuppgifter samt beskriva dina val- och kontrollmöjligheter kring när
      och hur du väljer att dela dina personuppgifter. Denna integritetspolicy
      förklarar mer detaljerat vad vi menar, och syftet med den är att:
    </p>
    <ul>
      <li>
        Säkerställa att du förstår vilka personuppgifter vi samlar in om dig,
        ändamålen med varför vi samlar in och behandlar dem, samt vem vi delar
        dem med;
      </li>
      <li>
        Förklara på vilket sätt vi behandlar de personuppgifter som du delar med
        oss för att ge dig en bra upplevelse när du använder DoTheMath-tjänsten;
        och
      </li>
      <li>
        Förklara vilka rättigheter och valmöjligheter du har avseende de
        personuppgifter vi samlar in och behandlar om dig, samt hur vi skyddar
        din integritet.
      </li>
    </ul>

    <h2>2. Definitioner</h2>
    <p>
      Med <i>personuppgift</i> menar vi i den här integritetspolicyn all slags
      information som direkt eller indirekt kan hänföras till en fysisk person
      som är i livet.
    </p>

    <p>
      Med <i>känslig personuppgift</i> menas sådana uppgifter som avslöjar ras
      eller etniskt ursprung, politiska åsikter, religiös eller filosofisk
      övertygelse, medlemskap i fackförening samt personuppgifter som rör hälsa
      eller sexualliv. Uppgifter om hälsa kan vara till exempel sjukfrånvaro,
      graviditet och läkarbesök.
    </p>

    <p>
      <i>Behandling av personuppgifter</i> är varje åtgärd eller serie av
      åtgärder som vidtas i fråga om personuppgifter till exempel insamling,
      registrering, organisering, lagring, bearbetning, ändring, återvinning,
      inhämtande, användning, utlämnande genom översändande, spridning eller
      annat tillhandahållande av uppgifter, sammanställning eller samkörning,
      blockering, utplåning eller förstöring.
    </p>

    <p>
      <i>Personuppgiftsansvarig</i> är Måns Nilsson.
    </p>

    <p>
      <i>Personuppgiftsbiträde</i> är alltid någon utanför den egna
      organisationen som på uppdrag av den personuppgiftsansvarige får behandla
      personuppgifter, dock endast i enlighet med instruktioner från denne. Ett
      skriftligt avtal som reglerar förhållandet mellan personuppgiftsbiträdet
      och den personuppgiftsansvarige måste finnas där säkerhetsåtgärderna vid
      behandlingen av personuppgifter regleras.
    </p>

    <p>
      Med <i>medlem</i> avses den som i enlighet med DoTheMath:s stadgar vara
      medlem
    </p>

    <h2>3. Medlemmar och enskilda personers rättigheter</h2>
    <p>
      EU:s dataskyddsförordning eller ”GDPR” ger individer vissa rättigheter
      avseende deras personuppgifter. Vi erbjuder därför transparens och
      åtkomstkontroller som hjälper användare att nyttja de rättigheter som är
      tillgängliga enligt gällande lag och med de begränsningar som gäller
      enligt lag. Individers rättigheter innefattar:
    </p>

    <ul>
      <li>
        Rätt till tillgång - rätten att informeras om, och begära tillgång till,
        de personuppgifter som vi behandlar om dig, och hur de behandlas.
      </li>
      <li>
        Rätt till rättelse - rätten att begära att vi rättar eller uppdaterar
        dina personuppgifter om de är felaktiga eller ofullständiga
      </li>
      <li>
        Rätt till radering - rätten att begära att vi raderar dina
        personuppgifter när alla förpliktelser är uppfyllda så som till exempel
        skulder betalda.
      </li>
      <li>
        Rätt till begränsning - rätten att begära att vi tillfälligt eller
        permanent upphör med behandlingen av alla eller vissa av dina
        personuppgifter;
      </li>
      <li>
        Rätt att invända -
        <ul>
          <li>
            rätten att, när som helst, invända mot att vi behandlar dina
            personuppgifter för ett visst ändamål;
          </li>
          <li>
            rätten att invända mot att dina personuppgifter behandlas för
            direktmarknadsföring;
          </li>
        </ul>
      </li>
      <li>
        Rätt till dataportabilitet - rätten att begära en kopia av dina
        personuppgifter i elektroniskt format för att överföra dessa
        personuppgifter för användning i en annan parts tjänster; samt
      </li>
      <li>
        Rätt att inte bli föremål för automatiserat beslutsfattande - rätten att
        inte bli föremål för några beslut som grundas enbart på automatiserat
        beslutsfattande, inklusive profilering, där beslut skulle medföra
        rättsliga följder för dig eller annan påverkan av liknande karaktär.
      </li>
    </ul>

    <p>
      Slutligen har du även rätt att lämna in ett klagomål till Datainspektionen
      med avseende på vår behandling av dina personuppgifter. Du når dem på +46
      8 657 61 00,{' '}
      <a href="mailto:datainspektionen@datainspektion.se">
        datainspektionen@datainspektion.se
      </a>
      , box 8114, 104 20 Stockholm.
    </p>

    <h2>4. Uppgifter som DoTheMath samlar in, behandlar och använder</h2>
    <p>
      DoTheMath samlar in, och behandlar dina personuppgifter för att
      tillhandahålla och förbättra tjänsten samt uppfylla våra åtaganden
      gentemot dig.{' '}
    </p>

    <ol>
      <li>
        <b>Information som samlas in</b>
        <ol type="a">
          <li>
            <p>
              <b>Användaruppgifter</b>
            </p>
            <p>
              Dessa är de personuppgifter som du tillhandahållit eller som vi
              samlat in för att du ska kunna registrera dig för och använda
              tjänsten. De inkluderar:
            </p>
            <ul>
              <li>Användarnamn</li>
            </ul>
          </li>

          <li>
            <p>
              <b>Användningsdata</b>
            </p>
            <p>
              Dessa är de personuppgifter som du tillhandahållit eller som vi
              samlat in när du använder tjänsten. De inkluderar:
            </p>
            <ul>
              <li>Publicerad text</li>
              <li>Publicerade bilder.</li>
              <li>
                Vissa tekniska data som kan innefatta:
                <ul>
                  <li>
                    Identifierare som kan innefatta cookiedata och IP-adresser,
                    operativsystem samt webbläsare
                  </li>
                  <li>ID på meddelandet, tråden och kanalen i Slack.</li>
                  <li>
                    Din enhets ungefärliga geografiska plats, vilken kan bli
                    härledd eller antydas från vissa tekniska data (såsom din
                    IP-adress, språkinställning på din enhet).
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            <p>
              <b>Vid kontakt</b>
            </p>
            <p>
              Om en användare kontaktar DoTheMath via e-post, telefon, eller
              genom tjänsten, samlar DoTheMath in namn, telefonnummer och
              e-postadress, beroende på kontaktform, samt övriga personuppgifter
              som krävs för att kunna assistera den som kontaktar oss.
            </p>
          </li>

          <li>
            <p>
              <b>Cookies</b>
            </p>
            <p>
              Vid användning av tjänsten samlar Företaget in uppgifter genom så
              kallade cookies. Mer information finns i vår cookie policy. Vid
              besök på Företagets webbplats eller vid användning av tjänsten
              samlas följande data in genom cookies: trafikdata, IP-adress, typ
              av enhet, operativsystem och webbläsartyp som besökaren använder.
            </p>
          </li>
        </ol>
      </li>

      <li>
        <b>Behandling av information</b>
        <p>
          DoTheMath behandlar personuppgifter för följande ändamål och baserat
          på följande lagliga grunder:
        </p>

        <table>
          <tbody>
            <tr>
              <th>Syfte med behandlingen</th>
              <th>Laglig grund för behandlingen</th>
              <th>Kategorier av personuppgifter</th>
              <th>Lagringstid</th>
            </tr>

            <tr>
              <td>För att tillhandahålla och anpassa tjänsten</td>
              <td>Intresseavvägning</td>
              <td>
                Användaruppgifter
                <br />
                Användningsdata
              </td>
              <td>90 dagar</td>
            </tr>

            <tr>
              <td>
                För att förstå, diagnostisera, felsöka och lösa problem med
                tjänsten
              </td>
              <td>Intresseavvägning</td>
              <td>
                Användaruppgifter
                <br />
                Användningsdata
              </td>
              <td>90 dagar</td>
            </tr>

            <tr>
              <td>
                För att utvärdera och utveckla nya funktioner, tekniker och
                förbättringar av tjänsten
              </td>
              <td>Intresseavvägning</td>
              <td>
                Användaruppgifter
                <br />
                Användningsdata
              </td>
              <td>90 dagar</td>
            </tr>

            <tr>
              <td>
                För att efterleva rättsliga åtaganden och förfrågningar i
                förhållande till rättsväsendet
              </td>
              <td>
                Rättslig förpliktelse <br /> Intresseavvägning
              </td>
              <td>
                Användaruppgifter
                <br />
                Användningsdata
              </td>
              <td>90 dagar</td>
            </tr>

            <tr>
              <td>För att upptäcka bedrägeri, och fusk i tjänsten</td>
              <td>Intresseavvägning</td>
              <td>
                Användaruppgifter
                <br />
                Användningsdata
              </td>
              <td>90 dagar</td>
            </tr>
          </tbody>
        </table>
      </li>

      <li>
        <b>Delning av information</b>
        <p>
          Vi överför till, eller delar personuppgifter med, andra parter som
          behandlar data för vår räkning i form av personuppgiftsbiträden, för
          att vi ska kunna tillhandahålla tjänsten. DoTheMath använder följande
          underleverantörer eller kategorier av underleverantörer:
        </p>

        <table>
          <tbody>
            <tr>
              <th>Underleverantör (namn på tjänst)</th>
              <th>Land/region där tjänsten fullgörs</th>
              <th>Typ av tjänst</th>
            </tr>

            <tr>
              <td>Slack</td>
              <td>USA</td>
              <td>Direkta meddelanden</td>
            </tr>

            <tr>
              <td>Microsoft Azure</td>
              <td>Norra europa</td>
              <td>Web hosting</td>
            </tr>
          </tbody>
        </table>

        <p>
          Vi samarbetar endast med företag som behandlar personuppgifter inom
          EU/EES eller med företag som upprätthåller samma skyddsnivå som inom
          EU/EES genom att till exempel ha anslutit sig till den s.k. Privacy
          Shield-överenskommelsen mellan EU och USA.
        </p>

        <p>
          Vi lämnar också ut nödvändiga personuppgifter till myndigheter som
          polis, skattemyndigheter eller andra myndigheter om vi är skyldigt att
          göra det enligt lag. Ett exempel på laglig utlämning är i syfte att
          bekämpa penningtvätt och finansiering mot terrorism.
        </p>
      </li>

      <li>
        <b>Lagring och radering av information</b>
        <p>
          Vi sparar dina personuppgifter endast så länge som är nödvändigt för
          att du ska kunna använda tjänsten, samt för legitima och väsentliga
          affärsändamål, såsom för att underhålla tillhandahållandet av
          tjänsten, möjliggöra databaserade beslut om nya funktioner, uppfylla
          våra rättsliga förpliktelser och för att kunna lösa tvister. Vi sparar
          vissa av dina personuppgifter under den tid du använder tjänsten, dock
          inte längre än 90 dagar efter ditt sista användande
        </p>
        <p>
          På din begäran tar vi bort eller anonymiserar dina personuppgifter så
          att de inte längre identifierar dig, såvida vi inte är rättsligt
          berättigade eller skyldiga att behålla vissa personuppgifter, såsom
          vid följande situationer:
        </p>
        <ul>
          <li>
            Om det finns ett olöst problem hänförligt till ditt konto, såsom en
            utestående kredit avseende ditt konto, ett utestående krav eller vid
            tvist, kommer vi att spara nödvändiga personuppgifter till dess att
            problemet är löst
          </li>
          <li>
            Om det föreligger en rättslig, skattemässig, revisionsmässig
            och/eller bokföringsmässig skyldighet för oss att lagra
            personuppgift, kommer vi att lagra nödvändiga personuppgifter under
            den tidsperiod som görs gällande i tillämplig lagstiftning
          </li>
          <li>
            Om det är nödvändigt för våra legitima affärsintressen, såsom för
            att förebygga bedrägeri eller upprätthålla säkerhet för våra
            användare.
          </li>
        </ul>
      </li>
    </ol>

    <h2>5. Säkerhet</h2>
    <p>
      Vi är angelägna om att skydda våra användares personuppgifter. Vi vidtar
      lämpliga tekniska och organisatoriska åtgärder för att säkerställa ett
      skydd för dina personuppgifter, men vänligen notera att inget system är
      helt säkert. I händelse av personuppgiftsincidenter kommer detta att
      inrapportera till integritetsskyddsmyndigheten inom 72 timmar. Om det inte
      är osannolikt att brukaren av tjänsten riskerar att ta skada är nationen
      skyldig att informera de registrerade så de kan vidta nödvändiga åtgärder.
    </p>
    <p>Alla personuppgiftsincidenter dokumenteras.</p>

    <h2>6. Ändring av integritetspolicyn</h2>
    <p>
      Denna Policy uppdaterades senast den 7 maj 2020 och kan komma att ändras.
      Om väsentliga ändringar i texten görs kommer vi att meddela dig senast 30
      dagar innan ändringen träder i kraft genom tjänsten eller genom att
      publicera en ny version på vår webbplats; dothemath.se. Se till att du
      läser sådana meddelanden noggrant.
    </p>

    <h2>7. Kontakt</h2>
    <p>
      Vid synpunkter eller frågor avseende vår integritetspolicy, olösta problem
      avseende integritet och användning av personuppgifter som vi inte har
      hanterat på ett tillfredsställande sätt, eller avseende eventuella
      överträdelser som rör din integritet, kan du kontakta oss via vår
      e-mailadress;{' '}
      <a href="mailto:privacy@dothemath.se">privacy@dothemath.se</a>.
    </p>

    <p>
      Vi behandlar din begäran och eventuella klagomål konfidentiellt. Vår
      representant kommer att kontakta dig för att hantera eventuella problem
      och beskriva de alternativ som finns för att åtgärda dessa. Vi strävar
      efter att åtgärda klagomål inom rimlig tid och på lämpligt sätt.
    </p>
  </div>
);

const UserAgreement = () => (
  <div>
    <h1>DO THE MATH - Användarvillkor</h1>

    <p>
      Välkommen till <b>DO THE MATH!</b> För att bibehålla en trivsam stämning
      samt ordning och reda i appen så har vi ett antal regler du måste följa:{' '}
    </p>

    <h2>Ställ din fråga och få hjälp</h2>
    <ul>
      <li>
        Innan du ställer en fråga bör du alltid först försöka lösa uppgiften på
        egen hand.
      </li>
      <li>
        När du går in på <b>DO THE MATH</b> för första gången så kan du ställa
        din fråga direkt i chatten till en så kallad <b>Hjälpare</b>
      </li>
      <li>
        I chatten ska du beskriva problemet, din tankegång och lösningsmetod så
        specifikt som du bara kan. Det finns även möjlighet att bifoga bild på
        din uppgift och hur du hittills försökt lösa problemet.{' '}
      </li>
      <li>
        Förutom att du och <b>Hjälparen</b> kan läsa vad som skrivs i chatten så
        övervakas detta även av <b>DO THE MATHs</b> alla <b>Hjälpare,</b>{' '}
        moderatorer och admins. Inga andra elever ser dina frågor.{' '}
      </li>
      <li>
        I chatten ska du endast skriva text och skicka eventuella bilder som är
        relaterade till uppgiften du behöver hjälp med. Undvik därför att skapa
        inlägg som är irrelevanta för sammanhanget i chatten
      </li>
      <li>
        Din chatt ska innehålla <b>en</b> fråga. Mindre delproblem som alla hör
        till huvudfrågan kan postas i samma chatt. Behöver du hjälp med en annan
        uppgift bör du skapa en <b>ny fråga.</b>
      </li>
      <li>
        Du kan endast ha <b>en</b> pågående chatt. Om du behöver hjälp med en
        annan uppgift och klickar på <b>ny fråga</b> så startas en ny chatt
        vilket innebär att historiken från den gamla raderas direkt. Därför är
        det bra att vara noga med att inte klicka på <b>ny fråga</b> förrän du
        är helt färdig med den tidigare uppgiften.{' '}
      </li>
      <li>
        All hjälp ska ske via appen genom att starta en <b>ny fråga.</b> Det är
        därför inte tillåtet att övergå till andra forum för att få fortsatt
        hjälp.
      </li>
    </ul>

    <h2>Trivsel och personliga uppgifter</h2>
    <ul>
      <li>
        Ditt användarnamn på <b>DO THE MATH</b> ska vara påhittat och får därför
        inte utgöras av ditt riktiga namn eller någon annans namn.{' '}
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
        I chatten är vi snälla mot varandra. Använd därför ett vårdat språk, var
        trevlig och håll god ton mot personen som hjälper dig.{' '}
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
        yttre hjälp inte är tillåten, detta leder till avstängning. Är du osäker
        ska du fråga din lärare vad som gäller för den specifika uppgiften.
      </li>
      <li>
        Det är inte tillåtet att efterfråga lösningar till uppgifter eller hjälp
        i utbyte mot betalning eller belöning.
      </li>
    </ul>

    <p>
      <b>
        Syftet med DO THE MATH är endast att få hjälp med skoluppgifter. Om du
        ser att någon bryter mot detta, beter sig på ett olämpligt sätt eller
        bryter mot våra användarvillkor så bör du genast kontakta DO THE MATH på{' '}
        <a href="mailto:help@dothemath.se">help@dothemath.se</a>.
      </b>
    </p>
  </div>
);
