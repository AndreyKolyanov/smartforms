import Checkbox from '../checkbox/checkbox';
import template from './list_item.jade';
import Factory from '../factory';
import './list_item.css';

export default class ListItem extends Checkbox {
  get templateFn() {
    return template;
  }

  afterRender() {
    super.afterRender();

    this.el.find('.link-show').click(e => this._onRemoveClick(e));
      }

  _onRemoveClick(e) {
    e.preventDefault();

    this.trigger('remove');
  }


}

Factory.register('listItem', ListItem);
