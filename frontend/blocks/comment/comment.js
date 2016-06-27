import template from './comment.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Comment extends Base {
  get templateFn() {
    return template;
  }
}

Factory.register('comment', Comment);
