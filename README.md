# LocalStore

Aplicação de loja demonstrativa construída com Next.js 16, Material-UI v9 e React Query v5, consumindo a [FakeStore API](https://fakestoreapi.com). O projeto serve como referência de arquitetura para aplicações React modernas, aplicando princípios SOLID, separação de camadas e as estratégias de renderização do Next.js App Router (SSG + SSR + Hydration).

---

## Funcionalidades

- **Listagem de Produtos (PLP)** — grid responsivo com paginação client-side (5 itens/página)
- **Detalhes do Produto (PDP)** — layout em duas colunas com imagem, preço, categoria, descrição e botão de ação
- **Header e Footer globais** — presentes em todas as rotas via `RootLayout`
- **Estados de loading** — Skeletons MUI enquanto os dados são buscados
- **Tratamento de erros** — Alert MUI em caso de falha na API
- **SSG para produtos populares** — IDs 1–5 pré-renderizados em build time
- **SSR com fallback** — demais produtos renderizados sob demanda

---

## Stack Tecnológica

| Tecnologia | Versão | Função |
|---|---|---|
| [Next.js](https://nextjs.org) | 16 | Framework React (App Router) |
| [React](https://react.dev) | 19 | UI |
| [TypeScript](https://www.typescriptlang.org) | 5 | Tipagem estática |
| [Material-UI](https://mui.com) | 9 | Componentes de UI |
| [TanStack React Query](https://tanstack.com/query/v5) | 5 | Gerenciamento de estado assíncrono |
| [Jest](https://jestjs.io) | 30 | Test runner |
| [Testing Library](https://testing-library.com) | 16 | Testes de componentes |

---

## Pré-requisitos

- **Node.js** >= 18
- **npm** >= 9

---

## Instalação e Execução

### 1. Clonar o repositório

```bash
git clone <url-do-repositório>
cd localstore
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no browser.

### 4. Build de produção

```bash
npm run build
npm start
```

Durante o build, os produtos de ID 1 a 5 são pré-renderizados via `generateStaticParams` (SSG).

### 5. Rodar os testes

```bash
npm test
```

Para modo watch (re-executa ao salvar):

```bash
npm run test:watch
```

### 6. Verificar tipos TypeScript

```bash
npx tsc --noEmit
```

### 7. Lint

```bash
npm run lint
```

---

## Estrutura do Projeto

```
localstore/
├── src/
│   ├── app/                          # Rotas (Next.js App Router)
│   │   ├── layout.tsx                # RootLayout — providers + MainLayout
│   │   ├── page.tsx                  # Home — listagem de produtos (PLP)
│   │   ├── globals.css               # Estilos globais
│   │   └── product/
│   │       └── [id]/
│   │           └── page.tsx          # Detalhes do produto (PDP)
│   │
│   ├── components/
│   │   ├── AppProvider.tsx           # Orquestra ThemeRegistry + Providers
│   │   ├── ThemeRegistry.tsx         # MUI SSR (AppRouterCacheProvider)
│   │   ├── Providers.tsx             # QueryClientProvider + DevTools
│   │   ├── layout/
│   │   │   ├── Header.tsx            # AppBar com logo e link para home
│   │   │   ├── Footer.tsx            # Rodapé com copyright
│   │   │   └── MainLayout.tsx        # Header + <main> + Footer
│   │   └── products/
│   │       ├── ProductCard.tsx       # Card de produto (UI puro)
│   │       ├── ProductList.tsx       # Grid + paginação client-side
│   │       └── ProductDetail.tsx     # Layout de detalhes do produto
│   │
│   ├── hooks/
│   │   ├── useProducts.ts            # useQuery para lista de produtos
│   │   └── useProduct.ts             # useQuery para produto por ID
│   │
│   ├── services/
│   │   ├── apiClient.ts              # apiFetch<T> — cliente HTTP base
│   │   └── productService.ts         # getProducts() e getProductById()
│   │
│   ├── types/
│   │   └── product.ts                # IProduct e IProductRating
│   │
│   └── lib/
│       ├── queryClient.ts            # Singleton QueryClient (staleTime 60s)
│       └── theme.ts                  # Tema MUI customizado
│
├── src/__tests__/
│   ├── mocks/
│   │   └── products.ts               # Dados fictícios para testes
│   ├── components/
│   │   ├── ProductCard.test.tsx
│   │   ├── ProductList.test.tsx
│   │   └── ProductDetail.test.tsx
│   └── smoke.test.tsx
│
├── jest.config.ts
├── jest.setup.ts
├── next.config.ts
└── tsconfig.json
```

---

## Arquitetura e Decisões Técnicas

### Camadas da aplicação

```
types → services → hooks → components → pages
```

Cada camada depende apenas da camada imediatamente abaixo, nunca acima.

### Renderização (Next.js App Router)

| Rota | Estratégia | Detalhe |
|---|---|---|
| `/` | SSR + Hydration | `prefetchQuery` no Server Component, dados hidratados no cliente |
| `/product/[1-5]` | SSG | `generateStaticParams` pré-gera os 5 primeiros produtos no build |
| `/product/[6+]` | SSR | `dynamicParams = true` renderiza sob demanda na primeira visita |

**Padrão de Hydration:**

```
Server Component
  └── new QueryClient()
  └── await prefetchQuery(...)          ← fetch acontece no servidor
  └── <HydrationBoundary state={dehydrate(queryClient)}>
        └── <ClientComponent />         ← recebe dados sem spinner
```

### Princípios SOLID aplicados

| Princípio | Onde |
|---|---|
| **Single Responsibility** | `apiClient` só faz HTTP; `productService` só conhece endpoints; cada hook encapsula uma query |
| **Open/Closed** | `apiFetch<T>` é genérico — novos serviços (ex: `categoryService`) não modificam o cliente |
| **Interface Segregation** | `IProduct` e `IProductRating` são contratos separados |
| **Dependency Inversion** | Componentes dependem de hooks, não de services diretamente; services dependem de `apiFetch`, não de `fetch` concreto |

### React Query v5

- **`queryKey` como array** com dependências explícitas: `['product', id]`
- **`enabled: !!id`** no `useProduct` evita queries com ID inválido
- **`staleTime: 60_000`** global evita refetches repetidos em 60 segundos
- **Prefetch no servidor** + `HydrationBoundary` para zero-spinner na navegação inicial
- **DevTools** disponíveis em desenvolvimento (canto inferior da tela)

### Material-UI v9

- Imports individuais por componente para tree-shaking otimizado
- `AppRouterCacheProvider` garante injeção correta de estilos Emotion no SSR
- `CssBaseline` normaliza estilos entre browsers
- `Skeleton` para estados de loading consistentes com o layout final
- Grid responsivo com breakpoints `xs / sm / md / lg`

---

## Rotas Disponíveis

| Rota | Descrição |
|---|---|
| `/` | Listagem de produtos com paginação |
| `/product/[id]` | Detalhes de um produto específico |

---

## Testes

15 testes automatizados cobrindo os 3 componentes principais:

| Suite | Quantidade | O que testa |
|---|---|---|
| `ProductCard.test.tsx` | 5 | Título, preço formatado, imagem, categoria e href do link |
| `ProductList.test.tsx` | 4 | Estado de loading, estado de erro, paginação p.1 e p.2 |
| `ProductDetail.test.tsx` | 5 | Estado de erro, título, descrição, preço e categoria |
| `smoke.test.tsx` | 1 | Renderização da página raiz sem crash |

**Estratégia:** hooks mockados com `jest.mock` — testes rápidos, sem rede, sem `QueryClientProvider`.

```bash
npm test

# Test Suites: 4 passed
# Tests:       15 passed
```

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento em `localhost:3000` |
| `npm run build` | Build de produção (inclui geração estática) |
| `npm start` | Inicia o servidor de produção |
| `npm test` | Executa todos os testes |
| `npm run test:watch` | Testes em modo watch |
| `npm run lint` | Verificação de lint com ESLint |

---

## API

Os dados são fornecidos pela [FakeStore API](https://fakestoreapi.com), uma API pública e gratuita que simula um catálogo de e-commerce.

**Endpoints utilizados:**

```
GET https://fakestoreapi.com/products        → lista todos os produtos
GET https://fakestoreapi.com/products/:id    → detalhes de um produto
```

> **Observação sobre paginação:** a FakeStore API retorna no máximo 20 produtos e não suporta paginação real via query params. A paginação é implementada no cliente, dividindo o array em páginas de 5 itens com `.slice()`.
