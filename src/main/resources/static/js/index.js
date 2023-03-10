const getUrl = window.location;
const baseUrl = getUrl.protocol + '//' + getUrl.host;

window.onload = showProducts();

document.querySelector('#searchInput').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.querySelector('#searchButton').click();
  }
});

function postAnnounceProduct(name_text, description_text, price_text) {
  fetch(`${baseUrl}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name_text,
      description: description_text,
      price: price_text,
    }),
  })
    .then(() => {
      return modalMsg('success', 'Produto anunciado com sucesso!');
    })
    .catch(() => {
      return modalMsg('error', 'Erro ao anunciar produto!');
    });
}

function editProduct(id, name_text, description_text, price_text) {
  fetch(`${baseUrl}/api/products`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      name: name_text,
      description: description_text,
      price: price_text,
    }),
  })
    .then(() => {
      return modalMsg('success', 'Produto editado com sucesso!');
    })
    .catch(() => {
      return modalMsg('error', 'Erro ao editar produto!');
    });
}

function showProducts() {
  const input_text = document.querySelector('#searchInput');
  const container_products = document.querySelector('#container_products');

  if (!input_text.value) {
    fetch(`${baseUrl}/api/products`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((products) => {
        const productsMap = products.map((product) => {
          return _mountProducts(product.id, product.name, product.description, product.price);
        });
        container_products.innerHTML = productsMap.join('');
      })
      .catch(() => {
        return modalMsg('error', 'Erro ao mostrar produtos!');
      });
  } else {
    fetch(`${baseUrl}/api/products/${input_text.value}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((products) => {
        const productsMap = products.map((product) => {
          return _mountProducts(product.id, product.name, product.description, product.price);
        });
        container_products.innerHTML = productsMap.join('');
      })
      .catch(() => {
        return modalMsg('error', 'Erro ao mostrar produtos!');
      });
  }
}

function deleteProduct(id) {
  fetch(`${baseUrl}/api/products/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      return modalMsg('success', 'Produto deletado com sucesso!');
    })
    .catch(() => {
      return modalMsg('error', 'Erro ao deletar produto!');
    });
}

function _mountProducts(id, name, description, price) {
  return `<tr class="align-middle">
  <td>${name}</td>
  <td style="word-wrap: break-word;min-width: 160px;max-width: 160px;">
    ${description}
  </td>
  <td>R$${_moneyFormat(price)}</td>
  <td>
    <i class="fa-solid fa-trash fs-5 bg-white" role="button" id="${id}" onclick="deleteProduct(this.id)"></i>
    <i class="fa-solid fa-pen-to-square fs-5 bg-white" role="button" id="${id}" onclick="modalEdit(this.id)"></i>
  </td>
</tr>`;
}

function _moneyFormat(price) {
  return price
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
}
