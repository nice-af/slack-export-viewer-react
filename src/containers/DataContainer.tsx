import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { DataContext } from '../contexts/data.context';
import {
  SlackDataParsed,
  SlackDumpData,
  SlackMessage,
} from '../types/slackdump';

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
              messages[channel.id!] = messages[channel.id!].reverse();
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
      <div>
        <h1>
          import the <code>data.json</code> file
        </h1>
        <label htmlFor="importFileUpload">file upload</label>
        <input id="importFileUpload" type="file" ref={inputRef} />
      </div>
    );
  }

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

export default DataContainer;
