# Drip Store — Projeto Front-end (Geração Tech)

Aplicação web de e-commerce desenvolvida em **React + JavaScript + CSS Modules** como projeto final de Front-end do programa **Geração Tech / Digital College**, seguindo fielmente os requisitos da documentação oficial e os layouts Desktop (`1440px`) e Mobile (`375px`) do Figma.

## Site no Ar (Deploy)

- **Vercel:** https://gt-drip-store-lake.vercel.app/

## Integrante da Equipe

- **João Paulo Melo dos Santos**

---

## Tecnologias Utilizadas

- **React 19** (`react`, `react-dom`)
- **Vite 8** (ambiente de desenvolvimento e build de produção)
- **React Router DOM 7** (`BrowserRouter` e rotas SPA)
- **CSS Modules** (`*.module.css`) com variáveis globais em `src/styles/variables.css`
- **Context API + `localStorage`** para persistência local de carrinho, autenticação e pedidos sem necessidade de backend
- **APIs REST públicas + catálogo local JSON** integradas em `src/services/productService.js`

---

## O que foi Implementado

### Páginas e Rotas
| Rota | Página | Descrição |
| --- | --- | --- |
| `/` | `HomePage` | Banner hero em carrossel, 3 coleções em destaque, 5 ícones de categorias, 8 produtos em alta e seção Oferta Especial (Air Jordan). |
| `/products` (ou `/produtos`) | `ProductListingPage` | Listagem completa com busca por query string (`?filter=`), filtro por categoria, marca (select com digitação/busca e chips removíveis), gênero, estado e ordenação por relevância, menor preço, maior preço e melhor avaliação. No mobile, inclui botão de funil abrindo os filtros em drawer off-canvas. |
| `/product/:id` | `ProductViewPage` | Breadcrumb, galeria de fotos com miniaturas (`showThumbs`), avaliação, preços, descrição, seleção de tamanho e cor (`ProductOptions`), botão Comprar (`BuyBox`) e produtos relacionados da mesma categoria. |
| `/categories` | `CategoriesPage` | Navegação rápida por categoria (`Camisetas`, `Calças`, `Bonés`, `Headphones`, `Tênis`) com contagem de itens por grupo. |
| `/cart` | `CartPage` | Tabela/cards do carrinho com controle de quantidade, remoção de itens, cupons de desconto (`DRIP10` e `DRIP30`), cálculo de frete por CEP e resumo do pedido. |
| `/checkout` | `CheckoutPage` | Formulário completo de informações pessoais, endereço de entrega, forma de pagamento (*Cartão de Crédito* ou *Boleto Bancário*) e card de resumo. |
| `/checkout/success` | `OrderSuccessPage` | Comprovante da compra com os dados preenchidos, lista de itens, total, botão **Imprimir Recibo** (`window.print()`) e retorno à Home. |
| `/login` | `LoginPage` | Tela de autenticação com visual gradiente, link *Esqueci minha senha* e botões sociais demo (Gmail/Facebook). |
| `/register` | `RegisterPage` | Cadastro em **2 etapas** fiel ao Figma: Etapa 1 com e-mail inicial → Etapa 2 com formulário completo de dados pessoais, endereço e newsletter. |
| `/orders` e `/profile` | `AccountPage` | Área do cliente com menu lateral (*Meu Perfil*, *Meus Pedidos*, *Minhas Informações*, *Métodos de Pagamento* e *Sair da conta*) e edição de perfil salva no `localStorage`. |

### Componentes Compartilhados e Recursos Extras
- **Header + Drawer Off-Canvas Mobile:** Barra de busca no desktop, ícones de busca expansível + carrinho no mobile, saudação quando autenticado e menu off-canvas vindo pela lateral esquerda (`308px`) sobre backdrop escuro.
- **CartModal:** Modal rápido aberto pelo ícone do carrinho no Header com itens adicionados, subtotal, botão *Esvaziar* e atalho *Ver Carrinho*.
- **Selects Customizados:** Seletor de ordenação estilizado (popover customizado) e filtro de marcas com busca digitável (`FilterGroup` modo `select`).
- **Rolagem Suave e Animações:** `SmoothScroll` e `Reveal` respeitando `prefers-reduced-motion`.
- **Regras de Negócio Simuladas (`localStorage`):**
  - Cupons válidos no carrinho: **`DRIP10`** (10% de desconto) e **`DRIP30`** (R$ 30,00 de desconto).
  - Cálculo de frete por CEP (8 dígitos): grátis para compras a partir de R$ 200,00, ou R$ 19,90 abaixo desse valor.
- **Integrações de Catálogo (`src/services/productService.js`):**
  - **DummyJSON:** tênis masculinos/femininos, camisetas e headphones
  - **FakeStoreAPI:** vestuário e camisetas
  - **ReactBD APIs:** calças jeans e headphones extras
  - **Catálogo Local (`/api/caps.json`):** bonés personalizados com SVGs exclusivos

---

## Pré-requisitos

- **Node.js** 18+ (recomendado LTS)
- **npm** 9+ (instalado junto ao Node.js)

---

## Como Instalar e Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/joaopmelosantos/gt-drip-store.git
   cd gt-drip-store
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:5173`.

4. **Gere e teste o build de produção:**
   ```bash
   npm run build
   npm run preview
   ```

---

## Deploy (Vercel e Netlify)

O projeto já inclui os arquivos [`vercel.json`](vercel.json) e [`netlify.toml`](netlify.toml) configurados para redirecionar todas as rotas da SPA (`BrowserRouter`) para `/index.html`, evitando erros `404` ao recarregar páginas internas.

- **Build command:** `npm run build`
- **Output directory:** `dist`

---

## Estrutura de Pastas

```text
├── doc/                  # Documentação base e imagens de referência
├── public/
│   ├── api/caps.json     # Catálogo de bonés
│   └── figma/            # Imagens e ornamentos estáticos do Figma
├── src/
│   ├── assets/           # Ícones e logomarcas em SVG
│   ├── components/       # BuyBox, CartModal, FilterGroup, Footer, Gallery, Header, Logo, ProductCard, ProductListing, ProductOptions, Reveal, Section
│   ├── context/          # AuthContext e CartContext (estado global + localStorage)
│   ├── data/             # Produtos base (products.js)
│   ├── pages/            # HomePage, ProductListingPage, ProductViewPage, CategoriesPage, CartPage, CheckoutPage, OrderSuccessPage, AuthPages, AccountPage, Layout
│   ├── services/         # Integração unificada com APIs (productService.js)
│   ├── styles/           # Design tokens e cores (variables.css)
│   ├── utils/            # SmoothScroll.jsx
│   ├── App.jsx           # Configuração de rotas
│   └── main.jsx          # Ponto de entrada
├── netlify.toml          # Configuração de deploy SPA no Netlify
├── vercel.json           # Configuração de deploy SPA na Vercel
├── package.json
└── README.md
```
