'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18n = require('@kbn/i18n');

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

exports.default = new _chainable2.default('range', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'min',
    types: ['number'],
    help: _i18n.i18n.translate('timelion.help.functions.range.args.minHelpText', {
      defaultMessage: 'New minimum value'
    })
  }, {
    name: 'max',
    types: ['number'],
    help: _i18n.i18n.translate('timelion.help.functions.range.args.maxHelpText', {
      defaultMessage: 'New maximum value'
    })
  }],
  help: _i18n.i18n.translate('timelion.help.functions.rangeHelpText', {
    defaultMessage: 'Changes the max and min of a series while keeping the same shape'
  }),
  fn: function range(args) {
    return (0, _alter2.default)(args, function (eachSeries) {
      const values = _lodash2.default.map(eachSeries.data, 1);
      const min = _lodash2.default.min(values);
      const max = _lodash2.default.max(values);

      // newvalue= (max'-min')/(max-min)*(value-min)+min'.
      const data = _lodash2.default.map(eachSeries.data, function (point) {
        const val = (args.byName.max - args.byName.min) / (max - min) * (point[1] - min) + args.byName.min;
        return [point[0], val];
      });
      eachSeries.data = data;
      return eachSeries;
    });
  }
});
module.exports = exports['default'];