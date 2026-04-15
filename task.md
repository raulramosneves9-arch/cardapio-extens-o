intructions.md
Objetivo
Criar, passo a passo, o projeto Cardápio Digital em Vue 3 com:

Vue Router 4
Vuex 4
Axios
componentes reutilizáveis
rotas protegidas
estado global para autenticação e carrinho
mock de API local
persistência em localStorage
Este documento foi escrito para orientar uma IA a construir o projeto de forma organizada, incremental e sem quebrar o que já funciona.

Contexto do projeto
A base do projeto é um app Vue já existente de cardápio digital. A evolução desejada é transformar esse app em uma SPA mais estruturada, separando responsabilidades e adicionando recursos mais avançados do ecossistema Vue. A referência funcional usada aqui segue o material do tutorial fornecido pelo usuário. fileciteturn0file0

Resultado esperado
Ao final, o projeto deve ter:

página inicial
página de cardápio
página de carrinho
página sobre
página de login
navegação com Vue Router
rota protegida para o carrinho
carrinho gerenciado com Vuex
autenticação simulada com Vuex
carregamento de sugestões via Axios
abas dinâmicas com <component :is>
cache de abas com <keep-alive>
comunicação com provide/inject
persistência de estado via localStorage
Regras gerais para a IA
Criar o projeto em etapas pequenas e estáveis.
Não reescrever tudo de uma vez se for possível migrar gradualmente.
Sempre preservar a compatibilidade com a estrutura Vue 3 + Vite.
Usar imports com alias @/ quando aplicável.
Manter nomes claros para arquivos, componentes, actions, getters e mutations.
Implementar primeiro a base estrutural e depois os refinamentos.
Antes de alterar um arquivo existente, entender sua função atual.
Não inventar dependências além das necessárias.
Ordem obrigatória de implementação
A IA deve seguir exatamente esta ordem para evitar imports quebrados e estados inconsistentes.

Etapa 1 — Instalar dependências
Instalar as bibliotecas necessárias:

npm install vue-router@4 vuex@4 axios
Conferir se o projeto usa Vite e se o alias @ aponta para src/. O tutorial de referência usa exatamente essas dependências para Router, estado global e consumo de API. fileciteturn0file0

Etapa 2 — Criar a estrutura de pastas
Criar estas pastas caso ainda não existam:

src/
├── components/
│   └── about/
├── router/
├── services/
├── store/
│   └── modules/
└── views/

public/
Objetivo da separação:

views/ = páginas ligadas a rotas
components/ = partes reutilizáveis
router/ = configuração de rotas
store/ = estado global
services/ = acesso a API
public/ = mock local de dados
Essa divisão é coerente com a organização proposta no material do projeto. fileciteturn0file0

Etapa 3 — Criar o mock de API local
Criar o arquivo:

public/suggestions.json
Ele deve conter um array JSON com sugestões de itens do cardápio, por exemplo:

[
  { "id": "sug-1", "name": "X-Burger Especial", "price": 24.9, "category": "Lanche", "available": true },
  { "id": "sug-2", "name": "Refrigerante 350ml", "price": 6.5, "category": "Bebida", "available": true },
  { "id": "sug-3", "name": "Brownie de Chocolate", "price": 12.0, "category": "Sobremesa", "available": true }
]
Esse arquivo será consumido pelo Axios como uma API simulada servida pelo Vite. fileciteturn0file0

Etapa 4 — Criar o service Axios
Criar o arquivo:

src/services/api.js
Responsabilidades desse arquivo:

criar uma instância Axios com baseURL: '/'
definir timeout
definir cabeçalhos padrão
centralizar tratamento de erros com interceptor
exportar uma função fetchSuggestions()
A função fetchSuggestions() deve:

fazer GET /suggestions.json
validar se o retorno é um array
lançar erro se a resposta estiver inválida
retornar os dados prontos para uso
O tutorial recomenda explicitamente esse padrão com instância Axios + interceptor + função de alto nível. fileciteturn0file0

Etapa 5 — Criar os módulos Vuex
Criar os dois módulos principais antes da store raiz.

5.1 src/store/modules/auth.js
Este módulo deve conter:

