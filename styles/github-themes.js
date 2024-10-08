/*!
  Theme: GitHub Dark
  Description: Dark theme as seen on github.com
  Author: github.com
  Maintainer: @Hirse
  Updated: 2021-05-15

  Outdated base version: https://github.com/primer/github-syntax-dark
  Current colors taken from GitHub's CSS
*/

const DarkTheme = () => {
  return (
    <style jsx global>
      {`
        pre:has(.hljs),
        .hljs {
          color: #c9d1d9;
          background: hsl(var(--muted));
        }

        .hljs-doctag,
        .hljs-keyword,
        .hljs-meta .hljs-keyword,
        .hljs-template-tag,
        .hljs-template-variable,
        .hljs-type,
        .hljs-variable.language_ {
          /* prettylights-syntax-keyword */
          color: #ff7b72;
        }

        .hljs-title,
        .hljs-title.class_,
        .hljs-title.class_.inherited__,
        .hljs-title.function_ {
          /* prettylights-syntax-entity */
          color: #d2a8ff;
        }

        .hljs-attr,
        .hljs-attribute,
        .hljs-literal,
        .hljs-meta,
        .hljs-number,
        .hljs-operator,
        .hljs-variable,
        .hljs-selector-attr,
        .hljs-selector-class,
        .hljs-selector-id {
          /* prettylights-syntax-constant */
          color: #79c0ff;
        }

        .hljs-regexp,
        .hljs-string,
        .hljs-meta .hljs-string {
          /* prettylights-syntax-string */
          color: #a5d6ff;
        }

        .hljs-built_in,
        .hljs-symbol {
          /* prettylights-syntax-variable */
          color: #ffa657;
        }

        .hljs-comment,
        .hljs-code,
        .hljs-formula {
          /* prettylights-syntax-comment */
          color: #8b949e;
        }

        .hljs-name,
        .hljs-quote,
        .hljs-selector-tag,
        .hljs-selector-pseudo {
          /* prettylights-syntax-entity-tag */
          color: #7ee787;
        }

        .hljs-subst {
          /* prettylights-syntax-storage-modifier-import */
          color: #c9d1d9;
        }

        .hljs-section {
          /* prettylights-syntax-markup-heading */
          color: #1f6feb;
          font-weight: bold;
        }

        .hljs-bullet {
          /* prettylights-syntax-markup-list */
          color: #f2cc60;
        }

        .hljs-emphasis {
          /* prettylights-syntax-markup-italic */
          color: #c9d1d9;
          font-style: italic;
        }

        .hljs-strong {
          /* prettylights-syntax-markup-bold */
          color: #c9d1d9;
          font-weight: bold;
        }

        .hljs-addition {
          /* prettylights-syntax-markup-inserted */
          color: #aff5b4;
          background-color: #033a16;
        }

        .hljs-deletion {
          /* prettylights-syntax-markup-deleted */
          color: #ffdcd7;
          background-color: #67060c;
        }

        .hljs-char.escape_,
        .hljs-link,
        .hljs-params,
        .hljs-property,
        .hljs-punctuation,
        .hljs-tag {
          /* purposely ignored */
        }
      `}
    </style>
  );
};

const LightTheme = () => {
  return (
    <style jsx global>
      {`
        /*!
      Theme: GitHub
      Description: Light theme as seen on github.com
      Author: github.com
      Maintainer: @Hirse
      Updated: 2021-05-15
    
      Outdated base version: https://github.com/primer/github-syntax-light
      Current colors taken from GitHub's CSS
    */

        pre:has(.hljs),
        .hljs {
          color: #24292e;
          background: hsl(var(--muted));
        }

        .hljs-doctag,
        .hljs-keyword,
        .hljs-meta .hljs-keyword,
        .hljs-template-tag,
        .hljs-template-variable,
        .hljs-type,
        .hljs-variable.language_ {
          /* prettylights-syntax-keyword */
          color: #d73a49;
        }

        .hljs-title,
        .hljs-title.class_,
        .hljs-title.class_.inherited__,
        .hljs-title.function_ {
          /* prettylights-syntax-entity */
          color: #6f42c1;
        }

        .hljs-attr,
        .hljs-attribute,
        .hljs-literal,
        .hljs-meta,
        .hljs-number,
        .hljs-operator,
        .hljs-variable,
        .hljs-selector-attr,
        .hljs-selector-class,
        .hljs-selector-id {
          /* prettylights-syntax-constant */
          color: #005cc5;
        }

        .hljs-regexp,
        .hljs-string,
        .hljs-meta .hljs-string {
          /* prettylights-syntax-string */
          color: #032f62;
        }

        .hljs-built_in,
        .hljs-symbol {
          /* prettylights-syntax-variable */
          color: #e36209;
        }

        .hljs-comment,
        .hljs-code,
        .hljs-formula {
          /* prettylights-syntax-comment */
          color: #6a737d;
        }

        .hljs-name,
        .hljs-quote,
        .hljs-selector-tag,
        .hljs-selector-pseudo {
          /* prettylights-syntax-entity-tag */
          color: #22863a;
        }

        .hljs-subst {
          /* prettylights-syntax-storage-modifier-import */
          color: #24292e;
        }

        .hljs-section {
          /* prettylights-syntax-markup-heading */
          color: #005cc5;
          font-weight: bold;
        }

        .hljs-bullet {
          /* prettylights-syntax-markup-list */
          color: #735c0f;
        }

        .hljs-emphasis {
          /* prettylights-syntax-markup-italic */
          color: #24292e;
          font-style: italic;
        }

        .hljs-strong {
          /* prettylights-syntax-markup-bold */
          color: #24292e;
          font-weight: bold;
        }

        .hljs-addition {
          /* prettylights-syntax-markup-inserted */
          color: #22863a;
          background-color: #f0fff4;
        }

        .hljs-deletion {
          /* prettylights-syntax-markup-deleted */
          color: #b31d28;
          background-color: #ffeef0;
        }

        .hljs-char.escape_,
        .hljs-link,
        .hljs-params,
        .hljs-property,
        .hljs-punctuation,
        .hljs-tag {
          /* purposely ignored */
        }
      `}
    </style>
  );
};

export { DarkTheme, LightTheme };
