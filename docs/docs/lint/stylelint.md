---
sidebar_position: 3
---

# Stylelint Rules

## color-hex-case

**规则说明：** 强制十六进制颜色值使用小写字母。

**配置值：** `"lower"`

**参考链接：** [color-hex-case](https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/color-hex-case/README.md)

### 正确示例 ✅

```css
/* 正确：使用小写字母 */
.example {
  color: #fff;
  background-color: #000;
  border-color: #f5f5f5;
  box-shadow: 0 0 0 1px #e1e1e1;
}

.button {
  background: linear-gradient(to bottom, #ffffff, #f0f0f0);
  border: 1px solid #cccccc;
}

.header {
  background-color: #2c3e50;
  color: #ecf0f1;
}
```

### 错误示例 ❌

```css
/* 错误：使用大写字母 */
.example {
  color: #FFF;                    /* 应该是 #fff */
  background-color: #000000;      /* 可以简化为 #000 */
  border-color: #F5F5F5;          /* 应该是 #f5f5f5 */
  box-shadow: 0 0 0 1px #E1E1E1;  /* 应该是 #e1e1e1 */
}

.button {
  background: linear-gradient(to bottom, #FFFFFF, #F0F0F0);  /* 应该是小写 */
  border: 1px solid #CCCCCC;      /* 应该是 #cccccc */
}

.header {
  background-color: #2C3E50;      /* 应该是 #2c3e50 */
  color: #ECF0F1;                 /* 应该是 #ecf0f1 */
}
```

## max-empty-lines

**规则说明：** 限制连续空行的最大数量，确保代码整洁。

**配置值：** `1`

**参考链接：** [max-empty-lines](https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/max-empty-lines/README.md)

### 正确示例 ✅

```css
/* 正确：最多只有1个连续空行 */
.header {
  background-color: #2c3e50;
  color: #fff;
}

.content {
  padding: 20px;
  margin: 0 auto;
}

.footer {
  background-color: #34495e;
  text-align: center;
}
```

### 错误示例 ❌

```css
/* 错误：超过1个连续空行 */
.header {
  background-color: #2c3e50;
  color: #fff;
}


.content {
  padding: 20px;
  margin: 0 auto;
}



.footer {
  background-color: #34495e;
  text-align: center;
}
```

## number-leading-zero

**规则说明：** 禁止小数点前的前导零。

**配置值：** `"never"`

**参考链接：** [number-leading-zero](https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/number-leading-zero/README.md)

### 正确示例 ✅

```css
/* 小数点无前导零 */
.example {
  opacity: .5;         
  line-height: .8;     
  transform: scale(.75);
  animation-delay: .3s; 
}

.button {
  border-radius: .25rem;
  margin: .5em .75em;
  font-size: .875rem;
}
```

### 错误示例 ❌

```css
/* 小数点前有前导零 */
.example {
  opacity: 0.5;
  line-height: 0.8;
  transform: scale(0.75);
  animation-delay: 0.3s;
}

.button {
  border-radius: 0.25rem;
  margin: 0.5em 0.75em;
  font-size: 0.875rem;
}
```