state: usuário autenticado ou null
mutations: SET_USER, HYDRATE
actions: login, logout
getters: isAuthenticated, username
namespaced: true
A autenticação é simulada: qualquer nome de usuário informado no login deve ser aceito. fileciteturn0file0

5.2 src/store/modules/cart.js
Este módulo deve conter:

state: lista de itens do carrinho
mutations: ADD_ITEM, REMOVE_ITEM, DECREMENT_ITEM, CLEAR, HYDRATE
actions: addToCart, removeFromCart, decrement, clearCart
getters: items, count, total, isEmpty
namespaced: true
O carrinho deve incrementar quantidade quando o item já existir, e remover quando a quantidade chegar a zero. Esse comportamento está alinhado ao fluxo descrito no material. fileciteturn0file0

Etapa 6 — Criar a store raiz
Criar o arquivo:

src/store/index.js
A store raiz deve:

registrar os módulos auth e cart
ter um estado simples extra, como theme, se quiser manter o modelo do tutorial
carregar dados persistidos do localStorage
executar HYDRATE nos módulos ao iniciar
usar store.subscribe() para salvar snapshot no localStorage
A ordem importa:

ler dados persistidos
criar store
aplicar HYDRATE
ativar subscribe
Essa estratégia de persistência é parte central do projeto desejado. fileciteturn0file0

Etapa 7 — Criar o componente reutilizável BaseCard
Criar:

src/components/BaseCard.vue
Esse componente deve:

aceitar title opcional
possuir slot default
possuir slot nomeado header
possuir slot nomeado footer
ter fallback de título quando o slot header não for enviado
Ele será usado em várias telas para evitar repetição de estrutura visual. O uso de slots com fallback é uma exigência direta da arquitetura proposta. fileciteturn0file0

Etapa 8 — Criar componentes dinâmicos da seção About
Criar os arquivos:

src/components/about/InfoTab.vue
src/components/about/TechTab.vue
src/components/about/ContactTab.vue
Responsabilidade de cada um:

InfoTab.vue
mostrar texto sobre o projeto
opcionalmente exibir um contador simples de montagens
TechTab.vue
listar a stack usada no projeto
renderizar a lista com v-for
ContactTab.vue
formulário com email e message
usar inject('notify')
validar campos antes de enviar
limpar os campos após envio
Esses componentes serão usados por <component :is> e preservados por <keep-alive>. fileciteturn0file0

Etapa 9 — Criar as views principais
Criar:

src/views/HomeView.vue
src/views/MenuView.vue
src/views/CartView.vue
src/views/AboutView.vue
src/views/LoginView.vue
HomeView.vue
Deve:

apresentar o projeto
ter cards com links para Cardápio, Carrinho e Sobre
ler a contagem do carrinho do Vuex
MenuView.vue
Essa é a view mais importante.

Ela deve:

migrar a lógica do antigo App.vue de cardápio
manter estado local de itens do cardápio
manter filtro por categoria
usar MenuForm, MenuSummary, CategoryFilter e MenuItem
carregar/salvar lista de itens em localStorage
atualizar document.title
usar inject('notify')
ter botão para carregar sugestões pela API com Axios
mostrar estado de loading e erro
O tutorial define MenuView.vue como o destino da lógica principal que antes vivia no App.vue. fileciteturn0file0

CartView.vue
Deve:

ler itens do carrinho pelo Vuex
exibir carrinho vazio quando não houver itens
permitir incrementar, decrementar e remover itens
mostrar total formatado
finalizar pedido e limpar carrinho
usar inject('notify')
AboutView.vue
Deve:

ter abas renderizadas dinamicamente
usar <component :is="currentComponent" />
usar markRaw() para guardar referências de componentes
usar <keep-alive> para preservar estado das abas
LoginView.vue
Deve:

ter um formulário simples com nome de usuário
validar campo obrigatório
chamar store.dispatch('auth/login')
redirecionar para a rota original quando houver redirect
usar inject('notify')
Etapa 10 — Criar a NavBar
Criar:

src/components/NavBar.vue
A barra de navegação deve:

