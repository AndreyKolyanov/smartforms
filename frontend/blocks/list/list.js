import Container from '../container/container';
import template from './list.jade';
import Factory from '../factory';
import './list.css';

export default class List extends Container {
  get templateFn() {
    return template;
  }

  appendChild(block) {
    this.el.append(block.el);
  }

  afterRender() {
    super.afterRender();

    this.items.forEach(block => {
      block.on('remove', () => {
        block.el.remove();
        const removedItemIndex = this.items.indexOf(block);
        if (-1 !== removedItemIndex) {
          this.items.splice(removedItemIndex, 1);
        }
        this.trigger('change');
      });
    });
  }
}

Factory.register('list', List);
