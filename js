(function () {
  'use strict';

  function setCursorToEnd(el) {
    if (el.setSelectionRange) {
      const len = el.value.length;
      el.setSelectionRange(len, len);
    }
  }

  function maskCPF(value) {
    return value
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function maskTelefone(value) {
    const nums = value.replace(/\D/g, '').slice(0, 11);
    if (nums.length > 10) {
      return nums.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
      return nums.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    }
  }

  function maskCEP(value) {
    return value.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d{1,3})/, '$1-$2');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('telefone');
    const cep = document.getElementById('cep');

    if (cpf) {
      cpf.addEventListener('input', function (e) {
        const old = e.target.value;
        e.target.value = maskCPF(old);
        setCursorToEnd(e.target);
      });
    }

    if (tel) {
      tel.addEventListener('input', function (e) {
        const old = e.target.value;
        e.target.value = maskTelefone(old);
        setCursorToEnd(e.target);
      });
    }

    if (cep) {
      cep.addEventListener('input', function (e) {
        const old = e.target.value;
        e.target.value = maskCEP(old);
        setCursorToEnd(e.target);
      });
    }

    const form = document.getElementById('cadastroForm');
    const status = document.getElementById('formStatus');

    if (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        if (!form.checkValidity()) {
          const firstInvalid = form.querySelector(':invalid');
          if (firstInvalid) firstInvalid.focus();
          showStatus('Por favor, corrija os campos destacados antes de enviar.', true);
          return;
        }

        const cpfVal = (cpf && cpf.value.replace(/\D/g, '')) || '';
        if (cpfVal.length !== 11) {
          cpf.focus();
          showStatus('CPF inválido. Verifique e tente novamente.', true);
          return;
        }

        showStatus('Cadastro enviado com sucesso! Obrigado por se cadastrar.', false);
        form.reset();
      });

      const inputs = Array.from(form.querySelectorAll('input,select'));
      inputs.forEach(function (inp) {
        inp.addEventListener('invalid', function (e) {
          e.preventDefault();
        });
      });
    }

    function showStatus(message, isError) {
      status.hidden = false;
      status.textContent = message;
      if (isError) {
        status.style.background = '#fff1f0';
        status.style.color = '#842029';
      } else {
        status.style.background = '';
        status.style.color = '';
      }
    }
  });
})();
