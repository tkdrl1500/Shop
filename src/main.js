//Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json") //fetch를 이용해서 데이터를 받아온 다음
    .then((response) => response.json()) //받아온 데이터가 성공적이면 json으로 변환
    .then((json) => json.items); // json 안에 있는 items를 리턴해준다.
}

//update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join(""); //문자열의 배열을 한가지의 큰 문자열로, 즉 li들이 반복해서 들어가있는 문자열로 변환 할건데, join이라는 api를 썼다.
}

//create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  console.log(filtered);
  displayItems(filtered);
  // displayItems(items.filter(item => item[key] === value));
  // console.log(event.target.dataset.key);
  // console.log(event.target.dataset.value);
}

function setEventListeners(items) {
  //버튼 클릭 되었을떄 동작 함수
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

//main
loadItems()
  .then((items) => {
    // console.log(items);
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
