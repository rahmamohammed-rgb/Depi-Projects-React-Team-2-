const moonBtn = document.getElementById("moon");
const html = document.documentElement;

moonBtn.addEventListener("click", function () {
  if (html.getAttribute("data-bs-theme") === "light") {
    html.setAttribute("data-bs-theme", "dark");
  } else {
    html.setAttribute("data-bs-theme", "light");
  }
});


const pets = [
  { id: "milo", name: "Milo", category: "Dogs", type: "Golden Retriever", age: "2 years", ageMonths: 24, sex: "Male", size: "Large", color: "Golden", colors: ["Golden"], image: "dog-milo.webp", tag: "A little ball of sunshine", description: "Milo is playful, affectionate, and happiest on a long walk. An active household with time for daily exercise would be his perfect match." },
  { id: "luna", name: "Luna", category: "Cats", type: "Domestic Shorthair", age: "1 year", ageMonths: 12, sex: "Female", size: "Medium", color: "Orange & White", colors: ["Orange", "White"], image: "cat-luna.webp", tag: "Your new cuddle buddy", description: "Luna loves sunny windows and quiet afternoons. She would thrive in a calm indoor home with a cozy lap and gentle playtime." },
  { id: "coco", name: "Coco", category: "Rabbits", type: "Mini Lop Rabbit", age: "8 months", ageMonths: 8, sex: "Male", size: "Small", color: "White", colors: ["White"], image: "rabbit-coco.webp", tag: "Small paws, big personality", description: "Coco is curious and gentle. He needs a safe indoor enclosure, space to hop, fresh hay, and a patient family." },
  { id: "bella", name: "Bella", category: "Dogs", type: "Labrador Mix", age: "3 years", ageMonths: 36, sex: "Female", size: "Large", color: "Brown", colors: ["Brown"], image: "dog-bella.webp", tag: "Your loyal walking partner", description: "Bella is an enthusiastic companion who enjoys exploring and learning. She needs daily walks, consistent training, and plenty of company." },
  { id: "oliver", name: "Oliver", category: "Cats", type: "Tabby Cat", age: "2 years", ageMonths: 24, sex: "Male", size: "Medium", color: "Black & White", colors: ["Black", "White"], image: "cat-oliver.webp", tag: "A gentle soul with curious whiskers", description: "Oliver enjoys toys, scratching posts, and watching the world from a window. A secure indoor home will help him settle in." },
  { id: "daisy", name: "Daisy", category: "Rabbits", type: "Domestic Rabbit", age: "1 year", ageMonths: 12, sex: "Female", size: "Medium", color: "Brown & White", colors: ["Brown", "White"], image: "rabbit-daisy.webp", tag: "A little hopper with a big heart", description: "Daisy is a sweet rabbit who appreciates gentle handling. She needs rabbit-safe indoor space, daily enrichment, and a hay-based diet." },
  { id: "archie", name: "Archie", category: "Dogs", type: "French Bulldog", age: "10 months", ageMonths: 10, sex: "Male", size: "Small", color: "Brown", colors: ["Brown"], image: "dog-archie.webp", tag: "A cheerful little shadow", description: "Archie is a cheerful companion who likes short sniffing walks and puzzle toys. He needs gentle exercise and protection from heat." },
  { id: "teddy", name: "Teddy", category: "Dogs", type: "Small Mixed Breed", age: "4 years", ageMonths: 48, sex: "Male", size: "Small", color: "Brown", colors: ["Brown"], image: "dog-teddy.webp", tag: "Always ready for company", description: "Teddy enjoys relaxed walks and being near his people. Patient reward-based training helps him feel confident." },
  { id: "ruby", name: "Ruby", category: "Dogs", type: "Mixed Breed", age: "7 years", ageMonths: 84, sex: "Female", size: "Medium", color: "Brown", colors: ["Brown"], image: "dog-ruby.webp", tag: "Gentle walks, warmer welcomes", description: "Ruby is a mellow older companion who enjoys leisurely strolls. A peaceful home and regular veterinary care suit her best." },
  { id: "poppy", name: "Poppy", category: "Cats", type: "Domestic Shorthair", age: "8 months", ageMonths: 8, sex: "Female", size: "Small", color: "Orange & White", colors: ["Orange", "White"], image: "cat-poppy.webp", tag: "A playful ray of sunshine", description: "Poppy enjoys wand toys and sunny perches. She needs a secure indoor home and plenty of kitten-safe play." },
  { id: "jasper", name: "Jasper", category: "Cats", type: "Domestic Longhair", age: "4 years", ageMonths: 48, sex: "Male", size: "Large", color: "Brown & White", colors: ["Brown", "White"], image: "cat-jasper.webp", tag: "Soft paws, softer purrs", description: "Jasper is a relaxed window watcher who appreciates gentle brushing. He settles best with a predictable indoor routine." },
  { id: "hazel", name: "Hazel", category: "Cats", type: "Domestic Shorthair", age: "8 years", ageMonths: 96, sex: "Female", size: "Medium", color: "Gray", colors: ["Gray"], image: "cat-hazel.webp", tag: "Your quiet afternoon companion", description: "Hazel enjoys a peaceful nap beside her people. A calm home with comfortable resting places is her ideal match." },
  { id: "pepper", name: "Pepper", category: "Rabbits", type: "Domestic Rabbit", age: "18 months", ageMonths: 18, sex: "Male", size: "Small", color: "Gray", colors: ["Gray"], image: "rabbit-pepper.webp", tag: "A curious little nose", description: "Pepper loves exploring cardboard tunnels. He needs daily floor time, unlimited hay, and rabbit-safe things to chew." },
  { id: "snowdrop", name: "Snowdrop", category: "Rabbits", type: "Domestic Rabbit", age: "6 months", ageMonths: 6, sex: "Female", size: "Medium", color: "White", colors: ["White"], image: "rabbit-snowdrop.webp", tag: "A gentle little daydreamer", description: "Snowdrop is a cautious young rabbit who warms up with floor-level company. She needs a roomy enclosure and patient care." },
  { id: "biscuit", name: "Biscuit", category: "Hamsters", type: "Syrian Hamster", age: "5 months", ageMonths: 5, sex: "Male", size: "Small", color: "Golden", colors: ["Golden"], image: "hamster-biscuit.webp", tag: "A golden little night owl", description: "Biscuit is an inquisitive evening forager. This solitary hamster needs his own spacious enclosure, deep bedding, and a suitable solid wheel." },
  { id: "pip", name: "Pip", category: "Hamsters", type: "Roborovski Hamster", age: "4 months", ageMonths: 4, sex: "Male", size: "Small", color: "Sandy", colors: ["Brown"], image: "hamster-pip.webp", tag: "Little paws, busy evenings", description: "Pip enjoys searching for scattered food after dusk. He needs his own secure, enriching enclosure and slow, patient introductions to handling." },
  { id: "mochi", name: "Mochi", category: "Hamsters", type: "Syrian Hamster", age: "7 months", ageMonths: 7, sex: "Female", size: "Small", color: "White", colors: ["White"], image: "hamster-mochi.webp", tag: "A tiny cloud with whiskers", description: "Mochi likes burrowing and exploring sheltered tunnels. Give her deep bedding, a sand bath, and quiet daytime rest in her own enclosure." },
  { id: "nibbles", name: "Nibbles", category: "Hamsters", type: "Roborovski Hamster", age: "9 months", ageMonths: 9, sex: "Male", size: "Small", color: "Sandy", colors: ["Brown"], image: "hamster-nibbles.webp", tag: "Small steps, grand adventures", description: "Nibbles is a curious evening explorer who likes food puzzles. He must live alone with ample floor space and safe chew toys." },
];


