import { createGlobalStyle } from 'styled-components';
import { useEffect } from 'react';
import { WebSdk } from 'aztec2-sdk';
import { Terminal } from './terminal';
import { TerminalHandler } from './terminal_handler';
import React from 'react';
import { TerminalPage } from './terminal_page';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
  }
`;

export function TerminalComponent({ app, terminal, onExit }: { app: WebSdk; terminal: Terminal; onExit: () => void }) {
  useEffect(() => {
    const terminalHandler = new TerminalHandler(app, terminal, onExit);
    terminalHandler.start();
    return () => {
      terminalHandler.stop();
    };
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      <TerminalPage terminal={terminal} />
    </React.Fragment>
  );
}