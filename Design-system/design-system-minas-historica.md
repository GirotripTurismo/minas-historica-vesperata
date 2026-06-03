# Design System — Minas Histórica com Vesperata
**Campanha:** Minas Histórica com Vesperata
**Marca:** Girotrip Turismo
**Criado em:** 02/06/2026
**Versão:** 1.1 — atualizado com identidade visual da marca

---

## IDENTIDADE VISUAL DA MARCA — GIROTRIP

### Cores oficiais da marca
| Token CSS             | Nome            | Hex       | Origem na logo              |
|-----------------------|-----------------|-----------|-----------------------------|
| `--brand-blue`        | Azul Girotrip   | `#1B4B8A` | Arco do G, avião, "TURISMO" |
| `--brand-orange`      | Laranja Girotrip| `#F7941D` | Wordmark "girotrip"         |

### Uso da logo na landing page
- **Header (fundo claro):** Logo original colorida — azul + laranja sobre `--color-cream` ou `--color-white`
- **Header sticky (fundo escuro):** Logo versão branca/negativo — **a Girotrip precisa fornecer esta versão**. Enquanto não disponível, usar a logo original sobre fundo `--color-cream` semi-transparente no header
- **Hero section:** Logo branca no canto superior esquerdo. Se não houver versão branca, aplicar fundo retangular `rgba(18,17,26,0.6)` atrás da logo
- **Footer:** Logo original sobre fundo escuro — mesma solução acima

### Como a marca se integra à paleta da campanha
O laranja Girotrip (`#F7941D`) harmoniza naturalmente com o `--color-amber` (`#D4703A`) da campanha — ambos quentes e vibrantes.
O azul Girotrip (`#1B4B8A`) aparece **apenas** na logo — não entra na paleta da campanha para não conflitar com o tom emocional "Noite Mineira".
A paleta da campanha (ouro, noite, pedra) é o visual dominante da página. A logo Girotrip ancora a marca sem sobrescrever a identidade emocional do roteiro.

---

## PALETA DE CORES — "Noite Mineira"

Inspirada em: pedra colonial, ouro barroco, céu noturno de Diamantina, luz de lampião, musgo das igrejas.

| Token CSS          | Nome           | Hex       | Uso principal                          |
|--------------------|----------------|-----------|----------------------------------------|
| `--color-night`    | Noite Colonial | `#12111A` | Fundo hero, seções escuras/emocionais  |
| `--color-gold`     | Ouro Barroco   | `#C9A84C` | CTAs, destaques, linhas ornamentais    |
| `--color-gold-light`| Ouro Claro    | `#E8D5A3` | Subtítulos sobre fundo escuro          |
| `--color-stone`    | Pedra Calcária | `#F0E8D6` | Fundo seções claras                    |
| `--color-amber`    | Luz de Vela    | `#D4703A` | Acentos, hover states, badges          |
| `--color-moss`     | Musgo Colonial | `#4A6741` | Elementos secundários, ícones natureza |
| `--color-dark`     | Texto Escuro   | `#2D2419` | Corpo de texto sobre fundos claros     |
| `--color-cream`    | Creme          | `#FAF7F0` | Background padrão, espaços de respiro  |
| `--color-white`    | Branco Suave   | `#FEFEFE` | Textos sobre fundos escuros            |

**Regra de alternância:** seções alternam entre `--color-night` (escuro/emocional) e `--color-cream` (claro/informativo).
O ouro aparece como linha divisória, destaque de CTA e ornamentação — nunca como cor de fundo.

---

## TIPOGRAFIA

| Papel    | Família            | Peso        | Uso                                       |
|----------|--------------------|-------------|-------------------------------------------|
| Display  | Cormorant Garamond | 300–600     | Headlines principais, nome da Vesperata   |
| Títulos  | Playfair Display   | 400–700     | Títulos de seção                          |
| Corpo    | Inter              | 400–500     | Texto corrido, parágrafos                 |
| Labels   | Inter              | 600 · ALL CAPS · letter-spacing 0.12em | Badges, etiquetas, categorias |
| CTA      | Inter              | 700 · ALL CAPS | Botões                                 |

### Escala tipográfica

| Elemento   | Desktop | Mobile |
|------------|---------|--------|
| H1 Display | 72px    | 44px   |
| H2 Título  | 48px    | 32px   |
| H3 Sub     | 28px    | 22px   |
| Body       | 17px    | 16px   |
| Label      | 12px    | 12px   |
| CTA Button | 16px    | 16px   |

**Line-height:** 1.6 para corpo, 1.15 para títulos.
**Fonte de fallback:** Georgia (display), system-ui (corpo).

---

## LINGUAGEM FOTOGRÁFICA

### Fotos disponíveis (acervo Girotrip)
- Cidades históricas de Minas Gerais ✅
- Usar nas seções: Roteiro, Prova Social, Destinos

