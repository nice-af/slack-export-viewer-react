import {
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import { DataContext } from '../contexts/data.context';

const DataContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SlackDumpData>();
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
            const parsed = JSON.parse(result as string) as SlackDumpData;

            if (
              !parsed ||
              !Array.isArray(parsed.users) ||
              !Array.isArray(parsed.channels)
            ) {
              throw new Error('Invalid data format');
            }

            setData(parsed);
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

  return (
    <DataContext.Provider value={{ data }}>
      {data ? (
        children
      ) : (
        <div>
          <label htmlFor="importFileUpload">
            import the <code>data.json</code> file
          </label>
          <input id="importFileUpload" type="file" ref={inputRef} />
        </div>
      )}
    </DataContext.Provider>
  );
};

export default DataContainer;
