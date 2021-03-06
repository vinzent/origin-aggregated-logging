"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const decode_version_1 = require("./decode_version");
/**
 * Helper for decoding version to request params that are driven
 * by the version info
 */
function decodeRequestVersion(version) {
    const decoded = decode_version_1.decodeVersion(version);
    return {
        if_seq_no: decoded._seq_no,
        if_primary_term: decoded._primary_term,
    };
}
exports.decodeRequestVersion = decodeRequestVersion;
