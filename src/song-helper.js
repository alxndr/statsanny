const aliases = {
  "AC/DC Bag": "Bag", "All Things Reconsidered": "ATR", "Also Sprach Zarathustra": "2001", "Alumni Blues": "Alumni", "Amazing Grace": "AGrace", "Army of One": "Ao1", "The Asse Festival": "Asse Festival", "Avenu Malkenu": "Avenu",
  "Back on the Train": "BotT", "Backwards Down the Number Line": "BDtNL", "The Ballad of Curtis Loew": "BoCLoew", "Bathtub Gin": "Gin", "Beauty of My Dreams": "BoMD", "Be Good and You'll Be Lonely": "BGaYBL", "Big Ball Jam": "BBJam", "Big Black Furry Creature from Mars": "BBFCFM", "Billy Breathes": "BBreathes", "Birds of a Feather": "BoaF", "The Birdwatcher": "Birdwatcher", "Black-Eyed Katy": "BEKaty", "Bold As Love": "BALove", "Boogie On Reggae Woman": "Boogie On", "Bouncing Around the Room": "Bouncin'", "Breath and Burning": "BnB", "Buried Alive": "BAlive",
  "Camel Walk": "CWalk", "Cars Trucks Buses": "CTB", "Chalk Dust Torture": "CDT", "Character Zero": "Char 0", "Colonel Forbin's Ascent": "Forbin's", "Crimes of the Mind": "CotM", "Crosseyed and Painless": "C&P", "The Curtain": "Curtain", "The Curtain With": "Curtain With",
  "Daniel Saw the Stone": "DStStone", "Dave's Energy Guide": "DEG", "A Day in the Life": "ADitL", "David Bowie": "Bowie", "Destiny Unbound": "Destiny", "Devotion To a Dream": "DtaD", "Dinner and a Movie": "DaaM", "Divided Sky": "Divided", "Dog Faced Boy": "DFBoy", "The Dogs": "Dogs", "Dogs Stole Things": "DSThings", "Down with Disease": "DwD",
  // E
  "Fast Enough for You": "FEFY", "Fire on the Mountain": "FotM", "First Tube": "1st Tube", "Fly Famous Mockingbird": "Mockingbird", "The Fog That Surrounds": "FTS", "Fuck Your Face": "FYF",
  "Ginseng Sullivan": "Ginseng", "Golgi Apparatus": "Golgi", "Good Times Bad Times": "GTBT", "Gotta Jibboo": "Jibboo", "The Great Gig in the Sky": "GGitSky", "Guelah Papyrus": "Guelah",
  "Halfway to the Moon": "HttMoon", "Halley's Comet": "Halley's", "Hang On to Yourself": "HOtY", "Happy Birthday to You": "HBirthday", "The Happy Whip and Dung Song": "HWaDS", "Harry Hood": "Hood", "Heavy Things": "HThings", "Highway to Hell": "H2Hell", "Hold Your Head Up": "HYHU", "The Horse": "Horse", "How Many People Are You": "HMPAY?",
  "I Always Wanted It This Way": "IAWITW", "I Am Hydrogen": "Hydrogen", "I Am the Walrus": "IAtWalrus", "I Didn't Know": "IDK", "I Found a Reason": "IFaReason",
  "Jesus Just Left Chicago": "JJLC", "Johnny B. Goode": "JBGoode",
  "Kill Devil Falls": "KDF",
  "The Landlady": "Landlady", "Letter to Jimmy Page": "LtJP", "Light Up Or Leave Me Alone": "Light Up", "Limb By Limb": "LxL", "The Little Drummer Boy": "LDBoy", "The Lizards": "Lizards", "Loving Cup": "LCup",
  "Makisupa Policeman": "Makisupa", "The Mango Song": "Mango", "The Man Who Stepped Into Yesterday": "TMWSIY", "McGrupp and the Watchful Hosemasters": "McGrupp", "Mike's Song": "Mike's", "Mountains in the Mist": "Mist", "The Moma Dance": "Moma", "My Friend, My Friend": "MFMF", "My Mind's Got a Mind of Its Own": "MMGaMoIO", "My Sweet One": "MSOne",
  "No Men In No Man's Land": "NMiNML",
  "The Oh Kee Pa Ceremony": "Oh Kee Pa", "The Old Home Place": "OHPlace",
  "Paul and Silas": "P&Silas", "Peaches en Regalia": "Peaches", "Playing in the Band": "PitBand", "Poor Heart": "PHeart", "Prep School Hippie": "PSHippie", "Prince Caspian": "Caspian", "Punch You In the Eye": "PYiTE",
  "Quinn the Eskimo": "Quinn",
  "Rock and Roll": "R&R", "Rock 'n' Roll Suicide": "R&RSuicide", "Roses Are Free": "Roses", "Runaway Jim": "Runaway", "Run Like an Antelope": "Antelope", "Running Out of Time": "ROoT",
  "Sample in a Jar": "Sample", "Samson and Delilah": "S&Delilah", "Saw It Again": "SIAgain", "Scent of a Mule": "Mule", "Scents and Subtle Sounds": "SaSS", "Seven Below": "7 Below", "She Caught the Katy and Left Me a Mule to Ride": "She Caught the Katy", "Show of Life": "SoLife", "Silent in the Morning": "Silent", "Skippy the Wondermouse": "StWMouse", "Slave to the Traffic Light": "Slave", "The Sloth": "Sloth", "Sneakin' Sally Through the Alley": "Sneakin' Sally", "A Song I Heard the Ocean Sing": "ASIHtOS", "Soul Shakedown Party": "SSParty", "Split Open and Melt": "Melt", "The Squirming Coil": "Coil", "The Star Spangled Banner": "SSB", "Stealing Time From the Faulty Plan": "STftFP", "Strange Design": "SDesign", "Suzy Greenberg": "Suzy", "Sweet Adeline": "SAdeline", "Swing Low, Sweet Chariot": "SL,SChariot",
  "Take the 'A' Train": "A Train", "Theme From the Bottom": "Theme", "Things People Do": "TPDo", "Timber (Jerry)": "Timber", "Time Turns Elastic": "TTE", "Tweezer Reprise": "Tweeprise", "Twenty Years Later": "20YL",
  // U
  "The Very Long Fuse": "VLF", "The Vibration of Life": "VoL",
  "Wading in the Velvet Sea": "Wading", "Waiting All Night": "WANight", "Waking Up Dead": "WUDead", "Walls of the Cave": "WotCave", "Water in the Sky": "WitSky", "The Wedge": "Wedge", "Weekapaug Groove": "Weekapaug", "West L.A. Fadeaway": "WLAF", "What's the Use?": "WTU?", "When the Circus Comes": "Circus", "While My Guitar Gently Weeps": "WMGGW", "Wolfman's Brother": "Wolfman's",
  "Yarmouth Road": "Yarmouth", "You Enjoy Myself": "YEM", "Your Pet Cat": "YPC",
  "Ziggy Stardust": "Ziggy"
};
