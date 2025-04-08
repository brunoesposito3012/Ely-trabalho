const modalcadastro = new bootstrap.Modal(document.getElementById('modalcadastro'));

let idalunoatual;

function alterar(id) {
  fetch("http://127.0.0.1:5000/alunos/" + id)
    .then(resp => resp.json())
    .then(dados => {
      idalunoatual = id;
      document.getElementById('nome').value = dados.nome;
      document.getElementById('idade').value = dados.idade;
      document.getElementById('curso').value = dados.curso;
      document.getElementById('matricula').value = dados.matricula;
      document.getElementById('email').value = dados.email;
      modalcadastro.show();
    })
    .catch(err => console.error("Erro ao buscar aluno:", err));
}

function excluir(id) {
  if (confirm("Tem certeza que deseja excluir este aluno?")) {
    fetch("http://127.0.0.1:5000/alunos/" + id, {
      method: "DELETE",
    })
    .then(() => {
      listar();
      alert("Aluno excluído com sucesso.");
    })
    .catch(err => console.error("Erro ao excluir aluno:", err));
  }
}

function salvar() {
  const aluno = {
    nome: document.getElementById("nome").value,
    idade: document.getElementById("idade").value,
    curso: document.getElementById("curso").value,
    matricula: document.getElementById("matricula").value,
    email: document.getElementById("email").value
  };

  let url = "http://127.0.0.1:5000/alunos";
  let metodo = "POST";

  if (idalunoatual > 0) {
    url += "/" + idalunoatual;
    metodo = "PUT";
  }

  fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(aluno)
  })
  .then(() => {
    listar();
    modalcadastro.hide();
    alert("Aluno salvo com sucesso.");
  })
  .catch(err => console.error("Erro ao salvar aluno:", err));
}

function novo() {
  idalunoatual = 0;
  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("curso").value = "";
  document.getElementById("matricula").value = "";
  document.getElementById("email").value = "";
  modalcadastro.show();
}

function listar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "<tr><td colspan='7'>Carregando...</td></tr>";

  fetch("http://127.0.0.1:5000/alunos")
    .then(resp => resp.json())
    .then(dados => mostrar(dados))
    .catch(err => {
      console.error("Erro ao listar alunos:", err);
      lista.innerHTML = "<tr><td colspan='7'>Erro ao carregar dados.</td></tr>";
    });
}

function mostrar(dados) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (let i in dados) {
    lista.innerHTML += `
      <tr>
        <td>${dados[i].idaluno}</td>
        <td>${dados[i].nome}</td>
        <td>${dados[i].idade}</td>
        <td>${dados[i].curso}</td>
        <td>${dados[i].matricula}</td>
        <td>${dados[i].email}</td>
        <td>
          <button type="button" class="btn btn-editar btn-sm" onclick="alterar(${dados[i].idaluno})">Alterar</i>
          </button>
          <button type="button" class="btn btn-excluir btn-sm" onclick="excluir(${dados[i].idaluno})">Excluir</i>
          </button>
        </td>
      </tr>
    `;
  }
}
