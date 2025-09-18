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

import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

import { MessageItemProps } from '../../types';


export interface AnimateMessageProps {
  message: MessageItemProps['message'];
}

const AnimateMessage = (props: AnimateMessageProps) => {
  const { message } = props;

  return <Markdown remarkPlugins={[remarkBreaks]}>{message}</Markdown>;
};

export default AnimateMessage;