usar router-link
exibir links para Home, Cardápio, Carrinho e Sobre
exibir badge com quantidade do carrinho
exibir nome do usuário quando autenticado
exibir botão de logout
redirecionar para Home após logout
Ela deve consumir getters do Vuex para autenticação e contagem do carrinho. O tutorial também usa a NavBar como peça central da navegação. fileciteturn0file0

Etapa 11 — Criar o Router
Criar:

src/router/index.js
Configurar rotas para:

/ → HomeView
/menu → MenuView
/cart → CartView
/about → AboutView
/login → LoginView
rota coringa redirecionando para Home
Regras do router:

usar createWebHistory()
usar lazy loading nas views
definir meta.requiresAuth na rota do carrinho
criar beforeEach para proteger rota autenticada
redirecionar para login com query.redirect
Esse fluxo de proteção de rota faz parte da especificação do projeto. fileciteturn0file0

Etapa 12 — Atualizar main.js
Alterar:

src/main.js
Registrar:

router
store
Exemplo esperado:

createApp(App).use(router).use(store).mount('#app')
Etapa 13 — Atualizar App.vue
Alterar:

src/App.vue
O novo App.vue deve:

renderizar a NavBar
renderizar <router-view />
centralizar o sistema de notificações
usar provide('notify', notify)
opcionalmente usar provide('notifications', readonly(notifications))
A responsabilidade dele deixa de ser a lógica do cardápio e passa a ser a casca global da aplicação. Isso é um ponto importante da migração descrita no material. fileciteturn0file0

Etapa 14 — Atualizar MenuItem.vue
Alterar o componente existente para:

manter seu comportamento atual de exibição
continuar emitindo remoção quando necessário
adicionar botão + Carrinho
desabilitar botão se o item estiver indisponível
usar useStore() para despachar cart/addToCart
usar inject('notify')
O tutorial mostra claramente que o MenuItem ganha integração com o carrinho e feedback visual por notificação. fileciteturn0file0

Etapa 15 — Validar integrações entre partes
Depois que tudo estiver criado, revisar se:

a aplicação inicia sem erro de import
o Router está funcionando
a NavBar aparece em todas as páginas
o login simulado funciona
a rota /cart exige autenticação
o carrinho atualiza badge e total
o botão de carregar sugestões funciona
o estado persiste após F5
as abas da página Sobre preservam estado
o sistema de notificações funciona em vários componentes
Regras específicas de implementação
Sobre reatividade
usar computed para valores derivados
usar watch ou watchEffect só quando fizer sentido
evitar lógica excessiva diretamente no template
Sobre Vuex
componentes nunca devem editar diretamente o estado do carrinho
toda alteração do carrinho deve passar por dispatch
persistência deve ser centralizada na store
Sobre Router
proteger rota antes da montagem da tela
preferir name nas navegações programáticas
Sobre comunicação entre componentes
usar props e emits quando a relação for direta
usar provide/inject para utilidades globais como notificações
Sobre código
preferir arquivos curtos e focados
evitar componentes gigantes
manter consistência entre nome de arquivo e nome de componente
Estratégia recomendada de entrega
A IA deve gerar código em blocos por etapa, nesta ordem:

dependências
estrutura de pastas
mock da API
service Axios
módulos Vuex
store raiz
BaseCard
abas About
views
NavBar
Router
main.js
App.vue
MenuItem.vue
revisão final
O que evitar
não criar tudo em um único arquivo
não misturar regra de carrinho com UI da navbar
não acessar o carrinho fora do Vuex
não tratar autenticação dentro da CartView se o Router já faz isso
não duplicar lógica de persistência em vários componentes
não usar componentes dinâmicos sem markRaw() no array de tabs
não ignorar estados de erro no carregamento com Axios
Critério de qualidade final
O projeto estará bem construído se:

estiver organizado por responsabilidade
conseguir evoluir sem acoplamento excessivo
estiver legível para manutenção
seguir fluxo previsível de estado
permitir navegação SPA limpa
refletir o tutorial-base com fidelidade funcional
Fonte de referência
A arquitetura, os módulos e a sequência de migração usados neste arquivo foram baseados no tutorial enviado pelo usuário sobre o módulo Vue aplicado ao projeto Cardápio Digital. fileciteturn0file0