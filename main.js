const form = document.querySelector("#form"),
	input = document.querySelector("#input"),
	p = document.querySelector("#text"),
	caret = document.querySelector("#caret"),
	restart = document.querySelector("#restart")

let text =
	"is was are be have had were can said use do will would make like has look write go see could been call am find did get come made may take know live give think say help tell follow came want show set put does must ask went read need move try change play spell found study learn should add keep start thought saw turn might close seem open begin got run walk began grow took carry hear stop miss eat watch let cut talk being	leave"
// let text = "lorem ipsum dolor sit amet"
let textArr = text.split(" ")
let i = 0
let caretP = 0
let spans = []

// randomizing array
for (let i = 0; i < textArr.length; i++) {
	let replaced = textArr[i]
	textArr.splice(i, 1)
	let chosen = Math.floor(Math.random() * textArr.length)
	textArr.splice(chosen, 0, replaced)
}

// cursor

// displaying words
for (let j = 0; j < textArr.length; j++) {
	let span = document.createElement("span")
	let nobr = document.createElement("nobr")
	if (j < 1) {
		span.classList.add("word")
	}
	span.classList.add(`word-${j}`, "spanM")

	for (let k = 0; k < textArr[j].length; k++) {
		const letter = document.createElement("letter")
		letter.textContent = textArr[j].charAt(k)
		nobr.append(letter)
	}

	p.append(span)
	span.append(nobr)
	spans.push(span)
}

input.addEventListener("input", (e) => {
	// caret: remove blinking, move
	caret.classList.remove("blink")

	let char = spans[i].firstChild.childNodes[e.target.value.length - 1]
	if (char) {
		console.log(char.offsetWidth)
		if (e.target.value.length == spans[i].firstChild.childNodes.length) {
			caretP += char.offsetWidth + 5
		} else {
			caretP += char.offsetWidth
		}
		caret.style.left = caretP + "px"
	}

	// spell check after each character
	if (e.target.value.length <= textArr[i].length) {
		if (e.target.value == textArr[i].slice(0, e.target.value.length)) {
			spans[i].classList.remove("error")
		} else {
			spans[i].classList.add("error")
		}
	}

	// end test automatically when last word typed correctly
	if (i + 1 == textArr.length) {
		if (e.target.value == textArr[i]) {
			i++
			e.target.value = ""
			spans[i - 1].classList.remove("word")
			spans[i - 1].classList.add("right")
			// restart
			restart.focus()
		}
	}

	// spell check after each word
	if (e.target.value.slice(-1) == " ") {
		if (e.target.value.slice(0, -1) == textArr[i]) {
			spans[i].classList.add("right")
		} else {
			spans[i].classList.add("error")
		}

		i++
		e.target.value = ""
		spans[i - 1].classList.remove("word")
		if (spans[i]) {
			spans[i].classList.add("word")
		}
		// restart
		if (i == textArr.length) {
			restart.focus()
		}
	}
})

// get letter width in pixels
function getLetterWidths(text, font) {
	let canvas = document.createElement("canvas")
	let context = canvas.getContext("2d")
	context.font = font
	let width
	for (let i = 0; i < text.length; i++) {
		let letter = text[i]
		width = context.measureText(letter).width
	}
	return width
}
