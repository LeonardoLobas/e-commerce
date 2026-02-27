# 🎨 Design System - E-commerce

Sistema de design unificado e organizado para o projeto.

## 📋 Tabela de Conteúdo

- [Paleta de Cores](#paleta-de-cores)
- [Tipografia](#tipografia)
- [Como Usar](#como-usar)
- [Exemplos Práticos](#exemplos-práticos)

---

## 🎨 Paleta de Cores

### **Brand Colors (Rose/Coral)**

Cores principais da marca, usadas para elementos de destaque e identidade visual.

| Variável CSS            | Uso                               | Tailwind Class                           |
| ----------------------- | --------------------------------- | ---------------------------------------- |
| `--brand-primary`       | Cor principal da marca (Rose 600) | `bg-brand-primary`, `text-brand-primary` |
| `--brand-primary-hover` | Estado hover (Rose 700)           | `hover:bg-brand-primary-hover`           |
| `--brand-light`         | Backgrounds claros (Rose 50)      | `bg-brand-light`                         |
| `--brand-muted`         | Elementos sutis (Rose 200)        | `bg-brand-muted`                         |

**Onde usar:**

- Badges ("Novo - Coleção 2025")
- Títulos em destaque ("Do seu jeito.")
- Ícone do carrinho no header
- Links e CTAs importantes

---

### **Neutral Colors**

Sistema de cores neutras para backgrounds, textos e superfícies.

| Variável       | Uso                         |
| -------------- | --------------------------- |
| `--background` | Background principal        |
| `--foreground` | Texto principal             |
| `--card`       | Cards e containers          |
| `--muted`      | Estados desabilitados/muted |
| `--accent`     | Hover states suaves         |
| `--border`     | Bordas                      |

---

### **Semantic Colors**

Cores para ações específicas.

| Variável        | Uso                | Exemplo             |
| --------------- | ------------------ | ------------------- |
| `--primary`     | Botões primários   | "Explorar Produtos" |
| `--secondary`   | Botões secundários | "Ver Carrinho"      |
| `--destructive` | Ações destrutivas  | Delete, Remove      |

---

## ✍️ Tipografia

### **Fontes**

```css
/* Títulos, Logo, Destaques */
font-family: var(--font-playfair); /* Playfair Display */

/* Corpo, Botões, Labels, Navegação */
font-family: var(--font-dm-sans); /* DM Sans */
```

### **Hierarquia Automática**

O sistema aplica automaticamente:

- **h1-h6**: Playfair Display (serif, peso 600)
- **button, label, nav, a**: DM Sans (sans-serif)
- **body**: DM Sans

---

## 🚀 Como Usar

### **1. Classes Tailwind (Recomendado)**

```tsx
{
    /* Usando brand colors */
}
<div className="bg-brand-primary text-white">Elemento com cor da marca</div>;

{
    /* Com hover */
}
<button className="bg-brand-primary hover:bg-brand-primary-hover">Botão com hover</button>;

{
    /* Cores do sistema */
}
<div className="bg-accent text-accent-foreground">Hover state suave</div>;
```

### **2. CSS Variables Diretas**

```css
.custom-element {
    background-color: var(--brand-primary);
    color: var(--foreground);
    border: 1px solid var(--border);
}
```

### **3. Inline Styles (Apenas quando necessário)**

```tsx
<div style={{ backgroundColor: "var(--brand-primary)" }}>Conteúdo</div>
```

---

## 📝 Exemplos Práticos

### **Badge de Novidade**

```tsx
<div className="inline-flex items-center gap-2">
    <span className="h-2 w-2 rounded-full bg-brand-primary"></span>
    <p className="text-sm font-medium text-brand-primary uppercase tracking-wider">Novo - Coleção 2025</p>
</div>
```

### **Título com Destaque**

```tsx
<h1 className="text-6xl font-bold text-foreground">Sua loja.</h1>
<h2 className="text-6xl font-bold text-brand-primary italic">
  Do seu jeito.
</h2>
```

### **Botão Primário**

```tsx
<button className="bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-4 rounded-lg transition-all">
    Explorar Produtos
</button>
```

### **Link de Navegação**

```tsx
<Link
    href="/products"
    className="text-muted-foreground hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md transition-all"
>
    Produtos
</Link>
```

### **Ícone da Marca**

```tsx
<ShoppingCart className="text-brand-primary h-6 w-6" />
```

---

## 🌙 Dark Mode

O sistema suporta dark mode automaticamente. Todas as cores se ajustam quando a classe `.dark` é aplicada no HTML.

**Light Mode:** Rose vibrante (#DC3654 aprox)  
**Dark Mode:** Rose mais suave e claro para melhor contraste

---

## ✅ Checklist de Consistência

Ao criar novos componentes, certifique-se de:

- [ ] Usar `text-brand-primary` para elementos da marca (não `text-rose-600` diretamente)
- [ ] Títulos (h1-h6) usam Playfair Display automaticamente
- [ ] Botões e links usam DM Sans automaticamente
- [ ] Hover states usam `hover:bg-accent` ou `hover:bg-brand-primary-hover`
- [ ] Textos secundários usam `text-muted-foreground`
- [ ] Cards usam `bg-card` e `text-card-foreground`

---

## 🎯 Padrões Estabelecidos

### **Header**

- Logo: ShoppingCart com `text-brand-primary`
- Links: `text-muted-foreground` com hover suave

### **Hero Section**

- Badge: `bg-brand-primary` com dot animado
- Título principal: `text-foreground`
- Título em destaque: `text-brand-primary italic`

### **Forms (Login/Register)**

- Badge: `bg-brand-primary` com mensagem
- Títulos: Playfair Display em `text-3xl`
- Inputs: Borders `border` com focus ring

---

**🎨 Última atualização:** Design system implementado em 27/02/2026