### Seção da Vesperata (sem foto própria)
- **Opção A (recomendada):** Adquirir imagem licenciada de banco (Shutterstock/Adobe Stock) com query: *"Vesperata Diamantina sacadas noturna músicos Rua da Quitanda"*
- **Opção B:** Ilustração vetorial estilizada de fachada colonial com janelas iluminadas e figuras de músicos, na paleta da campanha
- **Opção C:** Fotografar na própria viagem de outubro/2026 e atualizar a página após o retorno

### Tratamento fotográfico padrão
- Tom quente, levemente dessaturado — estética de película, não filtro de Instagram
- Composições com pessoas no cenário (não arquitetura vazia)
- Preferência por luz dourada (hora dourada) e luz artificial noturna
- Overlay gradiente nas imagens hero: `linear-gradient(to top, rgba(18,17,26,0.85) 0%, rgba(18,17,26,0.2) 60%, transparent 100%)`

---

## COMPONENTES

### Botão Primário
```css
background: #C9A84C;
color: #12111A;
border-radius: 4px;
padding: 16px 40px;
font-family: Inter;
font-weight: 700;
font-size: 16px;
letter-spacing: 0.08em;
text-transform: uppercase;
border: none;
cursor: pointer;
transition: background 0.2s ease;

&:hover { background: #D4703A; }
```

### Botão Secundário
```css
background: transparent;
color: #C9A84C;
border: 1.5px solid #C9A84C;
border-radius: 4px;
padding: 14px 38px;
font-family: Inter;
font-weight: 600;
font-size: 16px;
letter-spacing: 0.08em;
text-transform: uppercase;
transition: background 0.2s ease;

&:hover { background: rgba(201,168,76,0.1); }
```

### Card de Cidade
```css
background: #FAF7F0;
border-top: 3px solid #C9A84C;
border-radius: 4px;
box-shadow: 0 2px 16px rgba(45,36,25,0.08);
overflow: hidden;
/* Estrutura: foto topo (aspect-ratio 4/3), padding 24px, título H3, descrição body, lista de experiências */
```

### Badge de Exclusividade
```css
background: rgba(201,168,76,0.12);
color: #D4703A;
border: 1px solid #C9A84C;
border-radius: 100px;
padding: 4px 14px;
font-size: 12px;
font-weight: 600;
letter-spacing: 0.1em;
text-transform: uppercase;
```

### Divisor Ornamental
```
Linha horizontal fina (#C9A84C, 1px) com losango central em SVG inline.
Usado para separar seções dentro do mesmo fundo de cor.
```

### Timeline de Roteiro
```
Linha vertical: 2px solid #C9A84C
Pontos: círculo 12px, fundo #C9A84C, posicionado à esquerda
Cidade: texto à direita do ponto, H3 Playfair Display
Experiências: lista compacta em Inter 400, cor --color-dark
```

---

## TOKENS CSS (variáveis raiz)

```css
:root {
  /* Cores */
  --color-night: #12111A;
  --color-gold: #C9A84C;
  --color-gold-light: #E8D5A3;
  --color-stone: #F0E8D6;
  --color-amber: #D4703A;
  --color-moss: #4A6741;
  --color-dark: #2D2419;
  --color-cream: #FAF7F0;
  --color-white: #FEFEFE;

  /* Tipografia */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-title: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Espaçamento */
  --section-padding-desktop: 100px 0;
  --section-padding-mobile: 64px 0;
  --container-max: 1200px;
  --container-padding: 0 24px;

  /* Sombras */
  --shadow-card: 0 2px 16px rgba(45,36,25,0.08);
  --shadow-strong: 0 8px 40px rgba(18,17,26,0.24);

  /* Bordas */
  --radius-card: 4px;
  --radius-button: 4px;
  --radius-badge: 100px;

  /* Transições */
  --transition-fast: 0.2s ease;
  --transition-med: 0.35s ease;
}
```

---

## GRID E LAYOUT

- **Container máximo:** 1200px, centralizado
- **Colunas:** Grid 12 colunas com gap de 24px
- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px – 1024px
  - Desktop: > 1024px
- **Abordagem:** Mobile-first

---

## ICONOGRAFIA

- Estilo: linha fina (stroke, não preenchido), 24px base
- Cor: `--color-gold` em fundos escuros, `--color-amber` em fundos claros
- Biblioteca recomendada: Lucide Icons ou Feather Icons
- Ícones de uso: música, mapa-pin, calendário, grupo/pessoas, estrela, seta, check, whatsapp

---

## NOTAS DE IMPLEMENTAÇÃO

1. Google Fonts: importar Cormorant Garamond (300,400,600), Playfair Display (400,700), Inter (400,500,600,700)
2. Imagens: usar `loading="lazy"` em todas exceto o hero
3. Hero: imagem com `object-fit: cover`, height 100vh no desktop, 80vh no mobile
4. Animações: entradas com `opacity: 0 → 1` + `translateY(20px → 0)` via IntersectionObserver, duration 0.6s
5. Formulário: multi-step 2 passos, POST via fetch para webhook n8n
