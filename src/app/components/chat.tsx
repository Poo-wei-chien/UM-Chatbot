'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useChat } from "ai/react"
import React, { useRef, useEffect, useState, ChangeEvent } from 'react';

export function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: 'api',
        onError: (e) => {
            console.log(e)
        }
    });

    const [showSuggestions, setShowSuggestions] = useState(true);

    const handleSuggestionClick = (suggestion: string) => {
        handleInputChange({ target: { value: suggestion } } as ChangeEvent<HTMLInputElement>);
        setShowSuggestions(false);
    };

    const chatParent = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const domNode = chatParent.current;
        if (domNode) {
            domNode.scrollTop = domNode.scrollHeight;
        }
    });

    return (
        <main className="flex flex-col w-full h-screen max-h-dvh bg-background bg-cover bg-no-repeat" style={{ backgroundImage: `url('/bg.jpg')` }}>
            <header className="p-4 border-b w-full max-w-3xl mx-auto flex justify-center">
                <h1 className="text-2xl font-bold" style={{ color: "white" }}>UM Harry Chatbot</h1>
            </header>
            <section className="p-4">
                <form onSubmit={handleSubmit} className="flex w-full max-w-3xl mx-auto items-center">
                    <Input className="flex-1 min-h-[40px]" placeholder="Type your question here..." type="text" value={input} onChange={handleInputChange} />
                    <Button className="ml-2" type="submit" onClick={() => setShowSuggestions(false)}>
                        Submit
                    </Button>
                </form>
            </section>
            <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
                <ul ref={chatParent} className="h-1 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4">
                    {showSuggestions && (
                        <section className="p-1 flex justify-center">
                            <div className="flex items-center">
                                <Button className="mr-2 pt-2" onClick={() => handleSuggestionClick("How do I apply for a bachelor's degree at UM?")} style={{whiteSpace: 'normal', paddingTop: '30px', paddingBottom: '30px', backgroundColor: 'white',  color: 'black', flex: '1' }}>
                                    How do I apply for a bachelor degree at UM? ✨
                                </Button>
                                <Button className="mr-2" onClick={() => handleSuggestionClick("Show me all the bus routes in UM.")} style={{ whiteSpace: 'normal', paddingTop: '30px', paddingBottom: '30px', backgroundColor: 'white',  color: 'black', flex: '1' }}>
                                    Show me all the bus routes in UM. ✨
                                </Button>
                                <Button onClick={() => handleSuggestionClick("What are the courses offered in FSKTM?")} style={{whiteSpace: 'normal', paddingTop: '30px', paddingBottom: '30px', backgroundColor: 'white',  color: 'black', flex: '1' }}>
                                    What are the courses offered in FSKTM? ✨
                                </Button>
                            </div>
                        </section>
                    )}
                    {messages.map((m, index) => (
                        <div key={index}>
                            {m.role === 'user' ? (
                                <li key={m.id} className="flex flex-row">
                                    <div className="rounded-xl p-4 bg-background shadow-md flex">
                                        <p className="text-primary">{m.content}</p>
                                    </div>
                                </li>
                            ) : (
                                <li key={m.id} className="flex flex-row-reverse">
                                    <div className="rounded-xl p-4 bg-background shadow-md flex w-3/4">
                                        <p className="text-primary">{m.content}</p>
                                    </div>
                                </li>
                            )}
                        </div>
                    ))}
                </ul >
            </section>
        </main>
    )
}
