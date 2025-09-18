// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// Licensed under the 【火山方舟】原型应用软件自用许可协议
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at 
//     https://www.volcengine.com/docs/82379/1433703
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// starling-disable-file
import { compact } from 'lodash';

import { DescriptionType, VideoGeneratorTaskPhase } from './types';

export const matchRoleDescription = (description: string) => {
  const regExp = /(Character [\d]+):[\s]\nCharacter:[\s](.*)\n(.*)/g;
  // 先分句
  const splitContent = description.match(regExp);
  if (!splitContent) {
    return undefined;
  }
  // 再把Character和内容分开
  const parsedData = compact(
    splitContent.map(item => {
      const matchArray = item.match(/(Character [\d]+):[\s]\nCharacter:[\s](.*)\n(.*)/);
      if (!matchArray) {
        return undefined;
      }
      return {
        uniqueKey: matchArray[1],
        storyRole: matchArray[2],
        content: matchArray[3],
      };
    }),
  );
  return parsedData;
};

/**
 * 组合Character描述
 * @returns string
 */
export const combinationRoleDescription = (data: DescriptionType) =>
  `${data.uniqueKey}: \nCharacter: ${data.storyRole}\n${data.content}`;

export const matchFirstFrameDescription = (description: string) => {
  const regExp = /(Storyboard [\d]+):\n(Characters: )(.*)\n(.*)/g;
  // 先分句
  const splitContent = description.match(regExp);
  if (!splitContent) {
    return undefined;
  }
  // 再把Character和内容分开
  const parsedData = compact(
    splitContent.map(item => {
      const matchArray = item.match(/(Storyboard [\d]+):\nCharacters:[\s](.*)\n(.*)/);
      if (!matchArray) {
        return undefined;
      }
      return {
        uniqueKey: matchArray[1],
        storyRole: matchArray[2],
        content: matchArray[3],
      };
    }),
  );
  return parsedData;
};

/**
 * 组合Storyboard描述
 * @returns string
 */
export const combinationFirstFrameDescription = (data: DescriptionType) =>
  `${data.uniqueKey}:\nCharacters: ${data.storyRole}\n${data.content}`;

export const matchVideoDescription = (description: string) => {
  const regExp = /(Video [\d]+):\nCharacters:[\s](.*)\n(.*)/g;
  // 先分句
  const splitContent = description.match(regExp);
  if (!splitContent) {
    return undefined;
  }
  // 再把Character和内容分开
  const parsedData = compact(
    splitContent.map(item => {
      const matchArray = item.match(/(Video [\d]+):\nCharacters:[\s](.*)\n(.*)/);
      if (!matchArray) {
        return undefined;
      }
      return {
        uniqueKey: matchArray[1],
        storyRole: matchArray[2],
        content: matchArray[3],
      };
    }),
  );
  return parsedData;
};

/**
 * 组合视频描述
 * @returns string
 */
export const combinationVideoDescription = (data: DescriptionType) =>
  `${data.uniqueKey}: \nCharacters: ${data.storyRole}\n${data.content}`;

const processByPhase = (phase: string, data: DescriptionType) => {
  switch (phase) {
    case VideoGeneratorTaskPhase.PhaseRoleDescription:
      return combinationRoleDescription(data);
    case VideoGeneratorTaskPhase.PhaseFirstFrameDescription:
      return combinationFirstFrameDescription(data);
    case VideoGeneratorTaskPhase.PhaseVideoDescription:
      return combinationVideoDescription(data);
    default:
      return '';
  }
};

export const mergedOriginDescriptionsByPhase = (params: {
  phase: string;
  replaceDesc: string;
  mergeList: DescriptionType[];
  uniqueKey: string;
}) => {
  const { phase, replaceDesc, mergeList, uniqueKey } = params;
  const mergedDescriptionList = mergeList.map(item => {
    if (item.uniqueKey === uniqueKey) {
      return { ...item, content: replaceDesc };
    }
    return item;
  });
  const mergedDescriptionStr = mergedDescriptionList.map(item => processByPhase(phase, item)).join('\n');
  return mergedDescriptionStr;
};
