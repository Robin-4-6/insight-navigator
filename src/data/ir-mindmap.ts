export interface ContentBlock {
  type: "p" | "h" | "list" | "table" | "formula" | "quote";
  text?: string;
  items?: string[];
  /** table: first row is header */
  rows?: string[][];
}

export interface MindNode {
  id: string;
  label: string;
  short?: string;
  branch?: number; // 1..8 — color index
  content?: ContentBlock[];
  children?: MindNode[];
}

export const mindmap: MindNode = {
  id: "root",
  label: "Information Retrieval",
  short: "IR",
  content: [
    { type: "p", text: "Finding relevant information from large collections in response to a user's need. The root discipline tying together computer science, linguistics, statistics, library science, and cognitive psychology." },
    { type: "quote", text: "From cave paintings to RAG systems — the human urge to record, organize, and retrieve." },
  ],
  children: [
    {
      id: "b1",
      label: "Foundations of IR",
      branch: 1,
      content: [{ type: "p", text: "What IR is, where it came from, the explosion of data, and the vocabulary of the field." }],
      children: [
        {
          id: "b1-1",
          label: "What is IR?",
          branch: 1,
          content: [
            { type: "p", text: "Finding relevant information from large collections in response to a user's need. Deals primarily with unstructured (textual) data and exists to reduce information overload." },
            { type: "h", text: "Interdisciplinary roots" },
            { type: "list", items: ["Computer science", "Mathematics & statistics", "Library science", "Linguistics", "Cognitive psychology", "Physics"] },
            { type: "h", text: "Definitions" },
            { type: "list", items: [
              "Manning et al. — finding material of unstructured nature that satisfies an information need from large collections stored on computers.",
              "Baeza-Yates — representation, storage, organization of, and access to information items.",
              "Merriam-Webster — techniques of storing, recovering, and disseminating recorded data via computerized systems.",
            ]},
          ],
        },
        {
          id: "b1-2",
          label: "History of IR",
          branch: 1,
          content: [
            { type: "list", items: [
              "Prehistoric — cave paintings, the first attempt to record and retrieve information.",
              "Ancient civilizations — Greek and Egyptian scrolls and early cataloging.",
              "17th century — Samuel Pepys' subject-indexed catalog of 1000+ books (an early IRS).",
              "Libraries — physical card catalogs by author, title, subject.",
              "2000s — Google, Yahoo, Bing, DuckDuckGo, Baidu; Wikipedia and StackOverflow.",
              "Today (2026) — AI assistants, RAG systems, and LLMs (ChatGPT, Gemini, Claude).",
            ]},
          ],
        },
        {
          id: "b1-3",
          label: "Information Explosion",
          branch: 1,
          content: [
            { type: "table", rows: [
              ["Year", "Data worldwide"],
              ["2010", "2 ZB"],
              ["2020", "47 ZB"],
              ["2025", "175 ZB"],
              ["2035 (forecast)", "2142 ZB"],
            ]},
            { type: "p", text: "1 zettabyte = 1 billion terabytes. Internet users by 2025: 5.56 billion. First website: 6 August 1991." },
            { type: "p", text: "The #1 reason people use the internet (Feb 2025) is finding information — 62.8%." },
            { type: "quote", text: "The problem is not the availability of information — it's selection and identification." },
            { type: "h", text: "Sources" },
            { type: "list", items: ["Enterprise apps, scientific data, web apps", "Social media and machine data", "Emails, blogs, videos", "Sensors, IoT, device explosion"] },
          ],
        },
        {
          id: "b1-4",
          label: "Data · Information · Knowledge",
          branch: 1,
          content: [
            { type: "table", rows: [
              ["Level", "Definition", "Example", "Tool"],
              ["Data", "Raw strings or values", "\"20\"", "DBMS (SQL)"],
              ["Information", "Meaning + context of data", "20°C at 6pm in Algiers", "IRS"],
              ["Knowledge", "Information understood and shared by a community", "20°C in Algiers in April is mildly warm", "Data Mining"],
            ]},
            { type: "p", text: "IR systems aim to move from raw data toward useful knowledge. DBMS, IRS, and Data Mining overlap and complement each other." },
          ],
        },
        {
          id: "b1-5",
          label: "Key Terminology",
          branch: 1,
          content: [
            { type: "list", items: [
              "Document — text, abstract, passage, structured text (HTML); also information item or web page.",
              "Corpus — a set of textual documents, possibly linked (e.g. the entire web).",
              "Query — the user's expression of their information need submitted to the IRS.",
              "Information Need — the underlying mental state; the query is an imperfect translation of it.",
              "Relevance — degree to which a retrieved document satisfies the user's information need.",
              "IR = Document Retrieval = Textual Information Retrieval (used interchangeably).",
            ]},
          ],
        },
      ],
    },

    {
      id: "b2",
      label: "The IR Problem & Challenges",
      branch: 2,
      content: [{ type: "p", text: "Why retrieval is hard, and how it differs fundamentally from database querying." }],
      children: [
        {
          id: "b2-1",
          label: "Core IR Problem",
          branch: 2,
          content: [
            { type: "p", text: "Select from a collection the items relevant to a user's information need — challenging because relevance is subjective, imprecise, and multi-dimensional." },
            { type: "h", text: "Challenges" },
            { type: "list", items: [
              "Diverse information forms — text, images, sounds, videos, graphics.",
              "Many text types — web pages, emails, books, newspapers, Office docs, PDFs, blogs, patents, forum posts.",
              "Heterogeneity — multilingual + multimedia content makes uniform processing hard.",
              "Polysemy — one word, multiple meanings (\"bank\" = river or financial).",
              "Synonymy — multiple words, same meaning (\"car\" = \"automobile\").",
              "Efficiency — collect, organize, search, and select at massive scale, fast and accurately.",
            ]},
          ],
        },
        {
          id: "b2-2",
          label: "IRS vs DBMS",
          branch: 2,
          content: [
            { type: "table", rows: [
              ["Dimension", "DBMS", "IRS"],
              ["Data type", "Structured (attributes & values)", "Unstructured (free text)"],
              ["Structure", "Clear semantics, predefined fields", "No predefined fields"],
              ["Query language", "Deterministic / SQL", "Natural language / Boolean"],
              ["Evaluation", "Exact correctness", "Imprecise — measuring relevance"],
            ]},
            { type: "quote", text: "DBMS answers exactly (yes/no). IRS retrieves documents that are probably relevant — and must rank them. System relevance ≠ user relevance." },
          ],
        },
      ],
    },

    {
      id: "b3",
      label: "Information Retrieval Systems",
      branch: 3,
      content: [{ type: "p", text: "How an IRS is built — its components, scope, tasks, and the offline/online pipelines." }],
      children: [
        {
          id: "b3-1",
          label: "Definition",
          branch: 3,
          content: [
            { type: "p", text: "A computer program (or set of programs) whose purpose is to select relevant information that meets users' needs." },
            { type: "h", text: "Two gaps the IRS must bridge" },
            { type: "list", items: [
              "Need → Query — the user has a complex need but types a short, imperfect query.",
              "Query → Relevant docs — the system must bridge back from imperfect query to true intent.",
            ]},
            { type: "quote", text: "Goffman (1969): relevance is dynamic — what you learn from one document changes the relevance of others." },
            { type: "p", text: "Examples — Google Search, PubMed, LexisNexis, library catalogs, enterprise search." },
          ],
        },
        {
          id: "b3-2",
          label: "Building an IRS — 5 Components",
          branch: 3,
          content: [
            { type: "list", items: [
              "Acquisition — crawling the web, reading server logs, pre-processing directories (web crawlers/spiders).",
              "Representation — handling raw text, images, XML; converting unstructured content for processing (indexing).",
              "Search Model — the ranking algorithm (Boolean, vector space, probabilistic, neural).",
              "User Interaction — feedback, query reformulation, relevance feedback.",
              "Evaluation — academic protocols (Cranfield), measuring precision and recall.",
            ]},
          ],
        },
        {
          id: "b3-3",
          label: "IR Scope & Tasks",
          branch: 3,
          content: [
            { type: "list", items: [
              "Ad hoc retrieval — classic search: query → ranked list of documents.",
              "Classification / Categorization — grouping docs (e.g. spam vs not spam).",
              "Question Answering — direct answers to natural-language questions.",
              "Filtering / Recommendation — proactive delivery; alerts, push, profiling.",
              "Automatic Summarization — condensing documents into shorter summaries.",
            ]},
            { type: "h", text: "Aggregated Search" },
            { type: "list", items: [
              "Metasearch — query multiple engines (Metacrawler).",
              "Vertical search — query specific sources (Google Scholar, LinkedIn Jobs, Skyscanner).",
              "Content aggregation — build result from multiple pieces (Wikipedia, AI QA).",
            ]},
          ],
        },
        {
          id: "b3-4",
          label: "The IR Process — Two Pipelines",
          branch: 3,
          content: [
            { type: "h", text: "Document pipeline (OFFLINE)" },
            { type: "list", items: [
              "Raw documents — web pages, PDFs, emails, articles.",
              "Indexation — tokenization, stop-word removal, stemming.",
              "Index — structured representation of document content.",
              "Inverted file (fichier inverse) — maps terms → documents containing them.",
            ]},
            { type: "h", text: "Query pipeline (ONLINE)" },
            { type: "list", items: [
              "Besoin — information need.",
              "Requête — user types keywords.",
              "Treatment — same processing as documents.",
              "Mots-clés — processed query terms.",
            ]},
            { type: "p", text: "Convergence: keywords matched against the inverted file → ranked list of relevant documents (visualisation)." },
          ],
        },
      ],
    },

    {
      id: "b4",
      label: "Indexing",
      branch: 4,
      content: [{ type: "p", text: "Why indexes exist, the pipeline that builds them, and the linguistic steps in between." }],
      children: [
        {
          id: "b4-1",
          label: "Why Index?",
          branch: 4,
          content: [
            { type: "p", text: "Naive scanning works for tiny collections but is infeasible for millions of documents. For N=10⁶ docs of ~1000 tokens each, that's ~10⁹ tokens — ~6 GB of raw text." },
            { type: "p", text: "A term-document matrix of 500K terms × 10⁶ docs = 500 billion entries, mostly zeros. The fix: store only the 1s — the inverted index." },
            { type: "h", text: "Two pillars of retrieval" },
            { type: "list", items: [
              "Indexing — structural organization of terms for high-speed lookup (offline).",
              "Weighting — mathematical quantification of term importance, enabling ranking.",
            ]},
            { type: "quote", text: "Move from existence checks (yes/no) to nuanced relevance ranking (0.87 vs 0.23)." },
          ],
        },
        {
          id: "b4-2",
          label: "Indexing Pipeline",
          branch: 4,
          content: [
            { type: "list", items: [
              "Raw documents — unstructured text.",
              "Text preprocessing — tokenization, selection (stop-word removal), normalization (stemming / lemmatization).",
              "Dictionary — all unique terms after preprocessing.",
              "Document representation — each doc becomes a vector of weighted terms.",
              "Index — final structure for query time; typically an inverted index.",
            ]},
            { type: "p", text: "Flow: Raw Documents → Preprocessing → Index Terms → Inverted Index." },
          ],
        },
        {
          id: "b4-3",
          label: "Tokenization",
          branch: 4,
          content: [
            { type: "p", text: "Splitting raw text into individual tokens (words, punctuation, numbers)." },
            { type: "p", text: "Example: \"Hello, world!\" → [\"Hello\", \"world\"]." },
            { type: "p", text: "Challenges: hyphenated words, contractions, special characters, numbers, URLs. Often combined with POS tagging and syntactic analysis." },
          ],
        },
        {
          id: "b4-4",
          label: "Stop-Word Removal",
          branch: 4,
          content: [
            { type: "p", text: "Remove high-frequency, low-information words that appear in nearly every document." },
            { type: "p", text: "Examples: the, a, an, is, are, of, for, in, on, at, by, with, their…" },
            { type: "p", text: "These have very low IDF (in every doc) and contribute little to ranking. Removing them shrinks the index and improves quality." },
          ],
        },
        {
          id: "b4-5",
          label: "Normalization & Lemmatization",
          branch: 4,
          content: [
            { type: "h", text: "Normalization" },
            { type: "list", items: [
              "Removal/standardization of accents (é→e), case (Run→run), punctuation, special symbols, dates.",
              "Goal: treat \"Apple\" and \"apple\" as the same token.",
            ]},
            { type: "h", text: "Lemmatization" },
            { type: "list", items: [
              "Linguistic analysis that returns the dictionary form (lemma) of a word.",
              "Requires understanding the word's grammatical role.",
              "Verbs → infinitive; nouns → masculine singular.",
              "Examples: studies → study, running → run, children → child.",
              "Tool: TreeTagger (POS tagging + lemmatization with a lexical database).",
            ]},
          ],
        },
        {
          id: "b4-6",
          label: "Stemming",
          branch: 4,
          content: [
            { type: "p", text: "Morphological process that reduces variants to a common stem by stripping suffixes. Rule-based — no dictionary needed. Stems may not be valid words." },
            { type: "p", text: "French: économie, économiquement, économiste → économ. English: retrieve, retrieving, retrieval, retrieved → retriev." },
            { type: "h", text: "Porter Stemmer (the canonical one)" },
            { type: "list", items: [
              "5 sequential phases of suffix stripping.",
              "Within each phase, the rule with the longest matching suffix wins.",
              "Word structure: Cᵐ[V], where C = consonant, V = vowel, m = measure.",
            ]},
            { type: "table", rows: [
              ["Step", "Purpose", "Rule example", "Example"],
              ["1", "Plurals & past participles", "SSES→SS, ING→∅", "caresses→caress, monitoring→monitor"],
              ["2", "Noun/verb/adj transforms", "OUSNESS→OUS, ATIONAL→ATE", "callousness→callous, relational→relate"],
              ["3", "Further derivational suffixes", "ICATE→IC", "triplicate→triplic"],
              ["4", "Residual derivational suffixes", "AL→∅, ANCE→∅", "revival→reviv, allowance→allow"],
              ["5", "Final cleanup", "E→∅, doubled L", "probate→probat, controll→control"],
            ]},
          ],
        },
        {
          id: "b4-7",
          label: "Stemming Limitations",
          branch: 4,
          content: [
            { type: "list", items: [
              "Non-valid words — reply→rep, carried→carr, iteration→iter, general→gener.",
              "Overstemming — wander→wand, news→new, university & universe→univers, policy & police→polic.",
              "Understemming — European/Europe, matrix/matrices, machine/machinery.",
              "Irregular forms — deception→decep (not \"deceive\"), indices→indic (not \"index\").",
            ]},
            { type: "h", text: "Solutions" },
            { type: "list", items: [
              "Corpus analysis (frequency, context, co-occurrence).",
              "Chinese: character n-grams.",
              "French: truncation at 7 characters (économiquement → économi).",
            ]},
          ],
        },
        {
          id: "b4-8",
          label: "Stemming vs Lemmatization",
          branch: 4,
          content: [
            { type: "table", rows: [
              ["", "Stemming", "Lemmatization"],
              ["Method", "Rule-based suffix stripping", "Linguistic analysis + dictionary"],
              ["Output", "May not be real words", "Always valid dictionary words"],
              ["Speed", "Faster", "Slower"],
              ["Accuracy", "Less precise", "More precise"],
              ["Requires", "No dictionary", "Lexicon + POS tagger"],
              ["Example", "running→run, retrieving→retriev", "running→run, children→child"],
            ]},
          ],
        },
      ],
    },

    {
      id: "b5",
      label: "Retrieval Models",
      branch: 5,
      content: [{ type: "p", text: "From Boolean exact matching to neural semantic retrieval — how systems decide what is relevant." }],
      children: [
        {
          id: "b5-1",
          label: "IR Model Evolution",
          branch: 5,
          content: [
            { type: "table", rows: [
              ["Era", "Model", "Key idea", "Index"],
              ["1950s–60s", "Boolean", "Exact AND/OR/NOT; binary relevance; no ranking", "Inverted index"],
              ["1970s–80s", "Vector Space", "TF-IDF + cosine similarity ranking", "Inverted index + weights"],
              ["1990s–2000s", "Probabilistic (BM25)", "Relevance probability; fixes TF saturation & length bias", "Inverted index + scoring"],
              ["2010s–now", "Neural (DPR)", "Semantic matching; embeddings", "Vector index (ANN)"],
            ]},
            { type: "p", text: "Fuzzy / Extended Boolean was an intermediate step — weights in [0,1] and partial matching, but still logic-driven, not statistical." },
          ],
        },
        {
          id: "b5-2",
          label: "Boolean Retrieval",
          branch: 5,
          content: [
            { type: "p", text: "Query as a logical expression: AND, OR, NOT. Documents are either relevant or not — no ranking." },
            { type: "p", text: "Built on a term-document incidence matrix: rows = terms, columns = documents, cell = 1 if term is in doc." },
            { type: "p", text: "Query \"Brutus AND Caesar AND NOT Calpurnia\" = bitwise AND of those rows. Example result: \"Antony and Cleopatra\" and \"Hamlet\"." },
            { type: "quote", text: "Main limitation — binary, no ranking. Can't say one doc is more relevant than another." },
          ],
        },
        {
          id: "b5-3",
          label: "The Inverted Index",
          branch: 5,
          content: [
            { type: "p", text: "Solution to the sparse term-document matrix — store only the 1s." },
            { type: "h", text: "Two components" },
            { type: "list", items: [
              "Dictionary (lexicon) — list of all unique terms.",
              "Postings list — for each term, list of (DocID, frequency) pairs, sorted by DocID.",
            ]},
            { type: "p", text: "Example: Indexing → (1:3), (4:1), (12:5) means the term appears in doc 1 (3×), doc 4 (1×), doc 12 (5×)." },
            { type: "p", text: "Brutus AND Calpurnia → [1,2,4,11,31,45,173,174] ∩ [2,31,54,101] = [2, 31]." },
            { type: "p", text: "Efficiency: O(N) worst case, much smaller in practice." },
          ],
        },
        {
          id: "b5-4",
          label: "TF-IDF — Term Weighting",
          branch: 5,
          content: [
            { type: "h", text: "Term Frequency" },
            { type: "formula", text: "TF(t,d) = f(t,d) / |d|" },
            { type: "p", text: "How often a term appears in a document, normalized by document length. High TF means the term is locally important." },
            { type: "h", text: "Inverse Document Frequency" },
            { type: "formula", text: "IDF(t) = log(N / df(t))" },
            { type: "p", text: "How rare the term is across the whole collection. If df = N, IDF = 0. Rare terms get higher IDF." },
            { type: "h", text: "Combined weight" },
            { type: "formula", text: "W(t,d) = TF × IDF      score(q,d) = Σ W(tᵢ, d)" },
            { type: "p", text: "Common & frequent → low weight. Rare & frequent in a single doc → highest weight. Introduced by Karen Spärck Jones (1972)." },
            { type: "h", text: "Worked example" },
            { type: "list", items: [
              "Term appears 5× in a 100-word doc; N = 1000; df = 10.",
              "TF = 5/100 = 0.05",
              "IDF = log(1000/10) = log(100) = 2",
              "W = 0.05 × 2 = 0.10",
            ]},
            { type: "table", rows: [
              ["Scenario", "f", "|d|", "N", "df", "Weight"],
              ["Stop word (\"the\")", "50", "200", "10000", "9999", "Very low"],
              ["Key term, rare", "8", "100", "10000", "5", "Very high"],
              ["Key term, common", "8", "100", "10000", "5000", "Medium"],
            ]},
          ],
        },
        {
          id: "b5-5",
          label: "TF-IDF Limitations",
          branch: 5,
          content: [
            { type: "h", text: "TF Saturation" },
            { type: "p", text: "TF-IDF assumes a linear relationship between frequency and relevance — but relevance plateaus. Does a doc with \"Python\" 100 times really give 100× the value of one with it once?" },
            { type: "h", text: "Length Bias" },
            { type: "p", text: "Longer docs naturally contain more terms → inflated raw frequencies. Results favor long comprehensive docs over short precise ones." },
            { type: "quote", text: "Solution: BM25 (Okapi BM25) — saturating TF function + explicit length normalization." },
          ],
        },
        {
          id: "b5-6",
          label: "Term Weighting Principles",
          branch: 5,
          content: [
            { type: "h", text: "Three weighting factors" },
            { type: "list", items: [
              "Local weighting — relative to the document (TF).",
              "Global weighting — relative to the collection (IDF), based on Zipf's law.",
              "Normalization — adjusting for document length.",
            ]},
            { type: "h", text: "Zipf's Law" },
            { type: "p", text: "Word frequency follows a power law: rank × frequency ≈ constant. Terms at the top (\"the\", \"is\") are not discriminative; extremely rare terms also aren't useful. Informative terms live in the middle of the Zipf curve." },
            { type: "h", text: "Weighting families" },
            { type: "list", items: ["TF-IDF (most widely used)", "Discriminative power", "Two-Poisson model", "Clumping model", "Language model"] },
          ],
        },
        {
          id: "b5-7",
          label: "Discriminative Value",
          branch: 5,
          content: [
            { type: "p", text: "Proposed by Salton, Wong & Yang (1975). An alternative to IDF: a term is discriminative if its presence separates documents from each other." },
            { type: "formula", text: "avgsim = K · ΣᵢΣⱼ≠ᵢ sim(dᵢ, dⱼ),   K = 1/[n(n-1)]" },
            { type: "formula", text: "Disc(tₖ) = avgsim{-tₖ} − avgsim" },
            { type: "list", items: [
              "Positive — good discriminative term (was spreading docs apart).",
              "≈ 0 — neutral term.",
              "Negative — poor term (makes docs more similar, adds noise).",
            ]},
          ],
        },
        {
          id: "b5-8",
          label: "Classic vs Modern IR",
          branch: 5,
          content: [
            { type: "h", text: "Classic IR" },
            { type: "list", items: [
              "Relevance as a computable, binary relationship.",
              "Topical relevance only.",
              "Query → Inverted Index → Ranked documents.",
              "Models: Boolean, TF-IDF, Vector Space.",
            ]},
            { type: "h", text: "Modern IR" },
            { type: "list", items: [
              "Relevance is multi-dimensional — topical + cognitive + situational.",
              "User profiling, personalization, feedback.",
              "RAG: Prompt → Vector DB → Retrieved Context + LLM → Answer.",
              "Examples: ChatGPT, Google AI Overview, semantic search.",
            ]},
            { type: "quote", text: "RAG replaces the inverted index with a vector database capturing semantic meaning; the LLM generates a synthesized response instead of returning a list." },
          ],
        },
      ],
    },

    {
      id: "b6",
      label: "Relevance",
      branch: 6,
      content: [{ type: "p", text: "The most subjective and most important concept in IR." }],
      children: [
        {
          id: "b6-1",
          label: "Relevance is Not Binary",
          branch: 6,
          content: [
            { type: "p", text: "The fundamental insight of modern IR: relevance is multi-dimensional." },
            { type: "quote", text: "Goffman (1969): relevance of one document depends on what is already known, which affects the relevance of subsequent documents. Relevance is dynamic and contextual." },
            { type: "p", text: "System relevance ≠ user relevance." },
          ],
        },
        {
          id: "b6-2",
          label: "Three Types of Relevance",
          branch: 6,
          content: [
            { type: "h", text: "Topical relevance" },
            { type: "p", text: "Relationship between the topic of the query and the topic of the document. \"Does this document cover the right subject?\" This is what classic IR mainly computes." },
            { type: "h", text: "Cognitive relevance" },
            { type: "p", text: "Relationship between the user's current knowledge and the information selected. \"Is this appropriate for what I already know? Too basic? Too advanced?\"" },
            { type: "h", text: "Contextual (situational) relevance" },
            { type: "p", text: "Relationship between the user's task / situation and the retrieved information. \"Does this actually help me complete my specific task right now?\"" },
            { type: "quote", text: "An algorithm can perfectly match keywords (high topical relevance) but still fail the user's actual problem (low situational relevance)." },
            { type: "p", text: "Example: a student searches \"machine learning\" and gets a PhD-level neural network paper — topically relevant, but cognitively a failure for a beginner." },
          ],
        },
      ],
    },

    {
      id: "b7",
      label: "IR Evaluation",
      branch: 7,
      content: [{ type: "p", text: "How to actually tell which system is better — the metrics, curves, and protocols." }],
      children: [
        {
          id: "b7-1",
          label: "Why Evaluate?",
          branch: 7,
          content: [
            { type: "p", text: "Dozens of retrieval models, ranking functions, and weighting schemes exist. Evaluation answers: which one actually works better?" },
            { type: "p", text: "IR evaluation is always comparative — System A vs System B on the same data. Never absolute. We use \"black-box\" evaluation: test outputs against a gold-standard dataset with pre-defined relevance judgments." },
            { type: "h", text: "Why relevance is hard to judge" },
            { type: "list", items: ["Subjective — two people may disagree.", "Situational — depends on context and purpose.", "Cognitive — depends on user knowledge.", "Dynamic — changes over time."] },
            { type: "quote", text: "Goal of evaluation: bridge the gap between user relevance (did it satisfy me?) and system relevance (did the scoring function think it matched?)." },
          ],
        },
        {
          id: "b7-2",
          label: "Precision & Recall",
          branch: 7,
          content: [
            { type: "h", text: "Precision" },
            { type: "formula", text: "P = |Relevant ∩ Retrieved| / |Retrieved|" },
            { type: "p", text: "Of all documents retrieved, how many are actually relevant? High precision = few irrelevant results (low noise)." },
            { type: "h", text: "Recall" },
            { type: "formula", text: "R = |Relevant ∩ Retrieved| / |Relevant|" },
            { type: "p", text: "Of all relevant documents in the corpus, how many did I find? High recall = complete." },
            { type: "h", text: "Worked example" },
            { type: "p", text: "System returns 10 docs, 7 relevant; 20 relevant docs exist. Precision = 7/10 = 0.70. Recall = 7/20 = 0.35." },
          ],
        },
        {
          id: "b7-3",
          label: "Precision–Recall Tradeoff",
          branch: 7,
          content: [
            { type: "list", items: [
              "Perfect recall is easy — retrieve everything; precision becomes terrible.",
              "Good precision is easy — retrieve only the top 1–2; recall becomes terrible.",
              "These trade off against each other.",
            ]},
            { type: "p", text: "Ideal: both P and R = 1.0." },
          ],
        },
        {
          id: "b7-4",
          label: "F-Measure",
          branch: 7,
          content: [
            { type: "formula", text: "F = 2PR / (P + R)" },
            { type: "p", text: "Combines precision and recall via the harmonic mean — both values must be high for F to be high." },
            { type: "list", items: [
              "If P = 1 and R = 0 → F = 0 (arithmetic mean would say 0.5).",
              "If either is 0 → F = 0.",
              "F rewards balance; a large gap between P and R pulls F toward the weaker value.",
            ]},
          ],
        },
        {
          id: "b7-5",
          label: "R-Precision",
          branch: 7,
          content: [
            { type: "p", text: "If there are R relevant documents in total, look at the top-R retrieved results." },
            { type: "formula", text: "R-Precision = (relevant in top-R) / R" },
            { type: "p", text: "Example: 6 relevant docs exist; top 6 retrieved contain 4 relevant → R-Precision = 4/6 ≈ 0.67." },
          ],
        },
        {
          id: "b7-6",
          label: "Ranked List & P/R at Each Rank",
          branch: 7,
          content: [
            { type: "list", items: [
              "Relevant doc appears → recall increases.",
              "Non-relevant doc appears → recall stays, precision drops.",
              "If a relevant doc is never retrieved → recall never reaches 100%.",
            ]},
            { type: "table", rows: [
              ["Rank", "Doc", "Relevant?", "Effect"],
              ["1", "588", "✓", "R↑, P high"],
              ["2", "589", "✓", "R↑, P stays high"],
              ["3", "576", "—", "R flat, P drops"],
              ["4", "590", "✓", "R↑"],
              ["6", "592", "✓", "R↑"],
              ["13", "772", "✓", "R↑"],
              ["—", "(6th never retrieved)", "—", "Recall never = 1.0"],
            ]},
          ],
        },
        {
          id: "b7-7",
          label: "Precision–Recall Curve",
          branch: 7,
          content: [
            { type: "formula", text: "P_interp(rⱼ) = max P(r) for all r ≥ rⱼ" },
            { type: "p", text: "Standard recall levels: 0.0, 0.1, 0.2 … 1.0 (11 points). A curve closer to the top-right is better — high P and R simultaneously." },
            { type: "list", items: [
              "Example 1 — never finds 6th relevant doc → recall tops at 0.833; better early precision.",
              "Example 2 — finds all 6 → recall reaches 1.0 but precision drops to 0.429.",
            ]},
          ],
        },
        {
          id: "b7-8",
          label: "Average Precision & MAP",
          branch: 7,
          content: [
            { type: "h", text: "Average Precision (AP)" },
            { type: "formula", text: "AP = (1/R) · Σ P(rₖ)  over each relevant doc at rank rₖ" },
            { type: "p", text: "High AP = relevant docs appear early in the ranking." },
            { type: "list", items: [
              "Example 1: precisions 1.0, 1.0, 0.75, 0.667, 0.38, 0 → AP = 3.797/6 ≈ 0.633.",
              "Example 2: precisions 1.0, 0.667, 0.6, 0.5, 0.556, 0.429 → AP = 0.625.",
            ]},
            { type: "h", text: "Mean Average Precision (MAP)" },
            { type: "formula", text: "MAP = (1/Q) · Σ AP(q)  over all queries Q" },
            { type: "p", text: "MAP = (0.633 + 0.625) / 2 = 0.629 for the two example queries. The gold standard for comparing IR systems." },
          ],
        },
        {
          id: "b7-9",
          label: "Cumulative Gain",
          branch: 7,
          content: [
            { type: "p", text: "Used when relevance is graded (not just 0/1, but values like 0.2, 0.6, 1.0)." },
            { type: "formula", text: "CG_n = Σ relᵢ  for i = 1..n" },
            { type: "p", text: "Sums the gain at each rank position." },
          ],
        },
        {
          id: "b7-10",
          label: "Other Quality Criteria",
          branch: 7,
          content: [
            { type: "list", items: [
              "Are results about the target subject?",
              "Are they up-to-date?",
              "Are they from a trusted source?",
              "Do they satisfy the user's actual need?",
              "How should we rank them?",
            ]},
          ],
        },
      ],
    },

    {
      id: "b8",
      label: "Key Formulas",
      branch: 8,
      content: [
        { type: "p", text: "The full formula reference for the module." },
        { type: "table", rows: [
          ["Formula", "Meaning"],
          ["TF(t,d) = f / |d|", "Term frequency normalized by doc length"],
          ["IDF(t) = log(N / df)", "Inverse document frequency"],
          ["W(t,d) = TF × IDF", "TF-IDF weight"],
          ["score(q,d) = Σ W(tᵢ,d)", "Document score for query q"],
          ["Disc(tₖ) = avgsim{-tₖ} − avgsim", "Discriminative value of a term"],
          ["P = Rel∩Ret / Ret", "Precision"],
          ["R = Rel∩Ret / Rel", "Recall"],
          ["F = 2PR / (P+R)", "F-measure (harmonic mean)"],
          ["R-Prec = relevant in top-R / R", "R-Precision"],
          ["AP = (1/R) · Σ P(rₖ)", "Average precision"],
          ["MAP = (1/Q) · Σ AP(q)", "Mean average precision"],
          ["CG_n = Σ relᵢ  (i=1..n)", "Cumulative gain"],
          ["P_interp(rⱼ) = max P(r), r ≥ rⱼ", "Interpolated precision"],
        ]},
      ],
    },
  ],
};