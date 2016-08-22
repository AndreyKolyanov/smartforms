import Base from '../base/base';
import template from './list_item.jade';
import Factory from '../factory';
import './list_item.css';
import $ from 'jquery';

export default class ListItem extends Base {
  get templateFn() {
    return template;
  }

  afterRender() {
    super.afterRender();
    this.el.flag = true;
    this.el.find('.link-show').click(e => this._onShowClick(e));
    this.el.on('hideClick', function (e) {
      e.target.flag = true;
      $(e.target).find('.link-show').text(' показать платеж');
    });
  }

  _onShowClick(e) {
    e.preventDefault();
    if (this.el.flag) {
      this.el.find('.link-show').text(' скрыть платеж');
      this.el.flag = false;
      this.el.trigger('showClick', this.config.providerName);
    } else {
      this.el.flag = true;
      this.el.find('.link-show').text(' показать платеж');
      this.el.trigger('hideClick');
    }
  }

}

Factory.register('listItem', ListItem);
