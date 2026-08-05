# Plumbob Memories

<p align="center">
  <img src="assets/images/plumbobs/plumbob_green.webp" width="150" alt="Plumbob verde animado">
</p>

<p align="center">
  <strong>A Sim Nostalgia — uma homenagem ao primeiro The Sims.</strong>
</p>

## Sobre o projeto

**Plumbob Memories** é um projeto fanmade criado para celebrar a nostalgia de
**The Sims 1**, lançado em 2000. A página relembra a estética, os personagens e
algumas das mecânicas que transformaram o jogo em um marco dos simuladores de
vida.

Além do conteúdo histórico, o projeto recria elementos da interface original e
transforma a navegação em uma pequena experiência interativa. As necessidades
diminuem com o tempo, podem ser recuperadas pelo usuário e afetam diretamente a
cor do Plumbob.

Este é um projeto de fã, sem fins comerciais e sem vínculo oficial com Maxis ou
Electronic Arts.

## Recursos concluídos

- [x] Interface inspirada na identidade visual de The Sims 1.
- [x] Layout responsivo para computadores, tablets e celulares.
- [x] Seções sobre o primeiro jogo e seu criador, Will Wright.
- [x] Navegação suave pelo cabeçalho.
- [x] Sistema interativo com seis necessidades: Fome, Banheiro, Diversão,
  Energia, Higiene e Social.
- [x] Barras que diminuem com o tempo e podem ser recuperadas individualmente.
- [x] Plumbob animado que muda entre verde, amarelo e vermelho conforme o estado
  geral das necessidades.
- [x] Alerta de conquista com efeito sonoro.
- [x] Internacionalização em português e inglês, com preferência salva no
  navegador.
- [x] Estrutura inicial da Pirâmide de Maslow, formada por cinco imagens
  responsivas com animações de hover.
- [x] Interação da base da pirâmide, relacionando necessidades fisiológicas aos
  comportamentos dos Sims.

## Em desenvolvimento

- [ ] Conteúdo e interações para os demais níveis da Pirâmide de Maslow.
- [ ] Expansão da relação entre a teoria de Maslow e as oito necessidades do
  The Sims original.
- [ ] Funcionalidade do botão **TSRadio**.
- [ ] Novos conteúdos históricos e detalhes nostálgicos sobre The Sims 1.
- [ ] Revisão final das traduções e do comportamento responsivo das novas
  seções.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro
- Fetch API para carregar fragmentos e traduções
- Local Storage para guardar a preferência de idioma

O projeto não utiliza framework, processo de build ou dependências externas de
JavaScript.

## Como executar localmente

O cabeçalho, o rodapé e os arquivos de idioma são carregados com `fetch`. Por
isso, o projeto deve ser aberto por meio de um servidor local, e não diretamente
pelo arquivo `index.html`.

Com Python instalado, execute na raiz do projeto:

```bash
python3 -m http.server 8000
```

Depois, acesse:

```text
http://localhost:8000
```

Também é possível utilizar extensões como **Live Server** no Visual Studio Code.

## Estrutura do projeto

```text
.
├── assets/
│   ├── audio/              # Efeitos sonoros
│   ├── design/             # Referências visuais locais
│   └── images/
│       ├── branding/       # Logos e ícones
│       ├── content/        # Imagens das seções
│       ├── maslow/         # Etapas da Pirâmide de Maslow
│       ├── moods/          # Ícones das necessidades
│       └── plumbobs/       # Plumbobs animados
├── locales/
│   ├── en.txt              # Traduções em inglês
│   └── pt-BR.txt           # Traduções em português
├── partials/
│   └── header-footer.html  # Cabeçalho e área fixa das necessidades
├── scripts/
│   ├── alert.js            # Alerta de conquista
│   ├── i18n.js             # Internacionalização
│   ├── mood-controller.js  # Comportamento individual das barras
│   ├── moods.js            # Criação e integração das necessidades
│   └── navigation.js       # Navegação suave entre seções
├── styles/
│   ├── alert.css
│   ├── footer.css
│   ├── main.css
│   └── moods.css
└── index.html
```

## Idiomas

Os textos ficam na pasta `locales`, no formato `chave=texto`. Os elementos do
HTML utilizam atributos `data-i18n` para indicar qual tradução deve ser exibida.
O idioma selecionado é mantido entre visitas por meio do armazenamento local do
navegador.

## Aviso legal

The Sims, seus nomes, imagens e elementos relacionados pertencem aos seus
respectivos proprietários. Este repositório é um estudo independente de
front-end e uma homenagem feita por fã.
