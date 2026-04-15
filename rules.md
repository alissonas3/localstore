# Regras do Projeto — LocalStore

Documento de referência das convenções, decisões arquiteturais e regras que governam o desenvolvimento desta aplicação. Toda contribuição deve seguir estas diretrizes.

---

## 1. Arquitetura em Camadas

A dependência entre camadas é **unidirecional e estrita**:

```
types → services → hooks → components → pages
```

- Cada camada depende apenas da camada imediatamente abaixo.
- Componentes **nunca** importam diretamente de `services/`.
- Pages **nunca** contêm lógica de negócio — apenas orquestram prefetch e passam props.

---

## 2. Princípios SOLID

### 2.1 Single Responsibility (SRP)

- Cada arquivo tem **uma única razão para mudar**.
- Componentes que misturam busca de dados, transformação e renderização **devem ser decompostos**.
- Lógica reutilizável de estado vai em **Custom Hooks** (`src/hooks/`).
- Transformações de dados vão em funções puras em **`src/lib/`** (ex: `buildProductInfoItems`).
- Sub-componentes com responsabilidade própria vivem em **arquivos separados**, nunca embutidos.

### 2.2 Open/Closed (OCP)

- Componentes devem ser **extensíveis via props**, não via modificação direta.
- Configurações fixas (links de navegação, redes sociais) ficam em `src/lib/` e são **injetadas via props** com valores default — permitindo sobrescrever sem alterar o componente.
- Evitar condicionais `if/else` em cascata dentro de componentes; preferir **composition pattern** (`children`, render props).

### 2.3 Interface Segregation (ISP)

- Props de componentes devem ser **enxutas e específicas** — o componente recebe apenas o que usa.
- Interfaces de domínio separadas por responsabilidade: `IProduct` e `IProductRating` são contratos distintos.
- Nunca passar um objeto inteiro quando o componente precisa apenas de dois campos.

### 2.4 Dependency Inversion (DIP)

- Componentes de UI dependem de **hooks**, nunca de `services/` diretamente.
- Services dependem de `apiFetch`, nunca de `fetch` ou `axios` diretamente no corpo da função de domínio.
- Configurações externas (navegação, social) são abstraídas em módulos de `src/lib/` e injetadas via props.

---

## 3. Estrutura de Pastas

```
src/
├── app/          # Rotas Next.js (App Router) — sem lógica de negócio
├── components/
│   ├── layout/   # Header, Footer, MainLayout e seus sub-componentes
│   └── products/ # Componentes do domínio de produto
├── hooks/        # Custom hooks (React Query + lógica de estado)
├── services/     # Comunicação com APIs externas
├── types/        # Interfaces e tipos TypeScript
└── lib/          # Configurações, utilitários puros e constantes
```

**Regras:**

- Novos domínios ganham **sub-pasta própria** em `components/` (ex: `components/cart/`).
- Componentes de layout ficam em `components/layout/`, nunca em `components/` raiz.
- Arquivos de configuração de dados (links, ícones, constantes de domínio) ficam em `src/lib/`, nunca embutidos no componente.

---

## 4. Componentes

- Todo componente de UI puro deve receber dados **exclusivamente via props** — sem chamadas de hook internas.
- Componentes que precisam de dados da API recebem apenas o identificador (ex: `id`) e delegam ao hook.
- Skeletons de loading e estados de erro são **componentes separados** quando o JSX é extenso.
- Componentes orquestradores (ex: `ProductDetail`) apenas decidem **o que renderizar** (loading / erro / conteúdo) — não constroem o layout.
- Importações de MUI são **individuais por componente** para garantir tree-shaking:
  ```ts
  // correto
  import Box from '@mui/material/Box'
  // errado
  import { Box } from '@mui/material'
  ```

---

## 5. Hooks

