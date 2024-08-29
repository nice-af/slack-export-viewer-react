import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { DataContext } from '../contexts/data.context';
import {
  SlackDataParsed,
  SlackDumpData,
  SlackMessage,
} from '../types/slackdump';
import * as Styled from './DataContainer.styles';

const DataContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SlackDataParsed>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.addEventListener('change', event => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.item(0);

      if (file) {
        const reader = new FileReader();

        reader.onload = e => {
          try {
            const result = e.target?.result;
            const rawData = JSON.parse(result as string) as SlackDumpData;

            if (
              !rawData ||
              !Array.isArray(rawData.users) ||
              !Array.isArray(rawData.channels)
            ) {
              throw new Error('Invalid data format');
            }

            const messages: Record<string, SlackMessage[]> = {};
            rawData.channels.forEach(channel => {
              const messagesByDay = rawData[channel.name_normalized!];
              Object.keys(messagesByDay).forEach(date => {
                const messagesForDay = messagesByDay[date];
                messages[channel.id!] = messages[channel.id!] ?? [];
                messages[channel.id!].push(...messagesForDay);
              });

              // Reverse the messages so they are in chronological order
              messages[channel.id!] = messages[channel.id!].sort(
                (a, b) => Number(a.ts) - Number(b.ts),
              );

              // Filter out bot messages
              messages[channel.id!] = messages[channel.id!].filter(
                message => message.subtype !== 'bot_message',
              );

              // Filter out any duplicate messages
              const uniqueMessages = new Set<string>();
              messages[channel.id!] = messages[channel.id!]!.filter(message => {
                if (uniqueMessages.has(message.ts!)) {
                  return false;
                }
                uniqueMessages.add(message.ts!);
                return true;
              });
            });

            setData({
              channels: rawData.channels,
              users: rawData.users,
              messages,
            });
          } catch (e) {
            console.error(e);
            alert(e);
          }
        };

        reader.onerror = e => {
          console.error(e);
          alert(e);
        };

        reader.readAsText(file);
      }
    });
  }, [inputRef]);

  if (!data) {
    return (
      <Styled.Container>
        <h1>
          Import the <code>data.json</code> file
        </h1>
        <Styled.Dropzone>
          <svg width={72} height={72} viewBox="0 0 256 256" fill="none">
            <g
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M48 120V40a8 8 0 0 1 8-8h96l56 56v32" />
              <path d="M152 32v56h56m23 71v49l-35-49v49m-46 0c11.598 0 21-10.969 21-24.5s-9.402-24.5-21-24.5-21 10.969-21 24.5 9.402 24.5 21 24.5zm-44.647-47.603s-26.158-6.803-28.265 9.617c-2.106 16.42 34.157 8.848 31.802 26.859-2.195 16.752-28.246 9.618-28.246 9.618M20 192.25c0 4.177 1.686 8.183 4.686 11.137 3 2.954 7.07 4.613 11.314 4.613 4.243 0 8.313-1.659 11.314-4.613 3-2.954 4.686-6.96 4.686-11.137V159" />
            </g>
          </svg>
          <Styled.Input id="importFileUpload" type="file" ref={inputRef} />
          <label htmlFor="importFileUpload">
            Drag 'n' drop the file here, or click to select it
          </label>
        </Styled.Dropzone>
      </Styled.Container>
    );
  }

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

export default DataContainer;
