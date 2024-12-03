const userCardsContainer = document.querySelector('.user-cards__grid-container');
let data;

async function init() {
  data = await fetch('https://dummyjson.com/users').then(res => res.json());
  render(data.users);
}

function render(users){
  userCardsContainer.innerHTML = '';
  for (const user of users) {
    userCardsContainer.innerHTML += `
      <div class="user-cards__grid-item" data-age="${user.age}">
        <div class="user-cards__grid-item__wrapper">
          <img src="${user.image}">
          <div class="user-info">
            <p class="name"><span>${user.firstName}</span><span>${user.lastName}</span></p>
            <p class="username">@${user.username}</p>
          </div>
        </div>
        <div class="contact">
          <h3>Contact</h3>
          <p class="email"><span><i class="fa-regular fa-envelope"></i> Email: </span> ${user.email}</p>
          <p class="phone-number"><span><i class="fa-solid fa-phone"></i> Phone: </span> ${user.phone}</p>
          <p class="address"><span><i class="fa-solid fa-location-dot"></i> Adress: </span> ${user.address.address} ${user.address.city} / ${user.address.state}</p>
          <p class="company-name"><span><i class="fa-regular fa-building"></i> Company: </span> ${user.company.name} / ${user.company.department}</p>
        </div>
      </div>
    `
  }
  sperateAges();
}

function sperateAges(){
  const userCards = document.querySelectorAll('.user-cards__grid-item');
  for (const userCard of userCards) {
    const userAge = Number(userCard.dataset.age);
    if(userAge > 18 && userAge <= 25){
      userCard.classList.add('young');
    } else if(userAge > 25 && userAge <= 40){
      userCard.classList.add('middle-aged');
    } else if(userAge > 40){
      userCard.classList.add('old');
    }
  }
}

function filterUsers(){
  const inputValue = searchInput.value.toLowerCase().trim();
  const searchedUser = data.users.filter(user => user.firstName.toLowerCase().includes(inputValue) || user.lastName.toLowerCase().includes(inputValue));
  render(searchedUser);
}

init();
searchInput.addEventListener('input', filterUsers);