// hearts.js
function createBackgroundHearts(count = 25) {
    const colors = ['#ffb3c6', '#ffccd5', '#fff0f3', '#ff8fab']; // Softer, more pastel colors
  
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      heart.className = "heart heart-back"; // Always in background
      
      // Smaller sizes for subtle background effect
      const size = 5 + Math.random() * 50;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      heart.style.width = heart.style.height = `${size}px`;
      heart.style.left = Math.random() * 100 + "vw";
      // Slower movement for background elements
      heart.style.animationDuration = (15 + Math.random() * 15) + "s";
      heart.style.animationDelay = Math.random() * 1 + "s";
      // Lower opacity for background
      heart.style.opacity = 0.2 + Math.random() * 0.7;
      heart.style.background = color;
      heart.style.setProperty('--heart-color', color);
      heart.style.setProperty('--heart-size', `${size}px`);
      
      // Start below viewport
      heart.style.bottom = -size + "px";
      
      // Gentle sway
      const xMovement = (Math.random() - 0.5) * 100;
      heart.style.setProperty('--x-movement', `${xMovement}vw`);
      
      document.body.appendChild(heart);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    createBackgroundHearts(30);
  });
  // Video audio control
document.addEventListener('DOMContentLoaded', function() {
    const lightboxVideo = document.getElementById('lightbox-video');
    const videoThumbnail = document.querySelector('.gallery-video');
    
    // When lightbox opens
    document.querySelector('a[href="#videopreview"]').addEventListener('click', function() {
      // Unmute and play when lightbox opens
      setTimeout(() => {
        if (lightboxVideo) {
          lightboxVideo.muted = false;
          lightboxVideo.play();
        }
      }, 300); // Small delay to allow lightbox to open
    });
    
    // When lightbox closes
    document.querySelector('a[href="#videopreview"]').addEventListener('click', function(e) {
      if (e.target === this) {
        if (lightboxVideo) {
          lightboxVideo.pause();
          lightboxVideo.currentTime = 0;
        }
        if (videoThumbnail) {
          videoThumbnail.muted = true;
        }
      }
    });
    
    // Pause video when closing lightbox with escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.currentTime = 0;
      }
    });
  });
// Update DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  createBackgroundHearts(30);
  createConfetti(); // Add confetti for birthday
});function arrangeRandomPhotos() {
  const container = document.querySelector('.love-letter-wrapper');
  const photos = document.querySelectorAll('.loveletter-bg-photos img');
  const containerRect = container.getBoundingClientRect();
  const padding = 20; // Minimum space between photos
  const placedPhotos = []; // Track placed photos for collision detection

  photos.forEach(img => {
    // Set initial dimensions (needed for collision detection)
    img.style.width = 'auto';
    img.style.height = 'auto';
    img.style.maxWidth = '400px';
    img.style.maxHeight = '400px';
    
    // Get actual image dimensions after setting styles
    const imgWidth = img.clientWidth;
    const imgHeight = img.clientHeight;
    
    let attempts = 0;
    let positionFound = false;
    let randomLeft, randomTop;

    // Try to find a non-overlapping position (max 50 attempts)
    while (!positionFound && attempts < 50) {
      // Calculate max positions to keep images fully visible
      const maxLeft = containerRect.width - imgWidth - padding;
      const maxTop = containerRect.height - imgHeight - padding;
      
      // Random position within container bounds
      randomLeft = padding + Math.random() * maxLeft;
      randomTop = padding + Math.random() * maxTop;
      
      // Random rotation (-15 to 15 degrees)
      const rotation = -15 + Math.random() * 30;
      
      // Check for collisions with existing photos
      const collides = placedPhotos.some(placedPhoto => {
        return (
          randomLeft < placedPhoto.right + padding &&
          randomLeft + imgWidth + padding > placedPhoto.left &&
          randomTop < placedPhoto.bottom + padding &&
          randomTop + imgHeight + padding > placedPhoto.top
        );
      });
      
      if (!collides) {
        positionFound = true;
        
        // Store this photo's position for future checks
        placedPhotos.push({
          left: randomLeft,
          top: randomTop,
          right: randomLeft + imgWidth,
          bottom: randomTop + imgHeight
        });
        
        // Apply styles
        img.style.position = 'absolute';
        img.style.left = `${randomLeft}px`;
        img.style.top = `${randomTop}px`;
        img.style.transform = `rotate(${rotation}deg)`;
        
        // Random z-index for layering
        img.style.zIndex = Math.floor(Math.random() * 5);
      }
      
      attempts++;
    }

    // If no position found after attempts, place it anyway (might overlap)
    if (!positionFound) {
      img.style.position = 'absolute';
      img.style.left = `${randomLeft}px`;
      img.style.top = `${randomTop}px`;
      img.style.transform = `rotate(${rotation}deg)`;
      img.style.zIndex = Math.floor(Math.random() * 5);
    }
  });
}
// Call on load and window resize
document.addEventListener("DOMContentLoaded", arrangeRandomPhotos);
window.addEventListener('resize', arrangeRandomPhotos);

