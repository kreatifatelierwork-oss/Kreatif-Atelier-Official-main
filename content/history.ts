/**
 * /aurelius/history — a history of branding, marketing and advertising in five eras.
 *
 * The outline (the five eras and their opening paragraphs) is the owner's. The longer text, the key
 * dates and the picture descriptions were written for the site from general history and should be
 * read by the owner before launch; where sources disagree a date is given as "around" or "often cited".
 *
 * Pictures: `made: true` marks a picture created for this page (an illustration, not a record of
 * anything). The rest were supplied by the owner; advertisements among them are other companies'
 * work and are shown as historical examples only.
 */

export type HistoryPhoto = {
  src: string;
  width: number;
  height: number;
  /** Short name shown over the picture and in the gallery. */
  title: string;
  /** What kind of thing it is, and roughly when and where. */
  meta: string;
  description: string;
  alt: string;
  made?: boolean;
};

export type HistoryEra = {
  id: string;
  name: string;
  /** Two or three words for what the era ran on. */
  medium: string;
  dates: string;
  kicker: string;
  lead: string;
  body: readonly string[];
  milestones: readonly { year: string; text: string }[];
  legacy: string;
  /** How many pictures sit in the centre strip; the gallery holds them all. */
  strip: number;
  photos: readonly HistoryPhoto[];
};

const img = (file: string, width: number, height: number) => ({ src: `/images/history/${file}.webp`, width, height });

