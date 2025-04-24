import { Provider } from '@/components/ui/provider';
import '@/styles/globals.css';
import { LocaleProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      {/* TODO: develop for en also ? */}
      <LocaleProvider locale="fa-Ir">
        <Component {...pageProps} />
      </LocaleProvider>
    </Provider>
  );
}
