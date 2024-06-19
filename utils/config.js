export const DocumentationsTabs = [
  {
    doc: "audiometrico",
    title: "Esame Audiometrico",
    icon: { iconSet: "MaterialIcons", icon: "spatial-audio" },
    description: "Documentazione dell'esame audiometrico.",
    docs: [
      {
        name: "L'Esame",
        type: "explain",
        tag: "Spiegazione",
        icon: { iconSet: null, icon: "document-text" },
        docList: [
          {
            title: "Esame Audiometrico per Bambini",
            description:"Benvenuto al grande gioco dell'ascolto! Scopri come funziona un esame audiometrico, un'avventura divertente per esplorare i suoni e scoprire quanto sei bravo a sentirli!",
            caa:[
              require("../assets/caa/benvenuto.png"),
            ],
            steps: [
              {
                title: "Incontriamo il Super Audiologo",
                caa:[
                  require("../assets/caa/audiologo.png"),
                  require("../assets/caa/supereroe.png"),
                ],
                description:
                  "L'audiologo è come un supereroe degli orecchi! È simpatico e gentile e sa tutto sui suoni. Ti farà sentire come un vero esploratore pronto a partire per un'avventura sonora!",
              },
              {
                title: "Preparati al Viaggio",
                caa:[
                  require("../assets/caa/auricolari.png"),
                  require("../assets/caa/cuffie.png"),
                ],
                description:
                  "Indosserai degli auricolari o una cuffia speciale. Sono comodi e morbidi, proprio come quelli che usi per ascoltare la tua musica preferita. E a volte, potresti anche entrare in una stanza magica chiamata 'cabina insonorizzata', che sembra una navicella spaziale pronta per il decollo!",
              },
              {
                title: "Inizia il Grande Gioco dei Suoni",
                caa:[
                  require("../assets/caa/piopio.png"),
                  require("../assets/caa/leone.png"),
                  require("../assets/caa/alzare_la_mano.png"),
                ],
                description:
                  "Sarai immerso in un mondo di suoni fantastici! Potresti sentire il cinguettio degli uccellini o il ruggito di un leone. Ogni volta che senti un suono, fai un segno, come alzare la mano o premere un pulsante. È come giocare a caccia al tesoro, ma invece di cercare oggetti, cerchi suoni!",
              },
              {
                title: "Scopri i Suoni Magici",
                caa:[
                  require("../assets/caa/suono.png"),
                  require("../assets/caa/detective.png"),
                ],
                description:
                  "E non finisce qui! Potresti anche sentire parole sussurrate che dovrai ripetere. È come essere un detective acustico che deve decifrare i misteri delle parole sussurrate!",
              },
              {
                title: "Premiazione del Super Esploratore Sonoro!",
                caa:[
                  require("../assets/caa/premio.png"),
                ],
                description:
                  "Alla fine del grande gioco dell'ascolto, l'audiologo ti dirà quanto sei stato bravo! Potresti persino ricevere adesivi o piccoli premi per la tua partecipazione. Sei pronto a ricevere il tuo distintivo di Super Esploratore Sonoro?",
              },
            ],
          },
          {
            title: "Perché è Importante Essere un Super Esploratore Sonoro?",
            caa:[
              require("../assets/caa/fine.png"),
            ],
            description:
              "Questo esame ti aiuta a scoprire se le tue orecchie sono pronte per affrontare qualsiasi avventura sonora! È importante per assicurarsi che tu possa goderti ogni momento, dalle risate degli amici alla tua musica preferita. Diventa il Super Esploratore Sonoro che tutti ammirano!",
          },
        ],
      },
      {
        name: "Ambiente",
        type: "enviroment",
        tag: "Ambiente",
        icon: { iconSet: "MaterialCommunityIcons", icon: "sofa-single" },
        docList: [],
      },
      {
        name: "Foto",
        type: "photo",
        tag: "Media",
        icon: { iconSet: "MaterialIcons", icon: "photo-library" },
        docList: {
          title: "Foto Esame Audiometrico",
          description:
            "Foto degli Strumenti e dei Luoghi utili per affrontare l'esame adiometrico",
          media: [
            require("../assets/docs/audiometrico/images/img_1.webp"),
            require("../assets/docs/audiometrico/images/img_2.webp"),
            require("../assets/docs/audiometrico/images/img_3.webp"),
            require("../assets/docs/audiometrico/images/img_4.webp"),
            require("../assets/docs/audiometrico/images/img_5.webp"),
          ],
        },
      },
      {
        name: "Video",
        type: "video",
        tag: "Media",
        icon: { iconSet: "MaterialIcons", icon: "video-collection" },
        docList:  {
          title: "Video Esame Audiometrico",
          description:
            "Video degli Strumenti e dei Luoghi utili per affrontare l'esame adiometrico",
          media: [
            require("../assets/docs/audiometrico/videos/vid_1.mp4")
          ],
        },
      },
    ],
  },
  {
    doc: "golaNasoOrecchio",
    icon: { iconSet: null, icon: "medical" },
    title: "Esame Gola Naso Orecchio",
    description: "Documentazione dell'esame di gola, naso e orecchio.",
    docs: [
      {
        name: "L'Esame",
        type: "explain",
        tag: "Spiegazione",
        icon: { iconSet: null, icon: "document-text" },
        docList: [
          {
            title: "Esame Otorinolaringoiatrico per Bambini",
            caa:[
              require("../assets/caa/benvenuto.png"),
            ],
            description:
              "Scopri come funziona un esame otorinolaringoiatrico, un divertente controllo per analizzare gola, naso e orecchie!",
            steps: [
              {
                title: "Incontriamo il Dottor Esploratore",
                caa:[
                  require("../assets/caa/audiologo.png"),
                  require("../assets/caa/esploratore.png"),
                ],
                description:
                  "Il Dottor Esploratore è come un avventuriero che ama scoprire i segreti del corpo umano! Sarà il tuo compagno mentre esplori la tua gola, il tuo naso e le tue orecchie.",
              },
              {
                title: "Esplorazione della Gola",
                caa:[
                  require("../assets/caa/gola.png"),
                  require("../assets/caa/luce.png"),
                  require("../assets/caa/abbassalingua.png")
                ],
                description:
                  "Con una luce speciale e un abbassalingua magico, il Dottor Esploratore esaminerà la tua gola. È come fare un viaggio dentro una grotta magica, ma dentro la tua bocca!",
              },
              {
                title: "Viaggio nel Naso",
                caa:[
                  require("../assets/caa/naso.png"),
                  require("../assets/caa/luce.png"),
                  require("../assets/caa/viaggio.png")
                ],
                description:
                  "Usando una piccola torcia come una vera lanterna d'avventura, il Dottor Esploratore esplorerà il tuo naso. Potresti sentire un po' di solletico, ma è solo perché il naso è pieno di tesori da scoprire!",
              },
              {
                title: "Controllo delle Orecchie",
                caa:[
                  require("../assets/caa/orecchio.png"),
                  require("../assets/caa/suono.png"),
                  require("../assets/caa/esploratore.png")
                ],
                description:
                  "Con uno strumento chiamato otoscopio, il Dottor Esploratore guarderà dentro le tue orecchie. È come guardare attraverso un telescopio spaziale per scoprire le meraviglie nascoste all'interno!",
              },
              {
                title: "Verifica dell'Udito",
                caa:[
                  require("../assets/caa/orecchio.png"),
                  require("../assets/caa/ascoltare.png"),
                  require("../assets/caa/esploratore.png")
                ],
                description:
                  "A volte, il Dottor Esploratore potrebbe fare un piccolo test dell'udito per assicurarsi che tutto funzioni bene. Potresti ascoltare alcuni suoni divertenti e rispondere quando li senti, proprio come un vero esploratore dell'udito!",
              },
              {
                title: "Premiazione",
                caa:[
                  require("../assets/caa/premio.png"),
                ],
                description:
                  "Dopo l'esame, il Dottor Esploratore ti dirà quanto sei stato bravo nell'aiutarlo a scoprire i segreti di gola, naso e orecchie! Potrebbe anche darti un adesivo o un piccolo premio come ringraziamento per la tua collaborazione.",
              },
            ],
          },
          {
            title: "Perché è Importante?",
            caa:[
              require("../assets/caa/fine.png"),
            ],
            description:
              "Questo esame aiuta a capire se gola, naso e orecchie stanno lavorando bene. È importante per assicurarsi che tu possa respirare, sentire e parlare senza problemi, godendoti ogni momento della giornata come un vero esploratore dell'avventura!",
          },
        ],
      },
      {
        name: "Ambiente",
        type: "environment",
        tag: "Ambiente",
        icon: { iconSet: "MaterialCommunityIcons", icon: "sofa-single" },
      },
      {
        name: "Foto",
        type: "photo",
        tag: "Media",
        icon: { iconSet: "MaterialIcons", icon: "photo-library" },
        docList: {
          title: "Foto visita Gola Naso Orecchio",
          description:
            "Foto degli Strumenti e dei Luoghi utili per affrontare l'esame gola naso orecchio",
          media: [
            require("../assets/docs/gola_naso_orecchio/images/img_1.webp"),
            require("../assets/docs/gola_naso_orecchio/images/img_2.webp"),
            require("../assets/docs/gola_naso_orecchio/images/img_3.webp"),
            require("../assets/docs/gola_naso_orecchio/images/img_4.webp"),
          ],
        },
      },
      {
        name: "Video",
        type: "video",
        tag: "Media",
        icon: { iconSet: "MaterialIcons", icon: "video-collection" },
        docList:  {
          title: "Video Esame Gola Naso Orecchio",
          description:
            "Video degli Strumenti e dei Luoghi utili per affrontare l'esame gola naso orecchio",
          media: [
            require("../assets/docs/gola_naso_orecchio/videos/vid_1.mp4"),
            require("../assets/docs/gola_naso_orecchio/videos/vid_2.mp4"),
          ],
        },
      },
    ],
  },
  {
    doc: "impedenza",
    icon: { iconSet: "MaterialIcons", icon: "hearing" },
    title: "Esame Impedenza",
    description: "Documentazione dell'esame di impedenza acustica",
    docs: [
      {
        name: "L'Esame",
        type: "explain",
        tag: "Spiegazione",
        icon: { iconSet: null, icon: "document-text" },
        docList: [
          {
            title: "Esame dell'Impedenza per Bambini",
            caa:[
              require("../assets/caa/benvenuto.png"),
            ],
            description:
              "Scopri come funziona un esame dell'impedenza, un divertente controllo per verificare quanto bene funzionano le tue orecchie!",
            steps: [
              {
                title: "Incontriamo il Detective dell'Udito",
                caa:[
                  require("../assets/caa/audiologo.png"),
                  require("../assets/caa/detective.png"),
                  require("../assets/caa/radar.png")
                ],
                description:
                  "Il Detective dell'Udito è come un investigatore che cerca di risolvere il mistero dei tuoi orecchi! Sarà il tuo alleato mentre indaghi su come funziona il tuo udito.",
              },
              {
                title: "Preparazione all'Avventura",
                caa:[
                  require("../assets/caa/cuffie.png"),
                  require("../assets/caa/impedenziometro.png")
                ],
                description:
                  "Ti verranno dati degli auricolari speciali, come quelli che usano gli astronauti nello spazio! Sono morbidi e comodi, proprio come quelli che usi per ascoltare la tua musica preferita.",
              },
              {
                title: "Inizio dell'Indagine",
                caa:[
                  require("../assets/caa/impedenziometro.png"),
                  require("../assets/caa/suono.png"),
                  require("../assets/caa/detective.png")
                ],
                description:
                  "Il Detective dell'Udito userà uno strumento chiamato impedenziometro. Sentirai alcuni suoni e avvertirai una leggera pressione nell'orecchio. È come una prova da vero detective mentre segui le tracce dei segreti delle tue orecchie!",
              },
              {
                title: "Scopriamo i Misteri dell'Orecchio Medio",
                caa:[
                  require("../assets/caa/orecchio.png"),
                  require("../assets/caa/suono.png"),
                  require("../assets/caa/lente_di_ingrandimento.png")
                ],
                description:
                  "Lo strumento registrerà come reagisce il tuo orecchio ai suoni e alla pressione. Questo aiuterà il Detective dell'Udito a svelare i misteri dell'udito e a garantire che tutto funzioni perfettamente nelle tue orecchie, proprio come in una missione segreta!",
              },
              {
                title: "Premiazione",
                caa:[
                  require("../assets/caa/premio.png"),
                ],
                description:
                  "Dopo l'esame, il Detective dell'Udito ti dirà quanto sei stato bravo nell'aiutarlo a risolvere il mistero delle tue orecchie! Potrebbe anche darti un distintivo o un premio come ringraziamento per la tua collaborazione.",
              },
            ],
          },
          {
            title: "Perché è così Importante?",
            caa:[
              require("../assets/caa/fine.png"),
            ],
            description:
              "Questo esame aiuta a capire se l'orecchio medio sta funzionando correttamente. È importante per assicurarsi che tu possa sentire bene e goderti tutti i suoni intorno a te, come un vero investigatore dell'udito!",
          },
        ],
      },
      {
        name: "Ambiente",
        type: "environment",
        tag: "Ambiente",
        icon: { iconSet: "MaterialCommunityIcons", icon: "sofa-single" },
      },
      {
        name: "Foto",
        type: "photo",
        tag: "Media",
        icon: { iconSet: "MaterialIcons", icon: "photo-library" },
        docList: {
          title: "Foto Esame Impedenza",
          description: "Foto degli Strumenti e dei Luoghi utili per affrontare l'esame dell'impedenza",
          media: [
            require("../assets/docs/impedenza/images/img_1.webp"),
            require("../assets/docs/impedenza/images/img_2.webp"),
            require("../assets/docs/impedenza/images/img_3.webp"),
            require("../assets/docs/impedenza/images/img_4.webp"),
          ],
        },
      },
      {
        name: "Video",
        type: "video",
        tag: "Media",
        icon: { iconSet: "MaterialIcons", icon: "video-collection" },
        docList:  {
          title: "Video Esame Impedenza",
          description:
            "Video degli Strumenti e dei Luoghi utili per affrontare l'esame dell'impedenza",
          media: [
            require("../assets/docs/impedenza/videos/vid_1.mp4"),
          ],
        },
      },
    ],
  },
  {
    doc: "logopedico",
    icon: { iconSet: "MaterialCommunityIcons", icon: "cards" },
    title: "Esame Logopedico",
    description: "Documentazione dell'esame logopedico.",
    docs: [
      {
        name: "L'Esame",
        type: "explain",
        tag: "Spiegazione",
        icon: { iconSet: null, icon: "document-text" },
        docList: [
          {
            title: "Esame Logopedico per Bambini",
            caa:[
              require("../assets/caa/benvenuto.png"),
            ],
            description:
              "Scopri come funziona un esame logopedico, un divertente controllo per verificare come parli e ascolti!",
            steps: [
              {
                title: "Incontriamo il Magico Logopedista!",
                caa:[
                  require("../assets/caa/audiologo.png"),
                  require("../assets/caa/mago.png"),
                ],
                description:
                  "Il logopedista è come un mago che conosce tutti i segreti delle parole e dei suoni! Sarà il tuo compagno in questa fantastica avventura.",
              },
              {
                title: "Giochi di Parole",
                caa:[
                  require("../assets/caa/parole.png"),
                  require("../assets/caa/indovinare.png"),
                  require("../assets/caa/prendere.png"),
                ],
                description:
                  "Il logopedista ti farà fare dei giochi divertenti in cui dovrai ripetere parole magiche, raccontare storie incantate o imitare gli animali della foresta. È come diventare il re o la regina delle parole!",
              },
              {
                title: "Giochi di Ascolto",
                caa:[
                  require("../assets/caa/animali.png"),
                  require("../assets/caa/suono.png"),
                  require("../assets/caa/indovinare.png"),
                  require("../assets/caa/prendere.png"),
                ],
                description:
                  "Ti verranno raccontate storie avventurose o fatte ascoltare le risate dei folletti e tu dovrai indovinare cosa succede o chi ride. È come essere un investigatore della fantasia!",
              },
              {
                title: "Esercizi con la Bocca",
                caa:[
                  require("../assets/caa/soffiare.png"),
                  require("../assets/caa/bolle_di_sapone.png"),
                  require("../assets/caa/nuvole.png"),
                ],
                description:
                  "Il logopedista ti farà fare esercizi divertenti con la bocca, come soffiare per far volare via le nuvole o fare bolle di sapone magiche. È come giocare con la magia della voce!",
              },
              {
                title: "Concerto delle Corde Vocali",
                caa:[
                  require("../assets/caa/abbaiare.png"),
                  require("../assets/caa/piopio.png"),
                  require("../assets/caa/ridere.png"),
                  require("../assets/caa/palcoscenico.png"),
                ],
                description:
                  "Ti chiederanno di cantare come un cucciolo che abbaia, un uccellino che cinguetta o una strega che ride. È come diventare una star del palcoscenico nella tua foresta incantata!",
              },
              {
                title: "Gran Finale: La Premiazione!",
                caa:[
                  require("../assets/caa/premio.png"),
                ],
                description:
                  "Dopo l'avventura, il logopedista ti dirà quanto sei stato fantastico nel dominare le parole magiche e ti darà un premio da cavaliere o da principessa della comunicazione!",
              },
            ],
          },
          {
            title: "Perché è così Importante?",
            caa:[
              require("../assets/caa/fine.png"),
            ],
            description:
              "Questo esame aiuta a capire se parli e ascolti come un vero campione. È importante per diventare un supereroe della comunicazione e poter vivere mille avventure fantastiche con le parole!",
          },
        ],
      },
      {
        name: "Ambiente",
        type: "environment",
        tag: "Ambiente",
        icon: { iconSet: "MaterialCommunityIcons", icon: "sofa-single" },
      },
      {
        name: "Foto",
        type: "photo",
        tag: "Media",
        icon: { iconSet: "MaterialIcons", icon: "photo-library" },
        docList: {
          title: "Foto Esame Logopedico",
          description: "Foto degli Strumenti e dei Luoghi utili per affrontare l'esame logopedico",
          media: [
            require("../assets/docs/logopedico/images/img_1.webp"),
            require("../assets/docs/logopedico/images/img_2.webp"),
            require("../assets/docs/logopedico/images/img_3.webp"),
            require("../assets/docs/logopedico/images/img_4.webp"),
          ],
        },
      },
      {
        name: "Video",
        type: "video",
        tag: "Media",
        icon: { iconSet: "MaterialIcons", icon: "video-collection" },
        docList:  {
          title: "Video Esame Logopedico",
          description:
            "Video degli Strumenti e dei Luoghi utili per affrontare l'esame logopedico",
          media: [
            require("../assets/docs/logopedico/videos/vid_1.mp4"),
          ],
        },
      },
    ],
  },
  {
    doc: "potenzialiEvocati",
    icon: { iconSet: "MaterialCommunityIcons", icon: "sleep" },
    title: "Esame Potenziali Evocati",
    description: "Documentazione dell'esame dei potenziali evocati",
    docs: [
      {
        name: "L'Esame",
        type: "explain",
        tag: "Spiegazione",
        icon: { iconSet: null, icon: "document-text" },
        docList: [
          {
            title: "Esame dei Potenziali Evocati per Bambini",
            caa:[
              require("../assets/caa/benvenuto.png"),
            ],
            description:
              "Scopri come funziona un esame dei potenziali evocati, un avventuroso viaggio per vedere come il tuo cervello reagisce ai suoni e alle immagini!",
            steps: [
              {
                title: "Incontriamo la Guardiana del Cervello",
                caa:[
                  require("../assets/caa/audiologo.png"),
                  require("../assets/caa/maga.png"),
                ],
                description:
                  "La guardiana del cervello è come una maga che conosce tutti i segreti della tua testa! Sarà la tua compagna d'avventura durante l'esame.",
              },
              {
                title: "Preparazione della Testa",
                caa:[
                  require("../assets/caa/ventosa.png"),
                  require("../assets/caa/astronauta.png")
                ],
                description:
                  "La guardiana metterà delle piccole magiche ventose sulla tua testa. Ti faranno sembrare un esploratore spaziale pronto per partire verso nuovi mondi!",
              },
              {
                title: "Benvenuto al Tuo Protettore!",
                caa:[
                  require("../assets/caa/io.png"),
                  require("../assets/caa/famiglia.png")
                ],
                description:
                  "Durante l'esame, puoi stare comodamente abbracciato a una persona cara, come tua mamma, tuo papà o chi ti fa sentire al sicuro. È come avere un custode magico per proteggerti durante l'avventura!",
              },
              {
                title: "Giochi di Suoni",
                caa:[
                  require("../assets/caa/cuffie.png"),
                  require("../assets/caa/suono.png")
                ],
                description:
                  "Indosserai delle cuffie magiche per ascoltare suoni strani e divertenti. Il tuo compito sarà far ascoltare al tuo cervello le canzoni più fantastiche e divertenti!",
              },
              {
                title: "Giochi di Luci e Colori",
                caa:[
                  require("../assets/caa/schermo.png"),
                  require("../assets/caa/luci.png")
                ],
                description:
                  "Guarderai uno schermo magico con luci e colori fantastici! Il tuo compito sarà osservarli attentamente mentre il tuo cervello li interpreta come una fiaba colorata e piena di sorprese!",
              },
              {
                title: "Scoperta dei Superpoteri del Cervello",
                caa:[
                  require("../assets/caa/stelle.png"),
                  require("../assets/caa/suono.png"),
                  require("../assets/caa/supereroe.png"),
                  require("../assets/caa/schermo.png")
                ],
                description:
                  "La guardiana registrerà come il tuo cervello reagisce a suoni e immagini. È come se stesse scoprendo i superpoteri segreti della tua testa e preparando una pozione magica per farli crescere!",
              },
              {
                title: "Ricompensa Magica!",
                caa:[
                  require("../assets/caa/premio.png"),
                ],
                description:
                  "Alla fine dell'avventura, la guardiana ti dirà quanto sei stato coraggioso e potrebbe anche darti una medaglia magica per ringraziarti della tua collaborazione straordinaria!",
              },
            ],
          },
          {
            title: "Perché è così Importante?",
            caa:[
              require("../assets/caa/fine.png"),
            ],
            description:
              "Questo esame aiuta a capire come il tuo cervello lavora con i suoni e le immagini. È come una mappa magica che ci mostra quali superpoteri ha la tua testa per proteggerti e renderti il giorno più magico e divertente possibile!",
          },
        ],
      },
      {
        name: "Ambiente",
        type: "environment",
        tag: "Ambiente",
        icon: { iconSet: "MaterialCommunityIcons", icon: "sofa-single" },
      },
      {
        name: "Foto",
        type: "photo",
        tag: "Media",
        icon: { iconSet: "MaterialIcons", icon: "photo-library" },
        docList: {
          title: "Foto Esame Potenziali Evocati",
          description:"Foto degli Strumenti e dei Luoghi utili per affrontare l'esame dei potenziali evocati",
          media: [
            require("../assets/docs/potenziali_evocati/images/img_1.webp"),
            require("../assets/docs/potenziali_evocati/images/img_2.webp"),
            require("../assets/docs/potenziali_evocati/images/img_3.webp"),
            require("../assets/docs/potenziali_evocati/images/img_4.webp"),
            require("../assets/docs/potenziali_evocati/images/img_5.webp"),
            require("../assets/docs/potenziali_evocati/images/img_6.webp"),
            require("../assets/docs/potenziali_evocati/images/img_7.webp"),
            require("../assets/docs/potenziali_evocati/images/img_8.webp"),
          ],
        },
      },
      {
        name: "Video",
        type: "video",
        tag: "Media",
        icon: { iconSet: "MaterialIcons", icon: "video-collection" },
        docList:  {
          title: "Video Esame Impedenza",
          description:
            "Video degli Strumenti e dei Luoghi utili per affrontare l'esame dei potenziali evocati",
          media: [
            require("../assets/docs/potenziali_evocati/videos/vid_1.mp4"),
            require("../assets/docs/potenziali_evocati/videos/vid_2.mp4"),
          ],
        },
      },
    ],
  },
  {
    doc: "ingresso",
    icon: { iconSet: "MaterialCommunityIcons", icon: "hospital-building" },
    title: "Ingresso Nella Struttura",
    description:
      "Informazioni su come accedere e orientarsi all'interno della struttura sanitaria.",
    docs: [
      {
        name: "L'Ingresso",
        type: "explain",
        tag: "Spiegazione",
        icon: { iconSet: null, icon: "document-text" },
          docList: [
            {
              title: "Descrizione dell'ingresso nella clinica",
              caa:[
                require("../assets/caa/benvenuto.png"),
              ],
              description: "Un'avventura magica attraverso la clinica per i coraggiosi esploratori!",
              steps: [
                {
                  title: "Scendiamo le scale del coraggio",
                  caa:[
                    require("../assets/caa/scala.png"),
                    require("../assets/caa/coraggio.png"),
                  ],
                  description: "Affronta le scalinate misteriose e scopri il mondo nascosto della clinica!"
                },
                {
                  title: "Esploriamo le porte dell'avventura",
                  caa:[
                    require("../assets/caa/porta.png"),
                    require("../assets/caa/avventura.png"),
                  ],
                  description: "Entra nella sala di attesa, dove ti aspettano mille sorprese e giochi da scoprire!"
                },
                {
                  title: "Prepariamoci a cercare il tesoro",
                  caa:[
                    require("../assets/caa/lente_di_ingrandimento.png"),
                    require("../assets/caa/bacchetta_magica.png"),
                  ],
                  description: "Usa i tuoi strumenti magici per prepararti alle avventure sonore durante la visita audiologica!"
                },
                {
                  title: "Esploriamo la Giungla dei giocattoli",
                  caa:[
                    require("../assets/caa/clinica.png"),
                    require("../assets/caa/giocattoli.png"),
                  ],
                  description: "Immergiti nella giungla dei giocattoli, un luogo fantastico pieno di divertimento e sorprese!"
                },
                {
                  title: "Conosciamo i nostri amici magici",
                  caa:[
                    require("../assets/caa/audiologo.png"),
                    require("../assets/caa/audiologo.png"),
                    require("../assets/caa/amicizia.png")
                  ],
                  description: "Incontra i dottori e il personale della clinica, i veri amici che ti aiuteranno in ogni avventura!"
                },
                {
                  title: "Come essere coraggiosi",
                  caa:[
                    require("../assets/caa/coraggio.png"),
                  ],
                  description: "Impara i segreti del coraggio e della forza interiore per affrontare ogni sfida con fiducia!"
                },
                {
                  title: "Ecco il tesoro!",
                  caa:[
                    require("../assets/caa/premio.png"),
                  ],
                  description: "Dopo aver superato coraggiosamente gli esami, scopri il tesoro speciale che ti aspetta!"
                }
              ]
            },
            {
              title: "Perché è così Importante?",
              caa:[
                require("../assets/caa/fine.png"),
              ],
              description: "Scopri perché le avventure nella clinica e le visite audiologiche sono fondamentali per diventare supereroi della salute!"
            }
          ]
        },
      {
        name: "Ambiente",
        type: "environment",
        tag: "Ambiente",
        icon: { iconSet: "MaterialCommunityIcons", icon: "sofa-single" },
      },
      {
        name: "Foto",
        type: "photo",
        tag: "Media",
        icon: { iconSet: "MaterialIcons", icon: "photo-library" },
        docList: {
          title: "Foto Ingresso",
          description: "Foto dell'ingresso e della sala di attesa dell'ambulatiorio.",
          media: [
          require("../assets/docs/ingresso/images/img_1.webp"),
          require("../assets/docs/ingresso/images/img_2.webp"),
          require("../assets/docs/ingresso/images/img_3.webp"),
          require("../assets/docs/ingresso/images/img_4.webp"),
          require("../assets/docs/ingresso/images/img_5.webp"),
          require("../assets/docs/ingresso/images/img_6.webp"),
          require("../assets/docs/ingresso/images/img_7.webp"),
          require("../assets/docs/ingresso/images/img_8.webp"),
          require("../assets/docs/ingresso/images/img_9.webp"),
        ],
      }
      },
      {
        name: "Video",
        type: "video",
        tag: "Media",
        icon: { iconSet: "MaterialIcons", icon: "video-collection" },
        docList:  {
          title: "Video Ingresso",
          description:
            "Video degli ambienti di ingresso in ambulatorio",
          media: [],
        },
      },
    ],
  },
];

