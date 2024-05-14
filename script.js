const state = {
  _tense: '',
  _verb: '',
  _time: 9001,
  _points: 0,
  set tense(tense) {
    tense_p = preprocess(tense)
    this._tense = tense_p;
    $("#tense").text(tense_p)
  },
  get tense() {
    return this._tense
  },
  set verb(verb) {
    verb_p = preprocess(verb)
    this._verb = verb_p;
    $("#verb").text(verb_p)
  },
  get verb() {
    return this._verb
  },
  get val() {
    return preprocess($("#input").val())
  },
  set val(val) {
    preprocess(val)
    $("#input").val(val)
  },
  get points() {
    return this._points;
  },
  set points(points) {
    $("#points").text(points)
    this._points = points;
    console.log(this._points)
  },
  get time() {
    return this._time
  },
  set time(time) {
    $("#time").text(time/1000);
    this._time = time;
  },
  set text(tex) {
    $("#feedback").text(tex)
  },
  get text() {
    return $("#feedback").text()
  }
}

$("#input").on("keypress", e => {
  switch (e.which) {
    case 13:
      btnClick()
  }
})

let interval = null;

const preprocess = item => {
  return item.trim().toLowerCase();
}

const tenses = [
  "yo", "tú", "él/ella/usted", "nosotros/nosotras","vosotros/vosotras", "ellos/ellas/ustedes"
]

const conj = {
  "ar": ["o", "as", "a", "amos", "áis", "an"],
  "er": ["o", "es", "e", "emos", "éis", "en"],
  "ir": ["o", "es", "e", "imos", "ís", "en"]
}

function randomTense() {
  const tmp = tenses[Math.floor(Math.random() * tenses.length)];
  if (tmp.includes("/")) {
    return tmp.split("/")[Math.floor(Math.random() * tmp.split("/").length)]
  }
  return tmp
}

function indexTense(tense) {
  if (tenses.indexOf(tense) == -1) {
    for (i in tenses) {
      if (tenses[i].includes("/")) {
        const tmp = tenses[i].split("/")
        if (tmp.indexOf(tense) != -1) {
          return i
        }
      }
    }
  }
  return tenses.indexOf(tense)
}

function intervalFunc() {
  state.time -= 1;
  if (state.time <= 1) {
    clearInterval(interval);
    alert("Time's up, your score was " + state.points);
  }
}

const randomize = () => {
  const verb = verbs[Math.floor(Math.random()*verbs.length)];
  state.tense = randomTense()
  state.verb = verb;
}

function start() {
  state.points = 0;
  state.time = 9001;
  interval = setInterval(intervalFunc, 1);
  state.text = "Type the verb in the correct tense"
  randomize();
}

$("#random").on("click", ()=>{
  state.time -= 500;
  randomize();
})
$("#start").on("click", start)

function btnClick() {
  const tense_i = indexTense(state.tense)
  const suffix = state.verb.slice(-2)
  const base = state.verb.slice(0,-2)
  const correct_conj = base + conj[suffix][tense_i]
  if (state.val == correct_conj) {
    state.points += 1;
    state.time += 2000;
    state.text = "Correct!";
    randomize();
  } else {
    state.text = "Incorrect!";
  }
  state.val = "";
}

$("#btn").on("click", btnClick)