const cards = document.querySelector("#pet-cards");
const countText = document.querySelector("#result-count");
const showBtn = document.querySelector("#show-pets");

const searchBox = document.querySelector("#pet-search");
const animalSelect = document.querySelector("#pet-category");
const ageSelect = document.querySelector("#pet-age");
const sizeSelect = document.querySelector("#pet-size");
const colorSelect = document.querySelector("#pet-color");
const clearBtn = document.querySelector("#clear-filters");

const modalImg = document.querySelector("#petModalImg");
const modalTitle = document.querySelector("#petModalTitle");
const modalMeta = document.querySelector("#petModalMeta");
const modalText = document.querySelector("#petModalText");
const applyName = document.querySelector("#applyName");


let favorites = [];


const heartIcon = '<svg class="heart-icon" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>';

const arrowIcon = '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';


function showPets(list) {
  let html = "";

  for (let i = 0; i < list.length; i++) {
    let pet = list[i];

    let number = pets.indexOf(pet);

    let saved = favorites.includes(pet.id);
    let savedClass = "";
    let label = i18n.t("pet.save", { name: pet.name });
    if (saved) {
      savedClass = " saved";
      label = i18n.t("pet.remove", { name: pet.name });
    }

    html += '<div class="col-12 col-sm-6 col-xl-4">' +
              '<article class="card pet-card h-100">' +

                '<div class="pet-photo">' +
                  '<img src="images/' + pet.image + '" alt="' + i18n.t("pet.alt", { name: pet.name, type: i18n.tp(pet.type) }) + '" loading="lazy">' +
                  '<span class="pet-badge"><span></span> ' + i18n.t("pet.badge") + '</span>' +

                  '<button type="button" class="favorite' + savedClass + '" onclick="toggleFavorite(' + number + ')" aria-pressed="' + saved + '" aria-label="' + label + '">' + heartIcon + '</button>' +
                '</div>' +

                '<div class="pet-info">' +
                  '<div class="pet-title"><h3>' + pet.name + '</h3><span>' + i18n.tp(pet.sex) + '</span></div>' +
                  '<p class="pet-meta">' + i18n.tp(pet.type) + ' · ' + i18n.tp(pet.age) + '<br>' + i18n.tp(pet.size) + ' · ' + i18n.tp(pet.color) + '</p>' +
                  '<p class="pet-tag">' + i18n.tp(pet.tag) + '</p>' +

                  '<button type="button" class="pet-button" onclick="showDetails(' + number + ')" data-bs-toggle="modal" data-bs-target="#petModal" aria-label="' + i18n.t("pet.viewFor", { name: pet.name }) + '">' + i18n.t("pet.viewDetails") + ' ' + arrowIcon + '</button>' +
                '</div>' +

              '</article>' +
            '</div>';
  }

  if (list.length === 0) {
    html = '<div class="col-12">' +
             '<div class="empty-state">' +
               '<h3>' + i18n.t("pet.empty") + '</h3>' +
               '<button type="button" class="btn btn-primary" onclick="clearFilters()">' + i18n.t("filters.clear") + '</button>' +
             '</div>' +
           '</div>';
  }

  cards.innerHTML = html;

  countText.textContent = i18n.countText(list.length);
  showBtn.textContent = i18n.showText(list.length);
}


