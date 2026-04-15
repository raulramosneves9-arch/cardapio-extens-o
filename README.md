<<<<<<< HEAD
# 🍔 Cardápio Digital - Vue 3 + Vite

Aplicação web desenvolvida com Vue 3 para gerenciamento de cardápio digital.  
Permite cadastrar itens, visualizar por categorias, controlar disponibilidade e analisar dados em tempo real.

---

# 📌 Objetivo do Projeto

Aplicar conceitos do módulo de desenvolvimento frontend utilizando Vue.js, incluindo:

- Componentização
- Reatividade
- Comunicação entre componentes
- Manipulação de dados
- Persistência local
- Responsividade com CSS Grid
- Containerização com Docker

---

# 🚀 Como rodar o projeto

## 🔧 Pré-requisitos

- Node.js (>= 18)
- npm
- Docker (opcional)

---

## ▶️ Rodando localmente (modo desenvolvimento)

```bash
npm install
npm run dev

Acesse:

http://localhost:5173
🐳 Rodando com Docker
📄 Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
📄 docker-compose.yml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev -- --host
▶️ Executar com Docker
docker-compose up

Acesse:

http://localhost:5173
📦 Estrutura do Projeto
src/
 ├── views/
 │   ├── main.vue
 │   ├── register/
 │   │   └── createCard.vue
 │   ├── list-cardapio/
 │   │   └── list.vue
 │   └── infoItem/
 │       └── infItem.vue
⚙️ Funcionamento da Aplicação
1. Cadastro de itens

O usuário pode cadastrar:

Nome
Preço
Categoria (lanche, bebida, sobremesa)
Disponibilidade

📍 Arquivo: register/createCard.vue

2. Armazenamento de dados

Os itens são armazenados no navegador utilizando LocalStorage:

📍 Arquivo: views/main.vue (~linha 10)

localStorage.setItem('itens', JSON.stringify(itens.value))
3. Listagem de itens

Os itens são exibidos organizados por categoria:

Lanches
Bebidas
Sobremesas

📍 Arquivo: list-cardapio/list.vue

4. Filtro de categorias

Permite visualizar apenas uma categoria específica ou todas.

📍 Arquivo: list.vue (~linha 10)

const filtroAtivo = ref('todos')
5. Exclusão de itens

Itens podem ser removidos da lista.

📍 Arquivo: list.vue

@click="emit('deletarItem', item.id)"
6. Indicador de disponibilidade

Itens indisponíveis:

ficam em cinza
possuem linha visual no nome

📍 Arquivo: list.vue (template + CSS)

7. Dashboard de estatísticas

Exibe:

Total de itens
Média de preços
Quantidade disponível

📍 Arquivo: infoItem/infItem.vue

🧠 Conceitos aplicados
🔹 1. Composition API

📍 views/main.vue (~linhas 1–20)

Uso de:

ref()
🔹 2. Props

📍 list.vue (~linha 3)
📍 infItem.vue (~linha 3)

const props = defineProps({ itens: Array })
🔹 3. Emits

📍 list.vue (~linha 5)

const emit = defineEmits(['deletarItem'])
🔹 4. Reatividade

📍 main.vue

const itens = ref([...])
🔹 5. Computed Properties

📍 infItem.vue (~linhas 5–20)

computed(() => ...)
🔹 6. Diretivas Vue
v-for

📍 list.vue

v-for="item in lanches"
v-if

📍 list.vue

v-if="lanches.length === 0"
v-show

📍 list.vue

v-show="mostrarLanches"
v-bind
:class="{ off: !item.available }"
🔹 7. Eventos

📍 list.vue

@click="emit('deletarItem', item.id)"
🔹 8. Manipulação de Arrays
filter
props.itens.filter(...)
reduce
props.itens.reduce(...)
🔹 9. LocalStorage

📍 main.vue

localStorage.setItem(...)
🔹 10. CSS Grid (Responsividade)

📍 list.vue

grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
=======
