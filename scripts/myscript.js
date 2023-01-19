const $d = document,
  $resultado = $d.querySelector("#resultado"),
  $copiar = $d.querySelector("#portapapeles"),
  $longitud = $d.querySelector("#longitud"),
  $mayusculas = $d.querySelector("#mayusculas"),
  $minusculas = $d.querySelector("#minusculas"),
  $numeros = $d.querySelector("#numeros"),
  $simbolos = $d.querySelector("#simbolos"),
  $generar = $d.querySelector("#generar")

const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  minusculas = "abcdefghijklmnopqrstuvwxyz",
  numeros = "0123456789",
  simbolos = "!@#$%^&*()_+~`|}{[]:;?><,./-="

function generarContrasena(longitud, opciones) {
  let chars = ""
  opciones.forEach((element) => {
    chars += element
  })

  let size = chars.split("").length
  let contrasena = ""
  while (longitud > 0) {
    contrasena += chars.split("")[Math.floor(Math.random() * size)]
    longitud--
  }

  let criterioCumplido = true
  opciones.forEach((opcion) => {
    let cumple = opcion.split("").some((char) => contrasena.includes(char))
    if (!cumple) criterioCumplido = false
  })

  if (!criterioCumplido) {
    generarContrasena(longitud, opciones)
  } else return contrasena
}

$generar.addEventListener("click", () => {
  let opciones = []
  if ($mayusculas.checked) opciones.push(mayusculas)
  if ($minusculas.checked) opciones.push(minusculas)
  if ($numeros.checked) opciones.push(numeros)
  if ($simbolos.checked) opciones.push(simbolos)
  opciones.length === 0
    ? alert(
        "Debes seleccionar almenos un criterio (mayusculas, minusculas, numeros, simbolos)"
      )
    : ($resultado.textContent = generarContrasena($longitud.value, opciones))
})

$copiar.addEventListener("click", () => {
  navigator.clipboard.writeText($resultado.textContent)
  alert("Contraseña copiada al portapapeles")
})
