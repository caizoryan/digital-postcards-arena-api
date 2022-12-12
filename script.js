//create a variable to hold html data
let htmlcode = "";

// on page load fetch data from arena
fetch("https://api.are.na/v2/channels/digitalpostcards-responses")
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    // once u get data use that as parameters to send to a function to run a loop with each block
    createList(res.contents);
  });

function createList(content) {
  // run a loop for every item in the data and send it to getImage() to fetch a url for images
  for (const x of content) getImage(x);
}

async function getImage(content) {
  fetch(`http://api.are.na/v2/blocks/${content.id}`)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      // once you get the url for image take that and already available content and send to generate code function
      generateCode(content, res.image.thumb.url);
    });
}

async function generateCode(content, img) {
  // this will basically generate the code, add it to htmlcode variable and update it
  let code = `<a href='https://www.are.na/block/${content.id}'><div class='block' onmouseenter='reveal(${content.id})' onmouseleave='unreveal(${content.id})'>${content.title}<img id=${content.id} style='max-width:400px;display:none;' src='${img}'></img></div></a>`;
  htmlcode += code;
  document.querySelector(".list").innerHTML = htmlcode;
}

function reveal(id) {
  //on hover make image visible
  document.getElementById(id).style.display = "block";
}

function unreveal(id) {
  // on exit make image invisible
  document.getElementById(id).style.display = "none";
}
