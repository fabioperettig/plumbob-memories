# Plumbob Memories

**A Sim Nostalgia — uma homenagem ao primeiro The Sims.**

Página temática inspirada no primeiro The Sims, com necessidades interativas, alertas e um Plumbob que muda de cor de acordo com o estado geral dos moods.


## Estrutura

```text
.
├── assets/
│   ├── audio/              # Efeitos sonoros
│   ├── design/             # Fontes e referências editáveis
│   └── images/
│       ├── branding/       # Logos e ícones da página
│       ├── content/        # Imagens usadas no conteúdo
│       ├── moods/          # Ícones PNG e fontes SVG dos moods
│       └── plumbobs/       # Plumbobs animados
├── partials/
│   └── header-footer.html  # Fragmento carregado na página
├── locales/
│   ├── en.txt              # Textos em inglês
│   └── pt-BR.txt           # Textos em português do Brasil
├── scripts/
│   ├── alert.js
│   ├── i18n.js             # Carregamento e troca de idioma
│   ├── mood-controller.js
│   ├── moods.js
│   └── navigation.js
├── styles/
│   ├── alert.css
│   ├── footer.css
│   ├── main.css
│   └── moods.css
└── index.html
```

## Idiomas

Os textos visíveis ficam nos arquivos da pasta `locales`, no formato
`chave=texto`. Os elementos HTML usam atributos `data-i18n` para indicar qual
texto devem exibir. A preferência escolhida no menu do cabeçalho é salva no
navegador.

Como os arquivos de idioma e o cabeçalho são carregados com `fetch`, abra o
projeto por meio de um servidor local em vez de acessar o `index.html`
diretamente pelo sistema de arquivos.