export const historyPage = {
  meta: {
    title: "A History of Branding, Marketing & Advertising — Aurelius | Kreatif Atelier",
    description:
      "From town criers and painted walls to the printing press, the packaged brand, the golden age of television and the algorithm: five eras of branding, marketing and advertising, with pictures from each.",
  },
  eyebrow: ["Aurelius", "History"],
  title: "From the town crier to the algorithm.",
  lead: "A short history of branding, marketing and advertising, in five eras.",
  intro: [
    "People have always had things to sell and a reason to be remembered. What changes from one age to the next is the tool: a voice, a wall, a press, a package, a broadcast, a feed.",
    "This is the long version of the business we work in. Each era below opens into its pictures, and every picture carries a note on what it shows.",
  ],
  words: {
    label: "Three words, three jobs",
    items: [
      {
        term: "Branding",
        origin: "From the Old Norse brandr, to burn.",
        body: "A mark burned into cattle, casks and timber to show whose they were. Today it is everything that lets people recognise a maker and know what to expect from them.",
      },
      {
        term: "Marketing",
        origin: "From market, the place where buyers and sellers meet.",
        body: "Deciding what to make, for whom, at what price and through which channels. As the name of a business discipline it dates from the early 1900s, when American universities began to teach it.",
      },
      {
        term: "Advertising",
        origin: "From the Latin advertere, to turn toward.",
        body: "The paid act of turning attention toward something. It is the most visible part of marketing, and the oldest: the cry in the street came long before the plan behind it.",
      },
    ],
  },
  labels: {
    eras: "Five eras",
    keyDates: "Key dates",
    legacy: "What it left behind",
    open: "Open the era",
    pictures: (n: number) => `${n} pictures`,
    view: (title: string) => `View picture: ${title}`,
    made: "Illustration made for this page",
    previous: "Previous picture",
    next: "Next picture",
    of: "of",
    gallery: (era: string) => `Pictures from ${era}`,
  },
  eras: [
    {
      id: "antiquity",
      name: "Antiquity",
      medium: "The voice and the wall",
      dates: "Before the 1450s",
      kicker: "Before anything could be printed, advertising was shouted and painted.",
      lead: "Before mass media, advertising was vocal and environmental. Town criers called out the arrival of new ships, exotic spices and local services. In ancient cities such as Rome and Pompeii, signs for taverns and slogans for political candidates were painted directly onto stone walls.",
      body: [
        "In a town where few people could read, the crier was the news and the advertisement at once. He announced what had arrived at the harbour, what the baker had left, and what the magistrate had decided, and he was paid to do it. A good voice was a medium that could be hired.",
        "Walls did the work that stayed put. When Vesuvius buried Pompeii in AD 79 it preserved thousands of painted notices: endorsements of candidates for local office, announcements of gladiator games, rooms to let and the names of taverns. They were lettered in red and black by professional sign-writers, some of whom signed their work. One fish-sauce merchant, Aulus Umbricius Scaurus, had mosaics of his own labelled jars set into the floor of his house.",
        "This is also where the trademark begins. Potters, lamp-makers, brick-makers and bakers pressed a stamp into their goods to say who had made them. Roman oil lamps from the Fortis workshop carried its name across the empire, and were copied by rivals for exactly that reason. A loaf found at Herculaneum still carries its baker's stamp.",
        "The same instinct appears wherever trade does. In Song-dynasty China a needle shop in Jinan printed handbills from a copper plate bearing its rabbit trademark, often described as the oldest surviving printed advertisement. In medieval Europe, guilds and the Crown turned makers' marks into a duty: a mark meant someone could be held to account for the quality.",
      ],
      milestones: [
        { year: "c. 3000 BC", text: "A papyrus from Thebes offers a reward for a runaway slave and recommends the weaver's shop where he can be returned. It is often cited as the oldest written advertisement." },
        { year: "1st century", text: "Roman lamps, bricks and amphorae carry stamped workshop names, among them FORTIS." },
        { year: "AD 79", text: "Vesuvius buries Pompeii, preserving painted election notices, shop signs and announcements on its walls." },
        { year: "960–1279", text: "Song-dynasty China: a Jinan needle shop prints handbills from a copper plate with a rabbit trademark." },
        { year: "1266", text: "England's Assize of Bread and Ale, often cited as an early trademark law, requires bakers to mark their loaves." },
        { year: "1300", text: "An English statute requires silver to be tested and marked before sale: the hallmark." },
      ],
      legacy: "A mark that says who made it, and a voice that says it is here. Everything since is a faster way of doing those two things.",
      strip: 3,
      photos: [
        {
          ...img("pompeii-market-street", 1600, 893),
          title: "A market street in Pompeii",
          meta: "Illustration · Roman Italy, first century AD",
          description:
            "An imagined street in Pompeii: a potter's stall with stamped jars, loaves marked by their baker, and a man calling out from the steps while painted notices cover the wall behind him. The lettering is invented, but the practice is real. Pompeii's walls carried election slogans, tavern signs and announcements in red and black paint.",
          alt: "A crowded Roman market street with pottery and bread stalls, painted wall notices and a man calling out from stone steps",
        },
        {
          ...img("town-crier", 1600, 899),
          title: "The town crier",
          meta: "Illustration made for this page · Europe, around 1400",
          description:
            "A crier rings his bell and calls the news to a market crowd, with a ship's masts behind the rooftops. Where most people could not read, announcements of cargoes, sales and proclamations were made aloud by someone paid to be heard. It is the first hired medium.",
          alt: "A town crier in a red tunic ringing a hand bell above a crowd in a medieval market square",
          made: true,
        },
        {
          ...img("makers-marks", 1456, 1088),
          title: "Makers' marks",
          meta: "Illustration made for this page · Roman trade goods",
          description:
            "A jar, a bowl and a loaf, each pressed with a stamp, beside the bronze stamp that made the mark. Roman potters, lamp-makers and bakers marked their goods to show where they came from and to stand behind the quality. The trademark is older than the advertisement.",
          alt: "A terracotta jar, a red pottery bowl and a round loaf of bread, each stamped with a maker's mark, on a wooden table",
          made: true,
        },
      ],
    },
    {
      id: "print",
      name: "The Print Revolution",
      medium: "The press and the poster",
      dates: "1450s – 1800s",
      kicker: "Once a message could be copied exactly, it could be planned, bought and repeated.",
      lead: "Johannes Gutenberg's mechanical printing press changed how information spread. The first known printed advertisement in English appeared in 1477, a simple handbill promoting a prayer book. By the 17th century, weekly newspapers in London carried text-heavy advertisements for exotic new imports such as coffee, chocolate and tea.",
      body: [
        "Gutenberg's press, working in Mainz from around 1450, used movable metal type to produce identical copies quickly and cheaply. A notice no longer had to be written out by hand or shouted again each morning. It could be made once and put in front of hundreds of people.",
        "William Caxton, England's first printer, used his own press to sell his own books. In 1477 he printed a small handbill for a priests' manual and had it posted around Westminster. It ends with a line in Latin asking that the notice be left where it is: the first request not to tear down a poster.",
        "Newspapers gave advertising a regular home and a price. London papers of the 1650s announced coffee, chocolate and tea to readers who had never tasted them. The Boston News-Letter carried the first newspaper advertisements in the American colonies in 1704, and Benjamin Franklin's Pennsylvania Gazette added headlines and woodcut pictures to make them stand out. By 1759 Samuel Johnson was already complaining that advertisements had become so numerous they were barely read.",
        "Colour arrived with the lithographic stone. Alois Senefelder invented lithography in 1796 and Godefroy Engelmann patented a colour process in 1837. From the 1860s Jules Chéret in Paris printed large posters in three or four colours, and artists such as Toulouse-Lautrec and Alphonse Mucha followed. The late 1800s saw an explosion of chromolithography: full-colour posters, labels and trade cards that turned city streets into galleries and made commercial promotion an art form.",
      ],
      milestones: [
        { year: "c. 1450", text: "Gutenberg's press with movable metal type is at work in Mainz." },
        { year: "1477", text: "William Caxton prints a handbill for a priests' manual: the first printed advertisement in English." },
        { year: "1652–58", text: "Coffee, then chocolate, then tea are advertised to Londoners in handbills and newsbooks." },
        { year: "1704", text: "The Boston News-Letter carries the first newspaper advertisements in the American colonies." },
        { year: "1796", text: "Alois Senefelder invents lithography, printing from a flat stone." },
        { year: "1837", text: "Godefroy Engelmann patents chromolithography, printing in colour from several stones." },
        { year: "1866", text: "Jules Chéret opens his colour-poster workshop in Paris." },
        { year: "1891", text: "Henri de Toulouse-Lautrec's poster for the Moulin Rouge makes the advertisement a collector's piece." },
      ],
      legacy: "Reach. A message that could be reproduced could be measured in copies, sold by the column inch and designed to be looked at.",
      strip: 3,
      photos: [
        {
          ...img("printing-workshop", 1456, 1088),
          title: "The printing workshop",
          meta: "Illustration made for this page · Europe, 15th century",
          description:
            "One printer pulls the bar of a wooden screw press while another inks the type, and finished sheets hang to dry overhead. Every sheet off the press was the same as the last. That sameness is what made a printed notice worth paying for.",
          alt: "Two printers at work on a wooden screw printing press, with printed sheets drying on lines above them",
          made: true,
        },
        {
          ...img("couzan-mineral-water-poster", 1051, 1600),
          title: "Eau Minérale de Couzan",
          meta: "Colour poster · France, around 1900",
          description:
            "A dandy in a straw boater leans on a bottle as tall as he is. The poster names the spring, calls it the best of French table waters and adds that it is approved by the Academy of Medicine. It has everything a modern advertisement has: a product shot, a character, a claim and an endorsement, in four printed colours.",
          alt: "A French poster showing a smiling man in a yellow jacket and straw hat leaning on a giant green bottle of Couzan mineral water",
        },
        {
          ...img("champion-reaping-mowing-catalogue", 1024, 1536),
          title: "Champion Reaping & Mowing Machines",
          meta: "Trade catalogue cover · United States, in the style of the 1870s–80s",
          description:
            "Banners, drop shadows and a different typeface on almost every line, around an engraving of a farmer driving a reaper. Whiteley, Fassler & Kelly built Champion machines in Springfield, Ohio. Covers like this sold expensive equipment to farmers who would never visit the factory, so the printing had to carry the confidence.",
          alt: "An ornate green and cream catalogue cover for Champion Reaping and Mowing Machines with an engraving of a horse-drawn reaper",
        },
        {
          ...img("lancashire-insurance-trade-card", 452, 750),
          title: "The Lancashire Insurance Company",
          meta: "Trade card · late 1800s",
          description:
            "A card for the New York office of a Manchester insurer, printed in red and gold with a crowned crest. Trade cards were handed out by the million and kept in albums. For a business selling something you cannot see, such as insurance, the richness of the card was the proof of substance.",
          alt: "A red and gold Victorian trade card for the Lancashire Insurance Company of Manchester, England, with a New York office address",
        },
      ],
    },
    {
      id: "industrial",
      name: "Industry & the Modern Brand",
      medium: "The package and the promise",
      dates: "1800s – 1900s",
      kicker: "When factories made more than a town could use, the name on the package became the product.",
      lead: "Mass production meant factories were making more goods than local populations could consume, so products had to be shipped across regions. To set generic goods such as soap or flour apart from local competitors, companies began to package them with distinct names and logos. The word branding comes from the practice of burning a mark into livestock to show ownership.",
      body: [
        "For most of history a shopper bought soap, oats or biscuits from an open barrel and trusted the grocer. The railway and the factory changed that. A manufacturer hundreds of miles away now needed the customer to ask for its product by name, so the goods were wrapped, sealed and labelled. The package let the maker speak to the buyer over the shopkeeper's head.",
        "Names became property. Britain's Trade Marks Registration Act came into force in 1876, and the first mark entered on the register was the red triangle of Bass ale. Other countries passed similar laws in the same decades. A mark could now be owned, defended in court and, in time, valued on a balance sheet.",
        "Advertising also became an industry in its own right. Volney Palmer opened the first recognised advertising agency in Philadelphia in 1841, at first as a broker of newspaper space. N. W. Ayer & Son, founded in 1869, began to work for the advertiser instead of the newspaper, and agencies started to write the advertisements as well as place them.",
        "The first great brand builders worked out the method by trial. Thomas Barratt of Pears bought a painting by Millais and turned it into the most famous soap advertisement of the century. Coca-Cola, first sold in an Atlanta pharmacy in 1886, wrote its name in a bookkeeper's flowing script and gave away coupons for a free glass. Kodak promised, \"You press the button, we do the rest.\" Colgate put toothpaste in a tube.",
        "Not all of it was honest. Tonics and patent medicines promised to cure almost anything, and it was partly their excess that led to the first laws on labelling and advertising claims in the early 1900s. The idea that a brand is a promise that can be broken dates from here.",
      ],
      milestones: [
        { year: "1841", text: "Volney Palmer opens the first recognised advertising agency, in Philadelphia." },
        { year: "1869", text: "N. W. Ayer & Son is founded and soon begins to work for the advertiser, not the newspaper." },
        { year: "1872", text: "Montgomery Ward issues the first general mail-order catalogue in the United States." },
        { year: "1876", text: "The Bass red triangle becomes the first trademark on the British register." },
        { year: "1886", text: "Coca-Cola goes on sale in Atlanta. In London, Thomas Barratt buys Millais's painting for Pears soap." },
        { year: "1888", text: "Kodak launches with the line \"You press the button, we do the rest.\"" },
        { year: "1896", text: "Colgate sells toothpaste in a collapsible tube." },
        { year: "1906", text: "The United States passes the Pure Food and Drug Act, an early check on what a label may claim." },
      ],
      legacy: "The brand as a promise: the same thing, from the same maker, every time, wherever you buy it.",
      strip: 3,
      photos: [
        {
          ...img("coca-cola-tin-signs", 1275, 1233),
          title: "Coca-Cola, five cents a glass",
          meta: "Logo and tin signs · United States, in the style of the 1890s–1900s",
          description:
            "The script logo above two signs. One sells the drink \"for headache and exhaustion\", the other simply as \"delicious and refreshing\". Coca-Cola began as a pharmacy tonic in 1886 and became a refreshment within a generation. The lettering, drawn by the company's bookkeeper Frank Robinson, has barely changed since.",
          alt: "The Coca-Cola script logo above two worn tin advertising signs, one reading For Headache and Exhaustion and one showing a woman holding a glass",
        },
        {
          ...img("pears-soap-engraving", 736, 1151),
          title: "Pears' Soap",
          meta: "Newspaper engraving · Britain, late 1800s",
          description:
            "A woman at a wash-basin, surrounded by promises: healthful skin, good complexion, soft white hands, \"the purest and most durable toilet soap, hence the best and cheapest\". Under Thomas Barratt, Pears advertised on a scale Britain had not seen, and showed that a bar of soap could be sold on what it would do for the person using it.",
          alt: "A Victorian engraved advertisement for Pears' Soap showing a woman washing her hands at a basin, surrounded by ornamental lettering",
        },
        {
          ...img("colgate-ribbon-dental-cream", 1024, 752),
          title: "Colgate's Ribbon Dental Cream",
          meta: "Carton and tube · United States, early 1900s",
          description:
            "A red and white carton and the tube that came in it. Toothpaste had been sold in jars; Colgate put it in a collapsible tube in 1896. The side of the box argues its case in a sentence about what dentists say. The package is doing three jobs here: container, shelf display and advertisement.",
          alt: "An antique Colgate's Ribbon Dental Cream carton and a pink toothpaste tube lying on a wooden surface",
        },
        {
          ...img("soda-fountain-sign", 720, 720),
          title: "Soda Fountain · Cigars · Confectionary",
          meta: "Painted tin shop sign · United States",
          description:
            "A sign that lists what the shop sells and nothing else: soda fountain, cigars, bottled drinks, tobacco, confectionary. This is the world before brands took over the shopfront. It tells you the category. The names of particular drinks and sweets came later, and made the shopkeeper's list less important than the maker's label.",
          alt: "A weathered tin sign above a doorway reading Soda Fountain, Cigars, Bottled Drinks, Tobacco, Confectionary",
        },
        {
          ...img("genoa-general-store-sign", 900, 900),
          title: "Genoa General Store",
          meta: "Painted shop sign · Nevada, United States",
          description:
            "\"Sellers of firearms and ammunition since 1855. Fine wine, beer and sundries.\" The general store sold from sacks and barrels, and its own reputation was the only guarantee. The date on the sign is an early piece of branding in itself: we have been here a long time, so you can trust us.",
          alt: "A red painted wooden sign reading Genoa NV General Store, sellers of firearms and ammunition since 1855, fine wine, beer and sundries",
        },
      ],
    },
    {
      id: "golden-age",
      name: "The Golden Age",
      medium: "The broadcast and the big idea",
      dates: "1900s – 1980s",
      kicker: "Advertising stopped describing the product and started describing the person who bought it.",
      lead: "Marketing shifted from telling people what a product did to telling them how it would make them feel. Pioneers such as Edward Bernays applied psychology to connect products to human desires and social status. Radio in the 1920s and television in the 1940s created the mass audience, and with it the \"Mad Men\" era of the 1950s and 60s: mascots, jingles and emotional storytelling that built enormous national brands.",
      body: [
        "The century opened with an argument about what advertising was. One school called it \"salesmanship in print\": give a reason to buy, test it, count the replies. Claude Hopkins set out the method in Scientific Advertising in 1923. The other school went looking beneath reason. Edward Bernays, a nephew of Sigmund Freud, argued that people buy to express who they are, and staged events to prove it.",
        "Then the audience became enormous. The first paid radio commercial in the United States aired in New York in August 1922, for a housing development. Sponsors soon paid for whole programmes, which is why daytime serials came to be called soap operas. The first television commercial, ten seconds for Bulova watches before a baseball game in July 1941, is said to have cost nine dollars. Within fifteen years a single advertisement could reach most of a country in one evening.",
        "Companies reorganised themselves around the brand. Procter & Gamble gave each product its own manager from 1931, and marketing became a subject with its own textbooks: the four Ps of product, price, place and promotion in 1960, and positioning, the idea that a brand must own one place in the customer's mind, in the 1970s.",
        "On Madison Avenue, the agencies that gave the era its name found their styles. Rosser Reeves insisted on a single unique selling proposition. David Ogilvy joined research to long, elegant copy. Leo Burnett, in Chicago, built characters, among them the Marlboro cowboy, who turned a filter cigarette into a symbol of independence. Bill Bernbach sat writers and art directors together and produced Volkswagen's \"Think Small\", which sold a small car by admitting it was small. A copywriter at N. W. Ayer wrote \"A Diamond Is Forever\".",
        "India wrote its own chapter. Film stars sold soap from the 1940s. Air India's Maharajah appeared in 1946, and the Amul girl in 1966; she is still commenting on the news today. Hand-painted hoardings and shopfronts gave every street its own typography. Commercials came to Doordarshan in 1976 and colour in 1982, and Hum Log, the first sponsored serial, showed in 1984 what television could do for a packet of noodles.",
        "The same decades showed the limits of persuasion. Evidence on smoking led the United States to take cigarette advertising off television and radio in 1971, and many countries have since banned it altogether. The advertisements of the period are a record of its assumptions too, about women in particular. The era closed with a new kind of event: Apple's \"1984\", shown during the Super Bowl, an advertisement that was news in itself.",
      ],
      milestones: [
        { year: "1922", text: "The first paid radio commercial in the United States airs on WEAF, New York." },
        { year: "1923", text: "Claude Hopkins publishes Scientific Advertising." },
        { year: "1931", text: "Procter & Gamble gives each brand its own manager." },
        { year: "1941", text: "The first television commercial in the United States: ten seconds for Bulova watches." },
        { year: "1946", text: "Air India's Maharajah makes his first appearance." },
        { year: "1947", text: "\"A Diamond Is Forever\" is written for De Beers." },
        { year: "1954", text: "Leo Burnett's Marlboro cowboy first appears." },
        { year: "1959", text: "Volkswagen's \"Think Small\" opens advertising's creative revolution." },
        { year: "1966", text: "The Amul girl appears on hoardings in Bombay." },
        { year: "1971", text: "Cigarette advertising leaves American television and radio." },
        { year: "1976", text: "Doordarshan begins to carry commercials in India." },
        { year: "1984", text: "Apple's \"1984\" airs during the Super Bowl." },
      ],
      legacy: "The big idea: one thought, felt by millions of people at the same moment.",
      strip: 4,
      photos: [
        {
          ...img("triumph-bonneville-120-brochure", 874, 688),
          title: "Triumph Bonneville 120",
          meta: "Sales brochure · Britain, late 1950s",
          description:
            "\"The Best Motorcycle in the World\", a side-on portrait of the machine, and a paragraph of specification: 650 c.c., 46 brake horsepower at 6,500 r.p.m. The Bonneville took its name from the salt flats in Utah where a Triumph-engined machine had set a speed record. The product is the hero and the numbers are the argument.",
          alt: "A 1950s brochure page showing a silver and red Triumph Bonneville 120 motorcycle on a pale blue background",
        },
        {
          ...img("indian-print-ads-colour", 1103, 776),
          title: "Indian magazine advertising",
          meta: "Collage of press advertisements · India, 1950s–1990s",
          description:
            "Tea, scouring powder, a family car, an airline's Maharajah on a beach, chocolates, a motorcycle and, most of all, film stars selling soap. Lux built its Indian advertising on leading actresses for decades. The collage also records the attitudes of its time: one sewing-machine advertisement urges parents to \"train her to be an ideal housewife\".",
          alt: "A collage of colourful Indian magazine advertisements for tea, soap, cars, an airline, chocolates and motorcycles",
        },
        {
          ...img("cadbury-5-star-newsprint", 975, 1600),
          title: "\"Wow! Cadbury's 5 Star\"",
          meta: "Newspaper advertisement · India, 1971",
          description:
            "A chocolate bar drawn in halftone dots, a burst of hand lettering and one fact that matters: \"Now Re. 1 only\". Newspaper advertisements had a single colour and a few seconds of a reader's attention, so they led with the price. The bar had been launched in India only two years earlier.",
          alt: "A black and white newspaper advertisement reading Wow! Cadbury's 5 Star, the energy bar, now Re. 1 only",
        },
        {
          ...img("fresh-juice-painted-sign", 790, 540),
          title: "Fresh Juice",
          meta: "Hand-painted shop sign · India",
          description:
            "The word JUICE in block letters with striped shadows, and pomegranate juice lettered in Hindi beneath it. India's sign painters worked without rulers or stencils and each had a style of his own. Before printed vinyl banners became cheap, almost every shop name in the country was written by hand.",
          alt: "A brightly hand-painted sign reading Fresh Juice in three-dimensional block letters, with Hindi lettering and a pomegranate below",
        },
        {
          ...img("super-tailors-painted-street", 1254, 1254),
          title: "A street of painted hoardings",
          meta: "Illustration · South India, 1980s",
          description:
            "A row of shops under layers of hand-painted hoardings in Tamil and English: tailors, sewing machines, a film cut-out, an ayurvedic agency. Every sign is competing with the one beside it, so each is louder than the last. This was outdoor advertising before the digital screen: paint, scaffolding and a very large brush.",
          alt: "A South Indian street front covered in hand-painted hoardings in Tamil and English, including a large sign reading Super Tailors",
        },
        {
          ...img("indian-print-ads-newsprint", 744, 400),
          title: "Newsprint",
          meta: "Collage of newspaper advertisements · India, 1960s–1980s",
          description:
            "Health drinks, sewing machines, washing powder, hair cream, biscuits endorsed by a film villain, instant coffee and butter. On cheap paper in black ink, advertisers relied on a strong drawing, a short headline and a face people already knew.",
          alt: "A collage of black and white Indian newspaper advertisements for health drinks, sewing machines, washing powder, biscuits and coffee",
        },
      ],
    },
    {
      id: "digital",
      name: "The Digital Era",
      medium: "The screen and the signal",
      dates: "1990s – today",
      kicker: "The audience of millions became millions of audiences of one.",
      lead: "The first clickable banner advertisement appeared in 1994 and changed the direction of the industry. The focus moved quickly to data, search engines and social media. Marketing went from a broadcast model, the same message shouted at everyone, to targeted marketing: speaking to particular people on the basis of what they do online.",
      body: [
        "On 27 October 1994 the web magazine HotWired sold space at the top of its pages to a handful of advertisers. One banner, for AT&T, asked: \"Have you ever clicked your mouse right here? You will.\" It is widely reported that more than four in ten people who saw it clicked. Nothing in advertising had ever been so easy to count.",
        "Search turned intention into a medium. Instead of interrupting people, an advertiser could appear at the moment someone asked for the thing it sold, and pay only when they clicked. Google launched AdWords in October 2000. For the first time a small business could buy the same position as a multinational, one keyword at a time.",
        "Social networks and the smartphone put the screen in everyone's hand. Facebook opened to advertisers in 2007, the year the iPhone went on sale. Brands became publishers, customers answered back in public, and by the middle of the 2010s more of the web was being read on phones than on computers. In India, cheap mobile data from 2016 brought hundreds of millions of people online within a few years.",
        "Behind the screen, buying became automatic. Advertising space is now sold one impression at a time in auctions that take a fraction of a second, matched to what is known about the person looking. That precision brought its own reaction: ad blockers, privacy laws such as Europe's GDPR in 2018 and India's data-protection law in 2023, and limits on tracking built into phones and browsers.",
        "The most recent turn is the short vertical video, chosen by an algorithm and scrolled with a thumb. Attention is the scarce thing, and it is counted in seconds. Brands increasingly reach people through creators who film in their own rooms, and regulators now ask those creators to say when they have been paid. Since 2022, generative AI has begun to write, draw and edit advertising as well as place it.",
        "What has not changed is the first problem. In a feed with no end, people still choose what they recognise and trust. The oldest tool on this page, the mark that says who made it, is doing more work than ever.",
      ],
      milestones: [
        { year: "1994", text: "HotWired runs the first clickable banner advertisements." },
        { year: "2000", text: "Google launches AdWords, selling advertising against search terms." },
        { year: "2005", text: "YouTube launches; anyone can publish video." },
        { year: "2007", text: "Facebook opens its advertising platform. The iPhone goes on sale." },
        { year: "2011", text: "Patagonia's \"Don't Buy This Jacket\" asks customers to buy less." },
        { year: "2016", text: "Low-cost 4G data arrives in India. Worldwide, mobile web use overtakes desktop." },
        { year: "2018", text: "Europe's General Data Protection Regulation takes effect." },
        { year: "2020", text: "Short vertical video becomes the dominant format on social platforms." },
        { year: "2021", text: "Apple asks iPhone users whether apps may track them. India's advertising standards body issues rules for influencers." },
        { year: "2022", text: "Generative AI tools for text and images reach the general public." },
      ],
      legacy: "Attention that can be measured to the second, and the oldest question asked again: among all of this, whom do people trust?",
      strip: 3,
      photos: [
        {
          ...img("crt-banner", 1456, 1088),
          title: "The banner",
          meta: "Illustration made for this page · mid-1990s",
          description:
            "A beige monitor in a dim room, an early web browser, and a bright rectangle across the top of the page. The banner was a magazine advertisement moved onto a screen, with one difference that changed everything: you could click it, and the advertiser knew that you had.",
          alt: "A 1990s beige computer monitor on a cluttered desk showing an early web page with a colourful banner advertisement",
          made: true,
        },
        {
          ...img("two-screens", 1600, 899),
          title: "Two screens",
          meta: "Illustration made for this page · 2010s",
          description:
            "A commercial plays on a large television while the person it was made for looks at a phone. Broadcast and personal media now compete in the same room, at the same moment, for the same pair of eyes. Most campaigns are planned for both.",
          alt: "A person on a sofa in a dark room looking down at a smartphone while a large television plays an advertisement in the background",
          made: true,
        },
        {
          ...img("analytics-desk", 1600, 899),
          title: "The dashboard",
          meta: "Illustration made for this page · 2010s–today",
          description:
            "Charts, funnels and audience segments on two monitors late at night. Every click, view and purchase can be recorded, so marketing decisions are now argued from data. The numbers show what happened. Deciding what to do about it is still a matter of judgment.",
          alt: "A person seen from behind at a desk at night, looking at two monitors filled with charts, a funnel diagram and a world map",
          made: true,
        },
        {
          ...img("phone-lit-face", 1136, 1408),
          title: "The attention economy",
          meta: "Illustration made for this page · today",
          description:
            "A face in the dark, lit only by a phone. The feed is chosen for one person and has no last page. When every brand, creator and friend is in the same stream, the thing being bought and sold is a few seconds of someone's attention.",
          alt: "A close-up of a face in darkness lit from below by the glow of a phone screen",
          made: true,
        },
        {
          ...img("creator-set", 1536, 1024),
          title: "The creator's set",
          meta: "Illustration made for this page · today",
          description:
            "A ring light, a phone on a tripod and a tidy corner of an untidy room. Much of today's advertising is made like this, by one person speaking to an audience that chose to follow them. The production is small. The trust between creator and viewer is what a brand is paying for.",
          alt: "A content creator seated at a desk holding up a product in front of a ring light and a phone on a tripod, with coloured lights behind",
          made: true,
        },
        {
          ...img("patagonia-ice-climber", 736, 1000),
          title: "\"Explore the unexplored\"",
          meta: "Poster · outdoor clothing",
          description:
            "A single climber on a wall of ice, a logo and five words. No product is in sight. Brands in this era are often sold on what they stand for; in 2011 Patagonia ran a newspaper advertisement headed \"Don't Buy This Jacket\", asking customers to consider the cost of what they buy.",
          alt: "A poster of a lone ice climber in a red jacket on a frozen cliff, with the Patagonia logo and the words Explore the unexplored",
        },
      ],
    },
  ] satisfies readonly HistoryEra[],
  closing: {
    label: "What has not changed",
    headline: { lead: "Five eras,", emphasis: "the same three jobs." },
    items: [
      { title: "Be recognised", body: "A stamp in clay, a red triangle, a script logo, a profile picture. The mark has changed its material and nothing else." },
      { title: "Be found", body: "A crier went where the crowd was. So did the poster, the commercial and the search result. The crowd keeps moving." },
      { title: "Be believed", body: "A hallmark, an endorsement, a review, a creator's word. Every era invents a new way to earn trust, and a new way to lose it." },
    ],
    cta: { label: "See how Aurelius works", href: "/approach" },
  },
  note: "About the pictures. Advertisements, signs and packaging are shown as historical examples; the names and trademarks in them belong to their owners. Pictures marked as illustrations were made to explain a period and are not historical records.",
} as const;
