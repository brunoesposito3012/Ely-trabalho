const modalcadastro = new bootstrap.Modal(document.getElementById('modalcadastro'));
let idalunoatual = 0;

function listar() {
  fetch("http://127.0.0.1:3333/alunos")
    .then(resp => resp.json())
    .then(dados => mostrar(dados))
    .catch(() => {
      document.getElementById("lista").innerHTML = "<tr><td colspan='7'>Erro ao carregar</td></tr>";
    });
}

function mostrar(dados) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (let i = 0; i < dados.length; i++) {
    lista.innerHTML += "<tr>"
      + "<td>" + dados[i].idaluno + "</td>"
      + "<td>" + dados[i].nome + "</td>"
      + "<td>" + dados[i].idade + "</td>"
      + "<td>" + dados[i].curso + "</td>"
      + "<td>" + dados[i].matricula + "</td>"
      + "<td>" + dados[i].email + "</td>"
      + "<td>"
      + "<button class='btn btn-warning btn-sm' onclick='alterar(" + dados[i].idaluno + ")'>Editar</button> "
      + "<button class='btn btn-danger btn-sm' onclick='excluir(" + dados[i].idaluno + ")'>Excluir</button>"
      + "</td>"
      + "</tr>";
  }
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

function alterar(id) {
  fetch("http://127.0.0.1:3333/alunos/" + id)
    .then(resp => resp.json())
    .then(aluno => {
      idalunoatual = id;
      document.getElementById("nome").value = aluno.nome;
      document.getElementById("idade").value = aluno.idade;
      document.getElementById("curso").value = aluno.curso;
      document.getElementById("matricula").value = aluno.matricula;
      document.getElementById("email").value = aluno.email;
      modalcadastro.show();
    });
}

function excluir(id) {
  if (confirm("Deseja excluir este aluno?")) {
    fetch("http://127.0.0.1:3333/alunos/" + id, { method: "DELETE" })
      .then(() => listar())
      .catch(err => console.error("Erro ao excluir:", err));
  }
}

function salvar() {
  const aluno = {
    nome: document.getElementById("nome").value,
    idade: document.getElementById("idade").value,
    curso: document.getElementById("curso").value,
    matricula: document.getElementById("matricula").value,
    email: document.getElementById("email").value,
  };

  let url = "http://127.0.0.1:3333/alunos";
  let metodo = "POST";

  if (idalunoatual > 0) {
    url += "/" + idalunoatual;
    metodo = "PUT";
  }

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno)
  }).then(() => {
    modalcadastro.hide();
    listar();
  });
}
