document.addEventListener('DOMContentLoaded', function() {
  const validarDatosBtn = document.getElementById('validar-datos-btn');
  if (validarDatosBtn) {
    validarDatosBtn.addEventListener('click', function() {
      const participantes = document.getElementById('participantes').value;
      const monto = document.getElementById('monto').value;
      const direccionesContainer = document.getElementById('direcciones-billetera');
      const montoSortearContainer = document.getElementById('monto-a-sortear');
      const validacionContainer = document.getElementById('validacion-container');

      direccionesContainer.innerHTML = '';
      montoSortearContainer.innerHTML = '';

      if (participantes >= 3 && participantes <= 18 && monto >= 30 && monto <= 300) {
        validacionContainer.style.display = 'none';

        const montoTotal = participantes * monto;
        montoSortearContainer.innerHTML = '<p>Monto a sortear: ' + montoTotal + '</p>';

        for (let i = 1; i <= participantes; i++) {
          const label = document.createElement('label');
          label.setAttribute('for', 'direccion-' + i);
          label.innerText = 'Dirección de Billetera ' + i + ':';

          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('id', 'direccion-' + i);
          input.setAttribute('name', 'direccion-' + i);
          input.setAttribute('required', true);

          const button = document.createElement('button');
          button.setAttribute('type', 'button');
          button.innerText = 'Aporte';
          button.className = 'aporte-btn';

          direccionesContainer.appendChild(label);
          direccionesContainer.appendChild(input);
          direccionesContainer.appendChild(button);
          direccionesContainer.appendChild(document.createElement('br'));
        }

        document.getElementById('crear-junta-btn').style.display = 'block';

        const form = new FormData();
        form.append('participantes', participantes);
        form.append('monto', monto);

        fetch('/validar_junta', {
          method: 'POST',
          body: form
        }).then(response => {
          if (response.redirected) {
            window.location.href = response.url;
          }
        });
      } else {
        alert('Por favor, ingrese un número válido de participantes (entre 3 y 18) y un monto a aportar (entre 30 y 300).');
      }
    });
  } else {
    console.error('El botón validar-datos-btn no se encontró en el DOM');
  }
});
