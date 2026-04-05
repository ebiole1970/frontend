/** Mirror di `backend/app/core/marketplace_tool_details.py` — merge in `marketplace-tools-fallback`. */

export type ToolDetailBlock = {
  short_description: string;
  guide_what_it_does: string;
  guide_activities: string[];
  guide_immediate_result: string;
  guide_pdf_email: string | null;
};

export const TOOL_DETAILS_FALLBACK: Record<string, ToolDetailBlock> = {
  dark_exec: {
    short_description:
      "Verifica se credenziali e dati dei vertici compaiono in leak o marketplace illegali.",
    guide_what_it_does:
      "Analisi orientata ai profili dirigenziali: confronto con fonti OSINT e breach noti per capire se email o password aziendali sono esposte, con priorità sulla riduzione del rischio reputazionale.",
    guide_activities: [
      "Raccolta indicatori su dominio e indirizzi email forniti (scope da confermare in dashboard).",
      "Correlazione con dataset breach e segnalazioni pubbliche pertinenti.",
      "Sintesi rischi e priorità di remediation (password, MFA, account condivisi).",
    ],
    guide_immediate_result:
      "Esito e priorità nella dashboard GetNeuralOps subito dopo l’elaborazione: stato leak, indicatori e prossimi passi consigliati.",
    guide_pdf_email:
      "Opzionale: sintesi in PDF inviata all’email di fatturazione o all’account registrato, utile per audit interni e assicuratori (se attivo nel piano o come add-on).",
  },
  shadow_it: {
    short_description: "Mappa host, servizi e superficie esposta che potresti non aver censito.",
    guide_what_it_does:
      "Scansione della superficie pubblica collegata al dominio / IP indicati per individuare servizi dimenticati, porte aperte o configurazioni che aumentano la superficie d’attacco.",
    guide_activities: [
      "Enumerazione servizi e porte rilevanti per lo scope definito.",
      "Confronto con buone pratiche (esposizione minima necessaria).",
      "Elenco prioritizzato di elementi da verificare o chiudere.",
    ],
    guide_immediate_result:
      "Report interattivo in dashboard: elenco risorse rilevate, severità indicativa e note operative.",
    guide_pdf_email:
      "Riepilogo PDF su richiesta o secondo piano abbonamento, per allegati a report di compliance.",
  },
  nis2_gap: {
    short_description: "Autovalutazione rapida allineata agli obblighi NIS2 per priorità e gap.",
    guide_what_it_does:
      "Questionario guidato e punteggio di allineamento agli ambiti tipici della direttiva NIS2, con evidenza delle aree da approfondire con consulenza dedicata.",
    guide_activities: [
      "Compilazione criteri per ambito organizzativo e servizi essenziali.",
      "Calcolo indicatore di maturità e gap principali.",
      "Suggerimenti su documentazione e processi da rafforzare.",
    ],
    guide_immediate_result:
      "Punteggio, gap evidenziati e raccomandazioni sintetiche disponibili subito in dashboard.",
    guide_pdf_email: "Export PDF riassuntivo per CdA o fornitori (se incluso nel prodotto o piano).",
  },
  phish_sim: {
    short_description: "Misura la propensione al click su messaggi sospetti in modo controllato.",
    guide_what_it_does:
      "Simulazione di scenario di phishing (configurabile) per misurare la reazione del team e indirizzare formazione mirata.",
    guide_activities: [
      "Definizione campagna e destinatari (nei limiti di policy e consensi).",
      "Invio tracciato e raccolta metriche di interazione.",
      "Report su tassi di click e raccomandazioni formative.",
    ],
    guide_immediate_result: "Statistiche e trend in dashboard al termine della finestra di campagna.",
    guide_pdf_email: "Report PDF di sintesi per HR/IT con metriche aggregate e suggerimenti formativi.",
  },
  data_leak: {
    short_description: "Cerca se bucket o storage cloud sono esposti in modo indebito.",
    guide_what_it_does:
      "Verifica di configurazioni tipiche di storage cloud pubblico (naming, permessi) legate al brand o al dominio, per ridurre il rischio di data leak accidentale.",
    guide_activities: [
      "Ricerca indicatori di esposizione coerenti con lo scope.",
      "Classificazione severità delle scoperte.",
      "Indicazioni per chiusura o restrizione accessi.",
    ],
    guide_immediate_result: "Elenco risultati e stato in dashboard, con priorità di remediation.",
    guide_pdf_email: "Sintesi PDF per team legali/IT con elenco evidenze e azioni suggerite.",
  },
  mail_auth: {
    short_description: "Controlla SPF, DKIM e DMARC per ridurre spoofing e migliorare deliverability.",
    guide_what_it_does:
      "Analisi dei record DNS mail del dominio: allineamento SPF/DKIM/DMARC e individuazione errori che favoriscono spoofing o consegna in spam.",
    guide_activities: [
      "Lettura e validazione record pubblici.",
      "Evidenza conflitti o policy DMARC deboli.",
      "Raccomandazioni concrete su record e allineamento con provider mail.",
    ],
    guide_immediate_result: "Esito e checklist in dashboard, con stato PASS/FAIL per area.",
    guide_pdf_email: null,
  },
  domain_typo: {
    short_description: "Individua domini simili al tuo usati per abuso di brand o phishing.",
    guide_what_it_does:
      "Ricerca di varianti di dominio (typosquatting, omografi) che possono confondere clienti o dipendenti, con suggerimenti di monitoraggio e take-down.",
    guide_activities: [
      "Generazione e verifica set di varianti plausibili.",
      "Controllo esistenza e contenuto minimo dei domini trovati.",
      "Priorità e azioni consigliate (registrar, legal, DNS).",
    ],
    guide_immediate_result: "Lista domini sospetti e note in dashboard, aggiornata al run.",
    guide_pdf_email: "Report PDF opzionale per ufficio legale o partner commerciali.",
  },
  ip_reput: {
    short_description: "Verifica se i tuoi IP sono listati su blacklist che impattano la posta.",
    guide_what_it_does:
      "Interrogazione di liste di reputazione per gli indirizzi IP forniti, con impatto stimato sulla deliverability della posta in uscita.",
    guide_activities: [
      "Check multi-lista su IP scope.",
      "Sintesi motivazioni di listing ove disponibili.",
      "Passi successivi (delist, separazione traffico, warm-up).",
    ],
    guide_immediate_result: "Stato liste e indicatori in dashboard, subito dopo il completamento analisi.",
    guide_pdf_email: null,
  },
  ransom_surf: {
    short_description: "Evidenzia servizi e versioni tipicamente sfruttati in attacchi ransomware.",
    guide_what_it_does:
      "Mappatura della superficie esposta verso servizi spesso presi di mira (RDP, VPN, pannelli, ecc.) e confronto con pattern noti di attacco.",
    guide_activities: [
      "Scansione mirata su porte/servizi rilevanti.",
      "Correlazione con CVE o configurazioni deboli note.",
      "Priorità di patch e segmentazione.",
    ],
    guide_immediate_result: "Dashboard con elenco risorse critiche e raccomandazioni operative immediate.",
    guide_pdf_email: "Report PDF tecnico per IT/security con dettaglio evidenze.",
  },
  ssl_audit: {
    short_description: "Analizza certificati TLS e configurazione per robustezza e scadenze.",
    guide_what_it_does:
      "Verifica catena certificati, protocolli, cipher e scadenze per i target indicati, con focus su errori che espongono a downgrade o intercettazione.",
    guide_activities: [
      "Handshake e analisi certificato.",
      "Controllo protocolli/cipher supportati.",
      "Suggerimenti di hardening e rinnovo.",
    ],
    guide_immediate_result: "Griglia esiti in dashboard (hostname, scadenza, criticità).",
    guide_pdf_email: "Export PDF per fornitori o audit (se attivo).",
  },
  social_im: {
    short_description: "Cerca profili o pagine che impersonano figure aziendali sui social.",
    guide_what_it_does:
      "Ricerca assistita di profili potenzialmente fraudolenti legati a nomi noti dell’organizzazione, con indicazioni per segnalazione e contrasto.",
    guide_activities: [
      "Query su piattaforme e keyword definite nello scope.",
      "Valutazione plausibilità e rischio.",
      "Raccomandazioni su segnalazione e comunicazione.",
    ],
    guide_immediate_result: "Elenco risultati e stato revisione in dashboard.",
    guide_pdf_email: "Sintesi PDF per comunicazione interna/PR se necessario.",
  },
  web_bh: {
    short_description: "Analizza script, tracker e comportamenti sospetti lato browser sul sito.",
    guide_what_it_does:
      "Ispezione del caricamento risorse sul sito pubblico: script di terze parti, tracker aggressivi o pattern anomali rispetto alle policy dichiarate.",
    guide_activities: [
      "Crawl mirato e raccolta risorse eseguite lato client.",
      "Classificazione per tipo (analytics, ads, sospetti).",
      "Suggerimenti CSP, consent e rimozioni.",
    ],
    guide_immediate_result: "Report in dashboard con elenco risorse e severità.",
    guide_pdf_email: "Report PDF per sviluppo/web agency con evidenze tecniche.",
  },
};
