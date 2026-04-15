# Prompts da Aplicação LocalStore

---

## Fase 1: Setup Inicial

Configuração da infraestrutura do projeto com Next.js, instalação de dependências como React Query v5 e Material-UI, e estruturação básica de pastas.

### 1.1 Inicialização e Configuração Base

- Criação do projeto com Next.js (definindo o uso do App Router ou Pages Router).
- Configuração do TypeScript e ajustes básicos do ambiente de desenvolvimento (ESLint, Prettier).

### 1.2 Instalação e Configuração das Dependências Core

- Instalação do React Query v5 (TanStack Query) e configuração do `QueryClientProvider` global.
- Adição do Material-UI (MUI), configurando o `ThemeProvider` para modernizar o design da "LocalStore" e garantir uma base de estilos consistente.

### 1.3 Arquitetura e Estruturação de Pastas

- Criação da estrutura de diretórios guiada por princípios SOLID.
- Definição de pastas:
  - `components` — itens visuais
  - `services` — integração com a FakeStore API
  - `hooks` — chamadas do React Query
  - `types` — tipagens do TypeScript
  - `lib` — configurações, utilitários puros e constantes (QueryClient, tema MUI, dados de navegação, redes sociais)

---

## Fase 2: Componentes Estruturais (Layout)

**Objetivo:** Criar o Header e Footer consistentes, isolando-os do conteúdo das páginas.

### Tarefa 2.1: Desenvolvimento do Header

- Crie um componente `Header` utilizando `AppBar` e `Toolbar` do Material-UI.
- Inclua um logo (texto ou ícone) que funcione como link de navegação para a Home (`/`).

### Tarefa 2.2: Desenvolvimento do Footer

- Crie um componente `Footer` simples, fixado no final da página ou após o conteúdo.

### Tarefa 2.3: Configuração do Main Layout

- Crie um componente genérico de `Layout` que receba `children`.
- Estrutura: `<Header />` → `<Container>{children}</Container>` → `<Footer />`.
- Aplique este Layout no arquivo raiz (`layout.tsx` no App Router ou `_app.tsx` no Pages Router).

---

## Fase 3: Camada de Serviços (API) e Custom Hooks

**Objetivo:** Isolar completamente a comunicação com a FakeStore API das regras de interface, aplicando princípios SOLID.

### Tarefa 3.1: Configuração do Cliente HTTP

- Crie o arquivo `src/services/apiClient.ts`.
- Configure a URL base (`https://fakestoreapi.com`).
- Você pode usar o `fetch` nativo ou instalar o `axios`.

### Tarefa 3.2: Contratos e Interfaces

- Crie o arquivo `src/types/product.ts`.
- Defina a interface `IProduct` baseada no payload da FakeStore API:
  - `id`, `title`, `price`, `category`, `description`, `image`

### Tarefa 3.3: Implementação dos Services

- Crie `src/services/productService.ts`.
- Implemente a função `getProducts()` — para listar todos os produtos.
- Implemente a função `getProductById(id: number)` — para buscar um produto específico.

### Tarefa 3.4: Criação dos Hooks do React Query (v5)

- Crie `src/hooks/useProducts.ts`: utilize `useQuery` para buscar a lista de produtos.
- Crie `src/hooks/useProduct.ts`: utilize `useQuery` para buscar um produto específico, passando o `id` como dependência na `queryKey`.

---

## Fase 4: Tela de Listagem de Produtos (PLP) com Paginação

**Objetivo:** Construir a Home Page renderizando a lista de produtos, lidando com estados de loading e paginação simulada.

### Tarefa 4.1: Componente ProductCard

- Crie o componente de UI puro `ProductCard` usando `Card`, `CardMedia`, `Typography` e `Button` do MUI.
- Ele deve receber um objeto `IProduct` via props.

### Tarefa 4.2: Lógica de Paginação Front-end

> **Nota arquitetural:** A FakeStore API retorna no máximo 20 produtos e não possui paginação real (`limit`/`offset` não gera páginas subsequentes confiáveis).

- Buscar a lista completa e implementar a paginação manipulando o array no lado do cliente com **12 itens por página** via hook `usePagination<T>`.
- Utilizar o componente `Pagination` do Material-UI para controlar o estado da página atual, isolado no componente `ProductPagination`.

### Tarefa 4.3: Montagem da Página (SSG/SSR)

- Crie a página principal.
- Utilize as práticas de renderização do Next.js. No App Router, pré-busque os dados no Server Component usando `queryClient.prefetchQuery` e desidrate o estado (Hydration boundary) para que o cliente assuma a paginação, mesclando SSG com interatividade Client-Side.
- Exiba o `Grid` do MUI iterando sobre os produtos da página atual com o `ProductCard`.
- Trate estados de `isLoading` (exibindo `Skeleton` do MUI) e `isError`.

---

## Fase 5: Tela de Detalhes do Produto (PDP)

**Objetivo:** Criar a página de detalhes com rota dinâmica, demonstrando uso correto de renderização no Next.js.

