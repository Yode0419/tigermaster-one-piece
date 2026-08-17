/* @ds-bundle: {"format":4,"namespace":"TigerMasterDesignSystem_d021e9","components":[{"name":"Banner","sourcePath":"components/core/Banner.jsx"},{"name":"Board","sourcePath":"components/core/Board.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Loading","sourcePath":"components/core/Loading.jsx"},{"name":"SimpleTable","sourcePath":"components/core/SimpleTable.jsx"},{"name":"CapsuleCheckbox","sourcePath":"components/forms/CapsuleCheckbox.jsx"},{"name":"FormInput","sourcePath":"components/forms/FormInput.jsx"},{"name":"FormSelect","sourcePath":"components/forms/FormSelect.jsx"},{"name":"BackToTop","sourcePath":"components/navigation/BackToTop.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Navbar","sourcePath":"components/navigation/Navbar.jsx"},{"name":"PageDots","sourcePath":"components/navigation/PageDots.jsx"}],"sourceHashes":{"components/core/Banner.jsx":"4637495d6d65","components/core/Board.jsx":"7a23a78e4346","components/core/Button.jsx":"1a8ead438d9d","components/core/Loading.jsx":"f91d17510d23","components/core/SimpleTable.jsx":"2cecd0becc09","components/forms/CapsuleCheckbox.jsx":"51d4da62f2ed","components/forms/FormInput.jsx":"2b1b3125f733","components/forms/FormSelect.jsx":"9611e4b3b14a","components/navigation/BackToTop.jsx":"b499f6931509","components/navigation/Breadcrumb.jsx":"dd0cfac794ac","components/navigation/Footer.jsx":"06d8fb88a217","components/navigation/Navbar.jsx":"62e3a0a2cb7e","components/navigation/PageDots.jsx":"0c21209dac19","ui_kits/website/HomeScreen.jsx":"d786093976b9","ui_kits/website/QAScreen.jsx":"b140b867a4a3","ui_kits/website/ServiceScreen.jsx":"dfb450d0eba8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TigerMasterDesignSystem_d021e9 = window.TigerMasterDesignSystem_d021e9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Banner.jsx
try { (() => {
function Banner({
  image,
  title,
  align = 'left',
  height = 435,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      filter: 'brightness(0.75)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: align === 'center' ? {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    } : {
      position: 'absolute',
      top: '30%',
      left: '15%'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontWeight: align === 'center' ? 500 : 700,
      fontSize: 48,
      lineHeight: '61px',
      color: '#fff',
      fontFamily: 'var(--font-sans)'
    }
  }, title), children)));
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Banner.jsx", error: String((e && e.message) || e) }); }

// components/core/Board.jsx
try { (() => {
function Board({
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      boxShadow: 'var(--shadow-card,0px 0px 4px rgba(0,0,0,0.15))',
      borderRadius: 4,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Board });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Board.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'solid',
  size = 'md',
  href,
  onClick,
  block = false,
  style,
  children
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: {
      fontSize: 14,
      padding: '6px 18px',
      borderRadius: 2
    },
    md: {
      fontSize: 18,
      padding: '10px 28px',
      borderRadius: 2
    },
    form: {
      width: 215,
      fontSize: 14,
      padding: '12px 0',
      borderRadius: 4
    },
    long: {
      width: 250,
      height: 45,
      fontSize: 18,
      lineHeight: '45px',
      padding: 0,
      borderRadius: 3
    }
  };
  const variants = {
    solid: {
      background: 'var(--brand-navy,#1f286f)',
      color: '#fff',
      border: 'none'
    },
    outline: hover ? {
      background: 'var(--brand-navy,#1f286f)',
      color: '#fff',
      border: '0.5px solid var(--brand-navy,#1f286f)'
    } : {
      background: '#fff',
      color: 'var(--brand-navy-2,#2d2d70)',
      border: '0.5px solid var(--brand-navy,#1f286f)'
    }
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: block ? 'block' : 'inline-block',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
      textDecoration: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      margin: block ? '0 auto' : undefined,
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }, variant === 'solid' && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: '#000',
      opacity: hover ? 0.1 : 0,
      transition: 'all .5s',
      pointerEvents: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Loading.jsx
try { (() => {
function Loading({
  size = 20,
  color = '#fff'
}) {
  const id = React.useId().replace(/:/g, '');
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      position: 'relative',
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes lds-' + id + '{0%{opacity:1}100%{opacity:0}}'), Array.from({
    length: 12
  }, (_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: 'absolute',
      left: '45%',
      top: 0,
      width: size * 0.1,
      height: size * 0.2,
      borderRadius: '20%',
      background: color,
      transformOrigin: '50% ' + size / 2 + 'px',
      transform: 'rotate(' + i * 30 + 'deg)',
      animation: 'lds-' + id + ' 1.2s linear infinite',
      animationDelay: -1.1 + i * 0.1 + 's'
    }
  })));
}
Object.assign(__ds_scope, { Loading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Loading.jsx", error: String((e && e.message) || e) }); }

// components/core/SimpleTable.jsx
try { (() => {
function SimpleTable({
  fields,
  items,
  onRowClick
}) {
  const [hoverRow, setHoverRow] = React.useState(-1);
  const cell = {
    padding: '8px 12px',
    border: '1px solid #e3e6f0',
    maxWidth: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };
  return /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: 'collapse',
      width: '100%',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      border: '1px solid #e3e6f0',
      fontFamily: 'var(--font-sans)',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, fields.map(f => /*#__PURE__*/React.createElement("th", {
    key: f.key,
    style: {
      ...cell,
      color: '#858796',
      fontWeight: 700
    }
  }, f.label)))), /*#__PURE__*/React.createElement("tbody", null, items.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    onClick: () => onRowClick && onRowClick(row, i),
    onMouseEnter: () => setHoverRow(i),
    onMouseLeave: () => setHoverRow(-1),
    style: {
      background: hoverRow === i ? 'rgba(0,0,0,.04)' : '#fff',
      cursor: onRowClick ? 'pointer' : 'default'
    }
  }, fields.map(f => /*#__PURE__*/React.createElement("td", {
    key: f.key,
    style: cell
  }, row[f.key]))))));
}
Object.assign(__ds_scope, { SimpleTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SimpleTable.jsx", error: String((e && e.message) || e) }); }

// components/forms/CapsuleCheckbox.jsx
try { (() => {
function CapsuleCheckbox({
  label,
  checked = false,
  onChange,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const on = checked || hover;
  return /*#__PURE__*/React.createElement("label", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-block',
      padding: '4px 16px',
      background: on ? '#1f286f' : '#f5f5f5',
      color: on ? '#fff' : '#4f4f54',
      borderRadius: 20,
      margin: '0 16px 12px 0',
      fontSize: 12,
      lineHeight: '16px',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      userSelect: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange ? e => onChange(e.target.checked) : undefined,
    style: {
      display: 'none'
    }
  }), label);
}
Object.assign(__ds_scope, { CapsuleCheckbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/CapsuleCheckbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormInput.jsx
try { (() => {
function FormInput({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error = false,
  width = 382,
  style
}) {
  const c = error ? 'red' : undefined;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      color: c,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontSize: 16,
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange ? e => onChange(e.target.value) : undefined,
    style: {
      width,
      maxWidth: '100%',
      border: 'none',
      borderBottom: '0.5px solid ' + (error ? 'red' : '#6c6c6c'),
      borderRadius: 0,
      boxShadow: 'none',
      outline: 'none',
      padding: '6px 2px',
      fontSize: 16,
      fontFamily: 'inherit',
      color: error ? 'red' : '#000',
      background: 'transparent'
    }
  }), /*#__PURE__*/React.createElement("style", null, 'input::placeholder{color:' + (error ? 'red' : '#c4c4c4') + '}'));
}
Object.assign(__ds_scope, { FormInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormSelect.jsx
try { (() => {
function FormSelect({
  options = [],
  value,
  onChange,
  placeholder = '請選擇',
  width = 200,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const [hoverI, setHoverI] = React.useState(-1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setOpen(!open),
    style: {
      color: value ? '#23242A' : '#B3ACA2',
      fontSize: 15,
      border: '1px solid #D1D1D1',
      borderRadius: 5,
      background: '#fff',
      boxShadow: 'var(--shadow-select,0px 0px 0.82369px 0px rgba(50,50,71,0.2),0px 0.82369px 3.29477px 0px rgba(50,50,71,0.08))',
      padding: '5px 26px 5px 10px',
      position: 'relative',
      cursor: 'pointer'
    }
  }, value || placeholder, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 4,
      right: 11,
      border: '5px solid transparent',
      borderBottomColor: '#000',
      borderRadius: 4
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '55%',
      right: 11,
      border: '5px solid transparent',
      borderTopColor: '#000',
      borderRadius: 4
    }
  })), open && /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '4px 0 0',
      padding: 4,
      position: 'absolute',
      left: 0,
      right: 0,
      top: '100%',
      zIndex: 2,
      maxHeight: 262,
      overflow: 'auto',
      color: '#425466',
      fontSize: 16,
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0px 0px 2px rgba(0,0,0,0.3)'
    }
  }, options.map((o, i) => /*#__PURE__*/React.createElement("li", {
    key: o,
    onClick: () => {
      onChange && onChange(o);
      setOpen(false);
    },
    onMouseEnter: () => setHoverI(i),
    onMouseLeave: () => setHoverI(-1),
    style: {
      borderRadius: 4,
      padding: '8px 11px 6px',
      cursor: 'pointer',
      background: hoverI === i ? '#3A89F8' : 'transparent',
      color: hoverI === i ? '#fff' : '#425466'
    }
  }, o))));
}
Object.assign(__ds_scope, { FormSelect });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormSelect.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BackToTop.jsx
try { (() => {
function BackToTop({
  visible = true,
  onClick
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick || (() => {
      document.documentElement.scrollTop = 0;
    }),
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: 50,
      height: 50,
      padding: 10,
      boxSizing: 'border-box',
      color: '#fff',
      background: h ? 'rgba(51,51,51,0.7)' : 'rgba(51,51,51,0.5)',
      textAlign: 'center',
      position: 'fixed',
      right: '4%',
      bottom: visible ? 60 : -60,
      borderRadius: '100%',
      zIndex: 10,
      transition: '0.3s ease-in-out',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    style: {
      verticalAlign: 'middle'
    }
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
  })));
}
Object.assign(__ds_scope, { BackToTop });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BackToTop.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function Breadcrumb({
  items,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      listStyle: 'none',
      margin: '40px 0',
      padding: 0,
      fontFamily: 'var(--font-sans)'
    }
  }, items.map((b, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    onClick: () => b.link && onNavigate && onNavigate(b.link),
    style: {
      fontSize: 18,
      lineHeight: '23px',
      margin: '0 4px',
      color: b.link ? '#1f286f' : '#000',
      cursor: 'pointer'
    }
  }, b.name, i < items.length - 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 6px',
      color: '#000'
    }
  }, "/"))));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function FLink({
  children
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      textDecoration: 'none',
      fontSize: 18,
      color: h ? 'var(--brand-yellow,#fabf13)' : '#fff',
      transition: 'all .1s',
      cursor: 'pointer'
    }
  }, children);
}
function Footer({
  assetsBase = '../../assets'
}) {
  const cols = [['加入師虎', ['如何成為師傅', '師虎學院']], ['服務項目', ['安裝服務', '水電服務', '清潔服務', '裝潢整修', '搬運服務', '家電服務', '房屋漏水', '消毒病媒']], ['部落格', ['最新消息', '知識庫', '客戶案例', '媒體報導', '我要投稿']], ['協助', ['關於我們', 'Q&A', '下單教學', '報價系統']]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#333333',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("footer", {
    style: {
      maxWidth: 1400,
      margin: '0 auto',
      color: '#fff',
      padding: '64px 24px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 40,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 380px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 38
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: assetsBase + '/logo.svg',
    alt: "\u5E2B\u864E\u4F86\u4E86",
    style: {
      height: 43
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12,
      fontSize: 18
    }
  }, "\u5E2B\u864E\u4F86\u4E86\uFF01\u8B93\u5BB6\u66F4\u5B89\u5FC3\u3001\u66F4\u6EAB\u99A8\uFF01"), /*#__PURE__*/React.createElement("img", {
    src: assetsBase + '/store/app_store.svg',
    alt: "App Store",
    style: {
      width: 112,
      marginRight: 10
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: assetsBase + '/store/google_play.svg',
    alt: "Google Play",
    style: {
      width: 112
    }
  }))), cols.map(([title, items]) => /*#__PURE__*/React.createElement("ul", {
    key: title,
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      flex: '1 1 120px'
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      fontSize: 18,
      color: 'var(--brand-yellow,#fabf13)',
      marginBottom: 22
    }
  }, title), items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(FLink, null, i)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      borderTop: '1px solid #fff',
      paddingTop: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      margin: 0
    }
  }, "\u7248\u6B0A\u6240\u6709\xA9", new Date().getFullYear(), "\u98DB\u9054\u667A\u80FD\u80A1\u4EFD\u6709\u9650\u516C\u53F8"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 40,
      fontSize: 18
    }
  }, /*#__PURE__*/React.createElement(FLink, null, "\u6CD5\u5F8B\u689D\u6B3E"), /*#__PURE__*/React.createElement(FLink, null, "\u670D\u52D9\u8AAA\u660E"), /*#__PURE__*/React.createElement(FLink, null, "\u96B1\u79C1\u6B0A\u653F\u7B56")), /*#__PURE__*/React.createElement("img", {
    src: assetsBase + '/social/facebook.svg',
    alt: "facebook",
    style: {
      width: 35,
      height: 35
    }
  }))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Navbar.jsx
