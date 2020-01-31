import intl from 'react-intl-universal';
import React, { Component } from 'react';
 
const SUPPOER_LOCALES = [
  {
    name: 'English',
    value: 'en-US'
  },
  {
    name: '简体中文',
    value: 'zh-CN'
  }
];
 
class MultiLanguage extends Component {
  constructor(props) {
    super(props);
    this.onSelectLocale = this.onSelectLocale.bind(this);
    this.state = { lang: localStorage.getItem('lang_type') || 'en-US' };
  }
 
  renderLocaleSelector() {
    return (
      <div style={{ position: 'absolute', zIndex: '9999', right: 160, top: 18 }}>
        <p>{intl.get('hotel_title')}</p>
        <select onChange={this.onSelectLocale} defaultValue={this.state.lang}>
          {SUPPOER_LOCALES.map(locale => (
            <option key={locale.value} value={locale.value}>
              {locale.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
 
  onSelectLocale = ev => {
    localStorage.setItem('lang_type', ev.target.value);
    window.location.reload();
  };
 
  render() {
    return (
      <div>
        {this.renderLocaleSelector()}
      </div>
    );
  }
}
 
export default MultiLanguage;