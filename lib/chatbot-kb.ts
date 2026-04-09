export type ChatbotFaqItem = {
  id: string;
  question: string;
  title: string;
  answer: string;
  keywords: string[];
};

export const CHATBOT_FAQ: ChatbotFaqItem[] = [
  {
    id: "q01",
    question: "Cosa fa CyberShield in generale?",
    title: "Panoramica piattaforma",
    answer:
      "CyberShield analizza il perimetro digitale esterno, mostra priorita operative e supporta il percorso NIS2 con indicatori leggibili anche dal management.",
    keywords: ["cybershield", "piattaforma", "generale", "cos e", "panoramica"],
  },
  {
    id: "q02",
    question: "Quanti tool avete?",
    title: "Numero tool",
    answer: "Nel catalogo sono disponibili 12 tool specializzati, acquistabili singolarmente o in combinazioni promozionali dove previste.",
    keywords: ["quanti", "12", "tool", "catalogo", "strumenti"],
  },
  {
    id: "q03",
    question: "A chi serve il servizio?",
    title: "Target clienti",
    answer:
      "Serve a PMI, responsabili IT, compliance e management che vogliono una vista chiara su rischi cyber esterni, priorita e roadmap di miglioramento.",
    keywords: ["a chi", "target", "pmi", "ciso", "management"],
  },
  {
    id: "q04",
    question: "Cosa vede il cliente dopo l'acquisto?",
    title: "Output dopo acquisto",
    answer:
      "Dopo checkout e avvio analisi, il cliente vede in dashboard stato, evidenze, priorita e suggerimenti operativi. Per alcuni casi e configurazioni puo essere disponibile anche una sintesi esportabile.",
    keywords: ["dopo acquisto", "dashboard", "output", "risultato"],
  },
  {
    id: "q05",
    question: "Cosa fare dopo i responsi?",
    title: "Azioni post-responso",
    answer:
      "Dopo il responso: 1) verifica le priorita, 2) assegna owner e tempi, 3) applica remediation tecniche, 4) riesegui il controllo per confermare il miglioramento. Se serve, puoi aprire ticket o richiedere consulenza.",
    keywords: ["responso", "risultato", "prossimo passo", "remediation", "cosa fare", "ticket", "consulenza"],
  },
  {
    id: "q06",
    question: "Come funzionano i pagamenti?",
    title: "Pagamenti e checkout",
    answer:
      "I pagamenti avvengono via Stripe. Sono disponibili acquisti singoli, bundle e carnet crediti (dove configurati), oltre ai piani in abbonamento. I metodi effettivi dipendono dalla configurazione checkout attiva.",
    keywords: ["pagamento", "stripe", "bundle", "carnet", "abbonamento", "prezzo", "checkout"],
  },
  {
    id: "q07",
    question: "Posso pagare con PayPal o Klarna?",
    title: "Metodi di pagamento",
    answer:
      "Quando abilitati nel checkout Stripe del tuo ambiente, sono disponibili carta, PayPal e Klarna. La disponibilita finale dipende dalla configurazione account.",
    keywords: ["paypal", "klarna", "metodi", "carta", "stripe"],
  },
  {
    id: "q08",
    question: "Qual e la policy rimborsi?",
    title: "Rimborsi e policy",
    answer:
      "La policy rimborsi e i termini legali sono pubblicati nelle pagine legali del sito. Prima di acquistare, consulta sempre le condizioni aggiornate su rimborsi, utilizzo e limiti del servizio.",
    keywords: ["rimborso", "rimborsi", "policy", "termini", "privacy", "legale"],
  },
  {
    id: "q09",
    question: "I crediti carnet scadono?",
    title: "Scadenza carnet",
    answer:
      "Si, i crediti carnet hanno una validita temporale definita dalla configurazione del servizio. Verifica sempre durata e condizioni nella pagina dedicata ai rimborsi e crediti.",
    keywords: ["carnet", "scadenza", "crediti", "validita"],
  },
  {
    id: "q10",
    question: "Il tool garantisce la conformita NIS2?",
    title: "NIS2 e compliance",
    answer:
      "La piattaforma supporta readiness NIS2 con indicatori e autovalutazione. Non sostituisce una consulenza legale completa, ma aiuta a prioritizzare azioni e documentare un percorso di diligenza.",
    keywords: ["nis2", "compliance", "sanzioni", "board", "governance", "norma"],
  },
  {
    id: "q11",
    question: "Come funziona il percorso sul sito?",
    title: "Navigazione portale",
    answer:
      "Percorso tipico: homepage -> marketplace o subscription -> checkout -> dashboard con analisi. Dalla dashboard puoi monitorare risultati, consultare report e avviare azioni successive.",
    keywords: ["sito", "come funziona", "navigazione", "homepage", "subscription", "dashboard"],
  },
  {
    id: "q12",
    question: "Cosa analizza il tool Email Spoofing?",
    title: "Tool email",
    answer: "Il tool email valuta configurazioni e segnali utili su autenticazione del dominio mail (es. SPF, DKIM, DMARC) e priorita di intervento.",
    keywords: ["email", "spoofing", "spf", "dkim", "dmarc"],
  },
  {
    id: "q13",
    question: "Cosa analizza il tool DNS/Infrastructure?",
    title: "Tool DNS",
    answer: "Il tool DNS/infra aiuta a individuare configurazioni esposte o incoerenti del perimetro pubblico, utile per ridurre errori di setup e superfici attaccabili.",
    keywords: ["dns", "infrastruttura", "exposed", "configurazione"],
  },
  {
    id: "q14",
    question: "Cosa analizza il tool cloud?",
    title: "Tool cloud",
    answer: "Il tool cloud evidenzia indicatori su asset e posture esterne legate ai servizi cloud, per agevolare una prioritizzazione tecnica lato operations.",
    keywords: ["cloud", "asset", "posture"],
  },
  {
    id: "q15",
    question: "Cosa analizza il tool brand/typo?",
    title: "Tool brand protection",
    answer: "Il tool brand protection aiuta a intercettare segnali su domini simili o pattern riconducibili a possibili abusi di naming del brand.",
    keywords: ["brand", "typo", "typosquatting", "domini simili"],
  },
  {
    id: "q16",
    question: "Cosa analizza il tool leak?",
    title: "Tool data leak",
    answer: "Il tool leak monitora indicatori esterni relativi a esposizioni informative, per avviare remediation e controlli interni mirati.",
    keywords: ["leak", "data leak", "esposizione dati"],
  },
  {
    id: "q17",
    question: "I risultati sono in tempo reale?",
    title: "Tempi risposta",
    answer: "I tempi possono variare in base al tool e al carico. In generale ricevi stato di avanzamento e poi output sintetico utilizzabile subito.",
    keywords: ["tempo", "real time", "attesa", "stato analisi"],
  },
  {
    id: "q18",
    question: "Posso usare il servizio su domini terzi?",
    title: "Uso lecito",
    answer: "No, il servizio va usato solo su domini e asset di cui hai titolarita o autorizzazione. La piattaforma applica controlli e policy di uso lecito.",
    keywords: ["domini terzi", "autorizzazione", "uso lecito", "policy"],
  },
  {
    id: "q19",
    question: "Posso avere supporto umano?",
    title: "Supporto umano",
    answer: "Si. Se il chatbot non basta, puoi aprire un ticket dalla sezione Assistenza per ricevere supporto operativo.",
    keywords: ["umano", "supporto", "ticket", "assistenza"],
  },
  {
    id: "q20",
    question: "Dove apro un ticket?",
    title: "Apertura ticket",
    answer: "Vai su Assistenza/Helpdesk, compila email, oggetto e messaggio. Riceverai un ID ticket per monitoraggio interno.",
    keywords: ["aprire ticket", "helpdesk", "id ticket"],
  },
  {
    id: "q21",
    question: "Posso prenotare una consulenza?",
    title: "Consulenza",
    answer: "Si, nella sezione dedicata puoi prenotare una call o richiedere percorso consulenziale su misura.",
    keywords: ["consulenza", "booking", "call"],
  },
  {
    id: "q22",
    question: "Che differenza c'e tra pay-per-use e abbonamento?",
    title: "Modelli acquisto",
    answer: "Pay-per-use: acquisti analisi singole/bundle. Abbonamento: continuita operativa con quote e funzionalita estese secondo piano.",
    keywords: ["pay per use", "abbonamento", "differenza", "piano"],
  },
  {
    id: "q23",
    question: "Come capire quale tool acquistare per primo?",
    title: "Scelta tool iniziale",
    answer: "Inizia dal rischio piu vicino al business: email e brand per reputazione, DNS/infra per superficie esposta, NIS2 per governance e priorita board.",
    keywords: ["quale tool", "iniziare", "scelta"],
  },
  {
    id: "q24",
    question: "I dati caricati vengono condivisi con terzi?",
    title: "Privacy sintetica",
    answer: "Il trattamento dati segue termini e privacy pubblicati sul sito. Per dettagli aggiornati consulta sempre le pagine legali ufficiali.",
    keywords: ["privacy", "dati", "terzi", "gdpr"],
  },
  {
    id: "q25",
    question: "Posso usare il risultato come audit legale definitivo?",
    title: "Limite d'uso output",
    answer: "No, l'output e uno strumento decisionale/operativo. Per pareri legali o attestazioni formali serve consulenza specialistica dedicata.",
    keywords: ["audit legale", "definitivo", "limite", "parere"],
  },
  {
    id: "q26",
    question: "Il chatbot puo dare preventivi finali?",
    title: "Preventivi",
    answer: "Il chatbot fornisce orientamento. Per preventivi o condizioni finali fa fede la proposta commerciale ufficiale e il checkout attivo.",
    keywords: ["preventivo", "prezzi finali", "offerta"],
  },
  {
    id: "q27",
    question: "Come funziona la newsletter?",
    title: "Newsletter",
    answer: "La newsletter condivide aggiornamenti su cyber, NIS2 e casi d'uso commerciali. Puoi iscriverti dalla homepage e disiscriverti quando vuoi.",
    keywords: ["newsletter", "iscrizione", "contenuti"],
  },
  {
    id: "q28",
    question: "Che rapporto c'e tra CyberShield e servizi TLC?",
    title: "Integrazione TLC",
    answer: "CyberShield copre analisi cyber e readiness. Le proposte TLC sono percorsi commerciali complementari gestiti come offerte dedicate.",
    keywords: ["tlc", "fastweb", "enterprise", "offerte commerciali"],
  },
  {
    id: "q29",
    question: "Il chatbot puo sbagliare?",
    title: "Qualita risposte",
    answer: "Si, come ogni assistente automatico puo dare indicazioni incomplete. Usa le risposte come orientamento e conferma i punti critici con il team.",
    keywords: ["errore", "sbagliare", "accuratezza"],
  },
  {
    id: "q30",
    question: "Da dove parto se e la prima volta?",
    title: "Primo passo consigliato",
    answer: "Apri il marketplace, scegli il tool piu vicino al tuo bisogno immediato, completa checkout e usa la dashboard per leggere priorita e next step.",
    keywords: ["prima volta", "inizio", "da dove parto"],
  },
];

export const CHATBOT_COMMERCIAL_DISCLAIMER =
  "Le risposte del chatbot sono informative e orientative. Prezzi, disponibilita e condizioni finali fanno fede solo se confermati in checkout, proposta commerciale o documenti legali ufficiali.";

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

export function answerFromFaq(input: string): string {
  const tokens = tokenize(input);
  if (!tokens.length) {
    return "Scrivimi una domanda su tool, risultati, pagamenti, rimborsi o assistenza e ti aiuto subito.";
  }

  let bestItem: ChatbotFaqItem | null = null;
  let bestScore = 0;

  for (const item of CHATBOT_FAQ) {
    let score = 0;
    for (const keyword of item.keywords) {
      const key = keyword.toLowerCase();
      if (tokens.some((token) => key.includes(token) || token.includes(key))) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  }

  if (!bestItem || bestScore === 0) {
    return "Posso aiutarti su prodotti e tool, cosa aspettarti dai responsi, pagamenti, rimborsi, policy e assistenza ticket. Prova con una domanda piu specifica.";
  }

  return bestItem.answer;
}