function getAgeGroup(months) {
  if (months < 12) {
    return "baby";
  } else if (months < 36) {
    return "young";
  } else if (months < 84) {
    return "adult";
  } else {
    return "senior";
  }
}


function filterPets() {
  const text = searchBox.value.toLowerCase().trim();
  const animal = animalSelect.value;
  const age = ageSelect.value;
  const size = sizeSelect.value;
  const color = colorSelect.value;
  const result = [];

  for (let i = 0; i < pets.length; i++) {
    const pet = pets[i];

    const okSearch = (pet.name + " " + pet.type + " " + i18n.tp(pet.type)).toLowerCase().includes(text);
    const okAnimal = animal === "All Animals" || pet.category === animal;
    const okAge = age === "" || getAgeGroup(pet.ageMonths) === age;
    const okSize = size === "" || pet.size === size;
    const okColor = color === "" || pet.colors.includes(color);

    if (okSearch && okAnimal && okAge && okSize && okColor) {
      result.push(pet);
    }
  }

  showPets(result);
}


function clearFilters() {
  searchBox.value = "";
  animalSelect.value = "All Animals";
  ageSelect.value = "";
  sizeSelect.value = "";
  colorSelect.value = "";
  filterPets();
}


searchBox.addEventListener("input", filterPets);
animalSelect.addEventListener("change", filterPets);
ageSelect.addEventListener("change", filterPets);
sizeSelect.addEventListener("change", filterPets);
colorSelect.addEventListener("change", filterPets);
clearBtn.addEventListener("click", clearFilters);


function toggleFavorite(number) {
  const id = pets[number].id;
  const place = favorites.indexOf(id);

  if (place === -1) {
    favorites.push(id);
  } else {
    favorites.splice(place, 1);
  }

  filterPets();
}


function showDetails(number) {
  const pet = pets[number];

  modalImg.src = "images/" + pet.image;
  modalImg.alt = i18n.t("pet.alt", { name: pet.name, type: i18n.tp(pet.type) });
  modalTitle.textContent = pet.name;
  modalMeta.innerHTML = i18n.tp(pet.type) + " · " + i18n.tp(pet.age) + " · " + i18n.tp(pet.sex) + "<br>" + i18n.tp(pet.size) + " · " + i18n.tp(pet.color);
  modalText.textContent = i18n.tp(pet.description);
  applyName.textContent = pet.name;
}
function goToApply() {
 
  const select = document.querySelector("#");
  if (select) {
    select.value = modalTitle.textContent;
  }

 
  setTimeout(function () {
    const form = document.querySelector("#");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  }, 400);
}

filterPets();



                        

