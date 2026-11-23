# Drip Store — Projeto Front-end (Geração Tech)

Projeto de estudo em **React + JavaScript + CSS Modules** baseado na especificação da Digital Store (`projeto.md` e `doc/README-base.md`) e no protótipo do Figma.

## Como rodar o projeto localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Gere a versão de produção (para validar o build):
   ```bash
   npm run build
   ```

## Estrutura de pastas

```text
├── doc/                  # Documentação original e prints de referência (layout/)
├── public/               # Imagens estáticas servidas a partir da raiz "/"
├── src/
│   ├── assets/           # Ícones e logomarcas em SVG
│   ├── components/       # Componentes reutilizáveis (com CSS Modules)
│   │   ├── BuyBox/
│   │   ├── FilterGroup/
│   │   ├── Footer/
│   │   ├── Gallery/
│   │   ├── Header/
│   │   ├── Logo/
│   │   ├── ProductCard/
│   │   ├── ProductListing/
│   │   ├── ProductOptions/
│   │   └── Section/
│   ├── data/             # Dados simples em JavaScript para estudo (products.js)
│   ├── pages/            # Páginas principais e Layout compartilhado
│   │   ├── HomePage/
│   │   ├── ProductListingPage/
│   │   ├── ProductViewPage/
│   │   └── Layout.jsx
│   ├── styles/           # Variáveis globais de cores e fontes (variables.css)
│   ├── App.jsx           # Definição das rotas com react-router-dom
│   └── main.jsx          # Ponto de entrada da aplicação
├── projeto.md            # Orientações da entrega do curso
└── package.json
```

## Roteiro de estudo sugerido (próximos passos)

- [x] Configuração inicial (Vite + React + JavaScript + CSS Modules + React Router)
- [x] Variáveis globais de cores e fonte `Inter` (`src/styles/variables.css`)
- [x] Componentes de layout base (`Logo`, `Header`, `Footer`, `Layout`, `Section`)
- [x] Extrair e evoluir `<ProductCard />` e `<ProductListing />` (`src/components/`)
- [x] Implementar o carrossel `<Gallery />` com setas e `showThumbs`
- [x] Implementar `<FilterGroup />` (checkbox e radio) na `ProductListingPage`
- [x] Implementar `<ProductOptions />` e `<BuyBox />` completos na `ProductViewPage`
- [x] Ajustes de responsividade mobile (frames de 375px do Figma)
