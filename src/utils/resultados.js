document.addEventListener('DOMContentLoaded', function() {
  // Obtener el número de participantes de la URL
  var urlParams = new URLSearchParams(window.location.search);
  var participantes = urlParams.get('participantes');

  // Mostrar los ganadores basados en el número de participantes
  mostrarGanadoresAleatorios(participantes);
});

document.addEventListener('DOMContentLoaded', function() {
  const peraWalletAccount = localStorage.getItem('peraWalletAccount');
  if (peraWalletAccount) {
      console.log('Cuenta conectada: ', peraWalletAccount);
      // Aquí puedes utilizar la cuenta conectada en tus lógicas
  }
});



function mostrarGanadoresAleatorios(participantes) {
  var ganadoresDiv = document.getElementById('ganadores');
  var listaParticipantes = [];

  // Crear una lista de participantes
  for (var i = 1; i <= participantes; i++) {
      listaParticipantes.push('Participante ' + i);
  }

  // Elegir un ganador aleatorio
  var ganadorIndex = Math.floor(Math.random() * listaParticipantes.length);
  var ganador = listaParticipantes[ganadorIndex];

  // Mostrar al ganador en el elemento HTML
  ganadoresDiv.textContent = 'El ganador es: ' + ganador;
}
