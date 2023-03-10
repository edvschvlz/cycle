function modalAnnounce() {
  Swal.fire({
    title: 'Anunciar',
    color: 'black',
    html:
      '<form class="d-flex flex-column gap-3">' +
      '<div>' +
      '<label class="swal2-label">Nome</label>' +
      '<input id="inputName" class="swal2-input w-75">' +
      '</div>' +
      '<div>' +
      '<label class="swal2-label">Descrição</label>' +
      '<textarea id="inputDescription" class="swal2-textarea w-75" maxlength ="200" style="height: 150px; resize: none"></textarea>' +
      '</div>' +
      '<div>' +
      '<label class="swal2-label">Preço</label>' +
      '<input id="inputPrice" class="swal2-input w-75">' +
      '</div>' +
      '<form>',
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Anunciar',
    confirmButtonColor: '#0d6efd',
    preConfirm: () => {
      const name_text = document.querySelector('#inputName');
      const description_text = document.querySelector('#inputDescription');
      const price_text = document.querySelector('#inputPrice');

      if (!name_text.value) {
        description_text.style.border = '1px solid #d9d9d9';
        price_text.style.border = '1px solid #d9d9d9';
        name_text.style.border = '1px solid red';
        return false;
      }

      if (!description_text.value || description_text.value.length > 200) {
        name_text.style.border = '1px solid #d9d9d9';
        price_text.style.border = '1px solid #d9d9d9';
        description_text.style.border = '1px solid red';
        return false;
      }

      if (!price_text.value || isNaN(price_text.value)) {
        name_text.style.border = '1px solid #d9d9d9';
        description_text.style.border = '1px solid #d9d9d9';
        price_text.style.border = '1px solid red';
        return false;
      }

      return postAnnounceProduct(name_text.value, description_text.value, price_text.value);
    },
  });
}

function modalEdit(id) {
  Swal.fire({
    title: 'Editar',
    color: 'black',
    html:
      '<form class="d-flex flex-column gap-3">' +
      '<div>' +
      '<label class="swal2-label">Nome</label>' +
      '<input id="inputName" class="swal2-input w-75">' +
      '</div>' +
      '<div>' +
      '<label class="swal2-label">Descrição</label>' +
      '<textarea id="inputDescription" class="swal2-textarea w-75" maxlength ="200" style="height: 150px; resize: none"></textarea>' +
      '</div>' +
      '<div>' +
      '<label class="swal2-label">Preço</label>' +
      '<input id="inputPrice" class="swal2-input w-75">' +
      '</div>' +
      '<form>',
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Editar',
    confirmButtonColor: '#0d6efd',
    didOpen: () => {
      const name_text = document.querySelector('#inputName');
      const description_text = document.querySelector('#inputDescription');
      const price_text = document.querySelector('#inputPrice');

      fetch(`${baseUrl}/api/products/product/${id}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((product) => {
          name_text.value = product.name;
          description_text.value = product.description;
          price_text.value = product.price;
        })
        .catch(() => {
          return showModal('error', 'Erro ao mostrar produto!');
        });
    },
    preConfirm: () => {
      const name_text = document.querySelector('#inputName');
      const description_text = document.querySelector('#inputDescription');
      const price_text = document.querySelector('#inputPrice');

      if (!name_text.value) {
        description_text.style.border = '1px solid #d9d9d9';
        price_text.style.border = '1px solid #d9d9d9';
        name_text.style.border = '1px solid red';
        return false;
      }

      if (!description_text.value || description_text.value.length > 200) {
        name_text.style.border = '1px solid #d9d9d9';
        price_text.style.border = '1px solid #d9d9d9';
        description_text.style.border = '1px solid red';
        return false;
      }

      if (!price_text.value || isNaN(price_text.value)) {
        name_text.style.border = '1px solid #d9d9d9';
        description_text.style.border = '1px solid #d9d9d9';
        price_text.style.border = '1px solid red';
        return false;
      }

      return editProduct(id, name_text.value, description_text.value, price_text.value);
    },
  });
}

function modalMsg(type, msg) {
  if (type === 'success') {
    return Swal.fire({
      title: 'Sucesso',
      text: msg,
      icon: 'success',
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      confirmButtonColor: '#0d6efd',
    }).then(() => {
      window.location.reload(true);
    });
  } else {
    return Swal.fire({
      title: 'Erro',
      text: msg,
      icon: 'error',
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      confirmButtonColor: '#0d6efd',
    }).then(() => {
      window.location.reload(true);
    });
  }
}
