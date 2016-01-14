import {Model} from './Model';
import {X, Y} from '../channel';
import {applyColorAndOpacity, ColorMode} from './util';

export namespace tick {
  export function markType() {
    return 'rect';
  }

  export function properties(model: Model) {
    var p: any = {};

    // x
    if (model.has(X)) {
      p.xc = {
        scale: model.scale(X),
        field: model.field(X, { binSuffix: '_mid' })
      };
    } else {
      p.x = { value: 0, offset: 2 };
    }

    // y
    if (model.has(Y)) {
      p.yc = {
        scale: model.scale(Y),
        field: model.field(Y, { binSuffix: '_mid' })
      };
    } else {
      p.y = { value: 0 };
    }

    if (model.config().mark.orient === 'horizontal') {
      p.width = { value: model.config().mark.thickness };
      p.height = { value: model.sizeValue(Y) }; // TODO(#932) support size channel
    } else {
      p.width = { value: model.sizeValue(X) }; // TODO(#932) support size channel
      p.height = { value: model.config().mark.thickness };
    }

    applyColorAndOpacity(p, model, ColorMode.ALWAYS_FILLED);
    return p;
  }

  export function labels(model: Model) {
    // TODO(#240): fill this method
    return undefined;
  }
}
