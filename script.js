fetch("https://api.are.na/v2/channels/digitalpostcards-responses")
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    createList(res.contents);
  });

let codes = "";

function createList(content) {
  for (const x of content) getImage(x);
  document.querySelector(".list").innerHTML += codes;
}

async function getImage(content) {
  fetch(`http://api.are.na/v2/blocks/${content.id}`)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      generateCode(content, res.image.thumb.url);
    });
}

async function generateCode(content, img) {
  let code = `<a href='https://www.are.na/block/${content.id}'><div class='block' onmouseenter='reveal(${content.id})' onmouseleave='unreveal(${content.id})'>${content.title}<img id=${content.id} style='max-width:400px;display:none;' src='${img}'></img></div></a>`;
  codes += code;
  document.querySelector(".list").innerHTML = codes;
}

function reveal(id) {
  document.getElementById(id).style.display = "block";
}

function unreveal(id) {
  document.getElementById(id).style.display = "none";
}