document.addEventListener("DOMContentLoaded", function() {
  // Get the full love letter text
  const fullText = `dec 2024 date crt ah theriyathu apalernthu onnai ya pudikum nu vachikenya, athuku aprom adikadi unna pakanum nu thonum.
        seei evening eppadium lwan la thana irrupanu vanthu pakalam nu patha en nerama ennanu theriyala apaiyalam sikaram v2 ku poiduva
        na kuda onaku call panni msg panni lam kepen, keta  room ku vanten nu solluva ok seri aa nalaiku pathukalam nu vanthuduven.
        ippadiye nal ponichu 
        oru kattathuku aprom unnaiya romba udika ara machithu around feb pola
        dec - jan sem leave la kuda unna pathithan aathigama nanachutu irrunthen 😅
        apo gokul ku mattum than therium enaku unnaiya pudikumnu.
        vera yarukume theriyathu even aswan ku kuda. avanuku solla kudathunu illa eppadi soldrathunu theriyama irrunthen.
        nalum ponichu nanum unna pathute nala ootitu irrunthen.
        sports day nadakum pothum kuda na yaru kittaiuume sollala but remna eppadinkandu pudichanu enaku theriyala 😂 ava kandupuduchita.
        pt room velila ukanthu irrukurapa one time ni voice msg anupuna. aaha enna voice msg send pandranu vai kulla sonnatha gopi ketutan, apa than avan ketan, antha onnumela onaku ethume illanu sollu apdinu😅 nanum othukutten amada nu.
        unnaiya pakanumne adikadi mani stores pakam aravind hotel pakam varuven unlucky ni kanla matta mata.
        dec 10 nu nanaikura ni8 onaku msg pannen ana ni olungave replay pannala enaku oru mari upset aaitu nammathan ethum pannitomonu nanachutu irrunthen aduthanal kalaila vara.
        next day than athletic nadanthuthu nium vantha, ni vantha tha na munnadiye pathuten ana nana call panna vendam nu vittuten ana ni pannita 😂
        athu vara ellarum ketanga en oru mari sad ah irrukanu even remna kida keta na ethum sollala
        ni call pannathuku aprom than sari aanichu😅
        anaikuthanbbet katti thothu pona nabagam irruka😂🤣
        ana annaiku mazha vanthapa ore shirt ah koda mari puduchitu vanthathulam sema feel 💖 apa kuda ni keta enna padhu en mela avalo pasamanu🤭 ana na onum sollala
        aprom sports day vanthuthu na fc la irrukurapa ni rng hall lathan irrunakanu sonna unnaiya paka oodi vantha unnaiya ala kanum keta cls la irruken late ah varen nu sollita
        ana ni vanthathuku aprom last la wall la sanjutu pesitu irrunthathalan super ah irrunthuthu🤩
        athuku aprom oru 6 days leave vanthuthu enaku v2 ku pogave thonala, enga pona unnaiya paka mudiyathenu.
        annaiku ni8 bus poitu irrukum pothuthan enna enna mo palambitu vathen 🤭 apa stright ah sollavum mudiyala uruku poita unnaiya paka mudiyathenu, enaku eppada thirumbi varuvomnu than irrunthuthu,
        march 15 v2 ku poiten, nium msg pannitu than irruntha
        apa than keta yara love pandra yara love pandrannu😅ennala sollavum mudiyala mellavum mudiyatha kanaka ukanthu irrunthen. aprom elakiya kudutha thairiyathula
        go**la enna analum seri innaiku propose pannieh aagurom nu mudivu panniten 
        pandrathuku munnadi enna sollanum eppadi sollanum nu munnadiye notes la type panni vachi irrunthen😅😅
        oru valiya mar 15 evening 5.51 ku solliten.
        sollitu bayathula phone ah flight mode potutu change potutu oditen.
        aprom ah thairiyatha vara vachitu vanthu patha ni pakave illa,😥
        ana enaku therium ni kandipa notification la pathu irrupanu😅
        athunalathan ni replay pandra vara na atha del eh pannala.
        oru vazhiya blue tick vanthutu ana replay illa🙄.
        ennada ithu nu seri wait panni papom nu wait panna msg panna enna dare aah nu🤦🏻
        ana enaku therium ni kandipa othuka ma seri ini mogathulaiye mulika vandamnnu nanachen.
        ana ni nallathan pesuna solla pona munnadiya vda ni apathan romba nalla pesuna🤣. onaku interest illanu therium ana ni nalla pesunathum enaku harsha than nabagam vantha, enga iva kittaium romba cls aaitu aprom vittutu pona thanga mudiyathe avalachum frd uh ivala love la pandrom nu nanachututhan, okitta sonna onaku interest illana enaku hope kudukathanu.
        
        apa ni pesuna hope kudukura mari irrunthuthu ana pesamalaium ennala irrukaudiyala🥺
        
        aprom unna pakurathukaga texperia anniku clg kelambi vanthen,
        enaku orumari bayam excitement ellame irrunthuthu😅.
        enna pesa porom eppadi pesaporom nu theriyama vanthutu irruntha apa ellarum interfere aagi tholaiuuranga 😅.
        eppadida pesurathunu yosichutu irrukurapathan evening niye pesa kupta.
        fc la pesiti irrunthom apa than sonna enaku love lam illa ana onna kalyanam panniya ok nu🤭 mathavangalukalam na kalyanathuku kuda ok sollalanonaku mattum than soldranu sonna. seri ok apa kandipa antha age la kekanum nu nanacha.
        ana onaku oru thought eppadium clg mudinjathum ivanla adikadi paka mudiyathu athuku aprom ivane vittuduvanu.
        athu kaga oru photo kuda eduthu irrupen tabel la ring ah vachi.
        athuku aprom daily pesa ara machom solla pona ennaiya vda ni romba interact ah irruntha😂
        ph pesurapalam vaikuranu sonna, innum 5min pesu innum 5 min pesu nu solluva🤭.
        literal ah sollanumna ni love panna start pannita😁
        ana solla mata keta love panniduvanonu bayama irrukunu sonna.
        antha feel nalla irrunthuthu. apa mudivu panna otha enna analum ivathanda namakunu🥰.
        athuju aprom ellame nalla irrunthuchi antha butterflies 🦋
        antha oru blush feel ellame 😂 
        athuku aprom than ni uruku pona train la enkudathan vantha🥰 
        apa than 1st time ni enkuda bike la vanthathu.
        veil kalathula sweater keta nane oru kiruku athu kathula parakuthunu ni pudichutu vantha pathita 😅
        solla pona ni sweater ah pudikala ni ennatha pudichutu vantha😍
        apa ni kaiya edukurapa na un kaiya pudichen theriuuma
        ni kuda sonna enga kaiya pudicha oru mari irrukunu😊
        apa enakum oru mari than irrunthuthu🤭
        aprom station la platform la nadakurapa ni en kaiya katti pudicha athalam sema feel uh 🥰 aprom angaiye ukanthu pesitu irrunthathu ellame than☺
        aprom ni train erita. uruku ponathuku aprom kuda en kitta than pesitu irruntha.
        apa than ni sonna enaku romance eh varathu love panna varathunu😅
        apdi pesitu irrukurapathan hari kuda nadanthatha sonna🥺
        unmailaiye atha kekurapa oodanjuten😣 apa ni onnu sonna pathiya dei dei na vergin thanda nu, atha ketapalam sathiyama sethuten😥
        apa ni sonna pathiya v2 da vena namma oru moment creat pannuvom nu, na atha note pannalanu ni nanacha ana na atha note panna 😅
        oru mari mind kullaiye oda aramachutu athukagave oru dum adichen😮‍💨
        athuku aprom adikadi athu mind la varum thukam varathu orumari kadupa irrukum yaru kittaium sollium polamba mudiyathu 😣romba kasta patten rombanal kasta patten athu lernthu na blue film kuda pakuratha vittuten.
        aprom bus eritu ph panna pesitu vantha apathan ni en kitta keta "Padhu enna kalyanam pannikuriyanu🥰🤭"
        seri ma athan pannukirane nu sonnat xdfhuku illa sikaram vanthu pannikanu sonna☺ seri nalaike pannikalamanu ketathuku ok vum sonna😅😅
        aprom coimbatore vantha nanthan vanthu pickup panna
        apa bike la vara pa un kaiya pudichute vanthathu lam enna soldrathunu kuda theriyala🥰🥰
        oru edathula kaiya eduthapa niye kaiya pudinu sonna pathiya antha feel lam explain eh panna mudiyathu☺.
        apa oru nal na sonna iru onaku nerula i love you soldranu.
        ana nerula pathapa vendma sollathanu sonna.
        ana anniku ni8 ph la, na apadithan sollven ni thana sollanum sonna🤭.
        nextday(4.4.2025) fc velila na onaku i love you sonna atha ketathum pesu mochu illama ninna 🤭☺
        annaiku evening ni kovil pona ennaium kupta. apa kuda mazha penjuthu, nanajalum parava illanu unnaiya paka vanthen. kovil poitu kalan sapda ponom apa kuda na sonna enaku unnaiya hug pannanum pola irrukunu😅
        apa unnaiya vittu poga enaku manase illa athan thirupi jai home ku vanthen un pinnadiye suthithu irrunthe athathu kutty pota poona mari🤣
        5.4.2025 saturday na en frds ellrum nadanthu antha pakam vanthom ni kuda apa anish kuda pesitu ninna, ana ni enna pakala na mani stor kitta pona aprom ni enn apatha.
        ni ettipatha nanum pathen athunalathan venumnu frd vachi irruntha dum ah vangi adichen ni eppadi react pandrannu😅.
        ana apa than ni en kitta 1st time sanda pottu ini enaku ph pannathanu sollitu poita😢. enaku eppadi convince pandrathunu theriyala. last la patha naunna convince pannala nithan ennaiya convince panna😂.
        8.4.2025 enaku convaince panna theriyalanu sonna serinu na athukune venum nu sanda poda, annaiku na unna pathututhan venumnu dum adichen nu sonna ni kadupaita😅 athuku aprom unna convince pann atry panna ana ni agala but ni atha late ah marenta.
        uruku porathuku mothanal gril sapda ponom apa than 1st time un kuda kai oda kai kothu nadanthathu👫🤭☺🥰
        ni kuda kanavu kandanu sonna🤣.
        nextday ellarum uruku ponom tamil new year ku.
        apa than usha unna pakanumnu sonna so kupdu pona.
        athu vara ni ennaiya pathukuda avalo shy agi na pathathu illa ana usha va pathu romba shy ana🤭 enma unnaiya enna ponnu pakava vantha nu ketathuku, apdithananu sonna😂
        anga road la kuda nadakurapa namma kai kothututhan nadanthom👫
        ana apa enaku theriyala athuku aprom ni mariduvanu😥
        ithuvara nadantha ellame kanavu mari pochi
        tue morning cmb vanthon unnathan bus la clg vanthon apa kuda venum na kaiya pudichuka nu than sonna. ana annaiku mathiyam fc la ennaiya nambave nambatha nu sollutu poi ta annaikuthan 15 april na onaku propose panni crt ah one month. 
        athukuthan gift pannalamnu antha clip vangitu vanthen crt ah evening 5.51 ku kudukalam nu ana ni apadi sollitu poita.
        athuku prom enaku enna sollanumnnu kuda theriyala. apadiye vera mari pesa start pannita annaiku ni8 ph pannapa kuda ni puthusa pesuna enaku alugaiye vanthutu kastama poitu. seri ini pesa vendam paka vendamnu nanachen ana ennala apdi irruka mudiyala athan interval la pesalanalum parava illa atleast pakavathu seilame vanthen.
        annaiku evening ni eh vanthu pesuna ana namma eppaium pola illa. elakiya sonna ni v2 ella thana sati aagum nu. anniku evening eh ni call panna.
        call panni enaku kadupa irruku ellathaium thuku potu odaikalam pola irruku sonna.
        ennala cmb la thaiya irruntha oru mari irrukumnuthan na uruke pona.
        annaiku ni8 ph pannapathan soldra enaku ella feel um koranjutu nu enaku onnum puriyala😥
        atha accept pannika mudiyala. en na ivalonal nalla peuna ni apa apdi illa😢, onake oru nambika irrunthu, asaium irrunthu en kuda irrukanumnu.
        athunalathan na enga appa convince oanniduven ni enna panna poranu ennaiya keta. apa nanachen kandipa iva nammala  vittu poga matanu. ana ippa enna nelavaramne enaku theriyala
        onaku ennaiya pudikuma pudikathanu kuda enaku ippa theriyala ana oru nnambika pudikama poidathunu.
        (22.04.2025) aprom nanum clg vanthen unnaiya pakanum nu nanachen athan kalaila room vittu kelamburama sollu na varenu.
        ni sonna late aaidum parava illaiya nu nanum orunal late ana onnum illa sollu ni sollu na varen nu sonna. aporm illa na cls pola yarum valla so nanum vallanu sonna.
        seri ok nu sonna, athuku artham ok ni paru na clg poranu, ana ni poriya nu oru vartha keta😅 athuku aprom eppaddi poga mudium.
        seri eppadiyathu ivala inniku pathudanumnu than ni engaiuachum velila poriya nanum varen nu sonna. nium prozone poranu sonna.
        seri kalaila poi attendance ah potutu mathiyam lunch la vallamnu pathen patha lunch ku aramani neram munnadiye ni kelambita😅. nanum arun umm sapdakuda illa.
        ellu ennaiku kauuthuna eli puluka ethuku kauuthunu theriyatha mari arun aium sapda vdala😂. aprom ni movie book panni irrukanu sonna athe movie ku nanum book panne.
        en nalla nerama ennanu theriyala un pakathulaiye vanthu ukanthuten🤣. unmaiya sollanum na na padatha pakala unnaiyathan pathutu ukanthu irrunthen😍.
        apa ni sonna enga v2la intercast marriage othuka matanganu, enaku unmaiya puriyala en iva ippadi pesuranu nanacututhan. inthan apa apadium pesuna ippa nithan ippadium pesura en ennachi onaku theliva sollu nu keka poithan,
        athu onaku ennava convey anuchunu theriyala. ni8 oru mari kadupa iirunthuthunu sonna ni seri iru call pandranu sonna. nium panna na sonna ennanu theriyala actual ah na innuku santhosamathan irrukanum
        ana ennanu theriyala oru mari kadupa irruku nu sonna. apa odane ippa enna en pakathula ukanthathula ippa enna achu nu orumari kovama kadupa pesuna😢.
        mudivathana sollanum enaku vendam nu ni solita, vedama illa ippa vendamanu ketathuku vendamnu solita😓. enaku enna pandrathune theriyala orumari alugaiya vanthuthu annaiku aramachathu.
        nextday harsha un kitta ketu irrupa pola ana athu enku thriyathu. 23.04.2025 anaiku ni fc la velila harsha kuda nipesitu irrukurapa kuda unnaiya pakanum pesanum than asa, ana vendam nu sonnathuku aprom eppadi porathunu theriyama vittuten.
        RNG hall la ukanthu irrukurapa niey msg panna apa  kuda avoid pannalamnu than nanachen ana mudiyala😓,
        evening pesalam nu sonna seri nu nanum vanthen nium vantha onaku therium na varuthathulathan irrukanu analum ni sirichutudan vantha, apa nanachen namba mattum than unmaiya irrnthu irrukom polanu.
        ni apa pesunathum seri aduthanal ph la pesunathum seri, sathiyama soldren enaku satisfaction illa. apailernthu ni pesurathaium korachuta pakurathaium korachuta sollapona ni enna kandukakuda illa😭.
        onaku en vali purinjuthanu theruyala ana ennala itha poi ellaru kittaium poi polamba mudiyala. athu nala than oru clearense eh illa ma marupadium marupadium unkittaiye vanthu vanthu polambuna.
        seri oru rendunal vitta ok aaidum nu kandukama irruka try panna nium annaiku( 25.04.2025) fc la vanthu pesuna ana intha harsha thai***ly ni en poi pesura ippadilam poi pesathanu solli vachutan🤦‍♂️. yaruda ithalam unnaiya panna sonnathunu nanachutu, aduthu enna pandrathunu yosichutu irrunthen.
        annaiku ni8 onaku call panna  apa na oru mudivula irrunthen. ivaluku nammala pudikala antha feel moment mattum than pudichi irrukum pola seri vittudalam nu nanachen.
        athan un kittaium sonna apathan ni sonna illa unna pudikalanulam illa enaku hari kitta vantha feel un kitta vanthuthu ithuku munnadi vera yaru melaium athu valla nnu sonna. athoda unnaiya miss panna na varutha paduventhan num sonna.
        annaikuthan than 1st time kudichen athuku nium oru karanam. enakum saraku vangi kudunu vera keta. kudichutum na ookittathan vanthu polambitu irrunthen😅😅. unmaiya solanumna na bothailalam pesala na thelivathan pesuna ana kudichathuku aprom pesa oru thairiyam vanthuthu. pesuna ellame enaku nabagam irruku ni usha va love panna sonnathu, hari thirupi vantha avanuku ok solliduvanu sonnathu, ennaiya pudikalanu sonnathu,
        anish ku kudukura time kuda enaku ippalam thara matanu sonnathu, en en kuda pesa matra ennaiya pudikalaiyanu kethathu, ini kudika matanu promise pannathu ellame enaku nabagam irruku😅.
        ana apa enna sonnana onaku yarukudaium pesapudikala nu ph ah pottutu engaiyachum thaniya poidalam nu irrukunu sonna, but next day patha  ni anish kitta ellarukittaium nallathan pesitu irruka onaku en kitta pesa mattum than pudikala athan oru mari romva kastamaitu.
        athan manasu kekama atha vex la poi enga amma ta poi ellathaium solliten enga amma intha age la ellam varathuthan athum illama onaku raguthesa so ippadithan nadakum nu sollitu irrunthuthu😅
        athuku aprom orunal(28.4.2025) uruku  poranu sonna na unna, olungapathu olungapesi romba nal ana mari irrunthu so athan ni pota athe trainla nanum ticket poten(1.5.2025).
        unnaiya pakanum un kuda pesanumnu time spend pannanum nu. nakuda ni patha odane evan enga vanthan nu monja suzhipiyonu pathen nalla vela pannala😅.
        nalla than pesitu vanthom apa kuda ni keta "aiyoo onaku eppadida ennaiya pudichuthunu", ennaiya love panna 3 reason sollunu sonna nanum sonna 1.unnaiya enaku pudikum 2.ni ennaiya mari illa 3.aprom un charecter.
        aprom ennaku no solla oru reason sollunu na un kitta keten literal okitta enaku no solla reason eh illa. apa ni beatroot chaparthi uutivittala athuku aprom than enaku sapda pudikama irruntha problem eh thinthuthu😅. athuku aprom na olunga sapda aramachiten. en na gym body venumla🤣.
        train la vara pa reel pathutu hariya nanachutu aluga aramachita, un kannu thanniya pathona enaku enna pannanum nu theriyala athan un kannatha thatti kuduthu alathanu sonna nium azhala.
        kandipa antha train journy ya na maraka maten🚄.
        unnaiya vittutu bus la erunathuku aprom ethana ph call ethana msg enga poitu irruka enna pandra ethathu saptiya....
        bus la poi tu irrukurapa keta na alugurapa ni en apadi react pannanu, un thought enna hariya nanachutu aluranala na un mela kova paduvanu.  ana illa enaku apo kovam lam valla. apa na un kitta sonna enaku ippathan kojam clear ah irruku. na ini ni8ni8 feel panna porathu illa. ethana varsham analum parava illa wait pandranu sonna.
        (3.5.2025) ippa na nambbitu irruken onaku enna pudikum nu ana ennaiya kalyanam pannika ni ok solluviyanu theriya, enaku therium ippa onaku antha thought illanu irrunthalum solla mata. ana ni pesurathalam onaku na vendam ndra mari than perusa no sollathan reason theditu irruka.
        athu mattum enaku konjma bayama irruku enga onake ennaiya pudikama poidumonu😓. enaku onnaiya ekaranatha konnum vda thonala, enaku ni venum avalothan🥺.
        thavala tan vayala kedum nu soldra mari (3.5.2025) sathiyam pannathaium miri kudichiten, kudichutu onaku enna ennamo msg panni vachi irruken😅. aprom therinjuthu thappu pannitomnu, ini en kitta pesatha ithan na un kitte pesurathu last nu sollita. enaku manase kekala.
        nextday(4.5.2025) enaku unnaiy eppadi convince pandrathunu kuda theriyala. ana atha vitutu na lusu pun** mari maripadium un kitta vanthu athe kathaiya aramachiten, late ahthan purinjuthu namma en ippa ippadi pannitu irrukomnu.
        aprom than puriuuthu oru time kudichathula evalo  peachananu, athu ku aprom kanipa kudikave kudathunu mudivu panniten. second chance keta ni tharave illa🥺 namba maten nu sollita. but ok  ni8 konjam nallathan pesuna. pesitu irrukurapo harsha ku odambu sari illanu vimal jothiku ponom.
        ni8 fulla anga than irrnthom. next day(5.5.25) kalialani coimbatore vantha insta la msg panni irruntha 6 kulam room ku vanten nu nanum ok nu solliten. motha nal ni8 hospital ponaven apathan kalaila 7 maniku vanthu patuthen.
        oru 8.20 kalam kelambi time pakalam nu ph ah patha ni msg panni vachi irruka "idiot nee inume en kitta pesatha nu" enaku onnum puriyala en ippa iva samanthame illamma ippadi soldranu. en ippadi soldranu keta na un kitta pesuna pesite irruken athan nu sonna. ippa ennadi prachana onaku nu ketathu ku en kovama pesuranu keta. aprim soldra illa enaku unna pudichudumonu bayama irrukunu soldra🤦‍♂️. seri ippa pudicha ennanu ketathuku onnum ila nu sollita,
        seri ippa enna na okitta pesa kudathu athana nu na unna block panniten. ni call panna na edukala whatsapp la msg panna na pakala. mothom 8 sorry 1 manichuko pa ph la 2 sorry😅. aprom enake manasu kekala over ah than pandrom polanu evening vanthu "konjam over ah than panniten sorry" nu keta ni onnum vendam nu soldra, enna vendam nu keta ethume than nu soldra. ni enkitta kalaila irrunthu evening varathan kenjunirrupa, ana athuku aprom next day (6.5.25) ni8 vara na un kitta kenjutu irrunthen😅.
        konjamathu erakam kamichiya ni, (6.5.25) fc la vanthu kaiya pudichu kenjuna, aprom cls porapavum pinnadi eh vanthu kenjuna. ana enaku therium apa un kitta apadi kenjunathu unakau nalla irrunthunu😂. ipadilam na yaru kittaium kenjunathe illanu sonnathukku "venumna kenju sonna😂". 5.5.25 ni8 la lam kevalama kekura, na un mela kovama irrunthalum un call ah atten pandran la eppaiyachum atten panna ma poi irrukane, kalaila irrunthu ethana time call panna eduthiya ni ennamo periya mairu mari pora. ni ippave ippadi pandra na aprom la ni vittutu poiduvanu sonna.
        avlo rosam na varatha apadieh poi nu thituna, but onnu sollanum na apa ni thitunathu enaku nalla irrunthuthu😅. next day 6.5.25 um insta la kenjuna. apa than ni anish kuda ukanthu irruntha avan un ph la reel pathutu irrukura pa en msg ah pathutu en ivan intha theme vachi irrukan change pannunu sonna. nium change pannita, ana enaku therium atha niya pannala yaro etho sollithan panni irrukenu. en change pannanu keta summa nu soldra. ana enaku ni change pannapai eh therium yaru solli panni irrupanu. ana enaku oru kandu avan sonna ni en mathanum nu. avan avanoda theme  ah thana pakanum na enna vachi irruntha avanuku enna?🤷🏻‍♂️
        athan na  sonna "ini avan sonna ivan sonnanu en kitta ethum vanthu pannitu irrukatha, aprom na oo kitta ketutu irrukamatanu😅" ana unmaiya tha sonna. ipa itha na update pandrapa date (7.5.25 ) update pannitu irrukurapaiya call panna vannu keta 10 min ku aprom sonna papom panndriya illaiyanu. parava illa pannita ana ph charge illa nu sollita our 30 min pesuna avalothan. (8.5.25) 12.44 ku idio nu msg panni irruntha ennada ithu namma than onnume panna laiye aprom en ippadi kudura nu enma ennachi na enna panna nu ketathuku illa ni onnum pannala chumma dhan kupten nu sonna aprom illa etho solla vantehn ana marenten nu sonna innuvareikum enaku theriyala ni en apa kuptanu.
        evening call panen pesitu irrukurapo "ippa daily pesiye aganuma nu kete" enma enna chi na than entha topic um edukalaiye aprom pesuna enna nu kekathuku,
        illa na love pannama daily pesuna nallava irrukum kekura🙄. daily call pannathanu solita🥺. en love ku ok sonna mattum than daily pesanuma🤷🏻‍♂️. enaku okitta pesama irruka mudium ana en atha panna matrana na pannalana  nium panna mata aprom pesavum matom antha distance athigam aaidumo nu bayanthututhan un kitta pesuratha koraika enaku bayama irruku😓. namma pesunalum ppesalanalum na mara porathu illannu enaku therium ana ni eppadi nu enaku theriyala athan
        seri ok avaluku athan venumna panna vendam nu vittuten. next day (9.5.2025) friday seri ni kovil pova nammalum pona pakalam nu nanachuthu nanum gokulum 5.20 kulam kovil ku poi ukantom😅. ana en neram ni annaiku valla😢. aai ana annaikuthan na kovil poi samy komtu patta adicutu ukanthu irrunthen theriuuma😂. annaiku ni8 na en frds lam padathuku ponom anga turky icecream vangunatha story poten. ennada story nu ni8 1.08 ku msg panna, ennada iva 11 ku thungura alu 1.08 ku msg panni irrukale nu keta, turff ponom rrace course ponum nu oru tea kadaila tea kuduchutu video eduthu anupuna, na kuda athu NST bakes nu nenachu ni8 2.45 ku vanthu patha kada mudi irrunthuthu, aprom than sodra enna kadanu theriyala na gandhupurathula irrukanu.
        (10.05.2025) kalaila niey ph panna enaku aachiriyam ennada ivale call panndranu😅. yosichutu konjam late ah atten panniten athuku en ph ah eduka avalonerama nu keta😂. niey call pannona oru shock uh athan atten panna time aaitu.`;

  // Split the text into paragraphs
  const paragraphs = fullText.split('\n').filter(p => p.trim() !== '');
  
  // How many paragraphs to show initially
  const initialChunkSize = 10; // Adjust this number based on your content
  let currentChunk = 0;
  
  const contentElement = document.getElementById('loveLetterContent');
  const readMoreBtn = document.getElementById('readMoreBtn');
  
  function displayNextChunk() {
    const start = currentChunk * initialChunkSize;
    const end = start + initialChunkSize;
    const chunkToShow = paragraphs.slice(start, end);
    
    chunkToShow.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      contentElement.appendChild(p);
    });
    
    currentChunk++;
    
    // Hide button if we've shown all paragraphs
    if (end >= paragraphs.length) {
      readMoreBtn.style.display = 'none';
    }
  }
  
  // Initial display
  displayNextChunk();
  
  // Read more button click handler
  readMoreBtn.addEventListener('click', function() {
    displayNextChunk();
    
    // Scroll to the bottom of the new content
    contentElement.scrollTop = contentElement.scrollHeight;
  });
});