try { (() => {
function NavLink({
  children,
  blue = false,
  href = '#',
  onClick,
  active = false
}) {
  const [hover, setHover] = React.useState(false);
  const c = blue ? '#1f286f' : '#333333';
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontSize: 18,
      lineHeight: '28px',
      fontWeight: 'bold',
      padding: '0 8px',
      position: 'relative',
      color: c,
      textDecoration: 'none',
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap'
    }
  }, children, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: '-8%',
      left: '8%',
      height: 2,
      background: c,
      width: hover || active ? '85%' : 0,
      transition: 'all .5s .1s'
    }
  }));
}
function Navbar({
  links,
  blueLinks,
  logoSrc = '../../assets/text_logo.png',
  onNavigate,
  active
}) {
  const L = links || ['服務項目', '下單教學', 'Q&A', '關於我們', '成為師傅'];
  const B = blueLinks || ['部落格', '師虎學院', '師虎商城'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--brand-yellow,#fabf13)',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: onNavigate ? e => {
      e.preventDefault();
      onNavigate('首頁');
    } : undefined,
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "\u5E2B\u864E\u4F86\u4E86",
    style: {
      maxWidth: 206,
      maxHeight: 36,
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, L.map(l => /*#__PURE__*/React.createElement(NavLink, {
    key: l,
    active: active === l,
    onClick: onNavigate ? e => {
      e.preventDefault();
      onNavigate(l);
    } : undefined
  }, l))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, B.map(l => /*#__PURE__*/React.createElement(NavLink, {
    key: l,
    blue: true,
    active: active === l,
    onClick: onNavigate ? e => {
      e.preventDefault();
      onNavigate(l);
    } : undefined
  }, l)))));
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Navbar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/PageDots.jsx
try { (() => {
function PageDots({
  count,
  active = 0,
  onChange,
  light = false
}) {
  const [h, setH] = React.useState(-1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, Array.from({
    length: count
  }, (_, i) => {
    const on = i === active;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => onChange && onChange(i),
      onMouseEnter: () => setH(i),
      onMouseLeave: () => setH(-1),
      style: {
        width: 12,
        height: 12,
        borderRadius: on || h === i ? '40%' : '50%',
        background: on || h === i ? 'var(--brand-yellow,#fabf13)' : light ? '#fff' : '#ccc',
        margin: '0 12px',
        transition: 'all .2s',
        cursor: 'pointer',
        transform: on ? 'scaleX(2)' : 'none'
      }
    });
  }));
}
Object.assign(__ds_scope, { PageDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/PageDots.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
const {
  Button,
  PageDots
} = window.TigerMasterDesignSystem_d021e9;
const A = '../../assets';
function SectionTitle({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 36,
      fontWeight: 500,
      color: '#000',
      margin: 0,
      ...style
    }
  }, children);
}
function GhostText({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      fontSize: 100,
      fontWeight: 800,
      color: '#f6f6f6',
      lineHeight: 1.1,
      zIndex: 0,
      whiteSpace: 'pre-line',
      ...style
    }
  }, children);
}
function DownArrow() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '30px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '15px 15px 0 15px',
      borderColor: '#000 transparent transparent transparent'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '14px 14px 0 14px',
      borderColor: '#fff transparent transparent transparent',
      transform: 'translate(1px,-16px)'
    }
  }));
}
function Hero() {
  const [page, setPage] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 450,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/banners/home_banner.jpg',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    },
    alt: "banner"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '2%',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }, /*#__PURE__*/React.createElement(PageDots, {
    count: 3,
    active: page,
    onChange: setPage,
    light: true
  })));
}
function HowItWork() {
  const items = [['01', '預先掌握\n行情範圍'], ['02', '精準媒合\n專業師傅'], ['03', '擁有專屬技術的\n技術專案管理師'], ['04', '有保障的\n修繕過程'], ['05', '便利選擇\n多項服務']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(GhostText, {
    style: {
      top: -40,
      right: 0
    }
  }, "HOW IT WORK"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1320,
      margin: '0 auto',
      position: 'relative',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    style: {
      margin: '100px 0'
    }
  }, "\u70BA\u4EC0\u9EBC\u4E00\u5B9A\u8981\u5728\u5E2B\u864E\u4E0A\u53EB\u4FEE?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, items.map(([n, t], i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRight: i < 4 ? '2px dotted #000' : 'none',
      padding: '0 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 104,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/illustrations/HowItWork_item_' + n + '.png',
    style: {
      height: '100%'
    },
    alt: ""
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 24,
      fontWeight: 500,
      whiteSpace: 'pre-line',
      margin: '8px 0',
      flexGrow: 1
    }
  }, t), /*#__PURE__*/React.createElement(DownArrow, null))))));
}
function Steps() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1320,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/imagery/big_pic.jpg',
    style: {
      width: '100%',
      margin: '80px 0',
      display: 'block'
    },
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 1320,
      margin: '0 auto',
      display: 'flex',
      gap: 40,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(GhostText, {
    style: {
      right: 0,
      bottom: -30,
      textAlign: 'right'
    }
  }, 'PRICE\nRANGE'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 40%',
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 64,
      lineHeight: '87px',
      color: '#fabf13'
    }
  }, "01"), /*#__PURE__*/React.createElement("img", {
    src: A + '/illustrations/HowItWork_item_01.png',
    style: {
      width: 145,
      margin: '36px 0'
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 36,
      lineHeight: '46px',
      fontWeight: 500,
      margin: '0 0 24px'
    }
  }, "\u9810\u5148\u638C\u63E1\u884C\u60C5\u7BC4\u570D"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 22,
      lineHeight: '28px',
      color: '#4a4a4a',
      margin: 0
    }
  }, "\u60F3\u627E\u6700\u4FBF\u5B9C\u537B\u88AB\u4E8B\u5F8C\u8FFD\u52A0\uFF0C\u60A8\u662F\u5426\u611F\u5230\u53D7\u9A19\uFF1F\u5E2B\u864E\u5E73\u53F0\u516C\u958B\u5404\u5DE5\u9805\u53C3\u8003\u50F9\u683C\uFF0C\u60A8\u7684\u5FC3\u88E1\u4E5F\u6709\u5E95\uFF0C\u8B93\u60A8\u4E0D\u518D\u7576\u51A4\u5927\u982D\u3002")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/imagery/step_img_01.png',
    style: {
      width: '100%',
      maxWidth: 679
    },
    alt: ""
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      margin: '60px 0 100px',
      display: 'flex',
      gap: 40,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(GhostText, {
    style: {
      left: '8%',
      bottom: -30
    }
  }, "EMPOLYEE"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 32%',
      marginLeft: 'max(calc((100% - 1320px)/2),24px)',
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 64,
      lineHeight: '87px',
      color: '#fabf13'
    }
  }, "02"), /*#__PURE__*/React.createElement("img", {
    src: A + '/illustrations/HowItWork_item_02.png',
    style: {
      width: 85,
      margin: '36px 0'
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 36,
      lineHeight: '46px',
      fontWeight: 500,
      margin: '0 0 24px'
    }
  }, "\u7CBE\u6E96\u5A92\u5408\u5C08\u696D\u5E2B\u5085"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 22,
      lineHeight: '28px',
      color: '#4a4a4a',
      margin: 0
    }
  }, "\u52A0\u5165\u5E2B\u864E\u5E73\u53F0\u7684\u6280\u8853\u5E2B\u5085\u7686\u662F\u7D93\u904E\u4E00\u5C0D\u4E00\u9762\u8A66\uFF0C\u901A\u904E\u8003\u6838\u5F8C\u624D\u53EF\u4E0A\u7DDA\u63A5\u6848\uFF0C\u56B4\u683C\u7BE9\u9078\u5F8C\u6211\u5011\u5E73\u5747\u9304\u53D6\u7387\u53EA\u670936%\uFF0C\u800C\u4E14\u60A8\u7684\u6848\u4EF6\u53EA\u6709\u5177\u5099\u8A72\u6280\u80FD\u4E14\u5728\u4E00\u5B9A\u8DDD\u96E2\u5167\u7684\u5E2B\u5085\u624D\u53EF\u4EE5\u627F\u63A5\u3002")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: 'relative',
      zIndex: 1,
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/imagery/step_img_02.jpg',
    style: {
      width: '92%'
    },
    alt: ""
  }))));
}
function BlueBand() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#1f286f',
      marginTop: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1320,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 40,
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '56px 0',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 36,
      fontWeight: 500,
      margin: '0 0 28px'
    }
  }, "\u7ACB\u5373\u4E0B\u8F09\u300C\u5E2B\u864E\u4F86\u4E86\u300DAPP\uFF01"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/square_logo.png',
    style: {
      width: 90
    },
    alt: "app icon"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      margin: '0 0 13px'
    }
  }, "\u5E2B\u864E\u4F86\u4E86\uFF0C\u8B93\u60A8\u627E\u5E2B\u5085\u5C31\u8DDF\u53EB\u5916\u9001\u4E00\u6A23\u7C21\u55AE\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/store/app_store_transparent.svg',
    style: {
      height: 40
    },
    alt: "App Store"
  }), /*#__PURE__*/React.createElement("img", {
    src: A + '/store/google_play_transparent.svg',
    style: {
      height: 40
    },
    alt: "Google Play"
  }))))), /*#__PURE__*/React.createElement("img", {
    src: A + '/imagery/bluebg.png',
    style: {
      width: '42%',
      display: 'block',
      alignSelf: 'flex-end'
    },
    alt: "app preview"
  })));
}
function ServiceGrid({
  onService
}) {
  const names = ['安裝服務', '水電服務', '清潔服務', '裝潢整修', '搬運服務', '家電服務', '房屋漏水', '消毒病媒'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#f5f5f5',
      padding: '80px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1320,
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "\u670D\u52D9\u9805\u76EE"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 22,
      color: '#4a4a4a',
      margin: '16px 0 40px'
    }
  }, "\u516B\u5927\u4FEE\u7E55\u985E\u5225\uFF0C200\u7A2E\u670D\u52D9\u5DE5\u9805\uFF0C\u53EA\u8981\u5C45\u5BB6\u4FEE\u7E55\u4EFB\u4F55\u554F\u984C\u90FD\u53EF\u4EE5\u5728\u5E2B\u864E\u627E\u5230\u89E3\u6C7A\u65B9\u6848\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 2
    }
  }, names.map((n, i) => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onService && onService(i);
    },
    style: {
      position: 'relative',
      display: 'block',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/services/service_0' + (i + 1) + '.jpg',
    style: {
      width: '100%',
      height: 220,
      objectFit: 'cover',
      display: 'block'
    },
    alt: n
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      background: '#1f286f',
      color: '#fff',
      fontSize: 16,
      padding: '6px 20px'
    }
  }, n))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onService && onService(0);
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      textDecoration: 'none',
      color: '#1f286f',
      fontSize: 20,
      fontWeight: 500
    }
  }, "\u66F4\u591A\u670D\u52D9 ", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 10
    }
  }, "\u2192")))));
}
function EightSteps() {
  const steps = [['01', '註冊師虎來了APP', '業界首創修繕專案管理，免繁瑣議價及溝通，提供安心專業服務。'], ['02', '點選需要的修繕服務', '即時掌握修繕價格，並享有平台保固，雙重保障不用再當冤大頭。'], ['03', '即時下單即時媒合', '時間由您掌握，即刻到府或預約修繕皆可，快速有效率完成您的交託。'], ['04', '媒合成功線上支付派遣費', '平台為了建立公平的交易制度，我們保障您的預約時間及師傅派工權益，媒合成功您需支付300元派遣費用。'], ['05', '現場勘查，線上報價', '師傅於指定時間到場勘查，線上報價。三方驗證價格更有保障。'], ['06', '同意報價後開始施工', '由您線上審核並同意報價後，合約正式成立，師傅始可開始或與您約定施工時間。'], ['07', '線上驗收刷卡免現金', '三種驗收方式供您選擇，全程線上交易，不收取現金，三方認證有紀錄、真安心。'], ['08', '評價師傅保固免擔心', '師傅完工分潤由您的評價決定，售後保固由師虎為您承擔，不再擔心售後找不到師傅。']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1320,
      margin: '0 auto',
      padding: '90px 24px'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    style: {
      textAlign: 'center',
      marginBottom: 60
    }
  }, "\u516B\u500B\u6B65\u9A5F\uFF0C\u8B93\u60A8\u53EB\u4FEE\u8F15\u9B06\u641E\u5B9A\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '48px 40px',
      justifyItems: 'center'
    }
  }, steps.map(([n, t, s]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      maxWidth: 340
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 40,
      color: '#fabf13'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/illustrations/Frame_' + n + '.png',
    style: {
      height: 150
    },
    alt: ""
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 500,
      margin: '12px 0 8px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: '24px',
      color: '#6f6f6f',
      margin: 0
    }
  }, s)))));
}
function Customers() {
  const cards = [['01', '浴室漏水修繕案例', '天花板滴水找不到原因？師虎師傅到府勘查，揪出漏水點一次搞定。'], ['02', '老屋水電更新案例', '30年老屋電線老化，全室配電更新，住得更安心。'], ['03', '冷氣安裝案例', '新家冷氣安裝一次到位，配管走線美觀又專業。']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#f5f5f5',
      padding: '80px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1320,
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "\u5BA2\u6236\u6848\u4F8B"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '16px 0 40px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 22,
      color: '#4a4a4a',
      margin: 0
    }
  }, "\u6211\u5011\u5DF2\u7D93\u670D\u52D9\u904E\u8D85\u904E\u5343\u4EF6\u6848\u4F8B\uFF0C\u5E2B\u864E\u7684\u597D\u7531\u5BA2\u6236\u4F86\u8DDF\u60A8\u8AAA\u3002"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: '#1f286f',
      fontSize: 18,
      textDecoration: 'none'
    }
  }, "\u67E5\u770B\u66F4\u591A \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24
    }
  }, cards.map(([n, t, s]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      flex: 1,
      background: '#fff',
      boxShadow: '0 0 4px rgba(0,0,0,.15)',
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + '/imagery/customer_blog_' + n + '.png',
    style: {
      width: '100%',
      height: 200,
      objectFit: 'cover',
      display: 'block'
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 20,
      fontWeight: 500,
      margin: '0 0 10px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: '#6f6f6f',
      margin: 0,
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical'
    }
  }, s)))))));
}
function Partners() {
  const [page, setPage] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1320,
      margin: '0 auto',
      padding: '80px 24px 40px'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "\u5408\u4F5C\u5925\u4F34"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 22,
      color: '#4a4a4a',
      margin: '16px 0 40px'
    }
  }, "\u6211\u5011\u71B1\u611B\u670D\u52D9\u5BA2\u6236\uFF0C\u4EAB\u53D7\u89E3\u6C7A\u4FEE\u7E55\u5927\u5C0F\u4E8B\uFF0C\u70BA\u9019\u4E16\u754C\u5E36\u4F86\u5C0F\u5C0F\u7684\u6539\u8B8A\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 30,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => setPage((page + 3) % 4),
    style: {
      cursor: 'pointer',
      fontSize: 24
    }
  }, "\u2190"), [18, 19, 20, 21].map(n => /*#__PURE__*/React.createElement("img", {
    key: n,
    src: A + '/imagery/partner_tem' + n + '.png',
    style: {
      width: '18%',
      objectFit: 'contain'
    },
    alt: "partner"
  })), /*#__PURE__*/React.createElement("a", {
    onClick: () => setPage((page + 1) % 4),
    style: {
      cursor: 'pointer',
      fontSize: 24
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(PageDots, {
    count: 4,
    active: page,
    onChange: setPage
  })));
}
function HomeScreen({
  onService
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(HowItWork, null), /*#__PURE__*/React.createElement(Steps, null), /*#__PURE__*/React.createElement(BlueBand, null), /*#__PURE__*/React.createElement(ServiceGrid, {
    onService: onService
  }), /*#__PURE__*/React.createElement(EightSteps, null), /*#__PURE__*/React.createElement(Customers, null), /*#__PURE__*/React.createElement(Partners, null));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/QAScreen.jsx
try { (() => {
const {
  Button: _QBtn
} = window.TigerMasterDesignSystem_d021e9;
const QA = '../../assets';
const ORDER_QS = [['我一定要透過APP下單嗎?', '是,除了透過師虎來了APP下單,個人用戶不接受任何形式包含電話.FB等等,為了確保您在體驗師虎修繕服務,全程都可以擁有一對一客服專案管理師為您掌管專案進度。'], ['只能用信用卡付款嗎?', '新台幣五萬元以下小額修繕我們只提供線上刷卡,若超過新台幣五萬我們會開放權限給您,可選擇採用匯款或信用卡支付方式。'], ['我可以事先客製估價嗎?', '平台在每一個工項都有提供一個過去累積該項目最常發生的金額給您參考,你可以事先查看,但無法在立案前為您專屬報價,實際報價仍要以師傅至現場勘查後為依據。'], ['為何要支付300元派遣費?', '每一個師傅至您府上勘查至少要花費1-2小時,包含通勤時間,油資,人力成本,專業技術以及平台的維運,若您不同意師傅報價,我們仍然會支付師傅車馬費用,讓他獲得應該有的報酬。'], ['300元派遣費可以折抵施工費用嗎?', '可以,當您同意師傅報價單,此筆派遣費是可以全額抵扣。'], ['300元派遣費可以退嗎?', '不行,我們是在媒合師傅成功後才會收取300元派遣費,代表您已經預約師傅的時間。'], ['平台會開立發票嗎?', '會。'], ['如有報帳需求,可以開立統一編號嗎?', '可以,當您在下單前填寫訂單資訊頁面可以輸入統一編號。']];
function Chevron() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    style: {
      float: 'right'
    }
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
  }));
}
function QARow({
  children,
  onClick,
  icon
}) {
  return /*#__PURE__*/React.createElement("li", {
    onClick: onClick,
    style: {
      fontSize: 18,
      lineHeight: '26px',
      borderBottom: '0.5px solid #929292',
      padding: '30px 0',
      display: 'block',
      cursor: 'pointer',
      listStyle: 'none'
    }
  }, icon && /*#__PURE__*/React.createElement("img", {
    src: icon,
    style: {
      width: 30,
      marginRight: 30,
      verticalAlign: 'text-bottom'
    },
    alt: ""
  }), children, /*#__PURE__*/React.createElement(Chevron, null));
}
function QAScreen() {
  const [view, setView] = React.useState('home'); // home | list | answer
  const [q, setQ] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#f5f5f5'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: 435,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: QA + '/banners/QA_banner.jpg',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      filter: 'brightness(.75)'
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '30%',
      left: '15%'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontWeight: 'bold',
      fontSize: 48,
      lineHeight: '61px',
      color: '#fff',
      margin: 0
    }
  }, "Q&A"))), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 400,
      paddingBottom: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      background: '#fff',
      boxShadow: '0 0 4px rgba(0,0,0,.15)',
      borderRadius: 4,
      padding: '80px 150px',
      transform: 'translateY(-40px)'
    }
  }, view === 'home' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 24,
      lineHeight: '30px',
      fontWeight: 500,
      textAlign: 'center',
      margin: '0 0 20px'
    }
  }, "\u6211\u5011\u53EF\u4EE5\u5982\u4F55\u5E6B\u52A9\u60A8\u5462?"), /*#__PURE__*/React.createElement("ul", {
    style: {
      padding: 0,
      margin: 0
    }
  }, /*#__PURE__*/React.createElement(QARow, {
    icon: QA + '/icons/NotePencil.png',
    onClick: () => setView('list')
  }, "\u4E0B\u8A02\u76F8\u95DC\u554F\u984C"), /*#__PURE__*/React.createElement(QARow, {
    icon: QA + '/icons/Users.png',
    onClick: () => setView('list')
  }, "\u5E33\u865F\u76F8\u95DC\u554F\u984C"))), view === 'list' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 24,
      lineHeight: '30px',
      fontWeight: 500,
      textAlign: 'center',
      margin: '0 0 20px'
    }
  }, "\u4E0B\u8A02\u76F8\u95DC\u554F\u984C"), /*#__PURE__*/React.createElement("ul", {
    style: {
      padding: 0,
      margin: 0
    }
  }, ORDER_QS.map(item => /*#__PURE__*/React.createElement(QARow, {
    key: item[0],
    onClick: () => {
      setQ(item);
      setView('answer');
    }
  }, item[0]))), /*#__PURE__*/React.createElement("p", {
    onClick: () => setView('home'),
    style: {
      textAlign: 'center',
      color: '#929292',
      fontSize: 14,
      lineHeight: '18px',
      marginTop: 50,
      cursor: 'pointer'
    }
  }, "\u8FD4\u56DE\u81F3Q&A")), view === 'answer' && q && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 24,
      lineHeight: '30px',
      fontWeight: 500,
      margin: '0 0 10px'
    }
  }, q[0]), /*#__PURE__*/React.createElement("p", {
    style: {
      paddingTop: 24,
      color: '#727276',
      width: '90%',
      fontSize: 18,
      lineHeight: '26px',
      margin: 0
    }
  }, q[1]), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '30px 0',
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\u6B64\u56DE\u8986\u662F\u5426\u89E3\u6C7A\u60A8\u7684\u554F\u984C?"), /*#__PURE__*/React.createElement(_QBtn, {
    variant: "outline",
    size: "sm"
  }, "\u662F"), /*#__PURE__*/React.createElement(_QBtn, {
    variant: "outline",
    size: "sm"
  }, "\u5426")), /*#__PURE__*/React.createElement("p", {
    onClick: () => setView('list'),
    style: {
      textAlign: 'center',
      color: '#929292',
      fontSize: 14,
      lineHeight: '18px',
      marginTop: 50,
      cursor: 'pointer'
    }
  }, "\u8FD4\u56DE\u81F3Q&A")))));
}
window.QAScreen = QAScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/QAScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ServiceScreen.jsx
try { (() => {
const {
  CapsuleCheckbox: _CC
} = window.TigerMasterDesignSystem_d021e9;
const SA = '../../assets';
const CATEGORIES = ['安裝服務', '水電服務', '清潔服務', '裝潢整修', '搬運服務', '家電服務', '房屋漏水', '消毒病媒'];
const L2 = {
  '安裝服務': [['燈具安裝', ['吸頂燈', '吊燈', '層板燈', '軌道燈']], ['衛浴設備安裝', ['馬桶', '面盆', '淋浴柱', '暖風機']], ['家具組裝', ['系統櫃', '層架', '桌椅']]],
  '水電服務': [['水管修繕', ['水管漏水', '水壓不足', '管線更新']], ['電路修繕', ['跳電處理', '插座更換', '配電更新']], ['水龍頭/衛浴', ['水龍頭更換', '馬桶不通', '漏水檢測']]],
  '清潔服務': [['居家清潔', ['定期清潔', '大掃除', '裝潢後清潔']], ['設備清洗', ['冷氣清洗', '水塔清洗', '抽油煙機清洗']]],
  '裝潢整修': [['油漆工程', ['牆面粉刷', '天花板粉刷', '防水漆']], ['泥作工程', ['磁磚修補', '地坪整平']]],
  '搬運服務': [['家庭搬運', ['家具搬運', '家電搬運']], ['廢棄物清運', ['裝潢廢料', '大型家具']]],
  '家電服務': [['冷氣服務', ['冷氣安裝', '冷氣維修', '冷氣移機']], ['家電維修', ['洗衣機', '冰箱', '熱水器']]],
  '房屋漏水': [['漏水檢測', ['天花板滲水', '外牆滲水', '窗框漏水']], ['防水工程', ['屋頂防水', '浴室防水']]],
  '消毒病媒': [['消毒服務', ['居家消毒', '辦公室消毒']], ['病媒防治', ['除白蟻', '除蟑螂', '除鼠']]]
};
function ServiceRowKit({
  name,
  items,
  onItem
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'left',
      borderBottom: '1px solid #b3aca2',
      padding: '12px 0 28px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '38px 0 25px',
      fontWeight: 500,
      fontSize: 22,
      lineHeight: '28px',
      color: '#23242a'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 0
    }
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it,
    onClick: () => onItem && onItem(name, it),
    style: {
      background: '#f0f3fd',
      border: '10px solid #fff',
      padding: '14px 0',
      fontSize: 18,
      lineHeight: '23px',
      width: 'calc(25% - 20px)',
      boxSizing: 'border-box',
      textAlign: 'center',
      cursor: 'pointer'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = '#2d2d70';
      e.currentTarget.style.color = '#fff';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = '#f0f3fd';
      e.currentTarget.style.color = '#000';
    }
  }, it))));
}
function ServiceItemModal({
  cat,
  item,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,.5)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: '#fff',
      borderRadius: 6,
      maxWidth: 760,
      width: '92%',
      padding: '40px 50px',
      position: 'relative',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 14,
      right: 20,
      fontSize: 30,
      fontWeight: 'bold',
      cursor: 'pointer'
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'left',
      fontSize: 20,
      color: '#6c6c6c',
      marginBottom: 8
    }
  }, cat), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 36,
      letterSpacing: '.1em',
      fontWeight: 500,
      margin: '0 0 32px'
    }
  }, item), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '30px auto',
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'rgb(64,174,254)',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 18,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "$1,200"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      background: 'rgb(52,73,255)',
      padding: '4px 7px',
      borderRadius: 6,
      fontSize: 14
    }
  }, "$3,600")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      borderRadius: 5,
      background: 'linear-gradient(90deg,rgb(64,174,254),rgb(52,73,255),rgb(64,174,254))'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgb(52,73,255)',
      margin: '10px 0',
      fontSize: 15
    }
  }, "\u5404\u5730\u5340\u884C\u60C5\u50F9\u683C\u5340\u9593\uFF0C\u5BE6\u969B\u4EE5\u5E2B\u5085\u73FE\u5834\u5831\u50F9\u70BA\u6E96\u3002")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      background: '#eeeeee',
      borderRadius: 20,
      padding: '8px 30px',
      margin: '12px auto',
      color: '#23242a',
      fontWeight: 800,
      fontSize: 14
    }
  }, "\u4F4F\u5BB6\u4FDD\u56FA 90 \u5929 \u30FB \u5546\u7528\u4FDD\u56FA 30 \u5929"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      lineHeight: '15px',
      color: '#727276',
      margin: '16px 0 0'
    }
  }, "\uFF0A\u6D3E\u9063\u8CBB300\u5143\uFF0C\u5A92\u5408\u6210\u529F\u5F8C\u652F\u4ED8\uFF1B\u5831\u50F9\u7D93\u60A8\u540C\u610F\u5F8C\u624D\u6703\u65BD\u5DE5\u3002")));
}
function ServiceScreen() {
  const [tab, setTab] = React.useState(0);
  const [modal, setModal] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: 435,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: SA + '/banners/service_banner.jpg',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      filter: 'brightness(.7)'
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontWeight: 500,
      fontSize: 48,
      lineHeight: '61px',
      color: '#fff',
      margin: '0 0 41px'
    }
  }, "\u670D\u52D9\u9805\u76EE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      background: '#fff',
      boxShadow: '0 0 2px rgba(0,0,0,.25)',
      borderRadius: 4,
      width: 386
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 54,
      padding: '18px 23px',
      boxSizing: 'border-box',
      color: '#3a89f8',
      borderRadius: '4px 0 0 4px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 16 16",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
  }))), /*#__PURE__*/React.createElement("input", {
    placeholder: "\u8ACB\u8F38\u5165\u95DC\u9375\u5B57",
    style: {
      flex: 1,
      height: 54,
      border: 'none',
      outline: 'none',
      borderRadius: '0 4px 4px 0',
      fontSize: 16,
      letterSpacing: '.1em',
      caretColor: '#fabf13',
      fontFamily: 'inherit'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1140,
      margin: '0 auto',
      padding: '0 24px 150px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      borderBottom: '1px solid #b3aca2'
    }
  }, CATEGORIES.map((c, i) => /*#__PURE__*/React.createElement("li", {
    key: c,
    onClick: () => setTab(i),
    style: {
      flex: 1,
      color: i === tab ? '#000' : '#b3aca2',
      fontWeight: 500,
      fontSize: 22,
      lineHeight: '28px',
      padding: '38px 0',
      borderBottom: i === tab ? '#fabf13 solid 4px' : 'transparent solid 4px',
      cursor: 'pointer'
    },
    onMouseEnter: e => {
      if (i !== tab) {
        e.currentTarget.style.color = '#000';
        e.currentTarget.style.borderBottom = '#fabf13 solid 4px';
      }
    },
    onMouseLeave: e => {
      if (i !== tab) {
        e.currentTarget.style.color = '#b3aca2';
        e.currentTarget.style.borderBottom = 'transparent solid 4px';
      }
    }
  }, c))), L2[CATEGORIES[tab]].map(([n, items]) => /*#__PURE__*/React.createElement(ServiceRowKit, {
    key: n,
    name: n,
    items: items,
    onItem: (c, it) => setModal([CATEGORIES[tab] + ' / ' + c, it])
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: '#000',
      margin: 16
    }
  }, "\u627E\u4E0D\u5230\u60A8\u8981\u7684\u670D\u52D9\u55CE\uFF1F", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: '#1f286f'
    }
  }, "\u806F\u7D61\u6211\u5011"))), modal && /*#__PURE__*/React.createElement(ServiceItemModal, {
    cat: modal[0],
    item: modal[1],
    onClose: () => setModal(null)
  }));
}
window.ServiceScreen = ServiceScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ServiceScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.Board = __ds_scope.Board;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Loading = __ds_scope.Loading;

__ds_ns.SimpleTable = __ds_scope.SimpleTable;

__ds_ns.CapsuleCheckbox = __ds_scope.CapsuleCheckbox;

__ds_ns.FormInput = __ds_scope.FormInput;

__ds_ns.FormSelect = __ds_scope.FormSelect;

__ds_ns.BackToTop = __ds_scope.BackToTop;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Navbar = __ds_scope.Navbar;

__ds_ns.PageDots = __ds_scope.PageDots;

})();
