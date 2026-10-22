/* ==========================================================================
   i18n.js - Arabic / English language switching for Pawsy

   HOW IT WORKS
   1. Every piece of text that must change language has a data-i18n="key"
      attribute in index.html (placeholders / alt / aria-label use
      data-i18n-placeholder, data-i18n-alt and data-i18n-aria-label).
      The English text stays written in the HTML exactly as before.
   2. The Arabic text for each key lives in the "ar" dictionary below.
      When Arabic is selected, the page swaps each element to its Arabic text.
      When English is selected, the original English is put back.
   3. Text that script.js creates (pet cards, result count, modal text) uses
      i18n.t("key") and i18n.tp("English text") so it follows the language too.
   4. The chosen language is saved in localStorage ("pawsy-language") and
      applied again on every page load. English is the default.
   5. <html lang> and <html dir> are updated (ar/rtl or en/ltr). The extra
      right-to-left styles are in CSS/rtl.css.

   TO ADD OR EDIT A TRANSLATION: change the Arabic text next to its key below.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "pawsy-language";
  var DEFAULT_LANGUAGE = "en";
  var LANGUAGES = ["en", "ar"];

  /* ------------------------------------------------------------------------
     ARABIC TEXT  (the line starting with // shows the English original)
     ------------------------------------------------------------------------ */
  var ar = {
    /* ---- Navbar ---- */
    // Home
    "nav.home": "الرئيسية",
    // Find a pet
    "nav.find": "ابحث عن حيوان أليف",
    // Pet care
    "nav.care": "رعاية الحيوانات",
    // About us
    "nav.about": "من نحن",
    // Adopt a friend
    "nav.adopt": "تبنَّ صديقًا",
    // aria-label="Toggle navigation"
    "nav.toggle": "تبديل قائمة التنقل",
    // English
    "lang.en": "الإنجليزية",
    // Arabic
    "lang.ar": "العربية",

    /* ---- Hero ---- */
    // Little paws. Big possibilities.
    "hero.eyebrow": "كفوف صغيرة. فرص كبيرة.",
    // Give Them a Home Full of <span class="text-love">Love.</span>
    "hero.title": "امنحهم بيتًا مليئًا <span class=\"text-love\">بالحب.</span>",
    // Sometimes, all it takes is a little love to change a life.<br> Find your forever friend and start a beautiful new chapter.
    "hero.lead": "أحيانًا، لا يلزم سوى قليل من الحب لتغيير حياة.<br>ابحث عن صديقك الأبدي وابدأ فصلًا جديدًا جميلًا.",
    // Find your best friend
    "hero.cta1": "اعثر على أفضل صديق لك",
    // Explore pet care
    "hero.cta2": "استكشف رعاية الحيوانات",
    // Little paws. Big hearts.
    "hero.caption1": "كفوف صغيرة. قلوب كبيرة.",
    // A student project with a purpose.
    "hero.caption2": "مشروع طلابي له هدف.",
    // alt="Golden retriever"
    "hero.altDog": "كلب جولدن ريتريفر",
    // alt="Orange cat"
    "hero.altCat": "قطة برتقالية",
    // Ready for a forever home
    "hero.dogLabel": "جاهز لبيت دائم",
    // A little love.<br>A whole new life.
    "hero.loveCard": "قليل من الحب.<br>حياة جديدة بالكامل.",
    // A match that matters
    "hero.f1.title": "اختيار مناسب يصنع فرقًا",
    // Find a companion who fits your life.
    "hero.f1.text": "اعثر على رفيق يناسب حياتك.",
    // Care comes first
    "hero.f2.title": "الرعاية أولًا",
    // Learn about each pet before taking the next step.
    "hero.f2.text": "تعرّف على كل حيوان قبل اتخاذ الخطوة التالية.",
    // Support for the journey
    "hero.f3.title": "دعم طوال الرحلة",
    // Helpful guidance, from first hello to home.
    "hero.f3.text": "إرشاد مفيد، من أول لقاء حتى الوصول إلى البيت.",

    /* ---- Pets list and filters ---- */
    // Meet your new best friend.
    "pets.title": "تعرّف على صديقك المفضّل الجديد.",
    // Big hearts, little paws, and a whole lot of love to give.
    "pets.subtitle": "قلوب كبيرة، كفوف صغيرة، وكثير من الحب لنمنحه.",
    // Find your friend
    "find.friend": "اعثر على صديقك",
    // aria-label="Close filters"
    "filters.closeLabel": "إغلاق التصفية",
    // Search Pets
    "filters.search": "ابحث عن حيوان",
    // placeholder="Name or breed"
    "filters.searchPlaceholder": "الاسم أو السلالة",
    // Animal Type
    "filters.type": "نوع الحيوان",
    // All Animals
    "filters.allAnimals": "كل الحيوانات",
    // Dogs
    "pet.dogs": "كلاب",
    // Cats
    "pet.cats": "قطط",
    // Rabbits
    "pet.rabbits": "أرانب",
    // Hamsters
    "pet.hamsters": "هامستر",
    // Age
    "filters.age": "العمر",
    // All Ages
    "filters.allAges": "كل الأعمار",
    // Baby: under 1 year
    "filters.baby": "صغير جدًا: أقل من سنة",
    // Young: 1–2 years
    "filters.young": "يافع: 1–2 سنة",
    // Adult: 3–6 years
    "filters.adult": "بالغ: 3–6 سنوات",
    // Senior: 7 years and older
    "filters.senior": "كبير في السن: 7 سنوات فأكثر",
    // Size
    "filters.size": "الحجم",
    // All Sizes
    "filters.allSizes": "كل الأحجام",
    // Small
    "filters.small": "صغير",
    // Medium
    "filters.medium": "متوسط",
    // Large
    "filters.large": "كبير",
    // Fur Color
    "filters.color": "لون الفرو",
    // All Colors
    "filters.allColors": "كل الألوان",
    // White
    "filters.white": "أبيض",
    // Black
    "filters.black": "أسود",
    // Brown
    "filters.brown": "بني",
    // Gray
    "filters.gray": "رمادي",
    // Orange
    "filters.orange": "برتقالي",
    // Golden
    "filters.golden": "ذهبي",
    // Clear Filters
    "filters.clear": "مسح عوامل التصفية",
    // Filters
    "filters.open": "التصفية",

    /* ---- Pet details modal ---- */
    // aria-label="Close"
    "common.close": "إغلاق",
    // <div class="small-label"><span></span> MEET YOUR POTENTIAL BEST FRIEND</div>
    "modal.petLabel": "<span></span> قابل أفضل صديق محتمل لك",
    // Illustrative profile only. A real shelter would confirm health, behavior, and suitability before adoption.
    "modal.demoNote": "ملف توضيحي فقط. في أي ملجأ حقيقي سيتم التأكد من الحالة الصحية والسلوك ومدى الملاءمة قبل التبنّي.",
    // Apply for
    "modal.apply": "تقدّم لتبنّي",

    /* ---- Pet care section ---- */
    // Love goes beyond adoption
    "care.label": "الحب يتجاوز التبنّي",
    // Happy pets. Happy humans.
    "care.title": "حيوانات سعيدة. بشر سعداء.",
    // A little extra care for the ones who make life a little better.
    "care.subtitle": "قليل من العناية الإضافية لمن يجعلون الحياة أجمل.",
    // Pet Health & Wellness
    "care.health.title": "صحة الحيوانات الأليفة وعافيتها",
    // Healthy pets start with small, steady habits. A few daily checks and regular vet visits help you notice problems early.
    "care.health.text": "تبدأ صحة الحيوانات الأليفة بعادات صغيرة ومنتظمة. بضع فحوصات يومية وزيارات منتظمة للطبيب البيطري تساعدك على اكتشاف المشكلات مبكرًا.",
    // Routine veterinary checkups
    "care.health.b1": "فحوصات بيطرية دورية",
    // Vaccinations matched to your pet's needs
    "care.health.b2": "تطعيمات تناسب احتياجات حيوانك الأليف",
    // Watch for changes in appetite or behavior
    "care.health.b3": "راقب أي تغيّر في الشهية أو السلوك",
    // Fresh water and suitable food
    "care.health.b4": "مياه نظيفة وطعام مناسب",
    // Learn more
    "care.learnMore": "اعرف المزيد",
    // Grooming & Hygiene
    "care.groom.title": "العناية بالمظهر والنظافة",
    // Grooming keeps pets comfortable and lets you spot skin, coat or nail problems early. Every species needs a different routine.
    "care.groom.text": "العناية بالمظهر تُبقي الحيوانات مرتاحة وتتيح لك ملاحظة مشكلات الجلد أو الفرو أو الأظافر مبكرًا. لكل نوع روتين مختلف.",
    // Brush fur regularly
    "care.groom.b1": "امشّط الفرو بانتظام",
    // Keep nails at a healthy length
    "care.groom.b2": "حافظ على طول صحي للأظافر",
    // Clean gently and safely
    "care.groom.b3": "نظّف بلطف وأمان",
    // Use only pet-safe products
    "care.groom.b4": "استخدم منتجات آمنة للحيوانات فقط",
    // Boarding & Daycare
    "care.board.title": "الإقامة والرعاية النهارية",
    // Planning ahead makes time away easier for you and your pet. Learn how to prepare and what to look for in a safe facility.
    "care.board.text": "التخطيط المسبق يجعل فترة غيابك أسهل عليك وعلى حيوانك الأليف. تعرّف على كيفية الاستعداد وما الذي يجب البحث عنه في مكان آمن.",
    // Prepare your pet before temporary care
    "care.board.b1": "جهّز حيوانك قبل الرعاية المؤقتة",
    // Check cleanliness and supervision
    "care.board.b2": "تحقق من النظافة والإشراف",
    // Share feeding and emergency details
    "care.board.b3": "شارك تفاصيل التغذية والطوارئ",
    // Reduce stress with familiar items
    "care.board.b4": "قلّل التوتر بأغراض مألوفة",

    /* ---- Care guide modals (shared) ---- */
    // Quick guide
    "guide.quick": "دليل سريع",
    // Good to remember
    "guide.remember": "من المفيد أن تتذكر",
    // Close
    "guide.close": "إغلاق",

    /* ---- Health & Wellness modal ---- */
    // Good health is built day by day. Use these tips as a starting point for everyday care.
    "health.desc": "تُبنى الصحة الجيدة يومًا بعد يوم. استخدم هذه النصائح كنقطة انطلاق للعناية اليومية.",
    // Everyday health habits
    "health.h1": "عادات صحية يومية",
    // A regular visit lets a vet check weight, teeth, skin, and heart, and catch small issues before they grow.
    "health.c1.desc": "تتيح الزيارة المنتظمة للطبيب البيطري فحص الوزن والأسنان والجلد والقلب، واكتشاف المشكلات الصغيرة قبل أن تكبر.",
    // Notice changes early
    "health.c2.title": "لاحظ التغيّرات مبكرًا",
    // Eating less, drinking much more, hiding, unusual tiredness, or changes in droppings are worth a call to your vet.
    "health.c2.desc": "قلة الأكل، أو الإكثار من شرب الماء، أو الاختباء، أو التعب غير المعتاد، أو تغيّر الفضلات، كلها أمور تستحق الاتصال بطبيبك البيطري.",
    // Food that fits your pet
    "health.c3.title": "طعام يناسب حيوانك",
    // Choose food made for your pet's species and life stage, measure portions, and avoid sudden diet changes.
    "health.c3.desc": "اختر طعامًا مخصصًا لنوع حيوانك ومرحلته العمرية، وقِس الكميات، وتجنب تغيير النظام الغذائي فجأة.",
    // Vaccinations & parasite control
    "health.c4.title": "التطعيمات ومكافحة الطفيليات",
    // Needs differ by species, age, and lifestyle. Dogs and cats usually follow a vaccine schedule, while rabbits and hamsters have different needs.
    "health.c4.desc": "تختلف الاحتياجات باختلاف النوع والعمر ونمط الحياة. تتبع الكلاب والقطط عادةً جدول تطعيمات، بينما للأرانب والهامستر احتياجات مختلفة.",
    // Fresh water, every day
    "health.c5.title": "مياه نظيفة كل يوم",
    // Refill bowls or bottles daily and wash them often so water is always clean and easy to reach.
    "health.c5.desc": "املأ الأوعية أو الزجاجات يوميًا واغسلها باستمرار ليكون الماء نظيفًا وفي المتناول دائمًا.",
    // Movement and play
    "health.c6.title": "الحركة واللعب",
    // Daily exercise and enrichment, like walks, toys, tunnels, or a wheel, support both body and mind.
    "health.c6.desc": "التمارين اليومية والأنشطة المحفّزة، مثل المشي والألعاب والأنفاق أو العجلة، تدعم الجسم والعقل معًا.",
    // Small steps, a big new chapter. Consistent care builds a long, happy life together.
    "health.note": "خطوات صغيرة، وفصل جديد كبير. العناية المستمرة تبني حياة طويلة وسعيدة معًا.",

    /* ---- Grooming & Hygiene modal ---- */
    // Short, calm and regular sessions work best. Go slowly, reward your pet, and stop if they are stressed.
    "groom.desc": "الجلسات القصيرة والهادئة والمنتظمة هي الأفضل. تمهّل، وكافئ حيوانك، وتوقف إذا شعر بالتوتر.",
    // The basics
    "groom.h1": "الأساسيات",
    // Brushing
    "groom.c1.title": "التمشيط",
    // Brushing removes loose hair and tangles and spreads natural oils. Use a brush that suits the coat, and be gentle around the belly and legs.
    "groom.c1.desc": "يزيل التمشيط الشعر المتساقط والتشابكات ويوزّع الزيوت الطبيعية. استخدم فرشاة تناسب نوع الفرو، وكن لطيفًا حول البطن والساقين.",
    // Nail care
    "groom.c2.title": "العناية بالأظافر",
    // Trim only the tip with pet nail clippers and avoid the pink area that contains blood vessels. If you are unsure, ask a vet or groomer to show you.
    "groom.c2.desc": "قصّ الطرف فقط بمقص أظافر مخصص للحيوانات وتجنب المنطقة الوردية التي تحتوي على أوعية دموية. إذا لم تكن متأكدًا، اطلب من الطبيب البيطري أو المختص بالعناية أن يريك الطريقة.",
    // Cleaning safely
    "groom.c3.title": "التنظيف الآمن",
    // Wipe eyes, ears and paws gently with a soft damp cloth. Never push anything into the ear canal, and do not use human products.
    "groom.c3.desc": "امسح العينين والأذنين والكفوف برفق بقطعة قماش ناعمة مبللة. لا تُدخل أي شيء في قناة الأذن، ولا تستخدم منتجات البشر.",
    // Pet-safe products
    "groom.c4.title": "منتجات آمنة للحيوانات",
    // Choose shampoos and tools made for your species. Some human soaps, essential oils and flea products for dogs are harmful to cats and small pets.
    "groom.c4.desc": "اختر شامبو وأدوات مصممة لنوع حيوانك. بعض صابون البشر والزيوت العطرية ومنتجات مكافحة البراغيث الخاصة بالكلاب ضارة بالقطط والحيوانات الصغيرة.",
    // Needs differ by species
    "groom.h2": "تختلف الاحتياجات حسب النوع",
    // Brushing from weekly to daily depending on coat. Occasional baths with dog shampoo, plus regular nail and ear checks.
    "groom.dogs": "تمشيط يتراوح بين أسبوعي ويومي حسب نوع الفرو. استحمام من حين لآخر بشامبو الكلاب، مع فحص منتظم للأظافر والأذنين.",
    // Cats groom themselves, but brushing reduces hairballs, especially for long coats. Most cats rarely need baths.
    "groom.cats": "تنظّف القطط نفسها بنفسها، لكن التمشيط يقلل كرات الشعر، خاصةً للفرو الطويل. معظم القطط نادرًا ما تحتاج إلى استحمام.",
    // Brush gently, more often while shedding. Avoid water baths because they can cause shock and stress, and ask a vet about nails and teeth.
    "groom.rabbits": "امشّط برفق، وبشكل أكثر تكرارًا أثناء موسم تساقط الفرو. تجنّب الاستحمام بالماء لأنه قد يسبب صدمة وتوترًا، واسأل الطبيب البيطري عن الأظافر والأسنان.",
    // Hamsters keep themselves clean and should not be bathed in water. Offer a small dish of chinchilla sand and spot-clean the cage.
    "groom.hamsters": "تحافظ الهامستر على نظافتها بنفسها ولا يجوز استحمامها بالماء. وفّر وعاءً صغيرًا من رمل الشنشيلا ونظّف القفص موضعيًا.",
    // Stop and contact a vet if you find wounds, lumps, sore skin, parasites, bleeding nails or if your pet seems in pain. Never use scissors near the skin of a wriggling pet.
    "groom.note": "توقف واتصل بالطبيب البيطري إذا وجدت جروحًا أو كتلًا أو جلدًا ملتهبًا أو طفيليات أو أظافر تنزف، أو إذا بدا أن حيوانك يتألم. لا تستخدم المقص أبدًا قرب جلد حيوان يتلوّى.",

    /* ---- Boarding & Daycare modal ---- */
    // Whether it is a day out or a week away, these steps help you choose carefully and prepare well.
    "board.desc": "سواء كنت غائبًا ليوم أو لأسبوع، تساعدك هذه الخطوات على الاختيار بعناية والاستعداد جيدًا.",
    // Pawsy currently offers educational information only. We do not provide bookings, and we do not list or verify any boarding or daycare facilities.
    "board.warning": "تقدّم Pawsy حاليًا معلومات تعليمية فقط. نحن لا نوفّر خدمة الحجز، ولا نعرض أو نتحقق من أي منشآت للإقامة أو الرعاية النهارية.",
    // Preparing your pet
    "board.h1": "تجهيز حيوانك الأليف",
    // Check health and records
    "board.c1.title": "تحقق من الصحة والسجلات",
    // Make sure vaccinations and parasite treatments are up to date, and bring any medication with clear written dosing.
    "board.c1.desc": "تأكد من أن التطعيمات وعلاجات الطفيليات محدّثة، وأحضر أي أدوية مع جرعات مكتوبة بوضوح.",
    // Written feeding instructions
    "board.c2.title": "تعليمات التغذية المكتوبة",
    // List food type, portions, times, treats and allergies. Bring the usual food to avoid stomach upsets.
    "board.c2.desc": "دوّن نوع الطعام والكميات والمواعيد والمكافآت والحساسية. أحضر الطعام المعتاد لتجنب اضطرابات المعدة.",
    // Emergency contacts
    "board.c3.title": "جهات اتصال الطوارئ",
    // Leave your phone number, a backup contact who can be reached, and your vet's details.
    "board.c3.desc": "اترك رقم هاتفك، وجهة اتصال بديلة يمكن الوصول إليها، وبيانات طبيبك البيطري.",
    // Reduce stress
    "board.c4.title": "قلّل التوتر",
    // Pack a familiar blanket or toy, keep goodbyes calm, and try a short trial stay first so the place feels less new.
    "board.c4.desc": "أحضر بطانية أو لعبة مألوفة، واجعل الوداع هادئًا، وجرّب إقامة قصيرة أولًا ليبدو المكان أقل غرابة.",
    // Evaluating a facility
    "board.h2": "تقييم المنشأة",
    // Cleanliness
    "board.c5.title": "النظافة",
    // Areas should look and smell clean, with fresh water, waste removed and a clear cleaning routine.
    "board.c5.desc": "يجب أن تبدو الأماكن وتفوح منها رائحة النظافة، مع توفر ماء نظيف وإزالة الفضلات وروتين تنظيف واضح.",
    // Supervision
    "board.c6.title": "الإشراف",
    // Ask how many animals each staff member watches, whether play groups are supervised, and what happens overnight.
    "board.c6.desc": "اسأل عن عدد الحيوانات التي يشرف عليها كل موظف، وهل مجموعات اللعب تحت الإشراف، وماذا يحدث أثناء الليل.",
    // Appropriate housing
    "board.c7.title": "سكن مناسب",
    // Space should fit the species: separate areas for cats, dogs and small animals, safe fencing, shade, and secure cages for rabbits and hamsters.
    "board.c7.desc": "يجب أن تناسب المساحة نوع الحيوان: أماكن منفصلة للقطط والكلاب والحيوانات الصغيرة، وسياج آمن، وظل، وأقفاص محكمة للأرانب والهامستر.",
    // Emergency plan
    "board.c8.title": "خطة الطوارئ",
    // A good facility can explain how it handles illness or injury and which vet it works with.
    "board.c8.desc": "المنشأة الجيدة تستطيع أن تشرح كيف تتعامل مع المرض أو الإصابة وأي طبيب بيطري تتعاون معه.",
    // Visit in person when possible, ask questions, and trust your instincts. If anything feels unsafe, choose another option.
    "board.note": "قم بالزيارة شخصيًا متى أمكن، واطرح الأسئلة، وثق بحدسك. إذا شعرت بأي شيء غير آمن، فاختر خيارًا آخر.",

    /* ---- Adoption steps ---- */
    // SMALL STEPS. A BIG NEW CHAPTER.
    "steps.label": "خطوات صغيرة. فصل جديد كبير.",
    // A forever home starts with hello.
    "steps.title": "البيت الدائم يبدأ بكلمة مرحبًا.",
    // A thoughtful journey, made a little simpler.
    "steps.subtitle": "رحلة مدروسة، أصبحت أبسط قليلًا.",
    // Explore the profiles and get to know a pet who speaks to your heart.
    "steps.s1.text": "تصفّح الملفات وتعرّف على حيوان أليف يخاطب قلبك.",
    // Tell us about you
    "steps.s2.title": "حدّثنا عن نفسك",
    // Complete the demo application with your home and care plans.
    "steps.s2.text": "أكمل طلب التبنّي التجريبي بمعلومات عن منزلك وخططك للرعاية.",
    // Meet & connect
    "steps.s3.title": "التقِ وتواصل",
    // In a real adoption, a shelter would arrange a visit and check your match.
    "steps.s3.text": "في حالة التبنّي الحقيقي، سيرتّب الملجأ زيارة ويتحقق من مدى توافقكما.",
    // Welcome them home
    "steps.s4.title": "رحّب بهم في بيتك",
    // Prepare a safe space, build a routine, and start your friendship grow.
    "steps.s4.text": "جهّز مكانًا آمنًا، وابنِ روتينًا، وانطلق في بناء صداقتكما.",

    /* ---- About section ---- */
    // alt="Dog and Cat Cuddling"
    "about.alt": "كلب وقطة يتعانقان",
    // BIG HEARTS BEHIND LITTLE PAWS
    "about.label": "قلوب كبيرة خلف كفوف صغيرة",
    // Every pet deserves a place to belong.
    "about.title": "كل حيوان أليف يستحق مكانًا ينتمي إليه.",
    // Pawsy is built around a simple belief: caring for an animal begins with understanding them. We bring adoption inspiration and practical care guidance together in one welcoming place.
    "about.p1": "تقوم Pawsy على فكرة بسيطة: العناية بالحيوان تبدأ بفهمه. نجمع بين إلهام التبنّي وإرشادات الرعاية العملية في مكان واحد مرحِّب.",
    // Created by a university team of five, this front-end portfolio project celebrates responsible adoption. All profiles are illustrative; Pawsy is not a shelter or a live adoption service.
    "about.p2": "أنشأه فريق جامعي من خمسة أعضاء، ويحتفي مشروع الواجهة الأمامية هذا بالتبنّي المسؤول. جميع الملفات توضيحية، ولا تُعَدّ Pawsy ملجأً ولا خدمة تبنٍّ فعلية.",
    // Get to know the journey &rarr;
    "about.link": "تعرّف على الرحلة ←",

    /* ---- Call-to-action banner ---- */
    // A FOREVER FRIEND IS WAITING
    "cta.label": "صديق دائم في انتظارك",
    // Open your heart.<br>Change their whole world.
    "cta.title": "افتح قلبك.<br>وغيّر عالمهم بالكامل.",
    // You don't have to be perfect. Just ready to love. Give a pet a second chance, and find a friend for life.
    "cta.text": "لا يجب أن تكون مثاليًا. فقط كن مستعدًا للحب. امنح حيوانًا أليفًا فرصة ثانية، واكسب صديقًا مدى الحياة.",
    // Let's find your friend &rarr;
    "cta.button": "هيا نجد صديقك ←",
    // Adopt love. Make a difference.
    "cta.small": "تبنَّ الحب. وأحدث فرقًا.",

    /* ---- Adoption form ---- */
    // YOUR FIRST HELLO
    "form.label": "أول مرحبًا منك",
    // A little about you.<br> A big step for them.
    "form.title": "قليل عنك.<br>وخطوة كبيرة من أجلهم.",
    // Ready to imagine life with your new best friend? Tell us about yourself and the home you could offer.
    "form.intro": "هل أنت مستعد لتخيّل الحياة مع أفضل أصدقائك الجدد؟ أخبرنا عن نفسك والبيت الذي يمكنك تقديمه.",
    // A safe, demo-only experience
    "form.demoTitle": "تجربة آمنة للعرض فقط",
    // No application is sent or stored. Please use fictional details; this is a student portfolio, not a real adoption service.
    "form.demoText": "لا يتم إرسال أي طلب ولا تخزينه. يُرجى استخدام بيانات وهمية؛ فهذا ملف أعمال طلابي وليس خدمة تبنٍّ حقيقية.",
    // Full name
    "form.fullName": "الاسم الكامل",
    // Please enter your full name.
    "form.fullNameError": "يرجى إدخال اسمك الكامل.",
    // Email address
    "form.email": "البريد الإلكتروني",
    // Please enter a valid email address.
    "form.emailError": "يرجى إدخال بريد إلكتروني صحيح.",
    // Phone number
    "form.phone": "رقم الهاتف",
    // Please enter a valid phone number.
    "form.phoneError": "يرجى إدخال رقم هاتف صحيح.",
    // Your potential friend
    "form.pet": "صديقك المحتمل",
    // Choose a pet
    "form.choosePet": "اختر حيوانًا أليفًا",
    // Milo - Golden Retriever
    "form.optMilo": "Milo - جولدن ريتريفر",
    // Luna - Domestic Short Hair
    "form.optLuna": "Luna - شعر قصير منزلي",
    // Coco - Mini Lop Rabbit
    "form.optCoco": "Coco - أرنب ميني لوب",
    // Biscuit - Syrian Hamster
    "form.optBiscuit": "Biscuit - هامستر سوري",
    // Please select a pet.
    "form.petError": "يرجى اختيار حيوان أليف.",
    // Tell us about their future home
    "form.home": "أخبرنا عن بيتهم المستقبلي",
    // placeholder="Your space, daily routine, and experience with pets..."
    "form.homePlaceholder": "مساحتك، وروتينك اليومي، وخبرتك مع الحيوانات الأليفة...",
    // Please provide some details about your home.
    "form.homeError": "يرجى تقديم بعض التفاصيل عن منزلك.",
    // I understand that pet adoption is a long-term commitment and this form is a demo only.
    "form.checkbox": "أدرك أن تبنّي حيوان أليف التزام طويل الأمد وأن هذا النموذج للعرض التجريبي فقط.",
    // You must agree before submitting.
    "form.checkboxError": "يجب أن توافق قبل الإرسال.",
    // Submit demo application &rarr;
    "form.submit": "إرسال الطلب التجريبي ←",
    // Nothing is sent. Your information stays on this page.
    "form.note": "لا يتم إرسال أي شيء. تبقى معلوماتك على هذه الصفحة.",

    /* ---- Success modal ---- */
    // Application Received!
    "success.title": "تم استلام الطلب!",
    // Thank you for exploring the demo. In a real platform, the team would get back to you shortly!
    "success.text": "شكرًا لاستكشافك النسخة التجريبية. في منصة حقيقية، كان الفريق سيتواصل معك قريبًا!",
    // Close Demo
    "success.close": "إغلاق العرض",

    /* ---- Footer ---- */
    // Connecting little paws with big hearts. Because every pet deserves a place to belong.
    "footer.tagline": "نربط الكفوف الصغيرة بالقلوب الكبيرة. لأن كل حيوان أليف يستحق مكانًا ينتمي إليه.",
    // Pets for adoption
    "footer.adopt": "حيوانات للتبنّي",
    // Our adoption promise
    "footer.promise": "وعدنا في التبنّي",
    // A little extra care
    "footer.care": "قليل من العناية الإضافية",
    // Pet care services
    "footer.services": "خدمات رعاية الحيوانات",
    // Get in touch
    "footer.contact": "تواصل معنا",
    // Made for the love of pets.
    "footer.made": "صُنع بحب الحيوانات الأليفة.",
    // A student portfolio concept.
    "footer.concept": "فكرة ملف أعمال طلابي.",
    // © 2026 Pawsy. All paws welcome. 💚
    "footer.copy": "© 2026 Pawsy. جميع الكفوف مرحَّب بها. 💚",
    // More love. More wagging tails. ✨
    "footer.wag": "حب أكثر. وذيول تهتز فرحًا أكثر. ✨",

    /* ---- Strings created by JavaScript ---- */
    // Language
    "lang.label": "اللغة",
    // Save {name} to favorites
    "pet.save": "أضف {name} إلى المفضلة",
    // Remove {name} from favorites
    "pet.remove": "أزل {name} من المفضلة",
    // {name}, a {type}
    "pet.alt": "{name}، {type}",
    // Looking for a home
    "pet.badge": "يبحث عن بيت",
    // View Details
    "pet.viewDetails": "عرض التفاصيل",
    // View details for {name}
    "pet.viewFor": "عرض تفاصيل {name}",
    // No pets found. Try changing your filters.
    "pet.empty": "لم يتم العثور على حيوانات. جرّب تغيير عوامل التصفية.",
    // Submitting...
    "form.submitting": "جارٍ الإرسال...",
  };

  /* ------------------------------------------------------------------------
     ENGLISH TEXT - only for strings that JavaScript builds itself.
     (Text written in index.html is read from the page, so it is not repeated.)
     ------------------------------------------------------------------------ */
  var en = {
    "lang.label": "Language",
    "pet.save": "Save {name} to favorites",
    "pet.remove": "Remove {name} from favorites",
    "pet.alt": "{name}, a {type}",
    "pet.badge": "Looking for a home",
    "pet.viewDetails": "View Details",
    "pet.viewFor": "View details for {name}",
    "pet.empty": "No pets found. Try changing your filters.",
    "form.submitting": "Submitting...",
    "filters.clear": "Clear Filters",
  };

  /* ------------------------------------------------------------------------
     PET DATA (from script.js): English text -> Arabic text.
     Pet names (Milo, Luna ...) and the brand name Pawsy are kept as they are.
     ------------------------------------------------------------------------ */
  var petData = {
    /* ---- Breed / type ---- */
    "Golden Retriever": "جولدن ريتريفر",
    "Domestic Shorthair": "شعر قصير منزلي",
    "Mini Lop Rabbit": "أرنب ميني لوب",
    "Labrador Mix": "خليط لابرادور",
    "Tabby Cat": "قط مخطط (تابي)",
    "Domestic Rabbit": "أرنب منزلي",
    "French Bulldog": "بولدوج فرنسي",
    "Small Mixed Breed": "سلالة مختلطة صغيرة",
    "Mixed Breed": "سلالة مختلطة",
    "Domestic Longhair": "شعر طويل منزلي",
    "Syrian Hamster": "هامستر سوري",
    "Roborovski Hamster": "هامستر روبوروفسكي",

    /* ---- Age ---- */
    "1 year": "سنة واحدة",
    "2 years": "سنتان",
    "3 years": "3 سنوات",
    "4 years": "4 سنوات",
    "7 years": "7 سنوات",
    "8 years": "8 سنوات",
    "4 months": "4 أشهر",
    "5 months": "5 أشهر",
    "6 months": "6 أشهر",
    "7 months": "7 أشهر",
    "8 months": "8 أشهر",
    "9 months": "9 أشهر",
    "10 months": "10 أشهر",
    "18 months": "18 شهرًا",

    /* ---- Sex ---- */
    "Male": "ذكر",
    "Female": "أنثى",

    /* ---- Size ---- */
    "Small": "صغير",
    "Medium": "متوسط",
    "Large": "كبير",

    /* ---- Fur color ---- */
    "Golden": "ذهبي",
    "Orange & White": "برتقالي وأبيض",
    "White": "أبيض",
    "Brown": "بني",
    "Black & White": "أسود وأبيض",
    "Brown & White": "بني وأبيض",
    "Gray": "رمادي",
    "Sandy": "رملي",

    /* ---- Short taglines ---- */
    "A little ball of sunshine": "كرة صغيرة من أشعة الشمس",
    "Your new cuddle buddy": "رفيق أحضانك الجديد",
    "Small paws, big personality": "كفوف صغيرة، وشخصية كبيرة",
    "Your loyal walking partner": "رفيق مشيك الوفي",
    "A gentle soul with curious whiskers": "روح لطيفة بشوارب فضولية",
    "A little hopper with a big heart": "قافزة صغيرة بقلب كبير",
    "A cheerful little shadow": "ظل صغير مبهج",
    "Always ready for company": "جاهز دائمًا للصحبة",
    "Gentle walks, warmer welcomes": "نزهات هادئة، واستقبال أدفأ",
    "A playful ray of sunshine": "شعاع شمس مرح",
    "Soft paws, softer purrs": "كفوف ناعمة، وخرخرة أنعم",
    "Your quiet afternoon companion": "رفيق عصرك الهادئ",
    "A curious little nose": "أنف صغير فضولي",
    "A gentle little daydreamer": "حالمة صغيرة ولطيفة",
    "A golden little night owl": "بومة ليل صغيرة ذهبية",
    "Little paws, busy evenings": "كفوف صغيرة، وأمسيات مزدحمة",
    "A tiny cloud with whiskers": "سحابة صغيرة بشوارب",
    "Small steps, grand adventures": "خطوات صغيرة، ومغامرات كبيرة",

    /* ---- Descriptions ---- */
    "Milo is playful, affectionate, and happiest on a long walk. An active household with time for daily exercise would be his perfect match.": "Milo مرح وحنون، وأسعد لحظاته في المشي الطويل. الأسرة النشيطة التي تملك وقتًا للتمارين اليومية هي الأنسب له تمامًا.",
    "Luna loves sunny windows and quiet afternoons. She would thrive in a calm indoor home with a cozy lap and gentle playtime.": "Luna تحب النوافذ المشمسة والعصاري الهادئة. ستزدهر في منزل داخلي هادئ فيه حضن دافئ ولعب لطيف.",
    "Coco is curious and gentle. He needs a safe indoor enclosure, space to hop, fresh hay, and a patient family.": "Coco فضولي ولطيف. يحتاج إلى حظيرة داخلية آمنة، ومساحة للقفز، وتبن طازج، وأسرة صبورة.",
    "Bella is an enthusiastic companion who enjoys exploring and learning. She needs daily walks, consistent training, and plenty of company.": "Bella رفيقة متحمسة تستمتع بالاستكشاف والتعلّم. تحتاج إلى نزهات يومية وتدريب منتظم وكثير من الصحبة.",
    "Oliver enjoys toys, scratching posts, and watching the world from a window. A secure indoor home will help him settle in.": "Oliver يستمتع بالألعاب وأعمدة الخدش ومراقبة العالم من النافذة. سيساعده منزل داخلي آمن على الاستقرار.",
    "Daisy is a sweet rabbit who appreciates gentle handling. She needs rabbit-safe indoor space, daily enrichment, and a hay-based diet.": "Daisy أرنبة لطيفة تقدّر التعامل الرفيق. تحتاج إلى مساحة داخلية آمنة للأرانب، وأنشطة محفّزة يوميًا، ونظام غذائي قائم على التبن.",
    "Archie is a cheerful companion who likes short sniffing walks and puzzle toys. He needs gentle exercise and protection from heat.": "Archie رفيق مرح يحب النزهات القصيرة للتشمّم وألعاب الألغاز. يحتاج إلى تمارين خفيفة وحماية من الحرارة.",
    "Teddy enjoys relaxed walks and being near his people. Patient reward-based training helps him feel confident.": "Teddy يستمتع بالنزهات الهادئة والبقاء قرب أحبّته. التدريب الصبور القائم على المكافآت يساعده على اكتساب الثقة.",
    "Ruby is a mellow older companion who enjoys leisurely strolls. A peaceful home and regular veterinary care suit her best.": "Ruby رفيقة أكبر سنًا وهادئة الطباع تستمتع بالتمشية على مهل. يناسبها أكثر منزل هادئ ورعاية بيطرية منتظمة.",
    "Poppy enjoys wand toys and sunny perches. She needs a secure indoor home and plenty of kitten-safe play.": "Poppy تستمتع بألعاب العصا والأماكن المشمسة المرتفعة. تحتاج إلى منزل داخلي آمن وكثير من اللعب المناسب للقطط الصغيرة.",
    "Jasper is a relaxed window watcher who appreciates gentle brushing. He settles best with a predictable indoor routine.": "Jasper هادئ يحب مراقبة النافذة ويقدّر التمشيط اللطيف. يستقر أكثر مع روتين داخلي منتظم ومتوقَّع.",
    "Hazel enjoys a peaceful nap beside her people. A calm home with comfortable resting places is her ideal match.": "Hazel تستمتع بقيلولة هادئة بجوار أحبّتها. المنزل الهادئ ذو أماكن الراحة المريحة هو الأنسب لها.",
    "Pepper loves exploring cardboard tunnels. He needs daily floor time, unlimited hay, and rabbit-safe things to chew.": "Pepper يحب استكشاف أنفاق الكرتون. يحتاج إلى وقت يومي للحركة على الأرض، وتبن غير محدود، وأشياء آمنة للأرانب ليمضغها.",
    "Snowdrop is a cautious young rabbit who warms up with floor-level company. She needs a roomy enclosure and patient care.": "Snowdrop أرنبة صغيرة حذرة تتآلف مع من يجلس معها على مستوى الأرض. تحتاج إلى حظيرة واسعة ورعاية صبورة.",
    "Biscuit is an inquisitive evening forager. This solitary hamster needs his own spacious enclosure, deep bedding, and a suitable solid wheel.": "Biscuit فضولي يبحث عن طعامه مساءً. هذا الهامستر الانفرادي يحتاج إلى قفص واسع خاص به، وفرشة عميقة، وعجلة صلبة مناسبة.",
    "Pip enjoys searching for scattered food after dusk. He needs his own secure, enriching enclosure and slow, patient introductions to handling.": "Pip يستمتع بالبحث عن الطعام المبعثر بعد الغروب. يحتاج إلى قفص آمن ومحفّز خاص به، وتعريف تدريجي صبور بالتعامل معه.",
    "Mochi likes burrowing and exploring sheltered tunnels. Give her deep bedding, a sand bath, and quiet daytime rest in her own enclosure.": "Mochi تحب الحفر واستكشاف الأنفاق المحمية. وفّر لها فرشة عميقة وحمّام رمل وراحة هادئة نهارًا في قفصها الخاص.",
    "Nibbles is a curious evening explorer who likes food puzzles. He must live alone with ample floor space and safe chew toys.": "Nibbles مستكشف فضولي في المساء يحب ألغاز الطعام. يجب أن يعيش وحده مع مساحة أرضية واسعة وألعاب مضغ آمنة.",
  };

  /* ------------------------------------------------------------------------
     Reading / saving the language
     ------------------------------------------------------------------------ */
  function loadLanguage() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (LANGUAGES.indexOf(saved) !== -1) {
        return saved;
      }
    } catch (error) {
      /* localStorage can be blocked (private mode) - just use the default */
    }
    return DEFAULT_LANGUAGE;
  }

  function saveLanguage(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      /* ignore - the language still changes for this visit */
    }
  }

  var currentLanguage = loadLanguage();

  /* Set lang + dir immediately (this file is loaded in <head>), so an Arabic
     visitor never sees the page laid out left-to-right first. */
  function setDocumentDirection(lang) {
    var root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }
  setDocumentDirection(currentLanguage);

  /* ------------------------------------------------------------------------
     Translation helpers used by script.js and adoption.js
     ------------------------------------------------------------------------ */

  /* t("pet.save", { name: "Milo" })  ->  text for the current language */
  function t(key, values) {
    var text;
    if (currentLanguage === "ar" && ar[key] !== undefined) {
      text = ar[key];
    } else if (en[key] !== undefined) {
      text = en[key];
    } else {
      text = key;
    }
    if (values) {
      for (var name in values) {
        text = text.split("{" + name + "}").join(values[name]);
      }
    }
    return text;
  }

  /* tp("Golden Retriever")  ->  Arabic when Arabic is selected, else unchanged */
  function tp(englishText) {
    if (currentLanguage === "ar" && petData[englishText] !== undefined) {
      return petData[englishText];
    }
    return englishText;
  }

  /* "5 friends waiting to meet you ..." (Arabic needs different word forms) */
  function countText(n) {
    if (currentLanguage !== "ar") {
      return n + (n === 1 ? " friend" : " friends") + " waiting to meet you \u00b7 Illustrative adoption profiles";
    }
    var who;
    var verb = "\u064a\u0646\u062a\u0638\u0631\u0648\u0646";                 /* ينتظرون */
    if (n === 1) {
      who = "\u0635\u062f\u064a\u0642 \u0648\u0627\u062d\u062f";               /* صديق واحد */
      verb = "\u064a\u0646\u062a\u0638\u0631";                                  /* ينتظر */
    } else if (n === 2) {
      who = "\u0635\u062f\u064a\u0642\u0627\u0646";                             /* صديقان */
      verb = "\u064a\u0646\u062a\u0638\u0631\u0627\u0646";                      /* ينتظران */
    } else if (n >= 3 && n <= 10 || n === 0) {
      who = n + " \u0623\u0635\u062f\u0642\u0627\u0621";                        /* أصدقاء */
    } else {
      who = n + " \u0635\u062f\u064a\u0642\u064b\u0627";                        /* صديقًا */
    }
    return who + " " + verb + " \u0644\u0642\u0627\u0621\u0643 \u00b7 \u0645\u0644\u0641\u0627\u062a \u062a\u0628\u0646\u0651\u064d \u062a\u0648\u0636\u064a\u062d\u064a\u0629";
  }

  /* "Show 5 pets" button inside the mobile filter panel */
  function showText(n) {
    if (currentLanguage !== "ar") {
      return "Show " + n + (n === 1 ? " pet" : " pets");
    }
    if (n === 1) {
      return "\u0639\u0631\u0636 \u062d\u064a\u0648\u0627\u0646 \u0623\u0644\u064a\u0641 \u0648\u0627\u062d\u062f";               /* عرض حيوان أليف واحد */
    }
    if (n === 2) {
      return "\u0639\u0631\u0636 \u062d\u064a\u0648\u0627\u0646\u064a\u0646 \u0623\u0644\u064a\u0641\u064a\u0646";               /* عرض حيوانين أليفين */
    }
    if (n >= 11) {
      return "\u0639\u0631\u0636 " + n + " \u062d\u064a\u0648\u0627\u0646\u064b\u0627 \u0623\u0644\u064a\u0641\u064b\u0627";    /* عرض N حيوانًا أليفًا */
    }
    return "\u0639\u0631\u0636 " + n + " \u062d\u064a\u0648\u0627\u0646\u0627\u062a \u0623\u0644\u064a\u0641\u0629";            /* عرض N حيوانات أليفة */
  }

  /* ------------------------------------------------------------------------
     Translating the static HTML
     ------------------------------------------------------------------------ */
  var originalHtml = new WeakMap();       /* element -> its original English innerHTML */
  var originalAttributes = new WeakMap(); /* element -> { attributeName: original value } */
  var TRANSLATED_ATTRIBUTES = ["placeholder", "alt", "aria-label", "title"];

  function translatePage() {
    var lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (!originalHtml.has(el)) {
        originalHtml.set(el, el.innerHTML);
      }
      var key = el.getAttribute("data-i18n");
      var wanted = lang === "ar" && ar[key] !== undefined ? ar[key] : originalHtml.get(el);
      if (el.innerHTML !== wanted) {
        el.innerHTML = wanted;
      }
    });

    TRANSLATED_ATTRIBUTES.forEach(function (attr) {
      document.querySelectorAll("[data-i18n-" + attr + "]").forEach(function (el) {
        var saved = originalAttributes.get(el) || {};
        if (!(attr in saved)) {
          saved[attr] = el.getAttribute(attr) || "";
          originalAttributes.set(el, saved);
        }
        var key = el.getAttribute("data-i18n-" + attr);
        el.setAttribute(attr, lang === "ar" && ar[key] !== undefined ? ar[key] : saved[attr]);
      });
    });

    var select = document.getElementById("languageSelect");
    if (select && select.value !== lang) {
      select.value = lang;
    }
  }

  /* ------------------------------------------------------------------------
     Switching language
     ------------------------------------------------------------------------ */
  function setLanguage(lang) {
    if (LANGUAGES.indexOf(lang) === -1) {
      return;
    }
    currentLanguage = lang;
    saveLanguage(lang);
    setDocumentDirection(lang);
    translatePage();

    /* Re-draw the pet cards (they are created by script.js) so they follow the
       new language. filterPets() keeps the current search and filters. */
    if (typeof window.filterPets === "function") {
      window.filterPets();
    }
  }

  var started = false;
  function init() {
    if (started) {
      return;
    }
    started = true;

    translatePage();

    var select = document.getElementById("languageSelect");
    if (select) {
      select.addEventListener("change", function () {
        setLanguage(select.value);
      });
    }
  }

  /* init() is also called by a small script at the end of <body> (to avoid a
     flash of English). This is a safety net in case that call is removed. */
  document.addEventListener("DOMContentLoaded", init);

  window.i18n = {
    init: init,
    t: t,
    tp: tp,
    countText: countText,
    showText: showText,
    setLanguage: setLanguage,
    getLanguage: function () { return currentLanguage; },
    translatePage: translatePage
  };
})();
