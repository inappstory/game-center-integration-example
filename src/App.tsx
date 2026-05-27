import React, { useEffect, useState } from "react";
import GameCenterApi from "@inappstory/game-center-api";
import { BackgroundImage, Button, Modal, PlaceholderList, Section, VariableList } from "./components";
import { useGameActions } from "./hooks";

type AppProps = { backgroundImageSrc: string; renderedCb: () => void };

export const App = ({ backgroundImageSrc, renderedCb }: AppProps) => {
    const [placeholderModalOpen, setPlaceholderModalOpen] = useState(false);
    const [variablesModalOpen, setVariablesModalOpen] = useState(false);

    const actions = useGameActions();

    useEffect(() => {
        renderedCb();
    }, []);

    const clientConfig = GameCenterApi.gameLaunchConfig.clientConfig;

    return (
        <div className="layout">
            <BackgroundImage src={backgroundImageSrc} />
            <div className="panel">
                <h1 className="panel__title">GameCenter API Demo</h1>
                <Section title="Game launch config data">
                    <Button onClick={() => setPlaceholderModalOpen(true)}>Show placeholders</Button>
                    <Button onClick={() => setVariablesModalOpen(true)}>Show variables</Button>
                </Section>
                <Section title="Game control">
                    <Button onClick={actions.openUrl}>Open url</Button>
                    <Button onClick={actions.closeGame}>Close game</Button>
                    <Button onClick={actions.emitGameEvent}>Emit game event</Button>
                    <Button onClick={actions.reloadGame}>Reload game</Button>
                </Section>
                <Section title="Sharing">
                    <Button onClick={actions.shareText}>Share text</Button>
                    <Button onClick={actions.shareUrl}>Share link</Button>
                </Section>
            </div>

            <Modal title="Placeholders" open={placeholderModalOpen} onClose={() => setPlaceholderModalOpen(false)}>
                <PlaceholderList placeholders={clientConfig.placeholders} />
            </Modal>
            <Modal title="Variables" open={variablesModalOpen} onClose={() => setVariablesModalOpen(false)}>
                <VariableList variables={clientConfig.variables} />
            </Modal>
        </div>
    );
};
