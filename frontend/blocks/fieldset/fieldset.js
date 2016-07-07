import template from './fieldset.jade';

import './fieldset.css';

import Container from '../container/container';
import Factory from '../factory';

import map from 'lodash/fp/map';
import flatten from 'lodash/fp/flatten';
import find from 'lodash/fp/find';
import flow from 'lodash/fp/flow';

export default class Fieldset extends Container {
  constructor(config) {
    const items = config.items.map(item => Object.assign({}, item, { suppressLabel: true }));
    const finalConfig = Object.assign({}, config, { items });

    finalConfig.layout = (Array.isArray(config.layout) ? config.layout : [{ count: config.items.length }])
      .map(count => Number.isInteger(count) ? { count } : count);

    let start = 0;
    finalConfig.items = finalConfig.layout.map(rowConfig => {
      const result = {
        items: items.slice(start, start + rowConfig.count),
        block: 'fieldsetRow',
        width: rowConfig.width
      };
      start += rowConfig.count;

      return result;
    });

    super(finalConfig);
  }

  get templateFn() {
    return template;
  }

  addRow(config, index = 'last') {
    const RowConstructor = Factory.get('fieldsetRow');
    const row = new RowConstructor(config);

    const finalIndex = (!Number.isInteger(index) || index >= this.items.length) ? 'last' : index;

    row.parent = this;
    row.render();

    this.items.push(row);

    const appendChildWithIndex = {
      last: () => this.el.find('.fieldset-rows-container').append(row.el),
      number: number => this.el.find('.input-set-row').eq(finalIndex).before(row.el)
    };

    (appendChildWithIndex[finalIndex] || appendChildWithIndex.number)(finalIndex);

    return row;
  }

  validate() {
    return this.items.reduce((acc, block) => {
      const isValid = block.validate();

      if (acc && !isValid) {
        this.firstInvalidField = block;
      }

      return isValid && acc;
    }, true);
  }

  focus() {
    this.firstInvalidField.focus();
  }

  removeRow(index) {
    this.el.find('.input-set-row').eq(index).remove();
    this.items.splice(index, 1);
  }

  removeRowById(id) {
    this.removeRow(this.items.findIndex(item => id === item.id));
  }

  appendChild(block) {
    this.el.find('.fieldset-rows-container').append(block.el);
  }

  getItemByName(name) {
    return flow(map('items'), flatten, find(item => item.name === name))(this.items);
  }
}

Factory.register('fieldset', Fieldset);