### Tarefa 5.1: Configuração da Rota Dinâmica

- Crie a rota dinâmica: `src/app/product/[id]/page.tsx`.

### Tarefa 5.2: Estratégia de Renderização (SSR/SSG)

- Utilize SSG para os produtos mais acessados, pré-gerando os IDs de 1 a 5 usando `generateStaticParams` (App Router) ou `getStaticPaths` (Pages Router).
- Para os demais, utilize SSR genérico com `fallback`.

### Tarefa 5.3: Componente de Detalhes do Produto

- Construa o layout da página usando duas colunas (`Grid` do MUI):
  - **Esquerda:** Imagem do produto
  - **Direita:** Título, Preço, Categoria, Descrição, Botão de Ação
- Conecte o hook `useProduct(id)` criado na Fase 3 para buscar os dados, lidando com o estado de carregamento.

---

## Fase 6: Testes Unitários

**Objetivo:** Garantir a estabilidade e o comportamento esperado das regras de negócio e da interface.

### Tarefa 6.1: Configuração de Mocks

- Crie um arquivo de mock com dados fictícios de produtos simulando o retorno da FakeStore API.

### Tarefa 6.2: Testes de UI (Componentes Isolados)

- Teste o componente `ProductCard`: verifique se título, preço e imagem são renderizados corretamente quando as props são passadas.

### Tarefa 6.3: Testes de Hooks e Integração

- **PLP:** Mock o retorno do React Query e teste se os cards são renderizados e se a paginação atualiza a quantidade de itens na tela.
- **PDP:** Mock o retorno da API para um ID específico e garanta que a descrição e o título correto sejam exibidos.

### Tarefa 6.4: Testes dos Componentes e Utilitários Extraídos na Refatoração

- **`usePagination`:** Verifique página inicial, cálculo de `totalPages`, slice correto por página e comportamento com lista vazia.
- **`buildProductInfoItems`:** Valide formatação de preço (`R$`), avaliação (`X / 5`) e conversão de votos para string.
- **`InfoItem`:** Confirme que `label` e `value` são renderizados de forma independente.
- **`ProductPagination`:** Verifique que o componente não é renderizado com `totalPages <= 1` e que `onPageChange` é chamado ao clicar em uma página.
- **`ProductDetailContent`:** Confirme que título, descrição, preço, categoria, avaliação, votos e cabeçalhos de seção são exibidos corretamente.

---

## Fase 7: Refatoração SOLID

**Objetivo:** Decompor componentes que acumulavam mais de uma responsabilidade, garantindo que cada arquivo tenha uma única razão para mudar e seja extensível sem modificação direta.

### Tarefa 7.1: Extração do Hook de Paginação

- Crie `src/hooks/usePagination.ts` como hook genérico `usePagination<T>(items, itemsPerPage)`.
- Centralize toda a lógica de slice e controle de página neste hook.
- Remova o estado e a lógica de paginação de `ProductList`.

### Tarefa 7.2: Decomposição de ProductList

- Extraia `ProductGrid` (`src/components/products/ProductGrid.tsx`) — responsável apenas por renderizar o grid e os skeletons de loading.
- Extraia `ProductPagination` (`src/components/products/ProductPagination.tsx`) — responsável apenas pelo componente de paginação.
- `ProductList` passa a ser um orquestrador: consome `useProducts` + `usePagination` e compõe `ProductGrid` + `ProductPagination`.

### Tarefa 7.3: Decomposição de ProductDetail

- Extraia `InfoItem` (`src/components/products/InfoItem.tsx`) — componente reutilizável de label + value.
- Extraia `buildProductInfoItems` para `src/lib/productDisplay.ts` — função pura que transforma `IProduct` em array de itens de exibição.
- Extraia `ProductDetailSkeleton` (`src/components/products/ProductDetailSkeleton.tsx`) — skeleton isolado do layout de detalhe.
- Extraia `ProductDetailContent` (`src/components/products/ProductDetailContent.tsx`) — renderização pura, recebe `IProduct` via props.
- `ProductDetail` passa a ser um orquestrador: decide entre loading / erro / conteúdo.

### Tarefa 7.4: Decomposição de Header

- Extraia `Logo` (`src/components/layout/Logo.tsx`).
- Extraia `NavigationLinks` (`src/components/layout/NavigationLinks.tsx`) — recebe `items` e `activeHref` via props.
- Extraia `HeaderActions` (`src/components/layout/HeaderActions.tsx`) — ícones de perfil e carrinho.
- Mova a lista de links para `src/lib/navigation.ts` como `DEFAULT_NAV_LINKS`.
- `Header` passa a aceitar `navItems?: NavLink[]` com default em `navigation.ts`.

### Tarefa 7.5: Decomposição de Footer

- Extraia `SocialLinks` (`src/components/layout/SocialLinks.tsx`) — recebe `links` via props.
- Mova os dados das redes sociais para `src/lib/social.ts` como `DEFAULT_SOCIAL_LINKS`.
- `Footer` passa a aceitar `socialLinks?: SocialLink[]` com default em `social.ts`.
