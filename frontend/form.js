import Actions from './blocks/actions/actions';
import Input from './blocks/input/input';
import Button from './blocks/button/button';

import $ from 'jquery';
import cloneDeep from 'lodash/cloneDeep';
import uniqueId from 'lodash/uniqueId';
import defaults from 'lodash/defaults';

import Factory from './factory';

import Parser from 'morph-expressions';

export default class Form {
    constructor(el, config) {
        this._id = uniqueId();
        this._el = el;
        this._config = cloneDeep(config);

        this._initItems();
    }

    _initItems() {
        let form = this;

        this._items = this._config.items.map(block_config => {
            let block_ctor = Factory.get(block_config['block']);

            return new block_ctor(form, defaults({
                id: form.id
            }, block_config));
        });
    }

    get id() {
        return this._id;
    }

    test() {
        const parser = new Parser();
        console.log(parser.parseAndEval('3 * (1 + 2)'));
    }

    render() {
        this._el.append('<div/>');

        let form = this;

        this._items.forEach(block => {
            block.render();
            form._append(block);
        });
    }

    _append(block) {
        this._el.children().append(block.el);
    }
}