export const ActivitiesConfig = [
  {
    title: "Audio",
    type: "audio",
    simulation: "Esame Audiometrico",
    step: "3 Step",
    description:
      "Audiometrico ti offre un'esperienza coinvolgente per valutare la tua percezione uditiva in un ambiente simulato. Durante questo esame virtuale, sarai immerso in un ambiente interattivo dove verranno presentate tre animazioni distinte, una dopo l'altra. Ogni animazione si attiverà solo quando risponderai al suono che percepisci premendo un bottone corrispondente. Man mano che procedi attraverso le fasi, la frequenza del suono diminuirà offrendo diversi livelli di difficoltà. Questa attività mira a fornire una preventiva valutazione delle capacità uditive favorendo anche una preventiva presentazione dell'esame.",
    icon: "spatial-audio",
    iconsSet: "MaterialIcons",
    mainDocs: ["audiometrico", "ingresso"],
  }
];

export const frequencies = [
  {
    value: 250,
    label: "250 Hz",
    fileName: require("../assets/audio/fhz/250.wav"),
  },
  {
    value: 500,
    label: "500 Hz",
    fileName: require("../assets/audio/fhz/500.wav"),
  },
  {
    value: 1000,
    label: "1000 Hz",
    fileName: require("../assets/audio/fhz/1000.wav"),
  },
  {
    value: 2000,
    label: "2000 Hz",
    fileName: require("../assets/audio/fhz/2000.wav"),
  },
  {
    value: 4000,
    label: "4000 Hz",
    fileName: require("../assets/audio/fhz/4000.wav"),
  },
];