- Um hook por arquivo, nomeado `use<Entidade>.ts`.
- Hooks do React Query expõem apenas o retorno do `useQuery` — sem transformações adicionais.
- Lógica de estado reutilizável (ex: paginação) vai em hooks genéricos (`usePagination<T>`).
- Guard `enabled: !!id` obrigatório em hooks que dependem de um parâmetro dinâmico.
- `queryKey` sempre como array com dependências explícitas: `['product', id]`.

---

## 6. Services

- Um arquivo de service por recurso de API (ex: `productService.ts`).
- Toda chamada HTTP passa por `apiFetch<T>` — nunca `fetch` direto no service.
- Funções exportadas são **puras e assíncronas**, sem efeitos colaterais.
- Tratamento de erro centralizado em `apiFetch`: lança `Error` em respostas não-ok.

---

## 7. React Query

| Regra | Detalhe |
|---|---|
| `staleTime` global | 60 segundos — evita refetches desnecessários |
| `queryKey` | Array com todas as dependências da query |
| `enabled` | Obrigatório quando a query depende de parâmetro que pode ser falsy |
| Prefetch em Server Components | Usar `queryClient.prefetchQuery` + `HydrationBoundary` para zero-spinner na carga inicial |
| DevTools | Disponíveis apenas em desenvolvimento |

---

## 8. Renderização (Next.js App Router)

| Rota | Estratégia | Regra |
|---|---|---|
| `/` | SSR + Hydration | `prefetchQuery` no Server Component; cliente assume interatividade via `HydrationBoundary` |
| `/product/[1–5]` | SSG | `generateStaticParams` pré-gera os 5 primeiros IDs em build time |
| `/product/[6+]` | SSR com fallback | `dynamicParams = true`; renderizado sob demanda na primeira visita |

- Server Components fazem **apenas** prefetch e estrutura de layout.
- Client Components (`'use client'`) são usados somente quando há interatividade ou hooks do React.

---

## 9. Tipagem

- Todas as interfaces de domínio ficam em `src/types/`.
- Interfaces de props são declaradas **no mesmo arquivo do componente**, não em `types/`.
- Usar prefixo `I` para interfaces de domínio (`IProduct`, `IProductRating`).
- Funções de transformação exportam suas interfaces de retorno (ex: `ProductInfoItem` em `productDisplay.ts`).
- Proibido uso de `any` — preferir `unknown` com narrowing quando necessário.

---

## 10. Configurações de Dados

Dados configuráveis que hoje são fixos, mas podem mudar ou ser sobrescritos, ficam em `src/lib/`:

| Arquivo | Exporta | Usado em |
|---|---|---|
| `navigation.ts` | `DEFAULT_NAV_LINKS`, `NavLink` | `Header` (via prop `navItems`) |
| `social.ts` | `DEFAULT_SOCIAL_LINKS`, `SocialLink` | `Footer` (via prop `socialLinks`) |
| `productDisplay.ts` | `buildProductInfoItems`, `ProductInfoItem` | `ProductDetailContent` |
| `queryClient.ts` | `queryClient` | `Providers`, Server Components |
| `theme.ts` | `theme` | `ThemeRegistry` |

---

## 11. Testes

- Hooks mockados com `jest.mock` — testes **sem rede** e **sem `QueryClientProvider`**.
- Um arquivo de teste por componente principal, em `src/__tests__/components/`.
- Mocks de dados reutilizáveis em `src/__tests__/mocks/`.
- Cada teste cobre: renderização correta, estado de loading, estado de erro e interações principais.
- Proibido testar detalhes de implementação — testar **comportamento visível ao usuário**.

---

## 12. Paginação

- Paginação é sempre **client-side** via hook `usePagination<T>`.
- Padrão atual: **12 itens por página** (`ITEMS_PER_PAGE = 12` em `ProductList`).
- O componente `ProductPagination` não é renderizado quando `totalPages <= 1`.
- A lógica de slice (`visible`) fica exclusivamente dentro do hook — nunca no componente.