export const appCovers = [
  {
    id: "cv1",
    filename: "cv1.jpg",
    image: require("../assets/games/cv1.jpg"),
  },
  {
    id: "cv2",
    filename: "cv2.jpg",
    image: require("../assets/games/cv2.jpg"),
  },
  {
    id: "cv3",
    filename: "cv3.jpg",
    image: require("../assets/games/cv3.jpg"),
  },
  {
    id: "cv4",
    filename: "cv4.jpg",
    image: require("../assets/games/cv4.jpg"),
  },
  {
    id: "cv5",
    filename: "cv5.jpg",
    image: require("../assets/games/cv5.jpg"),
  },
  {
    id: "cv6",
    filename: "cv6.jpg",
    image: require("../assets/games/cv6.jpg"),
  },
  {
    id: "cv7",
    filename: "cv7.jpg",
    image: require("../assets/games/cv7.jpg"),
  },
  {
    id: "cv8",
    filename: "cv8.jpg",
    image: require("../assets/games/cv8.jpg"),
  },
];

export const appBackground = [
  {
    id: "bg1",
    filename: "bg1.jpg",
    image: require("../assets/games/bg1.jpg"),
  },
  {
    id: "bg2",
    filename: "bg2.jpg",
    image: require("../assets/games/bg2.jpg"),
  },
  {
    id: "bg3",
    filename: "bg3.jpg",
    image: require("../assets/games/bg3.jpg"),
  },
  {
    id: "bg4",
    filename: "bg4.jpg",
    image: require("../assets/games/bg4.jpg"),
  },
  {
    id: "bg5",
    filename: "bg5.jpg",
    image: require("../assets/games/bg5.jpg"),
  },
  {
    id: "bg6",
    filename: "bg6.jpg",
    image: require("../assets/games/bg6.jpg"),
  },
  {
    id: "bg7",
    filename: "bg7.jpg",
    image: require("../assets/games/bg7.jpg"),
  },
  {
    id: "bg8",
    filename: "bg8.jpg",
    image: require("../assets/games/bg8.jpg"),
  },
  {
    id: "bg9",
    filename: "bg9.jpg",
    image: require("../assets/games/bg9.jpg"),
  },
  {
    id: "bg10",
    filename: "bg10.jpg",
    image: require("../assets/games/bg10.jpg"),
  },
  {
    id: "bg11",
    filename: "bg11.jpg",
    image: require("../assets/games/bg11.jpg"),
  },
  {
    id: "bg12",
    filename: "bg12.jpg",
    image: require("../assets/games/bg12.jpg"),
  },
];
